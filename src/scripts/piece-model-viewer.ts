/*
 * The viewer behind "View in 3D". Imported only when a reader asks for it.
 *
 * The model floats on the page rather than in a box of its own: the canvas is
 * transparent, so the panel and the void behind it show through, and there is
 * no floor, no backdrop and no ring under its feet. It is lit like everything
 * else on the site, by a coloured light source, and that light is read from
 * the stylesheet at the moment it is needed: the piece's own colour for the
 * rim, the blue tint for anything that glows. No colour is written here, so
 * the model follows the theme the reader is looking at.
 *
 * The surfaces keep the colours the model was made with and gain only what a
 * flat colour cannot carry: metal, lacquer, glass.
 *
 * It draws only while it is open, on screen and in a visible tab, and it holds
 * still for a reader who has asked for reduced motion.
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export type Control = 'rotate' | 'lights' | 'explode';

export interface Viewer {
  set(control: Control, on: boolean): void;
  setVisible(visible: boolean): void;
}

interface Part {
  mesh: THREE.Mesh;
  home: THREE.Vector3;
  away: THREE.Vector3;
}

function token(element: Element, name: string): THREE.Color | null {
  const value = getComputedStyle(element).getPropertyValue(name).trim();
  if (!value) return null;
  try {
    return new THREE.Color(value);
  } catch {
    return null;
  }
}

/* Turns the flat colours the model ships with into real surfaces, by the name
   its author gave each material. */
function dress(source: THREE.MeshStandardMaterial, glow: THREE.Color): THREE.Material {
  const colour = source.color.clone();
  let material: THREE.MeshStandardMaterial | THREE.MeshPhysicalMaterial;
  switch (source.name) {
    case 'red':
      material = new THREE.MeshPhysicalMaterial({ color: colour, metalness: 0.55, roughness: 0.32, clearcoat: 1, clearcoatRoughness: 0.08 });
      break;
    case 'yellow':
      // The author's gold is a dark base meant for a renderer that adds its own light.
      material = new THREE.MeshPhysicalMaterial({ color: colour.multiplyScalar(3), metalness: 1, roughness: 0.22, clearcoat: 0.5 });
      break;
    case 'white':
      material = new THREE.MeshStandardMaterial({ color: colour, metalness: 1, roughness: 0.3 });
      break;
    case 'glss':
      material = new THREE.MeshPhysicalMaterial({ color: colour, roughness: 0.05, transmission: 0.9, thickness: 0.01, transparent: true, opacity: 0.6 });
      break;
    default:
      if (source.name.startsWith('arc')) {
        material = new THREE.MeshStandardMaterial({ color: glow.clone().lerp(new THREE.Color(1, 1, 1), 0.3), emissive: glow, emissiveIntensity: 1.6 });
        material.userData.glows = true;
      } else {
        material = source;
      }
  }
  material.name = source.name;
  material.side = THREE.DoubleSide;
  return material;
}

export async function createViewer(canvas: HTMLCanvasElement, model: ArrayBuffer, root: HTMLElement): Promise<Viewer> {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

  const camera = new THREE.PerspectiveCamera(30, 1, 0.05, 30);
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.autoRotateSpeed = 1.2;
  /* A wheel over the model would otherwise stop the page from scrolling. It
     zooms only after the reader has put a hand on the model. */
  controls.enableZoom = false;
  canvas.addEventListener('pointerdown', () => (controls.enableZoom = true));
  canvas.addEventListener('pointerleave', () => (controls.enableZoom = false));
  // OrbitControls claims every touch; a vertical swipe should still scroll the page.
  canvas.style.touchAction = 'pan-y';

  const key = new THREE.DirectionalLight(0xffffff, 2.2);
  key.position.set(2.5, 4.5, 3.5);
  const rim = new THREE.DirectionalLight(0xffffff, 1.6);
  rim.position.set(-3.5, 2.5, -3);
  const fill = new THREE.DirectionalLight(0xffffff, 0.45);
  fill.position.set(-2, 1, 3);
  scene.add(key, rim, fill, new THREE.HemisphereLight(0xffffff, 0x000000, 0.25));

  let glow = token(root, '--tint-blue') ?? new THREE.Color(0.4, 0.75, 0.95);
  const recolour = () => {
    glow = token(root, '--tint-blue') ?? glow;
    rim.color.copy(token(root, '--piece-colour') ?? rim.color);
    for (const material of glowing) {
      material.emissive.copy(glow);
      material.color.copy(glow).lerp(new THREE.Color(1, 1, 1), 0.3);
    }
  };

  const gltf = await new GLTFLoader().parseAsync(model, '');
  const figure = gltf.scene;
  // The author built it facing away from the camera's side of the scene.
  figure.rotation.y = Math.PI;
  figure.updateMatrixWorld(true);

  const glowing = new Set<THREE.MeshStandardMaterial>();
  const dressed = new Map<THREE.Material, THREE.Material>();
  const parts: Part[] = [];
  const box = new THREE.Box3().setFromObject(figure);
  const centre = box.getCenter(new THREE.Vector3());

  figure.traverse((object) => {
    const mesh = object as THREE.Mesh;
    if (!mesh.isMesh) return;
    const source = mesh.material as THREE.MeshStandardMaterial;
    if (!dressed.has(source)) dressed.set(source, dress(source, glow));
    const material = dressed.get(source)!;
    if (material.userData.glows) glowing.add(material as THREE.MeshStandardMaterial);
    mesh.material = material;

    /* Each part moves away from the middle of the body along its own line,
       less in height than across, so the armour opens rather than scatters. */
    const away = new THREE.Box3().setFromObject(mesh).getCenter(new THREE.Vector3()).sub(centre);
    away.y *= 0.35;
    away.applyQuaternion(mesh.parent!.getWorldQuaternion(new THREE.Quaternion()).invert());
    parts.push({ mesh, home: mesh.position.clone(), away });
  });
  scene.add(figure);
  recolour();

  const height = box.max.y - box.min.y;
  controls.target.set(0, box.min.y + height * 0.52, 0);
  const distance = (height * 0.62) / Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
  camera.position.set(distance * 0.38, controls.target.y + height * 0.05, distance * 0.92);
  controls.minDistance = height * 0.35;
  controls.maxDistance = distance * 1.6;

  const resize = () => {
    const { clientWidth: width, clientHeight: tall } = canvas;
    if (!width || !tall) return;
    renderer.setSize(width, tall, false);
    camera.aspect = width / tall;
    camera.updateProjectionMatrix();
  };
  new ResizeObserver(resize).observe(canvas);
  resize();

  /* The theme can change while the model is open: the switch in the masthead
     rewrites data-theme, and the system can flip between night and day. */
  new MutationObserver(recolour).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', recolour);

  const state = { rotate: !reduced.matches, lights: true, explode: false };
  let open = true;
  let onScreen = true;
  let explodeT = 0;
  let glowLevel = 1.6;
  const clock = new THREE.Clock();

  new IntersectionObserver(([entry]) => {
    onScreen = entry.isIntersecting;
    tick();
  }).observe(canvas);
  document.addEventListener('visibilitychange', () => tick());

  function frame() {
    const t = clock.getElapsedTime();
    const target = state.lights ? (reduced.matches ? 1.6 : 1.5 + Math.sin(t * 2.2) * 0.35) : 0.05;
    glowLevel += (target - glowLevel) * (reduced.matches ? 1 : 0.15);
    for (const material of glowing) material.emissiveIntensity = glowLevel;

    const goal = state.explode ? 1 : 0;
    explodeT += (goal - explodeT) * (reduced.matches ? 1 : 0.07);
    for (const part of parts) part.mesh.position.copy(part.home).addScaledVector(part.away, explodeT * 0.5);

    controls.autoRotate = state.rotate;
    controls.update();
    renderer.render(scene, camera);
  }

  function tick() {
    const running = open && onScreen && document.visibilityState === 'visible';
    renderer.setAnimationLoop(running ? frame : null);
  }
  tick();

  return {
    set(control, on) {
      state[control] = on;
      if (!open) frame();
    },
    setVisible(visible) {
      open = visible;
      tick();
    },
  };
}

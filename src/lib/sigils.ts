/* ============================================================
   SIGILS

   One authored glyph per character, drawn from what that person
   actually is: their power, their weapon, their mark. Iron Man is
   an arc reactor, Thor is a hammer between two bolts, Thanos is six
   stones in a ring.

   These are the project's only figurative artwork and they are
   drawn here rather than borrowed, which is what makes them usable
   at all: no poster, logo or still could be.

   Every glyph shares one frame, viewBox 0 0 48 48 centred on
   24,24, and paints in currentColor, so a sigil takes the colour of
   whatever region it sits in and needs no palette of its own.
   ============================================================ */

export const SIGILS: Record<string, string> = {
  /* ---------------- MCU ---------------- */
  'iron-man': `<circle cx="24" cy="24" r="13" fill="none" stroke="currentColor" stroke-width="1.4" opacity="0.6"/><polygon points="24,15 32,28 16,28" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="24" cy="24" r="3.4" fill="currentColor"/><line x1="24" y1="9" x2="24" y2="13" stroke="currentColor" stroke-width="1.4"/><line x1="24" y1="35" x2="24" y2="39" stroke="currentColor" stroke-width="1.4"/><line x1="9" y1="24" x2="13" y2="24" stroke="currentColor" stroke-width="1.4"/><line x1="35" y1="24" x2="39" y2="24" stroke="currentColor" stroke-width="1.4"/>`,
  'captain-america': `<circle cx="24" cy="24" r="17" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="24" cy="24" r="11" fill="none" stroke="currentColor" stroke-width="1.4"/><polygon points="24,15 26.3,21 32.2,21.6 27.6,25.6 29,31.4 24,28 19,31.4 20.4,25.6 15.8,21.6 21.7,21" fill="currentColor"/>`,
  thor: `<rect x="15" y="13" width="18" height="10.5" rx="2" fill="none" stroke="currentColor" stroke-width="1.7"/><line x1="24" y1="23.5" x2="24" y2="37" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><path d="M12 28 L17 23 L14 23 L19 17" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M36 28 L31 23 L34 23 L29 17" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>`,
  hulk: `<circle cx="24" cy="24" r="14" fill="none" stroke="currentColor" stroke-width="1.4" stroke-dasharray="3 3"/><rect x="18" y="16" width="12" height="15" rx="3" fill="currentColor"/><rect x="16" y="18" width="4" height="6" rx="1.5" fill="currentColor"/><line x1="10" y1="24" x2="14" y2="24" stroke="currentColor" stroke-width="1.8"/><line x1="34" y1="24" x2="38" y2="24" stroke="currentColor" stroke-width="1.8"/>`,
  'black-widow': `<polygon points="16,14 32,14 24,24" fill="currentColor"/><polygon points="16,34 32,34 24,24" fill="currentColor"/><line x1="12" y1="12" x2="36" y2="36" stroke="currentColor" stroke-width="1" opacity="0.4"/><line x1="36" y1="12" x2="12" y2="36" stroke="currentColor" stroke-width="1" opacity="0.4"/>`,
  hawkeye: `<circle cx="24" cy="24" r="15" fill="none" stroke="currentColor" stroke-width="1.1"/><circle cx="24" cy="24" r="8.5" fill="none" stroke="currentColor" stroke-width="1.4"/><polygon points="24,11 27.5,21 24,18.5 20.5,21" fill="currentColor"/><line x1="24" y1="18.5" x2="24" y2="37" stroke="currentColor" stroke-width="1.8"/>`,
  'nick-fury': `<path d="M9 24 C15 17, 33 17, 39 24 C33 31, 15 31, 9 24 Z" fill="none" stroke="currentColor" stroke-width="1.4" opacity="0.5"/><path d="M14 20 L30 30" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><rect x="27" y="19" width="8" height="8" rx="4" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="35" y1="21" x2="40" y2="18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><line x1="27" y1="21" x2="22" y2="18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>`,
  'war-machine': `<rect x="12" y="12" width="24" height="24" rx="5" fill="none" stroke="currentColor" stroke-width="1.4" opacity="0.6"/><circle cx="24" cy="20" r="4.5" fill="currentColor"/><circle cx="18" cy="30" r="2" fill="currentColor"/><circle cx="24" cy="31" r="2" fill="currentColor"/><circle cx="30" cy="30" r="2" fill="currentColor"/><line x1="16" y1="12" x2="16" y2="8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="32" y1="12" x2="32" y2="8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
  'pepper-potts': `<polygon points="24,10 36,24 24,38 12,24" fill="none" stroke="currentColor" stroke-width="1.5"/><polygon points="24,17 30,24 24,31 18,24" fill="currentColor"/>`,
  'sam-wilson': `<path d="M24 14 C16 14, 9 18, 6 26 C13 23, 19 23, 24 26 C29 23, 35 23, 42 26 C39 18, 32 14, 24 14 Z" fill="currentColor"/><polygon points="24,26 26,31 24,34 22,31" fill="currentColor"/>`,
  'bucky-barnes': `<circle cx="24" cy="24" r="13" fill="none" stroke="currentColor" stroke-width="1.3" opacity="0.5"/><polygon points="24,15 26.2,21 32,21.4 27.4,25.2 29,31 24,27.8 19,31 20.6,25.2 16,21.4 21.8,21" fill="currentColor"/><line x1="12" y1="34" x2="20" y2="28" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>`,
  loki: `<path d="M10 14 C12 24, 18 28, 24 35 C30 28, 36 24, 38 14 C36 20, 31 24, 24 25 C17 24, 12 20, 10 14 Z" fill="currentColor"/><polygon points="24,18 28,26 20,26" fill="none" stroke="var(--void)" stroke-width="1.4"/>`,
  'doctor-strange': `<path d="M10 24 C16 14, 32 14, 38 24 C32 34, 16 34, 10 24 Z" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="24" cy="24" r="5.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="24" cy="24" r="2.4" fill="currentColor"/><circle cx="24" cy="24" r="16.5" fill="none" stroke="currentColor" stroke-width="0.9" stroke-dasharray="2 3"/>`,
  wong: `<circle cx="19" cy="24" r="7" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="29" cy="24" r="7" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="19" cy="24" r="1.6" fill="currentColor"/><circle cx="29" cy="24" r="1.6" fill="currentColor"/>`,
  'scarlet-witch': `<path d="M11 18 L16 33 L24 24 L32 33 L37 18 L32 24 L24 16 L16 24 Z" fill="currentColor"/><circle cx="24" cy="35" r="2.6" fill="none" stroke="currentColor" stroke-width="1.4"/>`,
  vision: `<polygon points="24,10 30,24 24,38 18,24" fill="currentColor"/><line x1="24" y1="6" x2="24" y2="10" stroke="currentColor" stroke-width="1.6"/><path d="M14 20 L10 18 M34 20 L38 18" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>`,
  'agatha-harkness': `<path d="M24 12 C28 18, 34 18, 34 24 C34 30, 28 30, 24 36 C20 30, 14 30, 14 24 C14 18, 20 18, 24 12 Z" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="24" cy="24" r="2.4" fill="currentColor"/>`,
  kang: `<path d="M12 14 L24 22 L36 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M12 22 L24 30 L36 22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M18 30 L24 34 L30 30" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>`,
  sylvie: `<path d="M16 34 C12 24, 12 16, 16 10 C17 16, 19 20, 22 24 M32 34 C36 24, 36 16, 32 10 C31 16, 29 20, 26 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="24" cy="28" r="2.4" fill="currentColor"/>`,
  mobius: `<circle cx="24" cy="24" r="13" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="24" y1="24" x2="24" y2="15" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><line x1="24" y1="24" x2="30" y2="27" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M33 15 A13 13 0 0 1 35 22" fill="none" stroke="currentColor" stroke-width="1.4"/><polygon points="35,23 32,20 38,19" fill="currentColor"/>`,
  'doctor-doom': `<path d="M14 16 C14 16, 24 12, 34 16 L34 30 C34 36, 24 40, 24 40 C24 40, 14 36, 14 30 Z" fill="none" stroke="currentColor" stroke-width="1.8"/><rect x="18" y="22" width="4" height="2" fill="currentColor"/><rect x="26" y="22" width="4" height="2" fill="currentColor"/><rect x="21" y="28" width="6" height="3.4" fill="currentColor"/>`,
  'star-lord': `<polygon points="24,10 26,20 36,20 28,26 31,36 24,30 17,36 20,26 12,20 22,20" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="24" cy="24" r="3.2" fill="currentColor"/>`,
  gamora: `<path d="M14 12 L30 32" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M34 12 L18 32" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><circle cx="24" cy="36" r="2" fill="currentColor"/>`,
  rocket: `<circle cx="21" cy="24" r="10" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M21 14 L21 10 M14 17 L11 14 M28 17 L31 14" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="21" cy="24" r="3" fill="currentColor"/><rect x="30" y="22" width="10" height="4" rx="1.5" fill="currentColor"/>`,
  groot: `<path d="M24 38 L24 20" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><path d="M24 26 C20 22, 16 22, 13 18 M24 22 C28 18, 32 18, 35 14 M24 30 C21 27, 18 27, 15 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><circle cx="13" cy="17" r="1.6" fill="currentColor"/><circle cx="35" cy="13" r="1.6" fill="currentColor"/>`,
  drax: `<path d="M18 10 L18 38 M30 10 L30 38" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M18 16 L14 20 M18 24 L14 28 M30 16 L34 20 M30 24 L34 28" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="24" cy="24" r="2.2" fill="currentColor"/>`,
  nebula: `<circle cx="24" cy="24" r="13" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M24 11 L24 37" stroke="currentColor" stroke-width="1.2" opacity="0.5"/><path d="M27 15 L33 15 M27 20 L35 20 M27 25 L33 25 M27 30 L34 30" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>`,
  mantis: `<circle cx="24" cy="28" r="6" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M20 22 C16 16, 13 12, 12 9 M28 22 C32 16, 35 12, 36 9" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><circle cx="12" cy="9" r="1.8" fill="currentColor"/><circle cx="36" cy="9" r="1.8" fill="currentColor"/>`,
  yondu: `<path d="M14 34 C20 20, 26 14, 34 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><polygon points="34,12 29,13 33,17" fill="currentColor"/><path d="M12 30 C10 30, 9 32, 9 34 M14 26 C11 26, 9 28, 8 31" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" opacity="0.7"/>`,
  thanos: `<circle cx="24" cy="13" r="2.6" fill="currentColor"/><circle cx="33" cy="18" r="2.6" fill="currentColor"/><circle cx="33" cy="30" r="2.6" fill="currentColor"/><circle cx="24" cy="35" r="2.6" fill="currentColor"/><circle cx="15" cy="30" r="2.6" fill="currentColor"/><circle cx="15" cy="18" r="2.6" fill="currentColor"/><circle cx="24" cy="24" r="4" fill="currentColor"/>`,
  gorr: `<path d="M14 36 C14 36, 16 20, 24 10 C24 22, 30 30, 34 34 C28 33, 22 33, 14 36 Z" fill="currentColor"/><line x1="24" y1="10" x2="24" y2="6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>`,
  namor: `<line x1="24" y1="10" x2="24" y2="38" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M14 14 L14 22 C14 26, 18 26, 18 22 M34 14 L34 22 C34 26, 30 26, 30 22 M24 12 L24 22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="14" y1="14" x2="34" y2="14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
  'ant-man': `<polygon points="24,12 36,32 12,32" fill="none" stroke="currentColor" stroke-width="1.8"/><polygon points="24,20 30,30 18,30" fill="currentColor"/><line x1="19" y1="10" x2="21" y2="15" stroke="currentColor" stroke-width="1.3"/><line x1="29" y1="10" x2="27" y2="15" stroke="currentColor" stroke-width="1.3"/>`,
  wasp: `<path d="M24 24 C18 18, 12 18, 10 22 C12 26, 18 26, 24 24 M24 24 C30 18, 36 18, 38 22 C36 26, 30 26, 24 24" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="24" y1="24" x2="24" y2="36" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="24" cy="20" r="2.4" fill="currentColor"/>`,
  'hank-pym': `<ellipse cx="24" cy="26" rx="4" ry="6" fill="currentColor"/><circle cx="24" cy="16" r="3.4" fill="currentColor"/><path d="M20 22 C15 20, 12 16, 10 12 M28 22 C33 20, 36 16, 38 12 M20 27 C15 27, 12 30, 10 33 M28 27 C33 27, 36 30, 38 33" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>`,
  'black-panther': `<path d="M14 16 L18 28 L24 24 L30 28 L34 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/><polygon points="24,14 27,21 21,21" fill="currentColor"/><path d="M16 32 C20 37, 28 37, 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>`,
  shuri: `<path d="M14 14 C14 26, 18 32, 24 38 C30 32, 34 26, 34 14 C30 20, 26 22, 24 22 C22 22, 18 20, 14 14 Z" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="20" cy="20" r="1.4" fill="currentColor"/><circle cx="28" cy="20" r="1.4" fill="currentColor"/><path d="M20 28 L24 30 L28 28" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>`,
  killmonger: `<path d="M15 16 C15 28, 19 33, 24 38 C29 33, 33 28, 33 16 C29 19, 26 20, 24 20 C22 20, 19 19, 15 16 Z" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="19" cy="24" r="1.1" fill="currentColor"/><circle cx="19" cy="28" r="1.1" fill="currentColor"/><circle cx="19" cy="32" r="1.1" fill="currentColor"/><circle cx="29" cy="24" r="1.1" fill="currentColor"/><circle cx="29" cy="28" r="1.1" fill="currentColor"/><circle cx="29" cy="32" r="1.1" fill="currentColor"/>`,
  'captain-marvel': `<polygon points="24,8 27,19 38,20 29,26 33,37 24,30 15,37 19,26 10,20 21,19" fill="currentColor"/>`,
  'monica-rambeau': `<circle cx="24" cy="24" r="4" fill="currentColor"/><circle cx="24" cy="24" r="9" fill="none" stroke="currentColor" stroke-width="1.4" opacity="0.8"/><circle cx="24" cy="24" r="14" fill="none" stroke="currentColor" stroke-width="1" opacity="0.45"/><path d="M24 6 L24 2 M42 24 L46 24 M24 42 L24 46 M6 24 L2 24" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" opacity="0.6"/>`,
  'ms-marvel': `<polygon points="24,9 27.5,19 38,19 29.5,25 33,36 24,29.5 15,36 18.5,25 10,19 20.5,19" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M25 16 L21 25 L26 25 L23 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`,
  valkyrie: `<line x1="24" y1="10" x2="24" y2="34" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="18" y1="30" x2="30" y2="30" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M24 16 C18 12, 12 12, 9 16 C13 18, 19 18, 24 18 M24 16 C30 12, 36 12, 39 16 C35 18, 29 18, 24 18" fill="none" stroke="currentColor" stroke-width="1.4"/>`,
  hela: `<path d="M24 34 L24 24 M24 24 C24 24, 20 18, 14 12 M24 24 C24 24, 28 18, 34 12 M24 24 C24 24, 17 20, 9 18 M24 24 C24 24, 31 20, 39 18 M24 24 L18 10 M24 24 L30 10" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>`,
  'spider-man': `<ellipse cx="24" cy="22" rx="3.2" ry="4.6" fill="currentColor"/><ellipse cx="24" cy="29.5" rx="4.2" ry="5.6" fill="currentColor"/><path d="M21 20 C14 16, 12 11, 10 10 M27 20 C34 16, 36 11, 38 10" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M20 23 C12 22, 10 26, 8 28 M28 23 C36 22, 38 26, 40 28" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M20 30 C12 33, 11 39, 12 42 M28 30 C36 33, 37 39, 36 42" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>`,
  vulture: `<path d="M24 20 L10 14 C10 14, 14 22, 20 24 M24 20 L38 14 C38 14, 34 22, 28 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><polygon points="24,20 27,28 24,34 21,28" fill="currentColor"/><path d="M20 34 L18 38 M28 34 L30 38" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>`,
  mysterio: `<path d="M12 26 A12 12 0 0 1 36 26 Z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M12 26 Q24 32 36 26" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M18 20 C20 18, 22 22, 24 20 C26 18, 28 22, 30 20" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>`,
  'moon-knight': `<path d="M28 10 C18 12, 14 22, 16 32 C18 37, 24 40, 28 38 C20 36, 18 24, 24 16 C26 13, 27 11, 28 10 Z" fill="currentColor"/>`,
  'she-hulk': `<path d="M17 12 L24 24 L31 12 M24 24 L24 38" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="24" cy="24" r="16" fill="none" stroke="currentColor" stroke-width="1.1" stroke-dasharray="2 4" opacity="0.6"/>`,
  'riri-williams': `<path d="M24 36 C16 30, 11 24, 11 18 C11 14, 15 12, 18 14 C20 15, 24 19, 24 19 C24 19, 28 15, 30 14 C33 12, 37 14, 37 18 C37 24, 32 30, 24 36 Z" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="24" cy="22" r="2.6" fill="currentColor"/>`,
  'shang-chi': `<circle cx="24" cy="24" r="15" fill="none" stroke="currentColor" stroke-width="0.9" stroke-dasharray="2 3"/><circle cx="24" cy="15" r="3.4" fill="none" stroke="currentColor" stroke-width="1.3"/><circle cx="31" cy="20" r="3.4" fill="none" stroke="currentColor" stroke-width="1.3"/><circle cx="29" cy="29" r="3.4" fill="none" stroke="currentColor" stroke-width="1.3"/><circle cx="19" cy="29" r="3.4" fill="none" stroke="currentColor" stroke-width="1.3"/><circle cx="17" cy="20" r="3.4" fill="none" stroke="currentColor" stroke-width="1.3"/><circle cx="24" cy="24" r="2.2" fill="currentColor"/>`,
  'xu-wenwu': `<circle cx="17" cy="15" r="3" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="17" cy="21" r="3" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="17" cy="27" r="3" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="17" cy="33" r="3" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="31" cy="15" r="3" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="31" cy="21" r="3" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="31" cy="27" r="3" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="31" cy="33" r="3" fill="none" stroke="currentColor" stroke-width="1.4"/>`,
  ultron: `<path d="M14 18 C14 13, 34 13, 34 18 L34 26 C34 34, 24 40, 24 40 C24 40, 14 34, 14 26 Z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M17 22 L22 24 L17 26 M31 22 L26 24 L31 26" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M19 32 L22 30 L24 32 L26 30 L29 32" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>`,
  zemo: `<path d="M15 12 L33 12 L33 30 C33 36, 24 40, 24 40 C24 40, 15 36, 15 30 Z" fill="none" stroke="currentColor" stroke-width="1.6"/><line x1="24" y1="12" x2="24" y2="40" stroke="currentColor" stroke-width="1.2" opacity="0.6"/><rect x="18" y="20" width="4" height="3" fill="currentColor"/><rect x="26" y="20" width="4" height="3" fill="currentColor"/>`,
  echo: `<circle cx="18" cy="24" r="2.6" fill="currentColor"/><path d="M24 18 A8 8 0 0 1 24 30 M28 14 A14 14 0 0 1 28 34 M32 10 A20 20 0 0 1 32 38" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>`,
  'yelena-belova': `<circle cx="24" cy="24" r="13" fill="none" stroke="currentColor" stroke-width="1.4"/><polygon points="18,17 30,17 24,24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><polygon points="18,31 30,31 24,24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>`,
  'kate-bishop': `<path d="M16 10 C24 16, 24 32, 16 38" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><line x1="16" y1="10" x2="16" y2="38" stroke="currentColor" stroke-width="1.2"/><line x1="16" y1="24" x2="36" y2="24" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><polygon points="36,24 31,21 31,27" fill="currentColor"/>`,
  'red-guardian': `<path d="M14 14 L34 14 L34 28 C34 35, 24 39, 24 39 C24 39, 14 35, 14 28 Z" fill="none" stroke="currentColor" stroke-width="1.6"/><polygon points="24,18 26,23 31,23 27,26 28.5,31 24,28 19.5,31 21,26 17,23 22,23" fill="currentColor"/>`,
  taskmaster: `<path d="M16 14 C16 10, 32 10, 32 14 L32 24 C32 32, 24 38, 24 38 C24 38, 16 32, 16 24 Z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M20 20 L23 22 L20 24 M28 20 L25 22 L28 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 12 L18 18 M36 12 L30 18" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>`,
  'john-walker': `<circle cx="24" cy="24" r="15" fill="none" stroke="currentColor" stroke-width="1.4"/><polygon points="24,13 27,21 35,21 28.5,26 31,34 24,29 17,34 19.5,26 13,21 21,21" fill="currentColor"/><line x1="10" y1="24" x2="38" y2="24" stroke="var(--void)" stroke-width="2.4"/>`,
  'bob-sentry': `<circle cx="24" cy="24" r="6" fill="currentColor"/><path d="M24 12 L24 6 M24 42 L24 36 M12 24 L6 24 M42 24 L36 24 M15 15 L11 11 M33 15 L37 11 M15 33 L11 37 M33 33 L37 37" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M24 24 A6 6 0 0 0 24 12 A12 12 0 0 1 24 36 A6 6 0 0 0 24 24 Z" fill="var(--void)" opacity="0.55"/>`,
  valentina: `<circle cx="16" cy="16" r="4.5" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="32" cy="16" r="4.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M16 20 L24 34 L32 20" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/><circle cx="24" cy="34" r="2" fill="currentColor"/>`,
  'reed-richards': `<circle cx="24" cy="24" r="15" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M26 14 L18 26 L29 26 M26 14 L26 34" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>`,
  'sue-storm': `<circle cx="24" cy="24" r="15" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="3 4"/><circle cx="24" cy="24" r="9" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="24" cy="24" r="2.4" fill="currentColor"/>`,
  'johnny-storm': `<path d="M24 8 C20 16, 14 18, 15 26 C16 33, 22 34, 21 28 C24 33, 27 30, 26 26 C31 30, 34 26, 32 20 C30 24, 28 22, 28 18 C28 14, 26 11, 24 8 Z" fill="currentColor"/>`,
  'ben-grimm': `<path d="M13 18 C13 15, 35 15, 35 18 L35 30 C35 34, 24 38, 24 38 C24 38, 13 34, 13 30 Z" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M13 24 L21 22 L27 26 L35 23 M21 22 L20 30 M27 26 L28 36" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.7"/>`,
  'matt-murdock': `<path d="M15 14 L23 14 C27 14, 29 18, 29 24 C29 30, 27 34, 23 34 L15 34 Z" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 11 L16 14 M36 11 L32 14" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>`,
  'wilson-fisk': `<path d="M18 38 L30 38 L29 24 C33 22, 33 15, 28 14 C28 10, 20 10, 20 14 C15 15, 15 22, 19 24 Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><line x1="24" y1="10" x2="24" y2="7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>`,
  'jessica-jones': `<path d="M10 30 L24 16 L38 30" fill="none" stroke="currentColor" stroke-width="1.4" opacity="0.5" stroke-linecap="round"/><path d="M20 12 L22 26 L18 26 L20 38" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="30" cy="22" r="2" fill="currentColor"/>`,
  'luke-cage': `<circle cx="18" cy="20" r="5" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="30" cy="28" r="5" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M21 23 L24 24 M24 24 L27 25" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>`,
  /* The fist itself, struck through a ring: what the character can do is
     concentrate everything into one hand, once, and then have to wait. */
  'iron-fist': `<circle cx="24" cy="24" r="14" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.45"/><path d="M17 21 C17 17, 31 17, 31 21 L31 28 C31 32, 17 32, 17 28 Z" fill="currentColor"/><line x1="20" y1="24" x2="28" y2="24" stroke="var(--void)" stroke-width="1.2"/><path d="M24 6 L24 10 M24 38 L24 42 M6 24 L10 24 M38 24 L42 24" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>`,
  /* Three claw marks. The simplest thing a tiger leaves behind. */
  'white-tiger': `<path d="M14 12 C18 20, 20 30, 19 38" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><path d="M24 10 C28 19, 29 30, 27 38" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><path d="M34 13 C36 21, 36 31, 34 37" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>`,
  /* The amulet, which is the thing that actually passes from one of them to
     the other, drawn as the stone in its setting. */
  'angela-del-toro': `<path d="M24 9 L34 17 L30 34 L18 34 L14 17 Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><circle cx="24" cy="23" r="5.5" fill="currentColor"/><path d="M24 18.5 L24 27.5" stroke="var(--void)" stroke-width="1.6" stroke-linecap="round"/><path d="M14 17 L34 17" stroke="currentColor" stroke-width="1.1" opacity="0.5"/>`,
  'frank-castle': `<path d="M15 16 C15 12, 33 12, 33 16 L33 24 L28 24 L28 34 L20 34 L20 24 L15 24 Z" fill="currentColor"/><rect x="18" y="18" width="3.5" height="3" rx="1" fill="var(--void)"/><rect x="26.5" y="18" width="3.5" height="3" rx="1" fill="var(--void)"/>`,
  'peggy-carter': `<path d="M10 20 C14 15, 34 15, 38 20 L34 22 C28 19, 20 19, 14 22 Z" fill="currentColor"/><circle cx="24" cy="17" r="2.4" fill="currentColor"/><polygon points="24,26 26,30 24,33 22,30" fill="currentColor"/>`,

  /* ---------------- MCU, the Asgard court ---------------- */
  /* Read on 2026-09-11 from the MCU character lists the fact files cite, and
     from Jane Foster's own page. */

  /* Fandral the Dashing: a rapier, with its swept guard. */
  fandral: `<path d="M12 36 L36 12" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M11 29 C15 31, 17 33, 19 37" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M12 36 L7 41" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/><circle cx="37" cy="11" r="1.6" fill="currentColor"/>`,
  /* Frigga: the queen's circlet. */
  frigga: `<path d="M9 30 C13 20, 35 20, 39 30" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><polygon points="24,13 27,21 21,21" fill="currentColor"/><circle cx="15" cy="23.5" r="1.8" fill="currentColor"/><circle cx="33" cy="23.5" r="1.8" fill="currentColor"/>`,
  /* The Grandmaster: the Contest of Champions, a trophy. */
  grandmaster: `<path d="M15 10 L33 10 L32 22 C32 28, 27 31, 24 31 C21 31, 16 28, 16 22 Z" fill="currentColor"/><path d="M15 13 C9 13, 9 22, 16 23 M33 13 C39 13, 39 22, 32 23" fill="none" stroke="currentColor" stroke-width="1.8"/><rect x="21.5" y="31" width="5" height="5" fill="currentColor"/><rect x="16" y="36" width="16" height="3.5" rx="1" fill="currentColor"/>`,
  /* Heimdall: the eye that sees across every world. */
  heimdall: `<path d="M7 24 C13 15, 35 15, 41 24 C35 33, 13 33, 7 24 Z" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="24" cy="24" r="5" fill="currentColor"/><path d="M24 10 L24 13.5 M24 34.5 L24 38 M12 13 L14.5 16 M36 13 L33.5 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>`,
  /* Hogun the Grim: a warrior, a mace. */
  hogun: `<line x1="11" y1="41" x2="25" y2="23" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/><circle cx="29" cy="17.5" r="7.5" fill="currentColor"/><polygon points="29,5 31.5,10 26.5,10" fill="currentColor"/><polygon points="41.5,17.5 36.5,20 36.5,15" fill="currentColor"/><polygon points="38,8.5 37,14 32.5,9.5" fill="currentColor"/><polygon points="20,8.5 25.5,9.5 21,14" fill="currentColor"/><polygon points="16.5,17.5 21.5,15 21.5,20" fill="currentColor"/><polygon points="38,26.5 32.5,25.5 37,21" fill="currentColor"/>`,
  /* Jane Foster: the hammer, in the pieces it came to her in. */
  'jane-foster': `<rect x="12" y="10" width="24" height="13" rx="2" fill="currentColor"/><path d="M18 10 L21 14.5 L17.5 18.5 L20.5 23 M31 10 L27.5 14 L31.5 18 L28.5 23" fill="none" stroke="var(--void)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><line x1="24" y1="23" x2="24" y2="39" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>`,
  /* Korg: a Kronan, which is to say stones stacked into somebody. */
  korg: `<ellipse cx="24" cy="36" rx="13" ry="5" fill="currentColor"/><ellipse cx="22" cy="26" rx="10" ry="5" fill="currentColor"/><ellipse cx="25" cy="17" rx="7.5" ry="4.5" fill="currentColor"/><circle cx="23" cy="9" r="3.6" fill="currentColor"/>`,
  /* Malekith: the sun put out, a world submerged in darkness. */
  malekith: `<circle cx="24" cy="24" r="13" fill="currentColor"/><circle cx="21.5" cy="24" r="11.5" fill="var(--void)"/><path d="M24 5 L24 9 M24 39 L24 43 M5 24 L9 24 M39 24 L43 24" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>`,
  /* Odin: the Allfather, the crown of Asgard. */
  'odin-borson': `<path d="M9 36 L9 20 L16 27 L24 11 L32 27 L39 20 L39 36 Z" fill="currentColor"/><line x1="9" y1="31" x2="39" y2="31" stroke="var(--void)" stroke-width="1.6"/><circle cx="24" cy="26" r="1.8" fill="var(--void)"/>`,
  /* Sif: the warrior, shield and sword. */
  sif: `<polygon points="21,4 27,4 25.5,16 22.5,16" fill="currentColor"/><circle cx="24" cy="24" r="9.5" fill="currentColor"/><circle cx="24" cy="24" r="2.4" fill="var(--void)"/><line x1="15" y1="35" x2="33" y2="35" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><line x1="24" y1="35" x2="24" y2="44" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>`,
  /* Skurge: the two rifles he held the bridge with. */
  skurge: `<path d="M9 9 L39 39 M39 9 L9 39" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/><path d="M15 21 L18 24 M33 21 L30 24 M12.5 12.5 L9 16 M35.5 12.5 L39 16" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>`,
  /* Surtur: the fire demon, a flame with horns. */
  surtur: `<path d="M24 8 C31 15, 34 22, 30 30 C34 27, 34 24, 33 22 C38 30, 34 40, 24 41 C14 40, 10 30, 15 22 C14 24, 14 27, 18 30 C14 22, 17 15, 24 8 Z" fill="currentColor"/><path d="M15 22 C10 18, 8 13, 9 8 M33 22 C38 18, 40 13, 39 8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
  /* Volstagg: the warrior who loves to eat. */
  volstagg: `<ellipse cx="27" cy="20" rx="12" ry="9" fill="currentColor" transform="rotate(-40 27 20)"/><line x1="19" y1="30" x2="10" y2="39" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/><circle cx="9" cy="40" r="2.6" fill="currentColor"/><circle cx="11.5" cy="36.5" r="2.2" fill="currentColor"/><circle cx="7" cy="37.5" r="2.2" fill="currentColor"/>`,

  /* ---------------- MCU, the Eternals, the Defenders and the Guardians ---------------- */
  /* Read on 2026-09-11 from the MCU character lists and the Netflix series
     character lists the fact files cite. */

  /* Ajak: the bridge between the Eternals and the Celestial. */
  ajak: `<path d="M9 33 L9 26 C9 13, 39 13, 39 26 L39 33" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M4 34 L44 34" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M17 34 L17 27 M24 34 L24 25 M31 34 L31 27" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.7"/>`,
  /* Dane Whitman: the history professor, an open book. */
  'dane-whitman': `<path d="M24 15 C18 11.5, 12 11.5, 8 13.5 L8 36 C12 34, 18 34, 24 37.5 C30 34, 36 34, 40 36 L40 13.5 C36 11.5, 30 11.5, 24 15 Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><line x1="24" y1="15" x2="24" y2="37.5" stroke="currentColor" stroke-width="1.4"/>`,
  /* Druig: other people's minds, on strings. */
  druig: `<path d="M11 11 L37 11 M24 6 L24 16" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><path d="M14 11 L15.5 32 M24 16 L24 34 M34 11 L32.5 32" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/><circle cx="15.5" cy="35" r="2.6" fill="currentColor"/><circle cx="24" cy="37" r="2.6" fill="currentColor"/><circle cx="32.5" cy="35" r="2.6" fill="currentColor"/>`,
  /* Gilgamesh: the fist, inside the exoskeleton of energy he puts around it. */
  gilgamesh: `<circle cx="24" cy="24" r="16" fill="none" stroke="currentColor" stroke-width="1.3" stroke-dasharray="3 2.5"/><rect x="15" y="17" width="18" height="15" rx="4" fill="currentColor"/><path d="M20 17 L20 26 M24.5 17 L24.5 26 M29 17 L29 26" stroke="var(--void)" stroke-width="1.2"/>`,
  /* Ikaris: the beams from his eyes. */
  ikaris: `<circle cx="17" cy="14" r="9" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="14" cy="14" r="1.9" fill="currentColor"/><circle cx="20" cy="14" r="1.9" fill="currentColor"/><path d="M15 17 L27 42 M21 17 L36 40" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>`,
  /* Kingo: what leaves his hands. */
  kingo: `<circle cx="24" cy="33" r="7" fill="currentColor"/><path d="M19 27 L13 18 M24 26 L24 15 M29 27 L35 18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" opacity="0.7"/><circle cx="12" cy="15.5" r="2.6" fill="currentColor"/><circle cx="24" cy="11.5" r="2.6" fill="currentColor"/><circle cx="36" cy="15.5" r="2.6" fill="currentColor"/>`,
  /* Makkari: speed, the shape of a sonic boom. */
  makkari: `<polygon points="41,24 14,9 22,24 14,39" fill="currentColor"/><path d="M6 17 L11 17 M4 24 L10 24 M6 31 L11 31" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" opacity="0.7"/>`,
  /* Phastos: the inventor. */
  phastos: `<path d="M24 7 C16 7, 12 13, 12 19 C12 25, 17 27, 18 32 L30 32 C31 27, 36 25, 36 19 C36 13, 32 7, 24 7 Z" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M19 36 L29 36 M20.5 40 L27.5 40" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M21 21 L24 26 L27 21" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>`,
  /* Sersi: one thing turned into another. */
  sersi: `<rect x="5" y="17" width="14" height="14" rx="1" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M21 24 L27 24" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><polygon points="30,24 26,21 26,27" fill="currentColor"/><circle cx="36.5" cy="24" r="7" fill="currentColor"/>`,
  /* Sprite: a child, and the grown woman she projects around herself. */
  sprite: `<circle cx="24" cy="24" r="5" fill="currentColor"/><circle cx="24" cy="24" r="13.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 2.5"/>`,
  /* Thena: a weapon, forming out of nothing. */
  thena: `<polygon points="24,4 29.5,17 24,20.5 18.5,17" fill="currentColor"/><line x1="24" y1="21" x2="24" y2="43" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-dasharray="3.5 2.5"/>`,

  /* Muse: the brush, and what he paints with. */
  'bastian-cooper': `<line x1="8" y1="40" x2="24" y2="21" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><path d="M22 19 L27.5 22.5 L37 8 Z" fill="currentColor"/><path d="M36 26 C34 29, 34 31, 36 32 C38 31, 38 29, 36 26 Z" fill="currentColor"/><path d="M40 34 C38.5 36, 38.5 37.5, 40 38.5 C41.5 37.5, 41.5 36, 40 34 Z" fill="currentColor"/>`,
  /* Colleen Wing: bushido, a sheathed katana. */
  'colleen-wing': `<path d="M23 42 C22 32, 22.5 25, 24.5 19" fill="none" stroke="currentColor" stroke-width="4.6" stroke-linecap="round"/><ellipse cx="24.8" cy="17" rx="5.5" ry="1.9" fill="currentColor"/><path d="M25.5 15 C26 11, 26.5 8, 27.5 5" fill="none" stroke="currentColor" stroke-width="3.6" stroke-linecap="round"/><path d="M24.5 12.5 L28 11.5 M25 9.5 L28.5 8.5" stroke="var(--void)" stroke-width="0.9"/>`,
  /* Davos: the fist he thought was his, drawn empty. */
  davos: `<path d="M14 21 C14 15.5, 18 15, 20 15 L30 15 C33 15, 35 17, 35 20 L35 30 C35 34, 32 36, 28 36 L19 36 C15.5 36, 14 33, 14 30 Z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/><path d="M20 15 L20 24 M25 15 L25 24 M30 15 L30 24" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>`,
  /* Bullseye: the target, and something arriving at the centre of it. */
  'dex-poindexter': `<circle cx="24" cy="24" r="14" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="24" cy="24" r="8" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="24" cy="24" r="2.4" fill="currentColor"/><path d="M42 6 L26 22" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><polygon points="24,24 27,19 29,21" fill="currentColor"/>`,
  /* Elektra: the world is a chess game to her, and she is the queen. */
  'elektra-natchios': `<circle cx="24" cy="7.5" r="2.4" fill="currentColor"/><path d="M14 14 L18 21 L21 13 L24 22 L27 13 L30 21 L34 14 L32 28 L16 28 Z" fill="currentColor"/><path d="M17 31 L31 31 M15 35 L33 35" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><rect x="13" y="37.5" width="22" height="4" rx="1" fill="currentColor"/>`,
  /* Kilgrave: a mind pulled inward. */
  kilgrave: `<path d="M24 24 C26 22, 29 23, 29 26 C29 30, 23 31, 20 28 C16 24, 20 17, 26 17 C34 17, 37 25, 33 31 C29 37, 18 38, 13 31 C8 24, 12 12, 24 10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
  /* Misty Knight: the arm they built her. */
  'misty-knight': `<path d="M14 7 L14 23" stroke="currentColor" stroke-width="6.5" stroke-linecap="round"/><circle cx="15" cy="25.5" r="4.6" fill="currentColor"/><path d="M18 27.5 L36 27.5" stroke="currentColor" stroke-width="6.5" stroke-linecap="round"/><path d="M23 24.5 L23 30.5 M28 24.5 L28 30.5 M33 24.5 L33 30.5" stroke="var(--void)" stroke-width="1.2"/><circle cx="38.5" cy="27.5" r="4.2" fill="currentColor"/>`,
  /* Hellcat: the cat. */
  'trish-walker': `<circle cx="24" cy="26" r="11" fill="currentColor"/><polygon points="13,20 12,8 22,15.5" fill="currentColor"/><polygon points="35,20 36,8 26,15.5" fill="currentColor"/><ellipse cx="19.5" cy="25" rx="1.4" ry="2.2" fill="var(--void)"/><ellipse cx="28.5" cy="25" rx="1.4" ry="2.2" fill="var(--void)"/>`,

  /* Adam Warlock: the cocoon, opened too early. */
  'adam-warlock': `<ellipse cx="24" cy="25" rx="10.5" ry="14.5" fill="currentColor"/><path d="M24 10.5 L21 18 L26 24 L22 31 L25 38" fill="none" stroke="var(--void)" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>`,
  /* Ego: a planet that is a person. */
  ego: `<circle cx="24" cy="24" r="14" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M14 24 C18 18.5, 30 18.5, 34 24 C30 29.5, 18 29.5, 14 24 Z" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="24" cy="24" r="3" fill="currentColor"/>`,
  /* The High Evolutionary: lower forms, pushed upward. */
  'high-evolutionary': `<circle cx="10" cy="37" r="2.4" fill="currentColor"/><circle cx="19" cy="30" r="3.4" fill="currentColor"/><circle cx="29" cy="21.5" r="4.6" fill="currentColor"/><path d="M33 16 L40 8" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><polygon points="42,6 35,7.5 40.5,13" fill="currentColor"/>`,
  /* Howard the Duck: the duck. */
  'howard-the-duck': `<circle cx="20" cy="21" r="9.5" fill="currentColor"/><path d="M27 19 C34 16.5, 41 18.5, 42 23 C41 27, 34 28.5, 27 26 Z" fill="currentColor"/><circle cx="22" cy="18" r="1.7" fill="var(--void)"/><path d="M14 30 C13 35, 15 39, 20 40" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
  /* Ronan the Accuser: the gavel. */
  ronan: `<rect x="20" y="8" width="18" height="9" rx="2" fill="currentColor" transform="rotate(45 29 12.5)"/><line x1="26" y1="16" x2="12" y2="30" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/><rect x="22" y="35" width="18" height="4.5" rx="1.5" fill="currentColor"/>`,
  /* The Collector: cases, with something kept in each. */
  'taneleer-tivan': `<rect x="8" y="9" width="14" height="13" rx="1" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="26" y="9" width="14" height="13" rx="1" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="8" y="26" width="14" height="13" rx="1" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="26" y="26" width="14" height="13" rx="1" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="15" cy="15.5" r="2.4" fill="currentColor"/><polygon points="33,12 36.5,19 29.5,19" fill="currentColor"/><rect x="12" y="30" width="6" height="5" fill="currentColor"/><circle cx="33" cy="32.5" r="1.4" fill="currentColor"/><circle cx="33" cy="32.5" r="3.6" fill="none" stroke="currentColor" stroke-width="1"/>`,

  /* ---------------- MCU, everyone else who fell into the generator ---------------- */
  /* Read on 2026-09-11 from the MCU character lists, the film cast sections
     and the character pages the fact files cite. */

  /* Iron Man */
  /* Obadiah Stane: the reactor, taken and put into something cruder. */
  'obadiah-stane': `<rect x="9" y="9" width="30" height="30" rx="5" fill="currentColor"/><circle cx="24" cy="24" r="7.5" fill="var(--void)"/><circle cx="24" cy="24" r="3" fill="currentColor"/><circle cx="14" cy="14" r="1.5" fill="var(--void)"/><circle cx="34" cy="14" r="1.5" fill="var(--void)"/><circle cx="14" cy="34" r="1.5" fill="var(--void)"/><circle cx="34" cy="34" r="1.5" fill="var(--void)"/>`,
  /* Whiplash: two electric whips out of one reactor. */
  'ivan-vanko': `<circle cx="24" cy="24" r="3.4" fill="currentColor"/><path d="M21 22 C12 16, 8 20, 6 10 M27 22 C36 16, 40 20, 42 10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M6 10 L4 6 M6 10 L9 7 M42 10 L44 6 M42 10 L39 7" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M22 27 C18 34, 12 36, 10 42 M26 27 C30 34, 36 36, 38 42" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.7"/>`,
  /* Captain America */
  /* Crossbones: the name, drawn plainly. */
  'brock-rumlow': `<path d="M11 11 L37 37 M37 11 L11 37" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/><circle cx="10" cy="10" r="2.6" fill="currentColor"/><circle cx="38" cy="10" r="2.6" fill="currentColor"/><circle cx="10" cy="38" r="2.6" fill="currentColor"/><circle cx="38" cy="38" r="2.6" fill="currentColor"/>`,
  /* Batroc: the kickboxer, mid kick. */
  'georges-batroc': `<path d="M13 7 L15 22 L30 27" fill="none" stroke="currentColor" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M29 22 L39 24 L40 31 L31 32 Z" fill="currentColor"/><path d="M36 15 L41 12 M42 20 L45 19 M35 38 L39 41" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" opacity="0.75"/>`,
  /* Red Skull: the skull. */
  'johann-schmidt': `<path d="M24 7 C14 7, 10 15, 10 22 C10 28, 13 31, 16 33 L16 39 L32 39 L32 33 C35 31, 38 28, 38 22 C38 15, 34 7, 24 7 Z" fill="currentColor"/><ellipse cx="18.5" cy="22" rx="3.6" ry="4" fill="var(--void)"/><ellipse cx="29.5" cy="22" rx="3.6" ry="4" fill="var(--void)"/><polygon points="24,26 26.5,31 21.5,31" fill="var(--void)"/><path d="M20 39 L20 35 M24 39 L24 35 M28 39 L28 35" stroke="var(--void)" stroke-width="1.3"/>`,
  /* Sharon Carter: the Power Broker, with the case the deal is in. */
  'sharon-carter': `<rect x="8" y="16" width="32" height="22" rx="2.5" fill="currentColor"/><path d="M18 16 L18 11 C18 9.5, 19.5 9, 20.5 9 L27.5 9 C28.5 9, 30 9.5, 30 11 L30 16" fill="none" stroke="currentColor" stroke-width="2.4"/><line x1="8" y1="25" x2="40" y2="25" stroke="var(--void)" stroke-width="1.3"/><rect x="21.5" y="23" width="5" height="4.5" rx="1" fill="var(--void)"/>`,
  /* Hulk */
  /* Abomination: the mass, and what grew out of its back. */
  'emil-blonsky': `<path d="M8 40 C8 26, 14 18, 24 18 C34 18, 40 26, 40 40 Z" fill="currentColor"/><polygon points="12,25 14,15 18,22" fill="currentColor"/><polygon points="19,20 22,9 25.5,19" fill="currentColor"/><polygon points="27,20 31,11 32.5,21" fill="currentColor"/><polygon points="34,24 38,17 38,26" fill="currentColor"/>`,
  /* Samuel Sterns: the mind that grew. */
  'samuel-sterns': `<path d="M24 9 C15 9, 10 15, 10 22 C10 27, 13 30, 16 31 L16 38 L32 38 L32 31 C35 30, 38 27, 38 22 C38 15, 33 9, 24 9 Z" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M24 9 L24 31 M14 17 C18 15, 20 19, 23 17 M25 14 C29 12, 31 16, 34 14 M14 25 C18 23, 20 27, 23 25 M25 22 C29 20, 31 24, 34 22" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" opacity="0.8"/>`,
  /* Thaddeus Ross: the lieutenant general, three stars. */
  'thaddeus-ross': `<polygon points="10,18 11.9,23 17,23.3 13,26.5 14.3,31.5 10,28.7 5.7,31.5 7,26.5 3,23.3 8.1,23" fill="currentColor"/><polygon points="24,18 25.9,23 31,23.3 27,26.5 28.3,31.5 24,28.7 19.7,31.5 21,26.5 17,23.3 22.1,23" fill="currentColor"/><polygon points="38,18 39.9,23 45,23.3 41,26.5 42.3,31.5 38,28.7 33.7,31.5 35,26.5 31,23.3 36.1,23" fill="currentColor"/>`,
  /* Ant-Man */
  /* Ghost: somebody not entirely there. */
  'ava-starr': `<path d="M24 8 C15 8, 11 15, 11 23 L11 39 L16 35 L20 39 L24 35 L28 39 L32 35 L37 39 L37 23 C37 15, 33 8, 24 8 Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" stroke-dasharray="3.5 2.5"/><circle cx="19.5" cy="21" r="1.8" fill="currentColor"/><circle cx="28.5" cy="21" r="1.8" fill="currentColor"/>`,
  /* Cassie Lang: her father's mark, and the size she grows to. */
  'cassie-lang': `<polygon points="24,25 30,35 18,35" fill="currentColor"/><polygon points="24,7 41,39 7,39" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-dasharray="3.5 2.5"/>`,
  /* Doctor Strange */
  /* America Chavez: a doorway shaped like a star. */
  'america-chavez': `<polygon points="24,5 28.5,17.5 41.5,18 31.5,26.5 35,39.5 24,32 13,39.5 16.5,26.5 6.5,18 19.5,17.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><polygon points="24,13 26.5,20 34,20.5 28,25 30,32.5 24,28 18,32.5 20,25 14,20.5 21.5,20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" opacity="0.7"/>`,
  /* Dormammu: the dark, with a face of fire around it. */
  dormammu: `<circle cx="24" cy="24" r="15" fill="currentColor"/><circle cx="24" cy="24" r="9" fill="var(--void)"/><polygon points="24,3 27.5,10 20.5,10" fill="currentColor"/><polygon points="24,45 27.5,38 20.5,38" fill="currentColor"/><polygon points="3,24 10,20.5 10,27.5" fill="currentColor"/><polygon points="45,24 38,20.5 38,27.5" fill="currentColor"/><polygon points="9,9 16,10.5 10.5,16" fill="currentColor"/><polygon points="39,9 37.5,16 32,10.5" fill="currentColor"/><polygon points="9,39 10.5,32 16,37.5" fill="currentColor"/><polygon points="39,39 32,37.5 37.5,32" fill="currentColor"/>`,
  /* Kaecilius: the circle he broke out of. */
  kaecilius: `<path d="M33 12 A13.5 13.5 0 1 0 36.5 27" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><circle cx="40" cy="14" r="3.4" fill="currentColor"/>`,
  /* Mordo: the staff he trains with. */
  'karl-mordo': `<path d="M11 41 L33 15" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/><path d="M33 15 C36 11, 40 11, 41 15 C41.5 18, 38 19, 36 17" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><circle cx="36" cy="17" r="2" fill="currentColor"/>`,
  /* The Ancient One: the circle, whole. */
  'the-ancient-one': `<circle cx="24" cy="24" r="15" fill="none" stroke="currentColor" stroke-width="1.4" stroke-dasharray="2.5 2.5"/><circle cx="24" cy="24" r="9.5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="24" cy="24" r="2.6" fill="currentColor"/>`,
  /* Black Panther */
  /* M'Baku: the gorilla the Jabari hold sacred. */
  mbaku: `<circle cx="8.5" cy="23" r="3.6" fill="currentColor"/><circle cx="39.5" cy="23" r="3.6" fill="currentColor"/><path d="M24 5 C16 5, 10 12, 10 22 C10 31, 14 39, 24 42 C34 39, 38 31, 38 22 C38 12, 32 5, 24 5 Z" fill="currentColor"/><path d="M14 19 C18 15.5, 30 15.5, 34 19" fill="none" stroke="var(--void)" stroke-width="2.2"/><circle cx="18.5" cy="23" r="1.9" fill="var(--void)"/><circle cx="29.5" cy="23" r="1.9" fill="var(--void)"/><ellipse cx="24" cy="31" rx="7" ry="4.5" fill="var(--void)"/><circle cx="21.5" cy="30" r="1.3" fill="currentColor"/><circle cx="26.5" cy="30" r="1.3" fill="currentColor"/>`,
  /* Nakia: a War Dog, sent around the world. */
  nakia: `<circle cx="24" cy="24" r="14" fill="none" stroke="currentColor" stroke-width="1.8"/><ellipse cx="24" cy="24" rx="6" ry="14" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.8"/><path d="M10 24 L38 24" stroke="currentColor" stroke-width="1.2" opacity="0.8"/><circle cx="31" cy="17" r="2.8" fill="currentColor"/>`,
  /* Ramonda: the Queen Mother, in her crown. */
  ramonda: `<path d="M6 17 L42 17 L36 29 L12 29 Z" fill="currentColor"/><path d="M12 22 L36 22" stroke="var(--void)" stroke-width="1.2"/><ellipse cx="24" cy="35.5" rx="6" ry="6.5" fill="none" stroke="currentColor" stroke-width="1.8"/>`,
  /* Ulysses Klaue: the arm that is also a gun. */
  'ulysses-klaue': `<path d="M6 24 L24 24" stroke="currentColor" stroke-width="7" stroke-linecap="round"/><rect x="22" y="18.5" width="11" height="11" rx="2" fill="currentColor"/><path d="M36 17 A9 9 0 0 1 36 31 M40 12 A15 15 0 0 1 40 36" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>`,
  /* Captain Marvel */
  /* Yon-Rogg: the blood he gave her, and the war it was for. */
  'yon-rogg': `<path d="M24 6 C24 6, 11 22, 11 30 C11 37, 17 42, 24 42 C31 42, 37 37, 37 30 C37 22, 24 6, 24 6 Z" fill="currentColor"/><polygon points="24,22 26,27.5 32,28 27.5,31.5 29,37 24,34 19,37 20.5,31.5 16,28 22,27.5" fill="var(--void)"/>`,
  /* Scarlet Witch */
  /* Billy Maximoff: one of two, made the same night. */
  'billy-maximoff': `<circle cx="18.5" cy="24" r="10" fill="currentColor"/><circle cx="29.5" cy="24" r="10" fill="none" stroke="currentColor" stroke-width="1.6" stroke-dasharray="3 2.5"/>`,
  /* Nick Fury */
  /* Phil Coulson: Lola, the car. */
  'phil-coulson': `<path d="M6 30 L9 22 L17 21 L21 15 L31 15 L36 21 L42 22 L43 30 Z" fill="currentColor"/><circle cx="14" cy="32" r="4.5" fill="currentColor"/><circle cx="14" cy="32" r="1.8" fill="var(--void)"/><circle cx="35" cy="32" r="4.5" fill="currentColor"/><circle cx="35" cy="32" r="1.8" fill="var(--void)"/><path d="M22 17 L22 21 L29 21 L29 17" fill="var(--void)"/>`,
  /* Avengers, the Black Order and the Hood */
  /* Corvus Glaive: the glaive. */
  'corvus-glaive': `<line x1="12" y1="42" x2="30" y2="14" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><path d="M30 14 C36 12, 41 6, 42 3 C37 6, 33 5, 28 8 Z" fill="currentColor"/><line x1="30" y1="14" x2="34" y2="16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
  /* Cull Obsidian: the chain hammer. */
  'cull-obsidian': `<rect x="27" y="5" width="15" height="11" rx="2" fill="currentColor" transform="rotate(30 34.5 10.5)"/><circle cx="26" cy="20" r="2.2" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="21" cy="25" r="2.2" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="16" cy="30" r="2.2" fill="none" stroke="currentColor" stroke-width="1.6"/><line x1="13" y1="33" x2="7" y2="41" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/>`,
  /* Ebony Maw: out into space. */
  'ebony-maw': `<path d="M6 20 L14 20 L14 28 L6 28" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="27" cy="24" r="3.4" fill="currentColor"/><path d="M27 27.5 L27 34 M27 34 L23 39 M27 34 L31 39 M27 29 L22 32 M27 29 L32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M34 14 L40 10 M36 24 L43 24 M34 34 L40 38" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" opacity="0.6"/>`,
  /* Proxima Midnight: a star, the nearest one, at midnight. */
  'proxima-midnight': `<polygon points="24,4 27,21 44,24 27,27 24,44 21,27 4,24 21,21" fill="currentColor"/><circle cx="24" cy="24" r="3" fill="var(--void)"/>`,
  /* Swordsman: a fencer's foil, with its bell. */
  'jack-duquesne': `<line x1="24" y1="4" x2="24" y2="30" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M15 27 A9 9 0 0 0 33 27" fill="none" stroke="currentColor" stroke-width="2.4"/><line x1="24" y1="31" x2="24" y2="42" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/>`,
  /* The Hood: the cloak he found, hood up. */
  'parker-robbins': `<path d="M29 6 C17 7, 10 18, 12 41 L36 41 C34 30, 41 16, 29 6 Z" fill="currentColor"/><ellipse cx="20" cy="25" rx="4.5" ry="6.5" fill="var(--void)"/>`,
  /* Spider-Man */
  /* Jackson Brice: the gauntlet, and the vibration it throws. */
  'jackson-brice': `<rect x="5" y="19" width="16" height="10" rx="2" fill="currentColor"/><rect x="20" y="16.5" width="9" height="15" rx="2.5" fill="currentColor"/><path d="M33 16 A9 9 0 0 1 33 32 M38 11 A15 15 0 0 1 38 37" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>`,
  /* Herman Schultz: the same gauntlet, second hand, and the shock it gives. */
  'herman-schultz': `<rect x="17.5" y="17.5" width="13" height="13" rx="3" fill="currentColor"/><path d="M24 4 L21.5 9 L26.5 11 L24 14 M24 44 L26.5 39 L21.5 37 L24 34 M4 24 L9 21.5 L11 26.5 L14 24 M44 24 L39 26.5 L37 21.5 L34 24 M10 10 L11.5 15.5 L15.5 11.5 L16 16 M38 38 L36.5 32.5 L32.5 36.5 L32 32 M38 10 L32.5 11.5 L36.5 15.5 L32 16 M10 38 L15.5 36.5 L11.5 32.5 L16 32" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>`,
  /* Scorpion: the tail. */
  'mac-gargan': `<path d="M8 36 C14 36, 20 34, 24 28 C28 22, 26 14, 30 10 C34 7, 40 10, 38 15" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/><polygon points="38,15 34,19 41,20" fill="currentColor"/><circle cx="8" cy="36" r="3.4" fill="currentColor"/>`,
  /* Fantastic Four */
  /* Galactus: a world, with the bite taken out of it. */
  galactus: `<circle cx="24" cy="26" r="14" fill="currentColor"/><circle cx="34" cy="14" r="9" fill="var(--void)"/><circle cx="41" cy="24" r="1.8" fill="currentColor"/><circle cx="37" cy="7" r="1.4" fill="currentColor"/>`,
  /* Mole Man: the ground, and the way under it. */
  'harvey-elder': `<path d="M4 34 L44 34" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M10 34 C10 22, 38 22, 38 34 Z" fill="currentColor"/><path d="M18 34 C18 27, 30 27, 30 34 Z" fill="var(--void)"/><circle cx="24" cy="31" r="1.6" fill="currentColor"/>`,
  /* Silver Surfer: the board, and where it has been. */
  'shalla-bal': `<path d="M10 38 C16 22, 30 10, 42 6 C38 18, 26 32, 10 38 Z" fill="currentColor"/><path d="M6 30 C10 26, 14 25, 18 26" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>`,
  /* Sony's Spider-Man Universe */
  /* Carlton Drake: the Life Foundation, a symbiote in a vial. */
  'carlton-drake': `<path d="M19 6 L29 6 M21 6 L21 17 L14 34 C13 37, 15 40, 18 40 L30 40 C33 40, 35 37, 34 34 L27 17 L27 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M17 31 C20 27, 28 27, 31 31 L33 36 C33 37.5, 32 38.5, 30.5 38.5 L17.5 38.5 C16 38.5, 15 37.5, 15 36 Z" fill="currentColor"/>`,
  /* Shriek: the scream, jagged. */
  'frances-barrison': `<circle cx="11" cy="24" r="4" fill="currentColor"/><path d="M18 20 L21 14 L24 20 L27 14 L30 20 M18 28 L21 34 L24 28 L27 34 L30 28 M33 17 L36 11 L39 17 L42 11 M33 31 L36 37 L39 31 L42 37" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>`,
  /* Knull: where the symbiotes come from, dripping. */
  knull: `<rect x="8" y="9" width="32" height="7" rx="2" fill="currentColor"/><path d="M12 16 L12 27 L14.5 27 L14.5 16 Z M19 16 L19 36 L22 36 L22 16 Z M26.5 16 L26.5 30 L29.5 30 L29.5 16 Z M34 16 L34 40 L37 40 L37 16 Z" fill="currentColor"/><circle cx="13.25" cy="28" r="1.7" fill="currentColor"/><circle cx="20.5" cy="37" r="2" fill="currentColor"/><circle cx="28" cy="31" r="1.9" fill="currentColor"/><circle cx="35.5" cy="41" r="2" fill="currentColor"/>`,
  /* Midnight Sons and Blade */
  /* Elsa Bloodstone: the family's stone. */
  'elsa-bloodstone': `<ellipse cx="24" cy="24" rx="11" ry="14" fill="currentColor"/><ellipse cx="24" cy="24" rx="14.5" ry="17.5" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="20" cy="17" rx="2.5" ry="4" fill="var(--void)" opacity="0.6"/>`,
  /* Werewolf by Night: the moon, and what it brings out. */
  'jack-russell': `<circle cx="24" cy="24" r="15" fill="currentColor"/><path d="M14 13 L26 37 M20 10 L32 34 M27 10 L38 30" stroke="var(--void)" stroke-width="2.4" stroke-linecap="round"/>`,
  /* Man-Thing: the swamp. */
  'man-thing': `<path d="M5 34 C10 30, 14 30, 19 34 C24 38, 28 38, 33 34 C38 30, 41 30, 44 34" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M14 32 L14 14 M24 34 L24 10 M34 32 L34 16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><ellipse cx="14" cy="13" rx="2.2" ry="4.5" fill="currentColor"/><ellipse cx="24" cy="9" rx="2.2" ry="4.5" fill="currentColor"/><ellipse cx="34" cy="15" rx="2.2" ry="4.5" fill="currentColor"/>`,
  /* Blade: the blade. */
  blade: `<polygon points="38,6 42,10 20,32 16,28" fill="currentColor"/><path d="M12 24 L24 36" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><path d="M15.5 28.5 L8 36" stroke="currentColor" stroke-width="3.4" stroke-linecap="round"/><path d="M13 31 L11 33 M10.5 33.5 L8.5 35.5" stroke="var(--void)" stroke-width="0.9"/>`,
  /* Eric Brooks: the daywalker, a stake in the sun. */
  'eric-brooks': `<circle cx="24" cy="18" r="11" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M24 3 L24 5 M9 18 L7 18 M41 18 L39 18 M13.4 7.4 L14.8 8.8 M34.6 7.4 L33.2 8.8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><polygon points="20,10 28,10 24,43" fill="currentColor"/>`,
  /* Punisher */
  /* Jigsaw: the piece his mind came back in. */
  'billy-russo': `<path d="M12 14 L21 14 C20 10, 22 8, 24 8 C26 8, 28 10, 27 14 L36 14 L36 22 C40 21, 42 23, 42 25 C42 27, 40 29, 36 28 L36 36 L27 36 C28 40, 26 42, 24 42 C22 42, 20 40, 21 36 L12 36 Z" fill="currentColor"/>`,
  /* Ghost Rider */
  /* Johnny Blaze: the wheel he rides on, burning. */
  'johnny-blaze': `<circle cx="24" cy="30" r="10" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="24" cy="30" r="2.5" fill="currentColor"/><path d="M14 20 C16 14, 18 11, 19 6 C21 10, 22 12, 24 14 C25 10, 27 8, 30 6 C30 11, 33 14, 34 20 Z" fill="currentColor"/>`,
  /* Robbie Reyes: the Rider, a skull in fire. */
  'robbie-reyes': `<path d="M24 18 C18 18, 15 22, 15 27 C15 30, 16.5 32, 18.5 33.5 L18.5 38 L29.5 38 L29.5 33.5 C31.5 32, 33 30, 33 27 C33 22, 30 18, 24 18 Z" fill="currentColor"/><ellipse cx="20.5" cy="27" rx="2.2" ry="2.6" fill="var(--void)"/><ellipse cx="27.5" cy="27" rx="2.2" ry="2.6" fill="var(--void)"/><path d="M12 22 C12 15, 15 10, 17 5 C19 9, 20 11, 22 13 C23 9, 26 6, 29 4 C29 9, 33 12, 36 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`,

  /* ---------------- FOX (X-Men / Terra-10005) ---------------- */
  wolverine: `<path d="M14 12 C16 24, 15 32, 12 36" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round"/><path d="M24 10 C25 24, 24 34, 22 38" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round"/><path d="M34 12 C32 24, 33 32, 36 36" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round"/>`,
  'professor-x': `<circle cx="24" cy="24" r="15" fill="none" stroke="currentColor" stroke-width="1.6"/><line x1="16" y1="16" x2="32" y2="32" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><line x1="32" y1="16" x2="16" y2="32" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>`,
  magneto: `<path d="M12 24 C12 15, 36 15, 36 24 L31 24 C31 19, 17 19, 17 24 Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M12 24 L12 30 L17 30 L17 24 M36 24 L36 30 L31 30 L31 24" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M24 32 C20 36, 28 36, 24 40" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>`,
  mystique: `<path d="M22 10 C14 16, 14 32, 22 38 C18 30, 18 18, 22 10 Z" fill="currentColor"/><path d="M26 10 C34 16, 34 32, 26 38 C30 30, 30 18, 26 10 Z" fill="none" stroke="currentColor" stroke-width="1.5"/>`,
  'jean-grey': `<path d="M24 8 C22 16, 14 18, 12 28 C11 34, 16 38, 20 36 C18 32, 20 28, 24 26 C28 28, 30 32, 28 36 C32 38, 37 34, 36 28 C34 18, 26 16, 24 8 Z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M20 22 L24 20 L28 22" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>`,
  cyclops: `<rect x="10" y="20" width="28" height="8" rx="4" fill="none" stroke="currentColor" stroke-width="1.6"/><line x1="16" y1="24" x2="40" y2="24" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><line x1="16" y1="24" x2="8" y2="24" stroke="currentColor" stroke-width="1.4" opacity="0.5"/>`,
  storm: `<path d="M25 8 L18 24 L24 24 L20 40 L33 20 L26 20 Z" fill="currentColor"/><path d="M11 16 C8 18, 8 22, 11 24 M14 30 C11 32, 11 36, 14 38" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" opacity="0.65"/>`,
  beast: `<circle cx="24" cy="24" r="8" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="24" cy="24" rx="14" ry="6" fill="none" stroke="currentColor" stroke-width="1.2" transform="rotate(35 24 24)"/><ellipse cx="24" cy="24" rx="14" ry="6" fill="none" stroke="currentColor" stroke-width="1.2" transform="rotate(-35 24 24)"/><circle cx="24" cy="24" r="2.2" fill="currentColor"/>`,
  deadpool: `<circle cx="24" cy="24" r="14" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="24" y1="10" x2="24" y2="38" stroke="currentColor" stroke-width="1.6"/><ellipse cx="18.5" cy="24" rx="3.2" ry="5" fill="currentColor" transform="rotate(-15 18.5 24)"/><ellipse cx="29.5" cy="24" rx="3.2" ry="5" fill="currentColor" transform="rotate(15 29.5 24)"/>`,
  cable: `<circle cx="20" cy="20" r="8" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="20" y1="12" x2="20" y2="28" stroke="currentColor" stroke-width="1.4"/><line x1="12" y1="20" x2="28" y2="20" stroke="currentColor" stroke-width="1.4"/><circle cx="20" cy="20" r="2" fill="currentColor"/><path d="M26 26 L36 36 M30 26 L36 32 M26 30 L32 36" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>`,
  domino: `<circle cx="20" cy="20" r="9" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="20" cy="20" r="3" fill="currentColor"/><circle cx="32" cy="14" r="1.6" fill="currentColor"/><circle cx="34" cy="24" r="1.6" fill="currentColor"/><circle cx="30" cy="33" r="1.6" fill="currentColor"/><circle cx="14" cy="34" r="1.6" fill="currentColor"/>`,
  apocalypse: `<polygon points="24,8 38,34 10,34" fill="none" stroke="currentColor" stroke-width="1.6"/><line x1="24" y1="8" x2="24" y2="34" stroke="currentColor" stroke-width="1.2" opacity="0.6"/><circle cx="18" cy="30" r="1.6" fill="currentColor"/><circle cx="24" cy="30" r="1.6" fill="currentColor"/><circle cx="30" cy="30" r="1.6" fill="currentColor"/><circle cx="24" cy="22" r="1.6" fill="currentColor"/>`,
  'quicksilver-fox': `<path d="M10 16 L30 16 M8 24 L34 24 M12 32 L28 32" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><polygon points="34,24 27,19 27,29" fill="currentColor"/>`,
  colossus: `<rect x="13" y="13" width="22" height="22" rx="3" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M13 24 L35 24 M24 13 L24 35" stroke="currentColor" stroke-width="1.2" opacity="0.55"/><circle cx="17" cy="17" r="1.3" fill="currentColor"/><circle cx="31" cy="17" r="1.3" fill="currentColor"/><circle cx="17" cy="31" r="1.3" fill="currentColor"/><circle cx="31" cy="31" r="1.3" fill="currentColor"/>`,
  sabretooth: `<path d="M10 14 C18 22, 22 30, 20 40 M18 12 C26 20, 30 28, 28 38 M26 12 C34 20, 37 27, 36 36" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"/>`,

  /* The people who used to fall back to the generated mark. Each one is drawn
     from the trait its source page gives: the power, the weapon, the thing
     they are known for. Read on 2026-09-11 from the pages their fact files
     cite. */

  /* Havok: plasma rings, fanning out from a point on the chest. */
  'alex-summers': `<circle cx="24" cy="37" r="2.2" fill="currentColor"/><path d="M16 37 A8 8 0 0 1 32 37" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M10 37 A14 14 0 0 1 38 37" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.75"/><path d="M5 37 A19 19 0 0 1 43 37" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" opacity="0.5"/>`,
  /* Angel Salvadore: insect wings, and the acid she spits. */
  'angel-salvadore': `<line x1="24" y1="12" x2="24" y2="32" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><ellipse cx="16" cy="18" rx="9" ry="3" fill="none" stroke="currentColor" stroke-width="1.4" transform="rotate(-30 16 18)"/><ellipse cx="32" cy="18" rx="9" ry="3" fill="none" stroke="currentColor" stroke-width="1.4" transform="rotate(30 32 18)"/><ellipse cx="17" cy="27" rx="7" ry="2.5" fill="none" stroke="currentColor" stroke-width="1.4" transform="rotate(30 17 27)"/><ellipse cx="31" cy="27" rx="7" ry="2.5" fill="none" stroke="currentColor" stroke-width="1.4" transform="rotate(-30 31 27)"/><path d="M24 35 C22 38, 22 40, 24 41 C26 40, 26 38, 24 35 Z" fill="currentColor"/>`,
  /* Darwin: a body that adapts, one shape becoming another. */
  'armando-munoz': `<path d="M24 10 A14 14 0 0 0 24 38 L36 38 L36 10 Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><circle cx="24" cy="24" r="3" fill="currentColor"/>`,
  /* Psylocke: a blade made of psychic energy, point up. */
  'betsy-braddock': `<polygon points="24,5 28,30 20,30" fill="currentColor" opacity="0.85"/><line x1="15" y1="31" x2="33" y2="31" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><line x1="24" y1="31" x2="24" y2="41" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>`,
  /* Juggernaut: the helmet from the front, open down to the chin, and the eyes inside it. */
  'cain-marko': `<path d="M11 37 L11 24 A13 13 0 0 1 37 24 L37 37 L31 37 L31 29.5 A7 7 0 0 0 17 29.5 L17 37 Z" fill="currentColor"/><circle cx="20.8" cy="28.5" r="1.5" fill="currentColor"/><circle cx="27.2" cy="28.5" r="1.5" fill="currentColor"/>`,
  /* Cassandra Nova: Xavier's own mark, in her colour. They are twins. */
  'cassandra-nova': `<circle cx="24" cy="24" r="15" fill="none" stroke="currentColor" stroke-width="1.6"/><line x1="16" y1="16" x2="32" y2="32" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><line x1="32" y1="16" x2="16" y2="32" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>`,
  /* Blink: two portals, and the step between them. */
  'clarice-ferguson': `<polygon points="17,8 25,24 17,40 9,24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><polygon points="34,15 39,24 34,33 29,24" fill="currentColor"/><line x1="17" y1="24" x2="29" y2="24" stroke="currentColor" stroke-width="1.3" stroke-dasharray="2 2"/>`,
  /* Mirage: a thing, and the illusion of it beside it. */
  'dani-moonstar': `<circle cx="18" cy="27" r="7" fill="currentColor"/><circle cx="29" cy="20" r="10" fill="none" stroke="currentColor" stroke-width="1.4" stroke-dasharray="2.5 2"/>`,
  /* Emma Frost: a cut diamond, table and pavilion. */
  'emma-frost': `<polygon points="13,19 19,11 29,11 35,19 24,38" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><line x1="13" y1="19" x2="35" y2="19" stroke="currentColor" stroke-width="1.2"/><path d="M19 11 L22 19 L24 38 M29 11 L26 19 L24 38" fill="none" stroke="currentColor" stroke-width="1" opacity="0.6"/>`,
  /* Blob: a dead weight, the kind nobody lifts. */
  'fred-dukes': `<circle cx="24" cy="29" r="12" fill="currentColor"/><path d="M15 21 C15 8, 33 8, 33 21" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/><line x1="12" y1="41.5" x2="36" y2="41.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>`,
  /* Silver Samurai: a katana, guard and wrapped grip. */
  'ichiro-yashida': `<path d="M19 29.5 C24 25, 30 18.5, 36 11" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><circle cx="17.8" cy="30.7" r="2.9" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M15.8 32.8 L11 37.5" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/><path d="M15 33.8 L13 35.8" stroke="var(--void)" stroke-width="0.9"/>`,
  /* Magik: the Soulsword, point down into a stepping disc. */
  'illyana-rasputina': `<line x1="24" y1="5" x2="24" y2="10" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><line x1="17" y1="12" x2="31" y2="12" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><polygon points="21,13 27,13 24,33" fill="currentColor"/><ellipse cx="24" cy="36" rx="12" ry="3.5" fill="none" stroke="currentColor" stroke-width="1.5"/>`,
  /* Warpath: speed and strength, read as a trail of chevrons. */
  'james-proudstar': `<path d="M13 37 L24 29 L35 37 M13 27 L24 19 L35 27 M13 17 L24 9 L35 17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
  /* Pyro: the lighter he needs, because he cannot make the flame himself. */
  'john-allerdyce': `<rect x="17" y="25" width="14" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><line x1="17" y1="29" x2="31" y2="29" stroke="currentColor" stroke-width="1.2"/><path d="M24 9 C29 14, 30 19, 24 24 C18 19, 20 14, 24 9 Z" fill="currentColor"/>`,
  /* Shadowcat: a solid wall and something passing straight through it. */
  'kitty-pryde': `<rect x="20" y="9" width="8" height="30" rx="1" fill="currentColor"/><line x1="7" y1="24" x2="41" y2="24" stroke="currentColor" stroke-width="1.6" stroke-dasharray="3 2.2" stroke-linecap="round"/><circle cx="41" cy="24" r="2.2" fill="currentColor"/>`,
  /* Nightcrawler: the tail, ending in its point, and the puff of a jump. */
  'kurt-wagner': `<path d="M12 12 C30 10, 8 30, 28 33" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><polygon points="28,29 35,33 28,37 26,33" fill="currentColor"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="1.8 1.6"/>`,
  /* X-23: two claws in each hand and one in each foot. */
  laura: `<path d="M17 9 C18 21, 17 29, 15 34 M31 9 C30 21, 31 29, 33 34" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round"/><line x1="24" y1="29" x2="24" y2="41" stroke="currentColor" stroke-width="2.3" stroke-linecap="round"/>`,
  /* Bishop: the gun he channels energy through, and the bolt leaving it. */
  'lucas-bishop': `<rect x="7" y="21" width="21" height="6" rx="1.5" fill="currentColor"/><rect x="10" y="27" width="4.5" height="9" rx="1" fill="currentColor"/><path d="M30 24 L34 17 L36 27 L41 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`,
  /* Rogue: two fingertips about to meet, and what passes at the touch. */
  'marie-dcanto': `<path d="M5 31 C11 31, 16 28, 21 25.5" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round"/><path d="M43 17 C37 17, 32 20, 27 22.5" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round"/><path d="M24 18 L24 21 M20 28 L22 26 M28 20 L26 22 M24 30 L24 27 M19 22 L21 23.5 M29 26 L27 24.5" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>`,
  /* Negasonic Teenage Warhead: the cloud of the burst she is named for. */
  'negasonic-teenage-warhead': `<circle cx="24" cy="16" r="10.5" fill="currentColor"/><rect x="20.5" y="24" width="7" height="12" fill="currentColor"/><ellipse cx="24" cy="38" rx="13" ry="3" fill="none" stroke="currentColor" stroke-width="1.5"/>`,
  /* Wolfsbane: the wolf she turns into. */
  'rahne-sinclair': `<polygon points="12,7 19,18 24,16 29,18 36,7 34,24 29,32 24,40 19,32 14,24" fill="currentColor"/><circle cx="19.5" cy="23" r="1.4" fill="var(--void)"/><circle cx="28.5" cy="23" r="1.4" fill="var(--void)"/><path d="M22 32 L24 34 L26 32 Z" fill="var(--void)"/>`,
  /* Gambit: a card, charged and about to go off. */
  'remy-lebeau': `<rect x="16" y="12" width="15" height="21" rx="2" fill="none" stroke="currentColor" stroke-width="1.6" transform="rotate(-14 23.5 22.5)"/><path d="M33 11 L36 6 M35 15 L40 14 M30 8 L31 3" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>`,
  /* Sunspot: the sun, with a corona of flame. */
  'roberto-da-costa': `<circle cx="24" cy="24" r="7" fill="currentColor"/><polygon points="24,7 26.5,13 21.5,13" fill="currentColor"/><polygon points="24,41 26.5,35 21.5,35" fill="currentColor"/><polygon points="7,24 13,21.5 13,26.5" fill="currentColor"/><polygon points="41,24 35,21.5 35,26.5" fill="currentColor"/><polygon points="12,12 17.5,13.5 13.5,17.5" fill="currentColor"/><polygon points="36,12 34.5,17.5 30.5,13.5" fill="currentColor"/><polygon points="12,36 13.5,30.5 17.5,34.5" fill="currentColor"/><polygon points="36,36 30.5,34.5 34.5,30.5" fill="currentColor"/>`,
  /* Cannonball: a shot going up, and the blast it rides on. */
  'sam-guthrie': `<circle cx="31" cy="15" r="6.5" fill="currentColor"/><path d="M28 21 C22 25, 15 31, 7 41 C14 36, 20 31, 25 24 Z" fill="currentColor" opacity="0.75"/><path d="M26 23 C20 28, 14 33, 9 39" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" opacity="0.75"/>`,
  /* Banshee: the scream, leaving a mouth in waves. */
  'sean-cassidy': `<circle cx="13" cy="24" r="3.5" fill="currentColor"/><path d="M21 17 A9 9 0 0 1 21 31" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M27 12 A15 15 0 0 1 27 36" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.75"/><path d="M33 7 A21 21 0 0 1 33 41" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" opacity="0.5"/>`,
  /* Sebastian Shaw: energy taken in on one side and sent back out the other. */
  'sebastian-shaw': `<circle cx="24" cy="24" r="8" fill="none" stroke="currentColor" stroke-width="1.7"/><line x1="4" y1="24" x2="13" y2="24" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><polygon points="15,24 11,21.5 11,26.5" fill="currentColor"/><line x1="33" y1="24" x2="41" y2="24" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><polygon points="45,24 40,20.5 40,27.5" fill="currentColor"/>`,
  /* Lady Deathstrike: five claws, as long as fingers. */
  'yuriko-oyama': `<path d="M24 39 L9 11 M24 39 L16 8 M24 39 L24 6 M24 39 L32 8 M24 39 L39 11" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>`,

  /* ---------------- MARVEL TELEVISION ---------------- */
  /* Read on 2026-09-11 from the pages each fact file cites: the S.H.I.E.L.D.
     character list, the Runaways, Inhumans and Cloak & Dagger series pages,
     and the two MCU character lists. */

  /* Alex Wilder: the nerd who leads, a laptop open. */
  'alex-wilder': `<rect x="12" y="13" width="24" height="16" rx="1.6" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M8 34 L40 34" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><circle cx="24" cy="21" r="1.6" fill="currentColor"/>`,
  /* Mack: the mechanic who ended up running the place, a wrench. */
  'alphonso-mackenzie': `<g transform="rotate(-45 24 24)"><line x1="24" y1="42" x2="24" y2="22" stroke="currentColor" stroke-width="4.4" stroke-linecap="round"/><path d="M18.5 9 A8 8 0 1 0 29.5 9" fill="none" stroke="currentColor" stroke-width="4.4"/></g>`,
  /* Black Bolt: a mouth kept shut, and the bolt that leaves it when it is not. */
  'black-bolt': `<line x1="17" y1="10" x2="31" y2="10" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/><polygon points="27.5,13 16,29 23.5,29 20,43 32.5,24 25.5,24 30,13" fill="currentColor"/>`,
  /* Bobbi Morse: the mockingbird she is named for in the comics. */
  'bobbi-morse': `<circle cx="21" cy="26" r="8.5" fill="currentColor"/><circle cx="30" cy="17.5" r="4.8" fill="currentColor"/><polygon points="34,16.5 40,18 34,20" fill="currentColor"/><polygon points="13.5,28 5,36 9,25.5" fill="currentColor"/><path d="M18.5 34 L18.5 40 M24 34 L24 40" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>`,
  /* Chase Stein: the Fistigons, a gauntlet closed into a fist. */
  'chase-stein': `<rect x="13" y="15" width="22" height="18" rx="4.5" fill="currentColor"/><path d="M19 15 L19 27 M24.5 15 L24.5 27 M30 15 L30 27" stroke="var(--void)" stroke-width="1.3"/><rect x="16" y="34" width="16" height="5" rx="1.5" fill="currentColor"/>`,
  /* Crystal: the elements, a flame beside water. */
  crystal: `<path d="M15 12 C21 17, 22 23, 15 28 C8 23, 9 17, 15 12 Z" fill="currentColor"/><path d="M23 30 C26 27, 29 27, 32 30 C35 33, 38 33, 41 30 M23 36 C26 33, 29 33, 32 36 C35 39, 38 39, 41 36" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>`,
  /* Quake: the trace of an earthquake. */
  'daisy-johnson': `<path d="M5 24 L15 24 L18.5 13 L22.5 35 L26.5 15 L30 31 L33 24 L43 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>`,
  /* Deke Shaw: the Lighthouse he scavenged in, with its light on. */
  'deke-shaw': `<polygon points="19,40 29,40 27,17 21,17" fill="currentColor"/><rect x="19.5" y="11" width="9" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M31 11 L39 7 M31 14 L41 14 M31 17 L39 21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><line x1="14" y1="40" x2="34" y2="40" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>`,
  /* Yo-Yo: out at speed and back to where she started, in one heartbeat. */
  'elena-rodriguez': `<path d="M9 30 L28 30 A6.5 6.5 0 0 0 28 17 L16 17" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><polygon points="9,17 16,12.5 16,21.5" fill="currentColor"/><circle cx="9" cy="30" r="2.4" fill="currentColor"/>`,
  /* Gert Yorkes: the dinosaur she is linked to, by its footprint. */
  'gertrude-yorkes': `<ellipse cx="13" cy="19" rx="2.6" ry="9" fill="currentColor" transform="rotate(-32 13 19)"/><ellipse cx="24" cy="14.5" rx="2.6" ry="9.5" fill="currentColor"/><ellipse cx="35" cy="19" rx="2.6" ry="9" fill="currentColor" transform="rotate(32 35 19)"/><path d="M17 27 C20 25, 28 25, 31 27 L27 38 L21 38 Z" fill="currentColor"/>`,
  /* Gorgon: a cloven hoof, the kind that shakes the ground. */
  gorgon: `<path d="M21 12 C25 18, 25 32, 21 38 C14 36, 12 22, 15 13 Z" fill="currentColor"/><path d="M27 12 C23 18, 23 32, 27 38 C34 36, 36 22, 33 13 Z" fill="currentColor"/>`,
  /* Grant Ward: one face shown and one kept, split along the seam. */
  'grant-ward': `<path d="M13.4 13.4 A15 15 0 0 0 34.6 34.6 Z" fill="currentColor"/><path d="M13.4 13.4 A15 15 0 0 1 34.6 34.6" fill="none" stroke="currentColor" stroke-width="1.6"/>`,
  /* Jemma Simmons: life sciences, a double helix. */
  'jemma-simmons': `<path d="M16 7 C33 15, 33 33, 16 41 M32 7 C15 15, 15 33, 32 41" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M18 13 L30 13 M17 18 L31 18 M17 30 L31 30 M18 35 L30 35" stroke="currentColor" stroke-width="1.2" opacity="0.7"/>`,
  /* Karnak: a stone, and the fault he sees in it. */
  karnak: `<polygon points="24,8 38,16 38,32 24,40 10,32 10,16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M25 8 L21 17 L27 24 L22 32 L25 40" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
  /* Karolina Dean: light, thrown as a beam. */
  'karolina-dean': `<polygon points="10,38 35,7 43,13 15,42" fill="currentColor" opacity="0.8"/><circle cx="10" cy="39" r="3.2" fill="currentColor"/><circle cx="38" cy="4.5" r="1.3" fill="currentColor"/><circle cx="44" cy="19" r="1.3" fill="currentColor"/>`,
  /* Lance Hunter: SAS, then a hired blade, a combat knife. */
  'lance-hunter': `<polygon points="6,24 29,18.5 29,29.5" fill="currentColor"/><rect x="29" y="16" width="3" height="16" rx="1" fill="currentColor"/><rect x="32" y="20.5" width="10" height="7" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.7"/>`,
  /* Leo Fitz: engineering, a gear. */
  'leo-fitz': `<circle cx="24" cy="24" r="8" fill="none" stroke="currentColor" stroke-width="3.2"/><path d="M24 9 L24 14 M24 34 L24 39 M9 24 L14 24 M34 24 L39 24 M13.4 13.4 L17 17 M31 31 L34.6 34.6 M34.6 13.4 L31 17 M17 31 L13.4 34.6" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>`,
  /* Maximus: the crown he wants, and the crack that runs through him. */
  maximus: `<path d="M10 35 L10 17 L17 25 L24 12 L31 25 L38 17 L38 35 Z" fill="currentColor"/><path d="M22 35 L25.5 27 L22 20" fill="none" stroke="var(--void)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>`,
  /* Medusa: hair that moves on its own. */
  medusa: `<circle cx="24" cy="10" r="3.4" fill="currentColor"/><path d="M22 13 C13 18, 11 27, 7 39 M23 13 C19 21, 17 30, 15 41 M25 13 C29 21, 31 30, 33 41 M26 13 C35 18, 37 27, 41 39" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>`,
  /* Melinda May: the pilot, the plane from above. */
  'melinda-may': `<path d="M24 5 L27 17 L42 26 L42 30 L27 26 L26 36 L32 40 L32 42.5 L24 39.5 L16 42.5 L16 40 L22 36 L21 26 L6 30 L6 26 L21 17 Z" fill="currentColor"/>`,
  /* Molly Hayes: strength, a barbell. */
  'molly-hayes': `<line x1="9" y1="24" x2="39" y2="24" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><rect x="9" y="15" width="5" height="18" rx="1.5" fill="currentColor"/><rect x="34" y="15" width="5" height="18" rx="1.5" fill="currentColor"/><rect x="15" y="18" width="3.5" height="12" rx="1" fill="currentColor"/><rect x="29.5" y="18" width="3.5" height="12" rx="1" fill="currentColor"/>`,
  /* Nico Minoru: the Staff of One. */
  'nico-minoru': `<line x1="24" y1="18" x2="24" y2="42" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><circle cx="24" cy="11.5" r="6" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="24" cy="11.5" r="1.8" fill="currentColor"/>`,
  /* Wonder Man: the actor, a clapperboard. */
  'simon-williams': `<rect x="10" y="21" width="28" height="17" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M10 21 L12.5 12 L40.5 16.5 L38 21 Z" fill="currentColor"/><path d="M18 13 L16 20 M24.5 14 L22.5 21 M31 15 L29 21.5" stroke="var(--void)" stroke-width="1.5"/>`,
  /* Dagger: a dagger made of light, thrown point down. */
  'tandy-bowen': `<polygon points="24,42 20.5,21 27.5,21" fill="currentColor"/><line x1="17" y1="20" x2="31" y2="20" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><line x1="24" y1="19" x2="24" y2="9" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><path d="M14 36 L17 33 M34 36 L31 33 M24 6 L24 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" opacity="0.8"/>`,
  /* Cloak: the cloak, and the dark inside its hood. */
  'tyrone-johnson': `<path d="M24 6 C16 6, 12 15, 12 23 L8 42 L40 42 L36 23 C36 15, 32 6, 24 6 Z" fill="currentColor"/><ellipse cx="24" cy="17" rx="5" ry="6.2" fill="var(--void)"/>`,

  /* ---------------- SONY (Spider-verse) ---------------- */
  'peter-parker-raimi': `<ellipse cx="24" cy="21" rx="3" ry="4" fill="currentColor"/><ellipse cx="24" cy="28" rx="4" ry="5" fill="currentColor"/><path d="M21 19 L14 13 M27 19 L34 13 M20 22 L12 20 M28 22 L36 20 M20 29 L13 32 M28 29 L35 32 M24 33 L24 40" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>`,
  'mary-jane-watson': `<circle cx="24" cy="22" r="4" fill="currentColor"/><path d="M24 18 C24 12, 30 12, 29 17 C33 14, 35 19, 30 21 M24 18 C24 12, 18 12, 19 17 C15 14, 13 19, 18 21" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><line x1="24" y1="26" x2="24" y2="38" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M24 31 C21 31, 19 33, 20 36 M24 31 C27 31, 29 33, 28 36" fill="none" stroke="currentColor" stroke-width="1.4"/>`,
  'norman-osborn': `<path d="M12 16 L18 22 C16 26, 16 32, 24 38 C32 32, 32 26, 30 22 L36 16 C32 20, 28 20, 24 18 C20 20, 16 20, 12 16 Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M19 26 L22 28 L19 29 M29 26 L26 28 L29 29" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/><path d="M18 33 L21 31 L24 33 L27 31 L30 33" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>`,
  'otto-octavius': `<circle cx="24" cy="24" r="4.5" fill="currentColor"/><path d="M22 20 C14 14, 10 14, 8 10 M26 20 C34 14, 38 14, 40 10 M20 26 C12 30, 10 34, 12 40 M28 26 C36 30, 38 34, 36 40" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="8" cy="10" r="1.8" fill="currentColor"/><circle cx="40" cy="10" r="1.8" fill="currentColor"/><circle cx="12" cy="40" r="1.8" fill="currentColor"/><circle cx="36" cy="40" r="1.8" fill="currentColor"/>`,
  'harry-osborn': `<path d="M14 18 C14 14, 34 14, 34 18 L32 30 C32 35, 24 39, 24 39 C24 39, 16 35, 16 30 Z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M19 24 L22 26 L19 27 M29 24 L26 26 L29 27" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/><path d="M10 30 L16 27 M38 30 L32 27" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" opacity="0.7"/>`,
  'flint-marko': `<path d="M14 36 C14 30, 20 30, 20 24 C20 18, 28 18, 28 24 C28 28, 32 28, 33 24 C35 18, 30 14, 24 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="14" cy="38" r="1.4" fill="currentColor"/><circle cx="18" cy="34" r="1.1" fill="currentColor"/><circle cx="30" cy="16" r="1.1" fill="currentColor"/>`,
  'peter-parker-asm': `<rect x="9" y="9" width="30" height="30" rx="3" fill="none" stroke="currentColor" stroke-width="0.9" opacity="0.45" transform="rotate(45 24 24)"/><ellipse cx="24" cy="22" rx="3" ry="4" fill="currentColor"/><ellipse cx="24" cy="28.5" rx="3.8" ry="5" fill="currentColor"/><path d="M21 20 L14 15 M27 20 L34 15 M20 30 L14 34 M28 30 L34 34" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>`,
  'gwen-stacy': `<polygon points="24,9 27,19 37,19 29,25 32,35 24,29 16,35 19,25 11,19 21,19" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="24" cy="23" r="2.2" fill="currentColor"/>`,
  'curt-connors': `<ellipse cx="24" cy="24" rx="15" ry="9" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M24 16 L24 32" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><path d="M14 20 L17 22 M14 28 L17 26 M34 20 L31 22 M34 28 L31 26" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" opacity="0.7"/>`,
  'max-dillon': `<circle cx="24" cy="24" r="13" fill="none" stroke="currentColor" stroke-width="1.3" opacity="0.55"/><path d="M26 12 L18 26 L24 26 L20 38 L32 22 L25 22 Z" fill="currentColor"/><path d="M9 24 L5 24 M43 24 L39 24 M24 9 L24 5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" opacity="0.6"/>`,
  'eddie-brock': `<path d="M12 18 C16 14, 20 22, 24 20 C28 22, 32 14, 36 18 C33 28, 28 36, 24 38 C20 36, 15 28, 12 18 Z" fill="none" stroke="currentColor" stroke-width="1.7"/><polygon points="18,22 20,27 22,22" fill="currentColor"/><polygon points="26,22 28,27 30,22" fill="currentColor"/><polygon points="21,32 24,28 27,32" fill="currentColor"/>`,
  'cletus-kasady': `<path d="M24 10 C20 16, 12 16, 12 24 C12 32, 20 34, 24 40 C28 34, 36 32, 36 24 C36 16, 28 16, 24 10 Z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M18 22 L20 27 L22 22 M26 22 L28 27 L30 22" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M14 14 L18 18 M34 14 L30 18 M12 30 L16 28 M36 30 L32 28" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" opacity="0.6"/>`,
  'michael-morbius': `<path d="M24 20 C24 16, 18 12, 10 14 C14 18, 14 22, 18 24 C14 28, 20 34, 24 30 C28 34, 34 28, 30 24 C34 22, 34 18, 38 14 C30 12, 24 16, 24 20 Z" fill="currentColor"/>`,
  kraven: `<circle cx="24" cy="26" r="7" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M24 19 L24 10 M17 21 L11 13 M31 21 L37 13 M14 26 L7 24 M34 26 L41 24 M18 32 L13 38 M30 32 L35 38" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><circle cx="21" cy="25" r="1.1" fill="currentColor"/><circle cx="27" cy="25" r="1.1" fill="currentColor"/>`,
  'cassandra-webb': `<circle cx="24" cy="24" r="15" fill="none" stroke="currentColor" stroke-width="1"/><path d="M24 9 L24 39 M9 24 L39 24 M13 13 L35 35 M35 13 L13 35" stroke="currentColor" stroke-width="0.9" opacity="0.7"/><path d="M24 24 m -6 0 a 6 6 0 1 0 12 0 a 6 6 0 1 0 -12 0 M24 24 m -10 0 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0" fill="none" stroke="currentColor" stroke-width="1" opacity="0.7"/><circle cx="24" cy="24" r="2" fill="currentColor"/>`,

  /* ---------------- SONY (Spider-Verse, the animated films) ---------------- */
  /* Read on 2026-09-11 from the voice cast sections of the two film pages
     the fact files cite. */

  /* Aaron Davis: the masked enforcer, the mask itself. */
  'aaron-davis': `<path d="M10 20 C10 11, 38 11, 38 20 L38 30 C38 37, 30 41, 24 41 C18 41, 10 37, 10 30 Z" fill="currentColor"/><polygon points="13.5,22 22,24.5 20,29 13,27.5" fill="var(--void)"/><polygon points="34.5,22 26,24.5 28,29 35,27.5" fill="var(--void)"/>`,
  /* Spider-Gwen: the hood, with a spider inside it. */
  'gwen-stacy-65': `<path d="M24 6 C15 9, 11 20, 12.5 40 L35.5 40 C37 20, 33 9, 24 6 Z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/><ellipse cx="24" cy="24" rx="2.4" ry="3" fill="currentColor"/><ellipse cx="24" cy="29.5" rx="3" ry="3.6" fill="currentColor"/><path d="M22 23 C18 20, 17 18, 16 15 M26 23 C30 20, 31 18, 32 15 M21.5 26 C17 25, 15 26, 14 28 M26.5 26 C31 25, 33 26, 34 28 M22 30 C18 32, 17 34, 16 37 M26 30 C30 32, 31 34, 32 37" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>`,
  /* Spider-Punk: the guitar he fights with. */
  'hobie-brown': `<circle cx="15" cy="32" r="7" fill="currentColor"/><circle cx="20.5" cy="25.5" r="5.5" fill="currentColor"/><line x1="22" y1="24" x2="39" y2="7" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/><rect x="36" y="4" width="6" height="7" rx="1.2" fill="currentColor" transform="rotate(45 39 7.5)"/><circle cx="14.5" cy="32.5" r="2" fill="var(--void)"/>`,
  /* Jefferson Davis: the police captain, a badge. */
  'jefferson-davis': `<path d="M24 7 L36.5 11.5 L36.5 24 C36.5 32, 30.5 38, 24 41 C17.5 38, 11.5 32, 11.5 24 L11.5 11.5 Z" fill="currentColor"/><polygon points="24,15 26,21 32.5,21 27.3,25 29.2,31.5 24,27.5 18.8,31.5 20.7,25 15.5,21 22,21" fill="var(--void)"/>`,
  /* Jess Drew: the motorcycle she rides. */
  'jess-drew': `<circle cx="12.5" cy="32" r="6" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="35.5" cy="32" r="6" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M15 29 L21 18 L31.5 16.5 L37 22 L33 30 L21 32 Z" fill="currentColor"/><path d="M31.5 16.5 L35 11" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>`,
  /* The Spot: a body covered in holes to somewhere else. */
  'johnathon-ohnn': `<circle cx="24" cy="24" r="15" fill="currentColor"/><circle cx="18" cy="18" r="3.4" fill="var(--void)"/><circle cx="29" cy="15.5" r="2.2" fill="var(--void)"/><circle cx="31" cy="26" r="4" fill="var(--void)"/><circle cx="19.5" cy="30" r="2.8" fill="var(--void)"/><circle cx="26" cy="35" r="1.8" fill="var(--void)"/><circle cx="12" cy="26" r="1.6" fill="var(--void)"/>`,
  /* Spider-Man 2099: the fangs, since the source calls him a vampire. */
  'miguel-ohara': `<path d="M11 15 L37 15" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/><polygon points="15,15 19.5,31 24,15" fill="currentColor"/><polygon points="24,15 28.5,31 33,15" fill="currentColor"/>`,
  /* Miles G. Morales: the Prowler's claws. */
  'miles-g-morales': `<path d="M12 12 C18 14, 22 15, 26 20 M20 8 C24 11, 27 14, 30 19 M29 7 C31 11, 33 15, 34 19" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M14 40 C14 28, 20 22, 32 22 C36 22, 38 26, 36 30 C30 30, 24 34, 24 40 Z" fill="currentColor"/>`,
  /* Miles Morales: the spider, drawn sharp. */
  'miles-morales': `<polygon points="24,13 29.5,24 24,36 18.5,24" fill="currentColor"/><path d="M20 19 L11 11 M28 19 L37 11 M19 24 L8 22 M29 24 L40 22 M19.5 28 L10 34 M28.5 28 L38 34 M22 32 L17 41 M26 32 L31 41" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>`,
  /* Olivia Octavius: one tentacle, coiled. */
  'olivia-octavius': `<path d="M24 24 C24 19, 31 19, 31 24 C31 31, 19 31, 18 24 C17 15, 34 12, 38 21 C41 29, 33 41, 22 40" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><circle cx="24" cy="24" r="2.2" fill="currentColor"/>`,
  /* Spider-Man India: the wrist band that slings the web. */
  'pavitr-prabhakar': `<ellipse cx="14" cy="28" rx="5" ry="8.5" fill="none" stroke="currentColor" stroke-width="3"/><path d="M19 25 L33 15" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><circle cx="35" cy="13.5" r="2.4" fill="currentColor"/><path d="M35 13.5 L40 8 M35 13.5 L42 13 M35 13.5 L36.5 19.5 M35 13.5 L30 8.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>`,
  /* Peni Parker: the suit she pilots, and the spider she pilots it with. */
  'peni-parker': `<rect x="13" y="19" width="22" height="20" rx="4" fill="currentColor"/><rect x="17" y="24" width="14" height="3.5" rx="1.5" fill="var(--void)"/><circle cx="24" cy="11" r="2.6" fill="currentColor"/><path d="M22 10 L17 7 M26 10 L31 7 M22 12.5 L17.5 15 M26 12.5 L30.5 15" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>`,
  /* Peter B. Parker: an older spider, legs hanging. */
  'peter-b-parker': `<ellipse cx="24" cy="18" rx="3.2" ry="4.2" fill="currentColor"/><ellipse cx="24" cy="26.5" rx="4.6" ry="6" fill="currentColor"/><path d="M20 22 C13 22, 10 28, 9 37 M28 22 C35 22, 38 28, 39 37 M20 27 C15 29, 13 34, 13 40 M28 27 C33 29, 35 34, 35 40 M21 31 C19 34, 18 38, 18 42 M27 31 C29 34, 30 38, 30 42" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>`,
  /* Spider-Ham: a pig's snout and ears. */
  'peter-porker': `<ellipse cx="24" cy="27" rx="11" ry="8" fill="none" stroke="currentColor" stroke-width="1.9"/><circle cx="20" cy="27" r="2" fill="currentColor"/><circle cx="28" cy="27" r="2" fill="currentColor"/><polygon points="11,20 13,8 21,16" fill="currentColor"/><polygon points="37,20 35,8 27,16" fill="currentColor"/>`,
  /* Rio Morales: a mother and a nurse. */
  'rio-morales': `<path d="M24 39 C10 29, 8 19, 15 14 C19 11, 23 14, 24 17 C25 14, 29 11, 33 14 C40 19, 38 29, 24 39 Z" fill="currentColor"/><path d="M24 19.5 L24 30 M18.5 24.5 L29.5 24.5" stroke="var(--void)" stroke-width="2.6" stroke-linecap="round"/>`,
  /* Spider-Man Noir: the 1930s, a fedora. */
  'spider-man-noir': `<path d="M14 30 L15.5 17 C20 13.5, 28 13.5, 32.5 17 L34 30 Z" fill="currentColor"/><path d="M7 31 C14 34, 34 34, 41 31" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><path d="M15 26 L33 26" stroke="var(--void)" stroke-width="1.6"/>`,

  /* ---------------- Not a character ----------------
     The credits page draws the people on it with the same component that
     draws a character, so somebody who is not in the story can still have a
     mark of their own, on the same terms as everybody else: drawn in this
     repository, in one colour, in the same 48 by 48 frame.

     A web with the eyes of the mask he wears as an avatar. Nothing here is
     traced from anything: the web is twelve strands and three rings computed
     around the centre, and the eyes are four curves each. */
  'austin-canady': `<path d="M24.0 24.0 L24.0 2.0 M24.0 24.0 L35.0 4.9 M24.0 24.0 L43.1 13.0 M24.0 24.0 L46.0 24.0 M24.0 24.0 L43.1 35.0 M24.0 24.0 L35.0 43.1 M24.0 24.0 L24.0 46.0 M24.0 24.0 L13.0 43.1 M24.0 24.0 L4.9 35.0 M24.0 24.0 L2.0 24.0 M24.0 24.0 L4.9 13.0 M24.0 24.0 L13.0 4.9" fill="none" stroke="currentColor" stroke-width="0.85" opacity="0.4"/><path d="M24.0 16.0 Q25.6 17.9 28.0 17.1 Q28.5 19.5 30.9 20.0 Q30.1 22.4 32.0 24.0 Q30.1 25.6 30.9 28.0 Q28.5 28.5 28.0 30.9 Q25.6 30.1 24.0 32.0 Q22.4 30.1 20.0 30.9 Q19.5 28.5 17.1 28.0 Q17.9 25.6 16.0 24.0 Q17.9 22.4 17.1 20.0 Q19.5 19.5 20.0 17.1 Q22.4 17.9 24.0 16.0 Z" fill="none" stroke="currentColor" stroke-width="0.85" opacity="0.4"/><path d="M24.0 9.0 Q27.2 12.1 31.5 11.0 Q32.7 15.3 37.0 16.5 Q35.9 20.8 39.0 24.0 Q35.9 27.2 37.0 31.5 Q32.7 32.7 31.5 37.0 Q27.2 35.9 24.0 39.0 Q20.8 35.9 16.5 37.0 Q15.3 32.7 11.0 31.5 Q12.1 27.2 9.0 24.0 Q12.1 20.8 11.0 16.5 Q15.3 15.3 16.5 11.0 Q20.8 12.1 24.0 9.0 Z" fill="none" stroke="currentColor" stroke-width="0.85" opacity="0.4"/><path d="M24.0 2.5 Q28.7 6.6 34.8 5.4 Q36.7 11.3 42.6 13.3 Q41.4 19.3 45.5 24.0 Q41.4 28.7 42.6 34.8 Q36.7 36.7 34.8 42.6 Q28.7 41.4 24.0 45.5 Q19.3 41.4 13.3 42.6 Q11.3 36.7 5.4 34.8 Q6.6 28.7 2.5 24.0 Q6.6 19.3 5.4 13.2 Q11.3 11.3 13.2 5.4 Q19.3 6.6 24.0 2.5 Z" fill="none" stroke="currentColor" stroke-width="0.85" opacity="0.4"/><circle cx="24" cy="24" r="1.5" fill="currentColor" opacity="0.4"/><path d="M22 30.5 C17.5 26.5, 13 21.5, 10.5 20 C7.5 18.5, 6 24, 9 27.5 C12 31, 18 32.7, 22 30.5 Z" fill="currentColor"/><path d="M26 30.5 C30.5 26.5, 35 21.5, 37.5 20 C40.5 18.5, 42 24, 39 27.5 C36 31, 30 32.7, 26 30.5 Z" fill="currentColor"/>`,
};

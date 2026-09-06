import universeData from '../../data/universes.json';
import franchiseData from '../../data/franchises.json';
import sagaData from '../../data/sagas.json';

/*
 * Livery resolution.
 *
 * Colour is this site's classification system, so it is derived from the
 * data rather than chosen per page.
 *
 * A saga owns a livery and a franchise owns a shade within it. The saga is
 * the right level: it is the division a reader actually feels, and it means
 * a list running across the Phases arrives already polychrome instead of
 * being one colour repeated.
 *
 * The data names which livery; the stylesheet owns what colour that is. A
 * saga added tomorrow arrives already dressed, and a palette change never
 * touches a single data file.
 */

export type Continuity = 'shared' | 'separate' | 'unbound';

export interface Universe {
  id: string;
  designation: string;
  studio: string;
  continuity: Continuity;
  livery: string;
  order: number;
}

export interface Saga {
  id: string;
  livery: string;
  order: number;
  phases: number[];
}

export interface Franchise {
  id: string;
  /** Proper noun, the same in every language, so it is a fact and not a string. */
  name: string;
  universe: string;
  shade: number;
  order: number;
}

export const universes = universeData as Universe[];
export const franchises = franchiseData as Franchise[];
export const sagas = sagaData as Saga[];

const universeById = new Map(universes.map((universe) => [universe.id, universe]));
const franchiseById = new Map(franchises.map((franchise) => [franchise.id, franchise]));
const sagaById = new Map(sagas.map((saga) => [saga.id, saga]));

/** Anything whose saga is unknown falls back to the unbound livery. */
const UNBOUND_SAGA = sagas.find((saga) => saga.id === 'unbound')!;

/** Everything outside the shared continuity falls back to the unbound livery. */
const UNBOUND = universes.find((universe) => universe.id === 'unbound')!;

export function universeOf(id: string): Universe {
  return universeById.get(id) ?? UNBOUND;
}

export function franchiseOf(id: string): Franchise | undefined {
  return franchiseById.get(id);
}

/**
 * The custom properties a livery region sets on itself. Regions read
 * `--livery` and never a hard-coded colour, so one component serves any
 * saga in either theme.
 *
 * `shade` steps a franchise away from its saga's base colour by a small,
 * bounded amount. The range is deliberately narrow: every step has to stay
 * above 4.5:1 against both grounds.
 */
export function liveryStyle(sagaId: string, franchiseId?: string): string {
  const saga = sagaById.get(sagaId) ?? UNBOUND_SAGA;
  const franchise = franchiseId ? franchiseById.get(franchiseId) : undefined;
  const shade = franchise?.shade ?? 0;

  return [`--livery-base: var(--livery-${saga.livery})`, `--shade: ${shade}`].join('; ');
}

/** The name a shade belongs to. Colour narrows the field; the name settles it. */
export function franchiseName(id: string): string {
  return franchiseById.get(id)?.name ?? id;
}

/** Universes in reading order, with the unbound set always last. */
export function orderedUniverses(): Universe[] {
  return [...universes].sort((a, b) => a.order - b.order);
}

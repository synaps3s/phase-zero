import universeData from '../../data/universes.json';
import franchiseData from '../../data/franchises.json';

/*
 * Livery resolution.
 *
 * Colour is this site's classification system, so it is derived from the
 * data rather than chosen per page. A universe owns a livery; a franchise
 * owns a shade within its universe's livery. The data names which livery,
 * the stylesheet owns what colour that is, which means a universe added
 * tomorrow arrives already dressed and a palette change never touches data.
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

const universeById = new Map(universes.map((universe) => [universe.id, universe]));
const franchiseById = new Map(franchises.map((franchise) => [franchise.id, franchise]));

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
 * `--livery` and never a hard-coded colour, so the same component works
 * in any universe and in either theme.
 *
 * `shade` steps the franchise away from its universe's base colour by a
 * small, bounded amount. The range is deliberately narrow: it has to stay
 * above 4.5:1 against both grounds at every step.
 */
export function liveryStyle(universeId: string, franchiseId?: string): string {
  const universe = universeOf(universeId);
  const franchise = franchiseId ? franchiseById.get(franchiseId) : undefined;
  const shade = franchise?.shade ?? 0;

  return [
    `--livery-plane-base: var(--livery-${universe.livery}-plane)`,
    `--livery-base: var(--livery-${universe.livery})`,
    `--shade: ${shade}`,
  ].join('; ');
}

/** The name a shade belongs to. Colour narrows the field; the name settles it. */
export function franchiseName(id: string): string {
  return franchiseById.get(id)?.name ?? id;
}

/** Universes in reading order, with the unbound set always last. */
export function orderedUniverses(): Universe[] {
  return [...universes].sort((a, b) => a.order - b.order);
}

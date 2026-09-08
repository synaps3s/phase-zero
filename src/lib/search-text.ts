/*
 * The form a search compares against.
 *
 * Two problems with one answer. A reader typing "spiderman" has to find
 * "Spider-Man", so the punctuation inside a name cannot be allowed to count.
 * And a reader typing Italian without reaching for the accented keys has to
 * find "citta" in "città", which is how most people type in a hurry.
 *
 * So both sides of the comparison are reduced to letters and digits: accents
 * decomposed and dropped, everything else removed. "Spider-Man" and
 * "spider man" and "SPIDERMAN" all become the same string, and matching is
 * then the plain substring test it was always meant to be.
 *
 * Letters are matched by category rather than by an a-to-z range, so a
 * language written in another script keeps working the day it is added. That
 * is not hypothetical here: adding a language is meant to cost one entry in a
 * config file and no code at all.
 */
export function searchable(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/gu, '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '');
}

/**
 * A typed query, as the list of things that must all be present.
 *
 * Every word has to match, in any order, so "iron 2010" finds what
 * "2010 iron" finds. Matching the whole line would not.
 */
export function searchWords(query: string): string[] {
  return query.split(/\s+/).map(searchable).filter(Boolean);
}

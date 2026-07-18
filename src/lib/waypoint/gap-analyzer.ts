import type { CareerMatch } from "./types";

export function uniqueGaps(careers: CareerMatch[]): string[] {
  return [...new Set(careers.flatMap((career) => career.gaps))].slice(0, 5);
}

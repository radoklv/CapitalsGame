import type { Countries } from "./types";

export function shuffleArray<T>(array: T[]): T[] {
  const copy = array.slice(); // Create a shallow copy of the array
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Get random index
    [copy[i], copy[j]] = [copy[j], copy[i]]; // Swap elements
  }
  return copy;
}

export const createEnumFromObjects = (
  objects: { name: string; capital: string }[]
) => {
  const enumObject = {} as any;

  objects.forEach((obj: Countries) => {
    enumObject[obj.name] = obj.capital;
  });
  return Object.freeze(enumObject);
};

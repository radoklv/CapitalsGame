import type { Countries } from "./types";

//Ф-я за разбъркване на елементите на масив, за да може всеки път да са с различни позиции
export function shuffleArray<T>(array: T[]): T[] {
  const copy = array.slice(); // Създаване на копие на масива
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Взимане на произволен индекс
    [copy[i], copy[j]] = [copy[j], copy[i]]; // Смяна на елементи
  }
  return copy;
}

//Ф-я за създаване на enum от array
export const createEnumFromObjects = (
  objects: { name: string; capital: string }[]
) => {
  const enumObject = {} as any;

  objects.forEach((obj: Countries) => {
    enumObject[obj.name] = obj.capital;
  });
  return Object.freeze(enumObject);
};

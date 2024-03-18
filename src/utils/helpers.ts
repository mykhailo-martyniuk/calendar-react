export const filterByUniqueProperty = <T, K extends keyof T>(arr: T[], property: K): T[] => {
  const uniqueValues = new Set<T[K]>();
  const result: T[] = [];

  arr.forEach((obj) => {
    const value = obj[property];
    if (!uniqueValues.has(value)) {
      uniqueValues.add(value);
      result.push(obj);
    }
  });

  return result;
};

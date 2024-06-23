export const capitalizeFirstLetter = (word: string) => {
  const firstLetter = word.charAt(0).toUpperCase();
  const remaining = word.slice(1);

  return `${firstLetter}${remaining}`;
};

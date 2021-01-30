import { imageContent } from "../content";

export const shuffle = (array: string[], maxElements?: number): void => {
  for (let i = (maxElements || (array.length - 1)); i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

export const getRandomImages = (maxElements: number): string [] => {
  const allImageData: string[] = [];
  Object.keys(imageContent).forEach((categoryData) => {
    allImageData.push(...imageContent[categoryData as keyof typeof imageContent].paths);
  });

  shuffle(allImageData, maxElements);
  return allImageData;
};

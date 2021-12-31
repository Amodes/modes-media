import { imageContent, priorityList } from "../photography-content";

export const shuffle = (array: string[], maxElements?: number): void => {
  for (let i = (maxElements || (array.length - 1)); i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const getPriorityImages = (images: string []): string [] => images.filter((image) => priorityList.includes(image));

export const getRandomImages = (maxElements?: number): string[] => {
  const allImageData: string[] = [];
  Object.keys(imageContent).forEach((categoryKey) => {
    allImageData.push(...imageContent[categoryKey].paths);
  });

  const priorityImages = getPriorityImages(allImageData);

  shuffle(priorityImages, maxElements);
  return priorityImages;
};

export const generateRandomNumberFromInterval = (min: number, max: number): number => {
  const random = Math.floor(Math.random() * (max - min + 1) + min);
  return random;
};

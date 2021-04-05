import {
  DIFFICULTY_DESKTOP, DIFFICULTY_MOBILE,
} from "./constants";

interface Offset {
    top: number;
    left: number;
}

interface Position {
    x: string;
    y: string;
}

export const calculateNewOffset = (): Offset => {
  const height = window.innerHeight;
  const width = window.innerWidth;
  const newTop = Math.floor(Math.random() * height);
  const newLeft = Math.floor(Math.random() * width);
  return {
    top: newTop,
    left: newLeft,
  };
};

export const calculateSpeed = (currentOffset: Offset, newOffset: Offset): number => {
  const isMobile = window.innerWidth < 800;
  const difficulty = isMobile ? DIFFICULTY_MOBILE : DIFFICULTY_DESKTOP;
  const x = Math.abs(currentOffset.left - newOffset.left);
  const y = Math.abs(currentOffset.top - newOffset.top);
  const greatest = x > y ? x : y;
  const speed = Math.ceil(greatest / difficulty);
  return speed;
};

export const calculateNewPosition = (newOffset: Offset): Position => {
  const negativeHorizontalDirection = Math.random() < 0.5;
  const negativeVerticalDirection = Math.random() < 0.5;

  let x;
  let y;
  if (negativeHorizontalDirection) {
    x = `-${newOffset.left}px`;
  } else {
    x = `${newOffset.left}px`;
  }

  if (negativeVerticalDirection) {
    y = `-${newOffset.top}px`;
  } else {
    y = `${newOffset.top}px`;
  }

  return { x, y };
};

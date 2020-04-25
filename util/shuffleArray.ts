import { shallowEqual } from "react-redux";
import shuffle from "shuffle-array";

export default function shuffleArray(array: any[]) {
  if (array.length === 0) return array;

  const shuffledArray = [...array];

  do {
    shuffle(shuffledArray);
  } while (shallowEqual(shuffledArray, array));

  return shuffledArray;
}

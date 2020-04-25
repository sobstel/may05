import { shallowEqual } from "react-redux";

import shuffleArray from "../../util/shuffleArray";
import { createSequenceLogic } from "./createSequenceLogic";

const SEQUENCE = ["Y", "O", "G", "A"];

export const primeroLogic = createSequenceLogic(SEQUENCE, {
  initializer: shuffleArray,
});

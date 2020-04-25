import shuffleArray from "../../util/shuffleArray";
import { createSequenceLogic } from "./createSequenceLogic";

const SEQUENCE = ["ॐ", "हं", "यं", "रं", "वं", "लं"];

export const segundoLogic = createSequenceLogic(SEQUENCE, {
  initializer: shuffleArray,
});

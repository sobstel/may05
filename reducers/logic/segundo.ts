import { createSequenceLogic } from "./createSequenceLogic";

const SEQUENCE = ["ॐ", "हं", "यं", "रं", "वं", "लं"];

export const segundoLogic = createSequenceLogic(SEQUENCE, { shuffle: true });

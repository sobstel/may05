import { createSequenceLogic } from "./createSequenceLogic";

const SEQUENCE = ["Y", "O", "G", "A"];

export const primeroLogic = createSequenceLogic(SEQUENCE, { shuffle: true });

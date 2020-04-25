import { shallowEqual } from "react-redux";

import { createSequenceLogic } from "./createSequenceLogic";

const SEQUENCE = ["Y", "O", "G", "A"];

export const primeroLogic = createSequenceLogic(SEQUENCE);

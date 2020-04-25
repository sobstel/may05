import { createMemoryLogic } from "./createMemoryLogic";

const ELEMENTS = ["ॐ", "हं", "यं", "रं", "वं", "लं"];
const SEQUENCE = [...ELEMENTS].concat(ELEMENTS);

export const cuartoLogic = createMemoryLogic(SEQUENCE, {
  cleanUnmatched: (sequence, visibleCount) => {
    if (visibleCount % 2 === 0) {
      sequence = sequence.map((value) => {
        if (value === "") return value;
        const valueCount = sequence.filter((v) => v === value).length;
        if (valueCount !== 2) return "";
        return value;
      });
    }
    return sequence;
  },
});

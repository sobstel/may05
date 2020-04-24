export const sceneStateKeys = [
  "cero",
  "primero",
  "segundo",
  "tercero",
  "cuarto",
  "quinto",
] as const;

export type SCENE_STATE_KEY = typeof sceneStateKeys[number];

export const scenesCount = sceneStateKeys.length;

export { default as backgrounds } from "../assets/bg";

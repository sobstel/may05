// TODO: scene map

export const sceneNames = [
  "cero",
  "primero",
  "segundo",
  "tercero",
  "cuatro",
  "quinto",
] as const;

export type SCENE_NAME = typeof sceneNames[number];

export const backgrounds = {
  cero: require("../assets/bg/0.jpg"),
  primero: require("../assets/bg/1.jpg"),
  segundo: require("../assets/bg/2.jpg"),
  tercero: require("../assets/bg/3.jpg"),
  cuatro: require("../assets/bg/4.jpg"),
  quinto: require("../assets/bg/5.jpg"),
};

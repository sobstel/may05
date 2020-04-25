export type LogicState = string[];

export type Logic = {
  init(): LogicState;
  run(values: LogicState, index: number): LogicState;
  solved(values: LogicState): boolean;
};

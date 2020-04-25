export type LogicState = string[];

export type Logic = {
  init(): LogicState;
  apply(values: LogicState, index: number): LogicState;
  solved(values: LogicState): boolean;
};

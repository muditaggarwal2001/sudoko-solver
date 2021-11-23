export type sudoku = cell[][];

export interface cell {
  value?: number;
  readonly?: boolean
}

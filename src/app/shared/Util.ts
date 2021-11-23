import { cell, sudoku } from "../interfaces/sudoku";

export class Util {

  public static createBaseSudoku(): sudoku {
    return [...Array(9)].map(() => Array(9).fill(null).map(() => ({} as cell)));
  }
}

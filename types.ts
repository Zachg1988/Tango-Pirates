
export type CellValue = 0 | 1 | 2; // 0: empty, 1: pirate, 2: marine
export type Board = CellValue[][];

export interface Puzzle {
  initial: Board;
  solution: Board;
}

export interface Coords {
  row: number;
  col: number;
}

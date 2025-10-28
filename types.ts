
export type CellValue = 0 | 1 | 2; // 0: Empty, 1: Pirate, 2: Marine
export type BoardState = CellValue[];

export type Connector = [number, number, '=' | 'x'];
export type Prefilled = { i: number; v: CellValue };

export type Level = {
  name: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  prefilled: Prefilled[];
  connectors: Connector[];
};

export type ErrorCell = {
  index: number;
  message: string;
};

export type Hint = {
  index: number;
  message: string;
};

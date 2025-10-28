
import type { Board, Puzzle } from '../types.ts';

const puzzle1: Puzzle = {
    initial: [
        [1, 0, 0, 0, 0, 2],
        [0, 0, 1, 0, 2, 0],
        [0, 2, 0, 0, 0, 1],
        [0, 0, 2, 0, 1, 0],
        [2, 0, 0, 1, 0, 0],
        [0, 1, 0, 0, 2, 0],
    ],
    solution: [
        [1, 1, 2, 1, 2, 2],
        [2, 2, 1, 1, 2, 1],
        [1, 2, 1, 2, 2, 1],
        [2, 1, 2, 2, 1, 1],
        [2, 1, 1, 2, 1, 2],
        [1, 2, 2, 1, 1, 2],
    ],
};

const puzzle2: Puzzle = {
    initial: [
        [0, 0, 0, 0, 1, 0],
        [2, 2, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 2],
        [0, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 2, 0],
        [1, 0, 2, 0, 0, 0],
    ],
    solution: [
        [2, 1, 2, 2, 1, 1],
        [2, 2, 1, 1, 2, 1],
        [1, 1, 2, 1, 2, 2],
        [2, 1, 1, 2, 1, 2],
        [1, 2, 1, 2, 2, 1],
        [1, 2, 2, 1, 1, 2],
    ]
};

export const LEVELS: Puzzle[] = [puzzle1, puzzle2];

export const getPuzzle = (level: number): Puzzle => {
    const puzzle = LEVELS[level % LEVELS.length];
    // Return a deep copy to prevent mutation of the original puzzle
    return JSON.parse(JSON.stringify(puzzle));
};

export const checkBoard = (board: Board, solution: Board): boolean => {
    for (let r = 0; r < board.length; r++) {
        for (let c = 0; c < board[r].length; c++) {
            if (board[r][c] !== solution[r][c]) {
                return false;
            }
        }
    }
    return true;
};

export const validateBoard = (board: Board): { row: number, col: number }[] => {
    const errors: { row: number, col: number }[] = [];
    const size = board.length;

    for (let i = 0; i < size; i++) {
        let rowCount1 = 0;
        let rowCount2 = 0;
        let colCount1 = 0;
        let colCount2 = 0;

        for (let j = 0; j < size; j++) {
            if (j < size - 2) {
                if (board[i][j] !== 0 && board[i][j] === board[i][j + 1] && board[i][j] === board[i][j + 2]) {
                    errors.push({ row: i, col: j }, { row: i, col: j + 1 }, { row: i, col: j + 2 });
                }
                if (board[j][i] !== 0 && board[j][i] === board[j + 1][i] && board[j][i] === board[j + 2][i]) {
                    errors.push({ row: j, col: i }, { row: j + 1, col: i }, { row: j + 2, col: i });
                }
            }

            if (board[i][j] === 1) rowCount1++;
            if (board[i][j] === 2) rowCount2++;
            if (board[j][i] === 1) colCount1++;
            if (board[j][i] === 2) colCount2++;
        }
        
        if (rowCount1 > size / 2 || rowCount2 > size / 2) {
             for (let j = 0; j < size; j++) errors.push({ row: i, col: j });
        }
        if (colCount1 > size / 2 || colCount2 > size / 2) {
            for (let j = 0; j < size; j++) errors.push({ row: j, col: i });
        }
    }
    
    const uniqueErrors = Array.from(new Set(errors.map(JSON.stringify)), JSON.parse);
    return uniqueErrors;
};

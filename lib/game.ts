import type { BoardState, ErrorCell, Level, Hint, Prefilled } from '../types';

export const ROWS = 6;
export const COLS = 6;

export const LEVELS: Level[] = [
    { name: 'Level 1: East Blue', difficulty: 'easy', prefilled: [{i:0,v:1},{i:7,v:2},{i:14,v:1}], connectors: [[0,6,'='],[7,13,'x'],[14,20,'=']] },
    { name: 'Level 2: Alabasta', difficulty: 'easy', prefilled: [{i:1,v:1},{i:8,v:2},{i:22,v:1}], connectors: [[1,2,'='],[8,14,'x'],[22,28,'=']] },
    { name: 'Level 3: Sky Island', difficulty: 'medium', prefilled: [{i:5,v:2},{i:10,v:1},{i:25,v:2}], connectors: [[5,11,'x'],[10,16,'='],[25,31,'x']] },
    { name: 'Level 4: Water 7', difficulty: 'medium', prefilled: [{i:2,v:1},{i:15,v:2},{i:28,v:1}], connectors: [[2,8,'x'],[15,21,'='],[28,34,'=']] },
    { name: 'Level 5: Thriller Bark', difficulty: 'hard', prefilled: [{i:4,v:1},{i:13,v:2},{i:29,v:1}], connectors: [[4,10,'='],[13,19,'='],[19,25,'x'],[29,35,'=']] },
    { name: 'Level 6: Marineford', difficulty: 'hard', prefilled: [{i:2,v:2},{i:17,v:1},{i:30,v:2}], connectors: [[2,8,'='],[17,23,'='],[23,29,'x'],[30,31,'x']] },
    { name: 'Level 7: Dressrosa', difficulty: 'expert', prefilled: [{i:6,v:1},{i:16,v:2},{i:33,v:1}], connectors: [[6,12,'='],[12,18,'x'],[16,22,'='],[22,28,'x'],[33,34,'=']] },
    { name: 'Level 8: Wano Country', difficulty: 'expert', prefilled: [{i:1,v:2},{i:14,v:1},{i:28,v:2}], connectors: [[1,7,'='],[7,13,'x'],[14,20,'='],[20,26,'x'],[28,34,'=']] },
    { name: 'Level 9: Fish-Man Island', difficulty: 'expert', prefilled: [{i:5,v:1},{i:18,v:2},{i:27,v:1}], connectors: [[5,11,'='],[11,17,'x'],[18,24,'='],[24,30,'x'],[27,33,'=']] },
    { name: 'Level 10: Whole Cake Island', difficulty: 'expert', prefilled: [{i:3,v:2},{i:15,v:1},{i:32,v:2}], connectors: [[3,9,'='],[9,15,'x'],[15,21,'='],[21,27,'x'],[32,33,'x']] },
    { name: 'Level 11: Egghead', difficulty: 'expert', prefilled: [{i:0,v:1},{i:19,v:2},{i:35,v:1}], connectors: [[0,6,'='],[6,12,'x'],[19,25,'='],[25,31,'x'],[29,35,'='],[12,18,'x']] },
    { name: 'Level 12: Elbaf', difficulty: 'expert', prefilled: [{i:4,v:2},{i:13,v:1},{i:26,v:2}], connectors: [[4,10,'='],[10,16,'x'],[13,19,'='],[19,25,'x'],[26,32,'='],[16,22,'x']] }
];

export function createInitialBoard(level: Level): BoardState {
    const board = Array(ROWS * COLS).fill(0);
    level.prefilled.forEach(({ i, v }) => {
        if (v !== 0) board[i] = v;
    });
    return board;
}

export function validateBoard(board: BoardState, level: Level): ErrorCell[] {
    const errors: ErrorCell[] = [];

    // Rule 1: All cells must be filled
    if (board.some(cell => cell === 0)) {
        return [{ index: board.findIndex(c => c === 0), message: 'All cells must be filled to check the solution.' }];
    }

    // Rule 2: Connectors must be satisfied
    for (const [a, b, type] of level.connectors) {
        if (type === '=' && board[a] !== board[b]) errors.push({ index: b, message: 'Connector Error: These cells must match.' });
        if (type === 'x' && board[a] === board[b]) errors.push({ index: b, message: 'Connector Error: These cells must be different.' });
    }

    // Rule 3: No more than two identical symbols in a row or column
    for (let r = 0; r < ROWS; r++) { // Check rows
        for (let c = 0; c < COLS - 2; c++) {
            const i1 = r * COLS + c;
            if (board[i1] !== 0 && board[i1] === board[i1 + 1] && board[i1] === board[i1 + 2]) {
                errors.push({ index: i1 + 2, message: 'Rule Error: No more than two identical symbols in a row.' });
            }
        }
    }
    for (let c = 0; c < COLS; c++) { // Check columns
        for (let r = 0; r < ROWS - 2; r++) {
            const i1 = r * COLS + c;
            if (board[i1] !== 0 && board[i1] === board[i1 + COLS] && board[i1] === board[i1 + 2 * COLS]) {
                errors.push({ index: i1 + 2 * COLS, message: 'Rule Error: No more than two identical symbols in a column.' });
            }
        }
    }

    // Rule 4: Each row and column has an equal number of Pirate and Marine symbols
    for (let r = 0; r < ROWS; r++) {
        const row = board.slice(r * COLS, (r + 1) * COLS);
        const pirates = row.filter(v => v === 1).length;
        if (pirates !== COLS / 2) errors.push({ index: r * COLS, message: `Row ${r + 1} does not have 3 of each symbol.` });
    }
    for (let c = 0; c < COLS; c++) {
        const col = board.filter((_, i) => i % COLS === c);
        const pirates = col.filter(v => v === 1).length;
        if (pirates !== ROWS / 2) errors.push({ index: c, message: `Column ${c + 1} does not have 3 of each symbol.` });
    }

    // Rule 5: No two rows are the same, no two columns are the same
    const rowStrings = new Set<string>();
    for (let r = 0; r < ROWS; r++) {
        const rowStr = board.slice(r * COLS, (r + 1) * COLS).join('');
        if (rowStrings.has(rowStr)) {
            errors.push({ index: r * COLS, message: `Row ${r + 1} is a duplicate.` });
            break;
        }
        rowStrings.add(rowStr);
    }
    const colStrings = new Set<string>();
    for (let c = 0; c < COLS; c++) {
        const colStr = board.filter((_, i) => i % COLS === c).join('');
        if (colStrings.has(colStr)) {
            errors.push({ index: c, message: `Column ${c + 1} is a duplicate.` });
            break;
        }
        colStrings.add(colStr);
    }
    
    if (errors.length > 0) {
        const uniqueMessages = [...new Map(errors.map(item => [item.message, item])).values()];
        return uniqueMessages;
    }

    return [];
}


export function findHint(board: BoardState, level: Level, initialBoard: BoardState): Hint | null {
    // 1. Find a fixable error on the board
    for (const [a, b, type] of level.connectors) {
        if (board[a] !== 0 && board[b] !== 0) {
            if ((type === '=' && board[a] !== board[b]) || (type === 'x' && board[a] === board[b])) {
                return { index: b, message: "Hint: This connector's rule is being violated." };
            }
        }
    }

    // 2. Find a forced move
    for (let i = 0; i < board.length; i++) {
        if (board[i] !== 0) continue; // Only look for empty cells to fill

        // Check for two-in-a-row horizontally
        if (i % COLS > 0 && i % COLS < COLS - 1) {
            if (board[i-1] !== 0 && board[i-1] === board[i+1]) return { index: i, message: `Hint: Avoid three in a row here!` };
        }
        // Check for two-in-a-row vertically
        if (Math.floor(i / COLS) > 0 && Math.floor(i / COLS) < ROWS - 1) {
            if (board[i-COLS] !== 0 && board[i-COLS] === board[i+COLS]) return { index: i, message: `Hint: Avoid three in a column here!` };
        }
        // Check for adjacent pairs horizontally
        if (i % COLS < COLS - 2 && board[i+1] !== 0 && board[i+1] === board[i+2]) return { index: i, message: `Hint: A pair is next to this cell...` };
        if (i % COLS > 1 && board[i-1] !== 0 && board[i-1] === board[i-2]) return { index: i, message: `Hint: A pair is next to this cell...` };
        // Check for adjacent pairs vertically
        if (Math.floor(i / COLS) < ROWS - 2 && board[i+COLS] !== 0 && board[i+COLS] === board[i+2*COLS]) return { index: i, message: `Hint: A pair is below this cell...` };
        if (Math.floor(i / COLS) > 1 && board[i-COLS] !== 0 && board[i-COLS] === board[i-2*COLS]) return { index: i, message: `Hint: A pair is above this cell...` };

        // Check for connector logic
        for (const [a, b] of level.connectors) {
            if (a === i && board[b] !== 0) return { index: i, message: `Hint: Look at the connector clue on this cell.` };
            if (b === i && board[a] !== 0) return { index: i, message: `Hint: The connected cell can help you solve this one.` };
        }
    }
    
    // 3. Find any empty, non-prefilled cell as a last resort
    const firstEmpty = board.findIndex((cell, index) => cell === 0 && initialBoard[index] === 0);
    if (firstEmpty !== -1) {
        return { index: firstEmpty, message: "Hint: Try starting here and see what happens." };
    }

    return null; // No hints available
}
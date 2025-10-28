
import React from 'react';
import type { Board as BoardType, Coords } from '../types.ts';
import Cell from './Cell.tsx';
import RowColCounters from './RowColCounters.tsx';

interface BoardProps {
    board: BoardType;
    initialBoard: BoardType;
    errors: Coords[];
    hint: Coords | null;
    onCellClick: (row: number, col: number) => void;
}

const Board: React.FC<BoardProps> = ({ board, initialBoard, errors, hint, onCellClick }) => {
    const isError = (row: number, col: number) => {
        return errors.some(error => error.row === row && error.col === col);
    };

    return (
        <div className="relative">
            <RowColCounters board={board} />
            <div className="grid grid-cols-6 gap-1 sm:gap-2 p-2 rounded-lg bg-[var(--bg-board)] ml-10 sm:ml-12">
                {board.map((row, rowIndex) => (
                    row.map((cellValue, colIndex) => (
                        <Cell
                            key={`${rowIndex}-${colIndex}`}
                            value={cellValue}
                            isInitial={initialBoard[rowIndex][colIndex] !== 0}
                            isError={isError(rowIndex, colIndex)}
                            isHint={!!hint && hint.row === rowIndex && hint.col === colIndex}
                            onClick={() => onCellClick(rowIndex, colIndex)}
                        />
                    ))
                ))}
            </div>
        </div>
    );
};

export default Board;

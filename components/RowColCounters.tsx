
import React from 'react';
import type { Board, CellValue } from '../types.ts';

interface RowColCountersProps {
    board: Board;
}

const SYMBOLS: { [key in CellValue]: string } = {
    0: '',
    1: '🏴‍☠️',
    2: '⚓',
};

const Counter: React.FC<{ count: number; symbol: string; isOver: boolean }> = ({ count, symbol, isOver }) => (
    <div className={`flex items-center justify-center text-xs font-bold ${isOver ? 'text-red-500' : ''}`}>
        {symbol}<span>{count}</span>
    </div>
);

const RowColCounters: React.FC<RowColCountersProps> = ({ board }) => {
    const size = board.length;
    const halfSize = size / 2;

    const rowCounters = board.map(row => {
        const counts = { 1: 0, 2: 0 };
        row.forEach(cell => {
            if (cell === 1 || cell === 2) counts[cell]++;
        });
        return counts;
    });

    const colCounters = Array.from({ length: size }, (_, colIndex) => {
        const counts = { 1: 0, 2: 0 };
        board.forEach(row => {
            const cell = row[colIndex];
            if (cell === 1 || cell === 2) counts[cell]++;
        });
        return counts;
    });

    return (
        <>
            <div className="grid grid-cols-6 gap-1 sm:gap-2 mb-1 sm:mb-2 ml-10 sm:ml-12">
                {colCounters.map((counts, i) => (
                    <div key={`col-counter-${i}`} className="flex flex-col items-center justify-center bg-[var(--bg-cell)] rounded-lg py-1 aspect-square">
                        <Counter count={counts[1]} symbol={SYMBOLS[1]} isOver={counts[1] > halfSize} />
                        <Counter count={counts[2]} symbol={SYMBOLS[2]} isOver={counts[2] > halfSize} />
                    </div>
                ))}
            </div>
            <div className="absolute top-12 left-0 flex flex-col gap-1 sm:gap-2">
                 {rowCounters.map((counts, i) => (
                    <div key={`row-counter-${i}`} className="flex items-center justify-evenly bg-[var(--bg-cell)] rounded-lg w-10 sm:w-12 h-[calc((100%-20px)/6)] sm:h-[calc((100%-28px)/6)]">
                         <Counter count={counts[1]} symbol={SYMBOLS[1]} isOver={counts[1] > halfSize} />
                         <Counter count={counts[2]} symbol={SYMBOLS[2]} isOver={counts[2] > halfSize} />
                    </div>
                ))}
            </div>
        </>
    );
};

export default RowColCounters;

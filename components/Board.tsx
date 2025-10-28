import React from 'react';
import Cell from './Cell';
import type { BoardState, ErrorCell, Hint, Level } from '../types';
import { COLS } from '../lib/game';

interface BoardProps {
  board: BoardState;
  initialBoard: BoardState;
  level: Level;
  errors: ErrorCell[];
  hint: Hint | null;
  onCellClick: (index: number) => void;
  isGameWon: boolean;
}

const Connector: React.FC<{ type: '=' | 'x', orientation: 'h' | 'v' }> = ({ type, orientation }) => {
  const baseClasses = "absolute z-10 w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-xs font-black text-gray-800 dark:text-gray-200 shadow-inner";
  const positionClasses = orientation === 'h'
    ? 'top-1/2 -right-2 -translate-y-1/2'
    : 'left-1/2 -bottom-2 -translate-x-1/2';
  return <div className={`${baseClasses} ${positionClasses}`}>{type}</div>
}

const Board: React.FC<BoardProps> = ({ board, initialBoard, level, errors, hint, onCellClick, isGameWon }) => {
  const { connectors } = level;

  const isError = (index: number): boolean => {
    return errors.some(error => error.index === index || (error.index >= 0 && (Math.floor(error.index / COLS) === Math.floor(index/COLS) || error.index % COLS === index % COLS)));
  };

  const getConnectorForCell = (index: number): { type: '=' | 'x', orientation: 'h' | 'v' } | null => {
      for (const [a, b, type] of connectors) {
          if (a === index) {
              if (b === a + 1) return { type, orientation: 'h' }; // Horizontal
              if (b === a + COLS) return { type, orientation: 'v' }; // Vertical
          }
      }
      return null;
  }

  return (
    <div className={`p-2 sm:p-3 bg-[var(--bg-board)] rounded-xl shadow-inner aspect-square ${isGameWon ? 'animate-win-celebration' : ''}`}>
       <style>{`
        @keyframes win-celebration {
            0% { box-shadow: 0 0 0 0px rgba(59, 130, 246, 0.5), inset 0 0 0 rgba(0,0,0,0.1); }
            50% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0), inset 0 0 10px rgba(59, 130, 246, 0.2); }
            100% { box-shadow: 0 0 0 0px rgba(59, 130, 246, 0), inset 0 0 0 rgba(0,0,0,0.1); }
        }
        .animate-win-celebration { animation: win-celebration 1.2s ease-out; }
      `}</style>
      <div className="grid grid-cols-6 grid-rows-6 gap-1.5 sm:gap-2">
        {board.map((cellValue, index) => {
          const connector = getConnectorForCell(index);
          return (
            <div key={index} className="relative">
              <Cell
                value={cellValue}
                isInitial={initialBoard[index] !== 0}
                isError={isError(index)}
                isHint={hint?.index === index}
                onClick={() => onCellClick(index)}
              />
              {connector && <Connector type={connector.type} orientation={connector.orientation} />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Board;
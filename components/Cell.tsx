
import React from 'react';
// Fix: Explicitly added .ts extension to the import to resolve module error.
import type { CellValue } from '../types.ts';

interface CellProps {
  value: CellValue;
  isInitial: boolean;
  isError: boolean;
  isHint: boolean;
  onClick: () => void;
}

const SYMBOLS: { [key in CellValue]: string } = {
  0: '',
  1: '🏴‍☠️', // Pirate
  2: '⚓',  // Marine
};

const Cell: React.FC<CellProps> = ({ value, isInitial, isError, isHint, onClick }) => {
  const baseClasses = "w-full h-full aspect-square rounded-lg flex items-center justify-center text-2xl sm:text-3xl select-none transition-all duration-200";
  
  let dynamicClasses = '';

  if (isError) {
    dynamicClasses = 'bg-[var(--bg-cell-error)] border-2 border-[var(--border-cell-error)] animate-error-shake';
  } else if (isInitial) {
    dynamicClasses = 'bg-[var(--bg-cell-prefilled)] border-2 border-[var(--border-cell-prefilled)] cursor-not-allowed';
  } else {
    dynamicClasses = 'bg-[var(--bg-cell)] border-2 border-[var(--border-cell)] cursor-pointer hover:transform hover:-translate-y-0.5 hover:shadow-lg';
  }

  if (isHint) {
    dynamicClasses += ' animate-hint-pulse';
  }
  
  return (
    <div 
      className={`${baseClasses} ${dynamicClasses}`} 
      onClick={isInitial ? undefined : onClick}
    >
      <span className="transform transition-transform duration-200 group-hover:scale-110">{SYMBOLS[value]}</span>
    </div>
  );
};

export default Cell;

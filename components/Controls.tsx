
import React from 'react';
import { CheckIcon, HintIcon, ResetIcon, NewGameIcon } from './icons.tsx';

interface ControlsProps {
  onCheck: () => void;
  onHint: () => void;
  onReset: () => void;
  onNewGame: () => void;
}

const ControlButton: React.FC<{ onClick: () => void; children: React.ReactNode, label: string }> = ({ onClick, children, label }) => (
    <button
        onClick={onClick}
        className="flex-1 flex flex-col items-center justify-center gap-1 p-2 rounded-lg bg-[var(--bg-button)] text-[var(--text-button)] hover:bg-[var(--bg-button-hover)] transition-all duration-200 hover:scale-105"
        aria-label={label}
    >
        {children}
        <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
    </button>
);

const Controls: React.FC<ControlsProps> = ({ onCheck, onHint, onReset, onNewGame }) => {
  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-4 my-4">
        <ControlButton onClick={onCheck} label="Check">
            <CheckIcon className="w-6 h-6" />
        </ControlButton>
        <ControlButton onClick={onHint} label="Hint">
            <HintIcon className="w-6 h-6" />
        </ControlButton>
        <ControlButton onClick={onReset} label="Reset">
            <ResetIcon className="w-6 h-6" />
        </ControlButton>
        <ControlButton onClick={onNewGame} label="New Game">
            <NewGameIcon className="w-6 h-6" />
        </ControlButton>
    </div>
  );
};

export default Controls;

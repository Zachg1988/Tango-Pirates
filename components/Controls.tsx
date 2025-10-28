import React from 'react';
import { ResetIcon, CheckIcon, HintIcon, QuizIcon, NextIcon } from './icons';

interface ControlsProps {
  onReset: () => void;
  onCheck: () => void;
  onHint: () => void;
  onNextLevel: () => void;
  onQuiz: () => void;
  isGameWon: boolean;
  isLastLevel: boolean;
}

const ControlButton: React.FC<{ onClick: () => void; children: React.ReactNode; className?: string; title: string; disabled?: boolean }> = ({ onClick, children, className = '', title, disabled = false }) => (
  <button
    onClick={onClick}
    title={title}
    disabled={disabled}
    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg shadow-[var(--shadow-button)] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 hover:transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${className}`}
  >
    {children}
  </button>
);

const Controls: React.FC<ControlsProps> = ({ onReset, onCheck, onHint, onNextLevel, onQuiz, isGameWon, isLastLevel }) => {
  return (
    <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 text-white font-bold">
        <ControlButton onClick={onQuiz} className="bg-pink-500 hover:bg-pink-600" title="Quiz">
            <QuizIcon /> <span className="hidden sm:inline">Quiz</span>
        </ControlButton>
        <ControlButton onClick={onReset} className="bg-purple-500 hover:bg-purple-600" title="Reset">
            <ResetIcon /> <span className="hidden sm:inline">Reset</span>
        </ControlButton>
        
        {isGameWon ? (
            <ControlButton 
              onClick={onNextLevel} 
              disabled={isLastLevel}
              className={`col-span-2 ${isLastLevel ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'}`} 
              title={isLastLevel ? "Congratulations!" : "Next Level"}
            >
                <NextIcon /> <span>{isLastLevel ? 'Game Complete!' : 'Next Level'}</span>
            </ControlButton>
        ) : (
            <>
                <ControlButton onClick={onHint} className="bg-yellow-500 hover:bg-yellow-600" title="Get a Hint">
                    <HintIcon /> <span className="hidden sm:inline">Hint</span>
                </ControlButton>
                <ControlButton onClick={onCheck} className="bg-green-600 hover:bg-green-700" title="Check Solution">
                    <CheckIcon /> <span className="hidden sm:inline">Check</span>
                </ControlButton>
            </>
        )}
    </div>
  );
};

export default Controls;
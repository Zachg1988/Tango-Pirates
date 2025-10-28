
import React from 'react';
import { HelpIcon } from './icons.tsx';

interface HeaderProps {
    onShowInstructions: () => void;
}

const Header: React.FC<HeaderProps> = ({ onShowInstructions }) => {
    return (
        <header className="flex justify-between items-center mb-4 p-2 rounded-lg bg-opacity-20">
            <h1 className="text-2xl sm:text-4xl font-black tracking-tighter text-[var(--text-title)]">
                Pirates vs Marines
            </h1>
            <button
                onClick={onShowInstructions}
                className="p-2 rounded-full text-[var(--text-button)] bg-[var(--bg-button)] hover:bg-[var(--bg-button-hover)] transition-colors"
                aria-label="Show instructions"
            >
                <HelpIcon className="w-6 h-6" />
            </button>
        </header>
    );
};

export default Header;

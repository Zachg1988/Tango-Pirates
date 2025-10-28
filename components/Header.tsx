
import React from 'react';
import { ThemeIcon } from './icons';

interface HeaderProps {
  onToggleTheme: () => void;
  theme: 'light' | 'dark';
}

const Header: React.FC<HeaderProps> = ({ onToggleTheme, theme }) => {
  return (
    <header className="text-center mb-4 relative">
      <h1 className="text-3xl sm:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500">
        ⚓ One Piece Tango ⚓
      </h1>
      <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">Master the Grand Line Puzzle</p>
      <button 
        onClick={onToggleTheme} 
        className="absolute top-0 right-0 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label="Toggle theme"
      >
        <ThemeIcon theme={theme} />
      </button>
    </header>
  );
};

export default Header;

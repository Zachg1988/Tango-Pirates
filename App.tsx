import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Header from './components/Header';
import Board from './components/Board';
import Controls from './components/Controls';
import QuizModal from './components/QuizModal';
import Stats from './components/Stats';
import Message from './components/Message';
import { LEVELS, createInitialBoard, validateBoard, findHint } from './lib/game';
import type { BoardState, ErrorCell, Hint } from './types';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [currentLevel, setCurrentLevel] = useState(0);
  const [board, setBoard] = useState<BoardState>([]);
  const [initialBoard, setInitialBoard] = useState<BoardState>([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [errors, setErrors] = useState<ErrorCell[]>([]);
  const [hint, setHint] = useState<Hint | null>(null);
  const [message, setMessage] = useState<{ text: string; type: 'error' | 'success' | 'hint' | '' }>({ text: '', type: '' });
  const [isGameWon, setIsGameWon] = useState(false);
  const [isQuizVisible, setQuizVisible] = useState(false);

  const level = useMemo(() => LEVELS[currentLevel], [currentLevel]);

  const clearIndicators = () => {
    setErrors([]);
    setHint(null);
    setMessage({ text: '', type: '' });
  };

  const loadLevel = useCallback((levelIndex: number) => {
    const newLevel = LEVELS[levelIndex];
    const newBoard = createInitialBoard(newLevel);
    setBoard(newBoard);
    setInitialBoard(newBoard);
    setMoves(0);
    setTime(0);
    clearIndicators();
    setIsGameWon(false);
    setCurrentLevel(levelIndex);
    localStorage.setItem('onePieceTangoLevel', String(levelIndex));
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const initialTheme = savedTheme || 'light';
    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');

    const savedLevel = parseInt(localStorage.getItem('onePieceTangoLevel') || '0', 10);
    loadLevel(savedLevel);
  }, [loadLevel]);

  useEffect(() => {
    if (isGameWon) return;
    const timer = setInterval(() => setTime(prevTime => prevTime + 1), 1000);
    return () => clearInterval(timer);
  }, [isGameWon]);

  const handleToggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };
  
  const handleCellClick = (index: number) => {
    if (initialBoard[index] !== 0 || isGameWon) return;
    clearIndicators();
    setBoard(prevBoard => {
      const newBoard = [...prevBoard];
      newBoard[index] = ((newBoard[index] + 1) % 3);
      return newBoard;
    });
    setMoves(prev => prev + 1);
  };
  
  const handleReset = () => {
    setBoard(initialBoard);
    setMoves(0);
    setTime(0);
    clearIndicators();
    setMessage({ text: 'Board reset!', type: 'hint' });
  };

  const handleCheck = () => {
    clearIndicators();
    const validationErrors = validateBoard(board, level);
    setErrors(validationErrors);
    if (validationErrors.length === 0) {
      setIsGameWon(true);
      setMessage({ text: 'Perfect! Level Cleared!', type: 'success' });
    } else {
      setMessage({ text: validationErrors[0].message, type: 'error' });
    }
  };
  
  const handleHint = () => {
    clearIndicators();
    const foundHint = findHint(board, level, initialBoard);
    if (foundHint) {
        setHint(foundHint);
        setMessage({ text: foundHint.message, type: 'hint' });
    } else {
        setMessage({ text: "No obvious moves. Keep thinking!", type: 'hint' });
    }
  };

  const handleNextLevel = () => {
    if (currentLevel < LEVELS.length - 1) {
      loadLevel(currentLevel + 1);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-2 sm:p-4 bg-[var(--bg-body)] transition-colors">
      <div className="bg-[var(--bg-container)] backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 w-full max-w-md text-[var(--text-body)] transition-colors">
        <Header onToggleTheme={handleToggleTheme} theme={theme} />
        
        <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-[var(--text-title)]">{level.name}</h2>
            <p className="font-semibold uppercase tracking-wider text-sm">{level.difficulty}</p>
        </div>

        <Stats moves={moves} time={time} currentLevel={currentLevel} totalLevels={LEVELS.length} />

        <Board
          board={board}
          initialBoard={initialBoard}
          level={level}
          errors={errors}
          hint={hint}
          onCellClick={handleCellClick}
          isGameWon={isGameWon}
        />
        <Controls
          onReset={handleReset}
          onCheck={handleCheck}
          onHint={handleHint}
          onNextLevel={handleNextLevel}
          onQuiz={() => setQuizVisible(true)}
          isGameWon={isGameWon}
          isLastLevel={currentLevel === LEVELS.length - 1}
        />
        <Message text={message.text} type={message.type} />
        <p className="text-center text-xs mt-2">Tap to cycle: Empty → 🏴‍☠️ → ⚓</p>
      </div>
      {isQuizVisible && <QuizModal onClose={() => setQuizVisible(false)} />}
    </div>
  );
};

export default App;
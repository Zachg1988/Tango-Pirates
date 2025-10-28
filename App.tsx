
import React, { useState, useEffect, useCallback } from 'react';
import Board from './components/Board.tsx';
import Controls from './components/Controls.tsx';
import Header from './components/Header.tsx';
import Stats from './components/Stats.tsx';
import Message from './components/Message.tsx';
import WinModal from './components/WinModal.tsx';
import InstructionsModal from './components/InstructionsModal.tsx';
import QuizModal from './components/QuizModal.tsx';
import { getPuzzle, checkBoard, validateBoard, LEVELS } from './lib/game.ts';
import type { Board as BoardType, CellValue, Coords, Puzzle } from './types.ts';

function App() {
  const [puzzle, setPuzzle] = useState<Puzzle>(getPuzzle(0));
  const [board, setBoard] = useState<BoardType>(puzzle.initial);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [errors, setErrors] = useState<Coords[]>([]);
  const [hint, setHint] = useState<Coords | null>(null);
  const [message, setMessage] = useState<{ text: string; type: 'error' | 'success' | 'hint' | '' }>({ text: '', type: '' });
  const [isWon, setIsWon] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);

  const newGame = useCallback((level: number) => {
    const newPuzzle = getPuzzle(level);
    setPuzzle(newPuzzle);
    setBoard(newPuzzle.initial);
    setCurrentLevel(level);
    setMoves(0);
    setTime(0);
    setTimerActive(true);
    setIsWon(false);
    setErrors([]);
    setHint(null);
    setMessage({ text: '', type: '' });
  }, []);

  useEffect(() => {
    newGame(0);
  }, [newGame]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerActive && !isWon) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive, isWon]);

  const handleCellClick = (row: number, col: number) => {
    if (isWon || puzzle.initial[row][col] !== 0) return;

    setBoard((prevBoard) => {
      const newBoard = prevBoard.map(r => [...r]);
      newBoard[row][col] = ((newBoard[row][col] + 1) % 3) as CellValue;
      return newBoard;
    });
    setMoves((prev) => prev + 1);
    setErrors([]);
    setHint(null);
    setMessage({ text: '', type: '' });
    if (!timerActive) setTimerActive(true);
  };

  const handleCheck = () => {
    const validationErrors = validateBoard(board);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setMessage({ text: 'Something is not right...', type: 'error' });
      return;
    }

    const isFull = board.every(row => row.every(cell => cell !== 0));
    if (!isFull) {
        setMessage({ text: "Grid is not full yet!", type: 'hint' });
        return;
    }

    if (checkBoard(board, puzzle.solution)) {
      setIsWon(true);
      setTimerActive(false);
      setMessage({ text: 'Congratulations! You solved it!', type: 'success' });
    } else {
      setMessage({ text: 'Incorrect solution. Keep trying!', type: 'error' });
    }
  };

  const handleHint = () => {
    const emptyCells: Coords[] = [];
    for (let r = 0; r < board.length; r++) {
      for (let c = 0; c < board[r].length; c++) {
        if (board[r][c] === 0 || board[r][c] !== puzzle.solution[r][c]) {
          emptyCells.push({ row: r, col: c });
        }
      }
    }

    if (emptyCells.length > 0) {
      const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      setBoard(prevBoard => {
        const newBoard = prevBoard.map(r => [...r]);
        newBoard[randomCell.row][randomCell.col] = puzzle.solution[randomCell.row][randomCell.col];
        return newBoard;
      });
      setHint(randomCell);
      setMoves(m => m + 1);
      setMessage({ text: 'Here is a hint!', type: 'hint' });
    } else {
      setMessage({ text: 'No more hints available.', type: 'hint' });
    }
  };

  const handleReset = () => {
    setBoard(puzzle.initial);
    setMoves(0);
    setTime(0);
    setTimerActive(false);
    setErrors([]);
    setHint(null);
    setMessage({ text: 'Board reset.', type: '' });
  };
  
  const handleNextLevel = () => {
    const nextLevel = (currentLevel + 1) % LEVELS.length;
    newGame(nextLevel);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = String(seconds % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <main className="min-h-screen bg-[var(--bg-main)] flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-md mx-auto bg-[var(--bg-container)] p-4 rounded-2xl shadow-2xl">
        <Header onShowInstructions={() => setShowInstructions(true)} />
        <Stats moves={moves} time={time} currentLevel={currentLevel} totalLevels={LEVELS.length} />
        <Board 
            board={board} 
            initialBoard={puzzle.initial}
            errors={errors}
            hint={hint}
            onCellClick={handleCellClick}
        />
        <Message text={message.text} type={message.type} />
        <Controls 
            onCheck={handleCheck}
            onHint={handleHint}
            onReset={handleReset}
            onNewGame={() => newGame(currentLevel)}
        />
      </div>
      {isWon && (
          <WinModal 
            moves={moves}
            time={formatTime(time)}
            level={currentLevel}
            onNextLevel={handleNextLevel}
            onShowQuiz={() => setShowQuiz(true)}
          />
      )}
      {showInstructions && <InstructionsModal onClose={() => setShowInstructions(false)} />}
      {showQuiz && <QuizModal onClose={() => setShowQuiz(false)} />}
    </main>
  );
}

export default App;

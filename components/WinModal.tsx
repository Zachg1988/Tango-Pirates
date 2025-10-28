
import React from 'react';

interface WinModalProps {
    moves: number;
    time: string;
    level: number;
    onNextLevel: () => void;
    onShowQuiz: () => void;
}

const WinModal: React.FC<WinModalProps> = ({ moves, time, level, onNextLevel, onShowQuiz }) => {
    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
            <div className="bg-[var(--bg-container)] border-4 border-yellow-400 dark:border-yellow-300 p-6 rounded-2xl text-center text-[var(--text-body)] max-w-sm w-full transform transition-all scale-100 animate-jump-in shadow-2xl">
                <h2 className="text-3xl font-bold mb-2 text-yellow-500 dark:text-yellow-400">
                    You Won!
                </h2>
                <p className="mb-4 text-lg">Level {level + 1} Cleared!</p>

                <div className="flex justify-around my-4 text-left p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <div><span className="font-bold">Moves:</span> {moves}</div>
                    <div><span className="font-bold">Time:</span> {time}</div>
                </div>

                <button
                    onClick={onNextLevel}
                    className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-green-700 transition-transform duration-200 hover:scale-105 mb-3"
                >
                    Next Level
                </button>
                
                <button
                    onClick={onShowQuiz}
                    className="w-full bg-blue-500 text-white font-bold py-2 px-6 rounded-lg shadow-lg hover:bg-blue-600 transition-transform duration-200 hover:scale-105"
                >
                   Take a Quiz!
                </button>

            </div>
            <style>{`
                @keyframes jump-in {
                    0% { transform: scale(0.5); opacity: 0; }
                    80% { transform: scale(1.05); opacity: 1; }
                    100% { transform: scale(1); opacity: 1; }
                }
                .animate-jump-in { animation: jump-in 0.5s ease-out forwards; }
            `}</style>
        </div>
    );
};

export default WinModal;

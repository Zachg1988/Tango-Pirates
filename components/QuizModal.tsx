import React, { useState } from 'react';

interface QuizModalProps {
  onClose: () => void;
}

const QUIZ_QUESTIONS = [
    {
        question: "Who was the first member to join the Straw Hat Pirates?",
        options: ["Nami", "Roronoa Zoro", "Usopp"],
        correctAnswer: "Roronoa Zoro"
    },
    {
        question: "What is the name of Zoro's three swords style?",
        options: ["Santoryu", "Nitoryu", "Ittoryu"],
        correctAnswer: "Santoryu"
    },
    {
        question: "Which Devil Fruit did Luffy eat?",
        options: ["Mera Mera no Mi", "Gomu Gomu no Mi", "Ope Ope no Mi"],
        correctAnswer: "Gomu Gomu no Mi"
    }
];

type AnswerState = 'unanswered' | 'correct' | 'incorrect';

const QuizModal: React.FC<QuizModalProps> = ({ onClose }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>('unanswered');
  
  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleAnswerClick = (answer: string) => {
    if (answerState !== 'unanswered') return;

    setSelectedAnswer(answer);
    if (answer === currentQuestion.correctAnswer) {
        setAnswerState('correct');
    } else {
        setAnswerState('incorrect');
    }
  };

  const handleNext = () => {
      setSelectedAnswer(null);
      setAnswerState('unanswered');
      setCurrentQuestionIndex((prev) => (prev + 1) % QUIZ_QUESTIONS.length);
  }

  const getButtonClass = (option: string) => {
    const base = "w-full text-left p-2 rounded-md transition-all duration-200";
    if (answerState === 'unanswered') {
        return `${base} bg-gray-200 dark:bg-gray-600 hover:bg-blue-200 dark:hover:bg-blue-800`;
    }
    if (option === currentQuestion.correctAnswer) {
        return `${base} bg-green-500 text-white font-bold`;
    }
    if (option === selectedAnswer) { // and is incorrect
        return `${base} bg-red-500 text-white font-bold`;
    }
    return `${base} bg-gray-200 dark:bg-gray-600 cursor-not-allowed opacity-70`;
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="bg-[var(--bg-container)] border-4 border-blue-500 dark:border-blue-400 p-6 rounded-2xl text-center text-[var(--text-body)] max-w-sm w-full transform transition-all scale-100 animate-jump-in shadow-2xl">
        <h2 className="text-3xl font-bold mb-4 text-[var(--text-title)]">
          One Piece Quiz!
        </h2>
        <div className="my-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg min-h-[160px]">
            <p className="font-semibold text-lg mb-3">{currentQuestion.question}</p>
            <div className="space-y-2 text-left">
                {currentQuestion.options.map(option => (
                    <button key={option} onClick={() => handleAnswerClick(option)} className={getButtonClass(option)} disabled={answerState !== 'unanswered'}>
                        {option}
                    </button>
                ))}
            </div>
        </div>

        {answerState !== 'unanswered' && (
            <button
                onClick={handleNext}
                className="w-full bg-yellow-500 text-white font-bold py-2 px-6 rounded-lg shadow-lg hover:bg-yellow-600 transition-transform duration-200 hover:scale-105 mb-2"
            >
                Next Question
            </button>
        )}

        <button
          onClick={onClose}
          className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800"
        >
          Back to Puzzle
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

export default QuizModal;
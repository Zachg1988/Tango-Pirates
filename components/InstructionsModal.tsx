
import React from 'react';

interface InstructionsModalProps {
  onClose: () => void;
}

const InstructionsModal: React.FC<InstructionsModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-[var(--bg-container)] p-6 rounded-2xl text-[var(--text-body)] max-w-lg w-full relative">
        <h2 className="text-2xl font-bold mb-4 text-center text-[var(--text-title)]">
          How to Play
        </h2>
        <ul className="space-y-3 list-disc list-inside">
          <li>The goal is to fill the entire grid with Pirates (🏴‍☠️) and Marines (⚓).</li>
          <li>No more than two of the same icon can be next to each other in a row or column.</li>
          <li>Each row and each column must have an equal number of Pirates and Marines (3 of each in a 6x6 grid).</li>
          <li>No two rows can be identical, and no two columns can be identical.</li>
        </ul>
        <button
          onClick={onClose}
          className="mt-6 w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-transform duration-200 hover:scale-105"
        >
          Got it!
        </button>
      </div>
       <style>{`
        @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default InstructionsModal;

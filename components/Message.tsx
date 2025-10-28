import React from 'react';

interface MessageProps {
  text: string;
  type: 'error' | 'success' | 'hint' | '';
}

const Message: React.FC<MessageProps> = ({ text, type }) => {
  const colorClass = {
    error: 'text-red-500 dark:text-red-400',
    success: 'text-green-600 dark:text-green-400',
    hint: 'text-yellow-600 dark:text-yellow-400',
    '': 'text-gray-600 dark:text-gray-400',
  }[type];

  return (
    <div className={`text-center h-10 flex items-center justify-center font-bold transition-all duration-300 ${colorClass} ${text ? 'opacity-100' : 'opacity-0'}`}>
      {text || ' '}
    </div>
  );
};

export default Message;
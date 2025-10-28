import React from 'react';

interface StatsProps {
  moves: number;
  time: number;
  currentLevel: number;
  totalLevels: number;
}

const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = String(seconds % 60).padStart(2, '0');
    return `${mins}:${secs}`;
};

const StatBox: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
    <div className="flex-1">
        <div className="text-sm font-bold text-[var(--text-body)]">{label}</div>
        <div className="text-2xl font-black text-[var(--text-stat)]">{value}</div>
    </div>
);

const Stats: React.FC<StatsProps> = ({ moves, time, currentLevel, totalLevels }) => {
  return (
    <div className="flex justify-between items-center mb-4 text-center">
        <StatBox label="MOVES" value={moves} />
        <StatBox label="TIME" value={formatTime(time)} />
        <StatBox label="LEVEL" value={`${currentLevel + 1}/${totalLevels}`} />
    </div>
  );
};

export default Stats;
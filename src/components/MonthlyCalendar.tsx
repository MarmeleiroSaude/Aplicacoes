import React from 'react';
import Calendar from 'react-calendar';
import type { DailySummary } from '../types';

interface Props {
  summaries: DailySummary[];
  onDayClick: (date: Date) => void;
}

export default function MonthlyCalendar({ summaries, onDayClick }: Props) {
  const tileContent = ({ date }: { date: Date }) => {
    const summary = summaries.find(s => 
      s.date.getDate() === date.getDate() && 
      s.date.getMonth() === date.getMonth() &&
      s.date.getFullYear() === date.getFullYear()
    );

    if (!summary) return null;

    return (
      <div className="text-xs mt-1">
        <div className="text-green-600">{summary.regularHours}h</div>
        {summary.overtime50 > 0 && <div className="text-orange-600">+{summary.overtime50}h (50%)</div>}
        {summary.overtime100 > 0 && <div className="text-red-600">+{summary.overtime100}h (100%)</div>}
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Calendário Mensal</h2>
      <Calendar
        className="rounded-lg border-none shadow-sm"
        tileContent={tileContent}
        onClickDay={onDayClick}
        locale="pt-BR"
      />
    </div>
  );
}
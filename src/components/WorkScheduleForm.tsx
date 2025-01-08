import React, { useState } from 'react';
import type { WorkSchedule } from '../types';

interface Props {
  onSubmit: (schedule: WorkSchedule) => void;
}

export default function WorkScheduleForm({ onSubmit }: Props) {
  const [schedule, setSchedule] = useState<WorkSchedule>({
    startTime: '08:00',
    endTime: '17:00',
    breakStart: '12:00',
    breakEnd: '13:00',
    workDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(schedule);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Jornada de Trabalho Padrão</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Horário de Entrada</label>
          <input
            type="time"
            value={schedule.startTime}
            onChange={e => setSchedule(s => ({ ...s, startTime: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Horário de Saída</label>
          <input
            type="time"
            value={schedule.endTime}
            onChange={e => setSchedule(s => ({ ...s, endTime: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Início do Intervalo</label>
          <input
            type="time"
            value={schedule.breakStart}
            onChange={e => setSchedule(s => ({ ...s, breakStart: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Fim do Intervalo</label>
          <input
            type="time"
            value={schedule.breakEnd}
            onChange={e => setSchedule(s => ({ ...s, breakEnd: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Salvar Jornada
        </button>
      </div>
    </form>
  );
}
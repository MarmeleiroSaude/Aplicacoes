import React, { useState } from 'react';
import type { WorkSchedule } from '../types';

interface Props {
  onSubmit: (config: { baseSalary: number; schedule: WorkSchedule }) => void;
}

export default function ConfigForm({ onSubmit }: Props) {
  const [baseSalary, setBaseSalary] = useState<number>(0);
  const [schedule, setSchedule] = useState<WorkSchedule>({
    startTime: '08:00',
    endTime: '17:00',
    breakStart: '12:00',
    breakEnd: '13:00',
    weeklyHours: 44,
    workDays: ['segunda', 'terca', 'quarta', 'quinta', 'sexta']
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ baseSalary, schedule });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6">Configuração Inicial</h2>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Salário Base (R$)
        </label>
        <input
          type="number"
          value={baseSalary}
          onChange={(e) => setBaseSalary(Number(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          min="0"
          step="0.01"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Horário de Entrada
          </label>
          <input
            type="time"
            value={schedule.startTime}
            onChange={(e) => setSchedule(s => ({ ...s, startTime: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Horário de Saída
          </label>
          <input
            type="time"
            value={schedule.endTime}
            onChange={(e) => setSchedule(s => ({ ...s, endTime: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Início do Intervalo
          </label>
          <input
            type="time"
            value={schedule.breakStart}
            onChange={(e) => setSchedule(s => ({ ...s, breakStart: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fim do Intervalo
          </label>
          <input
            type="time"
            value={schedule.breakEnd}
            onChange={(e) => setSchedule(s => ({ ...s, breakEnd: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Carga Horária Semanal
        </label>
        <input
          type="number"
          value={schedule.weeklyHours}
          onChange={(e) => setSchedule(s => ({ ...s, weeklyHours: Number(e.target.value) }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          min="1"
          max="44"
          required
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Salvar Configuração
        </button>
      </div>
    </form>
  );
}
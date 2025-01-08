import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import ConfigForm from './components/ConfigForm';
import TimeRecordImport from './components/TimeRecordImport';
import { analyzeTimeRecords, generateReport } from './utils/timeAnalysis';
import type { WorkSchedule, TimeRecord } from './types';

function App() {
  const [isConfigured, setIsConfigured] = useState(false);
  const [config, setConfig] = useState<{
    baseSalary: number;
    schedule: WorkSchedule;
  } | null>(null);
  const [timeRecords, setTimeRecords] = useState<TimeRecord[]>([]);
  const [analysis, setAnalysis] = useState<any[]>([]);

  const handleConfig = (newConfig: { baseSalary: number; schedule: WorkSchedule }) => {
    setConfig(newConfig);
    setIsConfigured(true);
  };

  const handleTimeRecordImport = (records: TimeRecord[]) => {
    setTimeRecords(records);
    if (config) {
      const analysisResult = analyzeTimeRecords(records, config.schedule);
      setAnalysis(analysisResult);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-gray-800">
                Sistema de Gestão de Ponto
              </span>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {!isConfigured ? (
          <div className="max-w-3xl mx-auto">
            <ConfigForm onSubmit={handleConfig} />
          </div>
        ) : (
          <>
            <TimeRecordImport onImport={handleTimeRecordImport} />
            <Dashboard 
              config={config!}
              timeRecords={timeRecords}
              analysis={analysis}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
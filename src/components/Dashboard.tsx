import React from 'react';
import { Clock, DollarSign, Clock4, TrendingUp, MinusCircle, PlusCircle, FileDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { WorkSchedule, TimeRecord } from '../types';

interface Props {
  config: {
    baseSalary: number;
    schedule: WorkSchedule;
  };
}

function Dashboard({ config }: Props) {
  // Cálculos baseados na configuração
  const hourlyRate = config.baseSalary / (config.schedule.weeklyHours * 4);
  const overtime50Rate = hourlyRate * 1.5;
  const overtime100Rate = hourlyRate * 2;
  
  const salaryData = {
    baseSalary: config.baseSalary,
    hourlyRate,
    overtime50Value: 0,
    overtime100Value: 0,
    bankHoursValue: 0,
    deductions: 0,
    totalSalary: config.baseSalary
  };

  const bankHoursToDays = (hours: number) => {
    const workHoursPerDay = config.schedule.weeklyHours / 5;
    return Math.floor(hours / workHoursPerDay);
  };

  const formatTime = (hours: number) => {
    const wholeHours = Math.floor(hours);
    const minutes = Math.round((hours - wholeHours) * 60);
    return `${wholeHours}h${minutes.toString().padStart(2, '0')}min`;
  };

  const handleExportPDF = () => {
    // Implementar geração de PDF
    console.log('Exportando PDF...');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Painel de Controle</h1>
        <button
          onClick={handleExportPDF}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          <FileDown className="w-5 h-5" />
          Exportar Relatório
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Valor Hora Normal</p>
              <p className="text-2xl font-bold">R$ {hourlyRate.toFixed(2)}</p>
            </div>
            <DollarSign className="text-blue-500 w-8 h-8" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Valor Hora 50%</p>
              <p className="text-2xl font-bold">R$ {overtime50Rate.toFixed(2)}</p>
            </div>
            <Clock className="text-green-500 w-8 h-8" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Valor Hora 100%</p>
              <p className="text-2xl font-bold">R$ {overtime100Rate.toFixed(2)}</p>
            </div>
            <Clock4 className="text-orange-500 w-8 h-8" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total a Receber</p>
              <p className="text-2xl font-bold">R$ {salaryData.totalSalary.toFixed(2)}</p>
            </div>
            <TrendingUp className="text-purple-500 w-8 h-8" />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Banco de Horas</h3>
            <PlusCircle className="text-blue-500 w-6 h-6" />
          </div>
          <p className="text-2xl font-bold mb-2">{formatTime(salaryData.bankHoursValue)}</p>
          <p className="text-sm text-gray-500">
            Equivalente a {bankHoursToDays(salaryData.bankHoursValue)} dias
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Descontos</h3>
            <MinusCircle className="text-red-500 w-6 h-6" />
          </div>
          <p className="text-2xl font-bold">{formatTime(salaryData.deductions)}</p>
          <p className="text-sm text-gray-500">
            Total: R$ {(salaryData.deductions * hourlyRate).toFixed(2)}
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Horas Extras</h3>
            <Clock className="text-gray-500 w-6 h-6" />
          </div>
          <div className="space-y-2">
            <p className="text-sm">
              50%: {formatTime(salaryData.overtime50Value)}
              <span className="block text-gray-500">
                R$ {(salaryData.overtime50Value * overtime50Rate).toFixed(2)}
              </span>
            </p>
            <p className="text-sm">
              100%: {formatTime(salaryData.overtime100Value)}
              <span className="block text-gray-500">
                R$ {(salaryData.overtime100Value * overtime100Rate).toFixed(2)}
              </span>
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Evolução Salarial</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={[
              { mes: 'Jan', salario: config.baseSalary },
              { mes: 'Fev', salario: config.baseSalary + 1200 },
              { mes: 'Mar', salario: config.baseSalary + 800 }
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="salario" stroke="#8884d8" name="Salário" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
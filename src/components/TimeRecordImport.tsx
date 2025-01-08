import React, { useRef } from 'react';
import { read, utils } from 'xlsx';
import type { TimeRecord } from '../types';

interface Props {
  onImport: (records: TimeRecord[]) => void;
}

export default function TimeRecordImport({ onImport }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = await file.arrayBuffer();
    const workbook = read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = utils.sheet_to_json(worksheet);
    
    // Transformar dados do Excel para o formato TimeRecord
    const records: TimeRecord[] = jsonData.map((row: any) => ({
      date: row['Data'],
      weekDay: row['Dia'],
      entries: {
        e1: row['Entrada 1'],
        s1: row['Saída 1'],
        e2: row['Entrada 2'],
        s2: row['Saída 2']
      }
    }));

    onImport(records);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Importar Registros de Ponto</h2>
      
      <div className="flex items-center justify-center w-full">
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Clique para importar</span> ou arraste o arquivo</p>
            <p className="text-xs text-gray-500">Arquivo Excel (.xlsx, .xls)</p>
          </div>
          <input 
            ref={fileRef}
            type="file" 
            className="hidden" 
            accept=".xlsx,.xls"
            onChange={handleImport}
          />
        </label>
      </div>
    </div>
  );
}
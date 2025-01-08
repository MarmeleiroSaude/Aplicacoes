import { TimeRecord, WorkSchedule } from '../types';

export function analyzeTimeRecords(records: TimeRecord[], schedule: WorkSchedule) {
  return records.map(record => {
    const { entries } = record;
    let regularHours = 0;
    let overtime50 = 0;
    let overtime100 = 0;
    let deductions = 0;

    // Converter horários para minutos para facilitar cálculos
    const scheduledStart = timeToMinutes(schedule.startTime);
    const scheduledEnd = timeToMinutes(schedule.endTime);
    const scheduledBreakStart = timeToMinutes(schedule.breakStart);
    const scheduledBreakEnd = timeToMinutes(schedule.breakEnd);

    // Analisar entradas e saídas
    if (entries.e1 && entries.s1) {
      const entry1 = timeToMinutes(entries.e1);
      const exit1 = timeToMinutes(entries.s1);

      // Calcular atrasos
      if (entry1 > scheduledStart) {
        deductions += (entry1 - scheduledStart) / 60;
      }

      // Calcular saídas antecipadas
      if (exit1 < scheduledEnd) {
        deductions += (scheduledEnd - exit1) / 60;
      }

      // Calcular horas trabalhadas
      let workedMinutes = exit1 - entry1;
      
      // Descontar intervalo se aplicável
      if (entry1 < scheduledBreakStart && exit1 > scheduledBreakEnd) {
        workedMinutes -= (scheduledBreakEnd - scheduledBreakStart);
      }

      // Converter para horas
      const workedHours = workedMinutes / 60;

      // Distribuir entre regular e extra
      const regularWorkday = 8; // horas
      if (workedHours <= regularWorkday) {
        regularHours = workedHours;
      } else {
        regularHours = regularWorkday;
        overtime50 = workedHours - regularWorkday;
      }
    }

    // Análise para domingos e feriados (100%)
    if (record.weekDay.toLowerCase() === 'domingo') {
      overtime100 = regularHours + overtime50;
      regularHours = 0;
      overtime50 = 0;
    }

    return {
      ...record,
      analysis: {
        regularHours,
        overtime50,
        overtime100,
        deductions
      }
    };
  });
}

function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

export function generateReport(records: TimeRecord[], analysis: any[]) {
  return analysis.map((record, index) => ({
    data: record.date,
    dia: record.weekDay,
    entrada1: records[index].entries.e1 || '-',
    saida1: records[index].entries.s1 || '-',
    entrada2: records[index].entries.e2 || '-',
    saida2: records[index].entries.s2 || '-',
    horasRegulares: formatHours(record.analysis.regularHours),
    horasExtras50: formatHours(record.analysis.overtime50),
    horasExtras100: formatHours(record.analysis.overtime100),
    descontos: formatHours(record.analysis.deductions)
  }));
}

function formatHours(hours: number): string {
  const wholeHours = Math.floor(hours);
  const minutes = Math.round((hours - wholeHours) * 60);
  return `${wholeHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}
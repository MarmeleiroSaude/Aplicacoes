export interface WorkSchedule {
  startTime: string;
  endTime: string;
  breakStart: string;
  breakEnd: string;
  weeklyHours: number;
  workDays: ('segunda' | 'terca' | 'quarta' | 'quinta' | 'sexta' | 'sabado')[];
}

export interface TimeRecord {
  date: string;
  weekDay: string;
  entries: {
    e1?: string;
    s1?: string;
    e2?: string;
    s2?: string;
    e3?: string;
    s3?: string;
    e4?: string;
    s4?: string;
  };
}

export interface DailySummary {
  date: Date;
  regularHours: number;
  overtime50: number;
  overtime100: number;
  bankHours: number;
  deductions: number;
}

export interface SalaryCalculation {
  baseSalary: number;
  hourlyRate: number;
  overtime50Value: number;
  overtime100Value: number;
  bankHoursValue: number;
  deductions: number;
  totalSalary: number;
}

export interface Holiday {
  date: string;
  description: string;
  type: 'feriado' | 'facultativo';
}
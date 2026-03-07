export interface DietChartHistory {
  id: string;
  patientId: string;
  disease: string;
  generatedAt: Date;
  calories: number;
  proteinsG: number;
  carbsG: number;
  fatsG: number;
}

export interface ProgressEntry {
  id: string;
  patientId: string;
  date: Date;
  weight: number;
  notes: string;
  symptoms: string;
  followUpRequired: boolean;
}

// Sample history data
export const sampleDietChartHistory: DietChartHistory[] = [
  {
    id: 'DC1',
    patientId: '1',
    disease: 'Fever',
    generatedAt: new Date('2024-12-01'),
    calories: 1200,
    proteinsG: 45,
    carbsG: 180,
    fatsG: 25,
  },
  {
    id: 'DC2',
    patientId: '1',
    disease: 'Fever',
    generatedAt: new Date('2024-12-15'),
    calories: 1400,
    proteinsG: 55,
    carbsG: 190,
    fatsG: 35,
  },
  {
    id: 'DC3',
    patientId: '1',
    disease: 'Cold & Cough',
    generatedAt: new Date('2025-01-05'),
    calories: 1400,
    proteinsG: 55,
    carbsG: 190,
    fatsG: 35,
  },
];

export const sampleProgressEntries: ProgressEntry[] = [
  {
    id: 'PE1',
    patientId: '1',
    date: new Date('2024-12-01'),
    weight: 55.0,
    notes: 'Initial consultation, fever symptoms observed',
    symptoms: 'High fever, weakness',
    followUpRequired: true,
  },
  {
    id: 'PE2',
    patientId: '1',
    date: new Date('2024-12-15'),
    weight: 54.5,
    notes: 'Fever reduced, following diet plan well',
    symptoms: 'Mild fever, improved appetite',
    followUpRequired: true,
  },
  {
    id: 'PE3',
    patientId: '1',
    date: new Date('2025-01-05'),
    weight: 55.2,
    notes: 'Recovered from fever, minor cold symptoms',
    symptoms: 'Runny nose, occasional cough',
    followUpRequired: false,
  },
];

export const generateHistoryId = (): string => {
  return 'H' + Date.now().toString(36).toUpperCase();
};

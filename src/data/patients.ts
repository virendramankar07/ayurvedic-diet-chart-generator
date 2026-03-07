export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  weight: number;
  height: number;
  bloodGroup: string;
  disease: string;
  medications: string;
  allergies: string;
  lifestyle: 'Sedentary' | 'Moderate' | 'Active';
  contact: string;
  address: string;
  notes: string;
  createdAt: Date;
}

// Initial patient data from CSV
export const initialPatients: Patient[] = [
  {
    id: '1',
    name: 'Hitesh Mahakaliya',
    age: 20,
    gender: 'Male',
    weight: 55.0,
    height: 167.0,
    bloodGroup: 'A+',
    disease: 'Fever',
    medications: '',
    allergies: 'Began',
    lifestyle: 'Sedentary',
    contact: '0000000000',
    address: 'Mhow',
    notes: 'Always careful',
    createdAt: new Date(),
  },
];

export const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const lifestyles = ['Sedentary', 'Moderate', 'Active'] as const;

export const generatePatientId = (): string => {
  return 'P' + Date.now().toString(36).toUpperCase();
};

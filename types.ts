// FIX: Removed a self-import that was causing type declaration conflicts.

export type UnitSystem = 'imperial' | 'metric';
export type Sex = 'male' | 'female';
export type Terrain = 'paved' | 'trail' | 'sand';

export interface FormData {
  unitSystem: UnitSystem;
  sex: Sex;
  age: number;
  bodyWeight: number;
  ruckWeight: number;
  distance: number;
  durationHours: number;
  durationMinutes: number;
  terrain: Terrain;
  incline: number;
}

export interface CalcResults {
  totalCalories: number;
  caloriesPerHour: number;
  mets: number;
}

export interface Pace {
  minutes: number;
  seconds: number;
}

export interface Workout {
  id: string;
  date: string;
  formData: FormData;
  results: CalcResults;
  pace: Pace;
}

export type Errors = Partial<Record<keyof FormData, string>>;
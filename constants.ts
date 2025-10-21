import type { FormData } from './types';

export const CONVERSION_FACTORS = {
  LBS_TO_KG: 0.453592,
  MILES_TO_KM: 1.60934,
};

export const MET_CONSTANTS = {
  TERRAIN_MULTIPLIERS: {
    paved: 1.0, // Paved road, track
    trail: 1.1, // Dirt trail, grass
    sand: 1.25, // Loose sand, snow
  },
};

export const INITIAL_FORM_STATE: FormData = {
  unitSystem: 'imperial',
  sex: 'male',
  age: 30,
  bodyWeight: 180,
  ruckWeight: 35,
  distance: 5,
  durationHours: 1,
  durationMinutes: 30,
  terrain: 'trail',
  incline: 2,
};

export const OTHER_ACTIVITIES_METS: { name: string; mets: number }[] = [
    { name: 'Running (6 mph)', mets: 9.8 },
    { name: 'Cycling (12-14 mph)', mets: 8.0 },
    { name: 'Swimming (freestyle)', mets: 7.0 },
    { name: 'Walking (3.5 mph)', mets: 3.8 },
];

export const FOOD_EQUIVALENTS: { name: string; calories: number; emoji: string }[] = [
    { name: 'Banana', calories: 105, emoji: '🍌' },
    { name: 'Apple', calories: 95, emoji: '🍎' },
    { name: 'Donut', calories: 250, emoji: '🍩' },
    { name: 'Slice of Pizza', calories: 285, emoji: '🍕' },
    { name: 'Taco', calories: 180, emoji: '🌮'},
    { name: 'Cheeseburger', calories: 350, emoji: '🍔' },
    { name: 'Chicken Wing', calories: 80, emoji: '🍗' },
    { name: 'Chocolate Bar', calories: 210, emoji: '🍫' },
    { name: 'Cupcake', calories: 130, emoji: '🧁' },
    { name: 'Beer (12oz)', calories: 154, emoji: '🍺' },
    { name: 'Glass of Wine', calories: 125, emoji: '🍷' },
];
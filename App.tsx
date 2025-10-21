import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { CalculatorForm } from './components/CalculatorForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { WorkoutHistory } from './components/WorkoutHistory';
import { Article } from './components/Article';
import { MetaTags } from './components/MetaTags';
import type { UnitSystem, FormData, CalcResults, Sex, Terrain, Errors, Workout, Pace } from './types';
import { INITIAL_FORM_STATE, CONVERSION_FACTORS, MET_CONSTANTS } from './constants';

const CalculatorPage: React.FC<{
  formData: FormData;
  results: CalcResults | null;
  pace: Pace | null;
  errors: Errors;
  workouts: Workout[];
  onFormChange: (field: keyof FormData, value: string | number | UnitSystem | Sex | Terrain) => void;
  onReset: () => void;
  onSaveWorkout: () => void;
  onDeleteWorkout: (id: string) => void;
  onClearHistory: () => void;
}> = ({
  formData, results, pace, errors, workouts,
  onFormChange, onReset, onSaveWorkout, onDeleteWorkout, onClearHistory
}) => (
  <>
    <MetaTags 
      title="Rucking Calorie Calculator" 
      description="Accurately estimate the calories burned while rucking with our detailed calculator. Input your body weight, ruck weight, distance, time, and terrain to get precise results, track your workout history, and compare your effort to other activities." 
    />
    <header className="text-center mb-8 md:mb-12">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-brand-primary">Rucking Calorie Calculator</h1>
      <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
        Estimate the calories you burn while rucking. Adjust the inputs below to get real-time, accurate results for your workout.
      </p>
    </header>

    <div className="grid grid-cols-1 lg:grid-cols-5 lg:gap-8">
      <div className="lg:col-span-2 mb-8 lg:mb-0" id="calculator-form">
        <CalculatorForm formData={formData} onFormChange={onFormChange} errors={errors} />
      </div>
      <div className="lg:col-span-3" id="results-display">
        <ResultsDisplay
          results={results}
          pace={pace}
          unitSystem={formData.unitSystem}
          distance={formData.distance}
          onReset={onReset}
          onSaveWorkout={onSaveWorkout}
          bodyWeight={formData.unitSystem === 'imperial' ? formData.bodyWeight * CONVERSION_FACTORS.LBS_TO_KG : formData.bodyWeight}
          durationHours={formData.durationHours + formData.durationMinutes / 60}
        />
      </div>
    </div>

    <div className="my-8 lg:my-12 text-center">
        <div className='ad-slot' style={{ minHeight: '100px', width: '100%', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', border: '1px dashed #ccc' }}>Responsive Ad Placeholder</div>
    </div>

    <div className="mt-8 lg:mt-12">
      <WorkoutHistory 
        workouts={workouts} 
        onDelete={onDeleteWorkout} 
        onClear={onClearHistory} 
      />
    </div>
      <div className="mt-8 lg:mt-12">
      <Article />
    </div>
  </>
);


const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_STATE);
  const [results, setResults] = useState<CalcResults | null>(null);
  const [pace, setPace] = useState<Pace | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    try {
      const savedWorkouts = localStorage.getItem('ruckingHistory');
      if (savedWorkouts) {
        setWorkouts(JSON.parse(savedWorkouts));
      }
    } catch (error) {
      console.error("Failed to load workout history from localStorage:", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('ruckingHistory', JSON.stringify(workouts));
    } catch (error) {
      console.error("Failed to save workout history to localStorage:", error);
    }
  }, [workouts]);


  const validateForm = useCallback((data: FormData): Errors => {
    const newErrors: Errors = {};
    
    if (data.age < 10 || data.age > 99) {
        newErrors.age = 'Must be between 10 and 99.';
    }

    if (data.bodyWeight <= 0) {
        newErrors.bodyWeight = 'Must be positive.';
    }

    if (data.ruckWeight < 0) {
        newErrors.ruckWeight = 'Cannot be negative.';
    }

    if (data.distance <= 0) {
        newErrors.distance = 'Must be positive.';
    }

    if (data.durationHours < 0) {
        newErrors.durationHours = 'Cannot be negative.';
    }

    if (data.durationMinutes < 0 || data.durationMinutes > 59) {
        newErrors.durationMinutes = 'Must be 0-59.';
    }

    const totalDuration = data.durationHours + data.durationMinutes / 60;
    if (totalDuration <= 0) {
        newErrors.durationMinutes = 'Total duration must be greater than zero.';
    }

    if (data.incline < 0) {
        newErrors.incline = 'Cannot be negative.';
    }

    return newErrors;
  }, []);


  const calculateCalories = useCallback(() => {
    const formErrors = validateForm(formData);
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      setResults(null);
      setPace(null);
      return;
    }

    const { 
      bodyWeight, ruckWeight, distance, durationHours, durationMinutes, 
      unitSystem, incline, age, sex, terrain 
    } = formData;

    const bodyWeightKg = unitSystem === 'imperial' ? bodyWeight * CONVERSION_FACTORS.LBS_TO_KG : bodyWeight;
    const ruckWeightKg = unitSystem === 'imperial' ? ruckWeight * CONVERSION_FACTORS.LBS_TO_KG : ruckWeight;
    const distanceKm = unitSystem === 'imperial' ? distance * CONVERSION_FACTORS.MILES_TO_KM : distance;
    const totalDurationHours = durationHours + durationMinutes / 60;

    if (bodyWeightKg <= 0 || totalDurationHours <= 0 || distanceKm <= 0) {
      setResults(null);
      setPace(null);
      return;
    }

    const speedKph = distanceKm / totalDurationHours;

    const totalMinutes = totalDurationHours * 60;
    const paceMinPerUnit = totalMinutes / (unitSystem === 'imperial' ? distance : distanceKm);
    const paceMinutes = Math.floor(paceMinPerUnit);
    const paceSeconds = Math.round((paceMinPerUnit - paceMinutes) * 60);
    setPace({ minutes: paceMinutes, seconds: paceSeconds });

    const baseMet = 3.5 * (speedKph / 4.8);
    const loadRatio = ruckWeightKg / bodyWeightKg;
    const loadFactor = 1 + (loadRatio * 2);
    const inclineFactor = 1 + (incline / 100) * 5;
    const terrainFactor = MET_CONSTANTS.TERRAIN_MULTIPLIERS[terrain];
    let ageSexFactor = 1.0;
    if (sex === 'female') {
      ageSexFactor *= 0.95;
    }
    if (age > 30) {
      ageSexFactor *= Math.max(0.8, 1 - (age - 30) * 0.005);
    }
    
    const calculatedMets = baseMet * loadFactor * inclineFactor * terrainFactor * ageSexFactor;
    const totalCalories = calculatedMets * bodyWeightKg * totalDurationHours;

    setResults({
      totalCalories: Math.round(totalCalories),
      caloriesPerHour: Math.round(totalCalories / totalDurationHours),
      mets: parseFloat(calculatedMets.toFixed(1)),
    });
  }, [formData, validateForm]);

  useEffect(() => {
    calculateCalories();
  }, [calculateCalories]);

  const handleFormChange = (field: keyof FormData, value: string | number | UnitSystem | Sex | Terrain) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_STATE);
    setErrors({});
  };

  const handleSaveWorkout = () => {
    if (!results || !pace) return;
    const newWorkout: Workout = {
        id: new Date().toISOString(),
        date: new Date().toISOString(),
        formData: { ...formData },
        results: { ...results },
        pace: { ...pace },
    };
    setWorkouts(prev => [newWorkout, ...prev]);
  };

  const handleDeleteWorkout = (id: string) => {
    setWorkouts(prev => prev.filter(w => w.id !== id));
  };
  
  const handleClearHistory = () => {
    setWorkouts([]);
  };

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen bg-white font-sans text-brand-dark">
        <Header />
        <main className="flex-grow max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/" element={
              <CalculatorPage
                formData={formData}
                results={results}
                pace={pace}
                errors={errors}
                workouts={workouts}
                onFormChange={handleFormChange}
                onReset={handleReset}
                onSaveWorkout={handleSaveWorkout}
                onDeleteWorkout={handleDeleteWorkout}
                onClearHistory={handleClearHistory}
              />
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
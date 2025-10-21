import React from 'react';
import type { UnitSystem, FormData, Sex, Terrain, Errors } from '../types';

interface CalculatorFormProps {
  formData: FormData;
  onFormChange: (field: keyof FormData, value: string | number | UnitSystem | Sex | Terrain) => void;
  errors: Errors;
}

const InputField: React.FC<{
  label: string;
  id: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  unit: string;
  min?: number;
  max?: number;
  step?: number;
  error?: string;
}> = ({ label, id, value, onChange, unit, min = 0, max = 500, step = 1, error }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <div className="flex items-center space-x-2">
      <input
        type="range"
        id={`${id}-slider`}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
      />
      <div className="relative w-32">
        <input
          type="number"
          id={id}
          value={value}
          onChange={onChange}
          min={min}
          className={`w-full pl-3 pr-10 py-2 text-base border focus:outline-none focus:ring-brand-primary focus:border-brand-primary rounded-md shadow-sm ${error ? 'border-red-500' : 'border-gray-300'}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-500">{unit}</span>
      </div>
    </div>
    {error && <p id={`${id}-error`} className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

const ToggleButtonGroup: React.FC<{
  label: string;
  options: { value: string; label: string }[];
  selectedValue: string;
  onChange: (value: any) => void;
}> = ({ label, options, selectedValue, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <div className="flex rounded-md shadow-sm">
      {options.map((option, index) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`flex-1 px-4 py-2 text-sm font-medium border border-gray-300 transition-colors duration-150
            ${index === 0 ? 'rounded-l-md' : ''}
            ${index === options.length - 1 ? 'rounded-r-md' : 'border-r-0'}
            ${selectedValue === option.value ? 'bg-brand-primary text-white z-10' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
        >
          {option.label}
        </button>
      ))}
    </div>
  </div>
);

const FormSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <fieldset className="space-y-6 border-t border-gray-200 pt-8 mt-8">
        <legend className="text-lg font-semibold text-brand-dark -mt-12 px-2 bg-white">{title}</legend>
        {children}
    </fieldset>
);


export const CalculatorForm: React.FC<CalculatorFormProps> = ({ formData, onFormChange, errors }) => {
  const { unitSystem, sex, age, bodyWeight, ruckWeight, distance, durationHours, durationMinutes, terrain, incline } = formData;
  
  const handleInputChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    onFormChange(field, e.target.valueAsNumber || 0);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg print:hidden">
      <div className="space-y-6">
        <ToggleButtonGroup
            label="Unit System"
            options={[
                { value: 'imperial', label: 'Imperial (lbs, miles)' },
                { value: 'metric', label: 'Metric (kg, km)' },
            ]}
            selectedValue={unitSystem}
            onChange={(value) => onFormChange('unitSystem', value)}
        />

        <FormSection title="About You">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <ToggleButtonGroup
                    label="Sex"
                    options={[ { value: 'male', label: 'Male' }, { value: 'female', label: 'Female' } ]}
                    selectedValue={sex}
                    onChange={(value) => onFormChange('sex', value)}
                />
                <div>
                  <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                  <div className="relative">
                    <input
                      type="number"
                      id="age"
                      value={age}
                      onChange={handleInputChange('age')}
                      min={10} max={99}
                      className={`w-full pl-3 pr-14 py-2 text-base border focus:outline-none focus:ring-brand-primary focus:border-brand-primary rounded-md shadow-sm ${errors.age ? 'border-red-500' : 'border-gray-300'}`}
                      aria-invalid={!!errors.age}
                      aria-describedby={errors.age ? 'age-error' : undefined}
                    />
                    <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-500">years</span>
                  </div>
                  {errors.age && <p id="age-error" className="mt-1 text-sm text-red-600">{errors.age}</p>}
                </div>
            </div>
             <InputField
                label="Your Body Weight"
                id="bodyWeight"
                value={bodyWeight}
                onChange={handleInputChange('bodyWeight')}
                unit={unitSystem === 'imperial' ? 'lbs' : 'kg'}
                max={unitSystem === 'imperial' ? 400 : 180}
                error={errors.bodyWeight}
            />
        </FormSection>

        <FormSection title="Your Ruck">
            <InputField
                label="Ruck / Backpack Weight"
                id="ruckWeight"
                value={ruckWeight}
                onChange={handleInputChange('ruckWeight')}
                unit={unitSystem === 'imperial' ? 'lbs' : 'kg'}
                max={unitSystem === 'imperial' ? 100 : 45}
                error={errors.ruckWeight}
            />
            <InputField
                label="Distance"
                id="distance"
                value={distance}
                onChange={handleInputChange('distance')}
                unit={unitSystem === 'imperial' ? 'miles' : 'km'}
                max={unitSystem === 'imperial' ? 30 : 50}
                step={0.1}
                error={errors.distance}
            />
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                    <input
                        type="number"
                        id="durationHours"
                        value={durationHours}
                        onChange={handleInputChange('durationHours')}
                        min={0}
                        className={`w-full pl-3 pr-12 py-2 text-base border focus:outline-none focus:ring-brand-primary focus:border-brand-primary rounded-md shadow-sm ${errors.durationHours ? 'border-red-500' : 'border-gray-300'}`}
                        aria-invalid={!!errors.durationHours}
                        aria-describedby={errors.durationHours ? 'durationHours-error' : undefined}
                    />
                    <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-500">hours</span>
                    </div>
                    <div className="relative">
                    <input
                        type="number"
                        id="durationMinutes"
                        value={durationMinutes}
                        onChange={handleInputChange('durationMinutes')}
                        min={0} max={59}
                        className={`w-full pl-3 pr-12 py-2 text-base border focus:outline-none focus:ring-brand-primary focus:border-brand-primary rounded-md shadow-sm ${errors.durationMinutes ? 'border-red-500' : 'border-gray-300'}`}
                        aria-invalid={!!errors.durationMinutes}
                        aria-describedby={errors.durationMinutes ? 'durationMinutes-error' : undefined}
                    />
                    <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-500">mins</span>
                    </div>
                </div>
                {errors.durationHours && <p id="durationHours-error" className="mt-1 text-sm text-red-600 col-span-2">{errors.durationHours}</p>}
                {errors.durationMinutes && <p id="durationMinutes-error" className="mt-1 text-sm text-red-600 col-span-2">{errors.durationMinutes}</p>}
             </div>
        </FormSection>
        
        <FormSection title="Environment">
            <ToggleButtonGroup
                label="Terrain"
                options={[
                    { value: 'paved', label: 'Paved' },
                    { value: 'trail', label: 'Trail' },
                    { value: 'sand', label: 'Sand/Snow' },
                ]}
                selectedValue={terrain}
                onChange={(value) => onFormChange('terrain', value)}
            />
            <InputField
                label="Average Incline"
                id="incline"
                value={incline}
                onChange={handleInputChange('incline')}
                unit="%"
                max={20}
                step={0.5}
                error={errors.incline}
            />
        </FormSection>
      </div>
    </div>
  );
};

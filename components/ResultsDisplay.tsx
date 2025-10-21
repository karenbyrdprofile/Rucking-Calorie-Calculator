import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import type { CalcResults, UnitSystem, Pace } from '../types';
import { OTHER_ACTIVITIES_METS, FOOD_EQUIVALENTS } from '../constants';

interface ResultsDisplayProps {
  results: CalcResults | null;
  pace: Pace | null;
  unitSystem: UnitSystem;
  distance: number;
  onReset: () => void;
  onSaveWorkout: () => void;
  bodyWeight: number; // in kg
  durationHours: number;
}

const InfoTooltip: React.FC<{ text: string }> = ({ text }) => (
    <div className="group relative flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div className="absolute bottom-full mb-2 w-48 bg-gray-800 text-white text-xs rounded py-1 px-2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
            {text}
        </div>
    </div>
);

const StatCard: React.FC<{ title: string; value?: string | number; unit?: string; tooltip?: string; children?: React.ReactNode }> = ({ title, value, unit, tooltip, children }) => (
  <div className="bg-gray-100 p-4 rounded-lg text-center">
    <p className="text-sm text-gray-500 uppercase tracking-wider flex items-center justify-center">
      {title}
      {tooltip && <InfoTooltip text={tooltip} />}
    </p>
    {value !== undefined && (
      <p className="font-bold text-brand-primary text-3xl">
        {value}
        {unit && <span className="text-xl ml-1">{unit}</span>}
      </p>
    )}
    {children}
  </div>
);

const PrintIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>;
const SaveIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" /></svg>;
const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
const FacebookIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z"/></svg>;
const LinkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.536a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>;

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        const isYourRuck = label === 'Your Ruck';
        return (
            <div className="p-3 bg-white rounded-lg shadow-xl border border-gray-200">
                <p className={`font-bold text-base mb-2 ${isYourRuck ? 'text-brand-secondary' : 'text-brand-primary'}`}>{label}</p>
                <div className="space-y-1 text-sm">
                    <div className="flex justify-between items-center space-x-4">
                        <span className="text-gray-500">Calories:</span>
                        <span className="font-semibold text-gray-900">{data.calories.toLocaleString()} kcal</span>
                    </div>
                    <div className="flex justify-between items-center space-x-4">
                        <span className="text-gray-500">MET Value:</span>
                        <span className="font-semibold text-gray-900">{data.mets}</span>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, pace, unitSystem, distance, onReset, onSaveWorkout, bodyWeight, durationHours }) => {
  const [hiddenActivities, setHiddenActivities] = useState<Set<string>>(new Set());
  const [isCopied, setIsCopied] = useState(false);

  const toggleActivityVisibility = (activityName: string) => {
    setHiddenActivities(prev => {
        const newSet = new Set(prev);
        if (newSet.has(activityName)) {
            newSet.delete(activityName);
        } else {
            newSet.add(activityName);
        }
        return newSet;
    });
  };
  
  const handleShare = (platform: 'twitter' | 'facebook' | 'copy') => {
    if (!results) return;

    const unitName = unitSystem === 'imperial' ? 'mile' : 'km';
    const text = `I just burned ${results.totalCalories} calories on a ${distance} ${unitName} ruck! 🔥 Check out this awesome Rucking Calorie Calculator to track your own workouts.`;
    const url = window.location.href;

    if (platform === 'twitter') {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        window.open(twitterUrl, '_blank', 'noopener,noreferrer');
    } else if (platform === 'facebook') {
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;
        window.open(facebookUrl, '_blank', 'noopener,noreferrer');
    } else if (platform === 'copy') {
        navigator.clipboard.writeText(url).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        });
    }
  };


  const comparisonData = OTHER_ACTIVITIES_METS
    .filter(activity => !hiddenActivities.has(activity.name))
    .map(activity => ({
      name: activity.name,
      calories: Math.round(activity.mets * bodyWeight * durationHours),
      mets: activity.mets,
    }));

  if (results) {
    comparisonData.unshift({
      name: 'Your Ruck',
      calories: results.totalCalories,
      mets: results.mets,
    });
  }
  
  const estimatedVo2 = results ? (results.mets * 3.5).toFixed(1) : '0';

  const handlePrint = () => {
    window.print();
  };
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg space-y-6" id="results-content">
      <h2 className="text-2xl font-bold text-center text-brand-primary">Your Results</h2>

      {results ? (
        <>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-500 uppercase tracking-wider">Total Calories Burned</p>
            <p className="font-bold text-brand-primary text-5xl">
              {results.totalCalories}
              <span className="text-2xl ml-1">kcal</span>
            </p>
          </div>
        
          <div className="grid grid-cols-2 gap-4">
            <StatCard title="Calories per Hour" value={results.caloriesPerHour} unit="kcal/hr" />
            <StatCard title="MET Value" value={results.mets} unit="METs" tooltip="METs (Metabolic Equivalents) measure exercise intensity. 1 MET is your resting energy expenditure." />
            <StatCard title="Oxygen Consumption" value={estimatedVo2} unit="VO₂" tooltip="Estimated oxygen consumed per kilogram of body weight per minute during this workout (ml/kg/min). A measure of exercise intensity." />
            <StatCard title="Average Pace">
                <p className="font-bold text-brand-primary text-3xl">
                    {pace ? `${pace.minutes}:${pace.seconds.toString().padStart(2, '0')}` : '-'}
                    <span className="text-xl ml-1">min/{unitSystem === 'imperial' ? 'mi' : 'km'}</span>
                </p>
            </StatCard>
          </div>
          
          <div className="my-6 text-center">
            <div className='ad-slot' style={{ minHeight: '100px', width: '100%', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', border: '1px dashed #ccc' }}>Responsive Ad Placeholder</div>
          </div>

          <div className="pt-4">
              <h3 className="text-xl font-semibold text-center mb-4 text-gray-700">Calorie Equivalents</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 text-center">
                  {FOOD_EQUIVALENTS.map(food => {
                      const quantity = results.totalCalories / food.calories;
                      if (quantity < 0.5) return null;
                      return (
                          <div key={food.name} className="bg-gray-50 p-3 rounded-lg flex flex-col items-center justify-center">
                              <span className="text-4xl" role="img" aria-label={food.name}>{food.emoji}</span>
                              <p className="font-bold text-brand-dark mt-1">
                                  {quantity.toFixed(1)}
                              </p>
                              <p className="text-xs text-gray-500">{food.name}{quantity >= 1.5 ? 's' : ''}</p>
                          </div>
                      );
                  })}
              </div>
          </div>
          
          <div className="pt-4">
            <h3 className="text-xl font-semibold text-center mb-2 text-gray-700">Activity Comparison</h3>
             <div className="flex flex-wrap justify-center gap-2 mb-4 print:hidden">
                {OTHER_ACTIVITIES_METS.map(activity => (
                    <button
                        key={activity.name}
                        onClick={() => toggleActivityVisibility(activity.name)}
                        className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 border ${
                            hiddenActivities.has(activity.name)
                                ? 'bg-gray-100 text-gray-400 border-gray-200 hover:bg-gray-200'
                                : 'bg-blue-100 text-brand-primary border-blue-200 hover:bg-blue-200'
                        }`}
                        aria-pressed={!hiddenActivities.has(activity.name)}
                    >
                        {activity.name}
                    </button>
                ))}
            </div>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <BarChart data={comparisonData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} angle={-30} textAnchor="end" height={70} />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(240, 249, 255, 0.6)' }} />
                        <Bar dataKey="calories">
                           {comparisonData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.name === 'Your Ruck' ? '#10B981' : '#1E3A8A'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200 space-y-4 print:hidden">
            <div>
                <h4 className="text-sm font-semibold text-center text-gray-600 mb-2">Share Your Achievement</h4>
                <div className="flex justify-center gap-2">
                    <button onClick={() => handleShare('twitter')} className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm text-white bg-black rounded-md hover:opacity-90 transition-opacity"><XIcon /></button>
                    <button onClick={() => handleShare('facebook')} className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm text-white bg-[#1877F2] rounded-md hover:opacity-90 transition-opacity"> <FacebookIcon /> Facebook </button>
                    <button onClick={() => handleShare('copy')} className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors">
                        <LinkIcon /> {isCopied ? 'Copied!' : 'Copy Link'}
                    </button>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <button
                    onClick={onReset}
                    className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary"
                >
                    Reset
                </button>
                <button
                    onClick={onSaveWorkout}
                    disabled={!results}
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-secondary hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-secondary disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                    <SaveIcon /> Save Workout
                </button>
                <button
                    onClick={handlePrint}
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-primary hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary"
                >
                    <PrintIcon /> Print
                </button>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No results to show</h3>
          <p className="mt-1 text-sm text-gray-500">Please enter your details to calculate calories burned.</p>
        </div>
      )}
    </div>
  );
};
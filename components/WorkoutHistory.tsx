import React, { useState } from 'react';
import type { Workout, UnitSystem } from '../types';

const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>;
const ChevronDownIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform duration-200" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>;
const ExportIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>;


interface WorkoutHistoryItemProps {
    workout: Workout;
    onDelete: (id: string) => void;
}

const WorkoutHistoryItem: React.FC<WorkoutHistoryItemProps> = ({ workout, onDelete }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { formData, results, pace, date } = workout;
    const { unitSystem } = formData;

    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
    
    const duration = `${formData.durationHours}h ${formData.durationMinutes}m`;
    const distance = `${formData.distance} ${unitSystem === 'imperial' ? 'mi' : 'km'}`;

    return (
        <div className="bg-gray-50 rounded-lg">
            <div className="flex items-center p-4 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 flex-grow text-center sm:text-left">
                    <div>
                        <p className="text-xs text-gray-500">Date</p>
                        <p className="font-medium text-sm text-gray-800">{formattedDate}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Distance</p>
                        <p className="font-semibold text-brand-primary">{distance}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Duration</p>
                        <p className="font-semibold text-brand-primary">{duration}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Calories</p>
                        <p className="font-semibold text-brand-secondary">{results.totalCalories.toLocaleString()} kcal</p>
                    </div>
                </div>
                <div className="flex items-center ml-4">
                     <button
                        onClick={(e) => { e.stopPropagation(); onDelete(workout.id); }}
                        className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-100 transition-colors"
                        aria-label="Delete workout"
                    >
                        <TrashIcon />
                    </button>
                    <div className={`transform ${isExpanded ? 'rotate-180' : ''}`}>
                        <ChevronDownIcon />
                    </div>
                </div>
            </div>
            {isExpanded && (
                <div className="border-t border-gray-200 p-4 bg-white">
                    <h4 className="font-semibold mb-2 text-gray-700">Workout Details</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-sm">
                        <DetailItem label="Pace" value={`${pace.minutes}:${pace.seconds.toString().padStart(2, '0')} /${unitSystem === 'imperial' ? 'mi' : 'km'}`} />
                        <DetailItem label="METs" value={results.mets.toString()} />
                        <DetailItem label="Body Weight" value={`${formData.bodyWeight} ${unitSystem === 'imperial' ? 'lbs' : 'kg'}`} />
                        <DetailItem label="Ruck Weight" value={`${formData.ruckWeight} ${unitSystem === 'imperial' ? 'lbs' : 'kg'}`} />
                        <DetailItem label="Incline" value={`${formData.incline}%`} />
                        <DetailItem label="Terrain" value={formData.terrain.charAt(0).toUpperCase() + formData.terrain.slice(1)} />
                        <DetailItem label="Age" value={`${formData.age} yrs`} />
                        <DetailItem label="Sex" value={formData.sex.charAt(0).toUpperCase() + formData.sex.slice(1)} />
                    </div>
                </div>
            )}
        </div>
    );
};

const DetailItem: React.FC<{label: string; value: string}> = ({ label, value }) => (
    <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-medium text-gray-800">{value}</p>
    </div>
);


interface WorkoutHistoryProps {
    workouts: Workout[];
    onDelete: (id: string) => void;
    onClear: () => void;
}

export const WorkoutHistory: React.FC<WorkoutHistoryProps> = ({ workouts, onDelete, onClear }) => {
    
    const handleExportCSV = () => {
        if (workouts.length === 0) return;

        const headers = [
            "ID", "Date", "Unit System", "Sex", "Age", "Body Weight", "Ruck Weight",
            "Distance", "Duration (Hours)", "Duration (Minutes)", "Terrain", "Incline (%)",
            "Total Calories", "Calories Per Hour", "METs", "Pace (min/unit)", "Pace (sec/unit)"
        ];

        const rows = workouts.map(w => [
            w.id,
            new Date(w.date).toISOString(),
            w.formData.unitSystem,
            w.formData.sex,
            w.formData.age,
            w.formData.bodyWeight,
            w.formData.ruckWeight,
            w.formData.distance,
            w.formData.durationHours,
            w.formData.durationMinutes,
            w.formData.terrain,
            w.formData.incline,
            w.results.totalCalories,
            w.results.caloriesPerHour,
            w.results.mets,
            w.pace.minutes,
            w.pace.seconds
        ].join(','));

        const csvContent = [headers.join(','), ...rows].join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", "rucking_history.csv");
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };
    
    if (workouts.length === 0) {
        return (
             <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                 <h3 className="text-xl font-bold text-brand-primary">Workout History</h3>
                <p className="mt-2 text-gray-500">Your saved workouts will appear here. Save a workout using the button in the results panel!</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
                <h3 className="text-xl font-bold text-brand-primary">Workout History</h3>
                <div className="flex items-center gap-2">
                    <button 
                        onClick={handleExportCSV} 
                        className="flex items-center px-3 py-1 text-xs font-medium text-brand-primary bg-blue-100 hover:bg-blue-200 rounded-full transition-colors"
                    >
                        <ExportIcon /> Export CSV
                    </button>
                    <button 
                        onClick={onClear} 
                        className="px-3 py-1 text-xs font-medium text-red-600 bg-red-100 hover:bg-red-200 rounded-full transition-colors"
                    >
                        Clear All
                    </button>
                </div>
            </div>
            <div className="space-y-3">
                {workouts.map(workout => (
                    <WorkoutHistoryItem key={workout.id} workout={workout} onDelete={onDelete} />
                ))}
            </div>
        </div>
    );
};
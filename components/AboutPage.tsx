import React from 'react';
import { MetaTags } from './MetaTags';

export const AboutPage: React.FC = () => {
    return (
        <>
        <MetaTags 
            title="About Us" 
            description="Learn about the science behind the Rucking Calorie Calculator, our mission, and the advanced MET-based formula we use to provide accurate results for your workouts." 
        />
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg max-w-4xl mx-auto my-8 text-gray-700">
            <h1 className="text-3xl sm:text-4xl font-bold text-brand-primary mb-6">About Rucking Calorie Calculator</h1>
            <div className="space-y-4">
                <p>
                    Welcome to the Rucking Calorie Calculator, a dedicated tool designed for hikers, military personnel, and fitness enthusiasts who embrace the challenge of rucking (walking with a weighted backpack). Our mission is to provide a simple, accurate, and user-friendly way to estimate the calories you burn during your rucks.
                </p>
                <h2 className="text-2xl font-bold text-brand-dark pt-4">Our Formula</h2>
                <p>
                    We understand that rucking is more than just walking. The extra weight, varied terrain, and your personal fitness level all play a crucial role in your energy expenditure. That's why our calculator isn't based on generic walking formulas. It utilizes an advanced algorithm based on the <strong>Metabolic Equivalent of Task (MET)</strong>, specifically adjusted for key rucking variables:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                    <li><strong>Body Weight:</strong> Your personal weight, which sets the baseline for calorie burn.</li>
                    <li><strong>Ruck Weight:</strong> The additional load you're carrying significantly increases the workout's intensity.</li>
                    <li><strong>Distance and Duration:</strong> We calculate your pace to better estimate the intensity.</li>
                    <li><strong>Terrain:</strong> Rucking on flat pavement is different from climbing a mountain. Our terrain multiplier accounts for this added difficulty.</li>
                </ul>
                
                <div className="my-8 text-center">
                    <div className='ad-slot' style={{ minHeight: '100px', width: '100%', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', border: '1px dashed #ccc' }}>Responsive Ad Placeholder</div>
                </div>

                <h2 className="text-2xl font-bold text-brand-dark pt-4">Who We Are</h2>
                <p>
                    We are a team of fitness enthusiasts and developers passionate about creating tools that help people achieve their health and wellness goals. We saw a need for a specialized rucking calculator and decided to build one that is both comprehensive and easy to use.
                </p>
                <p>
                    Thank you for using our tool. We hope it helps you track your progress and stay motivated on your fitness journey!
                </p>
            </div>
        </div>
        </>
    );
};
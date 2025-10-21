import React from 'react';

export const Article: React.FC = () => {
    return (
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg max-w-4xl mx-auto my-8 text-gray-700 leading-relaxed">
            <article className="prose lg:prose-xl max-w-none">
                <h2 className="text-3xl sm:text-4xl font-bold text-brand-primary mb-6">How Many Calories Do You Burn Rucking?</h2>
                <p>
                    Rucking is a powerful workout that builds both strength and endurance. After carrying a weighted pack over several miles, you know you've put in serious work. The big question is, "How many calories did I burn?" A standard walk this was not, so a standard calorie count just won’t do.
                </p>
                <p>
                    You need a tool that understands the unique demands of rucking. The calculator on this page is built for that purpose. Put your numbers in to see an accurate estimate of your effort. Then, read on to see the science behind it all.
                </p>

                <div className="not-prose my-8 text-center">
                    <div className='ad-slot' style={{ minHeight: '100px', width: '100%', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', border: '1px dashed #ccc' }}>Responsive Ad Placeholder</div>
                </div>

                <h3 className="text-2xl font-bold text-brand-dark pt-4">Why Rucking Needs a Different Calculator</h3>
                <p>
                    A regular walking or running calculator can't give you the right numbers for a ruck. It misses the most important part: the weight in your backpack. That extra load makes your body work much harder. These other calculators also miss key details like the type of ground you covered and the hills you climbed.
                </p>

                <h3 className="text-2xl font-bold text-brand-dark pt-4">The Key Factors in Your Ruck</h3>
                <p>
                    Our calculator gives you a precise number because it looks at all the details that matter. Here are the factors it uses to create an accurate result:
                </p>
                <ul>
                    <li><strong>Your Body Metrics:</strong> Your age, sex, and body weight create the baseline for how your body uses energy.</li>
                    <li><strong>Ruck Weight:</strong> The added weight in your pack is a major factor that increases your calorie burn.</li>
                    <li><strong>Pace and Distance:</strong> Your distance and time show us how fast you were moving, which is a good sign of intensity.</li>
                    <li><strong>Terrain:</strong> A paved path is much different from a sandy trail. The calculator adjusts for the surface you are on.</li>
                    <li><strong>Incline:</strong> Hills add a lot of work to your ruck. The tool includes the average incline to account for this effort.</li>
                </ul>

                <h3 className="text-2xl font-bold text-brand-dark pt-4">How to Use the Calculator</h3>
                
                <h4 className="text-xl font-semibold text-brand-dark">1. Enter Your Ruck Details</h4>
                <p>Start by filling out the form with your information.</p>
                <ul>
                    <li><strong>Unit System:</strong> Pick between Imperial (lbs, miles) and Metric (kg, km).</li>
                    <li><strong>About You:</strong> Add your sex, age, and body weight.</li>
                    <li><strong>Your Ruck:</strong> Put in the weight of your pack, the distance you traveled, and the time it took.</li>
                    <li><strong>Environment:</strong> Select the main type of terrain and the average incline of your route.</li>
                </ul>

                <h4 className="text-xl font-semibold text-brand-dark pt-2">2. See Your Results</h4>
                <p>The numbers appear on the right side of the screen. This is what you'll see:</p>
                <ul>
                    <li><strong>Total Calories Burned:</strong> This is the main result for your workout.</li>
                    <li><strong>Key Metrics:</strong> You get extra details like calories per hour, MET value, oxygen consumption, and your average pace.</li>
                    <li><strong>Activity Comparison:</strong> The chart shows how your ruck compares to other exercises.</li>
                    <li><strong>Calorie Equivalents:</strong> This section gives you a fun look at your effort in terms of common foods.</li>
                </ul>

                <h4 className="text-xl font-semibold text-brand-dark pt-2">3. Track Your Workouts</h4>
                <p>You can use this tool as your personal rucking log.</p>
                <ul>
                    <li><strong>Save Workout:</strong> Select the "Save Workout" button to add the session to your history.</li>
                    <li><strong>View History:</strong> Scroll down to the "Workout History" area to find your saved rucks.</li>
                    <li><strong>Manage Data:</strong> Select any workout to see all the details. You can remove single entries or clear the entire log.</li>
                    <li><strong>Export CSV:</strong> You can download your complete workout history as a file for your own records.</li>
                </ul>

                <h3 className="text-2xl font-bold text-brand-dark pt-4">Common Questions</h3>

                <h4 className="text-xl font-semibold text-brand-dark">Is rucking or running better for weight loss?</h4>
                <p>Both are great choices for losing weight. Rucking has less impact on your joints than running. It also helps build muscle while burning fat, which can help your metabolism. The best exercise is the one you will do consistently. <a href="https://www.theruckingspot.com/rucking-calories-burned/" target="_blank" rel="noopener noreferrer" className="text-brand-secondary hover:underline">This guide offers more detail</a> on the benefits of rucking.</p>
                
                <h4 className="text-xl font-semibold text-brand-dark pt-2">What is a good rucking weight to start with?</h4>
                <p>A good starting point for beginners is about 10% of your body weight. You can add more weight as you feel stronger. The idea is to challenge your body enough to see progress without getting hurt. Pay attention to how you feel.</p>
                
                <h4 className="text-xl font-semibold text-brand-dark pt-2">How accurate is this calorie calculator?</h4>
                <p>This tool uses a formula based on the Metabolic Equivalent of Task (MET), adjusted for rucking. It provides a solid estimate for most people. An estimate is still an estimate, though. Your personal metabolism and fitness level can cause small variations in the actual number of calories burned.</p>

                <h4 className="text-xl font-semibold text-brand-dark pt-2">Can rucking build muscle?</h4>
                <p>Yes. Rucking is a form of resistance training. It helps strengthen your legs, hips, back, and shoulders. The constant load makes these muscles work harder than they do on a regular walk, which leads to more strength.</p>

                <h3 className="text-2xl font-bold text-brand-dark pt-4">Get a Clear Picture of Your Workout</h3>
                <p>Now you have a tool to see exactly what you get out of every ruck. Use it to plan your workouts, see how far you've come, and stay motivated. Each step you take with a pack on your back makes you stronger and healthier.</p>
            </article>
        </div>
    );
};
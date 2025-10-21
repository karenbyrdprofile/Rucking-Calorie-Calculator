import React from 'react';
import { MetaTags } from './MetaTags';

export const PrivacyPolicyPage: React.FC = () => {
    return (
        <>
        <MetaTags 
            title="Privacy Policy" 
            description="Read the privacy policy for the Rucking Calorie Calculator. Understand how we handle your data and our commitment to protecting your privacy while you use our tool." 
        />
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg max-w-4xl mx-auto my-8 text-gray-700">
            <h1 className="text-3xl sm:text-4xl font-bold text-brand-primary mb-6">Privacy Policy</h1>
            <div className="space-y-4">
                <p><strong>Last updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

                <p>
                    Rucking Calorie Calculator ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website.
                </p>

                <h2 className="text-2xl font-bold text-brand-dark pt-4">Information We Collect</h2>
                <p>
                    We do not collect or store any personal information you enter into the calculator. All calculations are performed in real-time within your browser, and the data (such as your weight, ruck weight, distance, etc.) is not sent to our servers or any third party. Your data is discarded once you leave or refresh the page.
                </p>

                <div className="my-8 text-center">
                    <div className='ad-slot' style={{ minHeight: '100px', width: '100%', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', border: '1px dashed #ccc' }}>Responsive Ad Placeholder</div>
                </div>
                
                <h2 className="text-2xl font-bold text-brand-dark pt-4">Cookies and Tracking Technologies</h2>
                <p>
                    We may use cookies and similar tracking technologies to analyze website traffic and user activity to improve our service. This data is aggregated and anonymous and does not identify you personally. You can choose to disable cookies through your browser settings.
                </p>

                <h2 className="text-2xl font-bold text-brand-dark pt-4">Third-Party Services</h2>
                <p>
                    This website may contain links to third-party websites or services that are not owned or controlled by us. We are not responsible for the privacy practices of these other websites or services.
                </p>

                <h2 className="text-2xl font-bold text-brand-dark pt-4">Changes to This Privacy Policy</h2>
                <p>
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
                </p>

                <h2 className="text-2xl font-bold text-brand-dark pt-4">Contact Us</h2>
                <p>
                    If you have any questions about this Privacy Policy, please contact us at <a href="mailto:engineersamsulalam@gmail.com" className="text-brand-secondary hover:underline font-semibold">engineersamsulalam@gmail.com</a>.
                </p>
            </div>
        </div>
        </>
    );
};
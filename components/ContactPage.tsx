import React from 'react';
import { MetaTags } from './MetaTags';

export const ContactPage: React.FC = () => {
    return (
        <>
        <MetaTags 
            title="Contact Us" 
            description="Get in touch with the Rucking Calorie Calculator team. We welcome your feedback, suggestions, and questions to help us improve our tool for the rucking community." 
        />
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg max-w-4xl mx-auto my-8 text-gray-700">
            <h1 className="text-3xl sm:text-4xl font-bold text-brand-primary mb-6">Contact Us</h1>
            <div className="space-y-4">
                <p>
                    We'd love to hear from you! Whether you have a question about the calculator, a suggestion for a new feature, or just want to share your rucking story, please feel free to reach out.
                </p>
                
                <h2 className="text-2xl font-bold text-brand-dark pt-4">Feedback & Suggestions</h2>
                <p>
                    Your feedback is invaluable to us. If you've encountered a bug, have an idea for an improvement, or want to see a new feature, please let us know. We are constantly working to make this tool better for the rucking community.
                </p>

                <div className="my-8 text-center">
                    <div className='ad-slot' style={{ minHeight: '100px', width: '100%', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', border: '1px dashed #ccc' }}>Responsive Ad Placeholder</div>
                </div>

                <h2 className="text-2xl font-bold text-brand-dark pt-4">Get in Touch</h2>
                <p>
                    For all inquiries, please email us at:
                </p>
                <p>
                    <a href="mailto:engineersamsulalam@gmail.com" className="text-brand-secondary hover:underline font-semibold">engineersamsulalam@gmail.com</a>
                </p>
                <p>
                    We do our best to respond to all messages within 48 business hours.
                </p>
                <p className="pt-4 font-semibold">Happy Rucking!</p>
            </div>
        </div>
        </>
    );
};
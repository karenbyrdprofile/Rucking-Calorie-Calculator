import React from 'react';
import { Link } from 'react-router-dom';

const LogoIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#1E3A8A"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M8.56019 19.0001L12.0162 13.3321L10.5092 12.2221L7.16419 15.3331L5.98719 14.2221L9.93619 8.66713C10.1532 8.33313 10.5892 8.22213 10.9232 8.43913L15.4892 11.2221L18.0122 6.99913L19.1892 7.77713L16.0772 13.1111L17.5842 14.2221L20.8352 11.3331L22.0122 12.2221L17.1642 19.0001H8.56019Z" fill="white"/>
    </svg>
);


export const Footer: React.FC = () => {
    const LinkButton: React.FC<{ to: string, children: React.ReactNode }> = ({ to, children }) => (
        <li>
            <Link to={to} className="text-gray-400 hover:text-brand-secondary transition-colors duration-200">
                {children}
            </Link>
        </li>
    );

    return (
        <footer className="bg-brand-dark text-white">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Info */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                           <LogoIcon className="h-8 w-8" />
                            <span className="text-2xl font-bold">Rucking Calorie Calculator</span>
                        </div>
                        <p className="text-gray-400 text-sm">
                            Your go-to tool for accurately estimating calorie expenditure during rucking and hiking.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="text-sm font-semibold tracking-wider uppercase text-gray-300">Links</h3>
                        <ul className="mt-4 space-y-2">
                            <LinkButton to="/">Calculator</LinkButton>
                            <LinkButton to="/about">About Us</LinkButton>
                        </ul>
                    </div>
                    
                    {/* Legal */}
                    <div>
                        <h3 className="text-sm font-semibold tracking-wider uppercase text-gray-300">Legal</h3>
                        <ul className="mt-4 space-y-2">
                            <LinkButton to="/privacy">Privacy Policy</LinkButton>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-sm font-semibold tracking-wider uppercase text-gray-300">Contact</h3>
                         <ul className="mt-4 space-y-2">
                            <LinkButton to="/contact">Contact Us</LinkButton>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
                    <p>Calculations are based on the Metabolic Equivalent of Task (MET) formula, adjusted for rucking variables.</p>
                    <p className="mt-2">&copy; {new Date().getFullYear()} Rucking Calorie Calculator. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LogoIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#1E3A8A"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M8.56019 19.0001L12.0162 13.3321L10.5092 12.2221L7.16419 15.3331L5.98719 14.2221L9.93619 8.66713C10.1532 8.33313 10.5892 8.22213 10.9232 8.43913L15.4892 11.2221L18.0122 6.99913L19.1892 7.77713L16.0772 13.1111L17.5842 14.2221L20.8352 11.3331L22.0122 12.2221L17.1642 19.0001H8.56019Z" fill="white"/>
    </svg>
);

export const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const NavLink: React.FC<{ to: string; children: React.ReactNode; className?: string }> = ({ to, children, className }) => (
        <Link to={to} onClick={() => setIsMenuOpen(false)} className={`text-gray-600 hover:text-brand-primary transition-colors duration-200 ${className}`}>
            {children}
        </Link>
    );

    return (
        <header className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo and Brand */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="flex items-center space-x-2">
                            <LogoIcon className="h-8 w-8" />
                            <span className="text-base sm:text-xl font-bold text-brand-dark">Rucking Calorie Calculator</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <NavLink to="/">Calculator</NavLink>
                        <NavLink to="/about">About</NavLink>
                        <NavLink to="/contact">Contact</NavLink>
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-brand-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <NavLink to="/" className="block px-3 py-2 rounded-md text-base font-medium">Calculator</NavLink>
                        <NavLink to="/about" className="block px-3 py-2 rounded-md text-base font-medium">About</NavLink>
                        <NavLink to="/contact" className="block px-3 py-2 rounded-md text-base font-medium">Contact</NavLink>
                    </div>
                </div>
            )}
        </header>
    );
};
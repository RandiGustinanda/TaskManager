import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Brand */}
          <a href="#" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              ProjectManager
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <a href="#fitur" className="px-3 py-2 text-gray-700 hover:text-indigo-600 rounded-md text-sm font-medium transition">Fitur</a>
            <a href="#panduan" className="px-3 py-2 text-gray-700 hover:text-indigo-600 rounded-md text-sm font-medium transition">Panduan</a>
            
            <div className="relative group">
              <button className="px-3 py-2 text-gray-700 hover:text-indigo-600 rounded-md text-sm font-medium transition flex items-center">
                Layanan <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out z-10">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50">Konsultasi</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50">Training</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50">Implementasi</a>
              </div>
            </div>
            
            <a href="#kontak" className="px-3 py-2 text-gray-700 hover:text-indigo-600 rounded-md text-sm font-medium transition">Kontak</a>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="/login" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition">
              Login
            </a>
            <a 
              href="/register" 
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5"
            >
              Daftar Sekarang
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-b-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#fitur" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
              Fitur
            </a>
            <a href="#panduan" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
              Panduan
            </a>
            <a href="#layanan" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
              Layanan
            </a>
            <a href="#kontak" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
              Kontak
            </a>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-3 space-x-3">
                <a href="/login" className="text-indigo-600 hover:text-indigo-800 text-base font-medium">Login</a>
                <a 
                  href="/register" 
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg text-base font-medium shadow-md hover:shadow-lg"
                >
                  Daftar
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
// LandingPage.jsx
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Header from '@/Components/LandingPage/Header';
import Hero from '@/Components/LandingPage/Hero';
import Fitur from '@/Components/LandingPage/Fitur';
import Cara from '@/Components/LandingPage/Cara';
import Kontak from '@/Components/LandingPage/kontak';

const LandingPage = () => {
  useEffect(() => {
    AOS.init({ once: true, duration: 1000 });
  }, []);

  return (
    <div>
      {/* Header */}
        <Header/>
      {/* Hero Section */}
        <Hero/>
      {/* Fitur */}
        <Fitur/>
      {/* Panduan */}
        <Cara/>
      {/* Kontak */}
        <Kontak/>
      {/* Footer */}
      <footer className="bg-gray-100 py-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} ProjectManager. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;

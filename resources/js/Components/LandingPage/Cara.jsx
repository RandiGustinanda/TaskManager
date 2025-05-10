import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Cara = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardRef = useRef(null);
  const listItemsRef = useRef([]);
  const [activeStep, setActiveStep] = useState(0);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%"
      }
    });

    mainTl.fromTo(
      sectionRef.current.querySelector('.bg-gradient-reveal'),
      { opacity: 0, scale: 1.1 },
      { opacity: 1, scale: 1, duration: 1, ease: "power3.out" },
      0
    );
    
    mainTl.fromTo(
      titleRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "back.out(1.2)" },
      0.3
    );
    
    mainTl.fromTo(
      cardRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      0.5
    );

    mainTl.fromTo(
      listItemsRef.current,
      { x: -30, opacity: 0 },
      { 
        x: 0, 
        opacity: 1, 
        duration: 0.6, 
        stagger: 0.12,
        ease: "power2.out"
      },
      0.8
    );
   
    gsap.to(cardRef.current, {
      y: 8,
      duration: 2,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true
    });
    
    const stepInterval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % 5);
    }, 3000);
    
    return () => {
      clearInterval(stepInterval);
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !listItemsRef.current.includes(el)) {
      listItemsRef.current.push(el);
    }
  };
  
  const steps = [
    { text: "Daftar dan buat tim proyek baru", icon: "✨" },
    { text: "Tambahkan anggota tim", icon: "👥" },
    { text: "Susun dan distribusikan tugas", icon: "📋" },
    { text: "Pantau progres proyek secara visual", icon: "📊" },
    { text: "Review hasil dan export laporan", icon: "📑" }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-16 relative overflow-hidden"
      id="panduan"
    >
      <div className="absolute inset-0 overflow-hidden bg-gradient-reveal">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50"></div>
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-r from-blue-200/30 to-indigo-300/30 blur-2xl"></div>
        <div className="absolute -bottom-40 -left-10 w-56 h-56 rounded-full bg-gradient-to-r from-purple-200/30 to-pink-300/30 blur-2xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <h2 
          ref={titleRef}
          className="text-3xl md:text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600"
        >
          Cara Menggunakan
        </h2>
        <div 
          ref={cardRef}
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl shadow-indigo-500/10 p-6 border border-indigo-50"
        >
          <div className="h-1.5 bg-gray-100 rounded-full mb-6 relative">
            <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 rounded-full transition-all duration-500 ease-out" style={{ width: `${(activeStep + 1) * 20}%` }}></div>
          </div>
          <ol className="space-y-4">
            {steps.map((step, index) => (
              <li 
                key={index}
                ref={addToRefs}
                className={`transition-all duration-300 ${activeStep === index ? 'scale-102' : 'scale-100'}`}
              >
                <div className={`flex items-center gap-4 p-3 rounded-lg transition-all duration-300 ${
                  activeStep === index 
                    ? 'bg-gradient-to-r from-indigo-50 to-blue-50 shadow-sm shadow-indigo-100/50' 
                    : 'bg-transparent'
                }`}>
                  <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold transition-all duration-300 ${
                    activeStep === index
                      ? 'bg-gradient-to-br from-indigo-500 to-blue-600 text-white shadow-md shadow-indigo-300/40'
                      : 'bg-indigo-100 text-indigo-600'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <span className="text-xl mr-2">{step.icon}</span>
                      <h3 className={`text-base md:text-lg font-medium transition-all duration-300 ${
                        activeStep === index ? 'text-indigo-700' : 'text-gray-800'
                      }`}>{step.text}</h3>
                    </div>
                    <div className="mt-2 h-0.5 rounded-full bg-gray-100 relative overflow-hidden">
                      <div 
                        className={`absolute top-0 left-0 h-full rounded-full transition-all duration-700 ease-out bg-gradient-to-r from-indigo-400 to-blue-500 ${
                          activeStep === index ? 'w-full' : 'w-0'
                        }`}
                      ></div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-6 flex justify-center space-x-2">
            {steps.map((_, index) => (
              <button 
                key={index}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  activeStep === index 
                    ? 'bg-indigo-600 w-6' 
                    : 'bg-indigo-200 hover:bg-indigo-300'
                }`}
                onClick={() => setActiveStep(index)}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cara;
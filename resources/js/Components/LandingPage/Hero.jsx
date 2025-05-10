import React, { useEffect, useRef, useState } from 'react';

const Hero = () => {
  const heroRef = useRef(null);
  const svgRef = useRef(null);
  const textRef = useRef(null);
  const ctaRef = useRef(null);
  const statsRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [statCounts, setStatCounts] = useState({ users: 0, projects: 0, tasks: 0 });

  const dashboard = useRef(null);
  const chart = useRef(null);
  const taskCard1 = useRef(null);
  const taskCard2 = useRef(null);
  const taskCard3 = useRef(null);
  const notifBadge = useRef(null);
  const progressCircle = useRef(null);
  const avatars = useRef(null);
  const particles = useRef([]);

  const createParticles = () => {
    const colors = ['#818CF8', '#6366F1', '#4F46E5', '#C7D2FE', '#E0E7FF'];
    const shapes = ['circle', 'square', 'triangle'];
    
    return Array.from({ length: 20 }, (_, i) => {
      const size = Math.random() * 6 + 3;
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = Math.random() * 15 + 15;
      const delay = Math.random() * 8;
      
      return { id: i, size, shape, color, x, y, duration, delay };
    });
  };

  const animateCounters = () => {
    const finalStats = { users: 10000, projects: 25000, tasks: 125000 };
    const duration = 2000; // ms
    const steps = 50;
    const interval = duration / steps;
    
    let currentStep = 0;
    
    const timer = setInterval(() => {
      currentStep++;
      
      if (currentStep >= steps) {
        setStatCounts(finalStats);
        clearInterval(timer);
        return;
      }
      
      const progress = currentStep / steps;
      
      setStatCounts({
        users: Math.floor(finalStats.users * progress),
        projects: Math.floor(finalStats.projects * progress),
        tasks: Math.floor(finalStats.tasks * progress)
      });
    }, interval);
  };

  useEffect(() => {
    const animateElements = () => {
      const textElements = textRef.current.children;
      for (let i = 0; i < textElements.length; i++) {
        textElements[i].style.opacity = '0';
        textElements[i].style.transform = 'translateY(20px)';
        setTimeout(() => {
          textElements[i].style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          textElements[i].style.opacity = '1';
          textElements[i].style.transform = 'translateY(0)';
        }, 200 * i);
      }

      const ctaElements = ctaRef.current.children;
      for (let i = 0; i < ctaElements.length; i++) {
        ctaElements[i].style.opacity = '0';
        ctaElements[i].style.transform = 'translateY(20px)';
        setTimeout(() => {
          ctaElements[i].style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          ctaElements[i].style.opacity = '1';
          ctaElements[i].style.transform = 'translateY(0)';
        }, 600 + 150 * i);
      }
      
      const statsElements = statsRef.current.children;
      for (let i = 0; i < statsElements.length; i++) {
        statsElements[i].style.opacity = '0';
        statsElements[i].style.transform = 'translateY(20px)';
        setTimeout(() => {
          statsElements[i].style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          statsElements[i].style.opacity = '1';
          statsElements[i].style.transform = 'translateY(0)';
        }, 800 + 150 * i);
      }

      if (dashboard.current) {
        dashboard.current.style.opacity = '0';
        dashboard.current.style.transform = 'translateY(20px)';
        setTimeout(() => {
          dashboard.current.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
          dashboard.current.style.opacity = '1';
          dashboard.current.style.transform = 'translateY(0)';
        }, 300);
      }
      
      if (taskCard1.current) {
        taskCard1.current.style.opacity = '0';
        taskCard1.current.style.transform = 'translateX(-20px)';
        setTimeout(() => {
          taskCard1.current.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          taskCard1.current.style.opacity = '1';
          taskCard1.current.style.transform = 'translateX(0)';
        }, 600);
      }
      
      if (taskCard2.current) {
        taskCard2.current.style.opacity = '0';
        taskCard2.current.style.transform = 'translateX(-20px)';
        setTimeout(() => {
          taskCard2.current.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          taskCard2.current.style.opacity = '1';
          taskCard2.current.style.transform = 'translateX(0)';
        }, 800);
      }
      
      if (taskCard3.current) {
        taskCard3.current.style.opacity = '0';
        taskCard3.current.style.transform = 'translateX(-20px)';
        setTimeout(() => {
          taskCard3.current.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          taskCard3.current.style.opacity = '1';
          taskCard3.current.style.transform = 'translateX(0)';
        }, 1000);
      }

      if (notifBadge.current) {
        notifBadge.current.style.opacity = '0';
        notifBadge.current.style.transform = 'scale(0)';
        setTimeout(() => {
          notifBadge.current.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          notifBadge.current.style.opacity = '1';
          notifBadge.current.style.transform = 'scale(1)';
        }, 1000);
      }

      if (chart.current) {
        const chartPath = chart.current;
        const length = chartPath.getTotalLength();
        
        chartPath.style.strokeDasharray = length;
        chartPath.style.strokeDashoffset = length;
        
        setTimeout(() => {
          chartPath.style.transition = 'stroke-dashoffset 1.5s ease-in-out';
          chartPath.style.strokeDashoffset = '0';
        }, 1200);
      }
      
      if (progressCircle.current) {
        const circle = progressCircle.current;
        const radius = circle.r.baseVal.value;
        const circumference = radius * 2 * Math.PI;
        
        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = circumference;
        
        setTimeout(() => {
          circle.style.transition = 'stroke-dashoffset 1s ease-in-out';
          const offset = circumference - (75 / 100) * circumference;
          circle.style.strokeDashoffset = offset;
        }, 1500);
      }
      
      if (avatars.current) {
        avatars.current.style.opacity = '0';
        setTimeout(() => {
          avatars.current.style.transition = 'opacity 0.8s ease-in-out';
          avatars.current.style.opacity = '1';
        }, 1700);
      }
      
      setTimeout(() => {
        animateCounters();
      }, 1000);
    };

    setTimeout(() => {
      setIsLoaded(true);
      animateElements();
    }, 100);
  }, []);
  
  return (
    <section ref={heroRef} className="relative py-16 lg:py-24 overflow-hidden" id="hero">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 -z-10">
        {isLoaded && (
          <div className="absolute inset-0 overflow-hidden">
            {createParticles().map((particle) => (
              <div
                key={particle.id}
                ref={el => particles.current[particle.id] = el}
                className="absolute"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  background: particle.color,
                  borderRadius: particle.shape === 'circle' ? '50%' : particle.shape === 'triangle' ? '0' : '2px',
                  opacity: '0.5',
                  animation: `float ${particle.duration}s ease-in-out ${particle.delay}s infinite alternate`,
                }}
              />
            ))}
          </div>
        )}
      </div>
      
      <div className="absolute top-20 left-10 w-64 h-64 bg-purple-200 rounded-full opacity-20 blur-3xl animate-blob"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-200 rounded-full opacity-20 blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-blue-200 rounded-full opacity-20 blur-3xl animate-blob animation-delay-4000"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div ref={textRef} className="space-y-6 z-10">
            <div className="inline-flex items-center px-3 py-1 bg-indigo-100 rounded-full">
              <span className="w-2 h-2 rounded-full bg-indigo-500 mr-2"></span>
              <span className="text-indigo-600 font-medium text-sm">Platform Manajemen Proyek</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Kelola Proyek Anda{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-indigo-600">
                  Lebih Efisien
                </span>
                <span className="absolute -bottom-2 left-0 right-0 h-3 bg-indigo-200 -z-10 transform skew-x-12"></span>
              </span>
            </h1>
            
            <p className="text-gray-600 text-lg md:text-xl max-w-xl">
              ProjectManager membantu tim Anda mengelola tugas, deadline, dan kolaborasi dalam satu platform terintegrasi yang intuitif.
            </p>
            
            <div ref={ctaRef} className="flex flex-wrap gap-4 pt-2">
              <a 
                href="/register" 
                className="bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-indigo-200/50 transform hover:-translate-y-1 transition-transform"
              >
                <div className="flex items-center">
                  <span>Mulai Sekarang</span>
                  <span className="ml-2 bg-white/20 rounded-full w-6 h-6 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </div>
              </a>
              
              <a 
                href="#fitur" 
                className="group flex items-center justify-center px-8 py-4 bg-white text-indigo-600 font-semibold rounded-lg border border-indigo-200 hover:border-indigo-300 shadow-sm hover:shadow transform hover:-translate-y-1 transition-transform"
              >
                <span>Lihat Fitur</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
              
              <a 
                href="#demo" 
                className="group flex items-center justify-center px-6 py-3 bg-indigo-50 text-indigo-600 font-medium rounded-lg border border-indigo-100 hover:bg-indigo-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                <span>Tonton Demo</span>
              </a>
            </div>
            <div ref={statsRef} className="flex flex-wrap gap-6 mt-6 pt-6 border-t border-gray-100">
              <div className="text-center">
                <div className="flex items-center">
                  <div className="p-2 bg-indigo-50 rounded-lg mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <span className="block text-2xl font-bold text-gray-800">
                      {statCounts.users.toLocaleString()}+
                    </span>
                    <span className="block text-gray-500 text-sm">Pengguna Aktif</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-50 rounded-lg mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <span className="block text-2xl font-bold text-gray-800">
                      {statCounts.projects.toLocaleString()}+
                    </span>
                    <span className="block text-gray-500 text-sm">Proyek Dibuat</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-50 rounded-lg mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <span className="block text-2xl font-bold text-gray-800">
                      {statCounts.tasks.toLocaleString()}+
                    </span>
                    <span className="block text-gray-500 text-sm">Tugas Selesai</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div ref={svgRef} className="relative mt-10 lg:mt-0 z-10">
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-16 -left-12 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-2xl"></div>
            <div className="absolute -top-6 -left-6 transform -rotate-12 bg-white p-2 rounded-lg shadow-lg animate-float">
              <div className="flex items-center gap-2 text-xs font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Tugas terselesaikan</span>
              </div>
            </div>
            
            <div className="absolute top-2/3 -right-6 transform rotate-12 bg-white p-2 rounded-lg shadow-lg animate-float animation-delay-2000">
              <div className="flex items-center gap-2 text-xs font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
                <span>Produktivitas naik 35%</span>
              </div>
            </div>
            
            <svg viewBox="0 0 500 350" xmlns="http://www.w3.org/2000/svg" className="relative w-full max-w-lg mx-auto lg:ml-auto drop-shadow-xl">
              <defs>
                <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#F9FAFB" />
                </linearGradient>
                <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.15"/>
                </filter>
              </defs>
        
              <rect ref={dashboard} x="50" y="30" width="400" height="280" rx="10" fill="url(#cardGradient)" stroke="#E5E7EB" strokeWidth="2" filter="url(#shadow)" />
              
              <rect x="50" y="30" width="400" height="50" rx="10" fill="#F9FAFB" />
              <circle cx="80" cy="55" r="12" fill="#4F46E5" />
              <rect x="110" y="48" width="120" height="14" rx="2" fill="#6366F1" fillOpacity="0.3" />
              <circle cx="420" cy="55" r="15" fill="#F3F4F6" />
              
              <g ref={notifBadge}>
                <circle cx="420" cy="55" r="8" fill="#EF4444" />
                <text x="420" y="58" fontSize="10" fill="white" fontFamily="sans-serif" textAnchor="middle">3</text>
              </g>
  
              <rect x="50" y="80" width="80" height="230" fill="#F9FAFB" />
              <rect x="65" y="100" width="50" height="8" rx="2" fill="#D1D5DB" />
              <rect x="65" y="120" width="50" height="8" rx="2" fill="#D1D5DB" />
              <rect x="65" y="140" width="50" height="8" rx="2" fill="#D1D5DB" />
              <rect x="65" y="160" width="50" height="8" rx="2" fill="#D1D5DB" />
              <rect x="65" y="180" width="50" height="8" rx="2" fill="#D1D5DB" />
              <rect x="65" y="245" width="30" height="30" rx="15" fill="#E0E7FF" />
              <circle cx="80" cy="260" r="8" fill="#6366F1" />
              
              <rect x="150" y="100" width="280" height="40" rx="5" fill="#F3F4F6" />
              <rect x="160" y="115" width="140" height="10" rx="2" fill="#9CA3AF" />
              <rect x="395" y="110" width="20" height="20" rx="3" fill="#E0E7FF" />
              <path d="M400 115 L410 125 M410 115 L400 125" stroke="#6366F1" strokeWidth="2" />
              
              <g ref={taskCard1}>
                <rect x="150" y="150" width="135" height="90" rx="5" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1" />
                <rect x="160" y="165" width="80" height="10" rx="2" fill="#111827" />
                <rect x="160" y="185" width="115" height="6" rx="1" fill="#9CA3AF" />
                <rect x="160" y="200" width="115" height="6" rx="1" fill="#9CA3AF" />
                <rect x="160" y="220" width="60" height="8" rx="4" fill="#E0E7FF" />
                <text x="175" y="227" fontSize="6" fill="#4F46E5" fontFamily="sans-serif">IN PROGRESS</text>
              </g>
              
              <g ref={taskCard2}>
                <rect x="295" y="150" width="135" height="90" rx="5" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1" />
                <rect x="305" y="165" width="80" height="10" rx="2" fill="#111827" />
                <rect x="305" y="185" width="115" height="6" rx="1" fill="#9CA3AF" />
                <rect x="305" y="200" width="115" height="6" rx="1" fill="#9CA3AF" />
                <rect x="305" y="220" width="60" height="8" rx="4" fill="#DCFCE7" />
                <text x="325" y="227" fontSize="6" fill="#16A34A" fontFamily="sans-serif">COMPLETED</text>
              </g>
              
              <g ref={taskCard3}>
                <rect x="150" y="250" width="135" height="50" rx="5" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1" />
                <rect x="160" y="265" width="60" height="8" rx="2" fill="#111827" />
                <rect x="160" y="280" width="80" height="6" rx="1" fill="#9CA3AF" />
                <rect x="250" y="260" width="25" height="25" rx="2" fill="#FEF3C7" />
                <text x="262" y="277" fontSize="14" fontWeight="bold" fill="#D97706" fontFamily="sans-serif" textAnchor="middle">!</text>
              </g>
   
              <rect x="295" y="250" width="135" height="50" rx="5" fill="#F9FAFB" />
              <path ref={chart} d="M310 285 Q320 270, 330 280 T350 260 T370 275 T390 250 T410 270" fill="none" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" />

              <g ref={avatars} transform="translate(330, 305)">
                <circle cx="0" cy="0" r="10" fill="#E0E7FF" stroke="#FFFFFF" strokeWidth="2" />
                <circle cx="15" cy="0" r="10" fill="#C7D2FE" stroke="#FFFFFF" strokeWidth="2" />
                <circle cx="30" cy="0" r="10" fill="#A5B4FC" stroke="#FFFFFF" strokeWidth="2" />
                <circle cx="45" cy="0" r="10" fill="#818CF8" stroke="#FFFFFF" strokeWidth="2" />
                <rect x="55" y="-10" width="20" height="20" rx="10" fill="#4F46E5" stroke="#FFFFFF" strokeWidth="2" />
                <text x="65" y="-2" fontSize="10" fill="white" fontFamily="sans-serif" textAnchor="middle" dominantBaseline="middle">+5</text>
              </g>

              <g transform="translate(380, 90)">
                <rect width="90" height="50" rx="5" fill="white" stroke="#E5E7EB" strokeWidth="1" />
                <text x="10" y="20" fontSize="8" fill="#4B5563" fontFamily="sans-serif">Project Progress</text>
                <text x="10" y="38" fontSize="14" fontWeight="bold" fill="#111827" fontFamily="sans-serif">75%</text>

                <circle cx="70" cy="25" r="15" stroke="#E5E7EB" strokeWidth="3" fill="none" />
                <circle ref={progressCircle} cx="70" cy="25" r="15" stroke="#6366F1" strokeWidth="3" fill="none" strokeLinecap="round" transform="rotate(-90 70 25)" />
              </g>

              <circle cx="140" cy="260" r="4" fill="#10B981">
                <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
              </circle>

              <circle cx="310" cy="285" r="3" fill="#4F46E5" />
              <circle cx="330" cy="280" r="3" fill="#4F46E5" />
              <circle cx="350" cy="260" r="3" fill="#4F46E5" />
              <circle cx="370" cy="275" r="3" fill="#4F46E5" />
              <circle cx="390" cy="250" r="3" fill="#4F46E5" />
              <circle cx="410" cy="270" r="3" fill="#4F46E5" />
            </svg>
            
            <div className="absolute bottom-6 right-8 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg border border-gray-100 flex items-center animate-pulse">
              <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
              <span className="text-xs font-medium text-gray-700">3 anggota tim aktif</span>
            </div>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-gray-100">
          <p className="text-center text-gray-500 text-sm mb-6">Dipercaya oleh perusahaan terkemuka</p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
            {["Company A", "Company B", "Company C", "Company D", "Company E"].map((company, index) => (
              <div key={index} className="flex items-center justify-center h-8 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
                <div className="bg-gray-800 h-5 w-24 rounded-md flex items-center justify-center">
                  <span className="text-white text-xs font-medium">{company}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="hidden lg:block absolute bottom-10 left-10 transform -rotate-3 bg-amber-50 p-3 rounded-lg shadow-md w-48 z-10">
          <div className="text-sm text-amber-800">
            <div className="font-semibold">Catatan:</div>
            <p className="text-xs mt-1">Jangan lupa meeting project Alpha jam 3 sore!</p>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes blob {
          0% { transform: scale(1) translate(0px, 0px); }
          33% { transform: scale(1.1) translate(20px, -30px); }
          66% { transform: scale(0.9) translate(-20px, 30px); }
          100% { transform: scale(1) translate(0px, 0px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-blob {
          animation: blob 15s ease-in-out infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default Hero;
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

// SVG Icons dengan desain modern
const TaskIcon = () => (
  <svg viewBox="0 0 24 24" className="w-16 h-16 text-indigo-600">
    <path
      fill="currentColor"
      d="M17,4V10L15,8L13,10V4H9V20H19V4H17M3,7H7V9H3V7M3,11H7V13H3V11M3,15H7V17H3V15M20,3H8C6.9,3 6,3.9 6,5V19C6,20.1 6.9,21 8,21H20C21.1,21 22,20.1 22,19V5C22,3.9 21.1,3 20,3Z"
    />
  </svg>
);

const TeamIcon = () => (
  <svg viewBox="0 0 24 24" className="w-16 h-16 text-indigo-600">
    <path
      fill="currentColor"
      d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z"
    />
  </svg>
);

const ChartIcon = () => (
  <svg viewBox="0 0 24 24" className="w-16 h-16 text-indigo-600">
    <path
      fill="currentColor"
      d="M22,21H2V3H4V19H6V10H10V19H12V6H16V19H18V14H22V21Z"
    />
  </svg>
);

const Fitur = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const cardsRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, TextPlugin);
    const headingTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse"
      }
    });

    headingTimeline
      .from(headingRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out"
      })
      .from(subheadingRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.4");

    const cardTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: cardsRef.current[0],
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    cardTimeline.fromTo(cardsRef.current, 
      {
        opacity: 0,
        y: 60,
        scale: 0.9,
        rotationX: 10
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.7)"
      }
    );

    cardsRef.current.forEach(card => {
      const iconElement = card.querySelector('.icon-container');
      const titleElement = card.querySelector('h3');
      const contentElement = card.querySelector('p');
      const decorElement = card.querySelector('.decor-element');
      
      card.addEventListener('mouseenter', () => {
        gsap.to(iconElement, { y: -10, scale: 1.1, duration: 0.4, ease: "power2.out" });
        gsap.to(titleElement, { y: -5, duration: 0.3, ease: "power2.out" });
        gsap.to(contentElement, { y: -3, duration: 0.3, ease: "power2.out" });
        gsap.to(decorElement, { scale: 1.4, rotation: 10, duration: 0.5, ease: "power2.out" });
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(iconElement, { y: 0, scale: 1, duration: 0.4, ease: "power2.out" });
        gsap.to(titleElement, { y: 0, duration: 0.3, ease: "power2.out" });
        gsap.to(contentElement, { y: 0, duration: 0.3, ease: "power2.out" });
        gsap.to(decorElement, { scale: 1, rotation: 0, duration: 0.5, ease: "power2.out" });
      });
    });

    const floatingElements = document.querySelectorAll('.floating-decor');
    floatingElements.forEach((el, index) => {
      gsap.to(el, {
        y: index % 2 === 0 ? "20px" : "-20px",
        rotate: index % 2 === 0 ? "5deg" : "-5deg",
        duration: 3 + index,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.4
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  const handleCardClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const features = [
    { 
      icon: <TaskIcon />, 
      title: 'Manajemen Tugas', 
      desc: 'Buat, atur, dan lacak tugas tim secara real-time dengan antarmuka yang intuitif dan mudah digunakan.',
      gradient: 'from-indigo-500 via-purple-500 to-indigo-500', 
      bgGradient: 'from-indigo-50 to-purple-50',
      highlight: 'border-indigo-500'
    },
    { 
      icon: <TeamIcon />, 
      title: 'Kolaborasi Tim', 
      desc: 'Diskusi, delegasi, dan kerja sama antar anggota tim dalam satu tempat terintegrasi dengan fitur komunikasi cepat.',
      gradient: 'from-blue-500 via-indigo-500 to-blue-500', 
      bgGradient: 'from-blue-50 to-indigo-50',
      highlight: 'border-blue-500'
    },
    { 
      icon: <ChartIcon />, 
      title: 'Monitoring Proyek', 
      desc: 'Pantau progres, deadline, dan performa tim secara visual dan interaktif dengan dasbor yang kustomisable dan laporan real-time.',
      gradient: 'from-purple-500 via-pink-500 to-purple-500', 
      bgGradient: 'from-purple-50 to-pink-50',
      highlight: 'border-purple-500'
    },
  ];

  return (
    <section 
      className="py-32 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden" 
      id="fitur" 
      ref={sectionRef}
    >
      <div className="absolute top-20 left-10 w-24 h-24 rounded-full bg-gradient-to-br from-indigo-300 to-purple-300 opacity-20 blur-xl floating-decor"></div>
      <div className="absolute top-40 right-20 w-32 h-32 rounded-full bg-gradient-to-br from-blue-300 to-indigo-300 opacity-20 blur-xl floating-decor"></div>
      <div className="absolute bottom-40 left-1/4 w-40 h-40 rounded-full bg-gradient-to-br from-purple-300 to-pink-300 opacity-20 blur-xl floating-decor"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 
            ref={headingRef}
            className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 inline-block mb-6"
          >
            Fitur
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 mx-auto mb-8"></div>
          <p 
            ref={subheadingRef}
            className="text-gray-600 max-w-2xl mx-auto text-xl"
          >
            Tingkatkan produktivitas tim dan kesuksesan proyek Anda dengan fitur-fitur terbaik kami
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div 
              key={index} 
              ref={addToRefs}
              className={`relative rounded-2xl p-8 bg-white shadow-xl transition-all duration-500 transform hover:-translate-y-4 hover:shadow-2xl border-2 ${activeIndex === index ? feature.highlight : 'border-transparent'} cursor-pointer group`}
              onClick={() => handleCardClick(index)}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}></div>
              <div className="icon-container relative bg-white rounded-xl p-5 inline-block mb-6 shadow-md transition-all duration-300 z-10">
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-10 rounded-xl`}></div>
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 relative z-10">{feature.title}</h3>
              <p className="text-gray-600 text-lg relative z-10">{feature.desc}</p>
              <div className="decor-element absolute -bottom-6 -right-6 w-36 h-36 rounded-full bg-gradient-to-br opacity-10 transition-all duration-500 z-0 from-indigo-500 to-purple-500"></div>
              <div className={`mt-6 overflow-hidden transition-all duration-500 ${activeIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                <hr className={`border-t-2 ${feature.highlight} mb-4`} />
                <p className="text-gray-700">
                  Klik untuk melihat lebih detail tentang fitur ini dan cara menggunakannya dalam meningkatkan produktivitas tim Anda.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Fitur;
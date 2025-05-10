import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, MessageSquare } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Kontak = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      descRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );

    cardRefs.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.2 + index * 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const addToRefs = el => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="py-24 bg-gradient-to-br from-indigo-50 to-white" 
      id="kontak"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-4xl font-bold text-gray-800 mb-4"
          >
            Butuh Bantuan?
          </h2>
          <p 
            ref={descRef}
            className="text-gray-600 max-w-lg mx-auto"
          >
            Hubungi kami untuk konsultasi atau demo produk gratis. Tim kami siap membantu Anda mengoptimalkan manajemen proyek.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            ref={addToRefs}
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 group"
          >
            <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center mb-6 mx-auto group-hover:bg-indigo-500 transition-colors duration-300">
              <Mail className="text-indigo-500 w-8 h-8 group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">Email</h3>
            <p className="text-gray-500 mb-4 text-center">Dapatkan jawaban dalam 24 jam</p>
            <div className="text-center">
              <a 
                href="mailto:support@projectmanager.com" 
                className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors duration-300"
              >
                support@projectmanager.com
              </a>
            </div>
          </div>

          <div 
            ref={addToRefs}
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 group"
          >
            <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center mb-6 mx-auto group-hover:bg-indigo-500 transition-colors duration-300">
              <Phone className="text-indigo-500 w-8 h-8 group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">Telepon</h3>
            <p className="text-gray-500 mb-4 text-center">Senin - Jumat, 9:00 - 17:00</p>
            <div className="text-center">
              <a 
                href="tel:+628123456789" 
                className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors duration-300"
              >
                +62 812-3456-789
              </a>
            </div>
          </div>

          <div 
            ref={addToRefs}
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 group"
          >
            <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center mb-6 mx-auto group-hover:bg-indigo-500 transition-colors duration-300">
              <MessageSquare className="text-indigo-500 w-8 h-8 group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">Live Chat</h3>
            <p className="text-gray-500 mb-4 text-center">Bantuan langsung dari tim kami</p>
            <div className="text-center">
              <button 
                className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-300"
              >
                Mulai Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Kontak;
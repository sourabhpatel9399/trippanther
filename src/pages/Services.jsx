import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useApp } from '../context/AppContext';

gsap.registerPlugin(ScrollTrigger);

// ─── Film Noise Texture (Cinematic luxury feel) ───
const FilmNoise = () => (
  <svg className="pointer-events-none fixed inset-0 z-[9999] w-full h-full opacity-[0.04] mix-blend-overlay">
    <filter id="noiseFilter">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
    </filter>
    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
  </svg>
);

// ─── Text Splitter for Animations ───
const SplitText = ({ text, className = "" }) => {
  return (
    <span className={`inline-block overflow-hidden ${className}`}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="service-hero-word inline-block translate-y-full mr-[0.3em]">
          {word}
        </span>
      ))}
    </span>
  );
};

// ========== PREMIUM MINIMAL SVG ICONS ==========
const Step1Icon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} width={32} height={32}><path d="M21 16v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2M7 10l5 5 5-5"/><path d="M12 15V3"/></svg>;
const Step2Icon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} width={32} height={32}><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-4-4 4 4 0 0 0-4-4 4 4 0 0 0-4 4"/><path d="M12 2v10"/><path d="M12 12a4 4 0 0 0 4-4"/></svg>;
const Step3Icon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} width={32} height={32}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>;
const Step4Icon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} width={32} height={32}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 6v6l4 2"/></svg>;

// High-Res Editorial Images for Services
const SVCS = [
  { 
    id: "01",
    title: 'Adventure Tours', 
    sub: 'For the Bold', 
    desc: 'Trek Himalayan trails, raft raging rivers, and camp under an ocean of stars. Purpose-built for those who crave the edge of human experience.',
    img: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=2000'
  },
  { 
    id: "02",
    title: 'Honeymoon Escapes', 
    sub: 'For Two', 
    desc: 'Private oceanfront villas, candlelit dinners, and secluded beaches. We engineer romance and intimacy down to the very last detail.',
    img: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80&w=2000'
  },
  { 
    id: "03",
    title: 'Luxury Travel', 
    sub: 'No Compromises', 
    desc: 'Heritage palaces, private charters, and bespoke itineraries. Uncompromising luxury for those who demand the absolute best the world has to offer.',
    img: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=2000'
  },
  { 
    id: "04",
    title: 'Family Holidays', 
    sub: 'Generational Memories', 
    desc: 'Fun, safe, and profoundly memorable for every age. We handle the complex logistics so you can focus entirely on the laughter.',
    img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=2000'
  },
  { 
    id: "05",
    title: 'Pilgrimage Tours', 
    sub: 'Sacred Journeys', 
    desc: 'Spiritually enriching and logistically flawless. We guide you through ancient sacred paths with profound respect and supreme comfort.',
    img: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&q=80&w=2000'
  },
  { 
    id: "06",
    title: 'Indore Nearby', 
    sub: 'The Heritage Trails', 
    desc: 'Mandu, Omkareshwar, Maheshwar, Ujjain. Expertly crafted local tours blending deep history with modern luxury transport.',
    img: 'https://images.unsplash.com/photo-1592900548634-e2fbad4a9fa0?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
];

const STEPS = [
  { n: '01', t: 'Share Your Vision', d: 'Tell us where you want to go, your budget, and what matters most.', Icon: Step1Icon },
  { n: '02', t: 'We Craft Your Plan', d: 'Our experts design a custom itinerary just for you — no templates.', Icon: Step2Icon },
  { n: '03', t: 'Review & Confirm', d: 'We refine until it is absolutely perfect. You approve, we lock it in.', Icon: Step3Icon },
  { n: '04', t: 'Travel Effortlessly', d: 'Everything is handled. You just show up and experience the magic.', Icon: Step4Icon },
];

export default function Services() {
  const { openBooking } = useApp();
  const mainRef = useRef(null);
  const heroImageRef = useRef(null);
  
  const heroBg = "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=2000";

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // ════════ HERO ANIMATIONS ════════
      let mm = gsap.matchMedia();

      // Desktop
      mm.add("(min-width: 768px)", () => {
        gsap.set(heroImageRef.current, { scale: 1.15 });
        gsap.to(heroImageRef.current, {
          scale: 1, duration: 2.5, ease: "none",
          scrollTrigger: { trigger: ".service-hero", start: "top top", end: "bottom top", scrub: 1, pin: true }
        });
      });

      // Mobile
      mm.add("(max-width: 767px)", () => {
        gsap.set(heroImageRef.current, { scale: 1.05 });
        gsap.to(heroImageRef.current, {
          scale: 1, duration: 2, ease: "none",
          scrollTrigger: { trigger: ".service-hero", start: "top top", end: "bottom top", scrub: 1, pin: true }
        });
      });

      // Text Reveal
      gsap.to(".service-hero-word", { y: "0%", duration: 1.2, stagger: 0.05, delay: 0.3, ease: "power4.out" });
      gsap.fromTo(".hero-fade", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1.5, delay: 0.8 });

      // ════════ EDITORIAL SERVICES REVEAL ════════
      gsap.utils.toArray(".service-row").forEach(row => {
        const img = row.querySelector(".service-img");
        const text = row.querySelector(".service-text");
        
        gsap.fromTo(img, 
          { opacity: 0, scale: 0.95, clipPath: "inset(10% 10% 10% 10%)" },
          { opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "expo.out", 
            scrollTrigger: { trigger: row, start: "top 80%" } }
        );

        gsap.fromTo(text, 
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1.2, delay: 0.2, ease: "power3.out", 
            scrollTrigger: { trigger: row, start: "top 80%" } }
        );
      });

      // ════════ STEPS ANIMATION ════════
      gsap.fromTo(".step-item",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: ".steps-container", start: "top 80%" } }
      );

    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="bg-[#050505] min-h-screen text-white font-['Montserrat',sans-serif] selection:bg-white selection:text-black">
      <FilmNoise />

      {/* ══════════════════════════════════════════════════
          1. CINEMATIC HERO
      ══════════════════════════════════════════════════ */}
      <section className="service-hero relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* Huge Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <h1 className="text-[22vw] font-black uppercase leading-none text-white/[0.015] tracking-tighter select-none">
            CURATED
          </h1>
        </div>

        {/* Hero Background */}
        <div className="absolute inset-0 z-10 w-full h-full overflow-hidden">
          <img 
            ref={heroImageRef}
            src={heroBg} 
            alt="Scenic view" 
            className="w-full h-full object-cover object-center opacity-40" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-[#050505]" />
        </div>

        {/* Content */}
        <div className="relative z-20 text-center px-6 max-w-5xl w-full mt-20 md:mt-0">
          <p className="hero-fade text-[9px] md:text-xs tracking-[5px] md:tracking-[8px] uppercase mb-6 md:mb-8 text-white/60 font-medium">
            What We Offer
          </p>
          
          <h2 className="text-4xl sm:text-5xl md:text-[6vw] font-['Playfair_Display',serif] leading-[1.2] md:leading-[1.1] font-normal text-white flex flex-col items-center">
            <span className="block mb-1 md:mb-2 overflow-hidden pb-2"><SplitText text="The Masterpieces" /></span>
            <span className="block text-white/50 italic overflow-hidden pb-2"><SplitText text="of Experience." /></span>
          </h2>

          <div className="hero-fade mt-10 md:mt-12 max-w-2xl mx-auto border-t border-white/10 pt-6 md:pt-8 px-4">
            <p className="text-xs md:text-base text-white/40 font-light leading-relaxed tracking-wide italic">
              "Crafted for every kind of traveler — from the untamed adventurer to the uncompromising luxury connoisseur."
            </p>
          </div>
        </div>

        {/* Scroll Hint */}
        <div className="hero-fade absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3">
          <div className="w-[1px] h-12 md:h-16 bg-gradient-to-b from-white/50 to-transparent relative overflow-hidden">
             <div className="w-full h-full bg-white absolute top-[-100%] animate-[scrollDown_2s_infinite_ease-in-out]" />
          </div>
          <span className="text-[7px] tracking-[5px] uppercase text-white/30">Explore</span>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          2. EDITORIAL SERVICES (Alternating Rows)
      ══════════════════════════════════════════════════ */}
      <section className="py-20 md:py-32 px-6 md:px-10 container mx-auto">
        <div className="text-center mb-24 md:mb-40">
          <p className="text-[9px] tracking-[5px] uppercase text-white/30 mb-6">Our Collection</p>
          <h2 className="text-3xl md:text-5xl font-['Playfair_Display',serif] italic font-light">Bespoke <span className="font-normal text-white/50 not-italic">Journeys</span></h2>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col gap-24 md:gap-40">
          {SVCS.map((service, i) => (
            <div key={i} className={`service-row flex flex-col ${i % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-10 md:gap-24 group`}>
              
              {/* Image Block */}
              <div className="w-full md:w-1/2 overflow-hidden h-[40vh] md:h-[70vh] relative cursor-pointer" onClick={() => openBooking({ title: service.title })}>
                <div className="service-img w-full h-full">
                  <img 
                    src={service.img} 
                    alt={service.title} 
                    className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" 
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-1000" />
                </div>
                {/* Floating Number */}
                <div className="absolute top-6 left-6 md:top-10 md:left-10 text-white/50 font-['Playfair_Display',serif] text-3xl md:text-5xl italic mix-blend-difference pointer-events-none">
                  {service.id}
                </div>
              </div>

              {/* Text Block */}
              <div className="service-text w-full md:w-1/2 text-center md:text-left flex flex-col items-center md:items-start">
                <p className="text-[9px] md:text-[10px] tracking-[4px] uppercase text-white/40 mb-4">{service.sub}</p>
                <h3 className="text-3xl md:text-5xl font-['Playfair_Display',serif] mb-6 text-white">{service.title}</h3>
                <div className="w-12 h-[1px] bg-white/20 mb-8" />
                <p className="text-white/50 font-light leading-relaxed text-sm md:text-base mb-10 max-w-md">
                  {service.desc}
                </p>
                <button 
                  onClick={() => openBooking({ title: service.title })}
                  className="inline-flex items-center gap-4 px-8 py-3.5 border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-500 rounded-none text-[9px] md:text-[10px] tracking-[3px] uppercase font-medium"
                >
                  Enquire Now <span>→</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          3. THE METHODOLOGY (Steps)
      ══════════════════════════════════════════════════ */}
      <section className="py-32 md:py-48 bg-[#0a0a0a] border-y border-white/5 px-6 md:px-10">
        <div className="container mx-auto max-w-7xl steps-container">
          <div className="text-center mb-20 md:mb-32">
            <p className="text-[9px] tracking-[5px] uppercase text-white/30 mb-6">Simple Process</p>
            <h2 className="text-3xl md:text-5xl font-['Playfair_Display',serif] font-light">The <span className="italic text-white/50">Methodology</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
            {STEPS.map((step, i) => (
              <div key={i} className="step-item relative group text-center md:text-left border-t border-white/10 pt-8">
                <div className="text-[5rem] md:text-[6rem] font-black text-white/5 leading-none absolute top-0 -z-10 -mt-6 md:-mt-8 group-hover:text-white/10 transition-colors duration-500">
                  {step.n}
                </div>
                <div className="w-10 h-10 mb-6 text-white/30 mx-auto md:mx-0 group-hover:text-white transition-colors duration-500">
                  <step.Icon />
                </div>
                <h3 className="text-xl font-['Playfair_Display',serif] text-white mb-4">{step.t}</h3>
                <p className="text-white/40 text-xs md:text-sm font-light leading-relaxed">
                  {step.d}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-24">
            <button 
              onClick={() => openBooking()} 
              className="px-10 py-4 bg-white text-black text-[10px] tracking-[3px] uppercase font-bold hover:bg-gray-200 transition-colors duration-500"
            >
              Start Your Journey
            </button>
          </div>
        </div>
      </section>

      {/* Global Styles */}
      <style>{`
        @keyframes scrollDown {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </div>
  );
}
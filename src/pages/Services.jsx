import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useApp } from '../context/AppContext';

gsap.registerPlugin(ScrollTrigger);

// 3D Tilt Card Component
const TiltCard = ({ children, className = "", onClick }) => {
  const ref = useRef(null);
  const glowRef = useRef(null);
  
  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotY = ((x - rect.width / 2) / (rect.width / 2)) * 12;
    const rotX = -((y - rect.height / 2) / (rect.height / 2)) * 12;
    gsap.to(el, { rotationY: rotY, rotationX: rotX, transformPerspective: 900, duration: 0.3, ease: "power2.out" });
    if (glowRef.current) {
      const px = (x / rect.width) * 100;
      const py = (y / rect.height) * 100;
      gsap.to(glowRef.current, { background: `radial-gradient(circle at ${px}% ${py}%, rgba(245,158,11,0.2) 0%, transparent 70%)`, duration: 0.3 });
    }
  };
  
  const handleLeave = () => {
    gsap.to(ref.current, { rotationY: 0, rotationX: 0, duration: 0.6, ease: "elastic.out(1,0.4)" });
    if (glowRef.current) gsap.to(glowRef.current, { background: "transparent", duration: 0.4 });
  };
  
  return (
    <div ref={ref} className={className} onMouseMove={handleMove} onMouseLeave={handleLeave} onClick={onClick}
      style={{ transformStyle: "preserve-3d", willChange: "transform", cursor: onClick ? "pointer" : "default" }}>
      <div ref={glowRef} className="absolute inset-0 rounded-2xl pointer-events-none z-10 transition-all duration-300" />
      {children}
    </div>
  );
};

// ========== PREMIUM SVG ICONS FOR SERVICES ==========
const AdventureIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" width={40} height={40}>
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
  </svg>
);

const HoneymoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" width={40} height={40}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
    <path d="M12 3v2m-4 0h8"/>
  </svg>
);

const LuxuryIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" width={40} height={40}>
    <path d="M12 2v4M4.93 4.93l2.83 2.83M2 12h4M4.93 19.07l2.83-2.83M12 22v-4M19.07 19.07l-2.83-2.83M22 12h-4M19.07 4.93l-2.83 2.83"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const FamilyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" width={40} height={40}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const PilgrimageIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" width={40} height={40}>
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
    <path d="M12 7v10"/>
  </svg>
);

const IndoreIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" width={40} height={40}>
    {/* Palace/City Gateway */}
    <path d="M4 8L12 2L20 8L12 14L4 8Z" />
    <path d="M4 8V20H20V8" />
    <path d="M8 20V14H16V20" />
    {/* Arch/Gateway Detail */}
    <path d="M12 8V14" />
    <path d="M10 10H14" />
    <path d="M6 12L8 10" />
    <path d="M18 12L16 10" />
    {/* Decorative Elements */}
    <circle cx="12" cy="6" r="1" />
    <path d="M8 4L10 5" />
    <path d="M16 4L14 5" />
  </svg>
);

// ========== PREMIUM SVG ICONS FOR STEPS ==========
const Step1Icon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} width={32} height={32}>
    <path d="M21 16v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2M7 10l5 5 5-5"/>
    <path d="M12 15V3"/>
  </svg>
);

const Step2Icon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} width={32} height={32}>
    <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-4-4 4 4 0 0 0-4-4 4 4 0 0 0-4 4"/>
    <path d="M12 2v10"/>
    <path d="M12 12a4 4 0 0 0 4-4"/>
  </svg>
);

const Step3Icon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} width={32} height={32}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

const Step4Icon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} width={32} height={32}>
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
    <path d="M12 6v6l4 2"/>
  </svg>
);

const SVCS = [
  { 
    Icon: AdventureIcon,
    title: 'Adventure Tours', 
    sub: 'For the Bold', 
    desc: 'Trek Himalayan trails, raft raging rivers, camp under stars. Purpose-built for those who crave the edge.',
    img: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=90',
    gradient: 'from-orange-500/20 to-red-500/20'
  },
  { 
    Icon: HoneymoonIcon,
    title: 'Honeymoon Escapes', 
    sub: 'For Two', 
    desc: 'Private villas, candlelit dinners, secluded beaches. We engineer romance down to the last petal.',
    img: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=90',
    gradient: 'from-pink-500/20 to-rose-500/20'
  },
  { 
    Icon: LuxuryIcon,
    title: 'Luxury Travel', 
    sub: 'No Compromises', 
    desc: 'Heritage palaces, Luxury Stays, bespoke everything. For those who demand the extraordinary.',
    img: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=90',
    gradient: 'from-amber-500/20 to-yellow-500/20'
  },
  { 
    Icon: FamilyIcon,
    title: 'Family Holidays', 
    sub: 'For Everyone', 
    desc: 'Fun, safe, and memorable for every age. We handle the logistics so you handle the laughter.',
    img: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&q=90',
    gradient: 'from-green-500/20 to-emerald-500/20'
  },
  { 
    Icon: PilgrimageIcon,
    title: 'Pilgrimage Tours', 
    sub: 'Sacred Journeys', 
    desc: 'Char Dham, Vaishno Devi, Golden Temple. Spiritually enriching, logistically flawless.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/The_Golden_Temple_of_Amrithsar_7.jpg/500px-The_Golden_Temple_of_Amrithsar_7.jpg',
    gradient: 'from-purple-500/20 to-violet-500/20'
  },
  { 
    Icon: IndoreIcon,
    title: 'Indore Nearby Tours', 
    sub: 'Nearby Tours', 
    desc: 'Mandu · Omkareshwar · Maheshwar · Ujjain — expertly crafted local tours with comfortable transportation and guided experiences.',
    img: 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/0b/c9/f6/78.jpg',
    gradient: 'from-cyan-500/20 to-blue-500/20'
  },
];

const STEPS = [
  { n: '01', t: 'Share Your Vision', d: 'Tell us where you want to go, your budget, travel style, and what matters most.', Icon: Step1Icon },
  { n: '02', t: 'We Craft Your Plan', d: 'Our experts design a custom itinerary just for you — no templates, no shortcuts.', Icon: Step2Icon },
  { n: '03', t: 'Review & Confirm', d: 'We refine until it\'s perfect. You approve, we lock it in.', Icon: Step3Icon },
  { n: '04', t: 'Travel Effortlessly', d: 'Everything is handled. You just show up and experience the magic.', Icon: Step4Icon },
];

export default function Services() {
  const { openBooking } = useApp();
  const heroRef = useRef(null);

  useEffect(() => {
    // Hero Entrance Animation
    const tl = gsap.timeline();
    tl.fromTo(".hero-badge", 
      { y: 30, opacity: 0, letterSpacing: "0.5em" },
      { y: 0, opacity: 1, letterSpacing: "0.2em", duration: 0.8, ease: "power3.out" }
    ).fromTo(".hero-title", 
      { y: 80, opacity: 0, skewY: 6 },
      { y: 0, opacity: 1, skewY: 0, duration: 1, ease: "expo.out" }, "-=0.4"
    ).fromTo(".hero-subtitle", 
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.6"
    );

    // Mouse Parallax on Hero
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const xP = e.clientX / window.innerWidth - 0.5;
      const yP = e.clientY / window.innerHeight - 0.5;
      gsap.to(".parallax-bg", { x: xP * 30, y: yP * 30, duration: 1, ease: "power2.out" });
      gsap.to(".parallax-content", { x: xP * 15, y: yP * 15, duration: 1, ease: "power2.out" });
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Services Cards Animation
    gsap.fromTo(".service-card", 
      { opacity: 0, y: 80, rotationX: 15, transformPerspective: 800 },
      { 
        opacity: 1, y: 0, rotationX: 0, stagger: 0.1, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".services-grid", start: "top 85%", toggleActions: "play none none reverse" }
      }
    );

    // Steps Animation
    gsap.fromTo(".step-card", 
      { opacity: 0, y: 60, scale: 0.95 },
      { 
        opacity: 1, y: 0, scale: 1, stagger: 0.12, duration: 0.8, ease: "back.out(1)",
        scrollTrigger: { trigger: ".steps-section", start: "top 85%" }
      }
    );

    // Floating particles
    gsap.to(".floating-particle", {
      y: "random(-40, 40)",
      x: "random(-40, 40)",
      duration: "random(5, 10)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.05
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="bg-[#070E1A] min-h-screen text-white overflow-x-hidden">
      
      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(60)].map((_, i) => (
          <div
            key={i}
            className="floating-particle absolute rounded-full"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              background: i % 3 === 0 ? "rgba(245,158,11,0.3)" : i % 3 === 1 ? "rgba(59,130,246,0.2)" : "rgba(255,255,255,0.1)",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* ========== HERO SECTION ========== */}
      <section ref={heroRef} className="relative min-h-[75vh] flex items-center overflow-hidden">
        <div className="parallax-bg absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=90"
            alt="Services Hero"
            className="w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070E1A]/95 via-[#070E1A]/80 to-[#070E1A]/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070E1A] via-transparent to-transparent" />
        </div>

        <div className="parallax-content relative z-10 container-custom">
          <div className="max-w-4xl">
            <div className="hero-badge inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
              <span className="text-amber-400 text-xs font-semibold tracking-[0.2em] uppercase">WHAT WE OFFER</span>
            </div>
            <h1 className="hero-title text-6xl md:text-7xl lg:text-8xl font-display leading-[1.1] mb-6">
              Our
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 block">Services</span>
            </h1>
            <p className="hero-subtitle text-white/60 text-lg md:text-xl max-w-xl leading-relaxed">
              Crafted for every kind of traveler — from adventure seekers to luxury connoisseurs.
            </p>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-amber-400 rounded-full mt-2 animate-scroll-line" />
          </div>
        </div>
      </section>

      {/* ========== SERVICES GRID ========== */}
      <section className="services-section py-28">
        <div className="container-custom">
          <div className="text-center mb-16">
            <p className="text-amber-400 text-xs tracking-[0.3em] uppercase mb-3">Crafted For You</p>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-white">
              Every <span className="text-amber-400 font-semibold">Journey</span> is Unique
            </h2>
            <div className="w-20 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto mt-5" />
          </div>

          <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SVCS.map((service, i) => (
              <TiltCard
                key={i}
                className="service-card group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-amber-400/40 transition-all duration-500 cursor-pointer"
                onClick={() => openBooking({ title: service.title })}
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={service.img} 
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070E1A] via-transparent to-transparent" />
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-amber-400/20 backdrop-blur-sm border border-amber-400/30 text-xs font-bold text-amber-400">
                    {service.sub}
                  </div>
                </div>
                <div className="p-6">
                  {/* Premium SVG Icon instead of emoji */}
                  <div className="w-12 h-12 mb-4 text-amber-400 group-hover:text-amber-300 transition-colors">
                    <service.Icon />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {service.desc}
                  </p>
                  <div className="mt-5 flex items-center gap-2 text-amber-400 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all group-hover:gap-3">
                    <span>Enquire Now</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section className="steps-section py-28 bg-gradient-to-b from-[#0A192F] to-[#070E1A]">
        <div className="container-custom">
          <div className="text-center mb-16">
            <p className="text-amber-400 text-xs tracking-[0.3em] uppercase mb-3">Simple Process</p>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-white">
              Your Trip in <span className="text-amber-400 font-semibold">4 Simple Steps</span>
            </h2>
            <div className="w-20 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto mt-5" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step, i) => (
              <div
                key={i}
                className="step-card group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/40 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br from-amber-400/20 to-orange-500/20 flex items-center justify-center">
                  <span className="text-2xl font-black text-amber-400">{step.n}</span>
                </div>
                {/* Premium SVG Icon instead of emoji */}
                <div className="w-12 h-12 mb-4 text-amber-400 group-hover:text-amber-300 transition-colors">
                  <step.Icon />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                  {step.t}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {step.d}
                </p>
                <div className="mt-4 flex items-center gap-2 text-amber-400/50 text-xs">
                  <span className="w-8 h-px bg-amber-400/30" />
                  <span>Step {step.n}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button 
              onClick={() => openBooking()} 
              className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-full font-bold text-sm overflow-hidden transition-all duration-300 hover:scale-105"
              style={{ background: "linear-gradient(135deg, #F59E0B, #EF4444)", boxShadow: "0 0 20px rgba(245,158,11,0.3)" }}
            >
              <span className="relative z-10">Start Your Journey →</span>
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>
      </section>

      {/* ========== CTA SECTION ========== */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-orange-500/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.1),transparent_70%)]" />
        
        <div className="container-custom text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-display mb-6">
            Ready to Start Your <span className="text-amber-400">Adventure</span>?
          </h2>
          <p className="text-white/60 text-lg mb-8 max-w-2xl mx-auto">
            Let us craft the perfect journey tailored just for you.
          </p>
          <button 
            onClick={() => openBooking()} 
            className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-full font-bold text-sm overflow-hidden transition-all duration-300 hover:scale-105 bg-white text-[#070E1A]"
          >
            <span>Plan Your Trip Now →</span>
            <div className="absolute inset-0 bg-amber-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </section>

      <style>{`
        @keyframes scrollLine {
          0%, 100% { opacity: 0.3; transform: scaleY(0.5) translateY(0); }
          50% { opacity: 1; transform: scaleY(1) translateY(4px); }
        }
        .animate-scroll-line {
          animation: scrollLine 2s ease-in-out infinite;
        }
        ::selection {
          background: rgba(245,158,11,0.3);
          color: #fff;
        }
      `}</style>
    </div>
  );
}
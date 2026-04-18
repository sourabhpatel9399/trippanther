import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import chetan from '../assets/chetan.PNG'

gsap.registerPlugin(ScrollTrigger);

// ─── Film Noise Texture ───
const FilmNoise = () => (
  <svg className="pointer-events-none fixed inset-0 z-[9999] w-full h-full opacity-[0.04] mix-blend-overlay">
    <filter id="noiseFilter">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
    </filter>
    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
  </svg>
);

const SplitText = ({ text, className = "" }) => {
  return (
    <span className={`inline-block overflow-hidden ${className}`}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="about-hero-word inline-block translate-y-full mr-[0.3em]">
          {word}
        </span>
      ))}
    </span>
  );
};

export default function About() {
  const mainRef = useRef(null);
  const heroSectionRef = useRef(null);
  const heroImageRef = useRef(null);
  const snowRef = useRef(null); 
  const manifestoRef = useRef(null);
  const horizontalRef = useRef(null);
  const horizontalContainerRef = useRef(null);

  // High-End Editorial Assets (With Fallback mechanism)
  const imgHero = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop";
  const imgHeroBackup = "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=2000";
  
  const imgAman = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"; 
  const imgChetan = chetan;

  const manifestoText = "We believe that travel is not about ticking boxes. It is about getting lost, losing your old self, and finding something entirely new. TripPanther was built for the seekers, the bold, and the uncompromising. We craft sanctuaries at the edge of the world.";

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // ❄️ SNOWFALL LOGIC ❄️
      if (snowRef.current) {
        const snowContainer = snowRef.current;
        snowContainer.innerHTML = '';
        const flakesCount = window.innerWidth < 768 ? 40 : 100; 
        
        for (let i = 0; i < flakesCount; i++) {
          const flake = document.createElement("div");
          flake.className = "absolute bg-white rounded-full pointer-events-none";
          const size = Math.random() * 3 + 1 + "px"; 
          flake.style.width = size;
          flake.style.height = size;
          flake.style.left = Math.random() * 100 + "%";
          flake.style.top = Math.random() * -100 + "vh"; 
          flake.style.opacity = Math.random() * 0.5 + 0.3; 
          snowContainer.appendChild(flake);

          gsap.to(flake, {
            y: "200vh", 
            x: "+=" + (Math.random() * 60 - 30), 
            duration: Math.random() * 15 + 15, 
            repeat: -1,
            ease: "none",
            delay: Math.random() * -30 
          });
        }
      }

      let mm = gsap.matchMedia();

      // ════════ DESKTOP ════════
      mm.add("(min-width: 768px)", () => {
        let heroTl = gsap.timeline({
          scrollTrigger: { trigger: heroSectionRef.current, start: "top top", end: "bottom top", scrub: 1, pin: true }
        });

        // FIX: Clip-Path hata diya. Ab simple Cinematic Zoom-Out chalega jo 100% visible rahega.
        gsap.set(heroImageRef.current, { scale: 1.2 });
        
        heroTl.to(heroImageRef.current, { scale: 1, duration: 2, ease: "none" }, 0)
              .to(snowRef.current, { opacity: 1, duration: 1, ease: "power2.inOut" }, 1);

        let panels = gsap.utils.toArray(".timeline-panel");
        gsap.to(panels, {
          xPercent: -100 * (panels.length - 1), ease: "none",
          scrollTrigger: {
            trigger: horizontalRef.current, pin: true, scrub: 1,
            snap: 1 / (panels.length - 1),
            end: () => "+=" + horizontalContainerRef.current.offsetWidth
          }
        });
      });

      // ════════ MOBILE ════════
      mm.add("(max-width: 767px)", () => {
        let heroTlMobile = gsap.timeline({
          scrollTrigger: { trigger: heroSectionRef.current, start: "top top", end: "bottom top", scrub: 1, pin: true }
        });

        // Mobile Safe Cinematic Zoom-out
        gsap.set(heroImageRef.current, { scale: 1.1 });
        
        heroTlMobile.to(heroImageRef.current, { scale: 1, duration: 2, ease: "none" }, 0)
                    .to(snowRef.current, { opacity: 1, duration: 1, ease: "power2.inOut" }, 1);

        gsap.utils.toArray(".timeline-panel").forEach(panel => {
          gsap.fromTo(panel, 
            { opacity: 0, y: 50 }, 
            { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: panel, start: "top 80%" } }
          );
        });
      });

      // ════════ TEXT ANIMATIONS ════════
      gsap.to(".about-hero-word", { y: "0%", duration: 1.2, stagger: 0.05, delay: 0.5, ease: "power4.out" });
      gsap.fromTo(".hero-subtext", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1.5, delay: 1 });

      const manifestoWords = gsap.utils.toArray(".manifesto-word");
      gsap.fromTo(manifestoWords, 
        { color: "rgba(255,255,255,0.15)" },
        { color: "rgba(255,255,255,1)", stagger: 0.1, ease: "none",
          scrollTrigger: { trigger: manifestoRef.current, start: "top 80%", end: "bottom 50%", scrub: true }
        }
      );

      gsap.utils.toArray(".founder-card").forEach(card => {
        gsap.fromTo(card, 
          { y: 60, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 1.5, ease: "expo.out", scrollTrigger: { trigger: card, start: "top 85%" } }
        );
      });

    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="bg-[#050505] min-h-screen text-white font-['Montserrat',sans-serif] selection:bg-white selection:text-black">
      <FilmNoise />

      {/* ══════════════════════════════════════════════════
          1. HERO SECTION (100% VISIBLE IMAGE)
      ══════════════════════════════════════════════════ */}
      <section ref={heroSectionRef} className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* Background Watermark (z-0) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <h1 className="text-[25vw] md:text-[22vw] font-black uppercase leading-none text-white/[0.02] tracking-tighter select-none">
            PHILOSOPHY
          </h1>
        </div>

        {/* 🖼️ BULLETPROOF IMAGE CONTAINER (z-10) */}
        <div className="absolute inset-0 z-10 w-full h-full overflow-hidden">
          <img 
            ref={heroImageRef}
            src={imgHero} 
            alt="Masterpiece" 
            className="w-full h-full object-cover object-center" 
            onError={(e) => { e.target.src = imgHeroBackup; }} // Agar pehli image block hui toh ye automatically chal jayegi
          />
          {/* Black overlay for text readability */}
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
        </div>

        {/* ❄️ SNOW CONTAINER (z-20) */}
        <div ref={snowRef} className="absolute inset-0 z-20 pointer-events-none overflow-hidden opacity-0" />

        {/* 📝 CONTENT (z-30) */}
        <div className="relative z-30 text-center px-6 max-w-5xl w-full mt-10 md:mt-0">
          <p className="hero-subtext text-[9px] md:text-xs tracking-[5px] md:tracking-[8px] uppercase mb-6 md:mb-8 text-white/90 font-medium drop-shadow-md">
            The TripPanther Manifesto
          </p>
          
          <h2 className="text-3xl sm:text-5xl md:text-[5vw] font-['Playfair_Display',serif] leading-[1.3] md:leading-[1.1] font-normal text-white flex flex-col items-center drop-shadow-lg">
            <span className="block mb-1 md:mb-2 overflow-hidden pb-2"><SplitText text="We Don't Just Book Trips." /></span>
            <span className="block text-white/80 italic overflow-hidden pb-2"><SplitText text="We Architect Masterpieces" /></span>
            <span className="block mt-1 md:mt-2 overflow-hidden pb-2"><SplitText text="of Exploration." /></span>
          </h2>

          <div className="hero-subtext mt-10 md:mt-12 max-w-2xl mx-auto border-t border-white/20 pt-6 md:pt-8 px-4">
            <p className="text-xs md:text-lg text-white/80 font-medium leading-relaxed tracking-wide italic drop-shadow-md">
              "Crafting legacies of adventure for those who refuse to settle for the ordinary."
            </p>
          </div>
        </div>

        {/* Scroll Hint (z-40) */}
        <div className="hero-subtext absolute bottom-10 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-3">
          <div className="w-[1px] h-12 md:h-16 bg-gradient-to-b from-white to-transparent relative overflow-hidden">
             <div className="w-full h-full bg-white absolute top-[-100%] animate-[scrollDown_2s_infinite_ease-in-out]" />
          </div>
          <span className="text-[7px] md:text-[8px] tracking-[4px] md:tracking-[5px] uppercase text-white/60 font-bold drop-shadow-md">Begin</span>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          2. THE MANIFESTO (TEXT SCRUB)
      ══════════════════════════════════════════════════ */}
      <section className="py-32 md:py-64 px-6 md:px-20 container mx-auto">
        <div className="max-w-5xl mx-auto text-center md:text-left">
          <p className="text-[10px] tracking-[5px] uppercase text-white/30 mb-8 md:mb-12">The Ideology</p>
          <h2 ref={manifestoRef} className="text-2xl sm:text-3xl md:text-[4vw] leading-[1.6] md:leading-[1.3] font-['Playfair_Display',serif] font-medium">
            {manifestoText.split(" ").map((word, i) => (
              <span key={i} className="manifesto-word inline-block mr-[1.5vw] md:mr-[1vw]">
                {word}
              </span>
            ))}
          </h2>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          3. MILESTONES
      ══════════════════════════════════════════════════ */}
      <section ref={horizontalRef} className="w-full bg-[#0a0a0a] md:h-screen flex items-center relative overflow-hidden py-20 md:py-0 border-y border-white/5">
        
        <div className="md:absolute top-20 left-6 md:left-20 z-10 mb-12 md:mb-0">
          <h2 className="text-4xl md:text-[4vw] font-['Playfair_Display',serif] text-white leading-none">
            Our <em className="italic text-white/40">Journey</em>
          </h2>
        </div>

        <div ref={horizontalContainerRef} className="flex flex-col md:flex-row h-auto md:h-[60vh] w-full md:w-[300vw] items-center md:items-end pb-10 gap-16 md:gap-0 px-6 md:px-0">
          {[
            { year: "2024", title: "The Spark", desc: "Conceived amidst the rugged trails of Indore. Two friends decided the world needed deeper experiences." },
            { year: "2025", title: "The Tribe", desc: "What started as curated trips for friends evolved into a community of hundreds of passionate explorers." },
            { year: "2026", title: "The Sanctuary", desc: "TripPanther goes global. Redefining premium travel with exclusive access and uncompromising luxury." }
          ].map((milestone, i) => (
            <div key={i} className="timeline-panel w-full md:w-screen flex md:justify-center md:px-20 relative">
              <div className="w-full max-w-2xl border-t border-white/20 pt-6 md:pt-8 relative">
                <div className="absolute top-[-4px] left-0 w-2 h-2 rounded-full bg-white" />
                <h3 className="text-[25vw] md:text-[8vw] font-black text-white/[0.03] leading-none absolute top-0 -z-10 -mt-6 md:-mt-8">{milestone.year}</h3>
                <p className="text-[9px] md:text-[10px] tracking-[4px] text-white/50 uppercase mb-4">{milestone.year}</p>
                <h4 className="text-3xl md:text-5xl font-['Playfair_Display',serif] text-white mb-4 md:mb-6">{milestone.title}</h4>
                <p className="text-white/50 text-sm md:text-base font-light leading-relaxed md:w-2/3">{milestone.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          4. THE ARCHITECTS
      ══════════════════════════════════════════════════ */}
      <section className="py-24 md:py-48 relative bg-[#050505] px-6">
        <div className="hidden sm:flex absolute inset-0 items-center justify-center overflow-hidden pointer-events-none z-0">
          <h2 className="text-[20vw] font-black text-white/[0.02] rotate-90 whitespace-nowrap">VISIONARIES</h2>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          {/* Founder 1 */}
          <div className="founder-card flex flex-col md:flex-row items-center gap-8 md:gap-20 mb-24 md:mb-48">
            <div className="w-full md:w-1/2 aspect-[4/5] md:aspect-[3/4] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl">
              <img src={imgAman} alt="Aman Patel" className="w-full h-full object-cover" />
            </div>
            <div className="w-full md:w-1/2 text-center md:text-left">
              <p className="text-[9px] md:text-[10px] tracking-[5px] text-white/50 uppercase mb-3">Founder & CEO</p>
              <h3 className="text-5xl md:text-7xl font-['Playfair_Display',serif] mb-6 md:mb-8">Aman <br className="hidden md:block"/><em className="italic text-white/60">Patel</em></h3>
              <p className="text-white/60 font-light leading-relaxed text-sm md:text-base max-w-md mx-auto md:mx-0">
                "Travel is not a checklist. It is an art form." With an eye for the extraordinary, Aman built TripPanther to craft narratives, not just itineraries.
              </p>
            </div>
          </div>

          {/* Founder 2 */}
          <div className="founder-card flex flex-col md:flex-row-reverse items-center gap-8 md:gap-20">
            <div className="w-full md:w-1/2 aspect-[4/5] md:aspect-[3/4] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl">
              <img src={imgChetan} alt="Chetan Patel" className="w-full h-full object-cover" />
            </div>
            <div className="w-full md:w-1/2 text-center md:text-right">
              <p className="text-[9px] md:text-[10px] tracking-[5px] text-white/50 uppercase mb-3">Head of Experiences</p>
              <h3 className="text-5xl md:text-7xl font-['Playfair_Display',serif] mb-6 md:mb-8">Chetan <br className="hidden md:block"/><em className="italic text-white/60">Patel</em></h3>
              <p className="text-white/60 font-light leading-relaxed text-sm md:text-base max-w-md mx-auto md:mx-0 md:ml-auto">
                "Every detail matters. The scent of the room, the texture of the sheets, the exact moment the sun hits the mountain." Chetan curates the magic.
              </p>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes scrollDown {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        ::selection { background: rgba(255,255,255,0.2); color: #fff; }
      `}</style>
    </div>
  );
}
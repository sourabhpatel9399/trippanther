import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import kasol from '../assets/Kasol.jpg'
import bali from '../assets/Bali.jpg'
import ladakh from '../assets/ladakh.jpg'

gsap.registerPlugin(ScrollTrigger);

// ─── SVG Icons ──────────────────────────────────────────────────────────────
const HotelIcon = () => ( <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" width={32} height={32}><path d="M3 22V8a1 1 0 011-1h16a1 1 0 011 1v14"/><path d="M2 22h20"/><path d="M9 22V12h6v10"/><rect x="9" y="4" width="6" height="4" rx="1"/></svg> );
const BusIcon = () => ( <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" width={32} height={32}><rect x="2" y="5" width="20" height="13" rx="2"/><path d="M2 10h20M7 18v2m10-2v2"/><circle cx="7" cy="15" r="1" fill="currentColor"/><circle cx="17" cy="15" r="1" fill="currentColor"/></svg> );
const PlaneIcon = () => ( <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" width={32} height={32}><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg> );

// ─── Helper: Animated Text Splitter ─────────────────────────────────────────
const SplitText = ({ text, className = "" }) => {
  return (
    <span className={`inline-block overflow-hidden ${className}`}>
      {text.split("").map((char, index) => (
        <span key={index} className="hero-char inline-block translate-y-full">
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
};

// ─── Helper: Magnetic Button (Desktop) ──────────────────────────────────────
function useMagnetic(strength = 0.4) {
  const ref = useRef(null);
  useEffect(() => {
    if (window.innerWidth < 768) return; // Disable on mobile
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      gsap.to(el, { x: (e.clientX - cx) * strength, y: (e.clientY - cy) * strength, duration: 0.6, ease: "power3.out" });
    };
    const onLeave = () => gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1,0.3)" });
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); };
  }, [strength]);
  return ref;
}

// ─── Helper: 3D Tilt Card (Desktop Only, Tap scale on Mobile) ───────────────
function TiltCard({ children, className = "" }) {
  const ref = useRef(null);
  
  const handleMove = (e) => {
    if (window.innerWidth < 768) return; 
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotY = (((e.clientX - rect.left) - cx) / cx) * 10;
    const rotX = -(((e.clientY - rect.top) - cy) / cy) * 10;
    gsap.to(el, { rotationY: rotY, rotationX: rotX, transformPerspective: 1000, duration: 0.5, ease: "power2.out" });
  };
  
  const handleLeave = () => gsap.to(ref.current, { rotationY: 0, rotationX: 0, duration: 0.8, ease: "power2.out" });

  return (
    <div ref={ref} className={`${className} active:scale-95 transition-transform duration-300`} onMouseMove={handleMove} onMouseLeave={handleLeave} style={{ transformStyle: "preserve-3d" }}>
      {children}
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const heroWrapperRef = useRef(null);
  const heroImageRef = useRef(null);
  const horizontalRef = useRef(null);
  const horizontalContainerRef = useRef(null);
  const magneticBtn = useMagnetic(0.5);

  const premiumHeroBg = "https://images.unsplash.com/photo-1522163182402-834f871fd851?q=80&w=2000&auto=format&fit=crop"; 
  const p1 = kasol;
  const p2 = bali;
  const p3 = ladakh;

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. UNIVERSAL HERO REVEAL
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      gsap.set(heroImageRef.current, { clipPath: window.innerWidth < 768 ? "polygon(15% 30%, 85% 30%, 85% 70%, 15% 70%)" : "polygon(35% 35%, 65% 35%, 65% 65%, 35% 65%)", scale: 1.5 });
      
      tl.to(heroImageRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        scale: 1, duration: 2.5, ease: "power4.inOut"
      })
      .to(".hero-char", { y: "0%", duration: 1.2, stagger: 0.04 }, "-=1.2")
      .fromTo(".hero-fade", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.5, stagger: 0.2 }, "-=1");

      // 2. DEVICE-SPECIFIC ANIMATIONS
      let mm = gsap.matchMedia();

      // --- DESKTOP ANIMATIONS ---
      mm.add("(min-width: 768px)", () => {
        gsap.to(".hero-parallax-bg", {
          yPercent: 30, ease: "none",
          scrollTrigger: { trigger: heroWrapperRef.current, start: "top top", end: "bottom top", scrub: true }
        });
        
        let sections = gsap.utils.toArray(".horizontal-panel");
        gsap.to(sections, {
          xPercent: -100 * (sections.length - 1), ease: "none",
          scrollTrigger: {
            trigger: horizontalRef.current, pin: true, scrub: 1,
            snap: 1 / (sections.length - 1),
            end: () => "+=" + horizontalContainerRef.current.offsetWidth
          }
        });
      });

      // --- MOBILE & TABLET ANIMATIONS ---
      mm.add("(max-width: 767px)", () => {
        // Subtle Hero Parallax
        gsap.to(".hero-parallax-bg", {
          yPercent: 15, ease: "none",
          scrollTrigger: { trigger: heroWrapperRef.current, start: "top top", end: "bottom top", scrub: true }
        });

        // Mobile Parallax inside Images (The Apple-like effect)
        gsap.utils.toArray(".mobile-parallax-img").forEach(img => {
          gsap.fromTo(img, 
            { yPercent: -10, scale: 1.1 },
            { yPercent: 10, scale: 1.05, ease: "none", 
              scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true } 
            }
          );
        });

        // Smooth Scale-Up Reveal for Cards
        gsap.utils.toArray(".mobile-reveal").forEach(card => {
          gsap.fromTo(card,
            { opacity: 0, y: 60, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out", 
              scrollTrigger: { trigger: card, start: "top 85%" } 
            }
          );
        });
      });

      // 3. UNIVERSAL TEXT FADE-UP
      ScrollTrigger.batch(".reveal-up", {
        start: "top 85%",
        onEnter: batch => gsap.fromTo(batch, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power3.out" }),
      });

    });
    return () => ctx.revert();
  }, []);

  // Ye Ref add karna zaroori hai
  const footerCtaRef = useRef(null); 

  // --- GSAP ANIMATION (useEffect wale ctx ke andar daal de) ---
  gsap.fromTo(".grand-cta-reveal", 
    { y: 100, opacity: 0 }, 
    { y: 0, opacity: 1, duration: 1.5, ease: "expo.out", scrollTrigger: { trigger: footerCtaRef.current, start: "top 70%" } }
  );
  gsap.fromTo(".grand-cta-char", 
    { y: "100%" }, 
    { y: "0%", duration: 1.2, stagger: 0.05, ease: "power4.out", scrollTrigger: { trigger: footerCtaRef.current, start: "top 60%" } }
  );

  // --- MOUSE HOVER EFFECTS (Desktop ke liye) ---
  const handleCtaMouseMove = (e) => {
    if (window.innerWidth < 768) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = footerCtaRef.current.getBoundingClientRect();
    const x = ((clientX - left) / width - 0.5) * 40;
    const y = ((clientY - top) / height - 0.5) * 40;
    gsap.to(".marquee-text", { x: -x, y: -y, duration: 1, ease: "power2.out" });
    gsap.to(".cta-content", { x: x * 0.5, y: y * 0.5, duration: 1, ease: "power2.out" });
    gsap.to(".cta-glow", { opacity: 1, x: clientX - left, y: clientY - top, duration: 0.3 });
  };

  const handleCtaMouseLeave = () => {
    if (window.innerWidth < 768) return;
    gsap.to([".marquee-text", ".cta-content"], { x: 0, y: 0, duration: 1, ease: "power3.out" });
    gsap.to(".cta-glow", { opacity: 0, duration: 0.5 });
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white overflow-x-hidden font-['Montserrat',sans-serif]">
      
      {/* ══════════════════════════════════════════════════
          1. CINEMATIC HERO SECTION
      ══════════════════════════════════════════════════ */}
      <section ref={heroWrapperRef} className="relative h-[90vh] md:h-screen w-full flex items-center justify-center overflow-hidden">
        
        <div ref={heroImageRef} className="absolute inset-0 z-0">
          <img src={premiumHeroBg} alt="Mountains" className="hero-parallax-bg w-full h-full object-cover scale-110 opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-[#050505]" />
        </div>

        <div className="absolute z-10 flex flex-col items-center pointer-events-none px-4 w-full mt-[-10vh] md:mt-0">
          <p className="hero-fade text-white/70 text-[10px] md:text-xs tracking-[6px] md:tracking-[10px] uppercase mb-4 text-center">
            Welcome to Trippanther
          </p>
          <h1 className="text-[18vw] md:text-[12vw] font-black uppercase leading-[0.9] md:leading-[0.8] tracking-tighter mix-blend-overlay text-center w-full">
            <SplitText text="WANDER" />
            <br className="md:hidden" />
            <SplitText text="BEYOND" className="md:ml-[10vw]" />
          </h1>
        </div>

        <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 right-6 md:right-10 flex flex-col-reverse md:flex-row justify-between items-start md:items-end z-20 hero-fade gap-6">
          <div className="max-w-xs md:max-w-sm">
            <p className="text-xs md:text-sm text-white/60 leading-relaxed font-light">
              Premium travel experiences crafted for those who seek the extraordinary.
            </p>
          </div>
          
          {/* Added breathe-animation class for mobile */}
          {/* Updated Explore Button with Navigation */}
<button 
  ref={magneticBtn} 
  onClick={() => navigate('/packages')} 
  className="breathe-animation md:breathe-none h-16 w-16 md:h-24 md:w-24 rounded-full bg-white text-black flex items-center justify-center text-[10px] md:text-xs font-bold tracking-[2px] md:tracking-widest uppercase hover:scale-105 transition-transform duration-300 self-end"
>
  Explore
</button>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          2. THE PHILOSOPHY
      ══════════════════════════════════════════════════ */}
      <section className="py-24 md:py-40 px-6 md:px-10 container mx-auto">
        <div className="max-w-5xl mx-auto text-center reveal-up">
          <p className="text-white/40 uppercase tracking-[5px] text-[10px] md:text-xs mb-6 md:mb-8">The Philosophy</p>
          <h2 className="text-3xl md:text-6xl font-light leading-snug md:leading-tight font-['Playfair_Display',serif]">
            We don't just plan trips. We orchestrate <span className="font-bold italic">Symphonies of Adventure</span> that linger in your memory forever.
          </h2>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          3. RESPONSIVE PACKAGES 
      ══════════════════════════════════════════════════ */}
      <section ref={horizontalRef} className="w-full bg-[#0a0a0a] md:flex md:items-center relative overflow-hidden py-20 md:py-0 md:h-screen">
        
        <div className="md:absolute top-10 left-10 z-10 px-6 md:px-0 mb-10 md:mb-0 reveal-up md:reveal-none">
          <h2 className="text-4xl md:text-5xl font-['Playfair_Display',serif] text-white">
            Curated <br className="hidden md:block"/><span className="text-white/40 italic">Journeys</span>
          </h2>
        </div>

        <div ref={horizontalContainerRef} className="flex flex-col md:flex-row h-auto md:h-[70vh] w-full md:w-[300vw] items-center gap-24 md:gap-0 pb-10 md:pb-0">
          
          {/* Package 1 */}
          <div className="horizontal-panel w-full md:w-screen flex justify-center items-center px-6 md:px-10 mobile-reveal md:reveal-none">
            <div className="w-full max-w-4xl flex flex-col md:flex-row gap-8 md:gap-10 items-center">
              <div className="w-full md:w-1/2 h-[45vh] md:h-[50vh] overflow-hidden rounded-xl shadow-2xl">
                {/* mobile-parallax-img class targets image inside box on mobile */}
                <img src={p1} alt="Kasol" className="mobile-parallax-img md:scale-100 w-full h-full object-cover md:hover:scale-110 transition-transform duration-1000" />
              </div>
              <div className="w-full md:w-1/2 space-y-4 md:space-y-6 text-center md:text-left">
                <p className="text-white/40 tracking-[4px] text-[10px] md:text-xs uppercase">01 // Bestseller</p>
                <h3 className="text-4xl md:text-5xl font-['Playfair_Display',serif]">Kasol & Manali</h3>
                <p className="text-white/60 font-light leading-relaxed text-sm md:text-base">Experience the pristine valleys, riverside camps, and the mystical aura of the Himalayas in absolute luxury.</p>
                <button className="border-b border-white pb-1 text-[10px] md:text-xs uppercase tracking-widest hover:text-gray-400 transition-colors mt-4 md:mt-0">View Itinerary</button>
              </div>
            </div>
          </div>

          {/* Package 2 */}
          <div className="horizontal-panel w-full md:w-screen flex justify-center items-center px-6 md:px-10 mobile-reveal md:reveal-none">
            <div className="w-full max-w-4xl flex flex-col md:flex-row-reverse gap-8 md:gap-10 items-center">
              <div className="w-full md:w-1/2 h-[45vh] md:h-[50vh] overflow-hidden rounded-xl shadow-2xl">
                <img src={p2} alt="Bali" className="mobile-parallax-img md:scale-100 w-full h-full object-cover md:hover:scale-110 transition-transform duration-1000" />
              </div>
              <div className="w-full md:w-1/2 space-y-4 md:space-y-6 text-center md:text-right">
                <p className="text-white/40 tracking-[4px] text-[10px] md:text-xs uppercase">02 // Romantic</p>
                <h3 className="text-4xl md:text-5xl font-['Playfair_Display',serif]">Bali Escape</h3>
                <p className="text-white/60 font-light leading-relaxed text-sm md:text-base">Private oceanfront villas, intimate candlelit dinners, and spiritual rejuvenation in the Island of Gods.</p>
                <button className="border-b border-white pb-1 text-[10px] md:text-xs uppercase tracking-widest hover:text-gray-400 transition-colors mt-4 md:mt-0">View Itinerary</button>
              </div>
            </div>
          </div>

          {/* Package 3 */}
          <div className="horizontal-panel w-full md:w-screen flex justify-center items-center px-6 md:px-10 mobile-reveal md:reveal-none">
            <div className="w-full max-w-4xl flex flex-col md:flex-row gap-8 md:gap-10 items-center">
              <div className="w-full md:w-1/2 h-[45vh] md:h-[50vh] overflow-hidden rounded-xl shadow-2xl">
                <img src={p3} alt="Ladakh" className="mobile-parallax-img md:scale-100 w-full h-full object-cover md:hover:scale-110 transition-transform duration-1000" />
              </div>
              <div className="w-full md:w-1/2 space-y-4 md:space-y-6 text-center md:text-left">
                <p className="text-white/40 tracking-[4px] text-[10px] md:text-xs uppercase">03 // Adventure</p>
                <h3 className="text-4xl md:text-5xl font-['Playfair_Display',serif]">Ladakh Expedition</h3>
                <p className="text-white/60 font-light leading-relaxed text-sm md:text-base">Conquer the high passes and marvel at Pangong Lake from the comfort of our premium heated camps.</p>
                <button className="border-b border-white pb-1 text-[10px] md:text-xs uppercase tracking-widest hover:text-gray-400 transition-colors mt-4 md:mt-0">View Itinerary</button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          4. SERVICES GRID
      ══════════════════════════════════════════════════ */}
      <section className="py-24 md:py-40 bg-[#050505]">
        <div className="container mx-auto px-6 md:px-10">
          <div className="text-center mb-16 md:mb-20 reveal-up">
            <h2 className="text-4xl md:text-5xl font-['Playfair_Display',serif]">The <span className="italic text-white/50">Experience</span></h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            {[
              { t: "Boutique Stays", i: HotelIcon, d: "Handpicked properties that blend local culture with world-class luxury." },
              { t: "Seamless Travel", i: BusIcon, d: "From private transfers to luxury coaches, travel in absolute comfort." },
              { t: "Exclusive Access", i: PlaneIcon, d: "Skip the lines and explore hidden gems known only to locals." }
            ].map((srv, i) => (
              <TiltCard key={i} className="mobile-reveal md:reveal-up relative p-8 md:p-10 bg-[#0a0a0a] border border-white/5 rounded-2xl hover:border-white/20 transition-colors duration-500 group cursor-pointer text-center md:text-left">
                <div className="mb-6 md:mb-8 flex justify-center md:justify-start text-white/50 group-hover:text-white transition-colors duration-500">
                  <srv.i />
                </div>
                <h3 className="text-xl md:text-2xl font-['Playfair_Display',serif] mb-3 md:mb-4">{srv.t}</h3>
                <p className="text-white/40 text-xs md:text-sm leading-relaxed">{srv.d}</p>
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-white group-hover:w-full transition-all duration-700 ease-out hidden md:block" />
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          5. TESTIMONIALS (Elfsight Added Here)
      ══════════════════════════════════════════════════ */}
      <section className="py-20 md:py-32 bg-[#0a0a0a] border-t border-white/5">
        <div className="container mx-auto px-4 md:px-10">
          <div className="text-center mb-12 md:mb-20 reveal-up">
            <p className="text-white/40 uppercase tracking-[4px] text-[10px] md:text-xs mb-4">Traveler Stories</p>
            <h2 className="text-4xl md:text-5xl font-['Playfair_Display',serif]">Client <span className="italic text-white/50">Review</span></h2>
          </div>
          <div className="reveal-up max-w-6xl mx-auto rounded-2xl overflow-hidden">
            <script src="https://elfsightcdn.com/platform.js" async></script>
            <div className="elfsight-app-ee2d939e-4759-48a1-9c4a-d2cc8e4fc323" data-elfsight-app-lazy></div>
          </div>
        </div>
      </section>

{/* ══════════════════════════════════════════════════
    6. GRAND CTA SECTION (Mobile Optimized & 100% Bug Free)
══════════════════════════════════════════════════ */}
<section 
  ref={footerCtaRef} 
  onMouseMove={handleCtaMouseMove} 
  onMouseLeave={handleCtaMouseLeave} 
  className="h-[70vh] md:h-screen flex flex-col items-center justify-center bg-[#050505] relative overflow-hidden px-6 group cursor-pointer" 
 onClick={() => window.open("https://wa.me/919243585890?text=Hi%20TripPanther,%20I%20am%20interested%20in%20booking%20a%20premium%20journey.%20Can%20we%20connect?", "_blank")}
>
  
  {/* Subtle radial glow (Auto-pulses on mobile, follows mouse on PC) */}
  <div className="cta-glow mobile-pulse-glow absolute h-64 w-64 md:h-96 md:w-96 rounded-full bg-white opacity-10 md:opacity-0 blur-[100px] md:blur-[150px] pointer-events-none md:-translate-x-1/2 md:-translate-y-1/2 transition-opacity duration-500 z-0" />

  {/* Marquee text background */}
  <div className="marquee-text absolute inset-0 z-0 flex items-center whitespace-nowrap opacity-30 md:opacity-20 md:group-hover:opacity-30 transition-opacity duration-1000 select-none pointer-events-none">
    <h1 className="text-[15vh] md:text-[30vh] font-black uppercase leading-none marquee-content text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.6)" }}>
      LET'S TALK // TRIPPANTHER // LET'S TALK // TRIPPANTHER // LET'S TALK // TRIPPANTHER // 
    </h1>
  </div>
  
  {/* Main Content */}
  <div className="cta-content z-10 text-center relative w-full">
    <p className="grand-cta-reveal text-white/50 tracking-[3px] md:tracking-[5px] text-[9px] md:text-sm uppercase mb-6">
      Want to create something extraordinary?
    </p>
    
    {/* FIX: overflow-hidden yahan se hata kar seedha H2 me daal diya taaki conflict na ho */}
    <div className="inline-block mb-8 md:mb-10 group-hover:scale-105 transition-transform duration-500">
      
      {/* FIX: H2 me overflow-hidden aur pb-2 daala taaki italic font neeche se na kate */}
      <h2 className="text-5xl sm:text-6xl md:text-[10vw] font-['Playfair_Display',serif] font-normal leading-none italic text-white md:group-hover:text-gray-300 transition-colors overflow-hidden pb-2">
        {`Let's Talk.`.split("").map((char, i) => (
          <span key={i} className="grand-cta-char inline-block">
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h2>
      
      {/* Line is always visible on mobile, animated on PC */}
      <div className="w-full h-[1px] md:h-[2px] bg-white scale-x-100 md:scale-x-0 md:group-hover:scale-x-100 origin-center transition-transform duration-700 ease-out mt-1 opacity-50 md:opacity-100" />
    </div>

    <p className="grand-cta-reveal text-white/40 text-[11px] md:text-base max-w-sm md:max-w-lg mx-auto leading-relaxed font-light transition-colors md:group-hover:text-white/60">
      Allow us to orchestrate an unforgettable journey tailored exclusively to your desires. Your sanctuary awaits.
    </p>
    
    <div className="mt-10 md:mt-14 grand-cta-reveal flex justify-center">
      <div className="inline-flex items-center gap-3 px-6 py-3 md:px-8 md:py-3.5 border border-white/20 text-white md:hover:bg-white md:hover:text-black transition-all duration-500 rounded-full font-medium text-[9px] md:text-xs tracking-[2px] uppercase">
        Book a Consultation →
      </div>
    </div>
  </div>
</section>

      {/* Global Styles for Mobile Polish */}
      <style>{`
        body { background-color: #050505; color: #fff; }
        ::-webkit-scrollbar { width: 4px; }
        @media (min-width: 768px) { ::-webkit-scrollbar { width: 8px; } }
        ::-webkit-scrollbar-track { background: #050505; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #555; }
        * { box-sizing: border-box; }
        ::selection { background: #fff; color: #000; }
        
        /* Mobile Specific Animations */
        @keyframes breathe {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4); }
          50% { transform: scale(1.05); box-shadow: 0 0 20px 0 rgba(255, 255, 255, 0.1); }
        }
        @media (max-width: 767px) {
          .breathe-animation { animation: breathe 3s ease-in-out infinite; }
        }
        
        /* Elfsight invert if needed for dark mode */
        .elfsight-app-ee2d939e-4759-48a1-9c4a-d2cc8e4fc323 {
           filter: invert(9) hue-rotate(180deg) opacity(0.9);
           mix-blend-mode: screen;
        }
          @keyframes marquee { 
  0% { transform: translateX(0); } 
  100% { transform: translateX(-50%); } 
}
.marquee-content { 
  animation: marquee 25s linear infinite; /* Thoda fast kiya taaki smooth lage */
  width: 250vw; 
  display: flex; 
}

/* Mobile par bina mouse ke background glow breathe karega */
@keyframes mobilePulse {
  0%, 100% { opacity: 0.05; transform: scale(1); }
  50% { opacity: 0.15; transform: scale(1.2); }
}

@media (max-width: 767px) {
  .mobile-pulse-glow {
    animation: mobilePulse 4s ease-in-out infinite;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
      `}</style>
    </div>
  );
}
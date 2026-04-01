import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── 3D Tilt Card (same as Home) ──────────────────────────────────────────
function TiltCard({ children, className = "", onClick }) {
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
      gsap.to(glowRef.current, { background: `radial-gradient(circle at ${px}% ${py}%, rgba(245,158,11,0.16) 0%, transparent 70%)`, duration: 0.3 });
    }
  };
  const handleLeave = () => {
    gsap.to(ref.current, { rotationY: 0, rotationX: 0, duration: 0.6, ease: "elastic.out(1,0.4)" });
    if (glowRef.current) gsap.to(glowRef.current, { background: "transparent", duration: 0.4 });
  };
  return (
    <div ref={ref} className={className} onMouseMove={handleMove} onMouseLeave={handleLeave} onClick={onClick}
      style={{ transformStyle: "preserve-3d", willChange: "transform", cursor: onClick ? "pointer" : "default" }}>
      <div ref={glowRef} className="absolute inset-0 rounded-2xl pointer-events-none z-10" />
      {children}
    </div>
  );
}

// ─── Animated Counter ──────────────────────────────────────────────────────
function Counter({ end, suffix = "", prefix = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    ScrollTrigger.create({
      trigger: el, start: "top 85%", once: true,
      onEnter: () => gsap.fromTo({ val: 0 }, { val: end }, {
        duration: 2, ease: "power2.out",
        onUpdate: function () { if (el) el.textContent = prefix + Math.round(this.targets()[0].val) + suffix; }
      }),
    });
  }, [end, suffix, prefix]);
  return <span ref={ref}>{prefix}0{suffix}</span>;
}

// ─── Magnetic Hook ─────────────────────────────────────────────────────────
function useMagnetic(strength = 0.4) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const dx = (e.clientX - (rect.left + rect.width / 2)) * strength;
      const dy = (e.clientY - (rect.top + rect.height / 2)) * strength;
      gsap.to(el, { x: dx, y: dy, duration: 0.4, ease: "power2.out" });
    };
    const onLeave = () => gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.5)" });
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); };
  }, [strength]);
  return ref;
}

export default function About() {
  const { openBooking } = useApp();
  const heroRef = useRef(null);
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const ctaBtn = useMagnetic(0.5);
  const storyBtn = useMagnetic(0.5);

  // ─── Custom Cursor ─────────────────────────────────────────────────────
  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    const onMove = (e) => {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.05 });
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.18, ease: "power2.out" });
    };
    const onEnter = () => gsap.to(cursor, { scale: 2.5, borderColor: "#F59E0B", duration: 0.25 });
    const onLeave = () => gsap.to(cursor, { scale: 1, borderColor: "rgba(255,255,255,0.6)", duration: 0.25 });
    window.addEventListener("mousemove", onMove);
    document.querySelectorAll("a,button").forEach(el => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // ─── Master Animations ─────────────────────────────────────────────────
  useEffect(() => {
    // Hero entrance
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(".hero-eyebrow", { y: 30, opacity: 0, letterSpacing: "0.5em" },
      { y: 0, opacity: 1, letterSpacing: "0.2em", duration: 1, ease: "power3.out" })
      .fromTo(".hero-title-line",
        { y: 120, opacity: 0, skewY: 6 },
        { y: 0, opacity: 1, skewY: 0, duration: 1.1, stagger: 0.15, ease: "expo.out" }, "-=0.5")
      .fromTo(".hero-desc",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }, "-=0.5")
      .fromTo(".hero-btn-wrap",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "back.out(1.5)" }, "-=0.5");

    // Mouse parallax — 3 layers
    const handleMouse = (e) => {
      const xP = e.clientX / window.innerWidth - 0.5;
      const yP = e.clientY / window.innerHeight - 0.5;
      gsap.to(".parallax-layer-1", { x: xP * 45, y: yP * 45, duration: 1.2, ease: "power2.out" });
      gsap.to(".parallax-layer-2", { x: xP * 22, y: yP * 22, duration: 1.2, ease: "power2.out" });
      gsap.to(".parallax-layer-3", { x: xP * 9, y: yP * 9, duration: 1.2, ease: "power2.out" });
      gsap.to(".hero-content-layer", { x: xP * 14, y: yP * 12, duration: 1.2, ease: "power2.out" });
      gsap.to(".hero-float-badge", { x: xP * 32, y: yP * 28, duration: 1.2, ease: "power2.out" });
    };
    // window.addEventListener("mousemove", handleMouse);

    // BG scroll parallax
    gsap.to(".parallax-bg-img", {
      yPercent: 30, ease: "none",
      scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1 },
    });

    // Floating particles
    gsap.to(".floating-particle", {
      y: "random(-50,50)", x: "random(-50,50)",
      duration: "random(4,8)", repeat: -1, yoyo: true,
      ease: "sine.inOut", stagger: { each: 0.15, from: "random" },
    });

    // Section title skew-reveal
    gsap.utils.toArray(".section-title").forEach(el => {
      gsap.fromTo(el, { y: 60, opacity: 0, skewY: 3 },
        { y: 0, opacity: 1, skewY: 0, duration: 1, ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" } });
    });

    // Draw lines
    gsap.utils.toArray(".draw-line").forEach(el => {
      gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "expo.out", transformOrigin: "left",
        scrollTrigger: { trigger: el, start: "top 90%" } });
    });

    // Scroll cards 3D flip
    gsap.utils.toArray(".scroll-card").forEach((card, i) => {
      gsap.fromTo(card,
        { y: 80, opacity: 0, rotationX: 20, transformPerspective: 900, scale: 0.95 },
        { y: 0, opacity: 1, rotationX: 0, scale: 1, duration: 0.9, delay: (i % 3) * 0.1, ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 88%", toggleActions: "play none none reverse" } });
    });

    // Story section — split slide
    gsap.fromTo(".story-left",
      { x: -80, opacity: 0, rotationY: -12 },
      { x: 0, opacity: 1, rotationY: 0, duration: 1.2, ease: "expo.out",
        scrollTrigger: { trigger: ".story-section", start: "top 80%" } });
    gsap.fromTo(".story-right",
      { x: 80, opacity: 0, rotationY: 12 },
      { x: 0, opacity: 1, rotationY: 0, duration: 1.2, ease: "expo.out",
        scrollTrigger: { trigger: ".story-section", start: "top 80%" } });

    // Stat bars
    gsap.utils.toArray(".stat-bar").forEach(bar => {
      gsap.fromTo(bar, { scaleX: 0 }, { scaleX: 1, duration: 1.5, ease: "expo.out", transformOrigin: "left",
        scrollTrigger: { trigger: bar, start: "top 85%", once: true } });
    });

    // Timeline items stagger
    gsap.utils.toArray(".timeline-item").forEach((item, i) => {
      gsap.fromTo(item,
        { x: i % 2 === 0 ? -60 : 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: "expo.out",
          scrollTrigger: { trigger: item, start: "top 85%", toggleActions: "play none none reverse" } });
    });

    return () => {
      // window.removeEventListener("mousemove", handleMouse);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  // ─── DATA ──────────────────────────────────────────────────────────────
  const stats = [
    { num: 10000, suffix: "+", label: "Happy Travelers", icon: "😊" },
    { num: 150, suffix: "+", label: "Destinations", icon: "🌍" },
    { num: 4.9, suffix: "★", label: "Avg Rating", icon: "⭐" },
    { num: 3, suffix: " Yrs", label: "Experience", icon: "🏆" },
  ];

  const milestones = [
  { 
    year: "2024", 
    title: "Born in Indore", 
    desc: "Aman & Chetan, while trekking in Indore, Madhya Pradesh, decided to build a travel company that sells transformation — not just tickets." 
  },
  { 
    year: "2024", 
    title: "First Clients", 
    desc: "Started with a few travelers. Word of mouth kicked in early, and referrals became our strongest growth driver." 
  },
  { 
    year: "2025", 
    title: "Growing Community", 
    desc: "Built a strong base of happy travelers through curated trips, personalized experiences, and consistent service." 
  },
  { 
    year: "2025", 
    title: "Trips Expansion", 
    desc: "Expanded into multiple destinations and crafted unique itineraries focused on experience, not just travel." 
  },
  { 
    year: "2026", 
    title: "Digital Expansion", 
    desc: "Launched our platform with seamless booking, personalized itinerary planning, and 24/7 customer support." 
  }
];

  const lovePoints = [
    { title: "Personalized Experiences", desc: "Every itinerary is crafted just for you — no templates, no shortcuts.", stat: "100% Custom", icon: "✍️",
      image: "https://images.unsplash.com/photo-1522199710521-72d69614c702?w=600&h=400&fit=crop" },
    { title: "Expert Local Guides", desc: "Our guides are passionate locals who know every hidden gem.", stat: "50+ Experts", icon: "🧭",
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&h=400&fit=crop" },
    { title: "24/7 On-Trip Support", desc: "We're always just a message away. Whatever happens, we have your back.", stat: "Always Available", icon: "📞",
      image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&h=400&fit=crop" },
    { title: "Best Price Guarantee", desc: "Premium experiences at honest prices. No hidden fees, no surprises.", stat: "Price Match", icon: "💎",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=400&fit=crop" },
    { title: "Sustainable Travel", desc: "We partner with eco-friendly stays and support local communities.", stat: "Eco-Certified", icon: "🌿",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop" },
    { title: "Seamless Booking", desc: "From inquiry to boarding, we handle every detail so you just enjoy.", stat: "Stress-Free", icon: "🚀",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop" },
  ];

  const founders = [
    { name: "Aman Patel", role: "Founder & CEO", emoji: "🧗", gradient: "from-amber-400 to-orange-600",
      quote: "Travel is my religion. I started TripPanther to share the transformative power of exploration with the world.",
      bio: "A mountain lover and serial explorer, Aman has trekked across 40+ countries before building TripPanther.", trips: 40 },
    { name: "Chetan Patel", role: "Co-Founder · Head of Experiences", emoji: "🌏", gradient: "from-blue-400 to-purple-600",
      quote: "Every journey should feel like it was designed just for you. That's the magic we create every day.",
      bio: "With a background in luxury hospitality, Chetan ensures every TripPanther experience exceeds expectations.", trips: 35 },
  ];

  return (
    <div className="bg-[#070E1A] min-h-screen text-white overflow-x-hidden">

      {/* ── Custom Cursor ── */}
    

      {/* ── Floating Particles ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(60)].map((_, i) => (
          <div key={i} className="floating-particle absolute rounded-full"
            style={{
              width: `${Math.random() * 3 + 1}px`, height: `${Math.random() * 3 + 1}px`,
              background: i % 3 === 0 ? "rgba(245,158,11,0.4)" : i % 3 === 1 ? "rgba(59,130,246,0.3)" : "rgba(255,255,255,0.15)",
              top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`,
            }} />
        ))}
      </div>

      {/* ══════════════════════════════════════════════════
          HERO — 3-Layer Parallax
      ══════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">

        {/* Layer 1 — Far BG */}
        <div className="parallax-layer-1 absolute inset-0 z-0 scale-125">
          <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=90"
            alt="About Hero" className="parallax-bg-img w-full h-full object-cover" />
        </div>

        {/* Layer 2 — Atmospheric overlay */}
        <div className="parallax-layer-2 absolute inset-0 z-[1]">
          <div className="absolute inset-0 bg-gradient-to-r from-[#070E1A]/95 via-[#070E1A]/75 to-[#070E1A]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070E1A] via-transparent to-transparent" />
          <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-amber-500/8 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-blue-500/8 rounded-full blur-[80px] animate-pulse delay-1000" />
        </div>

        {/* Layer 3 — Grid */}
        <div className="parallax-layer-3 absolute inset-0 z-[2] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(245,158,11,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(245,158,11,0.03) 1px,transparent 1px)", backgroundSize: "80px 80px" }} />

        {/* Floating Badge */}
        <div className="hero-float-badge absolute top-1/4 right-16 z-10 hidden lg:block">
          <div className="relative p-[1px] rounded-2xl" style={{ background: "linear-gradient(135deg,rgba(245,158,11,0.6),rgba(59,130,246,0.3))" }}>
            <div className="bg-[#070E1A]/80 backdrop-blur-xl rounded-2xl px-6 py-5 text-center">
              <div className="text-3xl font-black text-amber-400">Since</div>
              <div className="text-5xl font-black text-white">2024</div>
              <div className="text-xs text-white/50 mt-1 tracking-widest uppercase">Est. Indore</div>
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="hero-content-layer relative z-10 container-custom pt-24">
          <div className="max-w-4xl">
            <p className="hero-eyebrow text-amber-400 text-xs tracking-[0.25em] font-semibold uppercase mb-6 opacity-0">
              ✦ Our Story
            </p>
            <div className="overflow-hidden mb-2">
              <h1 className="hero-title-line font-black text-[clamp(3rem,8vw,6.5rem)] leading-[1.0] opacity-0" style={{ fontFamily: "'Georgia', serif" }}>
                We Don't Just
              </h1>
            </div>
            <div className="overflow-hidden mb-2">
              <h1 className="hero-title-line font-black text-[clamp(3rem,8vw,6.5rem)] leading-[1.0] opacity-0 text-transparent"
                style={{ fontFamily: "'Georgia', serif", WebkitTextStroke: "2px #F59E0B" }}>
                Book Trips.
              </h1>
            </div>
            <div className="overflow-hidden mb-8">
              <h1 className="hero-title-line font-black text-[clamp(3rem,8vw,6.5rem)] leading-[1.0] opacity-0" style={{ fontFamily: "'Georgia', serif" }}>
                We Architect Lives.
              </h1>
            </div>
            <p className="hero-desc text-white/65 text-lg md:text-xl max-w-xl leading-relaxed mb-10 opacity-0">
              Born mid-trek in Spiti Valley, 2016. Two friends, one mission — <span className="text-amber-400 font-medium">to turn travel into transformation.</span>
            </p>
            <div className="flex flex-wrap gap-5">
              <div className="hero-btn-wrap opacity-0">
                <button ref={ctaBtn} onClick={() => openBooking()}
                  className="group relative px-10 py-4 rounded-full font-bold text-sm tracking-wide overflow-hidden"
                  style={{ background: "linear-gradient(135deg, #F59E0B, #EF4444)" }}>
                  <span className="relative z-10 flex items-center gap-2">Start Your Journey
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </div>
              <div className="hero-btn-wrap opacity-0">
                {/* <button ref={storyBtn}
                  className="group flex items-center gap-3 px-8 py-4 rounded-full border border-white/25 hover:border-amber-400/60 text-sm font-semibold backdrop-blur-sm transition-all duration-300">
                  <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-amber-400/20 transition-colors text-xs ml-0.5">▶</span>
                  Watch Our Story
                </button> */}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-5 h-8 border border-white/30 rounded-full flex justify-center pt-1.5">
            <div className="w-0.5 h-2 bg-amber-400 rounded-full animate-scroll-line" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          STATS
      ══════════════════════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#070E1A] via-[#0A192F] to-[#070E1A]" />
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="scroll-card relative text-center p-8 rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm overflow-hidden group hover:border-amber-400/30 transition-colors duration-500">
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400/60 stat-bar" style={{ transformOrigin: "left" }} />
                <div className="text-3xl mb-3">{s.icon}</div>
                <div className="text-4xl font-black text-amber-400 mb-1">
                  <Counter end={s.num} suffix={s.suffix} />
                </div>
                <div className="text-white/50 text-sm tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          OUR STORY — Split Layout
      ══════════════════════════════════════════════════ */}
      <section className="story-section py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#070E1A] to-[#0A192F]" />
        <div className="container-custom relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <div className="story-left">
              <p className="text-amber-400 text-xs tracking-[0.3em] uppercase mb-4">Our Journey</p>
              <h2 className="section-title text-5xl md:text-6xl font-black mb-6" style={{ fontFamily: "'Georgia', serif" }}>
                From the <em className="not-italic text-transparent" style={{ WebkitTextStroke: "1.5px #F59E0B" }}>Himalayas</em><br />to the World
              </h2>
              <div className="draw-line w-24 h-0.5 bg-amber-400/60 mb-8" />
              <p className="text-white/60 text-lg leading-relaxed mb-5">
                TripPanther was born in 2024, mid-trek in Indore. Founders <span className="font-bold text-white">Aman Patel</span> and <span className="font-bold text-white">Chetan Patel</span> realized most agencies sell destinations — not transformations.
              </p>
              <p className="text-white/45 leading-relaxed mb-10">
                Like the panther — agile, precise, deeply attuned to its terrain — we move through the world with knowledge, purpose, and an unwavering standard of excellence.
              </p>
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
                {[["40+", "Countries Explored"], ["1000+", "Custom Trips"], ["100%", "Satisfaction"]].map(([num, label], i) => (
                  <div key={i}>
                    <div className="text-3xl font-black text-amber-400">{num}</div>
                    <div className="text-white/40 text-xs mt-1">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right */}
            <div className="story-right relative">
              <TiltCard className="relative rounded-2xl overflow-hidden shadow-2xl group border border-white/8">
                <img src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=800&q=85"
                  alt="Himalayan Trek" className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070E1A]/80 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <span className="text-xs text-amber-400 tracking-widest uppercase">Spiti Valley, 2016</span>
                  <p className="text-white font-black text-lg mt-1">Where It All Began</p>
                </div>
              </TiltCard>
              {/* Floating Info Card */}
              <div className="absolute -bottom-6 -left-6 bg-[#0A192F] border border-amber-400/30 rounded-2xl shadow-2xl p-5 flex items-center gap-4 backdrop-blur-xl">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-xl">🏔️</div>
                <div>
                  <p className="text-white font-bold text-sm">Born in the Himalayas</p>
                  <p className="text-white/40 text-xs">Established · Indore · 2016</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          TIMELINE — Zigzag
      ══════════════════════════════════════════════════ */}
      <section className="py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F] to-[#070E1A]" />
        <div className="container-custom relative z-10">
          <div className="text-center mb-20">
            <p className="text-amber-400 text-xs tracking-[0.3em] uppercase mb-4">Our Path</p>
            <h2 className="section-title text-5xl md:text-6xl font-black" style={{ fontFamily: "'Georgia', serif" }}>
              The <em className="not-italic text-transparent" style={{ WebkitTextStroke: "1.5px #F59E0B" }}>Milestones</em>
            </h2>
            <div className="draw-line w-24 h-0.5 bg-amber-400/60 mx-auto mt-5" />
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Center Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-amber-400/40 to-transparent hidden md:block" />

            {milestones.map((m, i) => (
              <div key={i} className={`timeline-item relative flex gap-8 mb-12 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} flex-col`}>
                {/* Content */}
                <div className="flex-1">
                  <TiltCard className="relative p-7 rounded-2xl bg-white/3 border border-white/8 hover:border-amber-400/30 transition-colors duration-500 shadow-xl">
                    <div className="text-amber-400 text-xs tracking-[0.2em] uppercase font-bold mb-2">{m.year}</div>
                    <h3 className="text-xl font-black text-white mb-3">{m.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{m.desc}</p>
                  </TiltCard>
                </div>
                {/* Center Dot */}
                <div className="hidden md:flex items-center justify-center flex-shrink-0 w-8">
                  <div className="w-4 h-4 rounded-full bg-amber-400 border-4 border-[#070E1A] relative z-10 shadow-lg shadow-amber-400/50" />
                </div>
                {/* Spacer for alternating side */}
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          WHY TRAVELERS LOVE US
      ══════════════════════════════════════════════════ */}
      <section className="py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#070E1A] to-[#0A192F]" />
        <div className="container-custom relative z-10">
          <div className="text-center mb-20">
            <p className="text-amber-400 text-xs tracking-[0.3em] uppercase mb-4">Why Travelers Love Us</p>
            <h2 className="section-title text-5xl md:text-6xl font-black" style={{ fontFamily: "'Georgia', serif" }}>
              We Create <em className="not-italic text-transparent" style={{ WebkitTextStroke: "1.5px #F59E0B" }}>Memories</em>
            </h2>
            <div className="draw-line w-24 h-0.5 bg-amber-400/60 mx-auto mt-5" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {lovePoints.map((point, i) => (
              <TiltCard key={i} className="scroll-card relative group rounded-2xl overflow-hidden border border-white/8 bg-white/3 shadow-2xl hover:border-amber-400/30 transition-colors duration-500">
                <div className="relative h-52 overflow-hidden">
                  <img src={point.image} alt={point.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070E1A] via-[#070E1A]/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <span className="text-2xl">{point.icon}</span>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-400 text-[#070E1A] tracking-wide">{point.stat}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-black text-white mb-2 group-hover:text-amber-400 transition-colors duration-300">{point.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{point.desc}</p>
                  <div className="mt-4 flex items-center gap-2 text-amber-400 text-sm font-bold opacity-0 group-hover:opacity-100 group-hover:gap-3 transition-all duration-300">
                    <span>Learn more</span><span>→</span>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          FOUNDERS
      ══════════════════════════════════════════════════ */}
      <section className="py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F] to-[#070E1A]" />
        <div className="container-custom relative z-10">
          <div className="text-center mb-20">
            <p className="text-amber-400 text-xs tracking-[0.3em] uppercase mb-4">The Visionaries</p>
            <h2 className="section-title text-5xl md:text-6xl font-black" style={{ fontFamily: "'Georgia', serif" }}>
              Meet Our <em className="not-italic text-transparent" style={{ WebkitTextStroke: "1.5px #F59E0B" }}>Founders</em>
            </h2>
            <div className="draw-line w-24 h-0.5 bg-amber-400/60 mx-auto mt-5" />
            <p className="text-white/40 mt-6 max-w-xl mx-auto text-sm">Two passionate travelers who turned their dream into India's most exciting travel brand.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {founders.map((founder, i) => (
              <TiltCard key={i} className="scroll-card relative rounded-2xl overflow-hidden border border-white/8 bg-white/3 shadow-2xl hover:border-amber-400/30 transition-colors duration-500 group">
                {/* Visual Header */}
                <div className={`relative h-64 bg-gradient-to-br ${founder.gradient} flex items-center justify-center overflow-hidden`}>
                  <div className="text-[8rem] opacity-25 group-hover:scale-110 transition-transform duration-700">{founder.emoji}</div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070E1A]/80 to-transparent" />
                  <div className="absolute bottom-4 right-4">
                    <div className="bg-[#070E1A]/60 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2 text-center">
                      <div className="text-2xl font-black text-amber-400">{founder.trips}+</div>
                      <div className="text-[10px] text-white/50">Countries</div>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-black text-white mb-1">{founder.name}</h3>
                  <p className="text-amber-400 text-xs tracking-[0.15em] uppercase font-semibold mb-5">{founder.role}</p>
                  <div className="w-12 h-0.5 bg-amber-400/60 mb-5" />
                  <p className="text-white/60 italic text-sm leading-relaxed mb-4">"{founder.quote}"</p>
                  <p className="text-white/35 text-xs leading-relaxed">{founder.bio}</p>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CTA
      ══════════════════════════════════════════════════ */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/8 via-[#070E1A] to-blue-500/8" />
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, rgba(245,158,11,0.06) 0%, transparent 70%)" }} />
        {/* Grid */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(245,158,11,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(245,158,11,0.03) 1px,transparent 1px)", backgroundSize: "80px 80px" }} />
        <div className="container-custom relative z-10 text-center">
          <p className="text-amber-400 text-xs tracking-[0.3em] uppercase mb-5">Ready to Explore?</p>
          <h2 className="section-title text-5xl md:text-7xl font-black mb-6" style={{ fontFamily: "'Georgia', serif" }}>
            Your Journey<br />
            <em className="not-italic text-transparent" style={{ WebkitTextStroke: "2px #F59E0B" }}>Starts Now</em>
          </h2>
          <p className="text-white/50 text-lg mb-12 max-w-xl mx-auto">Join thousands of happy travelers who discovered the world with TripPanther.</p>
          <div className="flex justify-center gap-5 flex-wrap">
            <button onClick={() => openBooking()}
              className="group relative px-12 py-5 rounded-full font-black text-[#070E1A] text-sm tracking-wide overflow-hidden shadow-2xl"
              style={{ background: "linear-gradient(135deg, #F59E0B, #EF4444)" }}>
              <span className="relative z-10 flex items-center gap-2">Plan Your Adventure
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
              <div className="absolute inset-0 bg-white/25 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
            </button>
            <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer"
              className="flex items-center gap-3 px-10 py-5 rounded-full border border-green-400/40 text-green-400 hover:bg-green-400/10 text-sm font-bold transition-all duration-300">
              💬 Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes scrollLine {
          0%,100% { opacity:0.3; transform:scaleY(0.5) translateY(0); }
          50% { opacity:1; transform:scaleY(1) translateY(4px); }
        }
        .animate-scroll-line { animation: scrollLine 2s ease-in-out infinite; }
        ::selection { background:rgba(245,158,11,0.3); color:#fff; }
      `}</style>
    </div>
  );
}
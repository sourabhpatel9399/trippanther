import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

// Import assets
import heroBgImage from "../assets/backgroundpng.png";
import hotelServiceImg from "../assets/three_card/hotel.webp";
import transportServiceImg from "../assets/three_card/bus.jpg";
import tourServiceImg from "../assets/three_card/tour.webp";
import bikingImg from "../assets/three_card/trekking.webp";
import luxuryStayImg from "../assets/three_card/stay.jpg";
import campingImg from "../assets/three_card/camping.jpg";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// ─── SVG Icons (replacing emojis) ──────────────────────────────────────────
const HotelIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" width={36} height={36}>
    <path d="M3 22V8a1 1 0 011-1h16a1 1 0 011 1v14"/><path d="M2 22h20"/>
    <path d="M9 22V12h6v10"/><rect x="9" y="4" width="6" height="4" rx="1"/>
  </svg>
);
const BusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" width={36} height={36}>
    <rect x="2" y="5" width="20" height="13" rx="2"/><path d="M2 10h20M7 18v2m10-2v2"/>
    <circle cx="7" cy="15" r="1" fill="currentColor"/><circle cx="17" cy="15" r="1" fill="currentColor"/>
  </svg>
);
const PlaneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" width={36} height={36}>
    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
  </svg>
);
const BikeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" width={36} height={36}>
    <circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/>
    <path d="M15 6a1 1 0 100-2 1 1 0 000 2zm-3 11.5L9 10l-3 .5M15 6l-3 5.5-4.5 1m7.5-6.5l2 5.5"/>
  </svg>
);
const PalmIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" width={36} height={36}>
    <path d="M12 22V12m0 0C12 7 8 4 4 5c0 4 3 7 8 7zm0 0c0-5 4-8 8-7-1 4-4 7-8 7z"/>
  </svg>
);
const TentIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" width={36} height={36}>
    <path d="M3 20L12 4l9 16H3z"/><path d="M9 20l3-8 3 8"/>
  </svg>
);
const CompassIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" width={44} height={44}>
    <circle cx="12" cy="12" r="10"/><path d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z"/>
  </svg>
);
const EditIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" width={44} height={44}>
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const PinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" width={44} height={44}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const SupportIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" width={44} height={44}>
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
  </svg>
);
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={20} height={20}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

// ─── Magnetic Button Hook ───────────────────────────────────────────────────
function useMagnetic(strength = 0.4) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      gsap.to(el, { x: dx, y: dy, duration: 0.4, ease: "power2.out" });
    };
    const onLeave = () => gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.5)" });
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); };
  }, [strength]);
  return ref;
}

// ─── 3D Tilt Card ──────────────────────────────────────────────────────────
// FIX: throttled with requestAnimationFrame to prevent jank
function TiltCard({ children, className = "", onClick }) {
  const ref = useRef(null);
  const glowRef = useRef(null);
  const rafRef = useRef(null);

  const handleMove = (e) => {
    if (rafRef.current) return; // throttle to 1 call per rAF
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotY = ((x - cx) / cx) * 10;
      const rotX = -((y - cy) / cy) * 10;
      gsap.to(el, { rotationY: rotY, rotationX: rotX, transformPerspective: 900, duration: 0.25, ease: "power2.out", overwrite: "auto" });
      if (glowRef.current) {
        const px = (x / rect.width) * 100;
        const py = (y / rect.height) * 100;
        glowRef.current.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(245,158,11,0.15) 0%, transparent 70%)`;
      }
    });
  };

  const handleLeave = () => {
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
    gsap.to(ref.current, { rotationY: 0, rotationX: 0, duration: 0.5, ease: "power2.out", overwrite: "auto" });
    if (glowRef.current) glowRef.current.style.background = "transparent";
  };

  return (
    <div ref={ref} className={className} onMouseMove={handleMove} onMouseLeave={handleLeave} onClick={onClick}
      style={{ transformStyle: "preserve-3d", willChange: "transform", cursor: "pointer" }}>
      <div ref={glowRef} className="absolute inset-0 rounded-2xl pointer-events-none z-10" style={{ transition: "background 0.3s" }} />
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
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => gsap.fromTo({ val: 0 }, { val: end }, {
        duration: 2, ease: "power2.out",
        onUpdate: function () { if (el) el.textContent = prefix + Math.round(this.targets()[0].val) + suffix; }
      }),
    });
  }, [end, suffix, prefix]);
  return <span ref={ref}>{prefix}0{suffix}</span>;
}

export default function Home() {
  const navigate = useNavigate();
  const { openBooking } = useApp();
  const testimonialsRef = useRef(null);
  const heroRef = useRef(null);
  const [activeFaq, setActiveFaq] = useState(null);

  const exploreBtn = useMagnetic(0.5);
  const storyBtn = useMagnetic(0.5);

  const scrollToTestimonials = () => testimonialsRef.current?.scrollIntoView({ behavior: "smooth" });

  // ─── Master GSAP Timeline ──────────────────────────────────────────────
  useEffect(() => {
    // FIX: set will-change only where needed, remove after animation
    gsap.set(".hero-title-line, .hero-eyebrow, .hero-desc, .hero-btn-wrap, .hero-stat", { willChange: "transform, opacity" });

    const tl = gsap.timeline({ delay: 0.2, onComplete: () => {
      // FIX: release will-change after entrance animation completes
      gsap.set(".hero-title-line, .hero-eyebrow, .hero-desc, .hero-btn-wrap, .hero-stat", { willChange: "auto" });
    }});

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
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "back.out(1.5)" }, "-=0.5")
      .fromTo(".hero-stat",
        { y: 40, opacity: 0, scale: 0.85 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.1, ease: "back.out(1.4)" }, "-=0.4")
      .fromTo(".scroll-indicator",
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0, duration: 0.8 }, "-=0.3");

    // FIX: floating particles reduced + use CSS animation instead of GSAP for 90 nodes
    // Only animate first 30 particles with GSAP, rest are CSS-only
    const particles = document.querySelectorAll(".floating-particle");
    const gsapParticles = Array.from(particles).slice(0, 30);
    if (gsapParticles.length) {
      gsap.to(gsapParticles, {
        y: "random(-40, 40)", x: "random(-40, 40)",
        duration: "random(5, 9)", repeat: -1, yoyo: true,
        ease: "sine.inOut", stagger: { each: 0.2, from: "random" },
      });
    }

    // FIX: scroll parallax on BG — scrub keeps it smooth
    gsap.to(".parallax-bg-img", {
      yPercent: 25, ease: "none",
      scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 2 },
    });

    // Section title reveals
    gsap.utils.toArray(".section-title").forEach(el => {
      gsap.fromTo(el,
        { y: 60, opacity: 0, skewY: 3 },
        { y: 0, opacity: 1, skewY: 0, duration: 1, ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" } });
    });

    // FIX: batch scroll-cards — much cheaper than individual ScrollTriggers
    ScrollTrigger.batch(".scroll-card", {
      start: "top 88%",
      onEnter: batch => gsap.fromTo(batch,
        { y: 60, opacity: 0, rotationX: 15, transformPerspective: 900, scale: 0.96 },
        { y: 0, opacity: 1, rotationX: 0, scale: 1, duration: 0.8, stagger: 0.08, ease: "power3.out", overwrite: "auto" }),
      onLeave: batch => gsap.to(batch, { opacity: 0, y: -20, duration: 0.3, overwrite: "auto" }),
      onEnterBack: batch => gsap.to(batch, { opacity: 1, y: 0, duration: 0.4, overwrite: "auto" }),
      onLeaveBack: batch => gsap.fromTo(batch,
        { opacity: 1 },
        { y: 60, opacity: 0, duration: 0.3, overwrite: "auto" }),
    });

    // Feature cards horizontal slide
    gsap.utils.toArray(".feature-card").forEach((card, i) => {
      gsap.fromTo(card,
        { x: i % 2 === 0 ? -50 : 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "expo.out",
          scrollTrigger: { trigger: card, start: "top 88%", toggleActions: "play none none reverse" } });
    });

    // Marquee pause on hover
    const marquee = document.querySelector(".animate-marquee-slow");
    if (marquee) {
      marquee.addEventListener("mouseenter", () => marquee.style.animationPlayState = "paused");
      marquee.addEventListener("mouseleave", () => marquee.style.animationPlayState = "running");
    }

    // Draw lines
    gsap.utils.toArray(".draw-line").forEach(el => {
      gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "expo.out", transformOrigin: "left",
        scrollTrigger: { trigger: el, start: "top 90%", once: true } });
    });

    // Stat bars
    gsap.utils.toArray(".stat-bar").forEach(bar => {
      gsap.fromTo(bar, { scaleX: 0 }, { scaleX: 1, duration: 1.5, ease: "expo.out", transformOrigin: "left",
        scrollTrigger: { trigger: bar, start: "top 85%", once: true } });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  // ─── DATA ──────────────────────────────────────────────────────────────
  const services = [
    { img: hotelServiceImg, title: "Hotel Reservation", Icon: HotelIcon, desc: "Handpicked luxury stays, boutique hotels & budget-friendly gems." },
    { img: transportServiceImg, title: "Transport Services", Icon: BusIcon, desc: "Seamless airport transfers, private cabs & luxury car rentals." },
    { img: tourServiceImg, title: "Tour Packages", Icon: PlaneIcon, desc: "Curated experiences to the world's most breathtaking destinations." },
  ];

  const activities = [
    { img: bikingImg, title: "Mountain Trekking", Icon: BikeIcon, desc: "Hit thrilling trails through our epic mountain trekking tours." },
    { img: luxuryStayImg, title: "Luxury Stays", Icon: PalmIcon, desc: "From cozy cabins to 5-star resorts — find your perfect sanctuary." },
    { img: campingImg, title: "Camping Adventures", Icon: TentIcon, desc: "Set up under a million stars with our premium camping gear." },
  ];

  const packages = [
    { name: "Kashmir Paradise", days: "5N/6D", price: "₹18,999", image: "https://images.pexels.com/photos/7743323/pexels-photo-7743323.jpeg?w=600&auto=compress", highlights: "Houseboat · Shikara Ride · Gulmarg", badge: "Bestseller" },
    { name: "Bali Honeymoon", days: "6N/7D", price: "₹39,999", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600", highlights: "Private Villa · Candlelight · Spa", badge: "Romantic" },
    { name: "Rajasthan Royal", days: "7N/8D", price: "₹24,999", image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600", highlights: "Palace Stays · Camel Safari · Forts", badge: "Heritage" },
    { name: "Ladakh Adventure", days: "8N/9D", price: "₹32,999", image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=600", highlights: "Pangong Lake · Nubra · Bike Trip", badge: "Thrill" },
  ];

  const galleryImages = [
    { url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400", title: "Mountain View" },
    { url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400", title: "Himalayan Peak" },
    { url: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400", title: "Beach Paradise" },
    { url: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400", title: "Bali Rice Fields" },
    { url: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=400", title: "Rajasthan Fort" },
    { url: "https://images.unsplash.com/photo-1574914629385-46448b0aecd6?w=400", title: "Ladakh Lake" },
  ];

  const features = [
    { Icon: CompassIcon, title: "Expert Travel Guides", desc: "Awesome tips and local hacks for an unforgettable trip!" },
    { Icon: EditIcon, title: "Customizable Itineraries", desc: "Turn your trip into your very own adventure!" },
    { Icon: PinIcon, title: "Handpicked Destinations", desc: "Discover the wildest and most unique spots on earth!" },
    { Icon: SupportIcon, title: "24/7 Customer Support", desc: "Reliable team ready to help you whenever you need!" },
  ];

  const faqs = [
    { q: "How do I book a trip with TripPanther?", a: "Booking is simple! Browse our website, choose your destination, and follow the easy checkout process. Our team confirms within 2 hours." },
    { q: "Can I customize my travel itinerary?", a: "Absolutely! We offer fully personalized itineraries to match your preferences, budget, and travel style." },
    { q: "Is TripPanther eco-friendly?", a: "Yes! We prioritize sustainable tourism and minimize our carbon footprint with every trip we plan." },
    { q: "What happens if I need to cancel?", a: "We offer flexible cancellation and rescheduling policies for complete peace of mind. No hidden charges." },
  ];

  const stats = [
    { num: 5000, suffix: "+", label: "Happy Travelers" },
    { num: 50, suffix: "+", label: "Destinations" },
    { num: 3, suffix: " Yrs", label: "Experience" },
    { num: 99, suffix: "%", label: "Satisfaction" },
  ];

  return (
    <div className="bg-[#070E1A] min-h-screen text-white overflow-x-hidden">

      {/* ── Floating Particles — reduced to 40, CSS-animated beyond 30 ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(40)].map((_, i) => (
          <div key={i} className="floating-particle absolute rounded-full"
            style={{
              width: `${Math.random() * 2.5 + 1}px`,
              height: `${Math.random() * 2.5 + 1}px`,
              background: i % 3 === 0 ? "rgba(245,158,11,0.35)" : i % 3 === 1 ? "rgba(59,130,246,0.25)" : "rgba(255,255,255,0.15)",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              // CSS fallback animation for particles 30+
              animation: i >= 30 ? `floatCSS ${5 + (i % 4)}s ease-in-out ${i * 0.1}s infinite alternate` : "none",
            }} />
        ))}
      </div>

      {/* ══════════════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        {/* FIX: contain:strict on layer 1 limits repaint area */}
        <div className="parallax-layer-1 absolute inset-0 z-0 scale-125" style={{ contain: "strict" }}>
          <img src={heroBgImage} alt="" className="parallax-bg-img w-full h-full object-cover" style={{ willChange: "transform" }} />
        </div>
        <div className="parallax-layer-2 absolute inset-0 z-[1]">
          <div className="absolute inset-0 bg-gradient-to-r from-[#070E1A]/95 via-[#070E1A]/75 to-[#070E1A]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070E1A] via-transparent to-transparent" />
          <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] animate-pulse delay-1000" />
        </div>
        <div className="parallax-layer-3 absolute inset-0 z-[2] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(245,158,11,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(245,158,11,0.03) 1px,transparent 1px)", backgroundSize: "80px 80px" }} />

        <div className="floating-badge absolute top-1/4 right-16 z-10 hidden lg:block">
          <div className="relative p-[1px] rounded-2xl"
            style={{ background: "linear-gradient(135deg, rgba(245,158,11,0.6), rgba(59,130,246,0.3))" }}>
            <div className="bg-[#070E1A]/80 backdrop-blur-xl rounded-2xl px-6 py-5 text-center">
              <div className="text-3xl font-black text-amber-400"><Counter end={5000} suffix="+" /></div>
              <div className="text-xs text-white/60 mt-1 tracking-widest uppercase">Trips Crafted</div>
            </div>
          </div>
        </div>

        <div className="hero-content-layer relative z-10 container-custom pt-24">
          <div className="max-w-4xl">
            <p className="hero-eyebrow text-amber-400 text-xs tracking-[0.25em] font-semibold uppercase mb-6 opacity-0">
              ✦ Premium Travel Experiences
            </p>
            <div className="overflow-hidden mb-2">
              <h1 className="hero-title-line font-black text-[clamp(3rem,8vw,6.5rem)] leading-[1.0] opacity-0" style={{ fontFamily: "'Georgia', serif" }}>Let Us Turn</h1>
            </div>
            <div className="overflow-hidden mb-2">
              <h1 className="hero-title-line font-black text-[clamp(3rem,8vw,6.5rem)] leading-[1.0] opacity-0 text-transparent"
                style={{ fontFamily: "'Georgia', serif", WebkitTextStroke: "2px #F59E0B" }}>Your Dreams</h1>
            </div>
            <div className="overflow-hidden mb-8">
              <h1 className="hero-title-line font-black text-[clamp(3rem,8vw,6.5rem)] leading-[1.0] opacity-0" style={{ fontFamily: "'Georgia', serif" }}>Into Reality</h1>
            </div>
            <p className="hero-desc text-white/65 text-lg md:text-xl max-w-lg leading-relaxed mb-10 opacity-0">
              Explore more, worry less. We handle everything — <span className="text-amber-400 font-medium">so you just live the moment.</span>
            </p>
            <div className="flex flex-wrap gap-5">
              <div className="hero-btn-wrap opacity-0">
                <button ref={exploreBtn} onClick={() => openBooking()}
                  className="group relative px-10 py-4 rounded-full font-bold text-sm tracking-wide overflow-hidden"
                  style={{ background: "linear-gradient(135deg, #F59E0B, #EF4444)" }}>
                  <span className="relative z-10 flex items-center gap-2">Explore Now
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </div>
              <div className="hero-btn-wrap opacity-0">
                <button ref={storyBtn} onClick={()=>navigate('/about')}
                  className="group flex items-center gap-3 px-8 py-4 rounded-full border border-white/25 hover:border-amber-400/60 text-sm font-semibold backdrop-blur-sm transition-all duration-300">
                  <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-amber-400/20 transition-colors">
                    <span className="text-xs ml-0.5">▶</span>
                  </span>
                  Watch Our Story
                </button>
              </div>
            </div>
            <div className="flex gap-8 mt-14">
              {["5000+ Travelers", "50+ Destinations", "3 Years"].map((s, i) => (
                <div key={i} className="hero-stat opacity-0">
                  <div className="text-amber-400 font-black text-xl">{s.split(" ")[0]}</div>
                  <div className="text-white/40 text-xs mt-0.5">{s.split(" ").slice(1).join(" ")}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 z-10 opacity-0 flex flex-col items-center gap-2">
          <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-5 h-8 border border-white/30 rounded-full flex justify-center pt-1.5">
            <div className="w-0.5 h-2 bg-amber-400 rounded-full animate-scroll-line" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          STATS COUNTER SECTION
      ══════════════════════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#070E1A] via-[#0A192F] to-[#070E1A]" />
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="scroll-card relative text-center p-8 rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm overflow-hidden group hover:border-amber-400/30 transition-colors duration-500">
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400/60 stat-bar" style={{ transformOrigin: "left" }} />
                <div className="text-4xl font-black text-amber-400 mb-1"><Counter end={s.num} suffix={s.suffix} /></div>
                <div className="text-white/50 text-sm tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          RATING BADGE
      ══════════════════════════════════════════════════ */}
      <div className="container-custom pb-10 flex justify-center">
        <div onClick={scrollToTestimonials}
          className="rating-card group inline-flex items-center gap-5 px-8 py-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md cursor-pointer hover:border-amber-400/40 transition-all duration-500 shadow-xl hover:shadow-amber-400/10">
          <img src="https://img.icons8.com/?size=96&id=17949&format=png" alt="Google" className="h-8 w-auto brightness-0 invert" />
          <div>
            <div className="flex gap-0.5">{"★★★★★".split("").map((s, i) => <span key={i} className="text-amber-400 text-base">{s}</span>)}</div>
            <p className="text-white/55 text-xs mt-0.5">5/5 Rating · Click to see reviews</p>
          </div>
          <span className="text-amber-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          SERVICES SECTION
      ══════════════════════════════════════════════════ */}
      <section className="py-28 relative">
        <div className="container-custom">
          <div className="text-center mb-20">
            <p className="section-eyebrow text-amber-400 text-xs tracking-[0.3em] uppercase mb-4">What We Offer</p>
            <h2 className="section-title text-5xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Georgia', serif" }}>
              Our <em className="not-italic text-transparent" style={{ WebkitTextStroke: "1.5px #F59E0B" }}>Services</em>
            </h2>
            <div className="draw-line w-24 h-0.5 bg-amber-400/60 mx-auto mt-5" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <TiltCard key={i} className="scroll-card relative group rounded-2xl overflow-hidden border border-white/8 bg-white/3 shadow-2xl hover:border-amber-400/30 transition-colors duration-500" onClick={() => openBooking({ title: service.title })}>
                <div className="relative h-64 overflow-hidden">
                  <img src={service.img} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070E1A] via-[#070E1A]/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-amber-400 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                    <service.Icon />
                  </div>
                </div>
                <div className="p-7">
                  <h3 className="text-xl font-black text-white mb-3 group-hover:text-amber-400 transition-colors duration-300">{service.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{service.desc}</p>
                  <button className="mt-5 text-amber-400 text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                    Learn More <span className="text-xs">→</span>
                  </button>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          MARQUEE
      ══════════════════════════════════════════════════ */}
      <div className="relative py-5 overflow-hidden border-y border-white/6">
        <div className="absolute inset-0 bg-gradient-to-r from-[#070E1A] via-transparent to-[#070E1A] z-10 pointer-events-none" />
        <div className="relative overflow-hidden">
          <div className="flex whitespace-nowrap animate-marquee-slow">
            {[...Array(2)].map((_, rep) =>
              ["Kashmir", "Bali", "Rajasthan", "Ujjain", "Patal Pani", "Maheshwar", "Jaisalmer", "Kedarnath", "Goa", "Manali", "Ladakh", "Varanasi", "Jaipur", "Maldives", "Switzerland"].map((loc, i) => (
                <div key={`${rep}-${i}`} className="flex items-center gap-4 mx-6 group cursor-pointer">
                  <span className="text-amber-400/50 text-[10px]">✦</span>
                  <span className="text-sm font-semibold text-white/55 group-hover:text-amber-400 transition-colors duration-300 tracking-[0.1em] uppercase">{loc}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          PACKAGES
      ══════════════════════════════════════════════════ */}
      <section className="py-28 bg-gradient-to-b from-[#070E1A] to-[#0A192F]">
        <div className="container-custom">
          <div className="text-center mb-20">
            <p className="text-amber-400 text-xs tracking-[0.3em] uppercase mb-4">Popular Tours</p>
            <h2 className="section-title text-5xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Georgia', serif" }}>
              Best <em className="not-italic text-transparent" style={{ WebkitTextStroke: "1.5px #F59E0B" }}>Packages</em>
            </h2>
            <div className="draw-line w-24 h-0.5 bg-amber-400/60 mx-auto mt-5" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg, i) => (
              <TiltCard key={i} className="scroll-card relative group rounded-2xl overflow-hidden border border-white/8 bg-white/3 shadow-xl hover:border-amber-400/30 hover:shadow-amber-400/10 transition-all duration-500" onClick={() => openBooking({ title: pkg.name })}>
                <div className="relative h-52 overflow-hidden">
                  <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070E1A] to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-400 text-[#070E1A] tracking-wide">{pkg.badge}</span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">{pkg.days}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-black text-white mb-1 group-hover:text-amber-400 transition-colors duration-300">{pkg.name}</h3>
                  <p className="text-white/40 text-xs mb-4">{pkg.highlights}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-amber-400 font-black text-lg">{pkg.price}</span>
                    <button className="text-xs font-bold text-[#070E1A] bg-amber-400 hover:bg-amber-300 px-4 py-1.5 rounded-full transition-colors duration-300">Book →</button>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
          <div className="text-center mt-14">
            <Link to="/packages" className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-amber-400/50 text-amber-400 hover:bg-amber-400 hover:text-[#070E1A] text-sm font-bold transition-all duration-300">
              View All Packages →
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          ACTIVITIES
      ══════════════════════════════════════════════════ */}
      <section className="py-28">
        <div className="container-custom">
          <div className="text-center mb-20">
            <p className="text-amber-400 text-xs tracking-[0.3em] uppercase mb-4">Popular Activities</p>
            <h2 className="section-title text-5xl md:text-6xl font-black" style={{ fontFamily: "'Georgia', serif" }}>
              Adventure <em className="not-italic text-transparent" style={{ WebkitTextStroke: "1.5px #F59E0B" }}>Awaits</em>
            </h2>
            <div className="draw-line w-24 h-0.5 bg-amber-400/60 mx-auto mt-5" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {activities.map((act, i) => (
              <TiltCard key={i} className="scroll-card relative group rounded-2xl overflow-hidden border border-white/8 bg-white/3 shadow-2xl hover:border-amber-400/30 transition-colors duration-500">
                <div className="relative h-64 overflow-hidden">
                  <img src={act.img} alt={act.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070E1A] via-[#070E1A]/20 to-transparent" />
                  <div className="absolute inset-0 bg-amber-400/0 group-hover:bg-amber-400/5 transition-colors duration-500" />
                  <div className="absolute top-4 right-4 text-amber-400 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                    <act.Icon />
                  </div>
                </div>
                <div className="p-7">
                  <h3 className="text-xl font-black text-white mb-3 group-hover:text-amber-400 transition-colors duration-300">{act.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{act.desc}</p>
                  <button className="mt-5 text-amber-400 text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition-all duration-300">Learn More <span>→</span></button>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          WHY CHOOSE US
      ══════════════════════════════════════════════════ */}
      <section className="py-28 bg-gradient-to-t from-[#070E1A] to-[#0A192F]">
        <div className="container-custom">
          <div className="text-center mb-20">
            <p className="text-amber-400 text-xs tracking-[0.3em] uppercase mb-4">Why TripPanther</p>
            <h2 className="section-title text-5xl md:text-6xl font-black" style={{ fontFamily: "'Georgia', serif" }}>
              Trusted By <em className="not-italic text-transparent" style={{ WebkitTextStroke: "1.5px #F59E0B" }}>Thousands</em>
            </h2>
            <div className="draw-line w-24 h-0.5 bg-amber-400/60 mx-auto mt-5" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="feature-card group relative p-8 rounded-2xl bg-white/3 border border-white/8 hover:border-amber-400/40 transition-all duration-500 hover:-translate-y-1 text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-amber-400/0 to-amber-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                <div className="flex justify-center mb-5 text-white/50 group-hover:text-amber-400 transition-all duration-300 group-hover:scale-110">
                  <f.Icon />
                </div>
                <h3 className="text-base font-black text-white mb-2 group-hover:text-amber-400 transition-colors duration-300">{f.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{f.desc}</p>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400/0 group-hover:bg-amber-400/60 transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════════════ */}
      <section ref={testimonialsRef} className="py-28">
        <div className="container-custom">
          <div className="text-center mb-20">
            <p className="text-amber-400 text-xs tracking-[0.3em] uppercase mb-4">Traveler Stories</p>
            <h2 className="section-title text-5xl md:text-6xl font-black" style={{ fontFamily: "'Georgia', serif" }}>
              Stories That <em className="not-italic text-transparent" style={{ WebkitTextStroke: "1.5px #F59E0B" }}>Inspire</em>
            </h2>
            <div className="draw-line w-24 h-0.5 bg-amber-400/60 mx-auto mt-5" />
          </div>
          <script src="https://elfsightcdn.com/platform.js" async></script>
          <div className="elfsight-app-ee2d939e-4759-48a1-9c4a-d2cc8e4fc323" data-elfsight-app-lazy></div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════════ */}
      <section className="py-28 bg-gradient-to-b from-[#070E1A] to-[#0A192F]">
        <div className="container-custom">
          <div className="text-center mb-20">
            <p className="text-amber-400 text-xs tracking-[0.3em] uppercase mb-4">FAQ</p>
            <h2 className="section-title text-5xl md:text-6xl font-black" style={{ fontFamily: "'Georgia', serif" }}>
              Common <em className="not-italic text-transparent" style={{ WebkitTextStroke: "1.5px #F59E0B" }}>Questions</em>
            </h2>
            <div className="draw-line w-24 h-0.5 bg-amber-400/60 mx-auto mt-5" />
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="scroll-card rounded-2xl border border-white/8 bg-white/3 overflow-hidden transition-all duration-300 hover:border-amber-400/20">
                <button className="w-full text-left px-7 py-5 flex justify-between items-center gap-4"
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                  <span className="font-semibold text-white text-sm">{faq.q}</span>
                  <span className={`text-amber-400 text-lg transition-transform duration-300 flex-shrink-0 ${activeFaq === i ? "rotate-45" : "rotate-0"}`}>+</span>
                </button>
                <div className={`overflow-hidden transition-all duration-500 ${activeFaq === i ? "max-h-40 pb-5 px-7" : "max-h-0"}`}>
                  <p className="text-white/50 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          GALLERY — commented out as in original
      ══════════════════════════════════════════════════ */}
      {/* <section className="py-28">...</section> */}

      {/* ══════════════════════════════════════════════════
          CTA SECTION
      ══════════════════════════════════════════════════ */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/8 via-[#070E1A] to-blue-500/8" />
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, rgba(245,158,11,0.06) 0%, transparent 70%)" }} />
        <div className="container-custom relative z-10 text-center">
          <p className="text-amber-400 text-xs tracking-[0.3em] uppercase mb-5">Ready to Explore?</p>
          <h2 className="section-title text-5xl md:text-7xl font-black mb-6" style={{ fontFamily: "'Georgia', serif" }}>
            Your Next<br />
            <em className="not-italic text-transparent" style={{ WebkitTextStroke: "2px #F59E0B" }}>Adventure Awaits</em>
          </h2>
          <p className="text-white/50 text-lg mb-12 max-w-xl mx-auto">Stop dreaming. Start exploring. Let TripPanther craft your perfect escape today.</p>
          <div className="flex justify-center gap-5 flex-wrap">
            <button onClick={() => openBooking()}
              className="group relative px-12 py-5 rounded-full font-black text-[#070E1A] text-sm tracking-wide overflow-hidden shadow-2xl"
              style={{ background: "linear-gradient(135deg, #F59E0B, #EF4444)" }}>
              <span className="relative z-10 flex items-center gap-2">Book Your Trip
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
              <div className="absolute inset-0 bg-white/25 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
            </button>
            <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer"
              className="flex items-center gap-3 px-10 py-5 rounded-full border border-green-400/40 text-green-400 hover:bg-green-400/10 text-sm font-bold transition-all duration-300">
              <WhatsAppIcon />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes marqueeSlow {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-slow {
          animation: marqueeSlow 40s linear infinite;
          width: fit-content;
        }
        @keyframes scrollLine {
          0%, 100% { opacity: 0.3; transform: scaleY(0.5) translateY(0); }
          50% { opacity: 1; transform: scaleY(1) translateY(4px); }
        }
        .animate-scroll-line {
          animation: scrollLine 2s ease-in-out infinite;
        }
        @keyframes floatCSS {
          from { transform: translate(0, 0); }
          to   { transform: translate(20px, -25px); }
        }
        .group-hover\\:scale-115:hover { transform: scale(1.15); }
        * { box-sizing: border-box; }
        ::selection { background: rgba(245,158,11,0.3); color: #fff; }
      `}</style>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { gsap } from 'gsap';
import LOGO from '../assets/logo_hd.png';

const NAV_LINKS = [
  { path: '/', name: 'Home' },
  { path: '/about', name: 'About' },
  { path: '/services', name: 'Services' },
  { path: '/packages', name: 'Packages' },
  { path: '/contact', name: 'Contact' },
];

// ── SVG Icons ─────────────────────────────────────────────────────────────
const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} width={22} height={22}>
    <path d="M3 12L12 3l9 9" /><path d="M9 21V12h6v9" />
  </svg>
);
const AboutIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} width={22} height={22}>
    <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
);
const ServicesIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} width={22} height={22}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);
const PackagesIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} width={22} height={22}>
    <path d="M16 6l-4-4-4 4" /><rect x="4" y="6" width="16" height="14" rx="2" />
  </svg>
);
const ContactIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} width={22} height={22}>
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
  </svg>
);
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={20} height={20}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={20} height={20}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8z" />
  </svg>
);
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231z" />
  </svg>
);
const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={20} height={20}>
    <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
  </svg>
);

const NAV_ICONS = {
  '/': HomeIcon,
  '/about': AboutIcon,
  '/services': ServicesIcon,
  '/packages': PackagesIcon,
  '/contact': ContactIcon,
};

const SOCIAL_LINKS = [
  { Icon: FacebookIcon, label: 'Facebook', href: 'https://www.facebook.com/share/1AwagDGqJH/', hoverBg: 'hover:bg-blue-600' },
  { Icon: InstagramIcon, label: 'Instagram', href: 'https://www.instagram.com/trippanther_?igsh=cWVjNWhzcXFmdHg0', hoverBg: 'hover:bg-pink-600' },
  { Icon: TwitterIcon, label: 'Twitter', href: '#', hoverBg: 'hover:bg-sky-500' },
  { Icon: YouTubeIcon, label: 'YouTube', href: '#', hoverBg: 'hover:bg-red-600' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { openBooking } = useApp();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) {
      gsap.fromTo('.mobile-menu-card', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: 'back.out(1.2)' });
      gsap.fromTo('.mobile-menu-item', { x: -40, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.06, duration: 0.4, ease: 'power3.out', delay: 0.1 });
      gsap.fromTo('.mobile-social-item', { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.07, duration: 0.35, ease: 'power2.out', delay: 0.45 });
    }
  }, [menuOpen]);

  return (
    <>
      {/* ══════════════════════════════════════════════════
          NAVBAR — Floating Glass Pill
      ══════════════════════════════════════════════════ */}
      <div className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${scrolled ? 'pt-2' : 'pt-3'}`}>
        <div className={`mx-3 md:mx-8 transition-all duration-500 rounded-2xl ${
          scrolled
            ? 'bg-white/85 shadow-[0_8px_40px_rgba(0,0,0,0.12),0_1px_0_rgba(255,255,255,0.9)_inset] border border-white/70'
            : 'bg-white/65 shadow-[0_4px_24px_rgba(0,0,0,0.08),0_1px_0_rgba(255,255,255,0.8)_inset] border border-white/55'
          }`}
          style={{ backdropFilter: 'blur(24px) saturate(180%)', WebkitBackdropFilter: 'blur(24px) saturate(180%)' }}
        >
          {/* Top shimmer line */}
          <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent rounded-full" />

          <div className="flex items-center justify-between px-5 md:px-8 py-3">

            {/* ── Logo ── */}
            <Link to="/" className="group flex items-center flex-shrink-0">
              <img
                src={LOGO}
                alt="TripPanther"
                className="h-12 w-auto object-contain transition-all duration-500 group-hover:scale-105 drop-shadow-sm"
                style={{ maxHeight: '48px' }}
              />
            </Link>

            {/* ── Desktop Nav ── */}
            <ul className="hidden md:flex items-center gap-7">
              {NAV_LINKS.map((link) => (
                <li key={link.path} className="relative group">
                  <Link
                    to={link.path}
                    className={`text-sm font-semibold tracking-wide transition-colors duration-300 ${
                      location.pathname === link.path
                        ? 'text-amber-600'
                        : 'text-gray-500 hover:text-amber-600'
                    }`}
                  >
                    {link.name}
                  </Link>
                  <span className={`absolute -bottom-1 left-0 h-[2px] rounded-full bg-gradient-to-r from-amber-500 to-orange-400 transition-all duration-300 ${
                    location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </li>
              ))}
            </ul>

            {/* ── Right: Book Now + Hamburger ── */}
            <div className="flex items-center gap-3">

              {/* Book Now */}
              <button
                onClick={() => openBooking()}
                className="hidden md:flex group relative overflow-hidden items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold text-white transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #F59E0B, #EF4444)',
                  boxShadow: '0 4px 16px rgba(245,158,11,0.4)',
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Book Now
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-white/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>

              {/* Hamburger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
                className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50/80 border border-gray-200/80 hover:border-amber-400/50 hover:bg-amber-50/60 transition-all duration-300 shadow-sm"
              >
                <div className="w-5 h-[14px] flex flex-col justify-between">
                  <span className={`block h-0.5 bg-gray-500 rounded-full transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
                  <span className={`block h-0.5 bg-gray-500 rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
                  <span className={`block h-0.5 bg-gray-500 rounded-full transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
                </div>
              </button>
            </div>
          </div>

          {/* Bottom shimmer — only when scrolled */}
          <div className={`absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent rounded-full transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'}`} />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          MOBILE MENU — Full Screen Dark
      ══════════════════════════════════════════════════ */}
      <div className={`fixed inset-0 z-[999] md:hidden transition-all duration-400 ${
        menuOpen ? 'opacity-100 pointer-events-auto visible' : 'opacity-0 pointer-events-none invisible'
      }`}>
        <div className="absolute inset-0 bg-[#070E1A]/97 backdrop-blur-2xl" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-amber-400/6 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none opacity-25"
          style={{ backgroundImage: "linear-gradient(rgba(245,158,11,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(245,158,11,0.04) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="mobile-menu-card relative z-10 flex flex-col h-full">

          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-20 pb-5 border-b border-white/8">
            
            {/* <img src={LOGO} alt="TripPanther" className="h-10 w-auto brightness-0 invert" /> */}
            {/* <button
              onClick={() => setMenuOpen(false)}
              className="w-10 h-10 rounded-full bg-white/8 border border-white/12 flex items-center justify-center hover:bg-amber-400/20 hover:border-amber-400/40 transition-all duration-300"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button> */}
          </div>

          {/* Nav Links */}
          <div className="flex-1 px-5 py-6 overflow-y-auto">
            <p className="text-white/25 text-[10px] tracking-[0.3em] uppercase mb-4 px-2">Navigation</p>
            <div className="space-y-2">
              {NAV_LINKS.map((link) => {
                const IconComp = NAV_ICONS[link.path];
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className={`mobile-menu-item flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${
                      isActive
                        ? 'bg-amber-400/12 border border-amber-400/30'
                        : 'border border-transparent hover:bg-white/6 hover:border-white/10'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      isActive ? 'bg-amber-400 text-[#070E1A]' : 'bg-white/8 text-white/60 group-hover:bg-white/15 group-hover:text-white'
                    }`}>
                      <IconComp />
                    </div>
                    <span className={`text-lg font-bold flex-1 transition-colors duration-300 ${
                      isActive ? 'text-amber-400' : 'text-white/80 group-hover:text-white'
                    }`}>
                      {link.name}
                    </span>
                    {isActive && (
                      <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Bottom CTA + Socials */}
          <div className="px-5 pb-10 pt-5 border-t border-white/8 space-y-5">
            <button
              onClick={() => { openBooking(); setMenuOpen(false); }}
              className="group relative w-full flex items-center justify-between px-6 py-4 rounded-2xl font-black overflow-hidden transition-all duration-300 hover:scale-[1.02]"
              style={{ background: 'linear-gradient(135deg, #F59E0B, #EF4444)', boxShadow: '0 0 30px rgba(245,158,11,0.25)' }}
            >
              <span className="relative z-10 flex items-center gap-3 text-[#070E1A]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={22} height={22}>
                  <path d="M22 16.92V19a2 2 0 01-2.18 2A19.79 19.79 0 013 4.18 2 2 0 015 2h2.09a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
                <span className="text-base">Book Your Adventure</span>
              </span>
              <svg className="w-5 h-5 text-[#070E1A] relative z-10 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            <div>
              <p className="text-white/25 text-[10px] tracking-[0.3em] uppercase mb-3 text-center">Follow Us</p>
              <div className="flex justify-center gap-3">
                {SOCIAL_LINKS.map(({ Icon, label, href, hoverBg }, i) => (
                  <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                    aria-label={label} title={label}
                    className={`mobile-social-item w-12 h-12 rounded-full bg-white/8 border border-white/12 flex items-center justify-center text-white transition-all duration-300 ${hoverBg} hover:border-transparent hover:scale-110`}
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import LOGO from '../assets/logo_hd.png';

const NAV_LINKS = [
  { path: '/', name: 'Home' },
  { path: '/about', name: 'About' },
  { path: '/services', name: 'Services' },
  { path: '/packages', name: 'Packages' },
  { path: '/contact', name: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { openBooking } = useApp();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [location]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
      scrolled ? 'py-3' : 'py-5'
    }`}>
      {/* ── Background Layer (Bluish Glass) ── */}
      <div className={`absolute inset-0 transition-all duration-500 -z-10 ${
        scrolled ? 'bg-[#0a111e]/90 backdrop-blur-lg border-b border-white/10' : 'bg-transparent'
      }`} />

      {/* ── Top Multi-color Line ── */}
      <div className="absolute top-0 left-0 w-full h-[3px] overflow-hidden">
        <div className="w-full h-full bg-gradient-to-r from-[#3b82f6] via-[#a855f7] via-[#f97316] to-[#ef4444]" 
             style={{ backgroundSize: '200% 100%', animation: 'shimmerTop 3s infinite linear' }} />
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-between">
        
        {/* ── Logo + Text ── */}
        <Link to="/" className="flex items-center gap-2 md:gap-3 group relative">
          <div className="relative">
            <div className="absolute -inset-2 bg-cyan-500/20 rounded-full blur-xl opacity-70 group-hover:opacity-100 transition-opacity" />
            <img src={LOGO} alt="Logo" className="h-9 md:h-12 w-auto relative z-10 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-white font-black text-lg md:text-xl tracking-tight">Trippanther</span>
            <span className="text-[8px] md:text-[10px] text-cyan-400 font-bold tracking-[0.2em] uppercase whitespace-nowrap">Tour & Travels</span>
          </div>
        </Link>

        {/* ── Desktop Nav (Hidden on Mobile/Tablet) ── */}
        <ul className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.path}>
              <Link to={link.path} className={`text-[14px] font-bold tracking-wide transition-all hover:text-cyan-400 ${
                location.pathname === link.path ? 'text-cyan-400 border-b-2 border-cyan-500 pb-1' : 'text-white/90'
              }`}>{link.name}</Link>
            </li>
          ))}
        </ul>

        {/* ── Action Buttons & Hamburger ── */}
        <div className="flex items-center gap-3 md:gap-5">
          <a href="tel:+919243585890" className="hidden sm:flex items-center gap-2 text-white/90 hover:text-cyan-400 transition-all">
            <div className="p-2 rounded-lg bg-white/5 border border-white/10">
              <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79a15.15 15.15 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.27 11.72 11.72 0 003.74.6 1 1 0 011 1V20a1 1 0 01-1 1A18 18 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.72 11.72 0 00.6 3.74 1 1 0 01-.27 1.11l-2.21 2.2z"/></svg>
            </div>
            <span className="hidden md:inline text-sm font-bold">Call Now</span>
          </a>

          <button onClick={() => openBooking()} className="bg-[#007BFF] hover:bg-[#0056b3] text-white px-4 md:px-6 py-2 md:py-2.5 rounded-lg font-black text-xs md:text-sm transition-all shadow-lg active:scale-95">
            Book Now
          </button>

          {/* Hamburger Icon */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-white p-1 z-[1001]">
            <div className="w-7 h-5 flex flex-col justify-between">
              <span className={`block h-0.5 bg-white transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 bg-white transition-all ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-white transition-all ${menuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* ── Mobile/Tablet Menu Overlay ── */}
      <div className={`fixed inset-0 bg-[#0a111e] z-[999] lg:hidden transition-transform duration-500 ease-in-out ${
        menuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full pt-28 px-8">
          <p className="text-cyan-500/50 text-[10px] tracking-[0.3em] uppercase mb-6">Menu</p>
          <div className="space-y-6">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                onClick={() => setMenuOpen(false)}
                className={`block text-3xl font-black transition-all ${
                  location.pathname === link.path ? 'text-cyan-400' : 'text-white/70 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          <div className="mt-auto pb-12 border-t border-white/10 pt-8">
             <a href="tel:+919243585890" className="flex items-center gap-4 text-white mb-8">
                <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79a15.15 15.15 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.27 11.72 11.72 0 003.74.6 1 1 0 011 1V20a1 1 0 01-1 1A18 18 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.72 11.72 0 00.6 3.74 1 1 0 01-.27 1.11l-2.21 2.2z"/></svg>
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-widest">Support</p>
                  <p className="text-lg font-bold">+91 9243585890</p>
                </div>
             </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmerTop {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>
    </nav>
  );
}
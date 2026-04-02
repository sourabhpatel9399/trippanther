import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { gsap } from 'gsap';

const WA = '919243585890'; // Remove space from number

// ========== PREMIUM SVG ICONS ==========
const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

const PlaneIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.614-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.238.614 4.332 1.686 6.148L.021 23.209c-.058.211.1.405.317.39l5.102-.629A11.967 11.967 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
  </svg>
);

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const EmailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const LocationIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const UsersIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const MessageIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const LockIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const SparkleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2L15 8.5L22 9L17 13.5L18.5 20.5L12 16L5.5 20.5L7 13.5L2 9L9 8.5L12 2z" />
  </svg>
);

export default function BookingModal() {
  const { bookingOpen, closeBooking, selectedPackage } = useApp();
  const [form, setForm] = useState({ name: '', email: '', phone: '', destination: '', date: '', people: '2', message: '' });
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (selectedPackage) setForm(f => ({ ...f, destination: selectedPackage.title || '' }));
  }, [selectedPackage]);

  useEffect(() => {
    if (bookingOpen) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(modalRef.current, 
        { opacity: 0, backdropFilter: 'blur(0px)' },
        { opacity: 1, backdropFilter: 'blur(12px)', duration: 0.4, ease: 'power2.out' }
      );
      gsap.fromTo(contentRef.current,
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, delay: 0.1, ease: 'back.out(1.2)' }
      );
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [bookingOpen]);

  const set = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  // ✅ WhatsApp Fix - Works on iOS and Android both
  const submit = e => {
    e.preventDefault();
    const msg = `🐆 *TripPanther Booking*\n\n👤 *Name:* ${form.name}\n📧 *Email:* ${form.email}\n📞 *Phone:* ${form.phone}\n🌍 *Destination:* ${form.destination}\n📅 *Date:* ${form.date}\n👥 *People:* ${form.people}\n💬 *Message:* ${form.message || 'N/A'}\n\n_Sent via TripPanther.com_`;
    
    const phoneNumber = WA.replace(/\s/g, ''); // Remove spaces
    const encodedMsg = encodeURIComponent(msg);
    
    // Check if iOS (iPhone/iPad/iPod)
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    
    if (isIOS) {
      // iPhone: Try WhatsApp App first
      window.location.href = `whatsapp://send?phone=${phoneNumber}&text=${encodedMsg}`;
      
      // Fallback: If app not installed, open web version
      setTimeout(() => {
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMsg}`, '_blank');
      }, 500);
    } else {
      // Android & Others: Direct web version (works everywhere)
      window.open(`https://wa.me/${phoneNumber}?text=${encodedMsg}`, '_blank');
    }
    
    gsap.to(contentRef.current, { scale: 0.98, duration: 0.2, yoyo: true, repeat: 1 });
    setTimeout(() => {
      closeBooking();
      setForm({ name: '', email: '', phone: '', destination: '', date: '', people: '2', message: '' });
    }, 500);
  };

  if (!bookingOpen) return null;

  const inputClasses = "w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-amber-400/80 focus:ring-1 focus:ring-amber-400/50 transition-all duration-300 text-sm";

  return (
    <div 
      ref={modalRef}
      onClick={closeBooking} 
      className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
    >
      <div 
        ref={contentRef}
        onClick={e => e.stopPropagation()} 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-gradient-to-br from-[#0A0F1A] via-[#0A192F] to-[#0F2A3F] border border-white/10 shadow-2xl"
      >
        {/* Animated Gradient Border Effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-amber-400/10 via-orange-500/10 to-amber-400/10 pointer-events-none" />
        
        {/* Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button 
          onClick={closeBooking} 
          className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/50 hover:text-white transition-all duration-300 hover:scale-110 border border-white/10"
        >
          <CloseIcon />
        </button>

        {/* Header */}
        <div className="relative pt-10 pb-6 px-8 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-amber-400/30 rounded-2xl blur-xl" />
              <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                <PlaneIcon />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <SparkleIcon />
                <span className="text-xs text-amber-400/80 tracking-[0.2em] uppercase font-semibold">TripPanther</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-light text-white">
                Plan Your <span className="text-amber-400 font-semibold italic">Journey</span>
              </h2>
            </div>
          </div>
          <p className="text-white/40 text-sm mt-4 ml-2">
            Fill in your details — we'll reach you on WhatsApp instantly.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={submit} className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Full Name */}
            <div className="md:col-span-2">
              <label className="flex items-center gap-2 text-xs font-semibold text-amber-400/70 uppercase tracking-wider mb-2">
                <UserIcon /> Full Name
              </label>
              <input 
                name="name" 
                type="text" 
                required 
                value={form.name} 
                onChange={set} 
                placeholder="Your full name"
                className={inputClasses}
              />
            </div>

            {/* Email */}
            <div>
              <label className="flex items-center gap-2 text-xs font-semibold text-amber-400/70 uppercase tracking-wider mb-2">
                <EmailIcon /> Email
              </label>
              <input 
                name="email" 
                type="email" 
                required 
                value={form.email} 
                onChange={set} 
                placeholder="you@mail.com"
                className={inputClasses}
              />
            </div>

            {/* Phone */}
            <div>
              <label className="flex items-center gap-2 text-xs font-semibold text-amber-400/70 uppercase tracking-wider mb-2">
                <PhoneIcon /> Phone
              </label>
              <input 
                name="phone" 
                type="tel" 
                required 
                value={form.phone} 
                onChange={set} 
                placeholder="+91 XXXXX XXXXX"
                className={inputClasses}
              />
            </div>

            {/* Destination */}
            <div className="md:col-span-2">
              <label className="flex items-center gap-2 text-xs font-semibold text-amber-400/70 uppercase tracking-wider mb-2">
                <LocationIcon /> Destination / Package
              </label>
              <input 
                name="destination" 
                type="text" 
                value={form.destination} 
                onChange={set} 
                placeholder="Where to? (e.g., Kashmir Paradise)"
                className={inputClasses}
              />
            </div>

            {/* Travel Date */}
            <div>
              <label className="flex items-center gap-2 text-xs font-semibold text-amber-400/70 uppercase tracking-wider mb-2">
                <CalendarIcon /> Travel Date
              </label>
              <input 
                name="date" 
                type="date" 
                value={form.date} 
                onChange={set} 
                className={inputClasses}
              />
            </div>

            {/* Travellers */}
            <div>
              <label className="flex items-center gap-2 text-xs font-semibold text-amber-400/70 uppercase tracking-wider mb-2">
                <UsersIcon /> Travellers
              </label>
              <select 
                name="people" 
                value={form.people} 
                onChange={set} 
                className={`${inputClasses} cursor-pointer`}
              >
                {[1,2,3,4,5,6,'7-10','10+'].map(n => (
                  <option key={n} value={n} className="bg-[#0A192F]">{n} {n===1?'Person':'People'}</option>
                ))}
              </select>
            </div>

            {/* Special Request */}
            <div className="md:col-span-2">
              <label className="flex items-center gap-2 text-xs font-semibold text-amber-400/70 uppercase tracking-wider mb-2">
                <MessageIcon /> Special Request
              </label>
              <textarea 
                name="message" 
                value={form.message} 
                onChange={set} 
                rows={3} 
                placeholder="Anything special you'd like to tell us?"
                className={`${inputClasses} resize-none`}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="group relative w-full mt-8 py-4 rounded-xl font-bold text-white overflow-hidden transition-all duration-300 hover:scale-[1.02]"
            style={{ background: "linear-gradient(135deg, #25D366, #1FA855)", boxShadow: "0 8px 25px -5px rgba(37,211,102,0.3)" }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <WhatsAppIcon />
              Send via WhatsApp
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          {/* Privacy Note */}
          <p className="flex items-center justify-center gap-1.5 text-center mt-5 text-xs text-white/30">
            <LockIcon /> Your data is private and never shared.
          </p>
        </form>

        {/* Decorative Bottom Glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-16 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
      </div>
    </div>
  );
}
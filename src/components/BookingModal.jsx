import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { gsap } from 'gsap';

const WA = '919243585890';

// ========== PREMIUM SVG ICONS ==========
const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
);
const PlaneIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
);

export default function BookingModal() {
  const { bookingOpen, closeBooking, selectedPackage } = useApp();
  const [form, setForm] = useState({ name: '', email: '', phone: '', destination: '', date: '', people: '2', message: '' });
  const modalRef = useRef(null);
  const contentRef = useRef(null);
  const snowRef = useRef(null);

  useEffect(() => {
    if (selectedPackage) setForm(f => ({ ...f, destination: selectedPackage.title || '' }));
  }, [selectedPackage]);

  useEffect(() => {
    if (bookingOpen) {
      document.body.style.overflow = 'hidden';
      
      // Modal Entrance
      gsap.fromTo(modalRef.current, 
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power2.out' }
      );
      gsap.fromTo(contentRef.current,
        { y: 100, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, delay: 0.1, ease: 'expo.out' }
      );

      // --- SNOWFALL EFFECT LOGIC ---
      if (snowRef.current) {
        const container = snowRef.current;
        container.innerHTML = ''; // Clear old snow
        for (let i = 0; i < 40; i++) {
          const snowflake = document.createElement('div');
          snowflake.className = 'absolute bg-white rounded-full pointer-events-none opacity-40';
          const size = Math.random() * 3 + 1 + 'px';
          snowflake.style.width = size;
          snowflake.style.height = size;
          snowflake.style.left = Math.random() * 100 + '%';
          snowflake.style.top = '-20px';
          container.appendChild(snowflake);

          gsap.to(snowflake, {
            y: contentRef.current.offsetHeight + 50,
            x: '+=' + (Math.random() * 40 - 20),
            duration: Math.random() * 4 + 4,
            repeat: -1,
            ease: 'none',
            delay: Math.random() * 5
          });
        }
      }
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [bookingOpen]);

  const set = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = e => {
    e.preventDefault();
    const msg = `🐆 *TripPanther Booking Request*\n\n👤 *Name:* ${form.name}\n📧 *Email:* ${form.email}\n📞 *Phone:* ${form.phone}\n🌍 *Destination:* ${form.destination}\n📅 *Date:* ${form.date}\n👥 *People:* ${form.people}\n💬 *Message:* ${form.message || 'N/A'}\n\n_Sent via TripPanther Luxury Portal_`;
    const encodedMsg = encodeURIComponent(msg);
    window.open(`https://wa.me/${WA}?text=${encodedMsg}`, '_blank');
    closeBooking();
  };

  if (!bookingOpen) return null;

  const inputStyle = "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-none text-white placeholder-white/20 focus:outline-none focus:border-white/40 transition-all duration-500 text-xs tracking-widest uppercase";

  return (
    <div ref={modalRef} onClick={closeBooking} className="fixed inset-0 z-[3000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      
      <div ref={contentRef} onClick={e => e.stopPropagation()} className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-[#050505] border border-white/10 shadow-[0_0_50px_rgba(255,255,255,0.05)]">
        
        {/* BACKGROUND IMAGE WITH OVERLAY */}
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover opacity-20" alt="background" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />
        </div>

        {/* SNOW CONTAINER */}
        <div ref={snowRef} className="absolute inset-0 z-[1] pointer-events-none overflow-hidden" />

        <div className="relative z-10 p-8 md:p-12">
          
          {/* Header */}
          <div className="flex justify-between items-start mb-12">
            <div className="reveal-up">
              <p className="text-[10px] tracking-[4px] uppercase text-white/40 mb-2">Reservation</p>
              <h2 className="text-4xl font-['Playfair_Display',serif] italic font-light text-white">Bespoke <span className="font-normal not-italic">Booking</span></h2>
            </div>
            <button onClick={closeBooking} className="text-white/40 hover:text-white transition-colors duration-500">
              <CloseIcon />
            </button>
          </div>

          <form onSubmit={submit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <input name="name" type="text" required value={form.name} onChange={set} placeholder="Your Full Name" className={inputStyle} />
              </div>
              <input name="email" type="email" required value={form.email} onChange={set} placeholder="Email Address" className={inputStyle} />
              <input name="phone" type="tel" required value={form.phone} onChange={set} placeholder="Phone Number" className={inputStyle} />
              <div className="md:col-span-2">
                <input name="destination" type="text" value={form.destination} onChange={set} placeholder="Destination of Choice" className={inputStyle} />
              </div>
              <input name="date" type="date" value={form.date} onChange={set} className={inputStyle} />
              <select name="people" value={form.people} onChange={set} className={`${inputStyle} cursor-pointer`}>
                {[1,2,3,4,5,6,'7-10','10+'].map(n => <option key={n} value={n} className="bg-black">{n} {n===1?'Guest':'Guests'}</option>)}
              </select>
              <div className="md:col-span-2">
                <textarea name="message" value={form.message} onChange={set} rows={3} placeholder="Any Specific Requirements?" className={`${inputStyle} resize-none`} />
              </div>
            </div>

            <button type="submit" className="w-full py-5 bg-white text-black text-[10px] tracking-[4px] uppercase font-bold hover:bg-gray-200 transition-colors duration-500 mt-8 flex items-center justify-center gap-3">
              Confirm via WhatsApp <PlaneIcon />
            </button>
          </form>

          <p className="text-center mt-8 text-[9px] tracking-[2px] uppercase text-white/20">
            Secure & Private · TripPanther Luxury Concierge
          </p>
        </div>

      </div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import your images from assets
// import img1 from '../assets/gallery/img1.jpg';
// import img2 from '../assets/gallery/img2.jpg';
// import img3 from '../assets/gallery/img3.jpg';
// import img4 from '../assets/gallery/img4.jpg';
// ... add all your images

gsap.registerPlugin(ScrollTrigger);

const GALLERY_IMAGES = [
  { id: 1, src: 'img1', title: 'Dal Lake', loc: 'Kashmir', col: 'span 2', row: 'span 2' },
  { id: 2, src: 'img2', title: 'Hawa Mahal', loc: 'Jaipur' },
  { id: 3, src: 'img3', title: 'Burj Khalifa', loc: 'Dubai' },
  { id: 4, src: 'img4', title: 'Rice Terraces', loc: 'Bali', col: 'span 2' },
  // ... add all your images with their properties
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    gsap.fromTo('.gal-cell', 
      { opacity: 0, scale: 0.96 }, 
      { opacity: 1, scale: 1, stagger: 0.07, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: '.gal-grid', start: 'top 80%' } }
    );
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : '';
    const esc = (e) => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', esc);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', esc); };
  }, [lightbox]);

  return (
    <div className="bg-obsidian">
      {/* Hero */}
      <div className="page-hero min-h-[65vh] relative">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80)' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-obsidian/20" />
        <div className="container-custom relative z-10 pt-32 pb-20">
          <div className="gold-line mb-5 text-gold2">Visual Journey</div>
          <h1 className="font-display text-[clamp(4rem,9vw,9rem)] tracking-[0.04em] leading-[0.92] text-white">
            OUR<br /><span className="text-transparent [text-stroke:1.5px_#C4A050]">GALLERY</span>
          </h1>
        </div>
      </div>

      {/* Gallery Grid */}
      <section className="py-20 pb-28">
        <div className="container-custom">
          <div className="mb-14">
            <div className="gold-line mb-4">Moments Captured</div>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-light text-white">
              Every Frame, <em className="italic text-gold2">A Memory</em>
            </h2>
          </div>

          <div className="gal-grid grid grid-cols-2 md:grid-cols-4 auto-rows-[240px] gap-2">
            {GALLERY_IMAGES.map((img) => (
              <div
                key={img.id}
                className="gal-cell relative overflow-hidden cursor-zoom-in rounded-sm"
                style={{
                  gridColumn: img.col || 'span 1',
                  gridRow: img.row || 'span 1',
                }}
                onClick={() => setLightbox(img)}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover transition-all duration-700 brightness-75 hover:brightness-100 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 to-transparent opacity-0 transition-opacity duration-400 hover:opacity-100" />
                <div className="absolute bottom-4 left-4 translate-y-2 opacity-0 transition-all duration-400 hover:translate-y-0 hover:opacity-100">
                  <div className="font-display text-[1.3rem] tracking-[0.06em] text-white">{img.title}</div>
                  <div className="text-[0.65rem] text-gold tracking-[0.15em] uppercase">📍 {img.loc}</div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-0 transition-transform duration-400 text-2xl pointer-events-none group-hover:scale-100">
                  🔍
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div 
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-[3000] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6 animate-fade-in"
        >
          <button 
            onClick={() => setLightbox(null)} 
            className="absolute top-6 right-7 text-white/40 text-2xl transition-colors hover:text-white"
          >
            ✕
          </button>
          <div onClick={(e) => e.stopPropagation()} className="max-w-[960px] w-full">
            <img 
              src={lightbox.src} 
              alt={lightbox.title} 
              className="w-full max-h-[78vh] object-contain rounded-sm"
            />
            <div className="flex justify-between items-center mt-5">
              <div>
                <div className="font-display text-2xl tracking-[0.08em] text-white">{lightbox.title}</div>
                <div className="text-[0.72rem] text-gold tracking-[0.2em] uppercase mt-1">📍 {lightbox.loc}</div>
              </div>
              <div className="text-[0.65rem] text-white/20 tracking-[0.15em]">ESC TO CLOSE</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
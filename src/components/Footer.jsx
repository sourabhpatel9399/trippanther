import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { path: "/", name: "Home" },
  { path: "/about", name: "About" },
  { path: "/services", name: "Services" },
  { path: "/packages", name: "Packages" },
  { path: "/gallery", name: "Gallery" },
  { path: "/contact", name: "Contact" },
];

const TOP_TRIPS = [
  "Kashmir Valley",
  "Bali Paradise",
  "Rajasthan Royal",
  "Kerala Bliss",
  "Indore Nearby",
  "Ladakh Wild",
];

// SVG Social Icons
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

// href: null means no link yet → renders as button
const SOCIAL_LINKS = [
  { Icon: FacebookIcon, label: "Facebook", href: "https://www.facebook.com/share/1AwagDGqJH/", hoverColor: "hover:bg-blue-600" },
  { Icon: InstagramIcon, label: "Instagram", href: "https://www.instagram.com/trippanther_?igsh=cWVjNWhzcXFmdHg0", hoverColor: "hover:bg-pink-600" },
  { Icon: TwitterIcon, label: "Twitter / X", href: null, hoverColor: "hover:bg-sky-500" },
  { Icon: YouTubeIcon, label: "YouTube", href: null, hoverColor: "hover:bg-red-600" },
  { Icon: LinkedInIcon, label: "LinkedIn", href: null, hoverColor: "hover:bg-blue-700" },
];

export default function Footer() {
  const footerRef = useRef(null);
  const glowRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (glowRef.current) {
      animationRef.current = gsap.to(glowRef.current, {
        duration: 8,
        x: 100,
        y: -50,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    const socialIcons = document.querySelectorAll(".social-icon");
    const handleMouseEnter = (icon) => {
      gsap.to(icon, { scale: 1.2, rotationY: 360, duration: 0.6, ease: "back.out(1.2)" });
    };
    const handleMouseLeave = (icon) => {
      gsap.to(icon, { scale: 1, rotationY: 0, duration: 0.4, ease: "power2.out" });
    };

    socialIcons.forEach((icon) => {
      icon.addEventListener("mouseenter", () => handleMouseEnter(icon));
      icon.addEventListener("mouseleave", () => handleMouseLeave(icon));
    });

    return () => {
      if (animationRef.current) animationRef.current.kill();
      socialIcons.forEach((icon) => {
        icon.removeEventListener("mouseenter", () => handleMouseEnter(icon));
        icon.removeEventListener("mouseleave", () => handleMouseLeave(icon));
      });
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const socialIconClass = (hoverColor) =>
    `social-icon w-10 h-10 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:border-transparent ${hoverColor} text-gray-300 hover:text-white`;

  return (
    <footer
      ref={footerRef}
      className="bg-gradient-to-br from-[#0A0F1A] via-[#0A192F] to-[#0F2A3F] text-white pt-20 pb-8"
    >
      {/* Animated Gradient Orb */}
      <div
        ref={glowRef}
        className="absolute top-0 -left-20 w-96 h-96 bg-gradient-to-r from-blue-500/30 via-purple-500/20 to-transparent rounded-full blur-3xl pointer-events-none"
      />

      {/* Animated Border Lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-white/10">

          {/* Brand Section */}
          <div className="footer-brand sm:col-span-2 lg:col-span-4">
            <div className="mb-5">
              <div className="font-display text-3xl md:text-4xl tracking-tight leading-none bg-gradient-to-r from-white via-blue-400 to-purple-400 bg-clip-text text-transparent">
                TRIP<span className="text-blue-500">PANTHER</span>
              </div>
              <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 mt-4 mb-5" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
              We don't just book trips. We architect transformative experiences
              for the bold and curious. Your journey, our passion.
            </p>

            {/* Social Icons — a tag for real links, button for placeholders */}
            <div className="flex flex-wrap gap-3">
              {SOCIAL_LINKS.map(({ Icon, label, href, hoverColor }, i) =>
                href ? (
                  <a
                    key={i}
                    href={href}
                    aria-label={label}
                    title={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={socialIconClass(hoverColor)}
                  >
                    <Icon />
                  </a>
                ) : (
                  <button
                    key={i}
                    aria-label={label}
                    title={label}
                    className={socialIconClass(hoverColor)}
                  >
                    <Icon />
                  </button>
                )
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links sm:col-span-1 lg:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.path} className="group">
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white text-sm transition-all duration-300 flex items-center gap-2"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Destinations */}
          <div className="footer-links sm:col-span-1 lg:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text mb-5">
              Top Trips
            </h3>
            <ul className="space-y-3">
              {TOP_TRIPS.map((trip) => (
                <li key={trip} className="group">
                  <Link
                    to="/packages"
                    className="text-gray-400 hover:text-white text-sm transition-all duration-300 flex items-center gap-2"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {trip}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="footer-contact sm:col-span-2 lg:col-span-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text mb-5">
              Connect With Us
            </h3>

            <div className="space-y-4 mb-6">
              {[
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} width={16} height={16}>
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  ),
                  text: "MG Road, Indore, MP 452001",
                  href: "https://www.google.com/maps/search/MG+Road,+Indore,+MP+452001",
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} width={16} height={16}>
                      <path d="M22 16.92V19a2 2 0 01-2.18 2A19.79 19.79 0 013 4.18 2 2 0 015 2h2.09a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                    </svg>
                  ),
                  text: "+91 92435 85890",
                  href: "tel:+919243585890",
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} width={16} height={16}>
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  ),
                  text: "infotrippanther@gmail.com",
                  href: "mailto:infotrippanther@gmail.com",
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} width={16} height={16}>
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12,6 12,12 16,14" />
                    </svg>
                  ),
                  text: "Mon–Sat · 9AM–8PM",
                  href: null,
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 group">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:text-amber-400 transition-all duration-300 flex-shrink-0">
                    {item.icon}
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white text-sm transition-all duration-300 mt-1"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span className="text-gray-400 group-hover:text-white text-sm transition-all duration-300 mt-1">
                      {item.text}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* WhatsApp Button */}
            <a
              href="https://wa.me/919243585890"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg group"
            >
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.614-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.238.614 4.332 1.686 6.148L.021 23.209c-.058.211.1.405.317.39l5.102-.629A11.967 11.967 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10a9.96 9.96 0 0 1-5.344-1.535l-.188-.11-3.023.374.438-2.854-.107-.188A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2z"/>
              </svg>
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} TripPanther · All rights reserved
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Refund Policy"].map((item, i) => (
              <button
                key={i}
                className="text-gray-500 text-xs transition-all duration-300 hover:text-blue-400"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
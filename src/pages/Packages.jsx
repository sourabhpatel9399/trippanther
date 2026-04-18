import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// ==== TERI LOCAL IMAGES ====
import heroImage from '../assets/heroImage.jpg';
import kedarnath from '../assets/packeges/kedarnath_package.png';
import charDham from '../assets/packeges/charDham.jpg';
import kashmirEscape from '../assets/packeges/kashmir_escape.jpg';
import kedarnathTrek from '../assets/packeges/kedarnath_trek.png';
import himachalHeaven from '../assets/packeges/himachal_heaven.jpg';
import spitiValley from '../assets/packeges/spiti_valley.jpg';

//
import kasol from '../assets/Kasol.jpg'

gsap.registerPlugin(ScrollTrigger);

// ─── PREMIUM SVG ICONS ───
const LocationIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>);
const CheckIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>);
const CrossIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>);
const CalendarIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>);
const ClockIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>);
const ArrowLeftIcon = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>);
const ShieldIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>);
const LockIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>);
const PriceIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></svg>);
const PhoneIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>);
const MailIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>);

// Accommodations Icons
const BedIcon = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 4v16M22 4v16M2 8h20M2 17h20M6 8v9M18 8v9"/></svg>);
const WifiIcon = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01"/></svg>);
const FoodIcon = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3"/></svg>);
const MountainIcon = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 3l4 8 5-5 5 15H2L8 3z"/></svg>);

// ─── AMBIENT BACKGROUND NOISE ───
const FilmNoise = () => (
  <svg className="pointer-events-none fixed inset-0 z-[9999] w-full h-full opacity-[0.03] mix-blend-overlay">
    <filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" /></filter>
    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
  </svg>
);

// ─── INTELLIGENT DYNAMIC ANIMATIONS (SNOW, PETALS, LEAVES) ───
const IntelligentVibe = ({ pkgTitle, cat }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.innerHTML = '';
    
    const title = pkgTitle.toLowerCase();
    let type = 'glow'; 
    if (title.includes('manali') || title.includes('spiti') || title.includes('kedarkantha') || title.includes('winter')) {
      type = 'snow';
    } else if (title.includes('dham') || title.includes('kedarnath') || cat === 'Spiritual') {
      type = 'spiritual';
    } else if (title.includes('kashmir') || cat === 'Nature') {
      type = 'leaves';
    }

    const count = type === 'snow' ? 100 : type === 'leaves' ? 30 : 40;

    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      el.className = "absolute pointer-events-none";
      
      if (type === 'snow') {
        const size = Math.random() * 4 + 2 + "px";
        el.style.width = size; el.style.height = size; el.style.backgroundColor = "#ffffff";
        el.style.borderRadius = "50%"; el.style.opacity = Math.random() * 0.6 + 0.2;
        el.style.boxShadow = "0 0 10px rgba(255,255,255,0.8)";
      } else if (type === 'spiritual') {
        const size = Math.random() * 8 + 6 + "px";
        el.style.width = size; el.style.height = size;
        el.style.background = Math.random() > 0.5 ? "#F59E0B" : "#FCD34D"; 
        el.style.borderRadius = "50% 0 50% 50%"; el.style.opacity = Math.random() * 0.8 + 0.2;
        el.style.boxShadow = "0 0 15px rgba(245, 158, 11, 0.6)";
      } else if (type === 'leaves') {
        const size = Math.random() * 12 + 8 + "px";
        el.style.width = size; el.style.height = size;
        el.style.background = Math.random() > 0.5 ? "#4ADE80" : "#10B981"; 
        el.style.borderRadius = "0 50% 50% 50%"; el.style.opacity = Math.random() * 0.7 + 0.3;
      }

      el.style.left = Math.random() * 100 + "vw";
      el.style.top = Math.random() * -100 + "vh";
      container.appendChild(el);

      gsap.to(el, {
        y: "120vh", x: `+=${Math.random() * 150 - 75}`, 
        rotation: type !== 'snow' ? Math.random() * 720 : 0, 
        duration: type === 'snow' ? Math.random() * 10 + 10 : Math.random() * 15 + 12, 
        repeat: -1, ease: "none", delay: Math.random() * -20 
      });
    }
  }, [pkgTitle, cat]);

  return (
    <div className="fixed inset-0 z-[5] pointer-events-none overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-white/5 rounded-full blur-[150px] mix-blend-screen" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-white/5 rounded-full blur-[150px] mix-blend-screen" />
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
};

// ─── POLICIES & TERMS DATA ───
const COMMON_POLICIES = {
  paymentPolicy: { booking: '50% of the total tour cost will be paid at booking time.', full: 'The full amount is to be paid 7 days prior to the departure.' },
  paymentDetails: { accountName: 'Trippanther', accountNumber: '100238204567', bankName: 'INDUSIND BANK', branchName: 'VIJAY NAGAR, INDORE', ifscCode: 'INDB0000878', accountType: 'Current Account', upiId: 'trippanther@axl' },
  termsAndConditions: [
    'Booking Amount is non-refundable.',
    'All our bookings are on the basis of First come First serve policy.',
    'Bookings are non-transferable, non-adjustable, and cannot be rescheduled.',
    'Trips can be rescheduled if informed 45 days prior to the trip (subject to availability).',
    'In case of cancellation of bookings from the consumer\'s end, no booking amount shall be refunded or adjusted in any case.',
    'The photos/videos content created on Trippanther\'s trips is the property of Trippanther and can be used for advertising.',
    'The IDs shall all be verified before boarding. No boarding shall be entertained without a valid Govt. ID.',
    'The transfer of bookings is not permitted. Only the names mentioned at the time of confirmation shall be allowed to travel.',
    'Trippanther reserves the right to rearrange the itinerary/transportation due to unavoidable events (weather, political, etc.).',
    'An original individual identification proof must be carried by the traveler during the journey.',
    'Trippanther will not be responsible for any man-made or natural calamity. In case of any injury or accident during adventure sports, Trippanther will not be liable.',
    'In case of inappropriate weather or change in local government norms, activities can be scheduled or canceled without prior notice.',
    'Any mischief or inappropriate behavior will not be tolerated, and Trippanther reserves the right to cancel such bookings without refund.',
  ],
};

// ─── HIGH QUALITY DAY-WISE IMAGES ───
const imgSets = {
  manaliKasol: [
    "https://images.unsplash.com/photo-1582650838186-0b6167c13285?auto=format&fit=crop&q=80&w=1200", 
    "https://images.unsplash.com/photo-1605649487212-4d74268e0d48?auto=format&fit=crop&q=80&w=1200", 
    "https://images.unsplash.com/photo-1548050868-80f58fc92eb8?auto=format&fit=crop&q=80&w=1200", 
    "https://images.unsplash.com/photo-1626714485842-8356976ce598?auto=format&fit=crop&q=80&w=1200", 
    "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=1200", 
    "https://images.unsplash.com/photo-1542157972-e64eeb2261ea?auto=format&fit=crop&q=80&w=1200", 
  ],
  kedarnath: [
    "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=1200", 
    "https://images.unsplash.com/photo-1596395819057-e37f55a8516f?auto=format&fit=crop&q=80&w=1200", 
    "https://images.unsplash.com/photo-1618083818617-64010d297cb7?auto=format&fit=crop&q=80&w=1200", 
    "https://images.unsplash.com/photo-1587313333140-1a6ec7106093?auto=format&fit=crop&q=80&w=1200", 
    "https://images.unsplash.com/photo-1571216503920-5c6a1b02660a?auto=format&fit=crop&q=80&w=1200", 
  ],
  kashmir: [
    "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&q=80&w=1200", 
    "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&q=80&w=1200", 
    "https://images.unsplash.com/photo-1616053331906-8d59dcafb766?auto=format&fit=crop&q=80&w=1200", 
    "https://images.unsplash.com/photo-1559816584-c5520d20d440?auto=format&fit=crop&q=80&w=1200", 
    "https://images.unsplash.com/photo-1622308644420-a7ec3bc9dcbb?auto=format&fit=crop&q=80&w=1200", 
    "https://images.unsplash.com/photo-1590419690008-905895e8fb89?auto=format&fit=crop&q=80&w=1200", 
    "https://images.unsplash.com/photo-1579435165972-51ab11e9f1a1?auto=format&fit=crop&q=80&w=1200", 
    "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=1200", 
  ],
  spiti: [
    "https://images.unsplash.com/photo-1582650838186-0b6167c13285?auto=format&fit=crop&q=80&w=1200", 
    "https://images.unsplash.com/photo-1626714485842-8356976ce598?auto=format&fit=crop&q=80&w=1200", 
    "https://images.unsplash.com/photo-1598468305060-61d078170c9c?auto=format&fit=crop&q=80&w=1200", 
    "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&q=80&w=1200", 
    "https://images.unsplash.com/photo-1620023605632-1596e1a4deea?auto=format&fit=crop&q=80&w=1200", 
    "https://images.unsplash.com/photo-1588667611831-299fde2b4db3?auto=format&fit=crop&q=80&w=1200", 
    "https://images.unsplash.com/photo-1601058204991-382a83204221?auto=format&fit=crop&q=80&w=1200", 
    "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&q=80&w=1200", 
  ],
  kedarkantha: [
    "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&q=80&w=1200", 
    "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&q=80&w=1200", 
    "https://images.unsplash.com/photo-1516466723877-e4ec1d736c8a?auto=format&fit=crop&q=80&w=1200", 
    "https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&q=80&w=1200", 
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1200", 
  ]
};

// ─── COMPLETE 7 PACKAGES WITH DYNAMIC THEMES & ACCOMMODATIONS ───
const PACKAGES = [
  {
    id: 1, title: 'The Grace Beauty of Manali & Kasol', subtitle: 'Manali · Solang · Kasol · Manikaran', cat: 'Adventure', dur: '6D / 5N', price: 7000,
    themeColor: '#06b6d4', themeGlow: 'rgba(6, 182, 212, 0.4)', // Cool Cyan/Blue
    badge: 'Trending', badgeC: '#06b6d4', img: himachalHeaven, heroImg: `${kasol}`, loc: 'Manali · Kasol · Delhi',
    inc: ['Transportation', 'Accommodation as per itinerary', 'Meals (Breakfast and Dinner)', 'Sightseeing as per itinerary', 'All transfers as per itinerary', 'All toll taxes', 'Driver allowance, parking, oxygen cylinder, medical kit.'],
    exc: ['Anything else not mentioned in inclusions', 'Personal expenses (tips, laundry, medication)', 'Monument/camera fees', 'Any other adventure activity', '5% GST', 'Any cost due to natural calamities'],
    desc: 'Embark on a mesmerizing journey to the graceful valleys of Manali and the hippie haven of Kasol. Experience thrilling adventures in Solang, peaceful hikes in Chalal, and the divine hot springs of Manikaran.',
    placesCovered: [
      { name: 'Solang Valley', img: "https://img.indiahighlight.com/fit-in/1090x600/ih/uploads/1733894516.jpg" }, { name: 'Atal Tunnel', img: 'https://blog.civilianz.com/wp-content/uploads/2021/04/20201003125107_Atal-tunnel.jpg' }, { name: 'Kasol Parvati Valley', img: 'https://static2.tripoto.com/media/filter/tst/img/153947/TripDocument/1441086499_tr5.jpg'}, { name: 'Manikaran', img: 'https://www.trawell.in/admin/images/upload/45428251Kullu_Manikaran_Main.jpg' }
    ],
    accommodation: {
      type: 'Premium Hotels & Riverside Camps',
      desc: 'Experience comfort in our carefully selected premium hotels in Manali and riverside camps in Kasol with stunning valley views and modern amenities.',
      amenities: ['Comfortable Beds', 'Scenic Valley View', 'Hygienic Food', 'Free Wi-Fi']
    },
    days: [
      { day: 1, title: 'Delhi to Manali', desc: 'We will meet at the decided point in the evening to board the vehicle for Manali. It is an overnight journey with a stop for dinner (at your expense).', img: imgSets.manaliKasol[0], meals: 'No Meals' },
      { day: 2, title: 'Manali Local Sightseeing', desc: 'Check into the hotel in Manali. Visit Hadimba Devi Temple, Vashisht temple, and Club House. Evening free to explore Mall Road.', img: imgSets.manaliKasol[1], meals: 'Dinner' },
      { day: 3, title: 'Solang Valley, Atal Tunnel & Sissu', desc: 'Adventurous trip to Solang valley, Atal Tunnel, and Sissu. Return to Manali for stay, delicious dinner, and bonfire.', img: imgSets.manaliKasol[2], meals: 'Breakfast + Dinner' },
      { day: 4, title: 'Kullu & Kasol', desc: 'Checkout and proceed to Kullu for river rafting & paragliding. Then head to Kasol. Check into camps, explore Parvati Valley and local cafes.', img: imgSets.manaliKasol[3], meals: 'Breakfast + Dinner' },
      { day: 5, title: 'Chalal Hike & Manikaran', desc: 'Checkout by 11 AM. Embark on the Chalal Hike for mesmerizing mountain views. Visit Manikaran Sahib Gurudwara. Proceed to Delhi in the evening.', img: imgSets.manaliKasol[4], meals: 'Breakfast' },
      { day: 6, title: 'Delhi Arrival', desc: 'Reach Delhi with beautiful memories of the trip.', img: imgSets.manaliKasol[5], meals: 'No Meals' },
    ],
    priceTable: [{ label: 'Quad Sharing', price: '₹7,000' }, { label: 'Triple Sharing', price: '₹8,000' }, { label: 'Double Sharing', price: '₹9,000' }],
    batches: [{ month: 'DEPARTURES', dates: ['Every Day'] }],
  },
  {
    id: 2, title: '2 Dham Yatra', subtitle: 'Kedarnath & Badrinath', cat: 'Spiritual', dur: '5D / 4N', price: 12500,
    themeColor: '#F59E0B', themeGlow: 'rgba(245, 158, 11, 0.4)', // Spiritual Gold
    badge: 'Sacred', badgeC: '#F59E0B', img: kedarnath, heroImg: `${kedarnath}`, loc: 'Kedarnath · Badrinath · Haridwar',
    inc: ['Transportation', 'Accommodation as per itinerary', 'Meals (Breakfast & Dinner)', 'Sightseeing', 'All toll taxes', 'Driver allowance', 'Yatra-E Pass', 'Kedarnath Camp Stay'],
    exc: ['Personal expenses', 'Monument entry fees', 'Adventure activities', '5% GST', 'Helicopter/Pony charges'],
    desc: 'Experience the divine journey to two of the most sacred Char Dham shrines – Kedarnath and Badrinath, nestled in the majestic Himalayas.',
    placesCovered: [
      { name: 'Guptkashi', img: imgSets.kedarnath[0] }, { name: 'Kedarnath Temple', img: imgSets.kedarnath[2] }, { name: 'Badrinath Temple', img: imgSets.kedarnath[3] }, { name: 'Haridwar', img: imgSets.kedarnath[4] }
    ],
    accommodation: {
      type: 'Hygienic Hotels & Alpine Camps',
      desc: 'Comfortable and hygienic stays during your spiritual journey, including specialized alpine camps at Kedarnath base for a divine experience.',
      amenities: ['Warm Bedding', 'Himalayan Views', 'Pure Veg Meals', 'Hot Water Assistance']
    },
    days: [
      { day: 1, title: 'Delhi/Haridwar to Guptkashi', desc: 'Depart from Haridwar and drive to Guptkashi. Check into your hotel and rest.', img: imgSets.kedarnath[0], meals: 'Dinner' },
      { day: 2, title: 'Guptkashi to Kedarnath', desc: 'Drive to Gaurikund. Commence the 14km trek to Kedarnath. Attend evening aarti at the temple.', img: imgSets.kedarnath[1], meals: 'Breakfast + Dinner' },
      { day: 3, title: 'Kedarnath Ji to Guptkashi', desc: 'Early morning darshan. Descend back to Gaurikund and drive to Guptkashi.', img: imgSets.kedarnath[2], meals: 'Breakfast + Dinner' },
      { day: 4, title: 'Guptkashi to Badrinath', desc: 'Drive to Badrinath via Joshimath. Check into your hotel and visit Badrinath Temple for evening darshan.', img: imgSets.kedarnath[3], meals: 'Breakfast + Dinner' },
      { day: 5, title: 'Badrinath to Haridwar/Delhi', desc: 'Visit Badrinath Temple. Drive back to Haridwar/Rishikesh to end the journey.', img: imgSets.kedarnath[4], meals: 'Breakfast' },
    ],
    priceTable: [{ label: 'Ex-Delhi', price: '₹13,500/-' }, { label: 'Ex-Haridwar', price: '₹12,500/-' }],
    batches: [{ month: 'MAY', dates: ['1st', '3rd', '9th', '17th', '24th', '31st'] }, { month: 'JUNE', dates: ['7th', '14th', '17th', '21st', '28th'] }],
  },
  {
    id: 3, title: 'Char Dham Yatra', subtitle: 'Yamunotri · Gangotri · Kedarnath · Badrinath', cat: 'Spiritual', dur: '10D / 9N', price: 22000,
    themeColor: '#D97706', themeGlow: 'rgba(217, 119, 6, 0.4)', // Deep Amber
    badge: 'Divine', badgeC: '#D97706', img: charDham, heroImg: `${charDham}`, loc: 'Yamunotri · Gangotri · Kedarnath · Badrinath',
    inc: ['Transportation', 'Accommodation', 'Meals (Breakfast & Dinner)', 'Sightseeing', 'All transfers', 'All toll taxes', 'Driver allowance, oxygen cylinder'],
    exc: ['Personal expenses', 'Monument entry fees', 'Adventure activity', '5% GST', 'Pony/Palki charges'],
    desc: 'Complete the sacred Char Dham circuit – visit all four divine shrines in one epic spiritual journey of a lifetime.',
    placesCovered: [
      { name: 'Yamunotri', img: imgSets.kedarnath[1] }, { name: 'Gangotri', img: imgSets.kedarnath[0] }, { name: 'Kedarnath', img: imgSets.kedarnath[2] }, { name: 'Badrinath', img: imgSets.kedarnath[3] }
    ],
    accommodation: {
      type: 'Premium Yatra Hotels & Camps',
      desc: 'Rest and rejuvenate in our carefully vetted accommodations designed specifically for the rigorous Char Dham yatra pilgrims.',
      amenities: ['Comfortable Beds', 'Scenic Mountain View', 'Hygienic Sattvic Food', 'Medical Assistance Info']
    },
    days: [
      { day: 1, title: 'Haridwar to Barkot', desc: 'Depart from Haridwar and drive to Barkot. Check into the hotel.', img: imgSets.kedarnath[0], meals: 'Dinner' },
      { day: 2, title: 'Yamunotri Trek', desc: 'Drive to Jankichatti and start your trek to Yamunotri. Later drive back towards Barkot.', img: imgSets.kedarnath[1], meals: 'Breakfast + Dinner' },
      { day: 3, title: 'Barkot to Uttarkashi', desc: 'Visit Kashi Vishwanath Temple in Uttarkashi city.', img: imgSets.kedarnath[2], meals: 'Breakfast + Dinner' },
      { day: 4, title: 'Gangotri Darshan', desc: 'Drive to Gangotri. Enroute at Gangnani take a holy dip in Garam Kund.', img: imgSets.kedarnath[3], meals: 'Breakfast + Dinner' },
      { day: 5, title: 'Uttarkashi to Guptkashi', desc: 'Drive to Guptkashi via Moolgarh & Lambgaon.', img: imgSets.kedarnath[4], meals: 'Breakfast + Dinner' },
      { day: 6, title: 'Kedarnath Trek', desc: 'Drive to Gaurikund and commence the 14km trek to Kedarnath.', img: imgSets.kedarnath[1], meals: 'Breakfast + Dinner' },
      { day: 7, title: 'Kedarnath to Guptkashi', desc: 'Trek back to Gaurikund after morning darshan.', img: imgSets.kedarnath[2], meals: 'Breakfast + Dinner' },
      { day: 8, title: 'Guptkashi to Badrinath', desc: 'Drive to Badrinath. Have Darshan of Badrivishal.', img: imgSets.kedarnath[3], meals: 'Breakfast + Dinner' },
      { day: 9, title: 'Badrinath to Rudraprayag', desc: 'Drive for Rudraprayag via Joshimath.', img: imgSets.kedarnath[0], meals: 'Breakfast + Dinner' },
      { day: 10, title: 'Rudraprayag to Haridwar', desc: 'Your Chardham Yatra journey will end in Haridwar.', img: imgSets.kedarnath[4], meals: 'Breakfast' },
    ],
    priceTable: [{ label: 'Contact for Pricing', price: 'Call Us' }],
    batches: [{ month: 'MAY-OCT', dates: ['Weekly Departures'] }],
  },
  {
    id: 4, title: 'Kashmir Escape', subtitle: 'Heaven on Earth – 7N/8D', cat: 'Nature', dur: '8D / 7N', price: 14000,
    themeColor: '#10B981', themeGlow: 'rgba(16, 185, 129, 0.4)', // Nature Green
    badge: 'Heaven', badgeC: '#10B981', img: kashmirEscape, heroImg: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&q=80&w=2000", loc: 'Pahalgam · Gulmarg · Sonmarg · Srinagar',
    inc: ['Transportation (AC Volvo)', 'Accommodation', 'Meals (Breakfast & Dinner)', 'Shikara Ride', 'All transfers'],
    exc: ['Personal expenses', 'Monument entry fees', 'Cable car / Pony ride', '5% GST'],
    desc: 'Discover the paradise on earth – snow-capped mountains, serene valleys, Dal Lake houseboats, Shikara rides and the magical beauty of Kashmir.',
    placesCovered: [
      { name: 'Pahalgam', img: imgSets.kashmir[1] }, { name: 'Gulmarg', img: imgSets.kashmir[3] }, { name: 'Sonmarg', img: imgSets.kashmir[4] }, { name: 'Dal Lake', img: imgSets.kashmir[6] }
    ],
    accommodation: {
      type: 'Luxury Houseboats & Premium Hotels',
      desc: 'Experience royal comfort in our carefully selected premium hotels and iconic Dal Lake luxury houseboats with stunning views.',
      amenities: ['Heated Premium Beds', 'Lake/Mountain View', 'Hygienic Wazwan Food', 'Free Wi-Fi']
    },
    days: [
      { day: 1, title: 'Delhi to Jammu', desc: 'Overnight journey in AC Volvo Bus to Jammu.', img: imgSets.kashmir[0], meals: 'No Meals' },
      { day: 2, title: 'Jammu to Pahalgam', desc: 'Morning arrival at Jammu. Transfer to Pahalgam. Check in at hotel, evening free.', img: imgSets.kashmir[1], meals: 'Dinner' },
      { day: 3, title: 'Pahalgam Sightseeing', desc: 'Visit Aru Valley, Betab Valley, Chandanwari Lake.', img: imgSets.kashmir[2], meals: 'Breakfast + Dinner' },
      { day: 4, title: 'Gulmarg Sightseeing', desc: 'Proceed for Gulmarg sightseeing. Visit Drung Waterfall, explore gondola ride.', img: imgSets.kashmir[3], meals: 'Breakfast + Dinner' },
      { day: 5, title: 'Sonmarg Sightseeing', desc: 'Transfer to Sonamarg – Meadow of Gold. Explore Zojila Pass.', img: imgSets.kashmir[4], meals: 'Breakfast + Dinner' },
      { day: 6, title: 'Srinagar Local Sightseeing', desc: 'Visit local sightseeing – Nishat Bagh. Check into Houseboat in Dal Lake.', img: imgSets.kashmir[5], meals: 'Breakfast + Dinner' },
      { day: 7, title: 'Shikara Ride & Departure', desc: 'Enjoy Shikara ride on Dal Lake. Departure to Delhi.', img: imgSets.kashmir[6], meals: 'Breakfast' },
      { day: 8, title: 'Delhi Arrival', desc: 'Arrival to Delhi by morning. End of tour.', img: imgSets.kashmir[7], meals: 'No Meals' },
    ],
    priceTable: [{ label: 'Quad Sharing', price: '₹14,000' }, { label: 'Double Sharing', price: '₹15,500' }],
    batches: [{ month: 'EVERY FRIDAY', dates: ['Weekly Departure'] }],
  },
  {
    id: 5, title: 'Kedarkantha Trek', subtitle: 'Summit at 12,500 ft', cat: 'Adventure', dur: '5D / 4N', price: 4500,
    themeColor: '#6366F1', themeGlow: 'rgba(99, 102, 241, 0.4)', // Summit Indigo
    badge: 'Trek', badgeC: '#6366F1', img: kedarnathTrek, heroImg: `${kedarnathTrek}`, loc: 'Dehradun · Sankri · Summit',
    inc: ['Meals (Breakfast, Lunch, Snacks & Dinner)', 'Camping (Tents)', 'Forest Permits', 'Guide / Team Captain', 'Safety Equipment', 'Transportation from Dehradun'],
    exc: ['Meals during transit', 'Accommodation in Dehradun', 'Backpack offloading', '5% GST'],
    desc: 'Conquer the majestic Kedarkantha peak at 12,500 ft – dense pine forests, frozen lakes, panoramic Himalayan views and a thrilling summit climb.',
    placesCovered: [
      { name: 'Sankri Base', img: imgSets.kedarkantha[0] }, { name: 'Juda Ka Talab', img: imgSets.kedarkantha[1] }, { name: 'Kedarkantha Summit', img: imgSets.kedarkantha[3] }
    ],
    accommodation: {
      type: 'Trekker Tents & Cozy Homestays',
      desc: 'Experience the raw beauty of the Himalayas staying in high-altitude extreme weather tents and warm traditional homestays at the base.',
      amenities: ['Sleeping Bags & Mats', 'Starry Night Views', 'Nutritious Trek Food', 'Bonfire (Where Allowed)']
    },
    days: [
      { day: 1, title: 'Dehradun to Sankri', desc: 'Scenic drive through Mussoorie, Naugaon, Purola. Overnight stay in Sankri.', img: imgSets.kedarkantha[0], meals: 'Snacks + Dinner' },
      { day: 2, title: 'Sankri to Juda Ka Talab', desc: 'Trek starts with a gradual ascent through dense pine forests. Camp setup near the lake.', img: imgSets.kedarkantha[1], meals: 'Breakfast + Lunch + Dinner' },
      { day: 3, title: 'Juda Ka Talab to Kedarkantha Base', desc: 'Trek continues through meadows. Reach Kedarkantha Base and set up camp.', img: imgSets.kedarkantha[2], meals: 'Breakfast + Lunch + Dinner' },
      { day: 4, title: 'Kedarkantha Summit Climb', desc: 'Early morning summit climb. Panoramic Himalayan views. Descend back to Juda Ka Talab.', img: imgSets.kedarkantha[3], meals: 'Breakfast + Lunch + Dinner' },
      { day: 5, title: 'Descend to Sankri & Drive Back', desc: 'Descend to Sankri. Drive back to Dehradun.', img: imgSets.kedarkantha[4], meals: 'Breakfast + Lunch' },
    ],
    priceTable: [{ label: 'Ex-Sankri', price: '₹4,500' }, { label: 'Ex-Dehradun', price: '₹5,000' }, { label: 'Ex-Delhi', price: '₹6,000' }],
    batches: [{ month: 'EVERYDAY', dates: ['Daily Departure'] }],
  },
  {
    id: 6, title: 'Himachal Heaven Escape', subtitle: 'Dharamshala · Bir Billing · Manali', cat: 'Adventure', dur: '7D / 6N', price: 14000,
    themeColor: '#0EA5E9', themeGlow: 'rgba(14, 165, 233, 0.4)', // Sky Blue
    badge: 'Adventure', badgeC: '#0EA5E9', img: himachalHeaven, heroImg: `${himachalHeaven}`, loc: 'Dharamshala · Bir Billing · Manali',
    inc: ['Transportation', 'Accommodation', 'Meals (Breakfast & Dinner)', 'Paragliding at Bir Billing', 'River Rafting in Kullu'],
    exc: ['Insurance, rescue', 'Lunch', 'Personal expenses', 'Heater charges', '5% GST'],
    desc: 'The ultimate Himachal adventure – paragliding at Bir Billing, river rafting in Kullu, snow at Solang Valley, and the hippie vibes of Kasol.',
    placesCovered: [
      { name: 'Dharamshala', img: imgSets.manaliKasol[0] }, { name: 'Bir Billing', img: 'https://images.unsplash.com/photo-1520630713504-20a2130eec95?auto=format&fit=crop&q=80&w=600' }, { name: 'Manali / Solang', img: imgSets.manaliKasol[2] }, { name: 'Kasol', img: imgSets.manaliKasol[3] }
    ],
    accommodation: {
      type: 'Premium Hotels & Scenic Camps',
      desc: 'Experience comfort in our carefully selected premium hotels with stunning mountain views and modern amenities after your adventurous days.',
      amenities: ['Comfortable Beds', 'Scenic Valley View', 'Hygienic Food', 'Free Wi-Fi']
    },
    days: [
      { day: 1, title: 'Delhi to Dharamshala', desc: 'Departure from Delhi to Dharamshala in the evening by Volvo.', img: imgSets.manaliKasol[0], meals: 'No Meals' },
      { day: 2, title: 'Arrival in Dharamshala', desc: 'Proceed for local sightseeing – Dalai Lama Temple, Bhagsu Waterfall, Mall Road.', img: imgSets.manaliKasol[1], meals: 'Dinner' },
      { day: 3, title: 'Dharamshala to Bir Billing', desc: 'Departure to Bir Billing. Experience world-class paragliding!', img: 'https://images.unsplash.com/photo-1520630713504-20a2130eec95?auto=format&fit=crop&q=80&w=1200', meals: 'Breakfast + Dinner' },
      { day: 4, title: 'Departure for Manali', desc: 'Enroute river rafting in Kullu. Visit Hidamba Temple in Manali.', img: imgSets.manaliKasol[3], meals: 'Breakfast + Dinner' },
      { day: 5, title: 'Solang Valley', desc: 'Advancement towards Atal Tunnel and Solang Valley. Explore local market.', img: imgSets.manaliKasol[1], meals: 'Breakfast + Dinner' },
      { day: 6, title: 'Manali to Kasol', desc: 'Departure to Kasol. Explore Parvati Valley and Manikaran.', img: imgSets.manaliKasol[4], meals: 'Breakfast' },
      { day: 7, title: 'Delhi Arrival', desc: 'Arrival to Delhi by 11 AM. End of tour.', img: imgSets.manaliKasol[5], meals: 'No Meals' },
    ],
    priceTable: [{ label: 'Quad Sharing', price: '₹14,000' }, { label: 'Double Sharing', price: '₹16,000' }],
    batches: [{ month: 'JAN-APR', dates: ['Weekly Departures'] }],
  },
  {
    id: 7, title: 'Spiti Valley Winter', subtitle: 'The Land of Lamas – 6N/7D', cat: 'Adventure', dur: '7D / 6N', price: 17000,
    themeColor: '#38BDF8', themeGlow: 'rgba(56, 189, 248, 0.4)', // Frozen Blue
    badge: 'Winter', badgeC: '#38BDF8', img: spitiValley, heroImg: `${spitiValley}`, loc: 'Chitkul · Tabo · Kaza · Kalpa',
    inc: ['Accommodation (Homestays)', 'Transportation via Volvo', '12 Meals (Breakfast + Dinner)', 'Inner line permits', 'Trip captain'],
    exc: ['Insurance, rescue', 'Lunch', 'Personal expenses', 'Heater charges', '5% GST'],
    desc: 'Venture into the frozen wilderness of Spiti Valley – ancient monasteries, highest post office, and breathtaking snow landscapes.',
    placesCovered: [
      { name: 'Chitkul', img: imgSets.spiti[1] }, { name: 'Tabo Monastery', img: imgSets.spiti[2] }, { name: 'Kaza', img: imgSets.spiti[3] }, { name: 'Chicham Bridge', img: imgSets.spiti[4] }
    ],
    accommodation: {
      type: 'Warm Traditional Homestays',
      desc: 'Experience authentic Spitian hospitality in cozy, traditionally heated homestays that protect you from the extreme winter cold.',
      amenities: ['Traditional Heating (Tandoor)', 'Snow-clad Mountain View', 'Authentic Local Food', 'Warm Blankets']
    },
    days: [
      { day: 1, title: 'Departure from Delhi', desc: 'Leave Delhi by around 9:00 PM. Overnight journey to Shimla.', img: imgSets.spiti[0], meals: 'No Meals' },
      { day: 2, title: 'Shimla to Chitkul', desc: 'Transfer to Chitkul/Sangla. Reach Chitkul by evening.', img: imgSets.spiti[1], meals: 'Dinner' },
      { day: 3, title: 'Chitkul to Tabo', desc: 'Explore Chitkul. Leave for Tabo via Khab Sangam and Nako.', img: imgSets.spiti[2], meals: 'Breakfast + Dinner' },
      { day: 4, title: 'Tabo to Kaza', desc: 'Visit Tabo Monastery & Tabo Cave (1000 years old).', img: imgSets.spiti[3], meals: 'Breakfast + Dinner' },
      { day: 5, title: 'Chicham Bridge', desc: 'Visit Key Monastery and Chicham Bridge – Asia\'s highest suspension bridge.', img: imgSets.spiti[4], meals: 'Breakfast + Dinner' },
      { day: 6, title: 'Hikkim & Langza', desc: 'Visit world\'s highest post office in Hikkim, Komic, and Langza.', img: imgSets.spiti[5], meals: 'Breakfast + Dinner' },
      { day: 7, title: 'Kalpa to Delhi', desc: 'View of Kinner Kailash. Drive to Shimla and depart for Delhi.', img: imgSets.spiti[6], meals: 'Breakfast' },
    ],
    priceTable: [{ label: 'Triple Sharing', price: '₹17,000' }, { label: 'Double Sharing', price: '₹18,000' }],
    batches: [{ month: 'OCT-JAN', dates: ['Weekly Departures'] }],
  },
];

const CATS = ['All', 'Spiritual', 'Nature', 'Adventure'];

// ─── COMPONENT: TEXT SPLITTER ───
const SplitText = ({ text }) => {
  return (
    <span className="inline-block overflow-hidden">
      {text.split(" ").map((word, i) => (
        <span key={i} className="pack-hero-word inline-block translate-y-full mr-[0.3em]">{word}</span>
      ))}
    </span>
  );
};

// ════════════════════════════════════════════════════════════════════════
// MAIN PACKAGES COMPONENT
// ════════════════════════════════════════════════════════════════════════
export default function Packages() {
  const [view, setView] = useState('list'); // 'list' | 'detail' | 'checkout'
  const [cat, setCat] = useState('All');
  const [pkg, setPkg] = useState(null); 
  const [activeDay, setActiveDay] = useState(0);
  const [guests, setGuests] = useState(1);
  const dayImgRef = useRef(null);

  const list = PACKAGES.filter(p => cat === 'All' || p.cat === cat);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view]);

  useEffect(() => {
    if (view === 'list') {
      gsap.fromTo('.pkg-card', { opacity: 0, y: 50 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out' });
    }
  }, [cat, view]);

  useEffect(() => {
    if (view === 'detail' && dayImgRef.current) {
      gsap.fromTo(dayImgRef.current, { opacity: 0, scale: 1.05 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' });
      if (activeDay === 0) {
        gsap.to(".pack-hero-word", { y: "0%", duration: 1.2, stagger: 0.05, delay: 0.3, ease: "power4.out" });
      }
    }
  }, [activeDay, view, pkg]);

  const openDetail = (selected) => {
    setPkg(selected); setActiveDay(0); setGuests(1); setView('detail');
  };

  // ════════════════════════════════════════════════════════════════
  // RENDER VIEW 3: CHECKOUT (50% ADVANCE)
  // ════════════════════════════════════════════════════════════════
  if (view === 'checkout' && pkg) {
    const totalAmount = pkg.price * guests;
    const advanceAmount = totalAmount / 2;

    return (
      <div className="bg-[#050505] min-h-screen text-white font-['Outfit',sans-serif] flex items-center justify-center py-24 px-4 relative">
        <button onClick={() => setView('detail')} className="fixed top-24 md:top-32 left-6 md:left-12 z-[999] flex items-center gap-2 px-6 py-3 bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-[0_0_20px_rgba(0,0,0,0.8)]">
          <ArrowLeftIcon /> Back
        </button>

        <div className="w-full max-w-5xl bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden flex flex-col md:flex-row relative z-10 mt-16 md:mt-0" style={{ boxShadow: `0 0 50px ${pkg.themeGlow}` }}>
          
          <div className="w-full md:w-2/5 p-10 md:p-12 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-between bg-gradient-to-b from-white/5 to-transparent relative overflow-hidden">
            <div className="absolute top-[-20%] left-[-20%] w-[300px] h-[300px] blur-[80px] rounded-full pointer-events-none" style={{ backgroundColor: pkg.themeGlow }} />
            <div className="relative z-10">
              <p className="text-[10px] tracking-[4px] uppercase mb-3 font-bold" style={{ color: pkg.themeColor }}>Order Summary</p>
              <h2 className="text-3xl md:text-4xl font-['Playfair_Display',serif] mb-8 leading-tight">{pkg.title}</h2>
              <div className="space-y-4 text-sm font-light text-white/70 mb-8">
                <div className="flex justify-between"><span>Base Price</span><span>₹{pkg.price.toLocaleString()}</span></div>
                <div className="flex justify-between"><span>Guests</span><span>x {guests}</span></div>
                <div className="w-full h-px bg-white/10 my-4" />
                <div className="flex justify-between text-white font-bold text-lg"><span>Total Trip Cost</span><span>₹{totalAmount.toLocaleString()}</span></div>
              </div>
            </div>
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl relative z-10">
              <p className="text-[10px] mb-2 uppercase tracking-widest font-bold" style={{ color: pkg.themeColor }}>To Pay Now (50% Advance)</p>
              <p className="text-4xl md:text-5xl font-bold" style={{ color: pkg.themeColor }}>₹{advanceAmount.toLocaleString()}</p>
            </div>
          </div>

          <div className="w-full md:w-3/5 p-10 md:p-16">
            <div className="flex items-center gap-3 mb-10 text-white/50 border-b border-white/10 pb-6">
              <ShieldIcon /> <span className="text-xs uppercase tracking-[3px] text-green-400 font-bold">Secure SSL Checkout</span>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); alert('Redirecting to Razorpay/Stripe Secure Gateway...'); }} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div><label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 font-bold">Full Name</label><input type="text" required className="w-full bg-transparent border-b border-white/20 py-2 focus:outline-none transition-colors text-white" style={{ focusBorderColor: pkg.themeColor }} placeholder="John Doe" /></div>
                <div><label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 font-bold">Email Address</label><input type="email" required className="w-full bg-transparent border-b border-white/20 py-2 focus:outline-none transition-colors text-white" placeholder="you@example.com" /></div>
                <div><label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 font-bold">Phone Number</label><input type="tel" required className="w-full bg-transparent border-b border-white/20 py-2 focus:outline-none transition-colors text-white" placeholder="+91 XXXXX XXXXX" /></div>
                <div><label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 font-bold">Travel Date</label><input type="date" required className="w-full bg-transparent border-b border-white/20 py-2 focus:outline-none transition-colors text-white/80" /></div>
              </div>
              <div className="pt-8">
                <button type="submit" className="w-full py-5 text-black font-black text-sm tracking-[3px] uppercase rounded-xl transition-all flex justify-center items-center gap-3 hover:opacity-90" style={{ backgroundColor: pkg.themeColor, boxShadow: `0 10px 30px ${pkg.themeGlow}` }}>
                  <LockIcon /> Pay ₹{advanceAmount.toLocaleString()}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // ════════════════════════════════════════════════════════════════
  // RENDER VIEW 2: FULL PAGE PACKAGE DETAIL
  // ════════════════════════════════════════════════════════════════
  if (view === 'detail' && pkg) {
    return (
      <div className="bg-[#050505] min-h-screen text-white font-['Outfit',sans-serif] pb-32 relative">
        
        {/* FIXED BACK BUTTON */}
        <button onClick={() => setView('list')} className="fixed top-24 md:top-32 left-6 md:left-12 z-[999] flex items-center gap-2 px-6 py-3 bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-[0_0_20px_rgba(0,0,0,0.8)]">
          <ArrowLeftIcon /> Back
        </button>

        {/* Intelligent Dynamic Particles (Snow/Petals/Leaves) */}
        <IntelligentVibe pkgTitle={pkg.title} cat={pkg.cat} />

        {/* Cinematic Hero */}
        <div className="relative h-[70vh] md:h-[85vh] w-full overflow-hidden rounded-b-[40px] shadow-2xl border-b border-white/10">
          <div className="absolute inset-0">
            <img src={pkg.heroImg} alt={pkg.title} className="w-full h-full object-cover animate-[ping_40s_linear_infinite] scale-110" style={{ animationDirection: 'alternate' }} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
          </div>

          <div className="absolute bottom-16 left-6 md:left-20 z-30 max-w-5xl">
            <div className="inline-block px-5 py-2 rounded-full text-[10px] tracking-[4px] uppercase mb-6 font-bold text-black shadow-lg" style={{ backgroundColor: pkg.themeColor }}>
              {pkg.dur} · {pkg.loc.split('·')[0]}
            </div>
            <h1 className="text-5xl md:text-7xl font-['Playfair_Display',serif] leading-tight mb-4 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] font-bold text-white">
              <SplitText text={pkg.title} />
            </h1>
            <p className="text-xl md:text-3xl text-white/90 font-light drop-shadow-md">{pkg.subtitle}</p>
          </div>
        </div>

        {/* Content Layout */}
        <div className="container mx-auto px-6 md:px-10 mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 relative z-20">
          
          {/* LEFT: Details */}
          <div className="lg:col-span-8">
            
            {/* PLACES COVERED SECTION (NEW) */}
            <div className="mb-20">
              <h3 className="text-sm font-bold uppercase tracking-[5px] mb-6" style={{ color: pkg.themeColor }}>Places Covered</h3>
              <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide">
                {pkg.placesCovered.map((place, i) => (
                  <div key={i} className="min-w-[200px] md:min-w-[250px] relative rounded-2xl overflow-hidden group border border-white/10">
                    <img src={place.img} alt={place.name} className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-sm font-bold tracking-wider">{place.name}</div>
                  </div>
                ))}
              </div>
            </div>

            <h3 className="text-sm font-bold uppercase tracking-[5px] mb-6" style={{ color: pkg.themeColor }}>The Experience</h3>
            <p className="text-white/80 leading-relaxed font-light text-base md:text-lg mb-20">{pkg.desc}</p>

            {/* PREMIUM ACCOMMODATION SECTION (NEW) */}
            <div className="mb-24 bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 md:p-10 relative overflow-hidden">
              <div className="absolute top-[-50%] right-[-10%] w-[300px] h-[300px] rounded-full blur-[100px] opacity-20 pointer-events-none" style={{ backgroundColor: pkg.themeColor }} />
              <h3 className="text-3xl font-['Playfair_Display',serif] mb-3 font-bold">Premium Accommodations</h3>
              <p className="text-sm text-white/60 mb-8 max-w-2xl leading-relaxed">{pkg.accommodation.desc}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex flex-col items-center text-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div style={{ color: pkg.themeColor }}><BedIcon /></div>
                  <span className="text-[10px] uppercase tracking-widest text-white/70 font-bold">{pkg.accommodation.amenities[0]}</span>
                </div>
                <div className="flex flex-col items-center text-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div style={{ color: pkg.themeColor }}><MountainIcon /></div>
                  <span className="text-[10px] uppercase tracking-widest text-white/70 font-bold">{pkg.accommodation.amenities[1]}</span>
                </div>
                <div className="flex flex-col items-center text-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div style={{ color: pkg.themeColor }}><FoodIcon /></div>
                  <span className="text-[10px] uppercase tracking-widest text-white/70 font-bold">{pkg.accommodation.amenities[2]}</span>
                </div>
                <div className="flex flex-col items-center text-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div style={{ color: pkg.themeColor }}><WifiIcon /></div>
                  <span className="text-[10px] uppercase tracking-widest text-white/70 font-bold">{pkg.accommodation.amenities[3]}</span>
                </div>
              </div>
            </div>

            {/* ITINERARY */}
            <div className="mb-20">
              <h3 className="text-3xl md:text-5xl font-['Playfair_Display',serif] mb-10 font-bold">The Itinerary</h3>
              
              <div className="flex flex-wrap gap-3 mb-10 bg-white/5 p-2.5 rounded-2xl border border-white/10 w-fit backdrop-blur-md">
                {pkg.days.map((d, i) => (
                  <button key={i} onClick={() => setActiveDay(i)} 
                    className="px-6 py-3 rounded-xl text-xs font-bold tracking-widest uppercase transition-all"
                    style={activeDay === i ? { backgroundColor: pkg.themeColor, color: '#000', boxShadow: `0 0 15px ${pkg.themeGlow}` } : { color: 'rgba(255,255,255,0.6)' }}>
                    Day {d.day}
                  </button>
                ))}
              </div>
              
              <div className="flex flex-col md:flex-row gap-0 bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl">
                <div className="w-full md:w-1/2 overflow-hidden bg-black relative">
                  <img ref={dayImgRef} src={pkg.days[activeDay].img} alt="Day view" className="w-full h-64 md:h-[450px] object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a0a]/80 hidden md:block" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent block md:hidden" />
                </div>
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative z-10">
                  <p className="text-[10px] font-bold tracking-[4px] uppercase mb-3" style={{ color: pkg.themeColor }}>Day {pkg.days[activeDay].day}</p>
                  <h4 className="text-2xl md:text-3xl font-['Playfair_Display',serif] mb-6 font-bold">{pkg.days[activeDay].title}</h4>
                  <p className="text-white/70 font-light leading-relaxed text-sm mb-8">{pkg.days[activeDay].desc}</p>
                  <div className="mt-auto inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-white w-fit">
                    <ClockIcon /> {pkg.days[activeDay].meals}
                  </div>
                </div>
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
              <div className="bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20 p-8 md:p-10 rounded-3xl backdrop-blur-md">
                <h3 className="text-xs font-bold uppercase tracking-[4px] text-green-400 mb-8">What's Included</h3>
                <ul className="space-y-5">
                  {pkg.inc.map((item, i) => <li key={i} className="flex items-start gap-4 text-sm text-white/80 leading-relaxed font-medium"><span className="text-green-400 mt-1"><CheckIcon /></span> {item}</li>)}
                </ul>
              </div>
              <div className="bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/20 p-8 md:p-10 rounded-3xl backdrop-blur-md">
                <h3 className="text-xs font-bold uppercase tracking-[4px] text-red-400 mb-8">Not Included</h3>
                <ul className="space-y-5">
                  {pkg.exc.map((item, i) => <li key={i} className="flex items-start gap-4 text-sm text-white/60 leading-relaxed font-medium"><span className="text-red-400 mt-1"><CrossIcon /></span> {item}</li>)}
                </ul>
              </div>
            </div>

            {/* Batch & Pricing Tables */}
            {(pkg.batches || pkg.priceTable) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                {pkg.priceTable && (
                  <div className="bg-[#0a0a0a] border border-white/10 p-8 md:p-10 rounded-3xl">
                    <h3 className="text-xs font-bold uppercase tracking-[4px] mb-8 flex items-center gap-2" style={{ color: pkg.themeColor }}><PriceIcon /> Pricing Table</h3>
                    <div className="space-y-4">
                      {pkg.priceTable.map(p => <div key={p.label} className="flex justify-between items-center pb-4 border-b border-white/5 last:border-0"><span className="text-sm text-white/70 font-medium">{p.label}</span><span className="text-xl font-bold text-white">{p.price}</span></div>)}
                    </div>
                  </div>
                )}
                {pkg.batches && (
                  <div className="bg-[#0a0a0a] border border-white/10 p-8 md:p-10 rounded-3xl">
                    <h3 className="text-xs font-bold uppercase tracking-[4px] mb-8 flex items-center gap-2" style={{ color: pkg.themeColor }}><CalendarIcon /> Upcoming Batches</h3>
                    <div className="space-y-5">
                      {pkg.batches.map(b => (
                        <div key={b.month}>
                          <div className="text-[10px] font-bold tracking-widest text-white/40 uppercase mb-2">{b.month}</div>
                          <div className="flex flex-wrap gap-2 text-sm font-bold" style={{ color: pkg.themeColor }}>
                            {b.dates.map((d, i) => <span key={d} className="bg-white/5 border border-white/5 px-3 py-1.5 rounded-lg">{d}</span>)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Policies */}
            <div className="mb-20">
              <h3 className="text-xs font-bold uppercase tracking-[4px] mb-8" style={{ color: pkg.themeColor }}>Policies & Terms</h3>
              <div className="bg-[#0a0a0a] border border-white/10 p-8 md:p-12 rounded-3xl">
                <div className="mb-10">
                  <p className="text-[10px] font-bold text-white/40 mb-4 uppercase tracking-widest border-b border-white/10 pb-2">Payment Structure</p>
                  <p className="text-sm text-white/80 mb-2 font-medium">1. {COMMON_POLICIES.paymentPolicy.booking}</p>
                  <p className="text-sm text-white/80 font-medium">2. {COMMON_POLICIES.paymentPolicy.full}</p>
                </div>
                <div className="mb-10">
                  <p className="text-[10px] font-bold text-white/40 mb-4 uppercase tracking-widest border-b border-white/10 pb-2">Bank Details</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-6 text-sm">
                    {Object.entries(COMMON_POLICIES.paymentDetails).map(([k, v]) => <div key={k} className="flex flex-col"><span className="uppercase text-[10px] tracking-wider mb-1 font-bold" style={{ color: pkg.themeColor }}>{k}</span><span className="text-white font-medium text-base">{v}</span></div>)}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-white/40 mb-4 uppercase tracking-widest border-b border-white/10 pb-2">Important Terms</p>
                  {COMMON_POLICIES.termsAndConditions.map((t, i) => <p key={i} className="text-sm text-white/70 mb-3 leading-relaxed flex gap-3 font-medium"><span className="font-bold" style={{ color: pkg.themeColor }}>•</span> {t}</p>)}
                </div>
              </div>
            </div>
            
            {/* Contact Support */}
            <div className="p-8 md:p-10 border border-white/10 rounded-3xl flex flex-col sm:flex-row justify-between items-center gap-6 bg-gradient-to-r from-white/5 to-transparent">
              <div>
                <p className="text-[10px] font-bold tracking-[4px] uppercase text-white/40 mb-3">Need Help Booking?</p>
                <div className="flex flex-col sm:flex-row gap-5">
                  <a href="tel:+919243585890" className="flex items-center gap-2 text-base font-bold hover:text-white transition-colors" style={{ color: pkg.themeColor }}><PhoneIcon /> +91 92435 85890</a>
                  <a href="mailto:infotrippanther@gmail.com" className="flex items-center gap-2 text-base font-bold hover:text-white transition-colors" style={{ color: pkg.themeColor }}><MailIcon /> infotrippanther@gmail.com</a>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT: Sticky Booking Sidebar */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-32 bg-[#0a0a0a] border border-white/10 p-8 md:p-10 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden">
              <div className="absolute top-[-20%] right-[-20%] w-64 h-64 rounded-full blur-[80px] pointer-events-none" style={{ backgroundColor: pkg.themeGlow }} />
              
              <p className="text-[10px] font-bold uppercase tracking-[4px] mb-3 relative z-10" style={{ color: pkg.themeColor }}>Starting From</p>
              <div className="text-5xl font-['Playfair_Display',serif] font-bold text-white mb-2 relative z-10">₹{pkg.price.toLocaleString()}</div>
              <p className="text-xs text-white/40 mb-10 font-bold uppercase tracking-widest relative z-10">per person</p>

              <div className="mb-10 relative z-10">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-white/50 mb-4">Select Guests</label>
                <div className="flex items-center border border-white/20 rounded-2xl overflow-hidden bg-black">
                  <button onClick={() => setGuests(Math.max(1, guests - 1))} className="w-16 h-14 flex items-center justify-center text-white/70 hover:bg-white/10 transition-colors text-xl font-light" style={{ color: pkg.themeColor }}>-</button>
                  <div className="flex-1 text-center font-bold text-xl">{guests}</div>
                  <button onClick={() => setGuests(guests + 1)} className="w-16 h-14 flex items-center justify-center text-white/70 hover:bg-white/10 transition-colors text-xl font-light" style={{ color: pkg.themeColor }}>+</button>
                </div>
              </div>

              <div className="space-y-4 mb-10 relative z-10 p-6 bg-white/5 border border-white/5 rounded-2xl">
                <div className="flex justify-between text-sm text-white/80 font-medium"><span>Total Trip Price</span><span>₹{(pkg.price * guests).toLocaleString()}</span></div>
                <div className="w-full h-px bg-white/10" />
                <div className="flex justify-between text-lg font-bold" style={{ color: pkg.themeColor }}><span>Advance (50%)</span><span>₹{((pkg.price * guests) / 2).toLocaleString()}</span></div>
              </div>

              <button onClick={() => setView('checkout')} className="relative z-10 w-full py-5 text-black font-black text-[11px] tracking-[4px] uppercase rounded-2xl transition-all transform hover:scale-[1.02] hover:opacity-90" style={{ backgroundColor: pkg.themeColor, boxShadow: `0 10px 30px ${pkg.themeGlow}` }}>
                Proceed to Pay 50%
              </button>
              
              <p className="text-center text-[9px] text-white/40 mt-6 font-bold tracking-widest uppercase relative z-10 flex items-center justify-center gap-2">
                <LockIcon /> 256-bit Secure Checkout
              </p>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // ════════════════════════════════════════════════════════════════
  // RENDER VIEW 1: VIBRANT PACKAGE LIST (Cinematic Grid View)
  // ════════════════════════════════════════════════════════════════
  return (
    <div className="bg-[#050505] min-h-screen text-white font-['Outfit',sans-serif] selection:bg-white/20 selection:text-white pb-32 relative">
      <FilmNoise />
      
      {/* ─── NEW CINEMATIC HERO FOR PACKAGES ─── */}
      <div className="relative min-h-[60vh] md:min-h-[75vh] flex flex-col items-center justify-center overflow-hidden rounded-b-[40px] border-b border-white/10 shadow-2xl">
        <div className="absolute inset-0 z-0">
          <img src={heroImage} alt="Packages Hero" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-black/40 to-[#050505]" />
        </div>
        
        {/* Huge Parallax Background Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
          <h1 className="text-[25vw] font-black uppercase text-white/[0.02] tracking-tighter whitespace-nowrap">EXPLORE</h1>
        </div>

        <div className="relative z-10 text-center px-6 mt-20">
          <p className="text-xs font-bold tracking-[8px] uppercase mb-6 text-amber-400 drop-shadow-md">Discover The Unseen</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-['Playfair_Display',serif] font-bold text-white drop-shadow-2xl mb-8">
            Curated <em className="italic font-light text-white/80">Expeditions</em>
          </h1>
        </div>
      </div>

      {/* Sleek Filters */}
      <div className="container mx-auto px-6 py-12 flex justify-center gap-3 flex-wrap relative z-10 -mt-10">
        {CATS.map(c => (
          <button key={c} onClick={() => setCat(c)} 
            className={`px-8 py-3.5 rounded-full text-[10px] font-bold tracking-[3px] uppercase transition-all border backdrop-blur-xl shadow-xl ${cat === c ? 'border-amber-400 bg-amber-500 text-black scale-105' : 'border-white/10 bg-[#0a0a0a]/80 text-white/60 hover:bg-white/10 hover:text-white'}`}>
            {c}
          </button>
        ))}
      </div>

      {/* Package Grid (Hyper-Premium with Dynamic Colors) */}
      <div className="container mx-auto px-6 md:px-10 mt-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {list.map(p => (
            <div key={p.id} className="pkg-card group bg-[#0a0a0a] border border-white/10 rounded-[30px] cursor-pointer overflow-hidden hover:border-white/20 transition-all duration-500 flex flex-col" style={{ hoverBoxShadow: `0 20px 40px ${p.themeGlow}` }} onClick={() => openDetail(p)}>
              <div className="relative h-72 overflow-hidden">
                <img src={p.heroImg} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/20 to-transparent" />
                <div className="absolute top-5 left-5 px-4 py-2 bg-black/60 backdrop-blur-md text-[9px] font-bold uppercase tracking-[3px] rounded-full border border-white/20 shadow-lg" style={{ color: p.themeColor }}>
                  {p.cat}
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col relative">
                {/* Subtle Inner Glow on Hover */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 blur-[40px] rounded-full transition-all duration-500 pointer-events-none opacity-0 group-hover:opacity-100" style={{ backgroundColor: p.themeGlow }} />
                
                <p className="text-[10px] font-bold uppercase tracking-[3px] mb-3 relative z-10 flex items-center gap-1.5" style={{ color: p.themeColor }}><LocationIcon /> {p.dur} · {p.loc.split('·')[0]}</p>
                <h3 className="text-3xl font-['Playfair_Display',serif] mb-3 font-bold text-white transition-colors relative z-10 leading-tight group-hover:text-white" style={{ color: "white" }}>{p.title}</h3>
                <p className="text-sm text-white/50 font-light mb-8 line-clamp-2 relative z-10 leading-relaxed">{p.subtitle}</p>
                
                <div className="mt-auto flex justify-between items-end border-t border-white/10 pt-6 relative z-10">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">Starting From</div>
                    <div className="text-2xl font-bold text-white transition-colors" style={{ color: p.themeColor }}>₹{p.price.toLocaleString()}</div>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/5 transition-all duration-300" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                    <ArrowLeftIcon className="rotate-180 w-5 h-5 transition-colors" style={{ color: p.themeColor }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        /* Custom Scrollbar for a premium feel */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #050505; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #F59E0B; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
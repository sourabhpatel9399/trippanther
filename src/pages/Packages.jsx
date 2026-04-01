import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useApp } from '../context/AppContext';

import heroImage from '../assets/heroImage.jpg';
import kedarnath from '../assets/packeges/kedarnath_package.png';
import charDham from '../assets/packeges/charDham.jpg';
import kashmirEscape from '../assets/packeges/kashmir_escape.jpg';
import kedarnathTrek from '../assets/packeges/kedarnath_trek.png';
import himachalHeaven from '../assets/packeges/himachal_heaven.jpg';
import spitiValley from '../assets/packeges/spiti_valley.jpg';

// ========== PREMIUM SVG ICONS ==========
const LocationIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>);
const CheckIcon = () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>);
const CrossIcon = () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>);
const CalendarIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>);
const ClockIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>);
const PriceIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3" /><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></svg>);
const PhoneIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>);
const MailIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>);
const BookIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>);
const ViewIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>);
const ArrowIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>);
const DocumentIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>);

// Common Policies
const COMMON_POLICIES = {
  paymentPolicy: {
    booking: '30% of the total tour cost will be paid at booking time.',
    full: 'The full amount is to be paid 7 days prior to the departure.',
  },
  paymentDetails: {
    accountName: 'Trippanther',
    accountNumber: '100238204567',
    bankName: 'INDUSIND BANK',
    branchName: 'VIJAY NAGAR, INDORE',
    ifscCode: 'INDB0000878',
    accountType: 'Current Account',
    upiId: 'trippanther@axl',
  },
  termsAndConditions: [
    'Booking Amount is NOT REFUNDABLE! In case of Cancellations, charges will be levied.',
    'Trip can be cancelled or postponed due to Climate Change, Land Sliding, Red Alert, etc. Payment will not be refunded; adjust in next trip date.',
    'Heater and geyser facility will not be provided in Kedarnath Dham room as it is not a luxury tourist place.',
    'If weather conditions get serious, the yatra plan will be changed according to climate conditions.',
    'Act of misbehaviour will result into trip cancellation.',
    'In case of vehicle breakdown due to any reason, clients have to wait till it gets repaired.',
    'By booking a trip with us, you acknowledge that you accept all the terms and conditions described in this Agreement.',
  ],
};

const PACKAGES = [
  {
    id: 1, title: '2 Dham Yatra', subtitle: 'Kedarnath & Badrinath', cat: 'Spiritual', dur: '5D / 4N', price: 12500,
    badge: 'Sacred', badgeC: '#B8860B', img: kedarnath, heroImg: kedarnath,
    loc: 'Kedarnath · Badrinath · Haridwar',
    inc: ['Transportation', 'Accommodation as per itinerary', 'Meals (Breakfast and Dinner)', 'Sightseeing as per itinerary', 'All transfers as per itinerary', 'All toll taxes', 'Driver allowance with parking charges, oxygen cylinder', 'Yatra-E Pass', 'Coordinator Assistance', 'Kedarnath Camp Stay'],
    exc: ['Anything else not mentioned in inclusions', 'Personal expenses (tips, telephone, laundry, medication)', 'Monument entry fees / camera fees', 'Any adventure activity', '5% GST', 'Any cost due to natural calamities'],
    desc: 'Experience the divine journey to two of the most sacred Char Dham shrines – Kedarnath and Badrinath, nestled in the majestic Himalayas.',
    days: [
      { day: 1, title: 'Delhi/Haridwar to Guptkashi', desc: 'Morning: Depart from Haridwar and drive to Guptkashi, covering approximately 190 kilometers over 7-8 hours. Upon arrival, check into your hotel and rest. If time permits, explore local temples and surroundings.', img: kedarnath, meals: 'Dinner' },
      { day: 2, title: 'Guptkashi to Kedarnath', desc: 'After breakfast, drive to Gaurikund (1.5-hour drive). From Gaurikund, commence the 14-kilometer trek to Kedarnath. Reach Kedarnath, check into your accommodation, and rest. Attend the evening aarti at Kedarnath Temple.', img: kedarnath, meals: 'Breakfast + Dinner' },
      { day: 3, title: 'Kedarnath Ji to Guptkashi', desc: 'Participate in the early morning darshan at Kedarnath Temple. Begin the descent back to Gaurikund and drive to Guptkashi. Relax at your hotel in Guptkashi.', img: kedarnath, meals: 'Breakfast + Dinner' },
      { day: 4, title: 'Guptkashi to Badrinath', desc: 'Depart from Guptkashi/Sonprayag and drive to Badrinath via Joshimath, covering approximately 140 kilometers over 6-7 hours. Upon arrival in Badrinath, check into your hotel and visit the Badrinath Temple for evening darshan.', img: kedarnath, meals: 'Breakfast + Dinner' },
      { day: 5, title: 'Badrinath to Haridwar/Delhi', desc: 'Visit Badrinath Temple for Darshan. En route visit Devprayag, the famous and revered Dhari Devi Temple, etc. If time permits, continue the drive back to Haridwar/Rishikesh where we will drop you at the designated place with lots of fond memories.', img: kedarnath, meals: 'Breakfast' },
    ],
    priceTable: [{ label: 'Ex-Delhi', price: '₹13,500/-' }, { label: 'Ex-Haridwar', price: '₹12,500/-' }],
    batches: [
      { month: 'MAY', dates: ['1st', '3rd', '9th', '17th', '24th', '31st'] },
      { month: 'JUNE', dates: ['7th', '14th', '17th', '21st', '28th'] },
      { month: 'JULY', dates: ['5th', '12th', '26th'] },
      { month: 'AUGUST', dates: ['2nd', '9th', '15th', '23rd', '27th'] },
      { month: 'SEPTEMBER', dates: ['6th', '13th', '20th', '27th'] },
      { month: 'OCTOBER', dates: ['2nd', '7th', '11th', '18th', '20th', '22nd'] },
    ],
  },
  {
    id: 2, title: 'Char Dham Yatra', subtitle: 'Yamunotri · Gangotri · Kedarnath · Badrinath', cat: 'Spiritual', dur: '10D / 9N', price: 22000,
    badge: 'Divine', badgeC: '#8B4513', img: charDham, heroImg: charDham,
    loc: 'Yamunotri · Gangotri · Kedarnath · Badrinath',
    inc: ['Transportation', 'Accommodation as per itinerary', 'Meals (Breakfast and Dinner)', 'Sightseeing as per itinerary', 'All transfers', 'All toll taxes', 'Driver allowance, oxygen cylinder', 'Kedarnath Camp Stay'],
    exc: ['Anything else not mentioned', 'Personal expenses', 'Monument entry fees', 'Any adventure activity', '5% GST', 'Any cost due to natural calamities'],
    desc: 'Complete the sacred Char Dham circuit – visit all four divine shrines of Yamunotri, Gangotri, Kedarnath, and Badrinath in one epic spiritual journey.',
    days: [
      { day: 1, title: 'Delhi/Haridwar to Barkot', desc: 'Morning: Depart from Haridwar and drive to Barkot. Upon arrival, check into the hotel in Barkot. Overnight stay at Barkot.', img: charDham, meals: 'Dinner' },
      { day: 2, title: 'Barkot – Yamunotri – Barkot', desc: 'After breakfast, drive to Jankichatti/Phoolchatti and start your trek from here to Yamunotri (6 kms). Later drive back towards Barkot.', img: charDham, meals: 'Breakfast + Dinner' },
      { day: 3, title: 'Barkot to Uttarkashi', desc: 'Visit Shiv Gufa on the way to Uttarkashi. Visit Kashi Vishwanath Temple in Uttarkashi city.', img: charDham, meals: 'Breakfast + Dinner' },
      { day: 4, title: 'Uttarkashi – Gangotri – Uttarkashi', desc: 'Drive to Gangotri. Enroute at Gangnani take a holy dip in Garam Kund. Further drive to Gangotri via beautiful Harsil Valley.', img: charDham, meals: 'Breakfast + Dinner' },
      { day: 5, title: 'Uttarkashi to Guptkashi', desc: 'Drive to Guptkashi via Moolgarh & Lambgaon. Enroute you can see the beautiful river Mandakini at Tilwara.', img: charDham, meals: 'Breakfast + Dinner' },
      { day: 6, title: 'Guptkashi – Sonprayag – Kedarnath', desc: 'Drive to Gaurikund (1.5-hour drive). From Gaurikund, commence the 14-kilometer trek to Kedarnath.', img: charDham, meals: 'Breakfast + Dinner' },
      { day: 7, title: 'Kedarnath to Guptkashi Return', desc: 'Get up, checkout from Hotel/Camp at Kedarnath and trek back to Gaurikund. After completing the trek, check in the hotel.', img: charDham, meals: 'Breakfast + Dinner' },
      { day: 8, title: 'Guptkashi to Pipalkoti/Badrinath', desc: 'Drive to Badrinath. Check into the hotel on arrival. Have Darshan of Badrivishal & Aarti in the evening.', img: charDham, meals: 'Breakfast + Dinner' },
      { day: 9, title: 'Badrinath – Rudraprayag', desc: 'Drive for Rudraprayag via Joshimath if routes are open. Visit Narsingh Temple in Joshimath on the way.', img: charDham, meals: 'Breakfast + Dinner' },
      { day: 10, title: 'Rudraprayag to Haridwar/Delhi', desc: 'After breakfast, check out from the hotel. Your Chardham Yatra journey will end in Haridwar/Delhi.', img: charDham, meals: 'Breakfast' },
    ],
    priceTable: [{ label: 'Contact for Pricing', price: 'Call Us' }],
    batches: [{ month: 'MAY-OCT', dates: ['Weekly Departures'] }],
  },
  {
    id: 3, title: 'Kashmir Escape', subtitle: 'Heaven on Earth – 7N/8D', cat: 'Nature', dur: '8D / 7N', price: 14000,
    badge: 'Heaven on Earth', badgeC: '#1A6B5A', img: kashmirEscape, heroImg: kashmirEscape,
    loc: 'Pahalgam · Gulmarg · Sonmarg · Srinagar',
    inc: ['Transportation (AC Volvo Bus)', 'Accommodation as per itinerary', 'Meals (Breakfast and Dinner)', 'Shikara Ride for 1 Hour', 'All transfers', 'All toll taxes', 'Driver allowance, medical kit'],
    exc: ['Anything else not mentioned', 'Personal expenses', 'Monument entry fees', 'Any adventure activity', '5% GST', 'Visit Aru, Betab & Chandanwari (Union Cab)', 'Cable car / Pony ride', 'Heater charges'],
    desc: 'Discover the paradise on earth – snow-capped mountains, serene valleys, Dal Lake houseboats, Shikara rides and the magical beauty of Kashmir.',
    days: [
      { day: 1, title: 'Delhi to Jammu', desc: 'Transfer to Jammu by AC Volvo. Overnight journey in AC Volvo Bus. Pickup Point: Kashmeri Gate.', img: kashmirEscape, meals: 'No Meals' },
      { day: 2, title: 'Jammu to Pahalgam', desc: 'Morning arrival at Jammu. Transfer to Pahalgam. Check in at hotel, rest, evening free.', img: kashmirEscape, meals: 'Dinner' },
      { day: 3, title: 'Pahalgam Sightseeing', desc: 'After breakfast, proceed for Pahalgam sightseeing – visit Aru Valley, Betab Valley, Chandanwari Lake.', img: kashmirEscape, meals: 'Breakfast + Dinner' },
      { day: 4, title: 'Gulmarg Sightseeing', desc: 'After breakfast, proceed for Gulmarg sightseeing. Visit Drung Waterfall, explore gondola ride, horse ride.', img: kashmirEscape, meals: 'Breakfast + Dinner' },
      { day: 5, title: 'Sonmarg Sightseeing', desc: 'After breakfast, transfer to Sonamarg – Meadow of Gold. Explore Zojila Pass, Zero Point.', img: kashmirEscape, meals: 'Breakfast + Dinner' },
      { day: 6, title: 'Srinagar Local Sightseeing', desc: 'After breakfast, checkout from hotel and visit local sightseeing – Nishat Bagh, Mughal Garden. Check into Houseboat in Dal Lake.', img: kashmirEscape, meals: 'Breakfast + Dinner' },
      { day: 7, title: 'Shikara Ride & Departure', desc: 'After breakfast, checkout from Houseboat. Enjoy Shikara ride on Dal Lake. Departure to Delhi.', img: kashmirEscape, meals: 'Breakfast' },
      { day: 8, title: 'Delhi Arrival', desc: 'Arrival to Delhi by morning. End of tour with wonderful memories.', img: kashmirEscape, meals: 'No Meals' },
    ],
    priceTable: [{ label: 'Quad Sharing', price: '₹14,000' }, { label: 'Triple Sharing', price: '₹14,500' }, { label: 'Double Sharing', price: '₹15,500' }],
    batches: [{ month: 'EVERY FRIDAY', dates: ['Weekly Departure'] }],
  },
  {
    id: 4, title: 'Kedarkantha Trek', subtitle: 'Summit at 12,500 ft – 5D/4N', cat: 'Adventure', dur: '5D / 4N', price: 4500,
    badge: 'Trek', badgeC: '#2E6B3E', img: kedarnathTrek, heroImg: kedarnathTrek,
    loc: 'Dehradun · Sankri · Kedarkantha Summit',
    inc: ['Meals (Breakfast, Lunch, Snacks & Dinner)', 'Accommodation – Homestay/Hotel on shared basis', 'Camping on triple sharing basis (Tents)', 'Forest Permits & Camping Charges', 'Guide / Team Captain', 'Safety Equipment – First aid kit', 'Transportation from Dehradun to Dehradun'],
    exc: ['Meals during transit (Dehradun to Sankri & Sankri to Dehradun)', 'Accommodation in Dehradun', 'Personal Medicine Kit', 'Backpack offloading charges', '5% GST', 'Any emergency evacuation charges'],
    desc: 'Conquer the majestic Kedarkantha peak at 12,500 ft – dense pine forests, frozen lakes, panoramic Himalayan views and a thrilling summit climb await you.',
    days: [
      { day: 1, title: 'Dehradun to Sankri', desc: 'Pickup at Dehradun Railway Station at 8:00 AM. Scenic drive through Mussoorie, Naugaon, Purola. 210 km drive (9 hours). Overnight stay in Sankri.', img: kedarnathTrek, meals: 'Tea + Snacks + Dinner' },
      { day: 2, title: 'Sankri to Juda Ka Talab', desc: 'Trek starts with a gradual ascent through dense forests of pine and maple. Camp setup near the lake. 3 km trek – 4 hours.', img: kedarnathTrek, meals: 'Breakfast + Lunch + Dinner' },
      { day: 3, title: 'Juda Ka Talab to Kedarkantha Base Camp', desc: 'Trek continues through dense forests and meadows. Reach Kedarkantha Base and set up camp. 4 km trek – 3-4 hours.', img: kedarnathTrek, meals: 'Breakfast + Lunch + Dinner' },
      { day: 4, title: 'Kedarkantha Summit & Back to Juda Ka Talab', desc: 'Early morning summit climb. Panoramic views of the Himalayas from the top at 12,500 ft. Descend back to Juda Ka Talab.', img: kedarnathTrek, meals: 'Breakfast + Lunch + Dinner' },
      { day: 5, title: 'Juda Ka Talab to Sankri & Drive to Dehradun', desc: 'Descend from Juda Ka Talab to Sankri. Drive back to Dehradun. Drop-off at Dehradun Railway Station in the evening.', img: kedarnathTrek, meals: 'Breakfast + Lunch' },
    ],
    priceTable: [{ label: 'Ex-Sankri', price: '₹4,500' }, { label: 'Ex-Dehradun', price: '₹5,000' }, { label: 'Ex-Delhi', price: '₹6,000' }],
    batches: [{ month: 'EVERYDAY', dates: ['Daily Departure'] }, { month: 'NOTE', dates: ['15 Dec – 5 Jan: ₹500 extra per person'] }],
  },
  {
    id: 5, title: 'Himachal Heaven Escape', subtitle: 'Dharamshala · Bir Billing · Manali · Kasol', cat: 'Adventure', dur: '7D / 6N', price: 14000,
    badge: 'Adventure', badgeC: '#2E5090', img: himachalHeaven, heroImg: himachalHeaven,
    loc: 'Dharamshala · Bir Billing · Manali · Kasol',
    inc: ['Transportation as per itinerary', 'Accommodation as per itinerary', 'Meals (Breakfast and Dinner)', 'Sightseeing as per itinerary', 'All transfers', 'All toll taxes', 'Paragliding at Bir Billing', 'River Rafting in Kullu', 'Driver allowance, medical kit'],
    exc: ['Anything not mentioned in itinerary', 'Any cost due to natural calamities', 'Insurance, rescue, evacuation', 'Any lunch', 'Personal expenses', 'Heater charges'],
    desc: 'The ultimate Himachal adventure – paragliding at Bir Billing (world\'s 2nd highest paragliding site), river rafting in Kullu, snow at Solang Valley, and the hippie vibes of Kasol.',
    days: [
      { day: 1, title: 'Delhi to Dharamshala', desc: 'Departure from Delhi to Dharamshala in the evening by Volvo. Overnight journey.', img: himachalHeaven, meals: 'No Meals' },
      { day: 2, title: 'Arrival in Dharamshala', desc: 'Upon arrival, complete check-in at hotel. Proceed for local sightseeing – Dalai Lama Temple, Bhagsu Waterfall, Church, Mall Road.', img: himachalHeaven, meals: 'Dinner' },
      { day: 3, title: 'Dharamshala to Bir Billing', desc: 'After breakfast, departure to Bir Billing – world\'s second highest paragliding site. Experience paragliding! Explore local market.', img: himachalHeaven, meals: 'Breakfast + Dinner' },
      { day: 4, title: 'Departure for Manali', desc: 'After breakfast, departure for Manali. Enroute river rafting in Kullu. Arrival to Manali – visit Hidamba Temple, Vashishth, Club House, Mall Road.', img: himachalHeaven, meals: 'Breakfast + Dinner' },
      { day: 5, title: 'Atal Tunnel · Solang Valley · Sissu', desc: 'After breakfast, advancement towards Atal Tunnel and Solang Valley. Explore local market in evening.', img: himachalHeaven, meals: 'Breakfast + Dinner' },
      { day: 6, title: 'Manali to Kasol', desc: 'After breakfast, departure from Manali to Kasol. Explore Kasol market, cafes, Parvati Valley and Manikaran Gurudwara. Departure to Delhi.', img: himachalHeaven, meals: 'Breakfast' },
      { day: 7, title: 'Delhi Arrival', desc: 'Arrival to Delhi by 11 AM. End of tour with wonderful memories.', img: himachalHeaven, meals: 'No Meals' },
    ],
    priceTable: [{ label: 'Quad Sharing', price: '₹14,000' }, { label: 'Triple Sharing', price: '₹15,000' }, { label: 'Double Sharing', price: '₹16,000' }],
    batches: [{ month: 'JAN', dates: ['03–09', '10–16', '17–23', '24–30'] }, { month: 'FEB', dates: ['07–13', '14–20', '21–27'] }, { month: 'MAR', dates: ['07–13', '14–20', '21–27'] }, { month: 'APR', dates: ['04–10', '11–17', '18–24'] }],
  },
  {
    id: 6, title: 'Spiti Valley Winter Expedition', subtitle: 'The Land of Lamas – 6N/7D', cat: 'Adventure', dur: '7D / 6N', price: 17000,
    badge: 'Winter Special', badgeC: '#2C4A7C', img: spitiValley, heroImg: spitiValley,
    loc: 'Chitkul · Tabo · Kaza · Kalpa',
    inc: ['Accommodation for 6 nights (Homestays)', '1 Night Chitkul/Sangla | 1 Night Tabo/Nako | 3 Nights Kaza | 1 Night Kalpa', 'Transportation from Delhi to Delhi via Volvo Bus', 'Entire sightseeing by car/tempo traveller', 'Total 12 Meals (6 Breakfast + 6 Dinner)', 'All inner line permits', 'Trip captain throughout', 'All local sightseeing'],
    exc: ['Anything not mentioned in itinerary', 'Any cost due to natural calamities', 'Insurance, rescue, evacuation', 'Any lunch', 'Personal expenses', 'Heater charges'],
    desc: 'Venture into the frozen wilderness of Spiti Valley – ancient monasteries over 1000 years old, world\'s highest post office, Asia\'s highest suspension bridge (Chicham Bridge), and breathtaking snow landscapes.',
    days: [
      { day: 0, title: 'Departure from Delhi', desc: 'Leave Delhi by around 9:00 PM in the evening. Overnight journey to Shimla.', img: spitiValley, meals: 'No Meals' },
      { day: 1, title: 'Shimla – Transfer to Sangla/Chitkul', desc: 'Arrive Shimla by 7-8 AM. Transfer to Chitkul/Sangla. Visit Kinnaur Gate. Reach Chitkul/Sangla by evening.', img: spitiValley, meals: 'Dinner' },
      { day: 2, title: 'Chitkul – Khab Sangam – Tabo', desc: 'Wake up early, have breakfast. Leave for Chitkul exploration. Leave for Tabo via Khab Sangam and Nako.', img: spitiValley, meals: 'Breakfast + Dinner' },
      { day: 3, title: 'Tabo – Dhankar – Kaza', desc: 'After breakfast, leave for Kaza. Visit Tabo Monastery & Tabo Cave (1000 years old). Visit Dhankar Monastery.', img: spitiValley, meals: 'Breakfast + Dinner' },
      { day: 4, title: 'Kaza – Chicham Bridge – Key Monastery', desc: 'Wake up early, head towards Spiti sightseeing. Visit Key Monastery. Then head towards Chicham Bridge – Asia\'s highest suspension bridge.', img: spitiValley, meals: 'Breakfast + Dinner' },
      { day: 5, title: 'Hikkim – Komic – Langza', desc: 'Visit world\'s highest post office in Hikkim village. Visit Komic – world\'s highest village, and Langza – the fossil village.', img: spitiValley, meals: 'Breakfast + Dinner' },
      { day: 6, title: 'Kaza to Kalpa', desc: 'After breakfast, depart for Kalpa. On the way, cover Gue Monastery (500 years old). Reach Kalpa by late evening.', img: spitiValley, meals: 'Breakfast + Dinner' },
      { day: 7, title: 'Kalpa to Delhi', desc: 'Wake up with beautiful view of Kinner Kailash. Explore Suicide Point in Kalpa. Drive to Shimla and depart for Delhi.', img: spitiValley, meals: 'Breakfast' },
    ],
    priceTable: [{ label: 'Triple Sharing', price: '₹17,000' }, { label: 'Double Sharing', price: '₹18,000' }, { label: 'Christmas/NY Triple', price: '₹18,500' }, { label: 'Christmas/NY Double', price: '₹20,000' }],
    batches: [{ month: 'OCT', dates: ['04–12', '11–19', '18–26', '25–02 Nov'] }, { month: 'NOV', dates: ['01–09', '08–16', '15–23', '22–30'] }, { month: 'DEC', dates: ['06–14', '13–21', '20–28', '27–04 Jan'] }, { month: 'JAN', dates: ['03–11', '10–18', '17–25', '24–01 Feb'] }],
  },
];

const CATS = ['All', 'Spiritual', 'Nature', 'Adventure'];

export default function Packages() {
  const [cat, setCat] = useState('All');
  const [selected, setSelected] = useState(null);
  const [activeDay, setActiveDay] = useState(0);
  const [showPolicies, setShowPolicies] = useState(false);
  const { openBooking } = useApp();
  const modalRef = useRef(null);

  const list = PACKAGES.filter(p => cat === 'All' || p.cat === cat);

  useEffect(() => {
    gsap.fromTo('.pkg-card', { opacity: 0, y: 60, rotationX: 15 }, { opacity: 1, y: 0, rotationX: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out' });
  }, [cat]);

  useEffect(() => {
    if (selected) {
      setActiveDay(0);
      setShowPolicies(false);
      document.body.style.overflow = 'hidden';
      gsap.fromTo(modalRef.current, { opacity: 0, scale: 0.9, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(1.2)' });
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selected]);

  const closeModal = () => setSelected(null);

  return (
    <div className="bg-[#070E1A] min-h-screen text-white overflow-x-hidden">
      
      {/* Hero Section */}
      <div className="relative min-h-[65vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroImage} alt="Packages Hero" className="w-full h-full object-cover scale-110" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070E1A]/95 via-[#070E1A]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070E1A] via-transparent to-transparent" />
        </div>
        <div className="relative z-10 container-custom">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 mt-10 ">
              <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
              <span className="text-amber-400 text-xs font-semibold tracking-[0.2em] uppercase">Handpicked Expeditions</span>
            </div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-display leading-[1.1] mb-4">
              TOUR<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">PACKAGES</span>
            </h1>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-amber-400 rounded-full mt-2 animate-scroll-line" />
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="container-custom mt-8 mb-12">
        <div className="flex justify-center gap-3 flex-wrap">
          {CATS.map(c => (
            <button key={c} onClick={() => setCat(c)} className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${cat === c ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-[#070E1A] shadow-lg shadow-amber-400/30' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Package Grid */}
      <section className="pb-28">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {list.map(pkg => (
              <div key={pkg.id} className="pkg-card group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-amber-400/40 transition-all duration-500 hover:-translate-y-2 cursor-pointer" onClick={() => setSelected(pkg)}>
                <div className="relative h-56 overflow-hidden bg-[#0A192F]">
                  <img src={pkg.img} alt={pkg.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070E1A] via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ background: pkg.badgeC }}>{pkg.badge}</div>
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs font-semibold flex items-center gap-1"><ClockIcon /> {pkg.dur}</div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-1 text-amber-400/70 text-xs mb-2"><LocationIcon /> {pkg.loc}</div>
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">{pkg.title}</h3>
                  <p className="text-white/40 text-sm mb-3">{pkg.subtitle}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {pkg.inc.slice(0, 3).map(i => <span key={i} className="flex items-center gap-1 text-xs text-amber-400/80"><CheckIcon /> {i.substring(0, 20)}{i.length > 20 ? '...' : ''}</span>)}
                    {pkg.inc.length > 3 && <span className="text-xs text-white/40">+{pkg.inc.length - 3} more</span>}
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-white/10">
                    <div><span className="text-xs text-white/40">Starting from</span><div className="text-2xl font-bold text-amber-400">₹{pkg.price.toLocaleString()}</div><span className="text-[10px] text-white/30">per person</span></div>
                    <div className="flex gap-2">
                      <button onClick={e => { e.stopPropagation(); setSelected(pkg); }} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all"><ViewIcon /></button>
                      <button onClick={e => { e.stopPropagation(); openBooking(pkg); }} className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-[#070E1A] text-sm font-bold flex items-center gap-1 hover:scale-105 transition-all"><BookIcon /> Book</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Package Detail Modal */}
      {selected && (
        <div onClick={closeModal} className="fixed inset-0 z-[9000] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div ref={modalRef} onClick={e => e.stopPropagation()} className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-gradient-to-br from-[#0A192F] to-[#0F2A3F] border border-amber-400/20 shadow-2xl">
            
            {/* Hero Image */}
            <div className="relative h-64 md:h-80 overflow-hidden">
              <img src={selected.heroImg} alt={selected.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] to-transparent" />
              <button onClick={closeModal} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-amber-400/50 transition-all"><span className="text-xl">✕</span></button>
              <div className="absolute bottom-6 left-6"><h2 className="text-3xl md:text-4xl font-bold text-white">{selected.title}</h2><p className="text-amber-400 text-sm">{selected.subtitle}</p></div>
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold" style={{ background: selected.badgeC }}>{selected.badge}</div>
            </div>
            
            {/* Content */}
            <div className="p-6 md:p-8">
              <p className="text-white/70 leading-relaxed mb-6 border-l-2 border-amber-400 pl-4">{selected.desc}</p>
              
              {/* Quick Info */}
              <div className="flex flex-wrap gap-4 mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2 text-white/60"><ClockIcon /> <span>{selected.dur}</span></div>
                <div className="flex items-center gap-2 text-white/60"><LocationIcon /> <span>{selected.loc}</span></div>
                <div className="flex items-center gap-2 text-white/60"><PriceIcon /> <span>₹{selected.price.toLocaleString()} / person</span></div>
              </div>
              
              {/* Inclusions */}
              <div className="mb-6"><h3 className="text-lg font-bold text-amber-400 mb-3 flex items-center gap-2"><CheckIcon /> WHAT'S INCLUDED</h3><div className="flex flex-wrap gap-2">{selected.inc.map(i => <span key={i} className="px-3 py-1.5 bg-white/5 rounded-lg text-sm flex items-center gap-1"><CheckIcon /> {i}</span>)}</div></div>
              
              {/* Exclusions */}
              {selected.exc && <div className="mb-6"><h3 className="text-lg font-bold text-red-400 mb-3 flex items-center gap-2"><CrossIcon /> WHAT'S NOT INCLUDED</h3><div className="flex flex-wrap gap-2">{selected.exc.map(i => <span key={i} className="px-3 py-1.5 bg-white/5 rounded-lg text-sm flex items-center gap-1"><CrossIcon /> {i}</span>)}</div></div>}
              
              {/* Daywise Itinerary */}
              <div className="mb-6"><h3 className="text-lg font-bold text-amber-400 mb-3 flex items-center gap-2"><CalendarIcon /> DAYWISE ITINERARY</h3>
                <div className="flex flex-wrap gap-2 mb-4">{selected.days.map((d, i) => <button key={i} onClick={() => setActiveDay(i)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeDay === i ? 'bg-amber-400 text-[#070E1A]' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}>{d.day === 0 ? 'DAY 0' : `DAY ${d.day}`}</button>)}</div>
                {selected.days[activeDay] && <div className="bg-white/5 rounded-xl overflow-hidden"><div className="h-48 overflow-hidden"><img src={selected.days[activeDay].img} alt={selected.days[activeDay].title} className="w-full h-full object-cover" /></div><div className="p-4"><div className="text-amber-400 text-xs font-bold">{selected.days[activeDay].day === 0 ? 'DAY 0' : `DAY ${selected.days[activeDay].day}`}</div><h4 className="text-lg font-bold text-white mt-1">{selected.days[activeDay].title}</h4><p className="text-white/60 text-sm mt-2">{selected.days[activeDay].desc}</p><div className="mt-3 inline-flex items-center gap-1 text-xs text-amber-400"><ClockIcon /> {selected.days[activeDay].meals}</div></div></div>}
              </div>
              
              {/* Pricing */}
              <div className="mb-6"><h3 className="text-lg font-bold text-amber-400 mb-3 flex items-center gap-2"><PriceIcon /> PRICING</h3><div className="flex flex-wrap gap-3">{selected.priceTable.map(p => <div key={p.label} className="px-5 py-3 bg-white/5 rounded-xl"><div className="text-xs text-white/40">{p.label}</div><div className="text-xl font-bold text-amber-400">{p.price}</div></div>)}</div></div>
              
              {/* Batches */}
              {selected.batches && <div className="mb-6"><h3 className="text-lg font-bold text-amber-400 mb-3 flex items-center gap-2"><CalendarIcon /> UPCOMING BATCHES</h3><div className="grid grid-cols-2 md:grid-cols-3 gap-3">{selected.batches.map(b => <div key={b.month} className="p-3 bg-white/5 rounded-xl"><div className="text-xs font-bold text-amber-400">{b.month}</div><div className="flex flex-wrap gap-1 mt-2">{b.dates.map(d => <span key={d} className="text-xs text-white/60">{d}</span>)}</div></div>)}</div></div>}
              
              {/* Policies Button */}
              <button onClick={() => setShowPolicies(!showPolicies)} className="mb-6 flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-all"><DocumentIcon /> {showPolicies ? 'Hide' : 'View'} Policies & Terms</button>
              
              {/* Policies Section */}
              {showPolicies && (
                <div className="mb-6 p-4 bg-white/5 rounded-xl border border-amber-400/20">
                  <h3 className="text-lg font-bold text-amber-400 mb-3">📋 PAYMENT POLICY</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    <div className="p-3 bg-white/5 rounded-lg"><div className="text-xs text-white/40">At Booking</div><div className="text-sm text-white/80">{COMMON_POLICIES.paymentPolicy.booking}</div></div>
                    <div className="p-3 bg-white/5 rounded-lg"><div className="text-xs text-white/40">Full Payment</div><div className="text-sm text-white/80">{COMMON_POLICIES.paymentPolicy.full}</div></div>
                  </div>
                  <h3 className="text-lg font-bold text-amber-400 mb-3">🏦 BANK DETAILS</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                    {Object.entries(COMMON_POLICIES.paymentDetails).map(([key, val]) => <div key={key}><div className="text-[10px] text-white/40 uppercase">{key}</div><div className="text-xs text-white/80 break-all">{val}</div></div>)}
                  </div>
                  <h3 className="text-lg font-bold text-amber-400 mb-3">📋 TERMS & CONDITIONS</h3>
                  <div className="space-y-2">{COMMON_POLICIES.termsAndConditions.map((t, i) => <div key={i} className="flex gap-2 text-xs text-white/60"><span className="text-amber-400">{i + 1}.</span><span>{t}</span></div>)}</div>
                </div>
              )}
              
              {/* CTA */}
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-white/10">
                <div><div className="text-xs text-white/40">CONTACT US</div><div className="flex gap-3 mt-1"><span className="flex items-center gap-1 text-amber-400"><PhoneIcon /> +91 92435 85890</span><span className="flex items-center gap-1 text-amber-400"><MailIcon /> infotrippanther@gmail.com</span></div></div>
                <button onClick={() => { closeModal(); openBooking(selected); }} className="px-8 py-3 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-[#070E1A] font-bold flex items-center gap-2 hover:scale-105 transition-all"><BookIcon /> Book This Trip <ArrowIcon /></button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes scrollLine { 0%,100% { opacity: 0.3; transform: scaleY(0.5); } 50% { opacity: 1; transform: scaleY(1); } }
        .animate-scroll-line { animation: scrollLine 2s ease-in-out infinite; }
        ::selection { background: rgba(245,158,11,0.3); color: #fff; }
      `}</style>
    </div>
  );
}
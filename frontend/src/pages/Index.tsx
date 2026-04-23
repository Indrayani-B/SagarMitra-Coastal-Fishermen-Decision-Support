import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  Anchor, Cloud, Fish, TrendingUp, BookOpen,
  ArrowRight, LogOut, Users, MapPin, Bell, Award, Menu, X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

import sceneryHero from '../assets/hero-ocean.jpg';
import fishermenTeam from '../assets/homepage/fishermen-team.png';
import weatherImg from '../assets/homepage/weather-bg.png';
import catchImg from '../assets/homepage/catch-bg.png';
import awareImg from '../assets/homepage/aware-bg.png';

// ---------------------------------------------------------------------------
// Constants — defined outside component to avoid re-creation on every render
// ---------------------------------------------------------------------------

const STATS = [
  { value: '95%+', label: 'Fish ID Accuracy' },
  { value: '6 Days', label: 'Weather Forecast' },
  { value: 'Real-time', label: 'Market Prices' },
  { value: '3 Languages', label: 'Marathi · Hindi · EN' },
] as const;

const FEATURES = [
  {
    icon: Cloud,
    title: 'Smart Weather Forecasting',
    desc: 'AI-powered 6-day predictions with safety indicators for tide, wind speed, and sea conditions.',
    color: 'bg-blue-600',
  },
  {
    icon: Fish,
    title: 'Instant Fish Identification',
    desc: 'Upload a photo and get instant species identification using EfficientNet CNN models.',
    color: 'bg-purple-600',
  },
  {
    icon: TrendingUp,
    title: 'Market Intelligence',
    desc: 'Real-time price estimates with seasonality insights powered by LSTM prediction models.',
    color: 'bg-green-600',
  },
  {
    icon: MapPin,
    title: 'Nearby Market Finder',
    desc: 'Discover the best markets within your radius via GPS navigation and interactive map.',
    color: 'bg-teal-600',
  },
  {
    icon: BookOpen,
    title: 'Fishermen Awareness',
    desc: 'Govt. schemes, safety rules, and legal rights in Marathi, Hindi & English.',
    color: 'bg-orange-600',
  },
  {
    icon: Bell,
    title: 'Safety Alerts',
    desc: 'High-precision marine condition alerts so you always know before you sail.',
    color: 'bg-red-600',
  },
] as const;

const MODULES = [
  {
    route: '/weather',
    bgImage: weatherImg,
    icon: Cloud,
    title: 'Weather Forecast',
    tagline: 'Get accurate 6-day marine forecasts with safety indicators, tide data, and optimal fishing windows.',
    color: { card: 'from-blue-50 to-cyan-50', hover: 'from-blue-600/8 to-cyan-600/8', icon: 'from-blue-500 to-cyan-500', btn: 'from-blue-600 to-cyan-600', dot: 'bg-blue-500', shadow: 'hover:shadow-blue-500/20' },
    features: [
      'Real-time marine conditions',
      'Safety indicators & storm alerts',
      '6-day detailed sea forecast',
      'Tide & wave height predictions',
      'Wind speed & direction analysis',
    ],
    cta: 'Check Weather Now',
    iconColor: 'blue' as const,
  },
  {
    route: '/catch-to-cash',
    bgImage: catchImg,
    icon: Fish,
    title: 'Catch to Cash',
    tagline: 'Upload your catch for instant AI-powered species ID, live price estimates, and market recommendations.',
    color: { card: 'from-purple-50 to-pink-50', hover: 'from-purple-600/8 to-pink-600/8', icon: 'from-purple-500 to-pink-500', btn: 'from-purple-600 to-pink-600', dot: 'bg-purple-500', shadow: 'hover:shadow-purple-500/20' },
    features: [
      'AI fish species identification',
      'Real-time price estimates',
      'Seasonal market trends',
      'Nearby market finder with map',
      'Best time to sell insights',
    ],
    cta: 'Identify Fish Now',
    iconColor: 'purple' as const,
  },
  {
    route: '/awareness',
    bgImage: awareImg,
    icon: BookOpen,
    title: 'Fishermen Awareness',
    tagline: 'Complete guide to govt. schemes, legal rights, sea safety, helplines, and fishing ban season.',
    color: { card: 'from-amber-50 to-orange-50', hover: 'from-amber-600/8 to-orange-600/8', icon: 'from-amber-500 to-orange-500', btn: 'from-amber-500 to-orange-500', dot: 'bg-amber-500', shadow: 'hover:shadow-amber-500/20' },
    features: [
      'Government schemes & subsidies',
      'Free accident insurance (₹5 Lakh)',
      "Sea safety do's & don'ts",
      'Emergency helpline numbers',
      'Fishing ban season calendar',
    ],
    cta: 'Explore Awareness Portal',
    iconColor: 'orange' as const,
  },
] as const;

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Services', href: '#services' },
] as const;

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

interface ServiceCardProps {
  module: typeof MODULES[number];
  onClick: () => void;
}

const ServiceCard = memo<ServiceCardProps>(({ module, onClick }) => {
  const Icon = module.icon;
  return (
    <motion.article
      whileHover={{ y: -12 }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`Open ${module.title}`}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      className={`
        group relative h-[480px] rounded-[2rem] overflow-hidden cursor-pointer shadow-xl
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
      `}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={module.bgImage}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-slate-900/10" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
        <div
          className={`
            w-14 h-14 flex items-center justify-center rounded-2xl mb-5 shadow-lg
            transition-transform duration-300 group-hover:scale-110
            ${module.iconColor === 'blue' ? 'bg-blue-600' : module.iconColor === 'purple' ? 'bg-purple-600' : 'bg-orange-600'}
          `}
        >
          <Icon size={28} />
        </div>
        <h3 className="text-2xl font-black mb-3 uppercase tracking-tight">{module.title}</h3>
        <p className="text-slate-300 text-sm leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-all duration-400 transform translate-y-3 group-hover:translate-y-0">
          {module.tagline}
        </p>
        <div className="flex items-center gap-2 text-sm font-black tracking-widest text-blue-400">
          OPEN MODULE <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform duration-300" />
        </div>
      </div>
    </motion.article>
  );
});
ServiceCard.displayName = 'ServiceCard';

// Loading screen — extracted so hooks in HomePage always run
const LoadingScreen: React.FC = () => (
  <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-6 text-white" role="status" aria-label="Loading SagarMitra">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
      aria-hidden="true"
    >
      <Anchor className="text-blue-400" size={48} />
    </motion.div>
    <div className="text-center">
      <h2 className="text-2xl font-black uppercase tracking-widest">SagarMitra</h2>
      <p className="text-slate-400 italic mt-1">समुद्र का साथी · Connecting with the Deep Blue…</p>
    </div>
    <div className="absolute bottom-0 w-full h-24 opacity-10" aria-hidden="true">
      <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M0,50 Q300,80 600,50 T1200,50 L1200,120 L0,120 Z" fill="#3b82f6" />
      </svg>
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, loading, logout } = useAuth() || {};

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const userName = user?.displayName || user?.email?.split('@')[0] || 'Fisherman';

  // --- Redirect unauthenticated users ---
  useEffect(() => {
    if (!loading && user === null) {
      navigate('/login', { replace: true });
    }
  }, [user, loading, navigate]);

  // --- Scroll listener for navbar ---
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Close mobile menu on route change or outside scroll ---
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  // --- Parallax transforms ---
  // Scoped to each section individually — avoids tracking the entire page height.
  // No useSpring — spring physics fight native scroll momentum and cause jank.
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const sceneryY    = useTransform(heroProgress, [0, 1], ['0%', '25%']);
  const heroTextY   = useTransform(heroProgress, [0, 1], ['0%', '40%']);
  const heroOpacity = useTransform(heroProgress, [0, 0.6], [1, 0]);

  // Story: simple translate fade-in. Scale avoided — triggers layout recalc.
  const storyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: storyProgress } = useScroll({
    target: storyRef,
    offset: ['start 90%', 'start 30%'],
  });
  const storyOpacity = useTransform(storyProgress, [0, 1], [0, 1]);
  const storyY       = useTransform(storyProgress, [0, 1], ['20px', '0px']);

  // --- Memoised handlers ---
  const handleLogout = useCallback(() => {
    logout?.();
  }, [logout]);

  const scrollToSection = useCallback((href: string) => {
    setMobileMenuOpen(false);
    // Offset for fixed navbar height (~72px)
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  // --- Early returns AFTER all hooks ---
  if (loading || user === undefined) return <LoadingScreen />;
  if (user === null) return null;

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------
  return (
    <div className="relative bg-slate-50 text-slate-900 overflow-x-hidden">

      {/* ------------------------------------------------------------------ */}
      {/* NAVBAR                                                               */}
      {/* ------------------------------------------------------------------ */}
      <header
        role="banner"
        className={`
          fixed top-0 w-full z-50 transition-all duration-400 py-4 px-6
          ${isScrolled ? 'bg-white/92 backdrop-blur-md shadow-sm text-slate-900' : 'bg-transparent text-white'}
        `}
      >
        <nav className="max-w-7xl mx-auto flex justify-between items-center" aria-label="Main navigation">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center space-x-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg"
            aria-label="Back to top"
          >
            <Anchor className={isScrolled ? 'text-blue-600' : 'text-blue-300'} size={26} aria-hidden="true" />
            <div className="text-left">
              <span className="text-xl font-black tracking-tighter uppercase block leading-none">SagarMitra</span>
              <span className={`text-[11px] italic ${isScrolled ? 'text-blue-500' : 'text-blue-200'}`}>समुद्र का साथी</span>
            </div>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center space-x-8 font-medium">
            {NAV_LINKS.map(({ label, href }) => (
              <button
                key={href}
                onClick={() => scrollToSection(href)}
                className={`hover:text-blue-500 transition-colors duration-200 focus:outline-none focus-visible:underline ${isScrolled ? '' : 'text-white'}`}
              >
                {label}
              </button>
            ))}
            <div className="h-5 w-px bg-current opacity-20" aria-hidden="true" />
            <span className="opacity-70 text-sm">Namaste, {userName} 👋</span>
            <button
              onClick={handleLogout}
              aria-label="Log out"
              className={`
                flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold
                transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
                ${isScrolled
                  ? 'bg-slate-900 text-white hover:bg-blue-600'
                  : 'bg-white/20 hover:bg-white/35 text-white'}
              `}
            >
              <LogOut size={15} aria-hidden="true" /> Logout
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen
              ? <X size={24} className={isScrolled ? 'text-slate-900' : 'text-white'} />
              : <Menu size={24} className={isScrolled ? 'text-slate-900' : 'text-white'} />
            }
          </button>
        </nav>

        {/* Mobile menu drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-slate-100 px-6 py-6"
            >
              <div className="flex flex-col gap-5">
                <p className="text-slate-500 text-sm">Namaste, <strong className="text-slate-900">{userName}</strong> 👋</p>
                {NAV_LINKS.map(({ label, href }) => (
                  <button
                    key={href}
                    onClick={() => scrollToSection(href)}
                    className="text-left text-lg font-semibold text-slate-800 hover:text-blue-600 transition-colors"
                  >
                    {label}
                  </button>
                ))}
                <hr className="border-slate-100" />
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-600 font-semibold"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* MAIN CONTENT                                                         */}
      {/* ------------------------------------------------------------------ */}
      <main id="main-content">

        {/* ---- HERO ---- */}
        <section
          ref={heroRef}
          aria-label="Hero"
          className="relative h-screen overflow-hidden flex items-center justify-center"
        >
          {/* Parallax image — will-change promotes to own GPU layer, preventing main-thread repaints */}
          <motion.div
            style={{ y: sceneryY, willChange: 'transform' }}
            className="absolute inset-0 z-0"
            aria-hidden="true"
          >
            <img
              src={sceneryHero}
              alt=""
              className="w-full h-full object-cover scale-125"
              fetchPriority="high"
              decoding="async"
            />
            {/* Dark overlay for text readability — no bottom fade, wave handles the transition */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50" />

          </motion.div>

          {/* Hero text — lighter movement than image creates depth */}
          <motion.div
            style={{ y: heroTextY, opacity: heroOpacity, willChange: 'transform, opacity' }}
            className="relative z-10 text-center px-6 max-w-4xl mx-auto"
          >
            <div className="inline-block mb-6 px-4 py-2 bg-black/30 rounded-full border border-white/20">
              <span className="text-white text-sm font-medium">🌊 Empowering Coastal Fishermen of Maharashtra</span>
            </div>

            {/* textShadow via inline style — cheaper than Tailwind's drop-shadow which uses filter */}
            <h1
              className="text-6xl sm:text-7xl md:text-9xl font-black mb-5 tracking-tighter text-white leading-none"
              style={{ textShadow: '0 2px 24px rgba(0,0,0,0.55)' }}
            >
              SAGAR<br className="sm:hidden" /> MITRA
            </h1>

            <p
              className="text-lg md:text-xl text-white/90 font-light max-w-2xl mx-auto mb-12 leading-relaxed"
              style={{ textShadow: '0 1px 10px rgba(0,0,0,0.6)' }}
            >
              AI-powered weather forecasting and smart market intelligence —
              built so no fisherman sails into the unknown alone.
            </p>

            {/* Stats — backdrop-blur removed (forces compositor flush on every scroll frame) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
              {STATS.map(({ value, label }) => (
                <div
                  key={label}
                  className="bg-black/35 border border-white/15 rounded-2xl p-4 text-left"
                >
                  <div className="text-xl md:text-2xl font-black text-white mb-0.5">{value}</div>
                  <div className="text-white/60 text-xs leading-tight">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 text-center" aria-hidden="true">
            <p className="text-xs text-white/50 mb-2 tracking-widest uppercase">Scroll</p>
            <div className="w-5 h-8 border border-white/35 rounded-full mx-auto flex items-start justify-center pt-1.5">
              <motion.div
                className="w-1 h-2 bg-white/60 rounded-full"
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              />
            </div>
          </div>

          {/* Wave bottom boundary — sits above the image, matches bg-slate-50 of next section */}
          <div className="absolute bottom-0 left-0 w-full z-10 leading-none" aria-hidden="true">
            <svg
              viewBox="0 0 1440 90"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              className="w-full h-[60px] md:h-[90px]"
            >
              <path
                d="M0,40 C240,90 480,0 720,45 C960,90 1200,10 1440,40 L1440,90 L0,90 Z"
                fill="#f8fafc"
              />
            </svg>
          </div>
        </section>

        {/* ---- STORY / ABOUT ---- */}
        <section
          aria-label="About SagarMitra"
          className="relative py-24 md:py-32 bg-slate-50 px-6 overflow-hidden"
        >
          <motion.div
            ref={storyRef}
            style={{ opacity: storyOpacity, y: storyY, willChange: 'transform, opacity' }}
            className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center"
          >
            {/* Image */}
            <div className="relative order-2 md:order-1">
              {/* blur-3xl removed — filter effects during scroll are expensive */}
              <div className="absolute -inset-8 bg-blue-100/40 rounded-full" aria-hidden="true" />
              <img
                src={fishermenTeam}
                alt="Mumbai Koli fishermen community"
                className="relative w-full h-auto"
                loading="lazy"
              />
            </div>

            {/* Text */}
            <div className="space-y-7 order-1 md:order-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-blue-700 text-sm font-semibold">
                <Users size={14} />  Fisherfolk
              </div>

              <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                Technology meets{' '}
                <span className="text-blue-600">Tradition.</span>
              </h2>

              <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                We empower fishing community with AI-driven tools.
                From smart weather forecasting to real-time market price prediction,
                SagarMitra ensures no fisherman ever sails alone into the unknown.
              </p>

              <div className="grid grid-cols-3 gap-3">
                {([
                  { icon: Users,      color: 'text-blue-600 bg-blue-50',   label: 'Mumbai Region' },
                  { icon: TrendingUp, color: 'text-green-600 bg-green-50', label: 'Live Markets' },
                  { icon: Award,      color: 'text-amber-600 bg-amber-50', label: 'Govt. Schemes' },
                ] as const).map(({ icon: Icon, color, label }) => (
                  <div key={label} className={`flex flex-col items-center gap-2 p-4 rounded-2xl border border-slate-100 bg-white text-center`}>
                    <div className={`w-9 h-9 flex items-center justify-center rounded-xl ${color}`}>
                      <Icon size={16} aria-hidden="true" />
                    </div>
                    <span className="text-xs font-bold text-slate-700 leading-tight">{label}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => scrollToSection('#services')}
                className="group inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-full font-semibold hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                Start Your Journey
                <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        </section>

        {/* ---- FEATURES GRID ---- */}
        <section
          id="features"
          aria-labelledby="features-heading"
          className="py-24 md:py-32 bg-white px-6"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">What We Offer</p>
              <h2 id="features-heading" className="text-4xl md:text-5xl font-black text-slate-900">
                Everything you need to succeed at sea
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {FEATURES.map(({ icon: Icon, title, desc, color }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  whileHover={{ y: -6 }}
                  className="bg-slate-50 rounded-2xl p-7 border border-slate-100 hover:shadow-lg transition-all duration-300"
                >
                  <div className={`w-12 h-12 flex items-center justify-center rounded-xl mb-5 text-white ${color}`} aria-hidden="true">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-base font-black text-slate-900 mb-2">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- SERVICES (visual cards) ---- */}
        <section
          id="services"
          aria-labelledby="services-heading"
          className="py-24 bg-slate-900 px-6"
        >
          <div className="max-w-7xl mx-auto">
            <div className="mb-14">
              <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">Our Services</p>
              <h2 id="services-heading" className="text-4xl md:text-5xl font-black text-white">
                Explore the SagarMitra Ecosystem
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {MODULES.map((mod) => (
                <ServiceCard
                  key={mod.route}
                  module={mod}
                  onClick={() => navigate(mod.route)}
                />
              ))}
            </div>
          </div>
        </section>


      </main>

      {/* ------------------------------------------------------------------ */}
      {/* FOOTER                                                               */}
      {/* ------------------------------------------------------------------ */}
      <footer className="py-16 bg-slate-950 text-white px-6" role="contentinfo">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-10 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Anchor className="text-blue-400" size={22} aria-hidden="true" />
                <span className="font-black uppercase tracking-widest text-base">SagarMitra</span>
              </div>
              <p className="text-slate-400 text-sm italic">समुद्र का साथी · Your Companion at Sea</p>
            </div>
            <div className="flex gap-8 text-sm text-slate-400">
              {NAV_LINKS.map(({ label, href }) => (
                <button
                  key={href}
                  onClick={() => scrollToSection(href)}
                  className="hover:text-white transition-colors focus:outline-none focus-visible:underline"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
            <p>© 2026 SagarMitra. Made for the Coastal Heritage of Maharashtra.</p>
            <p>Built with ❤️ for India's Fishing Community</p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default HomePage;







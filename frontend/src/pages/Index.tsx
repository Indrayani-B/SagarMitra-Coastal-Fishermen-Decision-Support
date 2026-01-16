// import { motion } from "framer-motion";
// import Navigation from "@/components/Navigation";
// import HeroSection from "@/components/HeroSection";
// import CatchToCashSection from "@/components/CatchToCashSection";
// import WeatherSection from "@/components/WeatherSection";
// import Footer from "@/components/Footer";

// const Index = () => {
//   return (
//     <div className="min-h-screen bg-slate-50 selection:bg-blue-100 selection:text-blue-900">
//       <Navigation />
      
//       <main className="relative">
//         {/* Hero Section - The Entry Point */}
//         <HeroSection />

//         {/* Dashboard Sections with Scroll Reveal */}
//         <div className="container mx-auto px-4 space-y-24 py-16">
          
//           <motion.section
//             initial={{ opacity: 0, y: 50 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-100px" }}
//             transition={{ duration: 0.6, ease: "easeOut" }}
//             id="weather"
//           >
//             <WeatherSection />
//           </motion.section>

//           <motion.section
//             initial={{ opacity: 0, scale: 0.95 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             viewport={{ once: true, margin: "-100px" }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             id="catch-to-cash"
//           >
//             <CatchToCashSection />
//           </motion.section>
          
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default Index;

// src/pages/HomePage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Waves, Cloud, Fish, Anchor, TrendingUp, MapPin, Bell, Users, Award, ArrowRight } from 'lucide-react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const parallaxStyle = (speed: number): React.CSSProperties => ({
    transform: `translateY(${scrollY * speed}px)`
  });

  const floatingAnimation = (delay: number): React.CSSProperties => ({
    animation: `float 6s ease-in-out ${delay}s infinite`
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-900 text-white overflow-hidden">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        .glass-effect {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
      `}</style>

      {/* Animated Background Waves */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute bottom-0 w-full" style={parallaxStyle(0.3)} viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,50 Q300,80 600,50 T1200,50 L1200,120 L0,120 Z" fill="rgba(59, 130, 246, 0.1)" />
        </svg>
        <svg className="absolute bottom-0 w-full" style={parallaxStyle(0.5)} viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,70 Q300,100 600,70 T1200,70 L1200,120 L0,120 Z" fill="rgba(37, 99, 235, 0.1)" />
        </svg>
      </div>

      {/* Floating Fish Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <Fish
            key={i}
            className="absolute text-blue-400 opacity-20"
            size={30 + i * 10}
            style={{
              ...floatingAnimation(i * 0.5),
              left: `${10 + i * 20}%`,
              top: `${20 + i * 15}%`,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-effect">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Anchor className="text-blue-400" size={32} />
            <div>
              <h1 className="text-2xl font-bold">SagarMitra</h1>
              <p className="text-xs text-blue-300">समुद्र का साथी</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <a
              href="#features"
              className="hover:text-blue-400 transition"
            >
              Features
            </a>

            <a
              href="#modules"
              className="hover:text-blue-400 transition"
            >
              Get Started
            </a>

            <button className="ml-2 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full transition transform hover:scale-105">
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.3), transparent 40%)`
          }}
        />

        <div className="max-w-6xl mx-auto text-center z-10" style={parallaxStyle(0.1)}>
          <div className="inline-block mb-6 px-4 py-2 bg-blue-500/20 rounded-full border border-blue-400/30">
            <span className="text-blue-300 text-sm">🌊 Empowering 7+ Million Coastal Fishermen</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-400 text-transparent bg-clip-text leading-tight">
            SagarMitra
          </h1>
          
          <p className="text-3xl md:text-4xl mb-4 text-blue-100">
            Your Digital Fishing Companion
          </p>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            AI-powered weather forecasting and smart market intelligence 
            to help fishermen make informed decisions and maximize profits
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => document.getElementById('modules')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-blue-500/50 transition-all transform hover:scale-105"
            >
              Start Your Journey
              <ArrowRight className="inline ml-2 group-hover:translate-x-2 transition" />
            </button>
            
            <button 
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 glass-effect rounded-full text-lg font-semibold hover:bg-white/10 transition-all"
            >
              Learn More
            </button>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { value: '97%+', label: 'Fish ID Accuracy' },
              { value: '5 Days', label: 'Weather Forecast' },
              { value: 'Real-time', label: 'Market Prices' }
            ].map((stat, i) => (
              <div key={i} className="glass-effect rounded-2xl p-6 transform hover:scale-105 transition">
                <div className="text-4xl font-bold text-blue-400 mb-2">{stat.value}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-2">Scroll to explore</p>
            <div className="w-6 h-10 border-2 border-blue-400 rounded-full mx-auto flex items-start justify-center p-2">
              <div className="w-1 h-3 bg-blue-400 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-32 px-6" style={parallaxStyle(0.05)}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-400">Everything you need to succeed at sea</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Cloud size={48} />,
                title: 'Smart Weather Forecasting',
                description: 'AI-powered 5-day weather predictions with safety indicators for tide, wind speed, and sea conditions',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                icon: <Fish size={48} />,
                title: 'Instant Fish Identification',
                description: 'Upload a photo and get instant species identification with 85%+ accuracy using advanced CNN models',
                color: 'from-purple-500 to-pink-500'
              },
              {
                icon: <TrendingUp size={48} />,
                title: 'Market Intelligence',
                description: 'Real-time price estimates, seasonality insights, and demand forecasting for maximum profits',
                color: 'from-orange-500 to-red-500'
              },
              {
                icon: <MapPin size={48} />,
                title: 'Nearby Market Finder',
                description: 'Discover high-demand markets within your radius with GPS navigation and contact details',
                color: 'from-green-500 to-teal-500'
              },
              {
                icon: <Bell size={48} />,
                title: 'Real-time Alerts',
                description: 'Get instant notifications for weather warnings, price changes, and fishing opportunities',
                color: 'from-yellow-500 to-orange-500'
              },
              {
                icon: <Award size={48} />,
                title: 'Quality Assessment',
                description: 'AI-based freshness detection and quality grading for better pricing and customer trust',
                color: 'from-indigo-500 to-purple-500'
              }
            ].map((feature, i) => (
              <div
                key={i}
                className="group relative glass-effect rounded-3xl p-8 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
                style={floatingAnimation(i * 0.3)}
              >
                <div className={`inline-block p-4 rounded-2xl bg-gradient-to-br ${feature.color} mb-6 group-hover:scale-110 transition`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
                
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Continuing in next artifact due to length... */}
      
      {/* Main Modules CTA */}
      <section id="modules" className="relative py-32 px-6 bg-gradient-to-b from-transparent via-blue-950/50 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Choose Your Module</h2>
            <p className="text-xl text-gray-400">Get started with our powerful tools</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Weather Module */}
            <div className="group relative glass-effect rounded-3xl p-12 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="inline-block p-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl mb-6 group-hover:scale-110 transition shadow-lg">
                  <Cloud size={64} />
                </div>
                
                <h3 className="text-4xl font-bold mb-4">Weather Forecasting</h3>
                <p className="text-gray-400 mb-8 text-lg">
                  Get accurate 5-day marine weather forecasts with safety indicators, 
                  tide predictions, and optimal fishing time recommendations
                </p>

                <ul className="space-y-3 mb-8">
                  {[
                    'Real-time marine conditions',
                    'Safety indicators & alerts',
                    '5-day detailed forecast',
                    'Tide & wave predictions',
                    'Wind speed analysis'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                      {item}
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => navigate('/weather')}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all transform hover:scale-105 flex items-center justify-center group"
                >
                  Check Weather Now
                  <ArrowRight className="ml-2 group-hover:translate-x-2 transition" />
                </button>
              </div>
            </div>

            {/* Catch to Cash Module */}
            <div className="group relative glass-effect rounded-3xl p-12 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="inline-block p-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl mb-6 group-hover:scale-110 transition shadow-lg">
                  <Fish size={64} />
                </div>
                
                <h3 className="text-4xl font-bold mb-4">Catch to Cash</h3>
                <p className="text-gray-400 mb-8 text-lg">
                  Upload your catch photo for instant AI-powered identification, 
                  price estimates, and nearby market recommendations
                </p>

                <ul className="space-y-3 mb-8">
                  {[
                    'AI fish species identification',
                    'Real-time price estimates',
                    'Seasonality insights',
                    'Market demand analysis',
                    'Nearby market finder'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                      {item}
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => navigate('/catch-to-cash')}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-105 flex items-center justify-center group"
                >
                  Identify Fish Now
                  <ArrowRight className="ml-2 group-hover:translate-x-2 transition" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Anchor className="text-blue-400" size={32} />
            <span className="text-2xl font-bold text-white">SagarMitra</span>
          </div>
          <p>© 2024 SagarMitra. Empowering 7+ Million Coastal Fishermen. Made with ❤️ for India's Fishing Community</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
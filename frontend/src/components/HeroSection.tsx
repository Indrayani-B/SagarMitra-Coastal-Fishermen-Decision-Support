import { ArrowRight, Waves, Fish } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-ocean.jpg";
import { useNavigate } from "react-router-dom"; 


const HeroSection = () => {
  const navigate = useNavigate(); 
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 119, 182, 0.6), rgba(0, 150, 199, 0.7)), url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Animated decorative elements */}
      <div className="absolute top-20 left-10 animate-float opacity-20">
        <Fish className="h-16 w-16 text-white" />
      </div>
      <div className="absolute bottom-32 right-16 animate-wave opacity-20">
        <Waves className="h-20 w-20 text-white" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up leading-tight">
            Empowering Fishermen with Smart Technology
          </h1>
          <p className="text-xl md:text-2xl mb-10 opacity-95 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Identify, Analyze, and Predict — Your Digital Fishing Companion.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <Button
              variant="hero"
              size="xl"
              onClick={() => navigate("/catchtocash")}
              className="group"
            >
              Explore Catch-to-Cash
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="xl"
              onClick={() => scrollToSection("weather")}
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 hover:border-white/50"
            >
              Check Weather Forecast
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;

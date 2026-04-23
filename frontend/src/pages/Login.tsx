import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase_/firebase";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Mail, Lock, Ship, ArrowRight, Loader2 } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Welcome back, Captain!");
      navigate("/");
    } catch (err) {
      toast.error("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
  <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
    
    {/* 🔹 BLURRED BACKGROUND IMAGE */}
    <img
      src="./src/assets/loginWallpaper.png"
      alt="Background"
      className="absolute inset-0 w-full h-full object-cover blur-xl scale-110  "
    />

    {/* Optional dark overlay for better contrast */}
    <div className="absolute inset-0 bg-black/40"></div>

    {/* 🔹 CENTER CARD */}
    <div className="relative z-10 w-[900px] h-[550px] flex rounded-2xl overflow-hidden  shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
      
      {/* LEFT SIDE (IMAGE) */}
      <div className="w-1/2 h-full">
        <img
          src="./src/assets/loginWallpaper.png"
          alt="Card Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* RIGHT SIDE (FORM) */}
      <div className="w-1/2 h-full bg-[#222238] flex items-center justify-center px-8">
        
        <div className="w-full max-w-sm">
          
          {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-white mb-2">
                Sign In
              </h1>
              <p className="text-gray-400">
                Access your account
              </p>
            </div>

          {/* FORM */}
          <form onSubmit={handleLogin} className="space-y-5">
            
            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                className="w-full pl-10 pr-4 py-3 bg-transparent border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3 bg-transparent border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Button */}
            <Button
              disabled={isLoading}
              className="w-full py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-lg"
            >
              {isLoading ? (
                <Loader2 className="animate-spin mx-auto" />
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Login <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>

          {/* Footer */}
          <p className="text-gray-400 text-sm mt-6 text-center">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-400">
              Register
            </Link>
          </p>

        </div>
      </div>
    </div>
  </div>
);
}
import React, { useEffect, useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function LoadingScreen({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);
  const [animationError, setAnimationError] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onLoadingComplete(), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-[#070E1A] via-[#0A192F] to-[#0F2A3F] flex items-center justify-center overflow-hidden">
      
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.15),transparent_70%)] animate-pulse" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-20"
        style={{ backgroundImage: "linear-gradient(rgba(245,158,11,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(245,158,11,0.1) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-amber-400/30 rounded-full animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center">
        
        {/* Lottie Animation */}
        <div className="w-80 h-80 mx-auto mb-6">
          {!animationError ? (
            <DotLottieReact
              src="https://lottie.host/7382feb1-7064-4a9f-8a45-bc3d8b1ed3cd/7Eulh02UiD.lottie"
              loop
              autoplay
              className="w-full h-full"
              onError={() => setAnimationError(true)}
            />
          ) : (
            // Fallback Animation (CSS Car)
            <div className="relative w-64 h-40 mb-8 animate-[carBounce_0.6s_ease-in-out_infinite] mx-auto">
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-r from-amber-500 to-orange-600 rounded-t-2xl rounded-b-md shadow-2xl">
                <div className="absolute -top-8 left-8 right-8 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-t-2xl"></div>
                <div className="absolute top-[-6px] left-12 w-10 h-8 bg-blue-200/80 rounded-sm"></div>
                <div className="absolute top-[-6px] right-12 w-10 h-8 bg-blue-200/80 rounded-sm"></div>
                <div className="absolute -bottom-2 left-4 w-8 h-8 bg-gray-900 rounded-full shadow-lg animate-[wheelSpin_0.5s_linear_infinite]"></div>
                <div className="absolute -bottom-2 right-4 w-8 h-8 bg-gray-900 rounded-full shadow-lg animate-[wheelSpin_0.5s_linear_infinite]"></div>
                <div className="absolute top-1/2 -left-1 w-2 h-4 bg-yellow-400 rounded-l-full"></div>
                <div className="absolute top-1/2 -right-1 w-2 h-4 bg-red-500 rounded-r-full"></div>
              </div>
            </div>
          )}
        </div>

        {/* Loading Text */}
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-wider animate-pulse"
          style={{ textShadow: "0 0 20px rgba(245,158,11,0.5)" }}>
          PREPARING YOUR JOURNEY
        </h2>
        
        {/* Progress Bar */}
        <div className="w-80 h-1.5 bg-white/10 rounded-full overflow-hidden shadow-lg">
          <div 
            className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-300 relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-white/30 blur-sm" />
          </div>
        </div>
        
        <p className="text-amber-400/80 text-sm mt-3 font-mono font-bold tracking-wider">
          {progress}% COMPLETE
        </p>

        {/* Tagline */}
        <div className="mt-8 overflow-hidden">
          <p className="text-white/40 text-xs tracking-[0.3em] uppercase animate-[slideIn_0.8s_ease-out]">
            ✦ EXPLORE BEYOND ✦
          </p>
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s`, animationDuration: "0.8s" }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes carBounce {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        @keyframes wheelSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 0.8; }
        }
        .animate-float { animation: float ease-in-out infinite; }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); letter-spacing: 0.5em; }
          to { opacity: 1; transform: translateY(0); letter-spacing: 0.3em; }
        }
      `}</style>
    </div>
  );
}
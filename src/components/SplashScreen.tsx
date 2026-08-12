import React, { useEffect, useState } from 'react';
import logoImg from '../assets/images/curashare_logo_1786035662096.jpg';
import { Sparkles, HeartHandshake, ShieldCheck } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing CuraShare Platform...');
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setProgress(25);
      setStatusText('Connecting to 24/7 IoT CuraBox Network...');
    }, 800);

    const timer2 = setTimeout(() => {
      setProgress(60);
      setStatusText('Loading AI Medicine Scanner & Verified Pharmacies...');
    }, 1800);

    const timer3 = setTimeout(() => {
      setProgress(88);
      setStatusText('Verifying Prescription Database & NGO Fleet Routes...');
    }, 2800);

    const timer4 = setTimeout(() => {
      setProgress(100);
      setStatusText('Platform Ready! Welcome to CuraShare.');
    }, 3800);

    const finishTimer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        onFinish();
      }, 600); // fade out duration
    }, 4500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      onFinish();
    }, 300);
  };

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-slate-950 text-white select-none transition-opacity duration-500 overflow-hidden ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/15 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-cyan-500/15 rounded-full blur-[90px] pointer-events-none" />

      {/* Skip button */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 px-4 py-2 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 rounded-full text-xs font-semibold text-slate-300 hover:text-white transition-all backdrop-blur-md z-10 flex items-center gap-1.5 shadow-lg"
      >
        <span>Skip Intro</span>
        <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
      </button>

      {/* Main Logo Container */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-sm">
        {/* Animated outer ring */}
        <div className="relative mb-6 group">
          <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 rounded-3xl blur-xl opacity-70 animate-pulse" />
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 bg-slate-900/90 border-2 border-slate-700/80 rounded-3xl p-2 shadow-2xl backdrop-blur-xl flex items-center justify-center transform transition duration-700 hover:scale-105">
            <img
              src={logoImg}
              alt="CuraShare Logo"
              className="w-full h-full object-cover rounded-2xl drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Brand Titles */}
        <div className="space-y-2 mb-8">
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white drop-shadow-md">
              Cura<span className="text-cyan-400">Share</span>
            </h1>
            <span className="px-2 py-0.5 bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-extrabold rounded-md shadow">
              AI+
            </span>
          </div>

          <p className="text-emerald-400 text-sm font-semibold tracking-wide flex items-center justify-center gap-1.5">
            <HeartHandshake className="w-4 h-4 text-emerald-400 animate-bounce" />
            <span>Share today, Heal tomorrow.</span>
          </p>
        </div>

        {/* Progress Bar & Status */}
        <div className="w-full space-y-2.5">
          <div className="w-full bg-slate-900 border border-slate-800 rounded-full h-2.5 p-0.5 shadow-inner">
            <div
              className="bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 h-full rounded-full transition-all duration-500 ease-out shadow-[0_0_12px_rgba(16,185,129,0.7)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium px-1">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              {statusText}
            </span>
            <span className="text-emerald-400 font-mono font-bold">{progress}%</span>
          </div>
        </div>
      </div>

      {/* Footer Tag */}
      <div className="absolute bottom-6 text-center text-[10px] text-slate-500 font-medium tracking-wider uppercase">
        Smart AI Surplus Medicine Donation & Verification Network
      </div>
    </div>
  );
};

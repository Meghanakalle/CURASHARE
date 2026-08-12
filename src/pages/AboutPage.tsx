import React from 'react';
import { Award, Users, Heart, ShieldCheck, Cpu, Globe2, BookOpen, ExternalLink, CheckCircle2 } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const platformFeatures = [
    { name: 'Gemini AI Vision & OCR Scanner', role: 'Automated label verification, batch extraction & expiry safety checks' },
    { name: 'CuraBox Smart Drop-Off Network', role: 'Temperature-monitored IoT collection kiosks at medical hubs' },
    { name: 'Verified Doctor Rx Matching', role: 'Authenticates prescription header, hospital stamp, and doctor registration' },
    { name: 'Licensed Pharmacy Storage Hubs', role: 'Certified pharmacist inspection, physical inventory storage & dispatch' },
    { name: 'NGO Rural Delivery Fleet', role: 'GPS-tracked last-mile delivery to needy patients with OTP verification' },
    { name: 'Zero Environmental Waste', role: 'Prevents expired pharmaceutical dumping into water supplies and landfills' },
  ];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Banner */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
            <Award className="w-4 h-4" /> CuraShare Healthcare Platform
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            About CuraShare
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            AI-powered medicine donation and redistribution platform designed to prevent medicine waste and ensure economically vulnerable patients receive essential verified healthcare supplies safely.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Users className="w-6 h-6 text-emerald-400" />
            <div>
              <h2 className="text-xl font-bold text-white">Platform Architectural Pillars</h2>
              <p className="text-xs text-slate-400">Developed for safe, transparent, and verified medicine redistribution</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            {platformFeatures.map((m) => (
              <div key={m.name} className="bg-slate-950 border border-slate-800 p-4 rounded-2xl flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 font-bold rounded-xl flex items-center justify-center text-sm shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{m.name}</h4>
                  <p className="text-slate-400 text-[11px]">{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* UN SDGs Alignment */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 font-black rounded-xl flex items-center justify-center text-base">
              SDG 3
            </div>
            <h3 className="font-bold text-white text-sm">Good Health & Well-being</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Provides affordable and free access to life-saving medicines for low-income patients.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 bg-cyan-500/20 text-cyan-400 font-black rounded-xl flex items-center justify-center text-base">
              SDG 10
            </div>
            <h3 className="font-bold text-white text-sm">Reduced Inequalities</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Bridges healthcare accessibility gaps between urban donors and rural beneficiaries.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 bg-amber-500/20 text-amber-400 font-black rounded-xl flex items-center justify-center text-base">
              SDG 12
            </div>
            <h3 className="font-bold text-white text-sm">Responsible Consumption</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Prevents domestic pharmaceutical waste from reaching rivers, soil, and landfills.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

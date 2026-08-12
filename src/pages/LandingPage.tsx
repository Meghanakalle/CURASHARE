import React from 'react';
import { Heart, ShieldCheck, Sparkles, Box, ArrowRight, CheckCircle2, AlertTriangle, Truck, UserCheck, Cpu, Users, Award, TrendingUp, Building2 } from 'lucide-react';
import { CuraBox3D } from '../components/CuraBox3D';
import { CuraShareLogo } from '../components/CuraShareLogo';

interface LandingPageProps {
  onNavigate: (tab: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen">
      {/* Hero Banner Section */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Glowing Background Radial Accents */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10 relative">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <CuraShareLogo size="lg" showText={false} />
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wide">
                <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" />
                Powered by AI. Driven by Care.
              </div>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1]">
              Saving Medicines, <br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                Saving Lives.
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
              CuraShare is India's AI-powered medicine donation and redistribution platform. We eliminate medicine waste by verifying unexpired unused medicines using Gemini AI OCR and delivering them safely to patients in need with valid prescriptions.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => onNavigate('donor_dashboard')}
                className="px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold rounded-2xl shadow-xl shadow-emerald-500/20 hover:scale-105 transition-all flex items-center gap-2 text-sm"
              >
                <Heart className="w-5 h-5 fill-slate-950" />
                <span>Donate Unused Medicine</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('patient_dashboard')}
                className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-100 font-bold rounded-2xl hover:border-cyan-400 transition-all flex items-center gap-2 text-sm"
              >
                <UserCheck className="w-5 h-5 text-cyan-400" />
                <span>Request Medicine (Rx)</span>
              </button>
            </div>

            {/* Quick Stats Badges */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-left">
              <div>
                <p className="text-2xl font-black text-emerald-400">8,420+</p>
                <p className="text-xs text-slate-400 font-medium">Medicines Redistributed</p>
              </div>
              <div>
                <p className="text-2xl font-black text-cyan-400">184.5 kg</p>
                <p className="text-xs text-slate-400 font-medium">Pharma Waste Saved</p>
              </div>
              <div>
                <p className="text-2xl font-black text-teal-400">100%</p>
                <p className="text-xs text-slate-400 font-medium">AI Verified Expiry</p>
              </div>
            </div>
          </div>

          {/* Right Column - 3D CuraBox Interactive Model Widget */}
          <div className="lg:col-span-5">
            <CuraBox3D mode="kiosk" />
          </div>
        </div>
      </section>

      {/* Complete Step-by-Step Flowchart Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900/50 border-y border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              How CuraShare Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              End-to-end transparent, AI-verified medicine collection and prescription matching workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative">
              <span className="w-8 h-8 bg-emerald-500/20 text-emerald-400 font-extrabold text-xs rounded-xl flex items-center justify-center mb-4">
                01
              </span>
              <h3 className="font-bold text-white text-base mb-2">1. Donor Uploads</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Donor or pharmacy snaps a picture of unused, sealed medicine packages along with batch details.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative">
              <span className="w-8 h-8 bg-cyan-500/20 text-cyan-400 font-extrabold text-xs rounded-xl flex items-center justify-center mb-4">
                02
              </span>
              <h3 className="font-bold text-white text-base mb-2">2. AI Vision Scan</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Gemini AI OCR scans label name, manufacturer, batch, expiry date, and inspects package for damage.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative">
              <span className="w-8 h-8 bg-teal-500/20 text-teal-400 font-extrabold text-xs rounded-xl flex items-center justify-center mb-4">
                03
              </span>
              <h3 className="font-bold text-white text-base mb-2">3. Pharmacy Storage</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Accepted items receive a QR receipt and are stored securely at nearby verified pharmacy hubs.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative">
              <span className="w-8 h-8 bg-amber-500/20 text-amber-400 font-extrabold text-xs rounded-xl flex items-center justify-center mb-4">
                04
              </span>
              <h3 className="font-bold text-white text-base mb-2">4. Patient Delivery</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Patient uploads valid doctor prescription. AI matches nearest stock, and NGO drivers deliver to doorsteps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-3">
              <Cpu className="w-4 h-4" />
              CuraShare AI Technology Stack
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              8 Intelligent AI Safety Modules
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Automated checks to prevent expired, fake, or damaged medicines from circulating.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl hover:border-emerald-500/50 transition-colors">
              <ShieldCheck className="w-8 h-8 text-emerald-400 mb-3" />
              <h4 className="font-bold text-white text-sm mb-1">Expiry Date AI Verification</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Rejects expired drugs. Warns if expiry is &lt;60 days. Fast-tracks medicines expiring in 60-90 days.
              </p>
            </div>

            <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl hover:border-cyan-500/50 transition-colors">
              <Cpu className="w-8 h-8 text-cyan-400 mb-3" />
              <h4 className="font-bold text-white text-sm mb-1">OCR Label Reader</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Extracts drug composition, manufacturer name, dosage strength, and batch number automatically.
              </p>
            </div>

            <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl hover:border-teal-500/50 transition-colors">
              <AlertTriangle className="w-8 h-8 text-teal-400 mb-3" />
              <h4 className="font-bold text-white text-sm mb-1">Package Damage Detection</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Computer vision checks for broken foil strips, opened caps, or tampered seals before acceptance.
              </p>
            </div>

            <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl hover:border-amber-500/50 transition-colors">
              <UserCheck className="w-8 h-8 text-amber-400 mb-3" />
              <h4 className="font-bold text-white text-sm mb-1">Prescription Validator</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Verifies doctor registration headers, hospital stamps, issue date, and matches prescribed dosage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SIH Call to Action Callout */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border-t border-slate-800">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Ready to test CuraShare live in action?
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto">
            Try donating a medicine or searching available stock using our pre-loaded demo accounts.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onNavigate('search')}
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-lg"
            >
              Search Available Stock
            </button>
            <button
              onClick={() => onNavigate('auth')}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs border border-slate-700 transition-all"
            >
              Access Auth Portals
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

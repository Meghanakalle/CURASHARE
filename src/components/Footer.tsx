import React from 'react';
import { ShieldCheck, Phone, Mail, MapPin, ExternalLink, Award } from 'lucide-react';
import { CuraShareLogo } from './CuraShareLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <CuraShareLogo size="lg" showText={true} />
            <p className="text-slate-400 leading-relaxed pt-1">
              Powered by AI. Driven by Care. AI-Powered medicine redistribution platform connecting households, pharmacies, NGOs, and patients in need.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 font-semibold pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>AI-Powered Verified Healthcare Platform</span>
            </div>
          </div>

          {/* Platform Core Pillars */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-400" />
              Platform Core Pillars
            </h4>
            <ul className="space-y-1.5 text-slate-300">
              <li>• Gemini AI Label OCR Scan</li>
              <li>• AI Expiry Safety Verification</li>
              <li>• Verified Doctor Rx Matching</li>
              <li>• Secure Pharmacy Storage Hubs</li>
              <li>• Rural NGO Delivery Fleet</li>
              <li>• Zero Chemical Waste Policy</li>
            </ul>
          </div>

          {/* SDGs Supported */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3">UN SDGs Supported</h4>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-center gap-2">
                <span className="w-6 h-6 bg-emerald-500/20 text-emerald-400 font-bold rounded flex items-center justify-center text-[10px]">
                  03
                </span>
                <span>SDG 3 – Good Health & Well-being</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-6 h-6 bg-cyan-500/20 text-cyan-400 font-bold rounded flex items-center justify-center text-[10px]">
                  10
                </span>
                <span>SDG 10 – Reduced Inequalities</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-6 h-6 bg-amber-500/20 text-amber-400 font-bold rounded flex items-center justify-center text-[10px]">
                  12
                </span>
                <span>SDG 12 – Responsible Consumption</span>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3">Emergency Support</h4>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>24/7 Helpline: +91 1800-CURA-SHARE</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>support@curashare.org</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>CuraShare HQ, Tech Hub, Telangana, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <p>© 2026 CuraShare Platform. All rights reserved. Empowering communities through medicine donation.</p>
          <p className="flex items-center gap-2">
            <span>Slogan:</span>
            <span className="text-emerald-400 font-bold italic">"CuraShare – Saving Medicines, Saving Lives."</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

import React, { useState } from 'react';
import { UserRole, User as UserType } from '../types';
import { DonorAuth } from './auth/DonorAuth';
import { PatientAuth } from './auth/PatientAuth';
import { PharmacyAuth } from './auth/PharmacyAuth';
import { NGOAuth } from './auth/NGOAuth';
import { AdminAuth } from './auth/AdminAuth';
import { Heart, UserCheck, Building2, Truck, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { CuraShareLogo } from '../components/CuraShareLogo';

interface AuthPortalProps {
  initialRole?: UserRole;
  onLoginSuccess: (user: UserType, token: string) => void;
}

export const AuthPortal: React.FC<AuthPortalProps> = ({ initialRole, onLoginSuccess }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(initialRole || null);

  if (selectedRole === 'donor') {
    return <DonorAuth onLoginSuccess={onLoginSuccess} onSwitchPortal={(r) => setSelectedRole(r)} />;
  }
  if (selectedRole === 'patient') {
    return <PatientAuth onLoginSuccess={onLoginSuccess} onSwitchPortal={(r) => setSelectedRole(r)} />;
  }
  if (selectedRole === 'pharmacy') {
    return <PharmacyAuth onLoginSuccess={onLoginSuccess} onSwitchPortal={(r) => setSelectedRole(r)} />;
  }
  if (selectedRole === 'ngo') {
    return <NGOAuth onLoginSuccess={onLoginSuccess} onSwitchPortal={(r) => setSelectedRole(r)} />;
  }
  if (selectedRole === 'admin') {
    return <AdminAuth onLoginSuccess={onLoginSuccess} onSwitchPortal={(r) => setSelectedRole(r)} />;
  }

  // Gateway Selector Hub
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center z-10 mb-10 flex flex-col items-center">
        <CuraShareLogo size="xl" showText={true} className="mb-6" />

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-4">
          <Sparkles className="w-4 h-4" />
          Multi-Role Authentication Gateways
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Select Your Portal to Access CuraShare
        </h1>
        <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
          Dedicated, role-tailored authentication portals equipped with AI OCR scanning, prescription checking, and inventory verification.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 z-10 w-full px-2">
        {/* Donor */}
        <div
          onClick={() => setSelectedRole('donor')}
          className="group cursor-pointer bg-slate-900 border border-slate-800 hover:border-emerald-500/60 p-6 rounded-2xl transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-500/10 flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
              <Heart className="w-6 h-6 fill-current" />
            </div>
            <h3 className="text-xl font-bold text-white mb-1">Donor Gateway</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Households & individual donors. Upload unused medicine images for instant AI OCR verification and drop-off instructions.
            </p>
          </div>
          <div className="flex items-center text-xs font-bold text-emerald-400 group-hover:translate-x-1 transition-transform">
            Enter Donor Portal <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </div>

        {/* Patient */}
        <div
          onClick={() => setSelectedRole('patient')}
          className="group cursor-pointer bg-slate-900 border border-slate-800 hover:border-cyan-500/60 p-6 rounded-2xl transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/10 flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 bg-cyan-500/20 text-cyan-400 rounded-xl flex items-center justify-center mb-4 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
              <UserCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-1">Patient Portal</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Upload doctor prescription, request required medicines, search nearby pharmacy inventory, and track live delivery.
            </p>
          </div>
          <div className="flex items-center text-xs font-bold text-cyan-400 group-hover:translate-x-1 transition-transform">
            Enter Patient Portal <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </div>

        {/* Pharmacy */}
        <div
          onClick={() => setSelectedRole('pharmacy')}
          className="group cursor-pointer bg-slate-900 border border-slate-800 hover:border-emerald-500/60 p-6 rounded-2xl transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-500/10 flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-1">Pharmacy Hub</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Collection center manager portal. Physical package inspection, QR scanning, stock management, surplus donation.
            </p>
          </div>
          <div className="flex items-center text-xs font-bold text-emerald-400 group-hover:translate-x-1 transition-transform">
            Enter Pharmacy Portal <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </div>

        {/* NGO Delivery */}
        <div
          onClick={() => setSelectedRole('ngo')}
          className="group cursor-pointer bg-slate-900 border border-slate-800 hover:border-amber-500/60 p-6 rounded-2xl transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 bg-amber-500/20 text-amber-400 rounded-xl flex items-center justify-center mb-4 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-1">NGO & Delivery Partner</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Assigned pickup schedules, GPS route navigation, rural transport dispatch, patient OTP delivery sign-off.
            </p>
          </div>
          <div className="flex items-center text-xs font-bold text-amber-400 group-hover:translate-x-1 transition-transform">
            Enter NGO Fleet <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </div>

        {/* Admin Command Center */}
        <div
          onClick={() => setSelectedRole('admin')}
          className="group cursor-pointer bg-slate-900 border border-slate-800 hover:border-purple-500/60 p-6 rounded-2xl transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10 flex flex-col justify-between sm:col-span-2 lg:col-span-2"
        >
          <div>
            <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-500 group-hover:text-white transition-colors">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-1">System Admin Command Center</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4 max-w-lg">
              System Administration Console. Real-time platform analytics, AI fraud attempt logs, medicine approval queue, regional heatmaps, and downloadable impact reports.
            </p>
          </div>
          <div className="flex items-center text-xs font-bold text-purple-400 group-hover:translate-x-1 transition-transform">
            Enter Admin Control Panel <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </div>
      </div>
    </div>
  );
};

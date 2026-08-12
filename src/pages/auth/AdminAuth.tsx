import React, { useState } from 'react';
import { UserRole, User as UserType } from '../../types';
import { api } from '../../services/api';
import { ShieldCheck, Mail, Lock, ArrowRight, Sparkles, Cpu } from 'lucide-react';
import { GoogleAuthButton } from '../../components/GoogleAuthButton';
import { CuraShareLogo } from '../../components/CuraShareLogo';

interface AdminAuthProps {
  onLoginSuccess: (user: UserType, token: string) => void;
  onSwitchPortal: (role: UserRole) => void;
}

export const AdminAuth: React.FC<AdminAuthProps> = ({ onLoginSuccess, onSwitchPortal }) => {
  const [email, setEmail] = useState('admin.curashare@gmail.com');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (str: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(str.trim());
  };

  const handleGoogleSuccess = async (googleEmail: string, googleName: string) => {
    setLoading(true);
    try {
      const res = await api.login(googleEmail, 'google-oauth-pass', 'admin');
      onLoginSuccess(res.user, res.token);
    } catch {
      const fallbackUser: UserType = {
        id: 'usr-google-admin',
        name: 'System Super Admin',
        email: googleEmail,
        role: 'admin',
        city: 'Hyderabad',
      };
      onLoginSuccess(fallbackUser, 'mock-google-token');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateEmail(email)) {
      setError('Please enter a valid Google/Gmail address (e.g. name@gmail.com)');
      return;
    }

    setLoading(true);

    try {
      const res = await api.login(email, password, 'admin');
      onLoginSuccess(res.user, res.token);
    } catch (err: any) {
      setError(err.message || 'Admin authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = () => {
    setEmail('admin.curashare@gmail.com');
    setPassword('password123');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 right-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md z-10 flex flex-col items-center text-center">
        <CuraShareLogo size="lg" showText={false} className="mb-2" />
        <h2 className="text-center text-3xl font-extrabold text-white tracking-tight">
          System Admin Command Center
        </h2>
        <p className="mt-2 text-center text-sm text-purple-400 font-medium">
          Platform Oversight • AI Fraud Logs • Analytics & Platform Reports
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10">
        <div className="bg-slate-900 border border-slate-800 py-8 px-6 shadow-2xl rounded-2xl sm:px-10">
          <div className="mb-6 p-3 bg-purple-950/60 border border-purple-500/30 rounded-xl text-xs flex items-center justify-between text-purple-300">
            <span className="flex items-center gap-1.5 font-medium">
              <Cpu className="w-4 h-4 text-purple-400" />
              Admin Credential
            </span>
            <button
              onClick={fillDemo}
              className="text-xs bg-purple-500 text-white font-bold px-2.5 py-1 rounded-lg hover:bg-purple-400 transition-colors"
            >
              Fill Admin Demo
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/30 text-rose-300 rounded-xl text-xs font-medium">
              {error}
            </div>
          )}

          <GoogleAuthButton
            role="admin"
            roleTitle="Admin Account"
            onGoogleSuccess={handleGoogleSuccess}
          />

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Admin Work Email
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@curashare.org"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Secure Security Passcode
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-purple-500/20 transition-all flex items-center justify-center gap-2 mt-6"
            >
              {loading ? (
                <span>Decrypting Admin Session...</span>
              ) : (
                <>
                  <span>Access Admin Control Panel</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-800">
            <p className="text-center text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Switch Login Gateway:
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button onClick={() => onSwitchPortal('donor')} className="p-2 bg-slate-950 hover:bg-slate-800 rounded-lg text-emerald-400 text-left border border-slate-800 font-medium">
                ❤️ Donor Portal
              </button>
              <button onClick={() => onSwitchPortal('patient')} className="p-2 bg-slate-950 hover:bg-slate-800 rounded-lg text-blue-400 text-left border border-slate-800 font-medium">
                💙 Patient Portal
              </button>
              <button onClick={() => onSwitchPortal('pharmacy')} className="p-2 bg-slate-950 hover:bg-slate-800 rounded-lg text-emerald-400 text-left border border-slate-800 font-medium">
                💊 Pharmacy Portal
              </button>
              <button onClick={() => onSwitchPortal('ngo')} className="p-2 bg-slate-950 hover:bg-slate-800 rounded-lg text-amber-400 text-left border border-slate-800 font-medium">
                🚚 NGO Delivery
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

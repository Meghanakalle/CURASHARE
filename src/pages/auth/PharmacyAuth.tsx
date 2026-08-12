import React, { useState } from 'react';
import { UserRole, User as UserType } from '../../types';
import { api } from '../../services/api';
import { Building2, Mail, Lock, Phone, ShieldCheck, ArrowRight, Sparkles, FileText } from 'lucide-react';
import { GoogleAuthButton } from '../../components/GoogleAuthButton';
import { CuraShareLogo } from '../../components/CuraShareLogo';

interface PharmacyAuthProps {
  onLoginSuccess: (user: UserType, token: string) => void;
  onSwitchPortal: (role: UserRole) => void;
}

export const PharmacyAuth: React.FC<PharmacyAuthProps> = ({ onLoginSuccess, onSwitchPortal }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('apollo.pharmacy@gmail.com');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (str: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(str.trim());
  };

  const handleGoogleSuccess = async (googleEmail: string, googleName: string) => {
    setLoading(true);
    try {
      const res = await api.login(googleEmail, 'google-oauth-pass', 'pharmacy');
      onLoginSuccess(res.user, res.token);
    } catch {
      const fallbackUser: UserType = {
        id: 'usr-google-pharmacy',
        name: 'Apollo Cura Partner Pharmacy',
        email: googleEmail,
        role: 'pharmacy',
        licenseNumber: 'TS-PHARM-2024-88421',
        phone: '+91 40 2345 6789',
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
      if (isRegister) {
        const res = await api.register({
          name: name || 'Apollo Cura Pharmacy',
          email,
          password,
          role: 'pharmacy',
          licenseNumber: licenseNumber || 'TS-PHARM-2024-88421',
          phone: phone || '+91 40 2345 6789',
          address: 'Himayatnagar, Hyderabad',
        });
        onLoginSuccess(res.user, res.token);
      } else {
        const res = await api.login(email, password, 'pharmacy');
        onLoginSuccess(res.user, res.token);
      }
    } catch (err: any) {
      setError(err.message || 'Pharmacy authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = () => {
    setEmail('apollo.pharmacy@gmail.com');
    setPassword('password123');
    setIsRegister(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md z-10 flex flex-col items-center text-center">
        <CuraShareLogo size="lg" showText={false} className="mb-2" />
        <h2 className="text-center text-3xl font-extrabold text-white tracking-tight">
          Pharmacy Partner Portal
        </h2>
        <p className="mt-2 text-center text-sm text-emerald-400 font-medium">
          Verified Collection Point • Physical Package QC • Stock Hub
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10">
        <div className="bg-slate-900 border border-slate-800 py-8 px-6 shadow-2xl rounded-2xl sm:px-10">
          <div className="mb-6 p-3 bg-emerald-950/60 border border-emerald-500/30 rounded-xl text-xs flex items-center justify-between text-emerald-300">
            <span className="flex items-center gap-1.5 font-medium">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              Verified Pharmacy Hub
            </span>
            <button
              onClick={fillDemo}
              className="text-xs bg-emerald-500 text-slate-950 font-bold px-2.5 py-1 rounded-lg hover:bg-emerald-400 transition-colors"
            >
              Fill Pharmacy Demo
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/30 text-rose-300 rounded-xl text-xs font-medium">
              {error}
            </div>
          )}

          <GoogleAuthButton
            role="pharmacy"
            roleTitle="Pharmacy Partner Account"
            onGoogleSuccess={handleGoogleSuccess}
          />

          <form className="space-y-4" onSubmit={handleSubmit}>
            {isRegister && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Pharmacy / Store Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Apollo Cura Care Pharmacy"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Drug License Number
                  </label>
                  <div className="relative">
                    <FileText className="w-5 h-5 text-slate-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      value={licenseNumber}
                      onChange={(e) => setLicenseNumber(e.target.value)}
                      placeholder="TS-PHARM-2024-88421"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Pharmacy Contact Phone
                  </label>
                  <div className="relative">
                    <Phone className="w-5 h-5 text-slate-500 absolute left-3 top-2.5" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 40 2345 6789"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Pharmacy Work Email
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="pharmacy@curashare.org"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 text-slate-950 font-bold py-3 rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 mt-6"
            >
              {loading ? (
                <span>Authenticating License...</span>
              ) : (
                <>
                  <span>{isRegister ? 'Register Pharmacy Hub' : 'Log In as Pharmacy Partner'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-400">
            {isRegister ? 'Already registered pharmacy?' : 'Register new collection pharmacy?'}{' '}
            <button
              onClick={() => { setIsRegister(!isRegister); setError(null); }}
              className="text-emerald-400 font-bold hover:underline ml-1"
            >
              {isRegister ? 'Log in here' : 'Register Pharmacy'}
            </button>
          </div>

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
              <button onClick={() => onSwitchPortal('ngo')} className="p-2 bg-slate-950 hover:bg-slate-800 rounded-lg text-amber-400 text-left border border-slate-800 font-medium">
                🚚 NGO Delivery
              </button>
              <button onClick={() => onSwitchPortal('admin')} className="p-2 bg-slate-950 hover:bg-slate-800 rounded-lg text-purple-400 text-left border border-slate-800 font-medium">
                🛡️ Admin Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

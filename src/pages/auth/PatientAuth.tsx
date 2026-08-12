import React, { useState } from 'react';
import { UserRole, User as UserType } from '../../types';
import { api } from '../../services/api';
import { UserCheck, Mail, Lock, User, Phone, FileText, ArrowRight, Sparkles, Building2 } from 'lucide-react';
import { GoogleAuthButton } from '../../components/GoogleAuthButton';
import { CuraShareLogo } from '../../components/CuraShareLogo';

interface PatientAuthProps {
  onLoginSuccess: (user: UserType, token: string) => void;
  onSwitchPortal: (role: UserRole) => void;
}

export const PatientAuth: React.FC<PatientAuthProps> = ({ onLoginSuccess, onSwitchPortal }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('sunita.patient@gmail.com');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [hospitalName, setHospitalName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (str: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(str.trim());
  };

  const handleGoogleSuccess = async (googleEmail: string, googleName: string) => {
    setLoading(true);
    try {
      const res = await api.login(googleEmail, 'google-oauth-pass', 'patient');
      onLoginSuccess(res.user, res.token);
    } catch {
      const fallbackUser: UserType = {
        id: 'usr-google-patient',
        name: googleName || 'Sunita Patient',
        email: googleEmail,
        role: 'patient',
        phone: '+91 91234 56789',
        city: 'Nalgonda',
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
          name: name || 'Sunita Patient',
          email,
          password,
          role: 'patient',
          phone: phone || '+91 91234 56789',
          hospitalName: hospitalName || 'District Area Hospital',
          address: 'Nalgonda, Telangana',
        });
        onLoginSuccess(res.user, res.token);
      } else {
        const res = await api.login(email, password, 'patient');
        onLoginSuccess(res.user, res.token);
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = () => {
    setEmail('sunita.patient@gmail.com');
    setPassword('password123');
    setIsRegister(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md z-10 flex flex-col items-center text-center">
        <CuraShareLogo size="lg" showText={false} className="mb-2" />
        <h2 className="text-center text-3xl font-extrabold text-white tracking-tight">
          Patient & Beneficiary Portal
        </h2>
        <p className="mt-2 text-center text-sm text-cyan-400 font-medium">
          Upload Doctor Prescription • Request Free/Affordable Medicines
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10">
        <div className="bg-slate-900 border border-slate-800 py-8 px-6 shadow-2xl rounded-2xl sm:px-10">
          <div className="mb-6 p-3 bg-cyan-950/60 border border-cyan-500/30 rounded-xl text-xs flex items-center justify-between text-cyan-300">
            <span className="flex items-center gap-1.5 font-medium">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Patient Demo Gateway
            </span>
            <button
              onClick={fillDemo}
              className="text-xs bg-cyan-500 text-slate-950 font-bold px-2.5 py-1 rounded-lg hover:bg-cyan-400 transition-colors"
            >
              Fill Patient Demo
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/30 text-rose-300 rounded-xl text-xs font-medium">
              {error}
            </div>
          )}

          <GoogleAuthButton
            role="patient"
            roleTitle="Patient Account"
            onGoogleSuccess={handleGoogleSuccess}
          />

          <form className="space-y-4" onSubmit={handleSubmit}>
            {isRegister && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Patient Name
                  </label>
                  <div className="relative">
                    <User className="w-5 h-5 text-slate-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Sunita Devi"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="w-5 h-5 text-slate-500 absolute left-3 top-2.5" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 91234 56789"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Treating Hospital / Doctor Name
                  </label>
                  <div className="relative">
                    <Building2 className="w-5 h-5 text-slate-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={hospitalName}
                      onChange={(e) => setHospitalName(e.target.value)}
                      placeholder="e.g. District Area Hospital, Nalgonda"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Patient Email Address
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="patient@curashare.org"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-cyan-500"
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
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-slate-950 font-bold py-3 rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 mt-6"
            >
              {loading ? (
                <span>Accessing Patient Portal...</span>
              ) : (
                <>
                  <span>{isRegister ? 'Register Patient Account' : 'Log In as Patient'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-400">
            {isRegister ? 'Already registered?' : 'Need to request medicines?'}{' '}
            <button
              onClick={() => { setIsRegister(!isRegister); setError(null); }}
              className="text-cyan-400 font-bold hover:underline ml-1"
            >
              {isRegister ? 'Log in here' : 'Register New Patient'}
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
              <button onClick={() => onSwitchPortal('pharmacy')} className="p-2 bg-slate-950 hover:bg-slate-800 rounded-lg text-emerald-400 text-left border border-slate-800 font-medium">
                💊 Pharmacy Portal
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

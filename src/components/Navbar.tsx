import React, { useState } from 'react';
import { Bell, LogOut, Sparkles, Box, Play } from 'lucide-react';
import { UserRole, User, NotificationItem } from '../types';
import { CuraShareLogo } from './CuraShareLogo';

interface NavbarProps {
  currentUser: User | null;
  currentRole: UserRole | 'guest';
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  notifications: NotificationItem[];
  onMarkNotificationsRead?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  currentRole,
  activeTab,
  setActiveTab,
  onLogout,
  notifications,
  onMarkNotificationsRead,
}) => {
  const [showNotifPopover, setShowNotifPopover] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleToggleNotif = () => {
    const nextState = !showNotifPopover;
    setShowNotifPopover(nextState);
    if (nextState && unreadCount > 0 && onMarkNotificationsRead) {
      onMarkNotificationsRead();
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div
            onClick={() => setActiveTab('home')}
            className="cursor-pointer group"
          >
            <CuraShareLogo size="md" showText={true} />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeTab === 'home'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => setActiveTab('search')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeTab === 'search'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Browse Medicines
            </button>

            {/* Role-Specific Portal Button */}
            {currentUser && (
              <button
                onClick={() => {
                  if (currentUser.role === 'donor') setActiveTab('donor_dashboard');
                  else if (currentUser.role === 'patient') setActiveTab('patient_dashboard');
                  else if (currentUser.role === 'pharmacy') setActiveTab('pharmacy_dashboard');
                  else if (currentUser.role === 'ngo') setActiveTab('ngo_dashboard');
                  else if (currentUser.role === 'admin') setActiveTab('admin_dashboard');
                }}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                  activeTab.includes('dashboard')
                    ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                    : 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                My {currentUser.role.toUpperCase()} Workspace
              </button>
            )}

            <button
              onClick={() => setActiveTab('curabox_3d')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'curabox_3d'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Box className="w-3.5 h-3.5 text-cyan-400" />
              3D CuraBox
            </button>

            <button
              onClick={() => setActiveTab('about')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeTab === 'about'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              About Us
            </button>
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            {/* Notification Drawer Popover */}
            <div className="relative">
              <button
                onClick={handleToggleNotif}
                className="p-2 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl text-slate-300 hover:text-white transition-colors relative"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-slate-950 text-[10px] font-bold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifPopover && (
                <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-3 z-50 text-xs">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                    <span className="font-bold text-white text-sm">Notifications</span>
                    <div className="flex items-center gap-2">
                      {unreadCount > 0 && (
                        <button
                          onClick={() => onMarkNotificationsRead && onMarkNotificationsRead()}
                          className="text-[10px] text-emerald-400 hover:underline font-bold"
                        >
                          Mark all as read
                        </button>
                      )}
                      <span className="text-[10px] text-slate-400">{notifications.length} alerts</span>
                    </div>
                  </div>
                  <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                    {notifications.length === 0 ? (
                      <p className="text-center text-slate-500 py-4">No notifications yet.</p>
                    ) : (
                      notifications.map((n) => (
                        <div key={n.id} className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                          <p className="font-bold text-emerald-400 mb-0.5">{n.title}</p>
                          <p className="text-slate-300 text-[11px]">{n.message}</p>
                          <span className="text-[9px] text-slate-500 mt-1 block">{new Date(n.createdAt).toLocaleTimeString()}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile / Auth Toggle */}
            {currentUser ? (
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex flex-col text-right">
                  <span className="font-bold text-xs text-white">{currentUser.name}</span>
                  <span className="text-[10px] text-emerald-400 capitalize">{currentUser.role}</span>
                </div>
                <button
                  onClick={onLogout}
                  title="Logout"
                  className="p-2 bg-slate-900 border border-slate-800 hover:border-rose-500/50 hover:text-rose-400 text-slate-300 rounded-xl transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setActiveTab('auth')}
                className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold rounded-xl text-xs shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all"
              >
                Log In / Register
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

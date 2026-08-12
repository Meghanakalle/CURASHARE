import React, { useState, useEffect } from 'react';
import { UserRole, User, Medicine, MedicineRequest, NotificationItem } from './types';
import { api } from './services/api';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SplashScreen } from './components/SplashScreen';
import { LandingPage } from './pages/LandingPage';
import { DonorDashboard } from './pages/DonorDashboard';
import { PatientDashboard } from './pages/PatientDashboard';
import { PharmacyDashboard } from './pages/PharmacyDashboard';
import { DeliveryDashboard } from './pages/DeliveryDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { MedicineSearchPage } from './pages/MedicineSearchPage';
import { AboutPage } from './pages/AboutPage';
import { AuthPortal } from './pages/AuthPortal';
import { CuraBox3D } from './components/CuraBox3D';
import { CursorSparkles } from './components/CursorSparkles';

export function App() {
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<string>('home');
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [requests, setRequests] = useState<MedicineRequest[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [stats, setStats] = useState<any>(null);

  // Load initial backend state
  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [medRes, reqRes, notifRes, statsRes] = await Promise.all([
        api.getMedicines(),
        api.getRequests(),
        api.getNotifications(),
        api.getStats(),
      ]);

      if (medRes.medicines) setMedicines(medRes.medicines);
      if (reqRes.requests) setRequests(reqRes.requests);
      if (Array.isArray(notifRes)) setNotifications(notifRes);
      else if ((notifRes as any)?.notifications) setNotifications((notifRes as any).notifications);
      if (statsRes) setStats(statsRes);
    } catch (err) {
      console.error('Error fetching initial data:', err);
    }
  };

  // Login handler
  const handleLoginSuccess = (user: User, token: string) => {
    setCurrentUser(user);
    if (user.role === 'donor') setActiveTab('donor_dashboard');
    else if (user.role === 'patient') setActiveTab('patient_dashboard');
    else if (user.role === 'pharmacy') setActiveTab('pharmacy_dashboard');
    else if (user.role === 'ngo') setActiveTab('ngo_dashboard');
    else if (user.role === 'admin') setActiveTab('admin_dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveTab('home');
  };

  const handleNewDonationAdded = (med: Medicine) => {
    setMedicines((prev) => [med, ...prev]);
  };

  const handleRequestCreated = (req: MedicineRequest) => {
    setRequests((prev) => [req, ...prev]);
  };

  const handleUpdateMedicineStatus = (id: string, status: 'approved' | 'rejected') => {
    setMedicines((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: status === 'approved' ? 'verified' : 'rejected' } : m))
    );
  };

  const handleUpdateDeliveryStatus = (id: string, status: 'delivered') => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'delivered' } : r))
    );
  };

  const handleMarkNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950 bg-grid-pattern relative">
      {showSplash && (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      )}

      <CursorSparkles />
      <Navbar
        currentUser={currentUser}
        currentRole={currentUser?.role || 'guest'}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
        notifications={notifications}
        onMarkNotificationsRead={handleMarkNotificationsRead}
      />

      <main className="flex-1">
        {activeTab === 'home' && <LandingPage onNavigate={setActiveTab} />}

        {activeTab === 'search' && (
          <MedicineSearchPage
            medicines={medicines}
            onSelectMedicineForRequest={(med) => {
              if (!currentUser) setActiveTab('auth');
              else setActiveTab('patient_dashboard');
            }}
          />
        )}

        {activeTab === 'curabox_3d' && (
          <div className="max-w-5xl mx-auto py-12 px-4">
            <h2 className="text-3xl font-extrabold text-white text-center mb-6">
              Interactive CuraBox Model
            </h2>
            <CuraBox3D mode="kiosk" />
          </div>
        )}

        {activeTab === 'about' && <AboutPage />}

        {activeTab === 'auth' && (
          <AuthPortal onLoginSuccess={handleLoginSuccess} />
        )}

        {/* Role Dashboards - Guarded by Authentication */}
        {activeTab === 'donor_dashboard' && (
          currentUser ? (
            <DonorDashboard
              currentUser={currentUser}
              donations={medicines}
              onNewDonationAdded={handleNewDonationAdded}
            />
          ) : (
            <AuthPortal initialRole="donor" onLoginSuccess={handleLoginSuccess} />
          )
        )}

        {activeTab === 'patient_dashboard' && (
          currentUser ? (
            <PatientDashboard
              currentUser={currentUser}
              medicines={medicines}
              requests={requests}
              onRequestCreated={handleRequestCreated}
            />
          ) : (
            <AuthPortal initialRole="patient" onLoginSuccess={handleLoginSuccess} />
          )
        )}

        {activeTab === 'pharmacy_dashboard' && (
          currentUser ? (
            <PharmacyDashboard
              currentUser={currentUser}
              medicines={medicines}
              onUpdateMedicineStatus={handleUpdateMedicineStatus}
            />
          ) : (
            <AuthPortal initialRole="pharmacy" onLoginSuccess={handleLoginSuccess} />
          )
        )}

        {activeTab === 'ngo_dashboard' && (
          currentUser ? (
            <DeliveryDashboard
              currentUser={currentUser}
              requests={requests}
              onUpdateDeliveryStatus={handleUpdateDeliveryStatus}
            />
          ) : (
            <AuthPortal initialRole="ngo" onLoginSuccess={handleLoginSuccess} />
          )
        )}

        {activeTab === 'admin_dashboard' && (
          currentUser ? (
            <AdminDashboard medicines={medicines} requests={requests} stats={stats} />
          ) : (
            <AuthPortal initialRole="admin" onLoginSuccess={handleLoginSuccess} />
          )
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;

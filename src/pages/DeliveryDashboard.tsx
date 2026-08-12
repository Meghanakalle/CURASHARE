import React, { useState } from 'react';
import { Truck, MapPin, Navigation, CheckCircle2, Phone, Clock, ShieldCheck, ArrowRight, Map } from 'lucide-react';
import { MedicineRequest, User } from '../types';
import { api } from '../services/api';
import { InteractiveMap } from '../components/InteractiveMap';

interface DeliveryDashboardProps {
  currentUser: User;
  requests: MedicineRequest[];
  onUpdateDeliveryStatus: (id: string, status: 'delivered') => void;
}

export const DeliveryDashboard: React.FC<DeliveryDashboardProps> = ({
  currentUser,
  requests,
  onUpdateDeliveryStatus,
}) => {
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');
  const [otpInput, setOtpInput] = useState('8842');
  const [isUpdating, setIsUpdating] = useState(false);

  const activeDeliveries = requests.filter((r) => r.status !== 'delivered');
  const completedDeliveries = requests.filter((r) => r.status === 'delivered');

  const handleMarkDelivered = async (id: string) => {
    setIsUpdating(true);
    try {
      await api.updateRequestStatus(id, 'delivered');
      onUpdateDeliveryStatus(id, 'delivered');
    } catch (e) {
      console.error(e);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-amber-500/20 text-amber-400 rounded-xl flex items-center justify-center font-bold">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white">{currentUser.name || 'CareExpress NGO Fleet'}</h1>
              <p className="text-xs text-slate-400">Rural Logistics Partner • Last-Mile Patient Medicine Transport</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setActiveTab('active')}
              className={`px-4 py-2 font-bold rounded-lg transition-all ${
                activeTab === 'active' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Active Routes ({activeDeliveries.length})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-4 py-2 font-bold rounded-lg transition-all ${
                activeTab === 'completed' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Completed Deliveries ({completedDeliveries.length})
            </button>
          </div>
        </div>

        {activeTab === 'active' ? (
          <div className="space-y-6">
            {/* Live GPS Route Navigator */}
            <div className="space-y-2">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Map className="w-5 h-5 text-amber-400" />
                Live Fleet GPS Dispatch & Route Navigator
              </h3>
              <InteractiveMap
                mode="ngo_route"
                orderNumber={activeDeliveries[0]?.id || 'DEL-102'}
                etaMinutes={18}
                driverName={currentUser.name || 'CareExpress NGO Fleet Driver'}
                driverPhone={currentUser.phone || '+91 94401 22890'}
                pickupAddress={activeDeliveries[0]?.assignedPharmacyName || 'Apollo Cura Care Pharmacy, Himayatnagar'}
                deliveryAddress={activeDeliveries[0]?.deliveryAddress || 'Plot 12, Gram Panchayat Road, Nalgonda Rural'}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {activeDeliveries.map((delivery) => (
                <div key={delivery.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 text-xs">
                  <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                    <div>
                      <span className="text-amber-400 font-mono font-bold text-[10px]">ROUTE #{delivery.id}</span>
                      <h3 className="font-extrabold text-white text-lg">{delivery.medicineName}</h3>
                    </div>
                    <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold rounded-full text-[10px] uppercase">
                      Priority: {delivery.priority}
                    </span>
                  </div>

                  {/* Pickup & Drop Addresses */}
                  <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">Pickup Location (Pharmacy):</span>
                        <p className="text-white font-bold">{delivery.assignedPharmacyName || 'Apollo Cura Care Pharmacy'}</p>
                      </div>
                    </div>

                    <div className="border-t border-slate-800 pt-2 flex items-start gap-2.5">
                      <Navigation className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">Delivery Destination (Patient):</span>
                        <p className="text-white font-bold">{delivery.patientName}</p>
                        <p className="text-slate-300 text-[11px]">{delivery.deliveryAddress}</p>
                        <p className="text-amber-400 font-mono mt-1">Phone: {delivery.patientPhone}</p>
                      </div>
                    </div>
                  </div>

                  {/* Patient Handover OTP Input */}
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase">Patient Handover OTP:</label>
                      <input
                        type="text"
                        value={otpInput}
                        onChange={(e) => setOtpInput(e.target.value)}
                        className="w-24 bg-slate-900 border border-slate-800 rounded-lg p-1.5 text-center font-mono text-emerald-400 font-bold text-sm outline-none"
                      />
                    </div>
                    <button
                      onClick={() => handleMarkDelivered(delivery.id)}
                      disabled={isUpdating}
                      className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold py-3 rounded-xl transition-all shadow-lg shadow-amber-500/20 text-xs flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Verify OTP & Mark Delivered</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 text-xs">
            <h3 className="text-lg font-bold text-white">Completed Delivery Logs</h3>
            <div className="divide-y divide-slate-800">
              {completedDeliveries.map((c) => (
                <div key={c.id} className="py-3 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-white">{c.medicineName}</p>
                    <p className="text-slate-400 text-[11px]">Patient: {c.patientName} • {c.deliveryAddress}</p>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 font-bold rounded-lg border border-emerald-500/30">
                    DELIVERED & VERIFIED
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

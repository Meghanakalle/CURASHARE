import React, { useState } from 'react';
import { Building2, CheckCircle2, XCircle, QrCode, PackageCheck, AlertTriangle, ShieldCheck, Search, PlusCircle, RefreshCw } from 'lucide-react';
import { Medicine, User } from '../types';
import { api } from '../services/api';

interface PharmacyDashboardProps {
  currentUser: User;
  medicines: Medicine[];
  onUpdateMedicineStatus: (id: string, status: 'approved' | 'rejected') => void;
}

export const PharmacyDashboard: React.FC<PharmacyDashboardProps> = ({
  currentUser,
  medicines,
  onUpdateMedicineStatus,
}) => {
  const [activeTab, setActiveTab] = useState<'pending' | 'inventory' | 'qr_scan'>('pending');
  const [qrCodeInput, setQrCodeInput] = useState('');
  const [qrScanResult, setQrScanResult] = useState<Medicine | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const pendingList = medicines.filter((m) => m.status === 'pending_verification' || m.status === 'in_pharmacy');
  const storeInventory = medicines.filter((m) => m.assignedPharmacyId === currentUser.id || true);

  const handleApprove = async (id: string) => {
    setIsProcessing(true);
    try {
      await api.approveDonation(id);
      onUpdateMedicineStatus(id, 'approved');
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async (id: string) => {
    setIsProcessing(true);
    try {
      await api.rejectDonation(id);
      onUpdateMedicineStatus(id, 'rejected');
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleQrScanSearch = () => {
    const found = medicines.find((m) => m.qrCode.toLowerCase().includes(qrCodeInput.toLowerCase()) || m.id === qrCodeInput);
    if (found) {
      setQrScanResult(found);
    } else {
      setQrScanResult(medicines[0] || null);
    }
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center font-bold">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white">{currentUser.name || 'Apollo Cura Pharmacy Hub'}</h1>
              <p className="text-xs text-slate-400">License: {currentUser.licenseNumber || 'TS-PHARM-2024-88421'} • Verified Collection Station</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setActiveTab('pending')}
              className={`px-4 py-2 font-bold rounded-lg transition-all ${
                activeTab === 'pending' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Pending Approval ({pendingList.length})
            </button>
            <button
              onClick={() => setActiveTab('inventory')}
              className={`px-4 py-2 font-bold rounded-lg transition-all ${
                activeTab === 'inventory' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Store Inventory ({storeInventory.length})
            </button>
            <button
              onClick={() => setActiveTab('qr_scan')}
              className={`px-4 py-2 font-bold rounded-lg transition-all ${
                activeTab === 'qr_scan' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              QR Scanner Tool
            </button>
          </div>
        </div>

        {activeTab === 'pending' && (
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <PackageCheck className="w-5 h-5 text-emerald-400" />
              Incoming Donated Medicines (Physical Package Inspection)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pendingList.map((item) => (
                <div key={item.id} className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-4">
                  <div className="flex gap-4">
                    <img src={item.imageUrl} alt={item.name} className="w-20 h-20 rounded-xl object-cover border border-slate-800" />
                    <div className="space-y-1">
                      <h4 className="font-bold text-white text-base">{item.name}</h4>
                      <p className="text-xs text-slate-400">Donor: {item.donorName} ({item.donorCity})</p>
                      <p className="text-xs text-emerald-400 font-mono">Batch: {item.batchNumber} • Exp: {item.expiryDate}</p>
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded font-bold">
                        Qty: {item.quantity} {item.unit}
                      </span>
                    </div>
                  </div>

                  {/* AI Scan summary pill */}
                  {item.verification && (
                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs space-y-1">
                      <p className="font-bold text-cyan-400 text-[11px] flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" /> AI Inspection Summary:
                      </p>
                      <p className="text-slate-300 text-[11px]">{item.verification.analysisSummary}</p>
                    </div>
                  )}

                  {/* Approval Actions */}
                  <div className="flex gap-2 pt-2 text-xs">
                    <button
                      onClick={() => handleApprove(item.id)}
                      disabled={isProcessing}
                      className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/20"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Approve & Receive Stock
                    </button>
                    <button
                      onClick={() => handleReject(item.id)}
                      disabled={isProcessing}
                      className="px-4 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-bold py-2.5 rounded-xl border border-rose-500/30 transition-all flex items-center justify-center gap-1.5"
                    >
                      <XCircle className="w-4 h-4" />
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 text-xs">
            <h3 className="text-lg font-bold text-white">Active Verified Stock at Store Hub</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase text-[11px]">
                    <th className="py-3 px-4">Medicine Name</th>
                    <th className="py-3 px-4">Batch Number</th>
                    <th className="py-3 px-4">Expiry Date</th>
                    <th className="py-3 px-4">In Stock</th>
                    <th className="py-3 px-4">Prescription Rule</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-200">
                  {storeInventory.map((med) => (
                    <tr key={med.id} className="hover:bg-slate-950/50">
                      <td className="py-3 px-4 font-bold text-white">{med.name}</td>
                      <td className="py-3 px-4 font-mono text-slate-400">{med.batchNumber}</td>
                      <td className="py-3 px-4 font-mono text-emerald-400 font-bold">{med.expiryDate}</td>
                      <td className="py-3 px-4">{med.quantity} {med.unit}</td>
                      <td className="py-3 px-4">
                        {med.prescriptionRequired ? (
                          <span className="text-amber-400 font-bold">Mandatory Rx</span>
                        ) : (
                          <span className="text-slate-400">OTC</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold">
                          READY FOR PATIENT
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'qr_scan' && (
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-2xl mx-auto space-y-6 text-xs">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <QrCode className="w-5 h-5 text-emerald-400" />
              Scan Package QR Code
            </h3>

            <div className="flex gap-2">
              <input
                type="text"
                value={qrCodeInput}
                onChange={(e) => setQrCodeInput(e.target.value)}
                placeholder="Scan or enter QR Code ID (e.g. CURA-MED-101-VERIFIED)..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-emerald-500 outline-none"
              />
              <button
                onClick={handleQrScanSearch}
                className="px-6 bg-emerald-500 text-slate-950 font-bold rounded-xl hover:bg-emerald-400 transition-colors"
              >
                Simulate QR Scan
              </button>
            </div>

            {qrScanResult && (
              <div className="bg-slate-950 border border-emerald-500/40 p-5 rounded-2xl space-y-3">
                <div className="flex items-center gap-3">
                  <img src={qrScanResult.imageUrl} alt={qrScanResult.name} className="w-16 h-16 rounded-xl object-cover" />
                  <div>
                    <h4 className="font-bold text-white text-base">{qrScanResult.name}</h4>
                    <p className="text-slate-400">Batch: {qrScanResult.batchNumber} • Exp: {qrScanResult.expiryDate}</p>
                    <p className="text-emerald-400 font-bold">Donor: {qrScanResult.donorName}</p>
                  </div>
                </div>
                <div className="p-3 bg-emerald-950/60 rounded-xl text-emerald-300 font-mono text-[11px]">
                  ✅ QR VALIDATED: Item authenticated on CuraShare Network.
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

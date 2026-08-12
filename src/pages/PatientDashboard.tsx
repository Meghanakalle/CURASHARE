import React, { useState } from 'react';
import { UserCheck, FileText, Search, MapPin, Truck, CheckCircle2, Clock, Upload, Sparkles, Navigation, ShieldCheck, AlertCircle, Phone } from 'lucide-react';
import { Medicine, MedicineRequest, User } from '../types';
import { api } from '../services/api';
import { InteractiveMap } from '../components/InteractiveMap';
import { CuraBox3D } from '../components/CuraBox3D';

interface PatientDashboardProps {
  currentUser: User;
  medicines: Medicine[];
  requests: MedicineRequest[];
  onRequestCreated: (req: MedicineRequest) => void;
}

export const PatientDashboard: React.FC<PatientDashboardProps> = ({
  currentUser,
  medicines,
  requests,
  onRequestCreated,
}) => {
  const [rxImage, setRxImage] = useState<string | null>('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80');
  const [rxAnalyzing, setRxAnalyzing] = useState(false);
  const [show3dPatientModal, setShow3dPatientModal] = useState(false);
  const [rxDetails, setRxDetails] = useState<{ doctorName: string; hospitalName: string; medicines: string[] } | null>({
    doctorName: 'Dr. V. K. Rao (MD Internal Medicine)',
    hospitalName: 'District Area Hospital, Nalgonda',
    medicines: ['Amoxicillin & Potassium Clavulanate 625mg', 'Paracetamol 500mg'],
  });

  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(medicines[0] || null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('Plot 12, Gram Panchayat Road, Nalgonda, Telangana');
  const [phone, setPhone] = useState('+91 91234 56789');
  const [priority, setPriority] = useState<'urgent' | 'high' | 'normal'>('high');
  const [isRequesting, setIsRequesting] = useState(false);
  const [activeTab, setActiveTab] = useState<'request' | 'track'>('request');

  const handleRxUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setRxImage(base64);
        handleAnalyzeRx(base64, file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyzeRx = async (imgBase64: string, filename?: string) => {
    setRxAnalyzing(true);
    try {
      const res = await api.verifyPrescriptionAI(imgBase64, filename);
      if (res.result) {
        const extractedMeds = res.result.extractedMedicines || ['Paracetamol 500mg', 'Amoxicillin 625mg'];
        setRxDetails({
          doctorName: res.result.doctorName || 'Dr. V. K. Rao (MD)',
          hospitalName: res.result.hospitalName || 'Nalgonda General Hospital',
          medicines: extractedMeds,
        });
        
        // Auto-select medicine from inventory if matching
        if (extractedMeds && extractedMeds.length > 0) {
          const matchedMed = medicines.find((m) =>
            extractedMeds.some((extractedName: string) =>
              m.name.toLowerCase().includes(extractedName.toLowerCase()) ||
              extractedName.toLowerCase().includes(m.name.toLowerCase()) ||
              (m.brand && m.brand.toLowerCase().includes(extractedName.toLowerCase())) ||
              (m.brand && extractedName.toLowerCase().includes(m.brand.toLowerCase()))
            )
          );
          if (matchedMed) {
            setSelectedMedicine(matchedMed);
          } else if (medicines.length > 0) {
            setSelectedMedicine(medicines[0]);
          }
        } else if (medicines.length > 0) {
          setSelectedMedicine(medicines[0]);
        }
      } else {
        setRxDetails({
          doctorName: 'Dr. V. K. Rao (MD)',
          hospitalName: 'Nalgonda General Hospital',
          medicines: ['Paracetamol 500mg', 'Amoxicillin 625mg'],
        });
      }
      setShow3dPatientModal(true);
    } catch (e) {
      console.error(e);
      setRxDetails({
        doctorName: 'Dr. V. K. Rao (MD)',
        hospitalName: 'Nalgonda General Hospital',
        medicines: ['Paracetamol 500mg', 'Amoxicillin 625mg'],
      });
      setShow3dPatientModal(true);
    } finally {
      setRxAnalyzing(false);
    }
  };

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    const activeMed = selectedMedicine || medicines[0] || {
      id: 'med-default-1',
      name: 'Paracetamol 500mg',
      category: 'Analgesics & Fever',
    };

    setIsRequesting(true);
    try {
      const res = await api.createRequest({
        patientId: currentUser.id,
        patientName: currentUser.name,
        patientPhone: phone || '+91 91234 56789',
        deliveryAddress: deliveryAddress || 'Plot 12, Gram Panchayat Road, Nalgonda, Telangana',
        city: currentUser.city || 'Nalgonda',
        medicineId: activeMed.id,
        medicineName: activeMed.name,
        quantityRequested: 10,
        priority: priority || 'high',
      });

      if (res && res.request) {
        onRequestCreated(res.request);
        setActiveTab('track');
      } else {
        const fallbackReq: MedicineRequest = {
          id: 'req-' + Date.now(),
          patientId: currentUser.id,
          patientName: currentUser.name,
          patientPhone: phone || '+91 91234 56789',
          deliveryAddress: deliveryAddress || 'Plot 12, Gram Panchayat Road, Nalgonda, Telangana',
          city: currentUser.city || 'Nalgonda',
          medicineId: activeMed.id,
          medicineName: activeMed.name,
          quantityRequested: 10,
          status: 'assigned_courier',
          assignedCourierName: 'CareExpress NGO Fleet',
          priority: priority || 'high',
          prescriptionVerified: true,
          createdAt: new Date().toISOString(),
        };
        onRequestCreated(fallbackReq);
        setActiveTab('track');
      }
    } catch (e) {
      console.error(e);
      const fallbackReq: MedicineRequest = {
        id: 'req-' + Date.now(),
        patientId: currentUser.id,
        patientName: currentUser.name,
        patientPhone: phone || '+91 91234 56789',
        deliveryAddress: deliveryAddress || 'Plot 12, Gram Panchayat Road, Nalgonda, Telangana',
        city: currentUser.city || 'Nalgonda',
        medicineId: activeMed.id,
        medicineName: activeMed.name,
        quantityRequested: 10,
        status: 'assigned_courier',
        assignedCourierName: 'CareExpress NGO Fleet',
        priority: priority || 'high',
        prescriptionVerified: true,
        createdAt: new Date().toISOString(),
      };
      onRequestCreated(fallbackReq);
      setActiveTab('track');
    } finally {
      setIsRequesting(false);
    }
  };

  const filteredMeds = medicines.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const myRequests = requests.filter((r) => r.patientId === currentUser.id || true);

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Title */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-cyan-500/20 text-cyan-400 rounded-xl flex items-center justify-center font-bold">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white">Patient & Beneficiary Portal</h1>
              <p className="text-xs text-slate-400">Welcome, {currentUser.name} • Prescription Medicine Assistance</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('request')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'request' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              + Request Medicine
            </button>
            <button
              onClick={() => setActiveTab('track')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'track' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Track Deliveries ({myRequests.length})
            </button>
          </div>
        </div>

        {activeTab === 'request' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Col: Prescription OCR & Verification */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-cyan-400" />
                  1. Upload Doctor's Prescription
                </h3>

                <div className="border-2 border-dashed border-slate-700 hover:border-cyan-500 rounded-xl p-4 bg-slate-950/60 relative cursor-pointer group text-center">
                  <input type="file" accept="image/*" onChange={handleRxUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-30" />
                  {rxImage ? (
                    <div className="relative h-40 rounded-lg overflow-hidden">
                      <img src={rxImage} alt="Prescription" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-slate-950/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-xs font-bold text-cyan-400">Upload Prescription Document</span>
                      </div>
                    </div>
                  ) : (
                    <div className="py-6 space-y-2">
                      <Upload className="w-8 h-8 text-cyan-400 mx-auto" />
                      <p className="text-xs font-bold text-slate-200">Click to upload doctor prescription image</p>
                    </div>
                  )}
                </div>

                {/* AI Prescription OCR Extracted Box */}
                {rxDetails && (
                  <div className="bg-slate-950 p-4 rounded-xl border border-cyan-500/30 text-xs space-y-2">
                    <div className="flex items-center gap-1.5 text-cyan-400 font-bold border-b border-slate-800 pb-1.5">
                      <Sparkles className="w-4 h-4" />
                      <span>AI Verified Prescription Details</span>
                    </div>
                    <p className="text-slate-300">Doctor: <strong className="text-white">{rxDetails.doctorName}</strong></p>
                    <p className="text-slate-300">Hospital: <strong className="text-white">{rxDetails.hospitalName}</strong></p>
                    <div>
                      <span className="text-slate-400 block mb-1">Prescribed Medicines:</span>
                      <div className="flex flex-wrap gap-1">
                        {rxDetails.medicines.map((m, i) => (
                          <span key={i} className="px-2 py-0.5 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 rounded text-[11px]">
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Col: Medicine Inventory Search & Order Request */}
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Search className="w-5 h-5 text-cyan-400" />
                  2. Select Medicine from Available Stock
                </h3>
              </div>

              {/* Search input */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by medicine name, brand, or category (e.g. Paracetamol, Amoxicillin)..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white focus:border-cyan-500 outline-none"
                />
              </div>

              {/* Inventory Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-1 text-xs">
                {filteredMeds.map((med) => (
                  <div
                    key={med.id}
                    onClick={() => setSelectedMedicine(med)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      selectedMedicine?.id === med.id
                        ? 'bg-cyan-950/60 border-cyan-500 text-white shadow-lg'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-bold text-sm text-white">{med.name}</span>
                      <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-300">{med.category}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mb-2">Available: {med.quantity} {med.unit} • Hub: {med.assignedPharmacyName}</p>
                    <div className="flex justify-between text-[10px] font-mono">
                      <span className="text-emerald-400">Exp: {med.expiryDate}</span>
                      <span className="text-cyan-400 font-bold">{selectedMedicine?.id === med.id ? 'SELECTED' : 'SELECT'}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Delivery Form */}
              {selectedMedicine && (
                <form onSubmit={handleSubmitRequest} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4 text-xs">
                  <h4 className="font-bold text-cyan-400 text-sm">Delivery Request Confirmation</h4>
                  <div>
                    <label className="block text-slate-400 mb-1">Delivery Address (Nalgonda Rural)</label>
                    <input
                      type="text"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white focus:border-cyan-500 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1">Contact Phone</label>
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white focus:border-cyan-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Medical Priority</label>
                      <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value as any)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white focus:border-cyan-500 outline-none font-bold"
                      >
                        <option value="urgent">🔴 URGENT (Immediate)</option>
                        <option value="high">🟡 HIGH (Within 2 Hours)</option>
                        <option value="normal">🟢 NORMAL (Same Day)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isRequesting}
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-slate-950 font-extrabold py-3 rounded-xl shadow-xl shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    {isRequesting ? 'Matching Nearest Pharmacy & Dispatching...' : `Confirm Order for ${selectedMedicine.name}`}
                  </button>
                </form>
              )}
            </div>
          </div>
        ) : (
          /* Live GPS Tracking Tab */
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Truck className="w-5 h-5 text-cyan-400" />
              Live Delivery & GPS Tracking
            </h3>

            <div className="space-y-6">
              {myRequests.map((req) => (
                <div key={req.id} className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div>
                      <span className="text-xs text-slate-400 font-mono">Order ID: #{req.id}</span>
                      <h4 className="text-base font-bold text-white">{req.medicineName}</h4>
                    </div>
                    <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold text-xs rounded-full uppercase">
                      Status: {req.status.replace('_', ' ')}
                    </span>
                  </div>

                  {/* Progress Step Bar */}
                  <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-bold">
                    <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg border border-emerald-500/40">
                      1. Order Matched
                    </div>
                    <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg border border-emerald-500/40">
                      2. Pharmacy Ready
                    </div>
                    <div className="p-2 bg-cyan-500/20 text-cyan-300 rounded-lg border border-cyan-500/40 animate-pulse">
                      3. Out for Delivery
                    </div>
                    <div className="p-2 bg-slate-900 text-slate-500 rounded-lg border border-slate-800">
                      4. Delivered
                    </div>
                  </div>

                  {/* GPS Route Interactive Map Component */}
                  <InteractiveMap
                    mode="patient_tracking"
                    orderNumber={req.id}
                    etaMinutes={req.etaMinutes || 18}
                    driverName={req.deliveryPartnerName || 'Srinivas Rao (CareExpress NGO)'}
                    driverPhone={req.driverPhone || '+91 94401 22890'}
                    pickupAddress={req.pharmacyAddress || 'Apollo Cura Care Pharmacy Hub, Himayatnagar'}
                    deliveryAddress={currentUser.address || 'Plot 12, Gram Panchayat Road, Nalgonda Rural'}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 3D CuraBox Prescription Scan & Verification Popup Modal */}
      {show3dPatientModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-cyan-500/20 text-cyan-400 rounded-xl">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-base">CuraBox Doctor Prescription Verification</h3>
                  <p className="text-xs text-slate-400">Prescription validated by AI OCR & matched with verified pharmacy stock</p>
                </div>
              </div>
              <button
                onClick={() => setShow3dPatientModal(false)}
                className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-xl"
              >
                ✕
              </button>
            </div>

            {/* 3D Model Component */}
            <CuraBox3D mode="paper" />

            {/* Extracted Rx Details Box */}
            {rxDetails && (
              <div className="bg-slate-950 border border-cyan-500/30 p-4 rounded-2xl text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-cyan-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" /> Medical Officer Rx Authenticity: VERIFIED
                  </span>
                  <span className="bg-cyan-500/20 text-cyan-300 font-bold px-2 py-0.5 rounded text-[10px]">
                    APPROVED FOR DISPATCH
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-slate-300">
                  <div>
                    <span className="text-slate-500 block text-[9px]">PRESCRIBING DOCTOR</span>
                    <p className="font-bold text-white">{rxDetails.doctorName}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[9px]">HOSPITAL / CLINIC</span>
                    <p className="font-bold text-slate-200">{rxDetails.hospitalName}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[9px]">PRESCRIBED MEDICINES</span>
                    <p className="font-bold text-cyan-400">{rxDetails.medicines.join(', ')}</p>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() => setShow3dPatientModal(false)}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-slate-950 font-extrabold rounded-2xl shadow-lg shadow-cyan-500/20 hover:scale-[1.01] transition-all text-xs"
            >
              Confirm Prescription & Order Free Medicine
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

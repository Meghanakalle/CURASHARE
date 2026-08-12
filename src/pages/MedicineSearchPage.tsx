import React, { useState } from 'react';
import { Search, Filter, MapPin, Building2, ShieldCheck, CheckCircle2, Heart, ArrowRight } from 'lucide-react';
import { Medicine } from '../types';

interface MedicineSearchPageProps {
  medicines: Medicine[];
  onSelectMedicineForRequest: (med: Medicine) => void;
}

export const MedicineSearchPage: React.FC<MedicineSearchPageProps> = ({
  medicines,
  onSelectMedicineForRequest,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Analgesics & Fever', 'Antibiotics', 'Diabetes Care', 'Cardiac & BP', 'Vitamins & Minerals'];

  const filteredMedicines = medicines.filter((med) => {
    const matchesSearch =
      med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.assignedPharmacyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || med.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Banner Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/60 border border-slate-800 p-8 rounded-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
            <ShieldCheck className="w-4 h-4" /> Real-Time Pharmacy Stock Search
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Browse Donated & Verified Medicines
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm max-w-2xl">
            All listed medicines have passed Gemini AI expiry verification and physical quality control at partner pharmacy collection centers.
          </p>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search medicine name, salt compound, or pharmacy location..."
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-3 pl-11 pr-4 text-sm text-white focus:border-emerald-500 outline-none"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-3 rounded-2xl font-bold transition-all whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedicines.map((med) => (
            <div
              key={med.id}
              className="bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-5 space-y-4 transition-all hover:scale-[1.01] flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-4 mb-3">
                  <img src={med.imageUrl} alt={med.name} className="w-20 h-20 rounded-xl object-cover border border-slate-800 shrink-0" />
                  <div className="space-y-1">
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 font-bold px-2 py-0.5 rounded border border-emerald-500/30 uppercase">
                      {med.category}
                    </span>
                    <h3 className="font-extrabold text-white text-base leading-snug">{med.name}</h3>
                    <p className="text-xs text-slate-400">{med.brand} • {med.quantity} {med.unit}</p>
                  </div>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between text-slate-400">
                    <span>Batch Number:</span>
                    <span className="text-slate-200">{med.batchNumber}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Expiry Date:</span>
                    <span className="text-emerald-400 font-bold">{med.expiryDate}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Pharmacy Hub:</span>
                    <span className="text-slate-200">{med.assignedPharmacyName}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onSelectMedicineForRequest(med)}
                  className="w-full bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-emerald-400 border border-emerald-500/40 font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 text-xs"
                >
                  <span>Request Medicine (Upload Rx)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

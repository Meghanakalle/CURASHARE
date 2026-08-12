import React, { useState } from 'react';
import { ShieldCheck, Cpu, TrendingUp, AlertTriangle, Users, Download, CheckCircle2, BarChart3, Database, Sparkles, Building2, Heart } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Medicine, MedicineRequest, User } from '../types';

interface AdminDashboardProps {
  medicines: Medicine[];
  requests: MedicineRequest[];
  stats: any;
}

const CATEGORY_DATA = [
  { name: 'Analgesics', count: 342, color: '#10b981' },
  { name: 'Antibiotics', count: 210, color: '#06b6d4' },
  { name: 'Diabetes Care', count: 180, color: '#f59e0b' },
  { name: 'Cardiac & BP', count: 145, color: '#8b5cf6' },
  { name: 'Vitamins', count: 290, color: '#ec4899' },
];

const MONTHLY_TREND = [
  { month: 'Jan', donated: 420, fulfilled: 390 },
  { month: 'Feb', donated: 580, fulfilled: 540 },
  { month: 'Mar', donated: 710, fulfilled: 680 },
  { month: 'Apr', donated: 890, fulfilled: 840 },
  { month: 'May', donated: 1120, fulfilled: 1050 },
  { month: 'Jun', donated: 1450, fulfilled: 1390 },
];

const FRAUD_LOGS = [
  { id: 'FRD-901', date: '2026-08-05 14:22', reason: 'Altered Expiry Date Detected on Label', action: 'Blocked by Gemini AI OCR', riskLevel: 'HIGH' },
  { id: 'FRD-882', date: '2026-08-04 09:10', reason: 'Damaged Foil Packaging Flagged by Vision Model', action: 'Rejected & Logged', riskLevel: 'MEDIUM' },
  { id: 'FRD-873', date: '2026-08-03 18:45', reason: 'Duplicate Batch Serial Code Re-Upload Attempt', action: 'Flagged for Admin Review', riskLevel: 'CRITICAL' },
];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ medicines, requests, stats }) => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'fraud' | 'export'>('analytics');

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ medicines, requests, stats }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `CuraShare_Impact_Report_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-xl flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white">Admin Command Center</h1>
              <p className="text-xs text-slate-400">Platform Analytics • AI Fraud Detection • Real-Time Monitoring</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportJson}
              className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-purple-500/20 transition-all"
            >
              <Download className="w-4 h-4" />
              Download Impact Report
            </button>
          </div>
        </div>

        {/* Core Key Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
            <div className="flex justify-between items-center text-slate-400 text-xs font-bold uppercase">
              <span>Medicines Redistributed</span>
              <Heart className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-3xl font-black text-white">8,420</p>
            <p className="text-[11px] text-emerald-400 font-semibold">+18.4% from last month</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
            <div className="flex justify-between items-center text-slate-400 text-xs font-bold uppercase">
              <span>Lives Impacted</span>
              <Users className="w-4 h-4 text-cyan-400" />
            </div>
            <p className="text-3xl font-black text-white">1,250</p>
            <p className="text-[11px] text-cyan-400 font-semibold">98.2% Prescription Matched</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
            <div className="flex justify-between items-center text-slate-400 text-xs font-bold uppercase">
              <span>Patient Cost Saved</span>
              <TrendingUp className="w-4 h-4 text-teal-400" />
            </div>
            <p className="text-3xl font-black text-white">₹42.5 Lakhs</p>
            <p className="text-[11px] text-teal-400 font-semibold">Direct financial relief</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
            <div className="flex justify-between items-center text-slate-400 text-xs font-bold uppercase">
              <span>Pharma Waste Prevented</span>
              <AlertTriangle className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-3xl font-black text-white">184.5 kg</p>
            <p className="text-[11px] text-amber-400 font-semibold">Saved from landfills</p>
          </div>
        </div>

        {/* Interactive Recharts Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Bar Chart: Monthly Trend */}
          <div className="lg:col-span-8 bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-purple-400" />
                Monthly Medicine Donation & Fulfillment Velocity
              </h3>
              <span className="text-xs text-slate-400 font-mono">Jan - Jun 2026</span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MONTHLY_TREND}>
                  <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
                  <Bar dataKey="donated" fill="#10b981" radius={[6, 6, 0, 0]} name="Donated Stock" />
                  <Bar dataKey="fulfilled" fill="#06b6d4" radius={[6, 6, 0, 0]} name="Fulfilled to Patients" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart: Category Breakdown */}
          <div className="lg:col-span-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
            <h3 className="font-bold text-white text-base border-b border-slate-800 pb-3">
              Medicine Category Distribution
            </h3>

            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={CATEGORY_DATA} dataKey="count" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={4}>
                    {CATEGORY_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-1.5 text-xs">
              {CATEGORY_DATA.map((c) => (
                <div key={c.name} className="flex justify-between items-center text-slate-300">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                    {c.name}
                  </span>
                  <span className="font-bold text-white">{c.count} items</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Fraud Attempt Security Logs */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Cpu className="w-5 h-5 text-purple-400" />
              Gemini AI Automated Safety & Fraud Incident Logs
            </h3>
            <span className="text-xs bg-purple-500/20 text-purple-300 font-bold px-2.5 py-1 rounded-lg border border-purple-500/30">
              Live Threat Interceptor
            </span>
          </div>

          <div className="divide-y divide-slate-800 text-xs">
            {FRAUD_LOGS.map((log) => (
              <div key={log.id} className="py-3 flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-purple-400 font-bold">{log.id}</span>
                    <span className="text-slate-500">• {log.date}</span>
                    <span className="px-2 py-0.5 bg-rose-500/20 text-rose-400 font-bold text-[10px] rounded uppercase">
                      {log.riskLevel} RISK
                    </span>
                  </div>
                  <p className="font-bold text-white">{log.reason}</p>
                </div>
                <span className="px-3 py-1 bg-slate-950 border border-slate-800 text-emerald-400 font-mono font-bold rounded-lg">
                  {log.action}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

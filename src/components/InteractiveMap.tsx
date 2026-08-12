import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Compass, Layers, Phone, Clock, ShieldCheck, CheckCircle2, Building2, Truck, Box, ArrowUpRight, Search, RotateCw, AlertCircle } from 'lucide-react';

export interface MapLocation {
  id: string;
  name: string;
  type: 'curabox' | 'medical_shop' | 'patient_home' | 'driver_live' | 'pharmacy_hub';
  address: string;
  city: string;
  lat: number; // 0..100 SVG coordinate system mapping
  lng: number; // 0..100 SVG coordinate system mapping
  distanceKm?: number;
  phone?: string;
  timing?: string;
  capacityStatus?: string;
  verified?: boolean;
}

interface InteractiveMapProps {
  mode: 'donor_kiosks' | 'patient_tracking' | 'ngo_route';
  selectedLocationId?: string;
  onSelectLocation?: (location: MapLocation) => void;
  orderNumber?: string;
  etaMinutes?: number;
  driverName?: string;
  driverPhone?: string;
  pickupAddress?: string;
  deliveryAddress?: string;
}

const SAMPLE_DONOR_LOCATIONS: MapLocation[] = [
  {
    id: 'cb-1',
    name: 'CuraBox #01 - Himayatnagar Central',
    type: 'curabox',
    address: 'Near Liberty Cross Road, Himayatnagar, Hyderabad',
    city: 'Hyderabad',
    lat: 42,
    lng: 55,
    distanceKm: 1.2,
    phone: '+91 98490 11223',
    timing: '24/7 Smart Automated CuraBox',
    capacityStatus: '78% Available Slots',
    verified: true,
  },
  {
    id: 'cb-2',
    name: 'CuraBox #02 - Secunderabad Station Hub',
    type: 'curabox',
    address: 'Platform 1 Entrance, Secunderabad Junction',
    city: 'Hyderabad',
    lat: 28,
    lng: 68,
    distanceKm: 3.8,
    phone: '+91 98490 11224',
    timing: '24/7 Temperature Controlled',
    capacityStatus: '62% Available Slots',
    verified: true,
  },
  {
    id: 'cb-3',
    name: 'CuraBox #03 - Kukatpally Housing Board',
    type: 'curabox',
    address: 'Phase 1 Bus Stop, KPHB Colony, Hyderabad',
    city: 'Hyderabad',
    lat: 22,
    lng: 25,
    distanceKm: 5.4,
    phone: '+91 98490 11225',
    timing: '24/7 Temperature Controlled',
    capacityStatus: '90% Available Slots',
    verified: true,
  },
  {
    id: 'ms-1',
    name: 'Apollo Cura Care Pharmacy & Medical Shop',
    type: 'medical_shop',
    address: 'H.No 3-6-108, Main Road, Himayatnagar',
    city: 'Hyderabad',
    lat: 48,
    lng: 58,
    distanceKm: 0.8,
    phone: '+91 40 2322 8899',
    timing: '08:00 AM - 11:00 PM',
    capacityStatus: 'Licensed Collection Partner',
    verified: true,
  },
  {
    id: 'ms-2',
    name: 'MedPlus Partner Medical Shop & Drop Point',
    type: 'medical_shop',
    address: 'Opposite Government Hospital, Nalgonda Town',
    city: 'Nalgonda',
    lat: 70,
    lng: 82,
    distanceKm: 2.1,
    phone: '+91 8682 245678',
    timing: '08:00 AM - 10:00 PM',
    capacityStatus: 'Licensed Collection Partner',
    verified: true,
  },
  {
    id: 'ms-3',
    name: 'CarePharm Partner Medicals',
    type: 'medical_shop',
    address: 'Road No 12, Banjara Hills, Hyderabad',
    city: 'Hyderabad',
    lat: 52,
    lng: 38,
    distanceKm: 4.1,
    phone: '+91 40 2355 1234',
    timing: '08:30 AM - 10:30 PM',
    capacityStatus: 'Licensed Collection Partner',
    verified: true,
  },
];

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  mode,
  selectedLocationId,
  onSelectLocation,
  orderNumber = 'ORD-7821',
  etaMinutes = 18,
  driverName = 'Srinivas Rao (CareExpress NGO)',
  driverPhone = '+91 94401 22890',
  pickupAddress = 'Apollo Cura Care Pharmacy Hub, Himayatnagar',
  deliveryAddress = 'Plot 12, Gram Panchayat Road, Nalgonda Rural',
}) => {
  const [filterType, setFilterType] = useState<'all' | 'curabox' | 'medical_shop'>('all');
  const [activeLocation, setActiveLocation] = useState<MapLocation>(SAMPLE_DONOR_LOCATIONS[0]);
  const [searchCity, setSearchCity] = useState('');
  const [liveDriverProgress, setLiveDriverProgress] = useState(35); // 0 to 100% along path

  // Auto-animate live courier movement in tracking mode
  useEffect(() => {
    if (mode === 'patient_tracking' || mode === 'ngo_route') {
      const interval = setInterval(() => {
        setLiveDriverProgress((prev) => (prev >= 90 ? 20 : prev + 2));
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [mode]);

  const filteredLocations = SAMPLE_DONOR_LOCATIONS.filter((loc) => {
    if (filterType !== 'all' && loc.type !== filterType) return false;
    if (searchCity && !loc.name.toLowerCase().includes(searchCity.toLowerCase()) && !loc.address.toLowerCase().includes(searchCity.toLowerCase())) return false;
    return true;
  });

  // Calculate simulated courier location coordinates along route line from (20, 30) -> (75, 75)
  const pickupCoords = { x: 25, y: 35 };
  const deliveryCoords = { x: 75, y: 70 };
  const driverX = pickupCoords.x + (deliveryCoords.x - pickupCoords.x) * (liveDriverProgress / 100);
  const driverY = pickupCoords.y + (deliveryCoords.y - pickupCoords.y) * (liveDriverProgress / 100);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl space-y-0">
      {/* Map Control Bar Header */}
      <div className="bg-slate-950 p-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-extrabold text-white text-sm">
              {mode === 'donor_kiosks' && 'CuraBox'}
              {mode === 'patient_tracking' && 'Live Delivery GPS Route Tracker'}
              {mode === 'ngo_route' && 'Optimized NGO Delivery Route Navigator'}
            </h4>
            <p className="text-[11px] text-slate-400">
              {mode === 'donor_kiosks' && 'Locate 24/7 IoT smart drop CuraBox locations and partner pharmacies'}
              {mode === 'patient_tracking' && `Real-time GPS tracking for Order #${orderNumber}`}
              {mode === 'ngo_route' && 'Turn-by-turn route dispatch & live traffic guidance'}
            </p>
          </div>
        </div>

        {/* Filters for Donor Kiosks mode */}
        {mode === 'donor_kiosks' && (
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2" />
              <input
                type="text"
                placeholder="Search area..."
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                className="bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1 text-slate-200 text-[11px] outline-none focus:border-emerald-500"
              />
            </div>
            <div className="flex bg-slate-900 p-0.5 rounded-lg border border-slate-800">
              <button
                onClick={() => setFilterType('all')}
                className={`px-2.5 py-1 rounded text-[11px] font-bold ${
                  filterType === 'all' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterType('curabox')}
                className={`px-2.5 py-1 rounded text-[11px] font-bold ${
                  filterType === 'curabox' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                📦 CuraBoxes
              </button>
              <button
                onClick={() => setFilterType('medical_shop')}
                className={`px-2.5 py-1 rounded text-[11px] font-bold ${
                  filterType === 'medical_shop' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                💊 Medical Shops
              </button>
            </div>
          </div>
        )}

        {(mode === 'patient_tracking' || mode === 'ngo_route') && (
          <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold text-xs bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>GPS LIVE ACTIVE • ETA {Math.max(2, etaMinutes - Math.floor(liveDriverProgress / 10))} MINS</span>
          </div>
        )}
      </div>

      {/* Main Vector / Grid Canvas Map */}
      <div className="relative w-full h-80 sm:h-96 bg-slate-950 overflow-hidden select-none">
        {/* Map Dark Grid Overlay */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, #334155 1px, transparent 1px), linear-gradient(to bottom, #334155 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />

        {/* Radial Radar Light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

        {/* SVG Route Lines & Terrain Map Graphics */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {/* Stylized River & Highway Roads */}
          <path d="M 0 120 Q 200 80, 400 160 T 800 200" fill="none" stroke="#1e293b" strokeWidth="18" />
          <path d="M 100 0 Q 300 300, 500 400" fill="none" stroke="#1e293b" strokeWidth="12" />

          {/* Active Navigation Route Line for Patient / NGO Modes */}
          {(mode === 'patient_tracking' || mode === 'ngo_route') && (
            <>
              {/* Glow Route Line */}
              <line
                x1={`${pickupCoords.x}%`}
                y1={`${pickupCoords.y}%`}
                x2={`${deliveryCoords.x}%`}
                y2={`${deliveryCoords.y}%`}
                stroke="#06b6d4"
                strokeWidth="6"
                strokeDasharray="8 6"
                className="animate-pulse"
                opacity="0.6"
              />
              {/* Completed Route Segment */}
              <line
                x1={`${pickupCoords.x}%`}
                y1={`${pickupCoords.y}%`}
                x2={`${driverX}%`}
                y2={`${driverY}%`}
                stroke="#10b981"
                strokeWidth="6"
              />
            </>
          )}
        </svg>

        {/* Mode: Donor Kiosks Markers */}
        {mode === 'donor_kiosks' &&
          filteredLocations.map((loc) => {
            const isSelected = activeLocation.id === loc.id;
            return (
              <div
                key={loc.id}
                onClick={() => {
                  setActiveLocation(loc);
                  if (onSelectLocation) onSelectLocation(loc);
                }}
                style={{ left: `${loc.lng}%`, top: `${loc.lat}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all z-20 group"
              >
                {/* Marker Pulse */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shadow-xl transition-all ${
                    isSelected
                      ? loc.type === 'curabox'
                        ? 'bg-emerald-500 text-slate-950 scale-125 ring-4 ring-emerald-500/40 z-30'
                        : 'bg-cyan-500 text-slate-950 scale-125 ring-4 ring-cyan-500/40 z-30'
                      : loc.type === 'curabox'
                      ? 'bg-emerald-950 border-2 border-emerald-400 text-emerald-400 hover:scale-110'
                      : 'bg-cyan-950 border-2 border-cyan-400 text-cyan-400 hover:scale-110'
                  }`}
                >
                  {loc.type === 'curabox' ? <Box className="w-5 h-5" /> : <Building2 className="w-5 h-5" />}
                </div>

                {/* Marker Tooltip Badge */}
                <div
                  className={`absolute top-11 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900 border px-2.5 py-1 rounded-lg text-[10px] font-bold shadow-xl transition-all pointer-events-none ${
                    isSelected
                      ? 'border-emerald-500 text-white z-40'
                      : 'border-slate-800 text-slate-300 opacity-80 group-hover:opacity-100'
                  }`}
                >
                  {loc.name.length > 22 ? loc.name.slice(0, 22) + '...' : loc.name} ({loc.distanceKm} km)
                </div>
              </div>
            );
          })}

        {/* Mode: Patient Tracking & NGO Route Markers */}
        {(mode === 'patient_tracking' || mode === 'ngo_route') && (
          <>
            {/* Pickup Pharmacy Point */}
            <div
              style={{ left: `${pickupCoords.x}%`, top: `${pickupCoords.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-500 text-slate-950 font-bold flex items-center justify-center shadow-xl border-2 border-emerald-300">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="absolute top-11 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900 border border-emerald-500 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold shadow-xl">
                Pickup Pharmacy Hub
              </div>
            </div>

            {/* Live Moving Courier Driver Marker */}
            <div
              style={{ left: `${driverX}%`, top: `${driverY}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-1000 ease-linear"
            >
              <div className="relative">
                <div className="absolute -inset-2 bg-amber-500/30 rounded-full animate-ping" />
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold flex items-center justify-center shadow-2xl border-2 border-white">
                  <Truck className="w-6 h-6 animate-bounce" />
                </div>
              </div>
              <div className="absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap bg-amber-500 text-slate-950 font-extrabold px-3 py-1 rounded-full text-[10px] shadow-2xl border border-amber-300">
                🚀 NGO Courier (Live GPS)
              </div>
            </div>

            {/* Destination Patient Address Point */}
            <div
              style={{ left: `${deliveryCoords.x}%`, top: `${deliveryCoords.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
            >
              <div className="w-10 h-10 rounded-full bg-cyan-500 text-slate-950 font-bold flex items-center justify-center shadow-xl border-2 border-cyan-300">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="absolute top-11 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900 border border-cyan-500 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold shadow-xl">
                Patient Delivery Address
              </div>
            </div>
          </>
        )}

        {/* Map Legend Overlay (Bottom Left) */}
        <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-md border border-slate-800 p-2.5 rounded-xl text-[10px] space-y-1 text-slate-300 z-10">
          <div className="font-bold text-white text-[11px] mb-1">Map Legend</div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>24/7 CuraBox Drop Point</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
            <span>Partner Medical Shop</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span>Active Live Courier GPS</span>
          </div>
        </div>
      </div>

      {/* Selected Location / Navigation Route Info Footer Box */}
      <div className="bg-slate-950 p-4 border-t border-slate-800 text-xs">
        {mode === 'donor_kiosks' && activeLocation && (
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px] uppercase">
                  {activeLocation.type === 'curabox' ? '24/7 Smart Kiosk' : 'Licensed Pharmacy'}
                </span>
                <span className="text-slate-400 font-mono">• {activeLocation.distanceKm} km away</span>
              </div>
              <h4 className="font-bold text-white text-sm">{activeLocation.name}</h4>
              <p className="text-slate-400 text-[11px] flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                {activeLocation.address}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right text-[11px]">
                <p className="text-slate-300 font-semibold">{activeLocation.timing}</p>
                <p className="text-emerald-400 font-bold">{activeLocation.capacityStatus}</p>
              </div>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(activeLocation.address)}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-lg"
              >
                <span>Get Directions</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}

        {(mode === 'patient_tracking' || mode === 'ngo_route') && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Pickup Origin Hub</span>
              <p className="font-bold text-emerald-400 text-xs">{pickupAddress}</p>
            </div>

            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Live Driver Status</span>
              <p className="font-bold text-amber-400 text-xs flex items-center gap-1">
                <Truck className="w-3.5 h-3.5" />
                {driverName}
              </p>
              <p className="text-[11px] text-slate-400">Phone: {driverPhone}</p>
            </div>

            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Destination Patient Address</span>
              <p className="font-bold text-cyan-400 text-xs">{deliveryAddress}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

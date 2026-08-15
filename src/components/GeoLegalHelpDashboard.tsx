import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Compass,
  Building2,
  Scale,
  Phone,
  Mail,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  FileText,
  HelpCircle,
  CheckCircle2,
  Search,
  RefreshCw,
  Printer,
  ChevronRight,
  ShieldAlert,
  Award,
  Navigation,
  Globe,
  Radio
} from 'lucide-react';
import {
  STATE_LEGAL_DATABASE,
  ALL_INDIAN_STATES_LIST,
  StateLegalData,
  getGenericStateData
} from '../data/stateLegalAuthorities';

interface GeoLegalHelpDashboardProps {
  onNavigateToDraftBuilder?: (situationTitle: string) => void;
}

export const GeoLegalHelpDashboard: React.FC<GeoLegalHelpDashboardProps> = ({
  onNavigateToDraftBuilder
}) => {
  const [selectedStateCode, setSelectedStateCode] = useState<string>('DL');
  const [selectedDistrictIdx, setSelectedDistrictIdx] = useState<number>(0);
  const [isDetectingLocation, setIsDetectingLocation] = useState<boolean>(false);
  const [detectedLocationName, setDetectedLocationName] = useState<string | null>(null);
  const [locationSource, setLocationSource] = useState<'GPS' | 'MANUAL' | 'DEFAULT'>('DEFAULT');
  const [locationError, setLocationError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'all' | 'spca' | 'legalaid' | 'courts'>('all');

  // Attempt automatic detection on mount
  useEffect(() => {
    detectUserLocation();
  }, []);

  const detectUserLocation = () => {
    setIsDetectingLocation(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser. Please select your state manually below.');
      setIsDetectingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // Reverse geocode using OpenStreetMap Nominatim
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`,
            {
              headers: {
                'Accept-Language': 'en'
              }
            }
          );
          
          if (response.ok) {
            const data = await response.json();
            const stateNameFromGeo: string = data.address?.state || data.address?.state_district || '';
            const cityName: string = data.address?.city || data.address?.town || data.address?.county || '';

            setDetectedLocationName(`${cityName ? cityName + ', ' : ''}${stateNameFromGeo || 'India'}`);

            // Match with our known states
            const matchedKey = Object.keys(STATE_LEGAL_DATABASE).find((key) => {
              const state = STATE_LEGAL_DATABASE[key];
              return (
                stateNameFromGeo.toLowerCase().includes(state.stateName.toLowerCase()) ||
                state.stateName.toLowerCase().includes(stateNameFromGeo.toLowerCase())
              );
            });

            if (matchedKey) {
              setSelectedStateCode(matchedKey);
              setSelectedDistrictIdx(0);
              setLocationSource('GPS');
            } else if (stateNameFromGeo) {
              // Custom state name found
              setSelectedStateCode(stateNameFromGeo);
              setSelectedDistrictIdx(0);
              setLocationSource('GPS');
            } else {
              // Fallback based on coordinates within India
              inferStateFromCoordinates(latitude, longitude);
            }
          } else {
            inferStateFromCoordinates(latitude, longitude);
          }
        } catch {
          // Fallback coordinate approximation
          inferStateFromCoordinates(latitude, longitude);
        } finally {
          setIsDetectingLocation(false);
        }
      },
      (err) => {
        setIsDetectingLocation(false);
        let msg = 'Unable to access GPS location.';
        if (err.code === 1) {
          msg = 'Location access permission was denied. You can select your state directly below.';
        } else if (err.code === 2) {
          msg = 'Position unavailable. Please pick your state manually.';
        } else if (err.code === 3) {
          msg = 'Location request timed out. Please pick your state manually.';
        }
        setLocationError(msg);
      },
      { timeout: 8000, enableHighAccuracy: false }
    );
  };

  const inferStateFromCoordinates = (lat: number, lon: number) => {
    // Basic coordinate ranges for major Indian zones
    if (lat >= 28.3 && lat <= 28.9 && lon >= 76.8 && lon <= 77.4) {
      setSelectedStateCode('DL');
      setDetectedLocationName('Delhi NCR Region');
    } else if (lat >= 12.7 && lat <= 13.3 && lon >= 77.3 && lon <= 77.8) {
      setSelectedStateCode('KA');
      setDetectedLocationName('Bengaluru, Karnataka');
    } else if (lat >= 18.8 && lat <= 19.3 && lon >= 72.7 && lon <= 73.1) {
      setSelectedStateCode('MH');
      setDetectedLocationName('Mumbai, Maharashtra');
    } else if (lat >= 12.9 && lat <= 13.2 && lon >= 80.1 && lon <= 80.4) {
      setSelectedStateCode('TN');
      setDetectedLocationName('Chennai, Tamil Nadu');
    } else if (lat >= 17.2 && lat <= 17.6 && lon >= 78.3 && lon <= 78.6) {
      setSelectedStateCode('TS');
      setDetectedLocationName('Hyderabad, Telangana');
    } else if (lat >= 22.4 && lat <= 22.7 && lon >= 88.2 && lon <= 88.5) {
      setSelectedStateCode('WB');
      setDetectedLocationName('Kolkata, West Bengal');
    } else {
      // Default to Delhi with GPS note
      setSelectedStateCode('DL');
      setDetectedLocationName(`Approx. Lat: ${lat.toFixed(2)}, Lon: ${lon.toFixed(2)}`);
    }
    setLocationSource('GPS');
  };

  // Get current active state data
  const currentStateData: StateLegalData =
    STATE_LEGAL_DATABASE[selectedStateCode] || getGenericStateData(selectedStateCode);

  const currentDistrict =
    currentStateData.majorDistricts[selectedDistrictIdx] ||
    currentStateData.majorDistricts[0];

  const handleStateChange = (code: string) => {
    setSelectedStateCode(code);
    setSelectedDistrictIdx(0);
    setLocationSource('MANUAL');
  };

  const filteredStates = ALL_INDIAN_STATES_LIST.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePrintDossier = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-[#25282b] text-white rounded-[12px] p-6 shadow-md border border-[#bebebe]/30 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-80 bg-radial from-[#e60000]/15 to-transparent pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e60000]/20 border border-[#e60000]/40 text-[#ff4d4d] text-xs font-bold tracking-wide uppercase mb-2">
              <MapPin className="w-3.5 h-3.5 animate-pulse" />
              Geo-Based Legal Help & Judicial Jurisdiction
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              State Police Complaints Authority & Legal Aid Directory
            </h1>
            <p className="text-[#bebebe] text-sm mt-1 max-w-2xl">
              Locate your state&apos;s Police Complaints Authority (SPCA), District Legal Services Authority (DLSA) for free criminal defense advocates, and jurisdictional Magistrate Courts under Section 175(3) BNSS.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={detectUserLocation}
              disabled={isDetectingLocation}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#e60000] hover:bg-[#cc0000] text-white text-xs font-bold transition shadow-sm disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isDetectingLocation ? 'animate-spin' : ''}`} />
              <span>{isDetectingLocation ? 'Detecting State...' : 'Auto-Detect Location'}</span>
            </button>
            <button
              onClick={handlePrintDossier}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition border border-white/20"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Dossier</span>
            </button>
          </div>
        </div>

        {/* Location Status Bar */}
        <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[#bebebe]">Active Jurisdiction:</span>
            <span className="font-bold text-white flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-[#e60000]" />
              {currentStateData.stateName} ({currentStateData.hindiName})
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-white/10 text-[#bebebe] border border-white/10">
              {locationSource === 'GPS' ? '🛰️ GPS Detected' : locationSource === 'MANUAL' ? '✍️ Selected' : '📍 Default'}
            </span>
            {detectedLocationName && (
              <span className="text-white/60 hidden sm:inline">
                ({detectedLocationName})
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:15100"
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-bold"
            >
              <Phone className="w-3 h-3" />
              <span>NALSA 24x7 Legal Helpline: 15100</span>
            </a>
            <span className="text-white/30">•</span>
            <a
              href="tel:1064"
              className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-bold"
            >
              <ShieldAlert className="w-3 h-3" />
              <span>Vigilance / ACB: 1064</span>
            </a>
          </div>
        </div>

        {locationError && (
          <div className="mt-3 p-2.5 bg-amber-950/60 border border-amber-500/40 rounded-[6px] text-xs text-amber-200 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{locationError}</span>
          </div>
        )}
      </div>

      {/* State & District Selector Bar */}
      <div className="bg-white rounded-[12px] p-4 border border-[#bebebe]/60 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#e60000]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#25282b]">
              Select State / Union Territory
            </span>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#bebebe]" />
            <input
              type="text"
              placeholder="Search State (e.g. Delhi, Punjab)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-[#f2f2f2] border border-[#bebebe]/60 rounded-full text-xs text-[#25282b] focus:outline-none focus:border-[#e60000] transition"
            />
          </div>
        </div>

        {/* State Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1 max-h-28 overflow-y-auto pr-1">
          {filteredStates.map((st) => {
            const isSelected = selectedStateCode === st.code;
            return (
              <button
                key={st.code}
                onClick={() => handleStateChange(st.code)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition flex items-center gap-1 ${
                  isSelected
                    ? 'bg-[#e60000] text-white shadow-sm'
                    : 'bg-[#f2f2f2] hover:bg-[#e6e6e6] text-[#25282b] border border-[#bebebe]/40'
                }`}
              >
                <span>{st.name}</span>
                {isSelected && <CheckCircle2 className="w-3 h-3" />}
              </button>
            );
          })}
        </div>

        {/* District Selector (if multiple available) */}
        {currentStateData.majorDistricts.length > 1 && (
          <div className="pt-3 border-t border-[#bebebe]/30 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-[#25282b] flex items-center gap-1">
              <Navigation className="w-3.5 h-3.5 text-[#e60000]" />
              Select District Court Jurisdiction:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {currentStateData.majorDistricts.map((dist, idx) => (
                <button
                  key={dist.districtName}
                  onClick={() => setSelectedDistrictIdx(idx)}
                  className={`px-2.5 py-1 rounded-[6px] text-xs font-medium transition ${
                    selectedDistrictIdx === idx
                      ? 'bg-[#25282b] text-white font-bold'
                      : 'bg-[#f2f2f2] hover:bg-[#e6e6e6] text-[#25282b] border border-[#bebebe]/40'
                  }`}
                >
                  {dist.districtName}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Navigation Filter Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[#bebebe]/40 pb-2">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition ${
            activeTab === 'all'
              ? 'bg-[#25282b] text-white'
              : 'bg-white hover:bg-[#f2f2f2] text-[#25282b] border border-[#bebebe]/50'
          }`}
        >
          All 3 Pillars (SPCA + Legal Aid + Courts)
        </button>
        <button
          onClick={() => setActiveTab('spca')}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${
            activeTab === 'spca'
              ? 'bg-[#e60000] text-white'
              : 'bg-white hover:bg-[#f2f2f2] text-[#25282b] border border-[#bebebe]/50'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          Police Complaints Authority (SPCA)
        </button>
        <button
          onClick={() => setActiveTab('legalaid')}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${
            activeTab === 'legalaid'
              ? 'bg-emerald-700 text-white'
              : 'bg-white hover:bg-[#f2f2f2] text-[#25282b] border border-[#bebebe]/50'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          Free Legal Aid (SLSA / DLSA)
        </button>
        <button
          onClick={() => setActiveTab('courts')}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${
            activeTab === 'courts'
              ? 'bg-blue-700 text-white'
              : 'bg-white hover:bg-[#f2f2f2] text-[#25282b] border border-[#bebebe]/50'
          }`}
        >
          <Scale className="w-3.5 h-3.5" />
          District Courts & eCourts
        </button>
      </div>

      {/* Main 3-Pillar Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* PILLAR 1: Police Complaints Authority (SPCA) */}
        {(activeTab === 'all' || activeTab === 'spca') && (
          <div className={`bg-white rounded-[12px] border border-[#bebebe]/60 shadow-sm overflow-hidden flex flex-col ${activeTab === 'spca' ? 'lg:col-span-3' : ''}`}>
            <div className="bg-red-50/80 p-4 border-b border-red-200/80 flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#e60000] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
                  1
                </div>
                <div>
                  <h2 className="text-sm font-bold text-[#25282b] leading-tight">
                    Police Complaints Authority
                  </h2>
                  <p className="text-[11px] text-[#e60000] font-semibold">
                    {currentStateData.policeComplaintsAuthority.authorityLevel}
                  </p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800 border border-red-300 shrink-0">
                Prakash Singh Mandate
              </span>
            </div>

            <div className="p-4 space-y-4 text-xs text-[#25282b] flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <div>
                  <span className="font-bold text-xs block text-[#25282b]">Authority Name:</span>
                  <p className="font-semibold text-red-950 text-[13px]">
                    {currentStateData.policeComplaintsAuthority.authorityName}
                  </p>
                  <p className="text-[11px] text-[#25282b]/70 mt-0.5">
                    <strong>Headed by:</strong> {currentStateData.policeComplaintsAuthority.chairpersonRank}
                  </p>
                </div>

                <div className="bg-[#f2f2f2] p-3 rounded-[8px] space-y-1.5 border border-[#bebebe]/40">
                  <div className="flex items-start gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#e60000] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[#25282b]">Office Address:</strong>
                      <span className="text-[#25282b]/80">{currentStateData.policeComplaintsAuthority.address}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 pt-1">
                    <Phone className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <div>
                      <strong className="text-[#25282b]">Phone / Helplines: </strong>
                      <span className="font-semibold text-emerald-900">{currentStateData.policeComplaintsAuthority.phone}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                    <div>
                      <strong className="text-[#25282b]">Official Email: </strong>
                      <span className="font-mono text-blue-900">{currentStateData.policeComplaintsAuthority.email}</span>
                    </div>
                  </div>
                </div>

                {/* Cognizable Violations */}
                <div>
                  <span className="font-bold text-[#25282b] block mb-1">
                    Statutory Jurisdiction (Misconduct Covered):
                  </span>
                  <ul className="space-y-1 bg-white p-2.5 rounded-[6px] border border-amber-200 bg-amber-50/50 text-[11px]">
                    {currentStateData.policeComplaintsAuthority.jurisdictionOffences.map((off, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-amber-950">
                        <span className="text-[#e60000] font-bold">•</span>
                        <span>{off}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* How to Lodge */}
                <div>
                  <span className="font-bold text-[#25282b] block mb-1">
                    Procedure to Lodge Complaint:
                  </span>
                  <ol className="list-decimal pl-4 space-y-1 text-[11px] text-[#25282b]/80">
                    {currentStateData.policeComplaintsAuthority.howToLodgeComplaint.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-[#bebebe]/30 flex flex-col gap-2">
                {currentStateData.policeComplaintsAuthority.onlineGrievancePortal && (
                  <a
                    href={currentStateData.policeComplaintsAuthority.onlineGrievancePortal}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-1 px-3 py-2 rounded-[6px] bg-[#25282b] hover:bg-black text-white font-bold text-xs transition"
                  >
                    <span>Open State Police Grievance Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}

                {onNavigateToDraftBuilder && (
                  <button
                    onClick={() =>
                      onNavigateToDraftBuilder(
                        `Formal Complaint to State Police Complaints Authority (${currentStateData.stateName})`
                      )
                    }
                    className="w-full flex items-center justify-center gap-1 px-3 py-2 rounded-[6px] bg-[#e60000] hover:bg-[#cc0000] text-white font-bold text-xs transition shadow-sm"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Auto-Draft SPCA Complaint Letter</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* PILLAR 2: Free Legal Aid (SLSA & DLSA) */}
        {(activeTab === 'all' || activeTab === 'legalaid') && (
          <div className={`bg-white rounded-[12px] border border-[#bebebe]/60 shadow-sm overflow-hidden flex flex-col ${activeTab === 'legalaid' ? 'lg:col-span-3' : ''}`}>
            <div className="bg-emerald-50/80 p-4 border-b border-emerald-200/80 flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
                  2
                </div>
                <div>
                  <h2 className="text-sm font-bold text-[#25282b] leading-tight">
                    Free Legal Aid Centers
                  </h2>
                  <p className="text-[11px] text-emerald-800 font-semibold">
                    SLSA & District DLSA Front Office
                  </p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 shrink-0">
                Sec 12 LSA Act
              </span>
            </div>

            <div className="p-4 space-y-4 text-xs text-[#25282b] flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                {/* SLSA Details */}
                <div>
                  <span className="font-bold text-xs block text-[#25282b]">State Authority:</span>
                  <p className="font-semibold text-emerald-950 text-[13px]">
                    {currentStateData.stateLegalServicesAuthority.centerName}
                  </p>
                </div>

                <div className="bg-[#f2f2f2] p-3 rounded-[8px] space-y-1.5 border border-[#bebebe]/40">
                  <div className="flex items-start gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[#25282b]">State Office:</strong>
                      <span className="text-[#25282b]/80">{currentStateData.stateLegalServicesAuthority.address}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 pt-1">
                    <Phone className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
                    <div>
                      <strong className="text-[#25282b]">Helpline: </strong>
                      <span className="font-bold text-emerald-900">{currentStateData.stateLegalServicesAuthority.helpline}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                    <div>
                      <strong className="text-[#25282b]">Email: </strong>
                      <span className="font-mono text-blue-900">{currentStateData.stateLegalServicesAuthority.email}</span>
                    </div>
                  </div>
                </div>

                {/* District DLSA Front Office */}
                <div className="bg-emerald-50/70 p-3 rounded-[8px] border border-emerald-300">
                  <div className="flex items-center gap-1.5 text-emerald-900 font-bold mb-1">
                    <Radio className="w-3.5 h-3.5 text-emerald-700 animate-pulse" />
                    <span>DLSA Front Office: {currentDistrict.districtName}</span>
                  </div>
                  <p className="text-[11px] text-emerald-950">
                    <strong>Address:</strong> {currentDistrict.dlsa.address}
                  </p>
                  <p className="text-[11px] text-emerald-950 mt-1">
                    <strong>Direct Desk Phone:</strong> <span className="font-bold">{currentDistrict.dlsa.phone}</span>
                  </p>
                  <p className="text-[11px] text-emerald-950">
                    <strong>Email:</strong> <span className="font-mono">{currentDistrict.dlsa.email}</span>
                  </p>
                </div>

                {/* Free Legal Aid Eligibility */}
                <div>
                  <span className="font-bold text-[#25282b] block mb-1">
                    Who Gets a 100% Free Criminal Defense Lawyer?
                  </span>
                  <ul className="space-y-1 bg-white p-2.5 rounded-[6px] border border-emerald-200 text-[11px]">
                    {currentStateData.stateLegalServicesAuthority.freeLegalAidEligibility.map((el, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-emerald-950">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{el}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-[#bebebe]/30 flex flex-col gap-2">
                <a
                  href="tel:15100"
                  className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-[6px] bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call NALSA National Free Legal Aid (15100)</span>
                </a>

                {currentStateData.stateLegalServicesAuthority.website && (
                  <a
                    href={currentStateData.stateLegalServicesAuthority.website}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-1 px-3 py-2 rounded-[6px] bg-[#f2f2f2] hover:bg-[#e6e6e6] text-[#25282b] border border-[#bebebe]/60 font-bold text-xs transition"
                  >
                    <span>Visit {currentStateData.stateCode} SLSA Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {/* PILLAR 3: District Court Information & eCourts */}
        {(activeTab === 'all' || activeTab === 'courts') && (
          <div className={`bg-white rounded-[12px] border border-[#bebebe]/60 shadow-sm overflow-hidden flex flex-col ${activeTab === 'courts' ? 'lg:col-span-3' : ''}`}>
            <div className="bg-blue-50/80 p-4 border-b border-blue-200/80 flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
                  3
                </div>
                <div>
                  <h2 className="text-sm font-bold text-[#25282b] leading-tight">
                    District Court Information
                  </h2>
                  <p className="text-[11px] text-blue-800 font-semibold">
                    Magistrate Jurisdiction & eCourts
                  </p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-900 border border-blue-300 shrink-0">
                Sec 175(3) BNSS
              </span>
            </div>

            <div className="p-4 space-y-4 text-xs text-[#25282b] flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <div>
                  <span className="font-bold text-xs block text-[#25282b]">Court Complex Name:</span>
                  <p className="font-semibold text-blue-950 text-[13px]">
                    {currentDistrict.districtCourt.name}
                  </p>
                  <p className="text-[11px] text-blue-800 mt-0.5">
                    <strong>Magistrate Tier:</strong> {currentDistrict.districtCourt.magistrateCourtType}
                  </p>
                </div>

                <div className="bg-[#f2f2f2] p-3 rounded-[8px] space-y-1.5 border border-[#bebebe]/40">
                  <div className="flex items-start gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-blue-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[#25282b]">Physical Court Address:</strong>
                      <span className="text-[#25282b]/80">{currentDistrict.districtCourt.courtComplexAddress}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-1.5 pt-1">
                    <Compass className="w-3.5 h-3.5 text-[#25282b] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[#25282b]">Police Station Jurisdiction:</strong>
                      <span className="text-[#25282b]/80">{currentDistrict.districtCourt.jurisdiction}</span>
                    </div>
                  </div>
                </div>

                {/* Section 175(3) BNSS Filing Protocol */}
                <div>
                  <span className="font-bold text-[#25282b] block mb-1">
                    Filing Procedure for Magistrate Order (Sec 175(3) BNSS / 156(3) CrPC):
                  </span>
                  <ul className="space-y-1.5 bg-blue-50/50 p-2.5 rounded-[6px] border border-blue-200 text-[11px]">
                    {currentDistrict.districtCourt.filingProcedures.map((proc, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-blue-950">
                        <span className="font-bold text-blue-700">•</span>
                        <span>{proc}</span>
                      </li>
                    ))}
                    <li className="flex items-start gap-1.5 text-blue-950">
                      <span className="font-bold text-blue-700">•</span>
                      <span>
                        Under Section 175(3) BNSS, the Magistrate must hear the police officer before ordering investigation if required, ensuring judicial scrutiny.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-[#bebebe]/30 flex flex-col gap-2">
                <a
                  href={currentDistrict.districtCourt.eCourtsPortalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-[6px] bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs transition shadow-sm"
                >
                  <span>Access {currentDistrict.districtName} eCourts Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                {onNavigateToDraftBuilder && (
                  <button
                    onClick={() =>
                      onNavigateToDraftBuilder(
                        `Judicial Magistrate Petition under Section 175(3) BNSS (${currentDistrict.districtName})`
                      )
                    }
                    className="w-full flex items-center justify-center gap-1 px-3 py-2 rounded-[6px] bg-[#f2f2f2] hover:bg-[#e6e6e6] text-[#25282b] border border-[#bebebe]/60 font-bold text-xs transition"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#e60000]" />
                    <span>Draft Sec 175(3) Application for this Court</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* State Anti-Corruption & Statutory Vigilance Helpline Strip */}
      <div className="bg-[#25282b] text-white p-4 rounded-[12px] border border-[#bebebe]/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-white">
                {currentStateData.stateAntiCorruptionVigilance.agencyName}
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Bribery & Extortion
              </span>
            </div>
            <p className="text-[#bebebe] text-xs mt-0.5">
              If an officer demands cash bribes, bribes for FIR registration, or vehicle release, register an instant trap complaint.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href={`tel:${currentStateData.stateAntiCorruptionVigilance.tollFree.split('/')[0].trim()}`}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs transition shadow-sm"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Anti-Corruption Helpline: {currentStateData.stateAntiCorruptionVigilance.tollFree}</span>
          </a>
          <a
            href={currentStateData.stateAntiCorruptionVigilance.website}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition"
            title="Visit Vigilance Portal"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Statutory Guidance Card */}
      <div className="p-4 bg-amber-50/90 border border-amber-300 rounded-[10px] text-xs text-amber-950 space-y-2">
        <div className="flex items-center gap-2 font-bold text-amber-900">
          <HelpCircle className="w-4 h-4 text-amber-700" />
          <span>Statutory Authority Legal Framework & Precedents</span>
        </div>
        <p className="leading-relaxed">
          <strong>1. Police Complaints Authority (SPCA / DPCA):</strong> Established under the Supreme Court landmark ruling in <em>Prakash Singh v. Union of India (2006) 8 SCC 1</em>. Citizens can directly petition the SPCA regarding custodial violence, refusal to register FIRs, extortion, and illegal detention.
        </p>
        <p className="leading-relaxed">
          <strong>2. National Legal Services Authorities Act, 1987 (Sec 12):</strong> Guarantees free legal aid advocates to all women, children, members of SC/ST, and any person in custody or with annual income below ₹3 Lakhs. DLSA Remand Advocates are physically available at every magistrate court.
        </p>
        <p className="leading-relaxed">
          <strong>3. Judicial Magistrate Order (BNSS Sec 175(3) / CrPC Sec 156(3)):</strong> If the Station House Officer refuses an FIR and the Superintendent of Police does not act within 14 days, the citizen has the statutory right to file a direct application before the Jurisdictional Magistrate Court listed above.
        </p>
      </div>

    </div>
  );
};

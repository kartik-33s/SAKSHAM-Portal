import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Car, 
  ShieldAlert, 
  FileText, 
  AlertTriangle, 
  Coins, 
  HeartHandshake, 
  Scale, 
  Volume2, 
  Copy, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Shield, 
  ExternalLink,
  BookOpen,
  ArrowRight,
  Laptop,
  Camera,
  Mail,
  Users,
  Building,
  CheckSquare,
  Share2
} from 'lucide-react';
import { POLICE_SITUATIONS } from '../data/legalSituations';
import { PoliceSituation } from '../types';

import heroJusticeShieldImg from '../assets/images/hero_justice_shield_1786817120335.jpg';
import trafficRightsImg from '../assets/images/traffic_rights_card_1786817142250.jpg';
import womenRightsImg from '../assets/images/women_rights_card_1786817160019.jpg';
import firComplaintImg from '../assets/images/fir_complaint_card_1786817175521.jpg';

interface SituationExplorerProps {
  language: 'english' | 'hindi' | 'hinglish';
  onDraftComplaintForSituation: (situationTitle: string) => void;
  selectedSituationId?: string | null;
  onOpenEmergencyShare?: (situationTitle?: string) => void;
}

export const SituationExplorer: React.FC<SituationExplorerProps> = ({
  language,
  onDraftComplaintForSituation,
  selectedSituationId,
  onOpenEmergencyShare
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedSituationId, setExpandedSituationId] = useState<string | null>(
    selectedSituationId || 'fir-refusal'
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  // Categories definition
  const categories = [
    { id: 'all', label: 'All Situations', icon: Scale },
    { id: 'traffic', label: 'Traffic & Vehicles', icon: Car },
    { id: 'arrest', label: 'Detention & Arrest', icon: ShieldAlert },
    { id: 'fir', label: 'FIR Refusal & Zero FIR', icon: FileText },
    { id: 'search', label: 'Search & Seizure', icon: Search },
    { id: 'assault', label: 'Assault & Threats', icon: AlertTriangle },
    { id: 'bribe', label: 'Bribes & Extortion', icon: Coins },
    { id: 'women_juvenile', label: 'Women & Minors', icon: HeartHandshake },
    { id: 'cyber', label: 'Cyber Crime & Bank Freeze', icon: Laptop },
    { id: 'rights_privacy', label: 'Privacy & Filming Police', icon: Camera },
    { id: 'police_station', label: 'Civil Disputes & Verification', icon: Building },
    { id: 'protest', label: 'Protests & Assembly', icon: Users },
  ];

  const filteredSituations = useMemo(() => {
    return POLICE_SITUATIONS.filter((sit) => {
      const matchesCategory = activeCategory === 'all' || sit.category === activeCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch = 
        !searchQuery ||
        sit.title.toLowerCase().includes(q) ||
        sit.hindiTitle.toLowerCase().includes(q) ||
        sit.thirtySecondSummary.toLowerCase().includes(q) ||
        sit.immediateActions.some(a => a.toLowerCase().includes(q)) ||
        sit.legalRights.some(r => 
          r.title.toLowerCase().includes(q) || 
          (r.bnssSection && r.bnssSection.toLowerCase().includes(q)) ||
          (r.crpcSection && r.crpcSection.toLowerCase().includes(q))
        );

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleCopyScript = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeak = (id: string, scriptText: string, langCode: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(scriptText);
      utterance.lang = langCode;
      utterance.rate = 0.95;
      utterance.onend = () => setSpeakingId(null);
      utterance.onerror = () => setSpeakingId(null);

      setSpeakingId(id);
      window.speechSynthesis.speak(utterance);
    } catch {
      setSpeakingId(null);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'traffic': return <Car className="w-5 h-5" />;
      case 'arrest': return <ShieldAlert className="w-5 h-5" />;
      case 'fir': return <FileText className="w-5 h-5" />;
      case 'search': return <Search className="w-5 h-5" />;
      case 'assault': return <AlertTriangle className="w-5 h-5" />;
      case 'bribe': return <Coins className="w-5 h-5" />;
      case 'women_juvenile': return <HeartHandshake className="w-5 h-5" />;
      case 'cyber': return <Laptop className="w-5 h-5" />;
      case 'rights_privacy': return <Camera className="w-5 h-5" />;
      case 'police_station': return <Building className="w-5 h-5" />;
      case 'protest': return <Users className="w-5 h-5" />;
      default: return <Scale className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Hero Banner with Clear Core Model & Visual Justice Shield */}
      <div className="bg-[#25282b] text-white rounded-[12px] p-6 sm:p-8 shadow-xl overflow-hidden relative border border-black">
        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#e60000]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
          
          {/* Left Column: Text & Guidance */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#e60000] animate-pulse" />
              <span>Core Model: Situation → Your Rights → What To Do → Where To Complain</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white leading-tight">
              SAKSHAM Portal — Police Rights in India
            </h1>

            <p className="text-white/85 text-xs sm:text-sm leading-relaxed font-light">
              Every citizen in India is protected by the Constitution of India, the new <strong className="text-white font-bold">Bharatiya Nagarik Suraksha Sanhita (BNSS 2023)</strong>, <strong className="text-white font-bold">Bharatiya Nyaya Sanhita (BNS 2023)</strong>, and landmark Supreme Court mandates. Select any situation below for instant 30-second legal guidance.
            </p>

            {/* Quick Flow Indicator */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs">
              <div className="p-2.5 rounded-[8px] bg-white/10 border border-white/10 text-center backdrop-blur-sm">
                <div className="text-[#e60000] font-extrabold text-xs sm:text-sm uppercase">1. Situation</div>
                <div className="text-white/70 text-[10px] font-normal">Identify incident</div>
              </div>
              <div className="p-2.5 rounded-[8px] bg-white/10 border border-white/10 text-center backdrop-blur-sm">
                <div className="text-white font-extrabold text-xs sm:text-sm uppercase">2. Rights</div>
                <div className="text-white/70 text-[10px] font-normal">BNSS & Art 21/22</div>
              </div>
              <div className="p-2.5 rounded-[8px] bg-white/10 border border-white/10 text-center backdrop-blur-sm">
                <div className="text-white font-extrabold text-xs sm:text-sm uppercase">3. What To Do</div>
                <div className="text-white/70 text-[10px] font-normal">Scripts & 30s actions</div>
              </div>
              <div className="p-2.5 rounded-[8px] bg-white/10 border border-white/10 text-center backdrop-blur-sm">
                <div className="text-white font-extrabold text-xs sm:text-sm uppercase">4. Complain</div>
                <div className="text-white/70 text-[10px] font-normal">SP, SPCA & Courts</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Artwork */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm rounded-[10px] overflow-hidden shadow-2xl border-2 border-white/20 group">
              <img
                src={heroJusticeShieldImg}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/images/hero_justice_shield_1786817120335.jpg';
                }}
                alt="Constitutional Legal Rights Shield India"
                className="w-full h-48 sm:h-56 object-cover transform group-hover:scale-105 transition duration-500"
                loading="eager"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-3.5 text-white">
                <div className="flex items-center gap-1.5 text-amber-400 font-extrabold text-xs uppercase tracking-wide">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Rule of Law & Constitution of India</span>
                </div>
                <p className="text-[11px] text-white/90 font-light mt-0.5">
                  Art 20, 21, 22 Protection against illegal custody & arbitrary arrest
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Visual Featured Pillars Grid */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#25282b] flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-[#e60000]" />
            <span>Key Citizen Protections (Click to View Specific Guidance)</span>
          </span>
          <span className="text-[11px] text-[#7e7e7e]">BNSS 2023 & Landmark Precedents</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Card 1: Traffic & Roadside Check */}
          <div 
            onClick={() => {
              setActiveCategory('traffic');
              setExpandedSituationId('traffic-stop');
              const el = document.getElementById('situation-traffic-stop');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group cursor-pointer bg-white rounded-[10px] border border-[#bebebe]/60 overflow-hidden shadow-sm hover:shadow-md hover:border-[#e60000] transition flex flex-col justify-between"
          >
            <div className="relative h-36 overflow-hidden">
              <img
                src={trafficRightsImg}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/images/traffic_rights_card_1786817142250.jpg';
                }}
                alt="Traffic Police Stop Rights India"
                className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#25282b]/80 backdrop-blur-sm text-white text-[10px] font-bold">
                Traffic & Vehicles
              </div>
            </div>

            <div className="p-3.5 space-y-1.5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-xs text-[#25282b] group-hover:text-[#e60000] transition flex items-center justify-between">
                  <span>Traffic Stops & DigiLocker Rights</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#7e7e7e] group-hover:text-[#e60000] transform group-hover:translate-x-1 transition" />
                </h3>
                <p className="text-[11px] text-[#7e7e7e] leading-snug mt-1">
                  DigiLocker is legally valid under IT Act Rule 9A. Police cannot snatch car keys or demand physical papers if verified digitally.
                </p>
              </div>
              <div className="pt-2 border-t border-[#f2f2f2] flex items-center justify-between text-[10px] text-[#7e7e7e] font-medium">
                <span>Sec 130/139 Motor Vehicles Act</span>
                <span className="text-[#e60000] font-bold">View Guide →</span>
              </div>
            </div>
          </div>

          {/* Card 2: Women, Minors & Sunset Arrests */}
          <div 
            onClick={() => {
              setActiveCategory('women_juvenile');
              setExpandedSituationId('women-arrest-sunset');
              const el = document.getElementById('situation-women-arrest-sunset');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group cursor-pointer bg-white rounded-[10px] border border-[#bebebe]/60 overflow-hidden shadow-sm hover:shadow-md hover:border-[#e60000] transition flex flex-col justify-between"
          >
            <div className="relative h-36 overflow-hidden">
              <img
                src={womenRightsImg}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/images/women_rights_card_1786817160019.jpg';
                }}
                alt="Women Rights and Police Guidelines"
                className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-rose-900/80 backdrop-blur-sm text-white text-[10px] font-bold">
                Women & Minors Protection
              </div>
            </div>

            <div className="p-3.5 space-y-1.5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-xs text-[#25282b] group-hover:text-[#e60000] transition flex items-center justify-between">
                  <span>Sunset to Sunrise Arrest Ban</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#7e7e7e] group-hover:text-[#e60000] transform group-hover:translate-x-1 transition" />
                </h3>
                <p className="text-[11px] text-[#7e7e7e] leading-snug mt-1">
                  Women cannot be arrested between sunset and sunrise except in extreme cases with prior written Judicial Magistrate order. Female officer mandatory.
                </p>
              </div>
              <div className="pt-2 border-t border-[#f2f2f2] flex items-center justify-between text-[10px] text-[#7e7e7e] font-medium">
                <span>Sec 43(5) BNSS & Sec 46(4) CrPC</span>
                <span className="text-[#e60000] font-bold">View Guide →</span>
              </div>
            </div>
          </div>

          {/* Card 3: FIR Refusal & Official Complaints */}
          <div 
            onClick={() => {
              setActiveCategory('fir');
              setExpandedSituationId('fir-refusal');
              const el = document.getElementById('situation-fir-refusal');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group cursor-pointer bg-white rounded-[10px] border border-[#bebebe]/60 overflow-hidden shadow-sm hover:shadow-md hover:border-[#e60000] transition flex flex-col justify-between"
          >
            <div className="relative h-36 overflow-hidden">
              <img
                src={firComplaintImg}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/images/fir_complaint_card_1786817175521.jpg';
                }}
                alt="Mandatory FIR Registration and Complaint Drafting"
                className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-blue-900/80 backdrop-blur-sm text-white text-[10px] font-bold">
                FIR & Legal Remedy
              </div>
            </div>

            <div className="p-3.5 space-y-1.5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-xs text-[#25282b] group-hover:text-[#e60000] transition flex items-center justify-between">
                  <span>FIR Refusal & Zero FIR Rights</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#7e7e7e] group-hover:text-[#e60000] transform group-hover:translate-x-1 transition" />
                </h3>
                <p className="text-[11px] text-[#7e7e7e] leading-snug mt-1">
                  Mandatory FIR for all cognizable offences. Free FIR copy (Sec 173(2) BNSS). Up to 2-year imprisonment for refusing officers under Sec 198 BNS.
                </p>
              </div>
              <div className="pt-2 border-t border-[#f2f2f2] flex items-center justify-between text-[10px] text-[#7e7e7e] font-medium">
                <span>Lalita Kumari SC Mandate</span>
                <span className="text-[#e60000] font-bold">View Guide →</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          
          {/* Search Input */}
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-[#7e7e7e] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="situation-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search (e.g. FIR refusal, Digilocker, arrest, bribe)..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#25282b] rounded-[6px] text-sm text-[#25282b] placeholder-[#7e7e7e] focus:outline-none focus:ring-2 focus:ring-[#e60000] focus:border-transparent transition"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#7e7e7e] hover:text-[#25282b] font-bold"
              >
                Clear
              </button>
            )}
          </div>

          <div className="text-xs text-[#7e7e7e] font-medium self-end sm:self-center">
            Showing <strong className="text-[#e60000] font-bold">{filteredSituations.length}</strong> verified legal scenarios
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isCatActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`cat-filter-${cat.id}`}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition border ${
                  isCatActive
                    ? 'bg-[#e60000] text-white border-[#e60000] shadow-sm'
                    : 'bg-[#f2f2f2] text-[#25282b] hover:bg-[#e6e6e6] border-[#bebebe]/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Situations List */}
      <div className="space-y-4">
        {filteredSituations.length === 0 ? (
          <div className="p-8 text-center bg-[#f2f2f2] border border-[#bebebe]/60 rounded-[6px] space-y-2">
            <p className="text-[#25282b] font-bold">No situations found matching "{searchQuery}".</p>
            <p className="text-xs text-[#7e7e7e]">Try searching for terms like "FIR", "Arrest", "Traffic", "Phone", or "Bribe".</p>
          </div>
        ) : (
          filteredSituations.map((situation) => {
            const isExpanded = expandedSituationId === situation.id;
            const scriptText = 
              language === 'hindi' 
                ? situation.spokenScript.hindi 
                : language === 'hinglish' 
                  ? situation.spokenScript.hinglish 
                  : situation.spokenScript.english;

            const isCopied = copiedId === situation.id;
            const isSpeaking = speakingId === situation.id;

            return (
              <div
                key={situation.id}
                id={`situation-card-${situation.id}`}
                className={`border rounded-[6px] transition-all overflow-hidden ${
                  isExpanded
                    ? 'bg-white border-[#25282b] shadow-lg'
                    : 'bg-white border-[#bebebe]/60 hover:border-[#25282b]'
                }`}
              >
                {/* Header Row */}
                <div
                  onClick={() => setExpandedSituationId(isExpanded ? null : situation.id)}
                  className="p-4 sm:p-5 flex items-start sm:items-center justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="flex items-start sm:items-center gap-3.5">
                    <div className={`p-2.5 rounded-[6px] shrink-0 ${
                      situation.urgency === 'CRITICAL' 
                        ? 'bg-[#e60000] text-white' 
                        : 'bg-[#f2f2f2] text-[#25282b] border border-[#bebebe]/60'
                    }`}>
                      {getCategoryIcon(situation.category)}
                    </div>
                    
                    <div className="space-y-0.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-base sm:text-lg font-extrabold uppercase text-[#25282b]">
                          {language === 'hindi' ? situation.hindiTitle : situation.title}
                        </h2>
                        {situation.urgency === 'CRITICAL' && (
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#e60000] text-white uppercase tracking-wider">
                            High Urgency
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#7e7e7e] font-normal line-clamp-1 sm:line-clamp-none">
                        {situation.thirtySecondSummary}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-bold text-[#e60000] uppercase tracking-wide hidden md:inline">
                      {isExpanded ? 'Collapse' : 'View Rights & Steps'}
                    </span>
                    <div className="p-1.5 rounded-full bg-[#f2f2f2] text-[#25282b] border border-[#bebebe]/60">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Detail Dossier */}
                {isExpanded && (
                  <div className="border-t border-[#bebebe]/50 p-4 sm:p-6 space-y-6 bg-[#f2f2f2]">
                    
                    {/* 30-Second Fast Summary Banner */}
                    <div className="bg-white border-l-4 border-l-[#e60000] border border-[#bebebe]/50 rounded-[6px] p-4 space-y-1">
                      <div className="flex items-center gap-2 text-[#e60000] font-extrabold text-xs uppercase tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-[#e60000]" />
                        <span>30-Second Fast Summary</span>
                      </div>
                      <p className="text-sm text-[#25282b] font-medium leading-relaxed">
                        {situation.thirtySecondSummary}
                      </p>
                    </div>

                    {/* Step 1: Immediate Actions */}
                    <div className="space-y-3">
                      <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#25282b] flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#e60000] text-white text-[11px] flex items-center justify-center font-bold">1</span>
                        <span>What To Do (Step-by-Step Action Plan)</span>
                      </h3>

                      <div className="grid sm:grid-cols-2 gap-3">
                        {situation.immediateActions.map((action, idx) => (
                          <div key={idx} className="flex items-start gap-3 p-3.5 rounded-[6px] bg-white border border-[#bebebe]/60 shadow-xs">
                            <div className="w-5 h-5 rounded-full bg-[#e60000] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                              {idx + 1}
                            </div>
                            <p className="text-xs sm:text-sm text-[#25282b] font-medium leading-relaxed">
                              {action}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Step 2: What to Say Script */}
                    <div className="space-y-3 bg-[#25282b] text-white border border-[#25282b] rounded-[6px] p-4 sm:p-5">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-xs font-extrabold uppercase tracking-wider text-white flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-[#e60000] text-white text-[11px] flex items-center justify-center font-bold">2</span>
                          <span>What To Say to the Police (Verbatim Script)</span>
                        </h3>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleSpeak(
                              situation.id, 
                              language === 'hindi' ? situation.spokenScript.hindi : situation.spokenScript.english,
                              language === 'hindi' ? 'hi-IN' : 'en-IN'
                            )}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition ${
                              isSpeaking 
                                ? 'bg-[#e60000] text-white animate-pulse' 
                                : 'bg-white/15 hover:bg-white/25 text-white'
                            }`}
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>{isSpeaking ? 'Playing...' : 'Play Audio'}</span>
                          </button>

                          <button
                            onClick={() => handleCopyScript(situation.id, scriptText)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition"
                          >
                            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{isCopied ? 'Copied!' : 'Copy Script'}</span>
                          </button>
                        </div>
                      </div>

                      <div className="p-4 bg-black/40 rounded-[6px] border border-white/10 text-white text-sm sm:text-base font-medium leading-relaxed italic">
                        "{scriptText}"
                      </div>

                      {situation.spokenScript.contextNote && (
                        <p className="text-xs text-[#bebebe]">
                          💡 <span className="font-semibold text-white">Tactical Guidance:</span> {situation.spokenScript.contextNote}
                        </p>
                      )}
                    </div>

                    {/* Step 3: Legal Rights Shield */}
                    <div className="space-y-3">
                      <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#25282b] flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#e60000] text-white text-[11px] flex items-center justify-center font-bold">3</span>
                        <span>Your Statutory & Constitutional Rights (BNSS / BNS / CrPC / IPC)</span>
                      </h3>

                      <div className="grid sm:grid-cols-2 gap-3">
                        {situation.legalRights.map((right, idx) => (
                          <div key={idx} className="p-4 rounded-[6px] bg-white border border-[#bebebe]/60 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-extrabold text-sm uppercase text-[#25282b]">{right.title}</span>
                            </div>

                            <div className="flex flex-wrap gap-1.5 text-[10px]">
                              {right.bnssSection && (
                                <span className="px-2 py-0.5 rounded-full bg-[#e60000] text-white font-bold">
                                  {right.bnssSection}
                                </span>
                              )}
                              {right.crpcSection && (
                                <span className="px-2 py-0.5 rounded-full bg-[#f2f2f2] text-[#25282b] font-semibold border border-[#bebebe]/60">
                                  CrPC: {right.crpcSection}
                                </span>
                              )}
                              {right.bnsSection && (
                                <span className="px-2 py-0.5 rounded-full bg-[#25282b] text-white font-bold">
                                  {right.bnsSection}
                                </span>
                              )}
                              {right.ipcSection && (
                                <span className="px-2 py-0.5 rounded-full bg-[#f2f2f2] text-[#25282b] font-semibold border border-[#bebebe]/60">
                                  IPC: {right.ipcSection}
                                </span>
                              )}
                              {right.constitutionalArticle && (
                                <span className="px-2 py-0.5 rounded-full bg-[#25282b] text-white font-bold">
                                  {right.constitutionalArticle}
                                </span>
                              )}
                              {right.landmarkJudgment && (
                                <span className="px-2 py-0.5 rounded-full bg-white text-[#25282b] border border-[#25282b] font-bold">
                                  ⚖️ {right.landmarkJudgment}
                                </span>
                              )}
                            </div>

                            <p className="text-xs text-[#25282b]/80 font-normal leading-relaxed">
                              {right.summary}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Step 4: Where & How to Complain */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#25282b] flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-[#e60000] text-white text-[11px] flex items-center justify-center font-bold">4</span>
                          <span>Where & How To Complain</span>
                        </h3>

                        <div className="flex items-center gap-2">
                          {onOpenEmergencyShare && (
                            <button
                              onClick={() => onOpenEmergencyShare(situation.title)}
                              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition shadow-sm"
                            >
                              <Share2 className="w-3.5 h-3.5" />
                              <span>1-Tap SOS Share</span>
                            </button>
                          )}
                          <button
                            onClick={() => onDraftComplaintForSituation(situation.title)}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#e60000] hover:bg-[#cc0000] text-white text-xs font-bold transition shadow-sm"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>Draft Complaint Letter</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-3">
                        {situation.complaintRoutes.map((route, idx) => (
                          <div key={idx} className="p-4 rounded-[6px] bg-white border border-[#bebebe]/60 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-extrabold text-sm uppercase text-[#25282b]">{route.authority}</span>
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#f2f2f2] text-[#25282b] font-bold border border-[#bebebe]/60">
                                {route.level}
                              </span>
                            </div>

                            <p className="text-xs text-[#25282b] font-medium leading-relaxed">
                              {route.howToReach}
                            </p>

                            <div className="text-[11px] text-[#7e7e7e] font-mono font-medium">
                              Statutory Basis: {route.legalProvision}
                            </div>

                            {route.documentRequired && route.documentRequired.length > 0 && (
                              <div className="text-[11px] text-[#7e7e7e]">
                                <span className="font-bold text-[#25282b]">Documents needed: </span>
                                {route.documentRequired.join(', ')}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Step 5: Official Legal Citations & Sources */}
                    <div className="border-t border-[#bebebe]/50 pt-4 space-y-2">
                      <div className="flex items-center gap-2 text-[#7e7e7e] text-xs font-extrabold uppercase tracking-wider">
                        <BookOpen className="w-3.5 h-3.5 text-[#e60000]" />
                        <span>Verified Government & Legal Sources:</span>
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs">
                        {situation.officialSources.map((source, idx) => (
                          <div key={idx} className="px-3 py-1.5 rounded-[6px] bg-white border border-[#bebebe]/60 text-[#25282b] flex items-center gap-1.5">
                            <span className="font-extrabold text-[#e60000]">{source.sourceName}:</span>
                            <span className="font-mono text-[11px] text-[#7e7e7e]">{source.citation}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};

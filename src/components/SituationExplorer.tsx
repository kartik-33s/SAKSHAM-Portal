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
import { Hero } from './ui/animated-hero';

interface SituationExplorerProps {
  language: 'english' | 'hindi' | 'hinglish';
  onDraftComplaintForSituation: (situationTitle: string) => void;
  selectedSituationId?: string | null;
  onOpenEmergencyShare?: (situationTitle?: string) => void;
  onOpenSOS?: () => void;
}

export const SituationExplorer: React.FC<SituationExplorerProps> = ({
  language,
  onDraftComplaintForSituation,
  selectedSituationId,
  onOpenEmergencyShare,
  onOpenSOS
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
      
      {/* Animated Interactive Hero Component */}
      <Hero 
        onOpenSOS={onOpenSOS}
        onExploreRights={() => {
          const el = document.getElementById('search-and-filter-bar');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Hero Section: Modern Block Grid Architecture */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        
        {/* Block 1: Main Announcement & Core Law Model (8 cols on desktop) */}
        <div className="md:col-span-12 lg:col-span-8 bg-[#25282b] bg-grid-lines-dark text-white rounded-[12px] p-6 sm:p-7 shadow-lg relative overflow-hidden border border-black flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#e60000]/15 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#25282b] via-transparent to-[#25282b]/80 pointer-events-none" />
          
          <div className="relative z-10 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-[11px] font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#e60000] animate-pulse" />
                BNSS 2023 & BNS 2023 Grounded
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#e60000]/30 text-rose-200 text-[10px] font-bold uppercase border border-[#e60000]/40">
                Citizen Legal Shield
              </span>
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-white leading-tight">
                Know Your Police Rights in India
              </h1>
              <p className="text-white/80 text-xs sm:text-sm leading-relaxed mt-2 font-light max-w-2xl">
                Immediate, verified statutory rights and 30-second spoken scripts under the Constitution of India, Bharatiya Nagarik Suraksha Sanhita (BNSS), and landmark Supreme Court mandates.
              </p>
            </div>
          </div>

          {/* 4-Step Core Flow Block Row */}
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2 pt-5 mt-4 border-t border-white/10">
            <div className="p-2.5 rounded-[8px] bg-white/10 border border-white/10 text-center">
              <div className="text-[#e60000] font-black text-xs uppercase tracking-wide">1. Situation</div>
              <div className="text-white/70 text-[10px] font-medium mt-0.5">Identify Incident</div>
            </div>
            <div className="p-2.5 rounded-[8px] bg-white/10 border border-white/10 text-center">
              <div className="text-white font-black text-xs uppercase tracking-wide">2. Your Rights</div>
              <div className="text-white/70 text-[10px] font-medium mt-0.5">Statutory Rules</div>
            </div>
            <div className="p-2.5 rounded-[8px] bg-white/10 border border-white/10 text-center">
              <div className="text-white font-black text-xs uppercase tracking-wide">3. What To Do</div>
              <div className="text-white/70 text-[10px] font-medium mt-0.5">Exact Dialogue</div>
            </div>
            <div className="p-2.5 rounded-[8px] bg-white/10 border border-white/10 text-center">
              <div className="text-white font-black text-xs uppercase tracking-wide">4. Complain</div>
              <div className="text-white/70 text-[10px] font-medium mt-0.5">SP, SPCA, NHRC</div>
            </div>
          </div>
        </div>

        {/* Block 2: Visual Constitutional Shield & Key Articles (4 cols on desktop) */}
        <div className="md:col-span-12 lg:col-span-4 bg-[#25282b] text-white rounded-[12px] overflow-hidden border border-black shadow-lg flex flex-col justify-between relative group">
          <div className="relative h-44 sm:h-48 lg:h-52 w-full overflow-hidden">
            <img
              src={heroJusticeShieldImg}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/images/hero_justice_shield_1786817120335.jpg';
              }}
              alt="Constitutional Legal Rights Shield India"
              className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
              loading="eager"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#25282b] via-[#25282b]/30 to-transparent" />
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-400 text-[10px] font-extrabold flex items-center gap-1.5 border border-amber-400/30">
              <Shield className="w-3.5 h-3.5" />
              <span>Supreme Court Mandates</span>
            </div>
          </div>

          <div className="p-4 space-y-2 relative z-10 -mt-3 bg-[#25282b]">
            <div className="text-xs font-bold text-white flex items-center justify-between">
              <span>Articles 20, 21 & 22</span>
              <span className="text-[10px] font-semibold text-white/60">Constitution of India</span>
            </div>
            <p className="text-[11px] text-white/75 leading-relaxed font-light">
              Fundamental guarantee against illegal detention, custodial torture, and arbitrary arrest without magistrate sanction.
            </p>
          </div>
        </div>

        {/* Block 3: Quick Metric Grid / Key Action Cards (3 Block Cards) */}
        <div className="md:col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
          
          {/* Sub-block A: 30s SOS Quick Trigger */}
          <div 
            onClick={() => onOpenSOS()}
            className="group cursor-pointer bg-gradient-to-br from-[#e60000] to-[#b30000] text-white rounded-[10px] p-4 shadow-sm hover:shadow-md transition active:scale-98 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-[8px] bg-white/20">
                <ShieldAlert className="w-5 h-5 text-white" />
              </div>
              <span className="text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded-full bg-white/20 text-white">
                Emergency
              </span>
            </div>
            <div className="mt-3">
              <h3 className="text-sm font-extrabold uppercase tracking-tight flex items-center justify-between">
                <span>30s Police SOS</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition" />
              </h3>
              <p className="text-[11px] text-white/90 mt-1 font-light leading-snug">
                Immediate protocol when stopped, questioned, or detained by police.
              </p>
            </div>
          </div>

          {/* Sub-block B: Traffic & DigiLocker Rights */}
          <div 
            onClick={() => {
              setActiveCategory('traffic');
              setExpandedSituationId('traffic-stop');
              const el = document.getElementById('situation-traffic-stop');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group cursor-pointer bg-white rounded-[10px] p-4 border border-[#bebebe]/70 shadow-sm hover:border-[#e60000] hover:shadow-md transition active:scale-98 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-[8px] bg-amber-50 text-amber-700">
                <Car className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-[#7e7e7e] uppercase">
                Sec 130/139 MVA
              </span>
            </div>
            <div className="mt-3">
              <h3 className="text-xs font-bold text-[#25282b] group-hover:text-[#e60000] flex items-center justify-between transition">
                <span>DigiLocker & Traffic</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#7e7e7e] group-hover:text-[#e60000] transform group-hover:translate-x-1 transition" />
              </h3>
              <p className="text-[11px] text-[#7e7e7e] mt-1 leading-snug">
                Digital docs are legally valid. Officers cannot confiscate vehicle keys.
              </p>
            </div>
          </div>

          {/* Sub-block C: Women & Minors Protection */}
          <div 
            onClick={() => {
              setActiveCategory('women_juvenile');
              setExpandedSituationId('women-arrest-sunset');
              const el = document.getElementById('situation-women-arrest-sunset');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group cursor-pointer bg-white rounded-[10px] p-4 border border-[#bebebe]/70 shadow-sm hover:border-[#e60000] hover:shadow-md transition active:scale-98 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-[8px] bg-rose-50 text-rose-700">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-[#7e7e7e] uppercase">
                Sec 43(5) BNSS
              </span>
            </div>
            <div className="mt-3">
              <h3 className="text-xs font-bold text-[#25282b] group-hover:text-[#e60000] flex items-center justify-between transition">
                <span>Sunset Arrest Ban</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#7e7e7e] group-hover:text-[#e60000] transform group-hover:translate-x-1 transition" />
              </h3>
              <p className="text-[11px] text-[#7e7e7e] mt-1 leading-snug">
                No female arrest between sunset & sunrise without prior judicial order.
              </p>
            </div>
          </div>

          {/* Sub-block D: Mandatory FIR & Lalita Kumari */}
          <div 
            onClick={() => {
              setActiveCategory('fir');
              setExpandedSituationId('fir-refusal');
              const el = document.getElementById('situation-fir-refusal');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group cursor-pointer bg-white rounded-[10px] p-4 border border-[#bebebe]/70 shadow-sm hover:border-[#e60000] hover:shadow-md transition active:scale-98 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-[8px] bg-blue-50 text-blue-700">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-[#7e7e7e] uppercase">
                Sec 173 BNSS
              </span>
            </div>
            <div className="mt-3">
              <h3 className="text-xs font-bold text-[#25282b] group-hover:text-[#e60000] flex items-center justify-between transition">
                <span>FIR Refusal Remedies</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#7e7e7e] group-hover:text-[#e60000] transform group-hover:translate-x-1 transition" />
              </h3>
              <p className="text-[11px] text-[#7e7e7e] mt-1 leading-snug">
                Mandatory Zero FIR. Jail term for refusing officers under Sec 198 BNS.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Search & Category Filter Controls */}
      <div id="search-and-filter-bar" className="space-y-3 pt-2">
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

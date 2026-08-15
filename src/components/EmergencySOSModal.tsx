import React, { useState } from 'react';
import { 
  X, 
  ShieldAlert, 
  Car, 
  FileText, 
  Search, 
  AlertTriangle, 
  Coins, 
  HeartHandshake, 
  Volume2, 
  Copy, 
  Check, 
  Phone, 
  Scale, 
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Share2
} from 'lucide-react';
import { POLICE_SITUATIONS } from '../data/legalSituations';
import { PoliceSituation } from '../types';

interface EmergencySOSModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'english' | 'hindi' | 'hinglish';
  onNavigateToSituation?: (situationId: string) => void;
  onOpenEmergencyShare?: (situationTitle?: string) => void;
}

export const EmergencySOSModal: React.FC<EmergencySOSModalProps> = ({
  isOpen,
  onClose,
  language,
  onNavigateToSituation,
  onOpenEmergencyShare
}) => {
  const [selectedSituationId, setSelectedSituationId] = useState<string>('traffic-stop');
  const [copied, setCopied] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentSituation: PoliceSituation = 
    POLICE_SITUATIONS.find(s => s.id === selectedSituationId) || POLICE_SITUATIONS[0];

  const scriptText = 
    language === 'hindi' 
      ? currentSituation.spokenScript.hindi 
      : language === 'hinglish' 
        ? currentSituation.spokenScript.hinglish 
        : currentSituation.spokenScript.english;

  const handleCopyScript = () => {
    navigator.clipboard.writeText(scriptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeakScript = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in your browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(
      language === 'hindi' ? currentSituation.spokenScript.hindi : currentSituation.spokenScript.english
    );
    utterance.lang = language === 'hindi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const getIcon = (id: string) => {
    switch (id) {
      case 'traffic-stop': return <Car className="w-5 h-5" />;
      case 'detention-arrest': return <ShieldAlert className="w-5 h-5" />;
      case 'fir-refusal': return <FileText className="w-5 h-5" />;
      case 'search-seizure': return <Search className="w-5 h-5" />;
      case 'police-assault-threat': return <AlertTriangle className="w-5 h-5" />;
      case 'bribe-extortion': return <Coins className="w-5 h-5" />;
      case 'women-juveniles': return <HeartHandshake className="w-5 h-5" />;
      default: return <Scale className="w-5 h-5" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-[#25282b]/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white border-2 border-[#e60000] rounded-[6px] w-full max-w-4xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-[#25282b]">
        
        {/* Urgent Header */}
        <div className="bg-[#e60000] p-4 text-white flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[6px] bg-white/20 flex items-center justify-center text-white">
              <ShieldAlert className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-extrabold uppercase tracking-tight text-white">
                  30-Second Emergency SOS Guide
                </h2>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-white text-[#e60000] uppercase">
                  Active Encounter
                </span>
              </div>
              <p className="text-xs text-white/90 font-normal">
                Tap your current situation below for instant action steps, what to say, and exact laws.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {onOpenEmergencyShare && (
              <button
                id="sos-modal-share-btn"
                onClick={() => {
                  onClose();
                  onOpenEmergencyShare(currentSituation.title);
                }}
                className="px-3 py-1.5 rounded-full bg-white text-[#e60000] hover:bg-white/90 text-xs font-bold transition flex items-center gap-1 shadow-sm"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Share Location & SOS</span>
                <span className="sm:hidden">Share</span>
              </button>
            )}
            <button
              id="sos-modal-close"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Situation Selector Grid */}
        <div className="bg-[#f2f2f2] p-3 border-b border-[#bebebe]/50 overflow-x-auto">
          <div className="flex sm:grid sm:grid-cols-4 lg:grid-cols-7 gap-2 min-w-max sm:min-w-0">
            {POLICE_SITUATIONS.map((sit) => {
              const isSelected = sit.id === selectedSituationId;
              return (
                <button
                  key={sit.id}
                  id={`sos-select-${sit.id}`}
                  onClick={() => {
                    setSelectedSituationId(sit.id);
                    if (isSpeaking) {
                      window.speechSynthesis.cancel();
                      setIsSpeaking(false);
                    }
                  }}
                  className={`flex items-center sm:flex-col sm:justify-center p-2.5 rounded-[6px] text-left sm:text-center gap-2 sm:gap-1 transition border ${
                    isSelected
                      ? 'bg-[#e60000] text-white border-[#e60000] font-bold shadow-md'
                      : 'bg-white text-[#25282b] hover:bg-white/80 border-[#bebebe]/60 text-xs'
                  }`}
                >
                  <div className={`p-1.5 rounded-[4px] ${isSelected ? 'bg-black/20 text-white' : 'bg-[#f2f2f2] text-[#e60000]'}`}>
                    {getIcon(sit.id)}
                  </div>
                  <span className="text-xs sm:text-[11px] font-bold leading-tight line-clamp-2">
                    {sit.title.split('&')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-[#25282b] bg-white">
          
          {/* 30-Second Fast Triage Box */}
          <div className="bg-[#f2f2f2] border-l-4 border-l-[#e60000] border border-[#bebebe]/50 rounded-[6px] p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-[6px] bg-[#e60000]/10 text-[#e60000] mt-0.5">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-extrabold uppercase text-[#25282b]">
                    {language === 'hindi' ? currentSituation.hindiTitle : currentSituation.title}
                  </h3>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#e60000] text-white">
                    30s Action Plan
                  </span>
                </div>
                <p className="text-sm text-[#25282b] font-medium leading-relaxed">
                  {currentSituation.thirtySecondSummary}
                </p>
              </div>
            </div>
          </div>

          {/* Section 1: Immediate Steps (What To Do) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#25282b] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#e60000] text-white text-[11px] flex items-center justify-center font-bold">1</span>
                <span>Immediate 30-Second Action Checklist (What to Do Right Now)</span>
              </h4>
            </div>

            <div className="grid sm:grid-cols-2 gap-2.5">
              {currentSituation.immediateActions.slice(0, 4).map((action, idx) => (
                <div 
                  key={idx} 
                  className="flex items-start gap-2.5 p-3 rounded-[6px] bg-[#f2f2f2] border border-[#bebebe]/50 hover:border-[#25282b] transition"
                >
                  <div className="w-5 h-5 rounded-full bg-[#e60000] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    ✓
                  </div>
                  <p className="text-xs sm:text-sm text-[#25282b] font-medium leading-snug">
                    {action}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: What to Say (Verbatim Spoken Script) */}
          <div className="space-y-2.5 bg-[#25282b] text-white rounded-[6px] p-4 border border-[#25282b]">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-white flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#e60000] text-white text-[11px] flex items-center justify-center font-bold">2</span>
                <span>What to Say to the Officer (Polite & Assertive Legal Script)</span>
              </h4>

              <div className="flex items-center gap-2">
                <button
                  id="sos-speak-btn"
                  onClick={handleSpeakScript}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition ${
                    isSpeaking 
                      ? 'bg-[#e60000] text-white animate-pulse' 
                      : 'bg-white/15 hover:bg-white/25 text-white'
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{isSpeaking ? 'Speaking...' : 'Play Audio'}</span>
                </button>
                
                <button
                  id="sos-copy-btn"
                  onClick={handleCopyScript}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Script'}</span>
                </button>
              </div>
            </div>

            <div className="p-3.5 bg-black/40 border border-white/10 rounded-[6px] text-white text-sm font-medium leading-relaxed italic">
              "{scriptText}"
            </div>
            {currentSituation.spokenScript.contextNote && (
              <p className="text-[11px] text-[#bebebe]">
                💡 <span className="font-semibold text-white">Tip:</span> {currentSituation.spokenScript.contextNote}
              </p>
            )}
          </div>

          {/* Section 3: Legal Shield (BNSS / CrPC / Constitution) */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#25282b] flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#e60000] text-white text-[11px] flex items-center justify-center font-bold">3</span>
              <span>Your Statutory Rights & Exact Legal Sections</span>
            </h4>

            <div className="grid sm:grid-cols-2 gap-2.5">
              {currentSituation.legalRights.map((right, idx) => (
                <div key={idx} className="p-3.5 rounded-[6px] bg-[#f2f2f2] border border-[#bebebe]/60 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs text-[#25282b] uppercase">{right.title}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 text-[10px]">
                    {right.bnssSection && (
                      <span className="px-2 py-0.5 rounded-full bg-[#e60000] text-white font-bold">
                        {right.bnssSection}
                      </span>
                    )}
                    {right.crpcSection && (
                      <span className="px-2 py-0.5 rounded-full bg-white text-[#25282b] border border-[#bebebe]/60 font-semibold">
                        CrPC: {right.crpcSection}
                      </span>
                    )}
                    {right.constitutionalArticle && (
                      <span className="px-2 py-0.5 rounded-full bg-[#25282b] text-white font-bold">
                        {right.constitutionalArticle}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#25282b]/80 font-normal leading-relaxed">{right.summary}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Things NOT to do */}
          <div className="bg-[#f2f2f2] border-l-4 border-l-[#25282b] border border-[#bebebe]/50 rounded-[6px] p-3.5 space-y-2">
            <div className="flex items-center gap-2 text-[#e60000] font-extrabold text-xs uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              <span>Critical: What You Must NOT Do</span>
            </div>
            <ul className="grid sm:grid-cols-2 gap-2 text-xs text-[#25282b] font-medium">
              {currentSituation.thingsNotToDo.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-[#e60000] font-extrabold">✕</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 5: Where to Complain & Escalate */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#25282b] flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#e60000] text-white text-[11px] flex items-center justify-center font-bold">4</span>
              <span>Where & How to Complain If Rights Are Violated</span>
            </h4>

            <div className="grid sm:grid-cols-2 gap-3">
              {currentSituation.complaintRoutes.map((route, idx) => (
                <div key={idx} className="p-3.5 rounded-[6px] bg-[#f2f2f2] border border-[#bebebe]/60 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-[#25282b] uppercase">{route.authority}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-[#25282b] font-bold border border-[#bebebe]/60">
                      {route.level}
                    </span>
                  </div>
                  <p className="text-xs text-[#25282b] font-medium">{route.howToReach}</p>
                  <div className="text-[11px] text-[#7e7e7e] font-mono font-medium">
                    Basis: {route.legalProvision}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Emergency Action Strip */}
        <div className="bg-[#f2f2f2] border-t border-[#bebebe]/50 p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#7e7e7e]">Direct Hotline:</span>
            <a
              href="tel:112"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#e60000] hover:bg-[#cc0000] text-white text-xs font-bold transition shadow-sm"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call 112 (Police)</span>
            </a>
            <a
              href="tel:1064"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#25282b] hover:bg-black text-white text-xs font-bold transition shadow-sm"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>1064 (Anti-Corruption)</span>
            </a>
            <a
              href="tel:15100"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-[#25282b] border border-[#25282b] hover:bg-[#25282b] hover:text-white text-xs font-bold transition"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>15100 (Free Legal Aid)</span>
            </a>
          </div>

          <div className="flex items-center gap-2">
            {onOpenEmergencyShare && (
              <button
                onClick={() => {
                  onClose();
                  onOpenEmergencyShare(currentSituation.title);
                }}
                className="px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>1-Tap SOS Share</span>
              </button>
            )}
            {onNavigateToSituation && (
              <button
                onClick={() => {
                  onClose();
                  onNavigateToSituation(currentSituation.id);
                }}
                className="flex items-center gap-1 text-xs font-extrabold text-[#e60000] hover:underline transition uppercase tracking-wide"
              >
                <span>Full Legal Dossier</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-full bg-[#25282b] hover:bg-black text-white text-xs font-bold transition"
            >
              Dismiss
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

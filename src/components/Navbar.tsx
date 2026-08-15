import React, { useState } from 'react';
import { 
  ShieldAlert, 
  PhoneCall, 
  FileText, 
  HelpCircle, 
  Scale, 
  Sparkles, 
  CheckSquare, 
  Globe,
  Menu,
  X,
  Clock,
  MapPin,
  Share2,
  Phone,
  ChevronRight
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: 'english' | 'hindi' | 'hinglish';
  setLanguage: (lang: 'english' | 'hindi' | 'hinglish') => void;
  onOpenSOS: () => void;
  onOpenEmergencyShare?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  language,
  setLanguage,
  onOpenSOS,
  onOpenEmergencyShare,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'situations', label: 'Situations & Rights', icon: Scale },
    { id: 'ai-advisor', label: 'AI 30s Advisor', icon: Sparkles, badge: 'Gemini' },
    { id: 'geo-legal', label: 'Geo Legal Help', icon: MapPin, badge: 'Nearby' },
    { id: 'complaint-tracker', label: 'Complaint Tracker', icon: Clock, badge: 'Track' },
    { id: 'complaint-builder', label: 'Complaint Drafter', icon: FileText },
    { id: 'dk-basu', label: 'Arrest Checklist', icon: CheckSquare },
    { id: 'laws', label: 'BNSS / BNS Laws', icon: HelpCircle },
    { id: 'helplines', label: 'Helplines', icon: PhoneCall },
  ];

  const emergencyNumbers = [
    { label: '112', name: 'National SOS', tel: '112' },
    { label: '1064', name: 'Anti-Corruption', tel: '1064' },
    { label: '15100', name: 'Free Legal Aid', tel: '15100' },
    { label: '1091', name: 'Women Helpline', tel: '1091' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#25282b] text-white shadow-md border-b border-black/40">
      {/* Top Urgent Helpline Bar */}
      <div className="bg-[#e60000] text-white text-xs py-1 px-3 sm:px-4 font-medium tracking-tight">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 shrink-0">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-black/25 text-white font-bold uppercase tracking-wider text-[9px] sm:text-[10px]">
              24x7 SOS
            </span>
            <div className="flex items-center gap-2 text-[11px] sm:text-xs">
              {emergencyNumbers.map((item, idx) => (
                <React.Fragment key={item.label}>
                  {idx > 0 && <span className="text-white/40">|</span>}
                  <a 
                    href={`tel:${item.tel}`} 
                    className="font-bold underline hover:text-white/80 whitespace-nowrap active:opacity-75"
                  >
                    <span className="sm:hidden">{item.label}</span>
                    <span className="hidden sm:inline">{item.label} ({item.name})</span>
                  </a>
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-[11px] font-medium text-white/90 shrink-0">
            <span>BNSS 2023 & Supreme Court Mandates</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Logo & Title */}
          <div 
            className="flex items-center gap-2 sm:gap-3 cursor-pointer select-none shrink-0" 
            onClick={() => {
              setActiveTab('situations');
              setMobileMenuOpen(false);
            }}
          >
            {/* Red Emblem */}
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-[6px] bg-[#e60000] text-white flex items-center justify-center font-black text-lg sm:text-xl shadow-sm">
              <Scale className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-extrabold text-sm sm:text-lg tracking-tight uppercase text-white">
                  SAKSHAM
                </span>
                <span className="text-[9px] sm:text-[10px] font-extrabold uppercase px-1.5 py-0.2 sm:px-2 sm:py-0.5 rounded-full bg-white/15 text-white">
                  INDIA 🇮🇳
                </span>
              </div>
              <p className="text-[10px] sm:text-[12px] text-[#bebebe] font-light hidden xs:block sm:block">
                Citizen Police Rights
              </p>
            </div>
          </div>

          {/* Desktop Nav Controls */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-btn-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-white text-[#25282b] font-bold shadow-sm'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase ${
                      isActive ? 'bg-[#e60000] text-white' : 'bg-white/20 text-white'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Action & Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            
            {/* Language Switcher - Compact on mobile */}
            <div className="flex items-center rounded-full bg-white/10 p-0.5 sm:p-1 border border-white/15">
              <button
                id="lang-btn-en"
                onClick={() => setLanguage('english')}
                className={`px-1.5 sm:px-2.5 py-1 text-[10px] sm:text-xs font-bold rounded-full transition ${
                  language === 'english' ? 'bg-[#e60000] text-white shadow-sm' : 'text-white/80 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                id="lang-btn-hi"
                onClick={() => setLanguage('hindi')}
                className={`px-1.5 sm:px-2.5 py-1 text-[10px] sm:text-xs font-bold rounded-full transition ${
                  language === 'hindi' ? 'bg-[#e60000] text-white shadow-sm' : 'text-white/80 hover:text-white'
                }`}
              >
                हि
              </button>
              <button
                id="lang-btn-hinglish"
                onClick={() => setLanguage('hinglish')}
                className={`hidden sm:inline px-2.5 py-1 text-xs font-bold rounded-full transition ${
                  language === 'hinglish' ? 'bg-[#e60000] text-white shadow-sm' : 'text-white/80 hover:text-white'
                }`}
              >
                Hinglish
              </button>
            </div>

            {/* One-Tap Emergency Sharing Button */}
            {onOpenEmergencyShare && (
              <button
                id="emergency-share-trigger"
                onClick={onOpenEmergencyShare}
                className="flex items-center justify-center p-2 sm:px-3 sm:py-2 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs sm:text-sm font-bold border border-white/20 transition active:scale-95 min-w-[36px] min-h-[36px] sm:min-w-0"
                title="Broadcast GPS & Incident Details to Family, Lawyer & Contacts"
                aria-label="1-Tap Emergency Share"
              >
                <Share2 className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-rose-300" />
                <span className="hidden md:inline ml-1.5">1-Tap Share</span>
              </button>
            )}

            {/* Emergency SOS Button */}
            <button
              id="sos-emergency-trigger"
              onClick={onOpenSOS}
              className="flex items-center justify-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#e60000] hover:bg-[#cc0000] text-white text-xs sm:text-sm font-bold shadow-md transition active:scale-95 min-h-[36px]"
              aria-label="30s SOS Action"
            >
              <ShieldAlert className="w-4 h-4 text-white shrink-0" />
              <span className="uppercase tracking-wide">SOS</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              id="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full bg-white/10 text-white hover:bg-white/20 active:bg-white/30 transition min-w-[38px] min-h-[38px] flex items-center justify-center"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation with backdrop blur */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#25282b] border-t border-white/15 px-3 py-4 space-y-3 shadow-2xl animate-in slide-in-from-top-2 duration-150">
          
          {/* Quick SOS & Share Action Row in Mobile Menu */}
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSOS();
              }}
              className="flex items-center justify-center gap-2 p-2.5 rounded-[8px] bg-[#e60000] text-white font-bold text-xs active:scale-98 transition shadow-sm"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>30s Police SOS</span>
            </button>

            {onOpenEmergencyShare && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEmergencyShare();
                }}
                className="flex items-center justify-center gap-2 p-2.5 rounded-[8px] bg-white/15 text-white font-bold text-xs active:scale-98 transition border border-white/20"
              >
                <Share2 className="w-4 h-4 text-rose-300" />
                <span>1-Tap GPS Share</span>
              </button>
            )}
          </div>

          {/* Navigation Links */}
          <div className="space-y-1">
            <div className="text-[10px] font-bold text-[#bebebe] uppercase tracking-wider px-2 pb-1">
              Portal Navigation
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-[8px] text-xs font-semibold transition active:scale-98 ${
                    isActive
                      ? 'bg-white text-[#25282b] font-bold shadow-sm'
                      : 'text-white/90 hover:bg-white/10 active:bg-white/15'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#e60000]' : 'text-white/70'}`} />
                    <span>{item.label}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {item.badge && (
                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        isActive ? 'bg-[#e60000] text-white' : 'bg-white/20 text-white'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Language Selection in Drawer */}
          <div className="pt-2 border-t border-white/10">
            <div className="flex items-center justify-between px-2 pb-2 text-[10px] font-bold text-[#bebebe] uppercase tracking-wider">
              <span className="flex items-center gap-1">
                <Globe className="w-3 h-3" />
                <span>Language / भाषा</span>
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                onClick={() => {
                  setLanguage('english');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 px-2 rounded-[6px] text-xs font-bold text-center transition ${
                  language === 'english'
                    ? 'bg-[#e60000] text-white shadow-sm'
                    : 'bg-white/10 text-white/80 hover:bg-white/15'
                }`}
              >
                English
              </button>
              <button
                onClick={() => {
                  setLanguage('hindi');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 px-2 rounded-[6px] text-xs font-bold text-center transition ${
                  language === 'hindi'
                    ? 'bg-[#e60000] text-white shadow-sm'
                    : 'bg-white/10 text-white/80 hover:bg-white/15'
                }`}
              >
                हिन्दी
              </button>
              <button
                onClick={() => {
                  setLanguage('hinglish');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 px-2 rounded-[6px] text-xs font-bold text-center transition ${
                  language === 'hinglish'
                    ? 'bg-[#e60000] text-white shadow-sm'
                    : 'bg-white/10 text-white/80 hover:bg-white/15'
                }`}
              >
                Hinglish
              </button>
            </div>
          </div>

          {/* Direct Dial Helplines in Drawer */}
          <div className="pt-2 border-t border-white/10">
            <div className="px-2 pb-1.5 text-[10px] font-bold text-[#bebebe] uppercase tracking-wider">
              One-Touch Emergency Helplines
            </div>
            <div className="grid grid-cols-2 gap-2">
              <a
                href="tel:112"
                className="flex items-center gap-2 p-2 rounded-[6px] bg-white/10 hover:bg-white/20 text-white text-xs font-bold"
              >
                <Phone className="w-3.5 h-3.5 text-[#e60000]" />
                <span>112 (National SOS)</span>
              </a>
              <a
                href="tel:15100"
                className="flex items-center gap-2 p-2 rounded-[6px] bg-white/10 hover:bg-white/20 text-white text-xs font-bold"
              >
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                <span>15100 (Free Legal)</span>
              </a>
            </div>
          </div>

        </div>
      )}
    </header>
  );
};


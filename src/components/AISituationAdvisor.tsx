import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Loader2, 
  AlertCircle, 
  Volume2, 
  Copy, 
  Check, 
  Scale, 
  ShieldCheck, 
  FileText,
  AlertTriangle,
  ArrowRight,
  RefreshCw,
  MapPin,
  UserCheck,
  Share2
} from 'lucide-react';
import { AISituationResponse } from '../types';

interface AISituationAdvisorProps {
  language: 'english' | 'hindi' | 'hinglish';
  onDraftComplaint: (situationText: string) => void;
  onOpenEmergencyShare?: (situationTitle?: string) => void;
}

const SAMPLE_SCENARIOS = [
  {
    title: 'Traffic Cop Key Snatching & Cash Demand',
    prompt: 'A traffic police constable snatched my bike keys, deflated my front tire, and is demanding ₹2,000 cash fine without giving any e-challan or printed receipt.',
    state: 'Delhi (NCT)'
  },
  {
    title: 'Police Refusing FIR for Stolen Phone & Laptop',
    prompt: 'I went to the police station to lodge an FIR for my stolen laptop and mobile. The duty officer refused to write an FIR and only gave me an informal lost-article paper.',
    state: 'Maharashtra'
  },
  {
    title: 'Illegal Night Detention of Woman Relative',
    prompt: 'Police arrived at our house at 9:30 PM without any woman police officer or warrant and are forcing my sister to come to the police station for questioning.',
    state: 'Uttar Pradesh'
  },
  {
    title: 'Police Slapped Citizen & Refused Medical Aid',
    prompt: 'Police assaulted me during a routine checkpost inspection, verbally abused me, and caused bruises on my arm. Now they are threatening to put false charges if I complain.',
    state: 'Karnataka'
  }
];

export const AISituationAdvisor: React.FC<AISituationAdvisorProps> = ({
  language,
  onDraftComplaint,
  onOpenEmergencyShare
}) => {
  const [situationText, setSituationText] = useState<string>('');
  const [userState, setUserState] = useState<string>('All-India');
  const [userRole, setUserRole] = useState<string>('General Citizen');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AISituationResponse | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const statesList = [
    'All-India',
    'Delhi (NCT)',
    'Maharashtra',
    'Uttar Pradesh',
    'Karnataka',
    'Tamil Nadu',
    'West Bengal',
    'Telangana',
    'Rajasthan',
    'Gujarat',
    'Punjab',
    'Haryana',
    'Kerala',
    'Bihar',
    'Madhya Pradesh',
    'Other State/UT'
  ];

  const handleAnalyze = async (textToAnalyze?: string) => {
    const query = textToAnalyze || situationText;
    if (!query.trim()) {
      setError('Please describe what happened with the police.');
      return;
    }

    setLoading(true);
    setError(null);
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }

    try {
      const response = await fetch('/api/analyze-situation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          situation: query,
          state: userState,
          userRole: userRole
        })
      });

      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.error || 'Failed to analyze situation.');
      }

      setResult(json.data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred while connecting to the legal analysis server.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyScript = (scriptText: string) => {
    navigator.clipboard.writeText(scriptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeakScript = (scriptText: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setError('Audio playback is not supported in this browser environment.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(scriptText);
      utterance.lang = language === 'hindi' ? 'hi-IN' : 'en-IN';
      utterance.rate = 0.95;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    } catch {
      setIsSpeaking(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top AI Advisor Banner */}
      <div className="bg-[#25282b] text-white rounded-[6px] p-6 sm:p-8 shadow-md">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#e60000]" />
            <span>AI Emergency Legal Triage • Powered by Gemini 3.7 Flash</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
            Instant 30-Second Situation Analyzer
          </h2>

          <p className="text-white/80 text-sm leading-relaxed font-light">
            In an active encounter or urgent dispute? Describe what the police officer is doing or demanding in simple English, Hindi, or Hinglish. You will instantly get a 3-step action plan, spoken legal script, and exact Indian law sections.
          </p>
        </div>
      </div>

      {/* Input Box & Configuration Card */}
      <div className="bg-white border border-[#bebebe]/60 rounded-[6px] p-5 sm:p-6 space-y-4 shadow-sm">
        
        {/* State and Role Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-[#25282b] mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#e60000]" />
              <span>Location / State in India:</span>
            </label>
            <select
              value={userState}
              onChange={(e) => setUserState(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#25282b] rounded-[6px] text-xs text-[#25282b] focus:outline-none focus:ring-2 focus:ring-[#e60000]"
            >
              {statesList.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-[#25282b] mb-1.5 flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-[#e60000]" />
              <span>Citizen Profile / Group:</span>
            </label>
            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#25282b] rounded-[6px] text-xs text-[#25282b] focus:outline-none focus:ring-2 focus:ring-[#e60000]"
            >
              <option value="General Citizen">General Citizen / Driver</option>
              <option value="Woman">Woman (Special Custody Rights)</option>
              <option value="Minor / Juvenile">Parent of Minor / Juvenile (&lt;18)</option>
              <option value="Senior Citizen">Senior Citizen (&gt;60)</option>
              <option value="Detainee Relative">Family Member of Detained Person</option>
            </select>
          </div>
        </div>

        {/* Text Input Area */}
        <div className="space-y-1.5">
          <label className="block text-xs font-extrabold uppercase tracking-wider text-[#25282b]">
            Describe What Is Happening (Hindi / English / Hinglish):
          </label>
          <textarea
            id="ai-situation-input"
            rows={4}
            value={situationText}
            onChange={(e) => setSituationText(e.target.value)}
            placeholder="e.g. Police officer stopped my car, confiscated my phone and wallet, and is threatening to lock me up if I don't give ₹5,000 cash. What should I say and do?"
            className="w-full p-4 bg-white border border-[#25282b] rounded-[6px] text-sm text-[#25282b] placeholder-[#7e7e7e] focus:outline-none focus:ring-2 focus:ring-[#e60000] focus:border-transparent transition font-normal"
          />
        </div>

        {/* Submit & Reset Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="text-xs text-[#7e7e7e] flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Strictly grounded in BNSS 2023, BNS 2023, and Supreme Court rulings</span>
          </div>

          <div className="flex items-center gap-2">
            {result && (
              <button
                onClick={() => {
                  setResult(null);
                  setSituationText('');
                }}
                className="px-4 py-2 rounded-full bg-[#f2f2f2] hover:bg-[#e6e6e6] text-[#25282b] border border-[#bebebe]/60 text-xs font-bold transition"
              >
                Clear
              </button>
            )}
            
            <button
              id="ai-analyze-submit-btn"
              onClick={() => handleAnalyze()}
              disabled={loading || !situationText.trim()}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#e60000] hover:bg-[#cc0000] disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-bold shadow-md transition transform active:scale-95"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Analyzing Law & Precedents...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Analyze My Situation (30s Guide)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick Sample Prompts */}
        <div className="border-t border-[#bebebe]/50 pt-3 space-y-2">
          <span className="text-[11px] font-extrabold text-[#7e7e7e] uppercase tracking-wider">
            Or Click a Sample Crisis Scenario to Test:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {SAMPLE_SCENARIOS.map((sample, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSituationText(sample.prompt);
                  setUserState(sample.state);
                  handleAnalyze(sample.prompt);
                }}
                className="p-3 rounded-[6px] bg-[#f2f2f2] hover:bg-[#e6e6e6] border border-[#bebebe]/60 text-left text-xs transition space-y-0.5 group"
              >
                <div className="font-extrabold uppercase text-[#25282b] group-hover:text-[#e60000] flex items-center justify-between">
                  <span>{sample.title}</span>
                  <span className="text-[10px] text-[#7e7e7e] font-mono">{sample.state}</span>
                </div>
                <p className="text-[#25282b]/80 text-[11px] line-clamp-1 font-normal">
                  "{sample.prompt}"
                </p>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Error Card */}
      {error && (
        <div className="p-4 rounded-[6px] bg-red-50 border border-[#e60000] text-red-900 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-[#e60000] shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs">
            <p className="font-bold text-red-900">Unable to complete analysis</p>
            <p>{error}</p>
          </div>
        </div>
      )}

      {/* Analysis Results View */}
      {result && (
        <div className="bg-white border border-[#25282b] rounded-[6px] p-5 sm:p-8 space-y-6 shadow-md animate-in fade-in duration-300">
          
          {/* Urgency & Summary Banner */}
          <div className="bg-[#25282b] text-white rounded-[6px] p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-1 max-w-xl">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase ${
                  result.urgencyLevel === 'CRITICAL'
                    ? 'bg-[#e60000] text-white'
                    : result.urgencyLevel === 'HIGH'
                      ? 'bg-amber-400 text-[#25282b]'
                      : 'bg-blue-600 text-white'
                }`}>
                  {result.urgencyLevel} Urgency
                </span>
                <span className="text-xs text-white/70 font-semibold">
                  Custom Legal Assessment
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold uppercase text-white">
                {result.summary}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              {onOpenEmergencyShare && (
                <button
                  onClick={() => onOpenEmergencyShare(result.summary)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition shadow-sm"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>1-Tap SOS Share</span>
                </button>
              )}
              <button
                onClick={() => onDraftComplaint(result.summary)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#e60000] hover:bg-[#cc0000] text-white text-xs font-bold transition shadow-sm"
              >
                <FileText className="w-4 h-4" />
                <span>Draft Official Complaint Letter</span>
              </button>
            </div>
          </div>

          {/* 1. 30-Second Immediate Action Steps */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#25282b] flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#e60000] text-white text-[11px] flex items-center justify-center font-bold">1</span>
              <span>Immediate 30-Second Action Plan (What to Do Right Now)</span>
            </h4>

            <div className="grid sm:grid-cols-3 gap-3">
              {result.thirtySecondActions.map((step, idx) => (
                <div key={idx} className="p-4 rounded-[6px] bg-[#f2f2f2] border border-[#bebebe]/60 space-y-2">
                  <div className="w-6 h-6 rounded-full bg-[#e60000] text-white flex items-center justify-center text-xs font-bold">
                    {idx + 1}
                  </div>
                  <p className="text-xs sm:text-sm text-[#25282b] font-medium leading-snug">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 2. What to Say Script */}
          <div className="space-y-3 bg-[#25282b] text-white rounded-[6px] p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-white flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#e60000] text-white text-[11px] flex items-center justify-center font-bold">2</span>
                <span>Exact Verbatim Script to Say to the Officer</span>
              </h4>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSpeakScript(
                    language === 'hindi' ? result.exactWhatToSay.hindi : result.exactWhatToSay.english
                  )}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition ${
                    isSpeaking 
                      ? 'bg-[#e60000] text-white animate-pulse' 
                      : 'bg-white/15 hover:bg-white/25 text-white'
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{isSpeaking ? 'Playing...' : 'Play Audio'}</span>
                </button>

                <button
                  onClick={() => handleCopyScript(
                    language === 'hindi' 
                      ? result.exactWhatToSay.hindi 
                      : language === 'hinglish' 
                        ? result.exactWhatToSay.hinglish 
                        : result.exactWhatToSay.english
                  )}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Script'}</span>
                </button>
              </div>
            </div>

            {/* Script Display in English & Hindi */}
            <div className="space-y-3">
              <div className="p-3.5 bg-black/40 rounded-[6px] border border-white/10 text-white text-sm font-medium leading-relaxed italic">
                <span className="text-[10px] text-[#e60000] font-bold uppercase not-italic block mb-1">
                  English Script:
                </span>
                "{result.exactWhatToSay.english}"
              </div>

              <div className="p-3.5 bg-black/40 rounded-[6px] border border-white/10 text-white text-sm font-medium leading-relaxed">
                <span className="text-[10px] text-white/70 font-bold uppercase block mb-1">
                  हिंदी वाक्य (Devanagari):
                </span>
                "{result.exactWhatToSay.hindi}"
              </div>
            </div>
          </div>

          {/* 3. Statutory Rights & Legal Sections */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#25282b] flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#e60000] text-white text-[11px] flex items-center justify-center font-bold">3</span>
              <span>Applicable Indian Legal Sections (BNSS 2023, BNS 2023, Constitution)</span>
            </h4>

            <div className="grid sm:grid-cols-2 gap-3">
              {result.legalRightsAndSections.map((item, idx) => (
                <div key={idx} className="p-4 rounded-[6px] bg-white border border-[#bebebe]/60 space-y-1.5">
                  <div className="font-extrabold text-sm uppercase text-[#25282b]">{item.right}</div>
                  <div className="inline-block px-2.5 py-0.5 rounded-full bg-[#e60000] text-white text-xs font-mono font-bold">
                    {item.section}
                  </div>
                  <p className="text-xs text-[#25282b]/80 font-normal leading-relaxed">
                    {item.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Things NOT to do */}
          {result.doNotDo && result.doNotDo.length > 0 && (
            <div className="bg-red-50 border border-[#e60000] rounded-[6px] p-4 space-y-2">
              <div className="flex items-center gap-2 text-[#e60000] font-extrabold text-xs uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" />
                <span>What You Must Avoid (Do NOT Do This):</span>
              </div>
              <ul className="grid sm:grid-cols-2 gap-2 text-xs text-[#25282b]">
                {result.doNotDo.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 font-medium">
                    <span className="text-[#e60000] font-bold">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 5. Where To Complain */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#25282b] flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#e60000] text-white text-[11px] flex items-center justify-center font-bold">4</span>
              <span>Where & How to Complain</span>
            </h4>

            <div className="grid sm:grid-cols-2 gap-3">
              {result.whereToComplain.map((comp, idx) => (
                <div key={idx} className="p-4 rounded-[6px] bg-white border border-[#bebebe]/60 space-y-1.5">
                  <div className="font-extrabold text-sm uppercase text-[#25282b]">{comp.authority}</div>
                  <p className="text-xs text-[#25282b] font-medium">{comp.contactInfo}</p>
                  <div className="text-[11px] text-[#7e7e7e] font-mono font-medium">
                    Legal Basis: {comp.legalBasis}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

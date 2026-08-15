import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Send, 
  Loader2, 
  Copy, 
  Check, 
  Printer, 
  Download, 
  AlertCircle, 
  CheckCircle2, 
  ShieldCheck,
  Scale,
  Sparkles,
  ArrowRight,
  BookmarkPlus
} from 'lucide-react';
import { ComplaintDraftResult, TrackedComplaint } from '../types';
import { getSavedComplaints, saveComplaints } from '../data/trackedComplaintsSeed';

interface ComplaintDraftBuilderProps {
  initialSituationTitle?: string | null;
  onNavigateToTracker?: () => void;
}

export const ComplaintDraftBuilder: React.FC<ComplaintDraftBuilderProps> = ({
  initialSituationTitle,
  onNavigateToTracker
}) => {
  const [complaintType, setComplaintType] = useState<string>(
    'FIR Refusal - Formal Complaint to Superintendent of Police (BNSS 173(4) / CrPC 154(3))'
  );
  const [incidentDate, setIncidentDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [incidentLocation, setIncidentLocation] = useState<string>('');
  const [incidentDescription, setIncidentDescription] = useState<string>('');
  const [evidenceAvailable, setEvidenceAvailable] = useState<string>(
    'Written complaint copy submitted at station, GD receipt, phone audio/video recording, eyewitnesses'
  );
  const [complainantName, setComplainantName] = useState<string>('');
  const [complainantAddress, setComplainantAddress] = useState<string>('');
  const [complainantContact, setComplainantContact] = useState<string>('');
  const [officerDetails, setOfficerDetails] = useState<string>(
    'Station House Officer (SHO) / Duty Officer on duty'
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [draftResult, setDraftResult] = useState<ComplaintDraftResult | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [savedToTracker, setSavedToTracker] = useState<boolean>(false);

  useEffect(() => {
    if (initialSituationTitle) {
      if (initialSituationTitle.toLowerCase().includes('fir')) {
        setComplaintType('FIR Refusal - Formal Complaint to Superintendent of Police (BNSS 173(4) / CrPC 154(3))');
      } else if (initialSituationTitle.toLowerCase().includes('bribe')) {
        setComplaintType('Bribe Demand & Corruption Report to State Anti-Corruption Bureau (ACB)');
      } else if (initialSituationTitle.toLowerCase().includes('assault') || initialSituationTitle.toLowerCase().includes('threat')) {
        setComplaintType('Custodial Violence & Police Misconduct Petition to State Police Complaints Authority (SPCA)');
      } else {
        setIncidentDescription(`Incident related to: ${initialSituationTitle}.`);
      }
    }
  }, [initialSituationTitle]);

  const complaintOptions = [
    {
      id: 'sp-fir-refusal',
      label: 'FIR Refusal Complaint to SP / DCP (BNSS 173(4) / CrPC 154(3))',
      authority: 'The Superintendent of Police (SP) / Deputy Commissioner of Police (DCP)',
      coreLaw: 'Section 173(4) BNSS 2023 / Section 154(3) CrPC & Lalita Kumari SC ruling'
    },
    {
      id: 'spca-misconduct',
      label: 'Police Misconduct & Abuse to State Police Complaints Authority (SPCA)',
      authority: 'The Chairperson, State / District Police Complaints Authority',
      coreLaw: 'Prakash Singh v. Union of India (2006) 8 SCC 1'
    },
    {
      id: 'nhrc-torture',
      label: 'Custodial Torture & Rights Violation to NHRC / SHRC',
      authority: 'The Chairperson, National Human Rights Commission (NHRC)',
      coreLaw: 'Protection of Human Rights Act, 1993 & Paramvir Singh CCTV Mandate'
    },
    {
      id: 'acb-corruption',
      label: 'Bribe Demand & Extortion to Anti-Corruption Bureau (ACB)',
      authority: 'The Director General, Anti-Corruption Bureau / Directorate of Vigilance',
      coreLaw: 'Section 7 & 8, Prevention of Corruption Act, 1988'
    },
    {
      id: 'cctv-preservation',
      label: 'Urgent Application for Preservation of Police Station CCTV Footage',
      authority: 'The Superintendent of Police & Area Judicial Magistrate',
      coreLaw: 'Supreme Court Directive in Paramvir Singh Saini v. Baljit Singh (2020)'
    }
  ];

  const handleGenerateDraft = async () => {
    if (!incidentDescription.trim()) {
      setError('Please provide a brief description of what occurred.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-complaint-draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          complaintType,
          incidentDetails: {
            date: incidentDate,
            location: incidentLocation || '[Police Station / Location]',
            description: incidentDescription,
            evidence: evidenceAvailable
          },
          complainantDetails: {
            name: complainantName || '[Complainant Full Name]',
            address: complainantAddress || '[Complainant Address]',
            contact: complainantContact || '[Phone / Email]'
          },
          officerDetails: officerDetails || 'On-duty personnel at the concerned Police Station'
        })
      });

      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.error || 'Failed to generate legal draft.');
      }

      setDraftResult(json.data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error generating complaint letter.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLetter = () => {
    if (!draftResult) return;
    navigator.clipboard.writeText(draftResult.fullLetterText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSaveToTracker = () => {
    if (!draftResult) return;

    const evidenceList = evidenceAvailable
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const newRecord: TrackedComplaint = {
      id: `case-${Date.now()}`,
      caseTitle: `${draftResult.title} - ${incidentLocation || 'Incident Area'}`,
      complaintType: complaintType,
      authorityAddressed: draftResult.authorityAddressed,
      policeStation: incidentLocation || 'Concerned Police Station',
      cityState: complainantAddress || 'Jurisdiction Area',
      filingDate: incidentDate || new Date().toISOString().split('T')[0],
      statutoryDeadlineDays: 14,
      status: 'DRAFTED',
      incidentSummary: incidentDescription,
      evidenceLogged: evidenceList.length > 0 ? evidenceList : ['Copy of drafted formal legal representation'],
      timeline: [
        {
          id: `ev-${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          title: 'Formal Complaint Letter Drafted via SAKSHAM Portal',
          description: `Generated statutory letter addressed to ${draftResult.authorityAddressed}. Subject: ${draftResult.subjectLine}`,
          type: 'filing'
        }
      ],
      nextActionDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      nextActionNote: 'Dispatch letter via Speed Post with Acknowledgment Due (AD) and record tracking consignment number.',
      lastUpdated: new Date().toISOString().split('T')[0],
      isSample: false
    };

    const existing = getSavedComplaints();
    const updated = [newRecord, ...existing];
    saveComplaints(updated);
    setSavedToTracker(true);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-[#25282b] text-white rounded-[6px] p-6 sm:p-8 shadow-md">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5 text-[#e60000]" />
            <span>Formal Legal Escalation Tool</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
            Official Police Complaint & Notice Builder
          </h2>

          <p className="text-white/80 text-sm leading-relaxed font-light">
            Generate a formal, legally structured complaint letter with correct statutory citations (BNSS, BNS, Prevention of Corruption Act, and Supreme Court mandates). Ready to print, sign, and send via Speed Post or submit in person.
          </p>
        </div>
      </div>

      {/* Main Builder Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Form Inputs */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white border border-[#bebebe]/60 rounded-[6px] p-5 sm:p-6 space-y-4 shadow-sm">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#25282b] flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#e60000] text-white text-[11px] flex items-center justify-center font-bold">1</span>
              <span>Select Complaint Authority & Details</span>
            </h3>

            {/* Complaint Type Selector */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-[#25282b] mb-1.5">
                Type of Complaint:
              </label>
              <select
                id="complaint-type-select"
                value={complaintType}
                onChange={(e) => setComplaintType(e.target.value)}
                className="w-full px-3 py-2.5 bg-white border border-[#25282b] rounded-[6px] text-xs sm:text-sm text-[#25282b] focus:outline-none focus:ring-2 focus:ring-[#e60000]"
              >
                {complaintOptions.map((opt) => (
                  <option key={opt.id} value={opt.label}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Complainant Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-[#25282b] mb-1">
                  Your Full Name:
                </label>
                <input
                  type="text"
                  id="complainant-name-input"
                  value={complainantName}
                  onChange={(e) => setComplainantName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar Sharma"
                  className="w-full px-3 py-2 bg-white border border-[#25282b] rounded-[6px] text-xs text-[#25282b] focus:outline-none focus:ring-2 focus:ring-[#e60000]"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-[#25282b] mb-1">
                  Phone / Email:
                </label>
                <input
                  type="text"
                  id="complainant-contact-input"
                  value={complainantContact}
                  onChange={(e) => setComplainantContact(e.target.value)}
                  placeholder="e.g. +91 9876543210 / email@domain.com"
                  className="w-full px-3 py-2 bg-white border border-[#25282b] rounded-[6px] text-xs text-[#25282b] focus:outline-none focus:ring-2 focus:ring-[#e60000]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-[#25282b] mb-1">
                Your Residential Address:
              </label>
              <input
                type="text"
                value={complainantAddress}
                onChange={(e) => setComplainantAddress(e.target.value)}
                placeholder="e.g. Flat 402, Green Enclave, Sector 15, New Delhi - 110001"
                className="w-full px-3 py-2 bg-white border border-[#25282b] rounded-[6px] text-xs text-[#25282b] focus:outline-none focus:ring-2 focus:ring-[#e60000]"
              />
            </div>

            {/* Incident Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-[#25282b] mb-1">
                  Date of Incident:
                </label>
                <input
                  type="date"
                  value={incidentDate}
                  onChange={(e) => setIncidentDate(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#25282b] rounded-[6px] text-xs text-[#25282b] focus:outline-none focus:ring-2 focus:ring-[#e60000]"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-[#25282b] mb-1">
                  Police Station / Location:
                </label>
                <input
                  type="text"
                  id="incident-location-input"
                  value={incidentLocation}
                  onChange={(e) => setIncidentLocation(e.target.value)}
                  placeholder="e.g. Hauz Khas Police Station, New Delhi"
                  className="w-full px-3 py-2 bg-white border border-[#25282b] rounded-[6px] text-xs text-[#25282b] focus:outline-none focus:ring-2 focus:ring-[#e60000]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-[#25282b] mb-1">
                Police Personnel Involved (Name / Rank / Badge if known):
              </label>
              <input
                type="text"
                value={officerDetails}
                onChange={(e) => setOfficerDetails(e.target.value)}
                placeholder="e.g. Sub-Inspector [Name] / Badge No. 4521 or 'Duty Officer on date'"
                className="w-full px-3 py-2 bg-white border border-[#25282b] rounded-[6px] text-xs text-[#25282b] focus:outline-none focus:ring-2 focus:ring-[#e60000]"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-[#25282b] mb-1">
                Sequence of Events (What Happened):
              </label>
              <textarea
                id="incident-description-input"
                rows={5}
                value={incidentDescription}
                onChange={(e) => setIncidentDescription(e.target.value)}
                placeholder="Describe what occurred chronologically (e.g., visited police station at 3 PM to report theft of motorcycle, handed over written complaint, SHO refused to register FIR and told me to come back next week, denied giving GD entry number)."
                className="w-full p-3 bg-white border border-[#25282b] rounded-[6px] text-xs sm:text-sm text-[#25282b] placeholder-[#7e7e7e] focus:outline-none focus:ring-2 focus:ring-[#e60000] transition"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-[#25282b] mb-1">
                Evidence / Enclosures Available:
              </label>
              <input
                type="text"
                value={evidenceAvailable}
                onChange={(e) => setEvidenceAvailable(e.target.value)}
                placeholder="e.g. Copy of original complaint, GD entry slip, phone audio/video, medical MLC report"
                className="w-full px-3 py-2 bg-white border border-[#25282b] rounded-[6px] text-xs text-[#25282b] focus:outline-none focus:ring-2 focus:ring-[#e60000]"
              />
            </div>

            {error && (
              <div className="p-3 rounded-[6px] bg-red-50 border border-[#e60000] text-red-900 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-[#e60000] shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              id="generate-draft-btn"
              onClick={handleGenerateDraft}
              disabled={loading || !incidentDescription.trim()}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#e60000] hover:bg-[#cc0000] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm shadow-md transition transform active:scale-95 uppercase tracking-wide"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Drafting Legal Letter with Sections...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Formal Legal Complaint Draft</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Generated Letter Preview */}
        <div className="lg:col-span-6 space-y-4">
          {draftResult ? (
            <div className="bg-white border border-[#25282b] rounded-[6px] p-5 sm:p-6 space-y-4 shadow-md">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#bebebe]/50 pb-3">
                <div>
                  <h3 className="text-sm font-extrabold uppercase text-[#25282b]">{draftResult.title}</h3>
                  <p className="text-xs text-[#7e7e7e] font-mono">{draftResult.authorityAddressed}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSaveToTracker}
                    disabled={savedToTracker}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition shadow-sm ${
                      savedToTracker 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-[#25282b] hover:bg-black text-white'
                    }`}
                  >
                    {savedToTracker ? <Check className="w-3.5 h-3.5" /> : <BookmarkPlus className="w-3.5 h-3.5 text-[#e60000]" />}
                    <span>{savedToTracker ? 'Saved to Tracker!' : 'Save to Tracker'}</span>
                  </button>

                  <button
                    onClick={handleCopyLetter}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#f2f2f2] hover:bg-[#e6e6e6] text-[#25282b] border border-[#bebebe]/60 text-xs font-bold transition"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>

                  <button
                    onClick={handlePrint}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#e60000] hover:bg-[#cc0000] text-white text-xs font-bold transition shadow-sm"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print / PDF</span>
                  </button>
                </div>
              </div>

              {savedToTracker && (
                <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-[6px] text-xs text-emerald-900 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Case added to your SAKSHAM Complaint Tracker with statutory deadlines.</span>
                  </div>
                  {onNavigateToTracker && (
                    <button
                      onClick={onNavigateToTracker}
                      className="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-[11px] font-bold uppercase tracking-wider shrink-0 flex items-center gap-1"
                    >
                      View in Tracker <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              )}

              {/* Applicable Sections Pills */}
              <div className="flex flex-wrap gap-1.5">
                {draftResult.applicableSections.map((sec, idx) => (
                  <span key={idx} className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#e60000] text-white">
                    {sec}
                  </span>
                ))}
              </div>

              {/* Formatted Letter Body (Printable) */}
              <div className="bg-[#f2f2f2] p-4 sm:p-5 rounded-[6px] border border-[#bebebe]/60 max-h-[500px] overflow-y-auto font-mono text-xs text-[#25282b] leading-relaxed whitespace-pre-wrap selection:bg-[#e60000] selection:text-white">
                {draftResult.fullLetterText}
              </div>

              {/* Step-by-Step Filing Checklist */}
              <div className="bg-[#25282b] text-white rounded-[6px] p-4 space-y-2">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>How to Submit This Complaint Effectively:</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-white/80">
                  {draftResult.nextFilingSteps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#e60000] font-bold shrink-0">{idx + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="bg-[#f2f2f2] border border-dashed border-[#bebebe] rounded-[6px] p-8 text-center space-y-3 flex flex-col items-center justify-center min-h-[400px]">
              <div className="w-12 h-12 rounded-full bg-white border border-[#bebebe]/60 text-[#7e7e7e] flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-extrabold uppercase text-[#25282b]">Legal Letter Preview</h4>
                <p className="text-xs text-[#7e7e7e] max-w-sm">
                  Fill in the incident details on the left and click "Generate Formal Legal Complaint Draft" to produce a ready-to-file legal letter.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

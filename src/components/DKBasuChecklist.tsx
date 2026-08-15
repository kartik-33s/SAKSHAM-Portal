import React, { useState } from 'react';
import { 
  CheckSquare, 
  Square, 
  AlertTriangle, 
  ShieldCheck, 
  Scale, 
  FileWarning, 
  Copy, 
  Check, 
  Printer,
  Info
} from 'lucide-react';
import { DK_BASU_GUIDELINES } from '../data/legalReferences';

export const DKBasuChecklist: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>({});
  const [copied, setCopied] = useState<boolean>(false);

  const toggleItem = (id: number) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const totalCount = DK_BASU_GUIDELINES.length;
  const compliedCount = Object.values(checkedItems).filter(Boolean).length;
  const violationCount = totalCount - compliedCount;
  const compliancePercentage = Math.round((compliedCount / totalCount) * 100);

  const violationsList = DK_BASU_GUIDELINES.filter(g => !checkedItems[g.id]);

  const generateViolationReport = () => {
    let report = `ARREST PROCEDURE COMPLIANCE & VIOLATION REPORT\n`;
    report += `Under Supreme Court Guidelines in D.K. Basu v. State of West Bengal (1997) 1 SCC 416\n`;
    report += `Date of Assessment: ${new Date().toLocaleDateString('en-IN')}\n\n`;
    report += `COMPLIANCE SCORE: ${compliedCount}/${totalCount} (${compliancePercentage}%)\n`;
    report += `TOTAL VIOLATIONS OBSERVED: ${violationCount}\n\n`;
    report += `================ SPECIFIC VIOLATIONS ================\n`;
    
    violationsList.forEach((v, idx) => {
      report += `${idx + 1}. [BREACH OF DIRECTIVE #${v.id}]: ${v.title}\n`;
      report += `   Mandate: ${v.detail}\n\n`;
    });

    report += `LEGAL CONSEQUENCE:\n`;
    report += `As held by the Hon'ble Supreme Court of India, non-compliance with D.K. Basu guidelines renders the concerned police officers liable for Departmental action and Contempt of Court proceedings.\n`;
    return report;
  };

  const handleCopyReport = () => {
    navigator.clipboard.writeText(generateViolationReport());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-[#25282b] text-white rounded-[6px] p-6 sm:p-8 shadow-md">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider">
            <CheckSquare className="w-3.5 h-3.5 text-[#e60000]" />
            <span>Supreme Court Mandatory Directives</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
            D.K. Basu Landmark Arrest Checklist
          </h2>

          <p className="text-white/80 text-sm leading-relaxed font-light">
            In <strong className="text-white font-bold">D.K. Basu v. State of West Bengal (1997)</strong>, the Supreme Court of India laid down 11 mandatory golden rules for every arrest. Check off the procedures followed by the police below to audit compliance and generate a violation report for the Judicial Magistrate.
          </p>
        </div>
      </div>

      {/* Compliance Scorecard */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-[#bebebe]/60 rounded-[6px] p-5 text-center space-y-1 shadow-sm">
          <div className="text-xs font-extrabold text-[#7e7e7e] uppercase tracking-wider">
            Compliance Score
          </div>
          <div className={`text-3xl font-black ${
            compliancePercentage === 100 
              ? 'text-emerald-600' 
              : compliancePercentage >= 60 
                ? 'text-[#25282b]' 
                : 'text-[#e60000]'
          }`}>
            {compliancePercentage}%
          </div>
          <p className="text-[11px] text-[#7e7e7e] font-medium">
            {compliedCount} of {totalCount} rules verified
          </p>
        </div>

        <div className="bg-white border border-[#bebebe]/60 rounded-[6px] p-5 text-center space-y-1 shadow-sm">
          <div className="text-xs font-extrabold text-[#7e7e7e] uppercase tracking-wider">
            Violations Detected
          </div>
          <div className="text-3xl font-black text-[#e60000]">
            {violationCount}
          </div>
          <p className="text-[11px] text-[#7e7e7e] font-medium">
            Actionable under Contempt of Court
          </p>
        </div>

        <div className="bg-white border border-[#bebebe]/60 rounded-[6px] p-5 flex flex-col items-center justify-center gap-2 shadow-sm">
          <button
            onClick={handleCopyReport}
            className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-[#e60000] hover:bg-[#cc0000] text-white text-xs font-bold transition shadow-sm uppercase tracking-wide"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Report Copied!' : 'Copy Violation Report'}</span>
          </button>
          <span className="text-[10px] text-[#7e7e7e] font-medium">
            Present this directly to the Magistrate
          </span>
        </div>
      </div>

      {/* Checklist Items */}
      <div className="bg-white border border-[#bebebe]/60 rounded-[6px] p-5 sm:p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#bebebe]/50 pb-3">
          <h3 className="text-xs font-extrabold text-[#25282b] uppercase tracking-wider flex items-center gap-2">
            <Scale className="w-4 h-4 text-[#e60000]" />
            <span>11 Golden Directives (Click each to mark as followed):</span>
          </h3>
          <div className="text-xs text-[#7e7e7e] font-medium hidden sm:block">
            BNSS Sections 36, 47, 48, 53, 57 & Article 22
          </div>
        </div>

        <div className="space-y-3">
          {DK_BASU_GUIDELINES.map((guideline) => {
            const isChecked = !!checkedItems[guideline.id];
            return (
              <div
                key={guideline.id}
                onClick={() => toggleItem(guideline.id)}
                className={`p-4 rounded-[6px] border transition cursor-pointer select-none flex items-start gap-3.5 ${
                  isChecked
                    ? 'bg-emerald-50/70 border-emerald-500 text-[#25282b]'
                    : 'bg-white border-[#bebebe]/60 hover:border-[#25282b] text-[#25282b]'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isChecked ? (
                    <div className="w-5 h-5 rounded-[4px] bg-emerald-600 text-white flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-[4px] border-2 border-[#bebebe] flex items-center justify-center hover:border-[#e60000]" />
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#f2f2f2] text-[#25282b] font-mono border border-[#bebebe]/60">
                      #{guideline.id}
                    </span>
                    <h4 className="text-sm font-extrabold uppercase text-[#25282b]">
                      {guideline.title}
                    </h4>
                    {isChecked ? (
                      <span className="text-[10px] font-bold text-emerald-700 uppercase">
                        ✓ Complied
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-[#e60000] uppercase">
                        ✕ Violation
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#25282b]/80 font-normal leading-relaxed">
                    {guideline.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

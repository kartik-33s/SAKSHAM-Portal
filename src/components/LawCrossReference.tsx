import React, { useState } from 'react';
import { 
  Scale, 
  Search, 
  BookOpen, 
  Award, 
  ExternalLink, 
  HelpCircle,
  FileCheck2
} from 'lucide-react';
import { 
  BNSS_CRPC_MAPPINGS, 
  BNS_IPC_MAPPINGS, 
  LANDMARK_JUDGMENTS 
} from '../data/legalReferences';

export const LawCrossReference: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'procedural' | 'penal' | 'judgments'>('procedural');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredBNSS = BNSS_CRPC_MAPPINGS.filter(m => 
    !searchQuery ||
    m.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.bnssSection.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.crpcSection.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredBNS = BNS_IPC_MAPPINGS.filter(p => 
    !searchQuery ||
    p.offence.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.bnsSection.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.ipcSection.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredJudgments = LANDMARK_JUDGMENTS.filter(j =>
    !searchQuery ||
    j.caseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    j.citation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    j.coreRule.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-[#25282b] text-white rounded-[6px] p-6 sm:p-8 shadow-md">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-[#e60000]" />
            <span>Verified Statutory & Judicial Library</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
            Indian Criminal Law & Supreme Court Precedents
          </h2>

          <p className="text-white/80 text-sm leading-relaxed font-light">
            India transitioned from the old British-era codes (CrPC 1973 & IPC 1860) to the new <strong className="text-white font-bold">Bharatiya Nagarik Suraksha Sanhita (BNSS 2023)</strong> and <strong className="text-white font-bold">Bharatiya Nyaya Sanhita (BNS 2023)</strong>. Use this cross-reference guide to understand both old and new legal sections.
          </p>
        </div>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-white rounded-full border border-[#bebebe]/60 w-full sm:w-auto shadow-sm">
          <button
            onClick={() => setActiveTab('procedural')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-extrabold uppercase tracking-wide transition flex-1 sm:flex-initial ${
              activeTab === 'procedural' 
                ? 'bg-[#e60000] text-white shadow-sm' 
                : 'text-[#25282b] hover:bg-[#f2f2f2]'
            }`}
          >
            <span>BNSS 2023 vs CrPC</span>
          </button>

          <button
            onClick={() => setActiveTab('penal')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-extrabold uppercase tracking-wide transition flex-1 sm:flex-initial ${
              activeTab === 'penal' 
                ? 'bg-[#e60000] text-white shadow-sm' 
                : 'text-[#25282b] hover:bg-[#f2f2f2]'
            }`}
          >
            <span>BNS 2023 vs IPC</span>
          </button>

          <button
            onClick={() => setActiveTab('judgments')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-extrabold uppercase tracking-wide transition flex-1 sm:flex-initial ${
              activeTab === 'judgments' 
                ? 'bg-[#e60000] text-white shadow-sm' 
                : 'text-[#25282b] hover:bg-[#f2f2f2]'
            }`}
          >
            <span>Landmark SC Judgments</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#7e7e7e] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search sections or case names..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-[#bebebe] rounded-full text-xs text-[#25282b] placeholder-[#7e7e7e] focus:outline-none focus:ring-2 focus:ring-[#e60000]"
          />
        </div>
      </div>

      {/* Tab 1: BNSS vs CrPC Table */}
      {activeTab === 'procedural' && (
        <div className="bg-white border border-[#bebebe]/60 rounded-[6px] overflow-hidden shadow-sm">
          <div className="p-4 bg-[#25282b] text-white flex items-center justify-between">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-white">
              Procedural Law: Bharatiya Nagarik Suraksha Sanhita (BNSS) vs CrPC 1973
            </h3>
            <span className="text-[11px] text-white/80 font-mono">
              {filteredBNSS.length} Key Provisions
            </span>
          </div>

          <div className="divide-y divide-[#bebebe]/40">
            {filteredBNSS.map((item, idx) => (
              <div key={idx} className="p-4 sm:p-5 hover:bg-[#f2f2f2] transition space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-sm font-extrabold uppercase text-[#25282b]">{item.topic}</h4>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#e60000] text-white text-xs font-mono font-bold">
                      BNSS: {item.bnssSection}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#f2f2f2] text-[#25282b] border border-[#bebebe]/60 text-xs font-mono font-semibold">
                      CrPC: {item.crpcSection}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-[#25282b]/80 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: BNS vs IPC Table */}
      {activeTab === 'penal' && (
        <div className="bg-white border border-[#bebebe]/60 rounded-[6px] overflow-hidden shadow-sm">
          <div className="p-4 bg-[#25282b] text-white flex items-center justify-between">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-white">
              Penal Law: Bharatiya Nyaya Sanhita (BNS) 2023 vs Indian Penal Code (IPC)
            </h3>
            <span className="text-[11px] text-white/80 font-mono">
              {filteredBNS.length} Police Misconduct Offences
            </span>
          </div>

          <div className="divide-y divide-[#bebebe]/40">
            {filteredBNS.map((item, idx) => (
              <div key={idx} className="p-4 sm:p-5 hover:bg-[#f2f2f2] transition space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-sm font-extrabold uppercase text-[#25282b]">{item.offence}</h4>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#e60000] text-white text-xs font-mono font-bold">
                      BNS: {item.bnsSection}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#f2f2f2] text-[#25282b] border border-[#bebebe]/60 text-xs font-mono font-semibold">
                      IPC: {item.ipcSection}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-[#25282b]/80">
                  <span><strong className="text-[#25282b]">Punishment:</strong> {item.punishment}</span>
                  <span className="text-[#bebebe]">•</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#f2f2f2] text-[#25282b] border border-[#bebebe]/60 font-mono text-[11px]">
                    {item.nature}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Landmark Supreme Court Judgments */}
      {activeTab === 'judgments' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredJudgments.map((judge) => (
            <div key={judge.id} className="p-5 rounded-[6px] bg-white border border-[#bebebe]/60 space-y-3 shadow-sm hover:border-[#25282b] transition">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#e60000] font-bold">{judge.citation}</span>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#f2f2f2] text-[#25282b] font-bold border border-[#bebebe]/60">{judge.year}</span>
                </div>
                <h4 className="text-base font-extrabold uppercase text-[#25282b]">{judge.caseName}</h4>
                <p className="text-xs text-[#7e7e7e] font-medium">{judge.bench}</p>
              </div>

              <div className="p-3 bg-[#f2f2f2] rounded-[6px] border border-[#bebebe]/60 text-xs text-[#25282b] font-medium leading-relaxed">
                {judge.coreRule}
              </div>

              <div className="space-y-1.5">
                <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#25282b]">
                  Key Directives for Police:
                </div>
                <ul className="space-y-1 text-xs text-[#25282b]/80">
                  {judge.keyDirectives.map((dir, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-[#e60000] font-bold">•</span>
                      <span>{dir}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-[#bebebe]/40 pt-2 text-xs text-[#25282b] font-medium">
                💡 <strong className="font-bold">Citizen Benefit:</strong> {judge.importanceForCitizens}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

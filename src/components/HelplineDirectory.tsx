import React, { useState } from 'react';
import { 
  PhoneCall, 
  Search, 
  MapPin, 
  ExternalLink, 
  Mail, 
  Phone, 
  Building, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { NATIONAL_HELPLINES, STATE_DIRECTORIES } from '../data/helplines';

export const HelplineDirectory: React.FC = () => {
  const [searchState, setSearchState] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredNational = NATIONAL_HELPLINES.filter(h => {
    const matchesCat = selectedCategory === 'all' || h.category === selectedCategory;
    const matchesSearch = 
      !searchState || 
      h.name.toLowerCase().includes(searchState.toLowerCase()) ||
      h.hindiName.includes(searchState) ||
      h.number.includes(searchState);
    return matchesCat && matchesSearch;
  });

  const filteredStates = STATE_DIRECTORIES.filter(s =>
    !searchState || s.stateName.toLowerCase().includes(searchState.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-[#25282b] text-white rounded-[6px] p-6 sm:p-8 shadow-md">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider">
            <PhoneCall className="w-3.5 h-3.5 text-[#e60000]" />
            <span>Verified 24x7 Pan-India & State Directory</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
            Emergency Helplines & Police Complaint Authorities
          </h2>

          <p className="text-white/80 text-sm leading-relaxed font-light">
            One-tap direct dialers for national emergency services, Anti-Corruption Bureaus (ACB 1064), Free Legal Aid (NALSA 15100), and State Police Complaints Authorities across India.
          </p>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {['all', 'emergency', 'corruption', 'legal_aid', 'women', 'human_rights'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wide transition border ${
                selectedCategory === cat
                  ? 'bg-[#e60000] text-white border-[#e60000] shadow-sm'
                  : 'bg-white text-[#25282b] border-[#bebebe]/60 hover:bg-[#f2f2f2]'
              }`}
            >
              {cat.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#7e7e7e] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchState}
            onChange={(e) => setSearchState(e.target.value)}
            placeholder="Search state or helpline..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-[#bebebe] rounded-full text-xs text-[#25282b] placeholder-[#7e7e7e] focus:outline-none focus:ring-2 focus:ring-[#e60000]"
          />
        </div>
      </div>

      {/* National Helplines Grid */}
      <div className="space-y-3">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#25282b] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#e60000]" />
          <span>National 24x7 Helplines (Tap to Call):</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredNational.map((item, idx) => (
            <a
              key={idx}
              href={`tel:${item.number.replace(/[^0-9]/g, '')}`}
              className="p-4 rounded-[6px] bg-white border border-[#bebebe]/60 hover:border-[#e60000] transition group flex flex-col justify-between space-y-3 shadow-sm hover:shadow-md"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#f2f2f2] text-[#25282b] font-extrabold uppercase tracking-wider border border-[#bebebe]/60">
                    {item.coverage}
                  </span>
                  {item.isTollFree && (
                    <span className="text-[10px] font-bold text-emerald-700 uppercase">
                      Toll Free
                    </span>
                  )}
                </div>

                <h4 className="text-sm font-extrabold uppercase text-[#25282b] group-hover:text-[#e60000] transition">
                  {item.name}
                </h4>
                <p className="text-xs text-[#7e7e7e] font-medium">
                  {item.hindiName}
                </p>
                <p className="text-xs text-[#25282b]/80 pt-1">
                  {item.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#bebebe]/40">
                <span className="text-lg font-black text-[#e60000] font-mono">
                  {item.number}
                </span>
                <span className="flex items-center gap-1.5 text-xs font-extrabold text-white bg-[#e60000] px-3.5 py-1.5 rounded-full group-hover:bg-[#cc0000] transition shadow-sm uppercase tracking-wide">
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Now</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* State-by-State Directory */}
      <div className="space-y-3 pt-4">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#25282b] flex items-center gap-2">
          <Building className="w-4 h-4 text-[#e60000]" />
          <span>State Police Complaints Authorities & Anti-Corruption Bureaus:</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredStates.map((st, idx) => (
            <div key={idx} className="p-5 rounded-[6px] bg-white border border-[#bebebe]/60 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#bebebe]/40 pb-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#e60000]" />
                  <h4 className="text-base font-extrabold uppercase text-[#25282b]">{st.stateName}</h4>
                </div>
              </div>

              {/* Police Complaints Authority */}
              <div className="space-y-1">
                <span className="text-[11px] font-extrabold text-[#e60000] uppercase tracking-wider block">
                  Police Complaints Authority (SPCA / DPCA):
                </span>
                <p className="text-xs font-bold text-[#25282b]">{st.policeComplaintsAuthority.name}</p>
                <p className="text-xs text-[#7e7e7e]">{st.policeComplaintsAuthority.address}</p>
                {st.policeComplaintsAuthority.phone && (
                  <p className="text-xs text-[#25282b] font-mono">Phone: {st.policeComplaintsAuthority.phone}</p>
                )}
                {st.policeComplaintsAuthority.website && (
                  <a
                    href={st.policeComplaintsAuthority.website}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#e60000] hover:underline pt-0.5"
                  >
                    <span>Official Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              {/* Anti Corruption Bureau */}
              <div className="space-y-1 pt-2 border-t border-[#bebebe]/40">
                <span className="text-[11px] font-extrabold text-[#25282b] uppercase tracking-wider block">
                  Anti-Corruption Bureau (ACB / Vigilance):
                </span>
                <p className="text-xs font-bold text-[#25282b]">{st.antiCorruptionBureau.name}</p>
                <p className="text-xs text-[#25282b] font-mono">Toll-Free Helpline: {st.antiCorruptionBureau.tollFree}</p>
                {st.antiCorruptionBureau.email && (
                  <p className="text-xs text-[#7e7e7e]">Email: {st.antiCorruptionBureau.email}</p>
                )}
              </div>

              {/* Legal Aid */}
              <div className="space-y-1 pt-2 border-t border-[#bebebe]/40">
                <span className="text-[11px] font-extrabold text-emerald-700 uppercase tracking-wider block">
                  Free Legal Services Authority (SLSA / DLSA):
                </span>
                <p className="text-xs font-bold text-[#25282b]">{st.legalServicesAuthority.name}</p>
                <p className="text-xs text-[#25282b] font-mono">Toll-Free: {st.legalServicesAuthority.tollFree}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

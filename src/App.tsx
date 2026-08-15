/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { EmergencySOSModal } from './components/EmergencySOSModal';
import { EmergencyShareModal } from './components/EmergencyShareModal';
import { SituationExplorer } from './components/SituationExplorer';
import { AISituationAdvisor } from './components/AISituationAdvisor';
import { GeoLegalHelpDashboard } from './components/GeoLegalHelpDashboard';
import { ComplaintTrackerDashboard } from './components/ComplaintTrackerDashboard';
import { ComplaintDraftBuilder } from './components/ComplaintDraftBuilder';
import { DKBasuChecklist } from './components/DKBasuChecklist';
import { LawCrossReference } from './components/LawCrossReference';
import { HelplineDirectory } from './components/HelplineDirectory';
import { ShieldCheck, Scale, PhoneCall, Heart, ExternalLink, Clock, Share2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('situations');
  const [language, setLanguage] = useState<'english' | 'hindi' | 'hinglish'>('english');
  const [isSOSOpen, setIsSOSOpen] = useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [shareSituationTitle, setShareSituationTitle] = useState<string | undefined>(undefined);
  const [draftingSituation, setDraftingSituation] = useState<string | null>(null);
  const [selectedSituationFromSOS, setSelectedSituationFromSOS] = useState<string | null>(null);

  const handleOpenEmergencyShare = (situationTitle?: string) => {
    setShareSituationTitle(situationTitle);
    setIsShareModalOpen(true);
  };

  const handleDraftComplaintForSituation = (situationTitle: string) => {
    setDraftingSituation(situationTitle);
    setActiveTab('complaint-builder');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateFromSOS = (situationId: string) => {
    setSelectedSituationFromSOS(situationId);
    setActiveTab('situations');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#25282b] flex flex-col font-sans selection:bg-[#e60000] selection:text-white">
      
      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        language={language}
        setLanguage={setLanguage}
        onOpenSOS={() => setIsSOSOpen(true)}
        onOpenEmergencyShare={() => handleOpenEmergencyShare()}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {activeTab === 'situations' && (
          <SituationExplorer
            language={language}
            onDraftComplaintForSituation={handleDraftComplaintForSituation}
            selectedSituationId={selectedSituationFromSOS}
            onOpenEmergencyShare={handleOpenEmergencyShare}
          />
        )}

        {activeTab === 'ai-advisor' && (
          <AISituationAdvisor
            language={language}
            onDraftComplaint={handleDraftComplaintForSituation}
            onOpenEmergencyShare={handleOpenEmergencyShare}
          />
        )}

        {activeTab === 'geo-legal' && (
          <GeoLegalHelpDashboard
            onNavigateToDraftBuilder={handleDraftComplaintForSituation}
          />
        )}

        {activeTab === 'complaint-tracker' && (
          <ComplaintTrackerDashboard
            onNavigateToDraftBuilder={handleDraftComplaintForSituation}
          />
        )}

        {activeTab === 'complaint-builder' && (
          <ComplaintDraftBuilder
            initialSituationTitle={draftingSituation}
            onNavigateToTracker={() => {
              setActiveTab('complaint-tracker');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'dk-basu' && (
          <DKBasuChecklist />
        )}

        {activeTab === 'laws' && (
          <LawCrossReference />
        )}

        {activeTab === 'helplines' && (
          <HelplineDirectory />
        )}

      </main>

      {/* Emergency SOS Modal */}
      <EmergencySOSModal
        isOpen={isSOSOpen}
        onClose={() => setIsSOSOpen(false)}
        language={language}
        onNavigateToSituation={handleNavigateFromSOS}
        onOpenEmergencyShare={handleOpenEmergencyShare}
      />

      {/* One-Tap Emergency Sharing Modal */}
      <EmergencyShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        initialSituationTitle={shareSituationTitle}
      />

      {/* Footer & Legal Source Transparency */}
      <footer className="border-t border-[#25282b]/10 bg-[#25282b] text-white text-xs py-10 px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-[6px] bg-[#e60000] text-white flex items-center justify-center font-bold text-sm">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-white text-sm uppercase tracking-tight">
                  SAKSHAM Portal
                </span>
                <span className="text-[10px] ml-2 px-2 py-0.5 rounded-full bg-white/10 text-white/90 font-bold uppercase">
                  Police Rights India
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              <button 
                onClick={() => { setActiveTab('situations'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium transition"
              >
                Situations
              </button>
              <button 
                onClick={() => { setActiveTab('geo-legal'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium transition"
              >
                Geo Legal Help
              </button>
              <button 
                onClick={() => { setActiveTab('complaint-tracker'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium transition"
              >
                Complaint Tracker
              </button>
              <button 
                onClick={() => { setActiveTab('complaint-builder'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium transition"
              >
                Complaint Drafter
              </button>
              <button 
                onClick={() => { setActiveTab('dk-basu'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium transition"
              >
                D.K. Basu Checklist
              </button>
              <button 
                onClick={() => { setActiveTab('laws'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium transition"
              >
                BNSS 2023 Cross-Ref
              </button>
              <button 
                onClick={() => { setActiveTab('helplines'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium transition"
              >
                24x7 Helplines
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[12px] text-[#bebebe] leading-relaxed">
            <p className="max-w-3xl">
              <strong>Official Legal Sources:</strong> Constitution of India (Arts. 20, 21, 22), Bharatiya Nagarik Suraksha Sanhita (BNSS 2023), Bharatiya Nyaya Sanhita (BNS 2023), Motor Vehicles Act 1988, Prevention of Corruption Act 1988, D.K. Basu v. State of WB, Lalita Kumari v. Govt of UP, Arnesh Kumar v. State of Bihar, and Paramvir Singh Saini v. Baljit Singh.
            </p>
            <div className="shrink-0 font-medium text-white/90 bg-white/5 p-3 rounded-[6px] border border-white/10">
              Emergency: <strong className="text-[#e60000]">112</strong> | ACB: <strong>1064</strong> | Legal Aid: <strong>15100</strong>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

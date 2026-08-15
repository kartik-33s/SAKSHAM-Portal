import React, { useState, useEffect, useMemo } from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Send, 
  Scale, 
  Calendar, 
  ShieldAlert, 
  Printer, 
  ArrowRight, 
  Edit3, 
  Trash2, 
  ExternalLink, 
  Paperclip, 
  MessageSquare, 
  Building2, 
  HelpCircle,
  X,
  Sparkles,
  Info,
  ChevronDown,
  ChevronUp,
  RotateCcw
} from 'lucide-react';
import { TrackedComplaint, ComplaintStatus, ComplaintTimelineEvent } from '../types';
import { 
  getSavedComplaints, 
  saveComplaints, 
  INITIAL_SAMPLE_COMPLAINTS 
} from '../data/trackedComplaintsSeed';

interface ComplaintTrackerDashboardProps {
  onNavigateToDraftBuilder?: (initialTitle?: string) => void;
}

export const ComplaintTrackerDashboard: React.FC<ComplaintTrackerDashboardProps> = ({
  onNavigateToDraftBuilder
}) => {
  const [complaints, setComplaints] = useState<TrackedComplaint[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [expandedComplaintId, setExpandedComplaintId] = useState<string | null>(null);

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState<boolean>(false);
  const [activeComplaintForEvent, setActiveComplaintForEvent] = useState<TrackedComplaint | null>(null);
  const [dossierPrintComplaint, setDossierPrintComplaint] = useState<TrackedComplaint | null>(null);

  // New Complaint Form State
  const [newCaseTitle, setNewCaseTitle] = useState<string>('');
  const [newComplaintType, setNewComplaintType] = useState<string>('FIR Refusal Representation (Sec 173(4) BNSS / 154(3) CrPC)');
  const [newAuthority, setNewAuthority] = useState<string>('The Superintendent of Police (SP) / DCP');
  const [newPoliceStation, setNewPoliceStation] = useState<string>('');
  const [newCityState, setNewCityState] = useState<string>('');
  const [newFilingDate, setNewFilingDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [newStatutoryDays, setNewStatutoryDays] = useState<number>(14);
  const [newStatus, setNewStatus] = useState<ComplaintStatus>('DISPATCHED_POST');
  const [newTrackingNumber, setNewTrackingNumber] = useState<string>('');
  const [newGdNumber, setNewGdNumber] = useState<string>('');
  const [newIoName, setNewIoName] = useState<string>('');
  const [newIoContact, setNewIoContact] = useState<string>('');
  const [newIncidentSummary, setNewIncidentSummary] = useState<string>('');
  const [newEvidenceRaw, setNewEvidenceRaw] = useState<string>('Speed post receipt slip, Written complaint copy, Witness statement');
  const [newNextActionDate, setNewNextActionDate] = useState<string>('');
  const [newNextActionNote, setNewNextActionNote] = useState<string>('');

  // New Event Form State
  const [eventDate, setEventDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [eventTitle, setEventTitle] = useState<string>('');
  const [eventDescription, setEventDescription] = useState<string>('');
  const [eventType, setEventType] = useState<'filing' | 'postal' | 'inquiry' | 'hearing' | 'notice' | 'disposal'>('inquiry');
  const [eventDocRef, setEventDocRef] = useState<string>('');

  // Load from localStorage on mount
  useEffect(() => {
    const loaded = getSavedComplaints();
    setComplaints(loaded);
    if (loaded.length > 0) {
      setExpandedComplaintId(loaded[0].id);
    }
  }, []);

  const handleSaveToStorage = (updated: TrackedComplaint[]) => {
    setComplaints(updated);
    saveComplaints(updated);
  };

  const handleResetSampleCases = () => {
    if (window.confirm('Reset tracker to default sample legal complaints? Any custom logged records will be overwritten.')) {
      handleSaveToStorage(INITIAL_SAMPLE_COMPLAINTS);
      if (INITIAL_SAMPLE_COMPLAINTS.length > 0) {
        setExpandedComplaintId(INITIAL_SAMPLE_COMPLAINTS[0].id);
      }
    }
  };

  const handleDeleteComplaint = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to remove this complaint from your tracker?')) {
      const filtered = complaints.filter(c => c.id !== id);
      handleSaveToStorage(filtered);
      if (expandedComplaintId === id) {
        setExpandedComplaintId(filtered.length > 0 ? filtered[0].id : null);
      }
    }
  };

  const handleAddComplaintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCaseTitle.trim()) {
      alert('Please provide a title for your complaint record.');
      return;
    }

    const evidenceList = newEvidenceRaw
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const initialTimeline: ComplaintTimelineEvent[] = [
      {
        id: `ev-${Date.now()}`,
        date: newFilingDate,
        title: `Complaint Filed / Dispatched to ${newAuthority}`,
        description: `Formal complaint initiated. Tracking/GD: ${newTrackingNumber || newGdNumber || 'Dispatched by complainant'}.`,
        type: 'filing',
        documentRef: newTrackingNumber ? `Tracking: ${newTrackingNumber}` : undefined
      }
    ];

    const newRecord: TrackedComplaint = {
      id: `case-${Date.now()}`,
      caseTitle: newCaseTitle,
      complaintType: newComplaintType,
      authorityAddressed: newAuthority,
      policeStation: newPoliceStation || 'Concerned Police Station',
      cityState: newCityState || 'Jurisdiction Area',
      filingDate: newFilingDate,
      statutoryDeadlineDays: Number(newStatutoryDays) || 14,
      status: newStatus,
      trackingNumber: newTrackingNumber || undefined,
      gdNumber: newGdNumber || undefined,
      ioName: newIoName || undefined,
      ioContact: newIoContact || undefined,
      incidentSummary: newIncidentSummary || 'Complaint lodged regarding police non-registration or misconduct.',
      evidenceLogged: evidenceList.length > 0 ? evidenceList : ['Copy of formal complaint representation'],
      timeline: initialTimeline,
      nextActionDate: newNextActionDate || undefined,
      nextActionNote: newNextActionNote || undefined,
      lastUpdated: new Date().toISOString().split('T')[0],
      isSample: false
    };

    const updated = [newRecord, ...complaints];
    handleSaveToStorage(updated);
    setIsAddModalOpen(false);
    setExpandedComplaintId(newRecord.id);

    // Reset form
    setNewCaseTitle('');
    setNewPoliceStation('');
    setNewCityState('');
    setNewTrackingNumber('');
    setNewGdNumber('');
    setNewIoName('');
    setNewIoContact('');
    setNewIncidentSummary('');
    setNewNextActionDate('');
    setNewNextActionNote('');
  };

  const handleAddEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeComplaintForEvent || !eventTitle.trim()) return;

    const newEvent: ComplaintTimelineEvent = {
      id: `ev-${Date.now()}`,
      date: eventDate,
      title: eventTitle,
      description: eventDescription,
      type: eventType,
      documentRef: eventDocRef || undefined
    };

    const updated = complaints.map(item => {
      if (item.id === activeComplaintForEvent.id) {
        return {
          ...item,
          timeline: [...item.timeline, newEvent],
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      }
      return item;
    });

    handleSaveToStorage(updated);
    setIsAddEventModalOpen(false);
    setEventTitle('');
    setEventDescription('');
    setEventDocRef('');
  };

  const handleUpdateStatus = (id: string, newStatusVal: ComplaintStatus) => {
    const updated = complaints.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status: newStatusVal,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      }
      return item;
    });
    handleSaveToStorage(updated);
  };

  // Days calculation helper
  const getDaysElapsed = (filingDateStr: string) => {
    const filing = new Date(filingDateStr);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - filing.getTime());
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  };

  // Metrics summary
  const metrics = useMemo(() => {
    const total = complaints.length;
    const overdue = complaints.filter(c => {
      if (c.status === 'FIR_REGISTERED' || c.status === 'CLOSED') return false;
      const days = getDaysElapsed(c.filingDate);
      return days >= c.statutoryDeadlineDays || c.status === 'STATUTORY_OVERDUE';
    }).length;
    const underInquiry = complaints.filter(c => 
      c.status === 'UNDER_INQUIRY' || c.status === 'DISPATCHED_POST' || c.status === 'GD_ENTERED'
    ).length;
    const resolved = complaints.filter(c => 
      c.status === 'FIR_REGISTERED' || c.status === 'CLOSED'
    ).length;

    return { total, overdue, underInquiry, resolved };
  }, [complaints]);

  // Filtered list
  const filteredComplaints = useMemo(() => {
    return complaints.filter(item => {
      // Status Filter
      if (statusFilter !== 'ALL') {
        if (statusFilter === 'OVERDUE') {
          const days = getDaysElapsed(item.filingDate);
          const isOverdue = days >= item.statutoryDeadlineDays || item.status === 'STATUTORY_OVERDUE';
          if (!isOverdue) return false;
        } else if (item.status !== statusFilter) {
          return false;
        }
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.caseTitle.toLowerCase().includes(q);
        const matchesStation = item.policeStation.toLowerCase().includes(q);
        const matchesAuth = item.authorityAddressed.toLowerCase().includes(q);
        const matchesTrack = item.trackingNumber?.toLowerCase().includes(q);
        const matchesGD = item.gdNumber?.toLowerCase().includes(q);
        const matchesIO = item.ioName?.toLowerCase().includes(q);
        const matchesType = item.complaintType.toLowerCase().includes(q);

        if (!matchesTitle && !matchesStation && !matchesAuth && !matchesTrack && !matchesGD && !matchesIO && !matchesType) {
          return false;
        }
      }

      return true;
    });
  }, [complaints, statusFilter, searchQuery]);

  const getStatusBadge = (status: ComplaintStatus, filingDate: string, deadlineDays: number) => {
    const days = getDaysElapsed(filingDate);
    const isOverdue = (days >= deadlineDays || status === 'STATUTORY_OVERDUE') && status !== 'FIR_REGISTERED' && status !== 'CLOSED';

    if (isOverdue && status !== 'STATUTORY_OVERDUE') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#e60000] text-white">
          <AlertTriangle className="w-3 h-3" />
          Statutory Deadline Expired ({days}d &gt; {deadlineDays}d)
        </span>
      );
    }

    switch (status) {
      case 'DRAFTED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-neutral-200 text-neutral-800">
            <Edit3 className="w-3 h-3" /> Draft Prepared
          </span>
        );
      case 'DISPATCHED_POST':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
            <Send className="w-3 h-3" /> Dispatched via Speed Post
          </span>
        );
      case 'GD_ENTERED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
            <Clock className="w-3 h-3" /> GD Entry Stamped
          </span>
        );
      case 'UNDER_INQUIRY':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">
            <Clock className="w-3 h-3" /> Under Police Inquiry (IO Assigned)
          </span>
        );
      case 'STATUTORY_OVERDUE':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#e60000] text-white animate-pulse">
            <AlertTriangle className="w-3 h-3" /> 14-Day Inquiry Overdue &bull; Section 175(3) Triggered
          </span>
        );
      case 'SPCA_HEARING':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-purple-100 text-purple-800 border border-purple-200">
            <Scale className="w-3 h-3" /> SPCA Authority Hearing
          </span>
        );
      case 'FIR_REGISTERED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-600 text-white shadow-sm">
            <CheckCircle2 className="w-3 h-3" /> FIR Registered (Success)
          </span>
        );
      case 'CLOSED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-neutral-100 text-neutral-600">
            <CheckCircle2 className="w-3 h-3" /> Disposed / Concluded
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-[#25282b] text-white p-6 sm:p-8 rounded-[8px] shadow-sm border border-[#25282b] relative overflow-hidden">
        <div className="relative z-10 max-w-4xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-bold uppercase tracking-wider">
            <Scale className="w-3.5 h-3.5 text-[#e60000]" />
            Citizen Legal Accountability System
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
            SAKSHAM Complaint Tracker & Legal Case Diary
          </h1>

          <p className="text-white/80 text-sm sm:text-base leading-relaxed font-light">
            Track formal police representations, Speed Post consignments, station GD entries, and statutory escalation deadlines under <strong className="text-white font-semibold">Section 173(4) & 175(3) BNSS</strong>. If police fail to act within statutory enquiry windows, generate direct petitions for the Judicial Magistrate.
          </p>

          <div className="pt-3 flex flex-wrap items-center gap-3">
            <button
              id="log-new-complaint-btn"
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[6px] bg-[#e60000] text-white text-xs font-extrabold uppercase tracking-wider shadow-sm hover:bg-[#cc0000] transition"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              Log New Complaint / Petition
            </button>

            {onNavigateToDraftBuilder && (
              <button
                onClick={() => onNavigateToDraftBuilder()}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[6px] bg-white text-[#25282b] text-xs font-extrabold uppercase tracking-wider hover:bg-neutral-100 transition shadow-sm"
              >
                <FileText className="w-4 h-4 text-[#e60000]" />
                Open Complaint Drafter
              </button>
            )}

            <button
              onClick={handleResetSampleCases}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-[6px] bg-white/10 text-white/80 text-xs font-semibold hover:bg-white/20 transition ml-auto"
              title="Reset sample legal scenarios"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Samples
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-[6px] border border-neutral-200 bg-[#f8f9fa] shadow-2xs">
          <div className="text-xs font-bold uppercase text-neutral-500">Tracked Cases</div>
          <div className="text-2xl sm:text-3xl font-black text-[#25282b] mt-1">{metrics.total}</div>
          <div className="text-[11px] text-neutral-500 mt-0.5">Active citizen dossiers</div>
        </div>

        <div className="p-4 rounded-[6px] border border-blue-200 bg-blue-50/60 shadow-2xs">
          <div className="text-xs font-bold uppercase text-blue-700">Under Inquiry</div>
          <div className="text-2xl sm:text-3xl font-black text-blue-900 mt-1">{metrics.underInquiry}</div>
          <div className="text-[11px] text-blue-600 mt-0.5">With IO / SP Grievance Desk</div>
        </div>

        <div className="p-4 rounded-[6px] border border-red-200 bg-red-50/70 shadow-2xs">
          <div className="text-xs font-bold uppercase text-[#e60000] flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" />
            Statutory Overdue
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#e60000] mt-1">{metrics.overdue}</div>
          <div className="text-[11px] text-red-700 font-semibold mt-0.5">Ready for Magistrate Court</div>
        </div>

        <div className="p-4 rounded-[6px] border border-emerald-200 bg-emerald-50/60 shadow-2xs">
          <div className="text-xs font-bold uppercase text-emerald-700">Relief / FIR Lodged</div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-900 mt-1">{metrics.resolved}</div>
          <div className="text-[11px] text-emerald-700 mt-0.5">FIR or SPCA Relief granted</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-[6px] bg-white border border-neutral-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="tracker-search-input"
            type="text"
            placeholder="Search by Title, Police Station, Speed Post Consignment, GD #, IO..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs border border-neutral-300 rounded-[6px] focus:outline-none focus:border-[#e60000] bg-neutral-50 focus:bg-white"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 text-xs"
            >
              Clear
            </button>
          )}
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 text-xs font-semibold">
          {[
            { id: 'ALL', label: 'All Cases' },
            { id: 'OVERDUE', label: '⚠️ Statutory Overdue' },
            { id: 'UNDER_INQUIRY', label: 'Under Inquiry' },
            { id: 'SPCA_HEARING', label: 'SPCA Hearing' },
            { id: 'FIR_REGISTERED', label: 'FIR Registered' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setStatusFilter(f.id)}
              className={`px-3 py-1.5 rounded-full whitespace-nowrap transition ${
                statusFilter === f.id
                  ? 'bg-[#25282b] text-white font-bold'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* List of Tracked Complaints */}
      <div className="space-y-4">
        {filteredComplaints.length === 0 ? (
          <div className="text-center py-12 px-4 rounded-[6px] border border-dashed border-neutral-300 bg-neutral-50">
            <FileText className="w-10 h-10 text-neutral-400 mx-auto mb-2" />
            <h3 className="text-base font-bold text-[#25282b]">No tracked complaints found</h3>
            <p className="text-xs text-neutral-500 max-w-md mx-auto mt-1 mb-4">
              {searchQuery ? 'Try adjusting your search keywords or filter tab.' : 'You haven\'t logged any formal police complaints yet.'}
            </p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[6px] bg-[#e60000] text-white text-xs font-bold uppercase tracking-wider"
            >
              <Plus className="w-3.5 h-3.5" />
              Log First Complaint
            </button>
          </div>
        ) : (
          filteredComplaints.map(item => {
            const isExpanded = expandedComplaintId === item.id;
            const daysElapsed = getDaysElapsed(item.filingDate);
            const isOverdue = (daysElapsed >= item.statutoryDeadlineDays || item.status === 'STATUTORY_OVERDUE') && item.status !== 'FIR_REGISTERED' && item.status !== 'CLOSED';

            return (
              <div 
                key={item.id}
                id={`complaint-card-${item.id}`}
                className={`rounded-[8px] border transition-all ${
                  isOverdue 
                    ? 'border-red-300 bg-white shadow-sm ring-1 ring-red-200' 
                    : isExpanded
                      ? 'border-neutral-400 bg-white shadow-sm'
                      : 'border-neutral-200 bg-white hover:border-neutral-300'
                }`}
              >
                {/* Header Row */}
                <div 
                  className="p-4 sm:p-5 cursor-pointer flex flex-col sm:flex-row sm:items-start justify-between gap-4"
                  onClick={() => setExpandedComplaintId(isExpanded ? null : item.id)}
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {getStatusBadge(item.status, item.filingDate, item.statutoryDeadlineDays)}
                      
                      <span className="text-[11px] font-bold text-neutral-500 uppercase px-2 py-0.5 rounded bg-neutral-100">
                        {item.policeStation}
                      </span>

                      {item.isSample && (
                        <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                          Sample Scenario
                        </span>
                      )}
                    </div>

                    <h2 className="text-base sm:text-lg font-bold text-[#25282b] tracking-tight leading-snug">
                      {item.caseTitle}
                    </h2>

                    <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-neutral-600">
                      <div className="flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 text-neutral-400" />
                        <span><strong>Authority:</strong> {item.authorityAddressed}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                        <span><strong>Filed on:</strong> {item.filingDate} ({daysElapsed} days ago)</span>
                      </div>
                      {item.trackingNumber && (
                        <div className="flex items-center gap-1 text-blue-700 font-mono text-[11px]">
                          <Send className="w-3.5 h-3.5" />
                          <span><strong>Tracking / Post:</strong> {item.trackingNumber}</span>
                        </div>
                      )}
                      {item.gdNumber && (
                        <div className="flex items-center gap-1 text-amber-800 font-mono text-[11px]">
                          <Clock className="w-3.5 h-3.5" />
                          <span><strong>GD Ref:</strong> {item.gdNumber}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Action Icons & Expand Chevron */}
                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-start">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDossierPrintComplaint(item);
                      }}
                      title="Print Case Status Sheet"
                      className="p-1.5 rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition text-xs font-semibold flex items-center gap-1"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Dossier</span>
                    </button>

                    <button
                      onClick={(e) => handleDeleteComplaint(item.id, e)}
                      title="Delete record"
                      className="p-1.5 rounded text-neutral-400 hover:text-red-600 hover:bg-red-50 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Overdue Statutory Banner */}
                {isOverdue && (
                  <div className="mx-4 sm:mx-5 mb-4 p-3 rounded-[6px] bg-red-50 border border-red-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                    <div className="flex items-start gap-2 text-red-900">
                      <AlertTriangle className="w-4 h-4 text-[#e60000] shrink-0 mt-0.5" />
                      <div>
                        <strong>Statutory Inquiry Period Expired ({daysElapsed} days / {item.statutoryDeadlineDays}-day rule):</strong>
                        <p className="text-red-800 font-light mt-0.5">
                          Under Section 173(3) & 173(4) BNSS 2023, the preliminary enquiry must conclude within 14 days. Failure by police warrants an immediate petition before the Judicial Magistrate under <strong className="font-semibold text-red-950">Section 175(3) BNSS / 156(3) CrPC</strong>.
                        </p>
                      </div>
                    </div>

                    {onNavigateToDraftBuilder && (
                      <button
                        onClick={() => onNavigateToDraftBuilder(item.caseTitle)}
                        className="shrink-0 px-3 py-1.5 rounded-[4px] bg-[#e60000] text-white font-extrabold uppercase tracking-wider text-[11px] hover:bg-[#cc0000] transition flex items-center gap-1 shadow-2xs"
                      >
                        Draft Sec 175(3) Petition <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                )}

                {/* Expanded Detailed Content */}
                {isExpanded && (
                  <div className="px-4 sm:px-5 pb-5 pt-2 border-t border-neutral-100 space-y-6">
                    
                    {/* Visual Legal Progression Stages */}
                    <div className="bg-[#f8f9fa] p-4 rounded-[6px] border border-neutral-200 space-y-2">
                      <div className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-500">
                        Statutory Police Accountability Pipeline
                      </div>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
                        <div className="p-2.5 rounded bg-white border border-neutral-200">
                          <div className="text-[10px] font-bold text-neutral-400 uppercase">Stage 1: Filing</div>
                          <div className="font-bold text-neutral-800 mt-0.5 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            Representation Sent
                          </div>
                          <div className="text-[10px] text-neutral-500 font-mono mt-0.5">Sec 173(4) BNSS</div>
                        </div>

                        <div className={`p-2.5 rounded border ${
                          item.gdNumber || item.trackingNumber ? 'bg-white border-blue-200 text-blue-900' : 'bg-neutral-50 border-neutral-200 text-neutral-400'
                        }`}>
                          <div className="text-[10px] font-bold uppercase opacity-75">Stage 2: Receipt</div>
                          <div className="font-bold mt-0.5 flex items-center gap-1">
                            {item.gdNumber || item.trackingNumber ? <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> : <Clock className="w-3.5 h-3.5" />}
                            {item.gdNumber ? 'GD Stamped' : 'Postal Delivered'}
                          </div>
                          <div className="text-[10px] opacity-75 font-mono mt-0.5">Proof Recorded</div>
                        </div>

                        <div className={`p-2.5 rounded border ${
                          item.status === 'UNDER_INQUIRY' ? 'bg-white border-indigo-300 text-indigo-900 font-semibold' : 'bg-neutral-50 border-neutral-200 text-neutral-400'
                        }`}>
                          <div className="text-[10px] font-bold uppercase opacity-75">Stage 3: 14-Day Limit</div>
                          <div className="font-bold mt-0.5 flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-indigo-600" />
                            IO Preliminary Enquiry
                          </div>
                          <div className="text-[10px] opacity-75 font-mono mt-0.5">Sec 173(3) BNSS</div>
                        </div>

                        <div className={`p-2.5 rounded border ${
                          item.status === 'FIR_REGISTERED'
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold'
                            : isOverdue
                              ? 'bg-red-50 border-red-300 text-red-900 font-bold'
                              : 'bg-neutral-50 border-neutral-200 text-neutral-400'
                        }`}>
                          <div className="text-[10px] font-bold uppercase opacity-75">Stage 4: Legal Relief</div>
                          <div className="font-bold mt-0.5 flex items-center gap-1">
                            {item.status === 'FIR_REGISTERED' ? (
                              <>
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                FIR Issued
                              </>
                            ) : isOverdue ? (
                              <>
                                <AlertTriangle className="w-3.5 h-3.5 text-[#e60000]" />
                                Magistrate Court
                              </>
                            ) : (
                              'Final Outcome'
                            )}
                          </div>
                          <div className="text-[10px] opacity-75 font-mono mt-0.5">
                            {item.status === 'FIR_REGISTERED' ? 'Free Copy Given' : 'Sec 175(3) Application'}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Summary & Investigation Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-3">
                        <div>
                          <div className="font-bold text-neutral-500 uppercase text-[10px] tracking-wider mb-1">
                            Incident Summary & Allegation
                          </div>
                          <p className="text-neutral-800 leading-relaxed bg-[#fbfbfb] p-3 rounded-[6px] border border-neutral-200">
                            {item.incidentSummary}
                          </p>
                        </div>

                        <div>
                          <div className="font-bold text-neutral-500 uppercase text-[10px] tracking-wider mb-1">
                            Logged Evidence & Proofs ({item.evidenceLogged.length})
                          </div>
                          <ul className="space-y-1 bg-[#fbfbfb] p-3 rounded-[6px] border border-neutral-200">
                            {item.evidenceLogged.map((ev, idx) => (
                              <li key={idx} className="flex items-start gap-1.5 text-neutral-700">
                                <Paperclip className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                                <span>{ev}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="bg-[#fbfbfb] p-3 rounded-[6px] border border-neutral-200 space-y-2">
                          <div className="font-bold text-neutral-500 uppercase text-[10px] tracking-wider">
                            Investigating Officer (IO) / Department Desk
                          </div>
                          <div className="space-y-1">
                            <div><strong>IO Name:</strong> {item.ioName || 'Not Assigned / Pending with Dispatch Desk'}</div>
                            <div><strong>Official Contact:</strong> {item.ioContact || 'N/A'}</div>
                            <div><strong>Station / Division:</strong> {item.policeStation} ({item.cityState})</div>
                          </div>
                        </div>

                        {item.nextActionDate && (
                          <div className="bg-amber-50/70 p-3 rounded-[6px] border border-amber-200 text-amber-900 space-y-1">
                            <div className="font-bold uppercase text-[10px] tracking-wider flex items-center gap-1 text-amber-800">
                              <Calendar className="w-3.5 h-3.5" />
                              Next Legal Milestone ({item.nextActionDate})
                            </div>
                            <p className="font-medium text-xs leading-relaxed">
                              {item.nextActionNote || 'Follow up with concerned authority for status report.'}
                            </p>
                          </div>
                        )}

                        {/* Status Updater Dropdown */}
                        <div className="flex items-center gap-2 pt-1">
                          <span className="font-bold text-neutral-600 text-xs">Update Status:</span>
                          <select
                            value={item.status}
                            onChange={(e) => handleUpdateStatus(item.id, e.target.value as ComplaintStatus)}
                            className="flex-1 py-1.5 px-2 text-xs border border-neutral-300 rounded-[4px] bg-white font-medium focus:outline-none focus:border-[#e60000]"
                          >
                            <option value="DRAFTED">Draft Prepared</option>
                            <option value="DISPATCHED_POST">Dispatched via Speed Post</option>
                            <option value="GD_ENTERED">GD Entry Stamped</option>
                            <option value="UNDER_INQUIRY">Under Police Inquiry (IO Assigned)</option>
                            <option value="STATUTORY_OVERDUE">Statutory Overdue (Trigger Magistrate Court)</option>
                            <option value="SPCA_HEARING">SPCA Authority Hearing</option>
                            <option value="FIR_REGISTERED">FIR Registered (Success)</option>
                            <option value="CLOSED">Disposed / Closed</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Case Chronology & Timeline */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-extrabold uppercase tracking-wider text-neutral-700 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#e60000]" />
                          Case Chronology & Timeline ({item.timeline.length} events logged)
                        </div>
                        <button
                          onClick={() => {
                            setActiveComplaintForEvent(item);
                            setIsAddEventModalOpen(true);
                          }}
                          className="px-2.5 py-1 text-[11px] font-bold rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" /> Log Timeline Event
                        </button>
                      </div>

                      <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-200">
                        {item.timeline.map((event) => (
                          <div key={event.id} className="relative text-xs space-y-0.5">
                            {/* Dot indicator */}
                            <div className={`absolute -left-6 top-1 w-2.5 h-2.5 rounded-full ring-4 ring-white ${
                              event.type === 'filing' ? 'bg-blue-600' :
                              event.type === 'postal' ? 'bg-purple-600' :
                              event.type === 'notice' ? 'bg-red-600' :
                              event.type === 'disposal' ? 'bg-emerald-600' : 'bg-neutral-500'
                            }`} />

                            <div className="flex items-center gap-2">
                              <span className="font-bold text-neutral-900">{event.title}</span>
                              <span className="text-[10px] font-mono text-neutral-400">{event.date}</span>
                              {event.documentRef && (
                                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-neutral-100 text-neutral-600">
                                  {event.documentRef}
                                </span>
                              )}
                            </div>

                            <p className="text-neutral-600 text-[11px] leading-relaxed">
                              {event.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action Strip */}
                    <div className="pt-3 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div className="text-neutral-500 text-[11px]">
                        Last updated: <strong>{item.lastUpdated}</strong> &bull; Record ID: <span className="font-mono">{item.id}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {onNavigateToDraftBuilder && (
                          <button
                            onClick={() => onNavigateToDraftBuilder(item.caseTitle)}
                            className="px-3 py-1.5 rounded-[4px] bg-[#25282b] text-white text-[11px] font-bold uppercase tracking-wider hover:bg-black transition flex items-center gap-1.5"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            Open in Legal Drafter
                          </button>
                        )}
                        <button
                          onClick={() => setDossierPrintComplaint(item)}
                          className="px-3 py-1.5 rounded-[4px] bg-[#e60000] text-white text-[11px] font-bold uppercase tracking-wider hover:bg-[#cc0000] transition flex items-center gap-1.5"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          Print Legal Dossier
                        </button>
                      </div>
                    </div>

                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Statutory Rights & Legal Escalation Guide Banner */}
      <div className="bg-[#f8f9fa] p-5 rounded-[8px] border border-neutral-200 space-y-3">
        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#25282b]">
          <ShieldAlert className="w-4 h-4 text-[#e60000]" />
          Key Statutory Timelines Every Indian Citizen Must Know
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs leading-relaxed">
          <div className="p-3 bg-white rounded-[6px] border border-neutral-200 space-y-1">
            <strong className="text-neutral-900 block">1. Preliminary Enquiry Limit: 14 Days</strong>
            <p className="text-neutral-600">
              Under Section 173(3) BNSS 2023, police may only hold preliminary inquiry for non-heinous offences punishable with 3 to 7 years, and must conclude it within 14 days.
            </p>
          </div>

          <div className="p-3 bg-white rounded-[6px] border border-neutral-200 space-y-1">
            <strong className="text-neutral-900 block">2. Moving the Magistrate: Section 175(3) BNSS</strong>
            <p className="text-neutral-600">
              If the SP / DCP does not register an FIR under Sec 173(4), you can file an application before the Judicial Magistrate with postal acknowledgment proof (Lalita Kumari ruling).
            </p>
          </div>

          <div className="p-3 bg-white rounded-[6px] border border-neutral-200 space-y-1">
            <strong className="text-neutral-900 block">3. State Police Complaints Authority (SPCA)</strong>
            <p className="text-neutral-600">
              For custodial torture, extortion, illegal detention, or key-snatching, complaints go to the SPCA headed by a retired High Court / District Judge independent of police hierarchy.
            </p>
          </div>
        </div>
      </div>

      {/* MODAL: Log New Complaint */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-[8px] shadow-2xl border border-neutral-300 p-6 space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-[#e60000] text-white flex items-center justify-center font-bold">
                  <Plus className="w-5 h-5 stroke-[3]" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base uppercase text-[#25282b]">Log New Police Complaint / Petition</h3>
                  <p className="text-xs text-neutral-500">Track statutory timelines, postal dispatch, and IO actions</p>
                </div>
              </div>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="text-neutral-400 hover:text-neutral-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddComplaintSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  Case Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., FIR Refusal Representation to DCP North - Phone Snatching"
                  value={newCaseTitle}
                  onChange={(e) => setNewCaseTitle(e.target.value)}
                  className="w-full p-2.5 border border-neutral-300 rounded-[4px] font-semibold text-neutral-900 focus:outline-none focus:border-[#e60000]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-neutral-700 uppercase tracking-wider mb-1">
                    Complaint Category
                  </label>
                  <select
                    value={newComplaintType}
                    onChange={(e) => setNewComplaintType(e.target.value)}
                    className="w-full p-2 border border-neutral-300 rounded-[4px] font-medium"
                  >
                    <option value="FIR Refusal Representation (Sec 173(4) BNSS / 154(3) CrPC)">FIR Refusal Representation (Sec 173(4) BNSS)</option>
                    <option value="Application to Judicial Magistrate (Sec 175(3) BNSS / 156(3) CrPC)">Application to Magistrate (Sec 175(3) BNSS)</option>
                    <option value="Police Misconduct & Abuse Petition (SPCA / Prakash Singh Mandate)">Police Misconduct Petition to SPCA</option>
                    <option value="Bribe Demand Report (Anti-Corruption Bureau / PC Act)">Bribe Demand Report to ACB</option>
                    <option value="Application for Defreezing Bank Account (Sec 106 BNSS / 102 CrPC)">Cyber Bank Account De-freeze Application</option>
                    <option value="CCTV Footage Preservation Application (Paramvir Singh Mandate)">Police Station CCTV Preservation Request</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-neutral-700 uppercase tracking-wider mb-1">
                    Authority Addressed
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., The Superintendent of Police (SP) / DCP"
                    value={newAuthority}
                    onChange={(e) => setNewAuthority(e.target.value)}
                    className="w-full p-2 border border-neutral-300 rounded-[4px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-neutral-700 uppercase tracking-wider mb-1">
                    Concerned Police Station *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Indiranagar Police Station"
                    value={newPoliceStation}
                    onChange={(e) => setNewPoliceStation(e.target.value)}
                    className="w-full p-2 border border-neutral-300 rounded-[4px]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-neutral-700 uppercase tracking-wider mb-1">
                    City / State
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Bengaluru, Karnataka"
                    value={newCityState}
                    onChange={(e) => setNewCityState(e.target.value)}
                    className="w-full p-2 border border-neutral-300 rounded-[4px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-neutral-700 uppercase tracking-wider mb-1">
                    Filing / Dispatch Date
                  </label>
                  <input
                    type="date"
                    required
                    value={newFilingDate}
                    onChange={(e) => setNewFilingDate(e.target.value)}
                    className="w-full p-2 border border-neutral-300 rounded-[4px]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-neutral-700 uppercase tracking-wider mb-1">
                    Statutory Window (Days)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={180}
                    value={newStatutoryDays}
                    onChange={(e) => setNewStatutoryDays(Number(e.target.value))}
                    className="w-full p-2 border border-neutral-300 rounded-[4px]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-neutral-700 uppercase tracking-wider mb-1">
                    Initial Status
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as ComplaintStatus)}
                    className="w-full p-2 border border-neutral-300 rounded-[4px]"
                  >
                    <option value="DRAFTED">Draft Prepared</option>
                    <option value="DISPATCHED_POST">Dispatched via Speed Post</option>
                    <option value="GD_ENTERED">GD Entry Stamped</option>
                    <option value="UNDER_INQUIRY">Under Inquiry</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-neutral-700 uppercase tracking-wider mb-1">
                    Speed Post / Grievance Tracking #
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., ED123456789IN"
                    value={newTrackingNumber}
                    onChange={(e) => setNewTrackingNumber(e.target.value)}
                    className="w-full p-2 border border-neutral-300 rounded-[4px] font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-neutral-700 uppercase tracking-wider mb-1">
                    Station GD / Daily Diary Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., GD Entry No. 28B dt. 12/08/2026"
                    value={newGdNumber}
                    onChange={(e) => setNewGdNumber(e.target.value)}
                    className="w-full p-2 border border-neutral-300 rounded-[4px] font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-neutral-700 uppercase tracking-wider mb-1">
                    Investigating Officer (IO) Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., SI R. Verma / ACP Desk"
                    value={newIoName}
                    onChange={(e) => setNewIoName(e.target.value)}
                    className="w-full p-2 border border-neutral-300 rounded-[4px]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-neutral-700 uppercase tracking-wider mb-1">
                    IO Contact / Email
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 011-2345XXXX / io@delhipolice.gov.in"
                    value={newIoContact}
                    onChange={(e) => setNewIoContact(e.target.value)}
                    className="w-full p-2 border border-neutral-300 rounded-[4px]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  Brief Summary of Incident & Allegation
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe what occurred, who refused the complaint or demanded bribes, and specific relief requested..."
                  value={newIncidentSummary}
                  onChange={(e) => setNewIncidentSummary(e.target.value)}
                  className="w-full p-2.5 border border-neutral-300 rounded-[4px] focus:outline-none focus:border-[#e60000]"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  Logged Evidence & Proofs (Comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g., Speed post receipt, Stamped complaint copy, Audio recording, Medical certificate"
                  value={newEvidenceRaw}
                  onChange={(e) => setNewEvidenceRaw(e.target.value)}
                  className="w-full p-2 border border-neutral-300 rounded-[4px]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-neutral-700 uppercase tracking-wider mb-1">
                    Next Follow-up / Action Date
                  </label>
                  <input
                    type="date"
                    value={newNextActionDate}
                    onChange={(e) => setNewNextActionDate(e.target.value)}
                    className="w-full p-2 border border-neutral-300 rounded-[4px]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-neutral-700 uppercase tracking-wider mb-1">
                    Next Action Note
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., File Sec 175(3) petition before Magistrate"
                    value={newNextActionNote}
                    onChange={(e) => setNewNextActionNote(e.target.value)}
                    className="w-full p-2 border border-neutral-300 rounded-[4px]"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded bg-neutral-100 text-neutral-700 font-bold hover:bg-neutral-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded bg-[#e60000] text-white font-extrabold uppercase tracking-wider hover:bg-[#cc0000] transition shadow-sm"
                >
                  Save to Tracker
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Add Timeline Event */}
      {isAddEventModalOpen && activeComplaintForEvent && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-[8px] shadow-2xl border border-neutral-300 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <div>
                <h3 className="font-extrabold text-base uppercase text-[#25282b]">Log Timeline Event / Legal Milestone</h3>
                <p className="text-xs text-neutral-500 font-medium">{activeComplaintForEvent.caseTitle}</p>
              </div>
              <button 
                onClick={() => setIsAddEventModalOpen(false)}
                className="text-neutral-400 hover:text-neutral-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddEventSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-neutral-700 uppercase mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full p-2 border border-neutral-300 rounded"
                  />
                </div>
                <div>
                  <label className="block font-bold text-neutral-700 uppercase mb-1">Event Type</label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value as any)}
                    className="w-full p-2 border border-neutral-300 rounded"
                  >
                    <option value="inquiry">IO Inquiry / Meeting</option>
                    <option value="postal">Postal / Tracking Update</option>
                    <option value="hearing">Court / SPCA Hearing</option>
                    <option value="notice">Legal Notice / Order</option>
                    <option value="filing">Additional Document Filed</option>
                    <option value="disposal">Final Relief / Disposal</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-neutral-700 uppercase mb-1">Event Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., IO Meeting with Complainant / Statements Recorded"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  className="w-full p-2 border border-neutral-300 rounded font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 uppercase mb-1">Details & Remarks</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe what occurred, names of officers spoken to, copies exchanged..."
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                  className="w-full p-2 border border-neutral-300 rounded"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 uppercase mb-1">Document / Order Reference (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g., Notice # 418/2026 or Postal Slip"
                  value={eventDocRef}
                  onChange={(e) => setEventDocRef(e.target.value)}
                  className="w-full p-2 border border-neutral-300 rounded font-mono"
                />
              </div>

              <div className="pt-3 border-t border-neutral-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddEventModalOpen(false)}
                  className="px-3 py-1.5 rounded bg-neutral-100 text-neutral-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-[#e60000] text-white font-extrabold uppercase tracking-wider hover:bg-[#cc0000]"
                >
                  Add Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Printable Legal Dossier Preview */}
      {dossierPrintComplaint && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-3xl rounded-[8px] shadow-2xl border border-neutral-300 p-6 sm:p-8 space-y-6 my-8 max-h-[90vh] overflow-y-auto font-serif">
            {/* Header */}
            <div className="flex items-center justify-between border-b-2 border-[#25282b] pb-4 font-sans">
              <div>
                <div className="text-xs font-black uppercase tracking-widest text-[#e60000]">SAKSHAM PORTAL &bull; LEGAL CASE DOSSIER</div>
                <h2 className="text-xl font-black text-[#25282b] mt-1">{dossierPrintComplaint.caseTitle}</h2>
                <div className="text-xs text-neutral-600 mt-0.5">
                  Generated on {new Date().toLocaleDateString('en-IN')} &bull; Status: {dossierPrintComplaint.status}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 bg-[#25282b] text-white text-xs font-sans font-bold rounded flex items-center gap-1"
                >
                  <Printer className="w-3.5 h-3.5" /> Print Dossier
                </button>
                <button
                  onClick={() => setDossierPrintComplaint(null)}
                  className="p-1.5 text-neutral-400 hover:text-neutral-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Case Parameters Grid */}
            <div className="grid grid-cols-2 gap-4 text-xs font-sans border p-4 rounded bg-neutral-50 border-neutral-200">
              <div><strong>Authority Addressed:</strong> {dossierPrintComplaint.authorityAddressed}</div>
              <div><strong>Police Station:</strong> {dossierPrintComplaint.policeStation} ({dossierPrintComplaint.cityState})</div>
              <div><strong>Filing Date:</strong> {dossierPrintComplaint.filingDate}</div>
              <div><strong>Statutory Window:</strong> {dossierPrintComplaint.statutoryDeadlineDays} Days</div>
              <div><strong>Speed Post / Ref #:</strong> {dossierPrintComplaint.trackingNumber || 'N/A'}</div>
              <div><strong>Station GD #:</strong> {dossierPrintComplaint.gdNumber || 'N/A'}</div>
              <div><strong>IO Name / Desk:</strong> {dossierPrintComplaint.ioName || 'Pending'}</div>
              <div><strong>IO Contact:</strong> {dossierPrintComplaint.ioContact || 'N/A'}</div>
            </div>

            {/* Summary */}
            <div className="space-y-1 text-sm font-sans">
              <h3 className="font-bold text-xs uppercase tracking-wider text-neutral-700">Statement of Allegation & Grounds:</h3>
              <p className="text-neutral-800 leading-relaxed bg-white border p-3 rounded text-xs">
                {dossierPrintComplaint.incidentSummary}
              </p>
            </div>

            {/* Evidence List */}
            <div className="space-y-1 text-sm font-sans">
              <h3 className="font-bold text-xs uppercase tracking-wider text-neutral-700">Documentary Evidence on Record:</h3>
              <ul className="list-disc list-inside text-xs text-neutral-700 space-y-1 bg-white border p-3 rounded">
                {dossierPrintComplaint.evidenceLogged.map((ev, i) => (
                  <li key={i}>{ev}</li>
                ))}
              </ul>
            </div>

            {/* Chronology Table */}
            <div className="space-y-1 text-sm font-sans">
              <h3 className="font-bold text-xs uppercase tracking-wider text-neutral-700">Case Chronology & Diary Logs:</h3>
              <table className="w-full text-xs border border-neutral-300 text-left">
                <thead className="bg-neutral-100 border-b border-neutral-300 font-bold">
                  <tr>
                    <th className="p-2 border-r border-neutral-300 w-24">Date</th>
                    <th className="p-2 border-r border-neutral-300">Action / Event</th>
                    <th className="p-2 border-r border-neutral-300">Description</th>
                    <th className="p-2 w-28">Proof Ref</th>
                  </tr>
                </thead>
                <tbody>
                  {dossierPrintComplaint.timeline.map((ev, i) => (
                    <tr key={i} className="border-b border-neutral-200">
                      <td className="p-2 font-mono border-r border-neutral-300">{ev.date}</td>
                      <td className="p-2 font-bold border-r border-neutral-300">{ev.title}</td>
                      <td className="p-2 border-r border-neutral-300">{ev.description}</td>
                      <td className="p-2 font-mono text-[10px]">{ev.documentRef || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Statutory Compliance Note */}
            <div className="p-3 bg-neutral-100 border border-neutral-300 rounded text-[11px] font-sans text-neutral-700">
              <strong>Statutory References:</strong> Bharatiya Nagarik Suraksha Sanhita (BNSS 2023) Sections 173(1), 173(4), 175(3) & Supreme Court Mandates in <em>Lalita Kumari (2014)</em> and <em>Prakash Singh (2006)</em>. This dossier documents strict compliance with statutory escalation prerequisites prior to moving the Court of Judicial Magistrate First Class.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

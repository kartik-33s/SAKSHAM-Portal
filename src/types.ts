export type UrgencyLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'INFO';

export interface SpokenScript {
  english: string;
  hindi: string;
  hinglish: string;
  contextNote?: string;
}

export interface LegalSectionRef {
  title: string;
  bnssSection?: string;
  crpcSection?: string;
  bnsSection?: string;
  ipcSection?: string;
  constitutionalArticle?: string;
  landmarkJudgment?: string;
  summary: string;
}

export interface ComplaintRoute {
  authority: string;
  level: string; // e.g. 'First Escalation', 'Constitutional Body', 'Disciplinary Authority'
  legalProvision: string;
  howToReach: string;
  documentRequired: string[];
}

export interface PoliceSituation {
  id: string;
  title: string;
  hindiTitle: string;
  category: 'traffic' | 'arrest' | 'fir' | 'search' | 'assault' | 'bribe' | 'women_juvenile' | 'cyber' | 'rights_privacy' | 'police_station' | 'protest';
  urgency: UrgencyLevel;
  iconName: string;
  thirtySecondSummary: string;
  immediateActions: string[];
  thingsNotToDo: string[];
  spokenScript: SpokenScript;
  legalRights: LegalSectionRef[];
  complaintRoutes: ComplaintRoute[];
  officialSources: {
    sourceName: string;
    citation: string;
    url?: string;
  }[];
}

export interface HelplineItem {
  name: string;
  hindiName: string;
  number: string;
  description: string;
  coverage: string;
  category: 'emergency' | 'women' | 'corruption' | 'legal_aid' | 'human_rights' | 'cyber';
  isTollFree: boolean;
}

export interface StateAuthority {
  stateName: string;
  policeComplaintsAuthority: {
    name: string;
    address: string;
    phone?: string;
    email?: string;
    website?: string;
  };
  antiCorruptionBureau: {
    name: string;
    tollFree: string;
    email?: string;
    website?: string;
  };
  legalServicesAuthority: {
    name: string;
    tollFree: string;
    website?: string;
  };
}

export interface AISituationResponse {
  summary: string;
  urgencyLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  thirtySecondActions: string[];
  exactWhatToSay: SpokenScript;
  legalRightsAndSections: {
    right: string;
    section: string;
    explanation: string;
  }[];
  doNotDo: string[];
  whereToComplain: {
    authority: string;
    legalBasis: string;
    contactInfo: string;
  }[];
}

export interface ComplaintDraftRequest {
  complaintType: string;
  incidentDetails: {
    date: string;
    location: string;
    description: string;
    evidence: string;
  };
  complainantDetails: {
    name: string;
    address: string;
    contact: string;
  };
  officerDetails: string;
}

export interface ComplaintDraftResult {
  title: string;
  authorityAddressed: string;
  subjectLine: string;
  fullLetterText: string;
  nextFilingSteps: string[];
  applicableSections: string[];
}

export type ComplaintStatus = 
  | 'DRAFTED'
  | 'DISPATCHED_POST'
  | 'GD_ENTERED'
  | 'UNDER_INQUIRY'
  | 'STATUTORY_OVERDUE'
  | 'FIR_REGISTERED'
  | 'SPCA_HEARING'
  | 'CLOSED';

export interface ComplaintTimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'filing' | 'postal' | 'inquiry' | 'hearing' | 'notice' | 'disposal';
  documentRef?: string;
}

export interface TrackedComplaint {
  id: string;
  caseTitle: string;
  complaintType: string;
  authorityAddressed: string;
  policeStation: string;
  cityState: string;
  filingDate: string;
  statutoryDeadlineDays: number;
  status: ComplaintStatus;
  trackingNumber?: string; // Speed post consignment or online grievance ref
  gdNumber?: string; // General Diary / Daily Diary entry ref
  firNumber?: string; // e.g. "FIR No. 412/2026"
  ioName?: string; // Investigating Officer name
  ioContact?: string;
  incidentSummary: string;
  evidenceLogged: string[];
  timeline: ComplaintTimelineEvent[];
  nextActionDate?: string;
  nextActionNote?: string;
  lastUpdated: string;
  isSample?: boolean;
}

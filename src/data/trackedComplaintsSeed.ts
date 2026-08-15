import { TrackedComplaint } from '../types';

export const INITIAL_SAMPLE_COMPLAINTS: TrackedComplaint[] = [
  {
    id: 'saksham-case-001',
    caseTitle: 'FIR Refusal Representation to DCP South — Theft of Laptop & Extortion',
    complaintType: 'FIR Refusal Representation (Sec 173(4) BNSS / 154(3) CrPC)',
    authorityAddressed: 'The Deputy Commissioner of Police (DCP), South District',
    policeStation: 'Hauz Khas Police Station',
    cityState: 'New Delhi, Delhi',
    filingDate: '2026-08-01',
    statutoryDeadlineDays: 14,
    status: 'STATUTORY_OVERDUE',
    trackingNumber: 'ED829104821IN (India Post Speed Post)',
    gdNumber: 'GD Entry No. 44A dt. 30/07/2026',
    ioName: 'Inspector R.K. Sharma / ACP Grievance Cell',
    ioContact: '011-2651XXXX / dcp-south@delhipolice.gov.in',
    incidentSummary: 'SHO refused to register FIR for stolen laptop and demanded Rs 5000 for "station charges". Stamped copy of written complaint withheld, only verbal GD reference provided.',
    evidenceLogged: [
      'Original written complaint copy dated 30/07/2026',
      'Speed Post Postal Receipt (Consignment # ED829104821IN) with delivery confirmation',
      'Audio recording of Duty Officer refusing to provide formal FIR copy',
      'Laptop invoice & serial number proof'
    ],
    timeline: [
      {
        id: 't1',
        date: '2026-07-30',
        title: 'Approached Hauz Khas PS for FIR',
        description: 'Submitted physical complaint. Duty officer made GD 44A but refused to register formal FIR citing "investigation pending".',
        type: 'filing',
        documentRef: 'GD 44A Receipt'
      },
      {
        id: 't2',
        date: '2026-08-01',
        title: 'Speed Post Dispatched to DCP South under Sec 173(4) BNSS',
        description: 'Sent detailed representation along with Supreme Court Lalita Kumari judgment citations and postal acknowledgment.',
        type: 'postal',
        documentRef: 'Postal Slip ED829104821IN'
      },
      {
        id: 't3',
        date: '2026-08-03',
        title: 'Speed Post Delivered at DCP Office',
        description: 'India Post tracking confirmed delivery at DCP South Dispatch Desk at 11:42 AM.',
        type: 'postal'
      },
      {
        id: 't4',
        date: '2026-08-15',
        title: '14-Day Statutory Enquiry Window Expired with No FIR',
        description: 'Over 14 days elapsed since dispatch with no FIR copy or communication from DCP office. Statutory trigger for Section 175(3) BNSS application before Judicial Magistrate.',
        type: 'notice'
      }
    ],
    nextActionDate: '2026-08-18',
    nextActionNote: 'File Application under Section 175(3) BNSS / 156(3) CrPC before Saket Metropolitan Magistrate Court seeking direction for FIR registration.',
    lastUpdated: '2026-08-15',
    isSample: true
  },
  {
    id: 'saksham-case-002',
    caseTitle: 'Petition for De-freezing Bank Account Liens — Cyber Cell Notice',
    complaintType: 'Application for Defreezing Bank Account (Sec 106 BNSS / 102 CrPC)',
    authorityAddressed: 'The Chief Judicial Magistrate / Cyber Crime Police Station',
    policeStation: 'Cyber Crime Police Station, Sector 20',
    cityState: 'Noida, Uttar Pradesh',
    filingDate: '2026-08-08',
    statutoryDeadlineDays: 30,
    status: 'UNDER_INQUIRY',
    trackingNumber: 'CYBER/UP/2026/98214',
    gdNumber: 'Cyber Portal Ref # 2026-UP-48291',
    ioName: 'Sub-Inspector Ankit Verma (Cyber Cell)',
    ioContact: '0120-248XXXX',
    incidentSummary: 'Savings bank account placed under debit freeze following a dispute in a P2P crypto/freelance transaction of Rs 8,400. Entire balance of Rs 1,42,000 locked by bank under Sec 102 CrPC notice.',
    evidenceLogged: [
      'Bank Debit Freeze Intimation Letter & Transaction ID',
      'P2P crypto exchange escrow completion invoice & KYC proof',
      'Bank statement showing legitimate freelance income sources',
      'Representation letter sent to IO offering lien only on disputed amount of Rs 8,400'
    ],
    timeline: [
      {
        id: 't1',
        date: '2026-08-07',
        title: 'Bank Account Debit Blocked',
        description: 'Received SMS from HDFC Bank regarding police freeze order from Cyber Cell Noida under Section 106 BNSS / 102 CrPC.',
        type: 'notice'
      },
      {
        id: 't2',
        date: '2026-08-08',
        title: 'Submitted Representation to IO with Invoices',
        description: 'Emailed and hand-delivered legal reply establishing bonafide third-party status and requesting unfreezing of excess balance.',
        type: 'filing',
        documentRef: 'Ack # CYBER-UP-98214'
      },
      {
        id: 't3',
        date: '2026-08-11',
        title: 'IO Verified Ledger Invoices',
        description: 'IO Sub-Inspector Verma confirmed on phone that clarification letter is forwarded to Bank Nodal Officer for partial lien restricted to Rs 8,400.',
        type: 'inquiry'
      }
    ],
    nextActionDate: '2026-08-20',
    nextActionNote: 'Follow up with Bank Nodal Officer for execution of partial lien unfreezing letter.',
    lastUpdated: '2026-08-12',
    isSample: true
  },
  {
    id: 'saksham-case-003',
    caseTitle: 'Complaint to State Police Complaints Authority — Physical Assault at Barricade',
    complaintType: 'Police Misconduct & Abuse of Power (Prakash Singh SC Mandate)',
    authorityAddressed: 'The Chairman, State Police Complaints Authority (SPCA)',
    policeStation: 'Koramangala Police Station',
    cityState: 'Bengaluru, Karnataka',
    filingDate: '2026-08-05',
    statutoryDeadlineDays: 60,
    status: 'SPCA_HEARING',
    trackingNumber: 'SPCA/KA/COMP/2026/419',
    ioName: 'Joint Secretary / Registrar, SPCA',
    ioContact: 'spca-kar@nic.in / 080-2294XXXX',
    incidentSummary: 'Traffic Sub-Inspector snatched car ignition keys, used verbal abuse and pushed citizen for questioning an arbitrary Rs 2000 cash demand at late night barricade without e-challan.',
    evidenceLogged: [
      'Dashcam video footage of key-snatching and verbal threats (Timestamp: 23:14:02)',
      'Government hospital MLC (Medico-Legal Certificate) for wrist contusion',
      'Names and vehicle numbers of two eyewitnesses who were stopped at same barricade',
      'Affidavit sworn before Notary Public'
    ],
    timeline: [
      {
        id: 't1',
        date: '2026-08-04',
        title: 'Barricade Assault Incident & MLC at Hospital',
        description: 'Incident occurred at 11:15 PM. Obtained MLC at Victoria Hospital regarding physical assault injury.',
        type: 'filing',
        documentRef: 'MLC No. 8812/2026'
      },
      {
        id: 't2',
        date: '2026-08-05',
        title: 'Complaint Registered at SPCA Karnataka',
        description: 'Filed sworn affidavit complaint along with pen-drive containing dashcam video footage.',
        type: 'filing',
        documentRef: 'SPCA Ack # 419'
      },
      {
        id: 't3',
        date: '2026-08-10',
        title: 'Notice Issued to Concerned Police Officers',
        description: 'SPCA bench issued notice to Sub-Inspector and DCP Traffic East to preserve CCTV and submit explanation within 15 days.',
        type: 'notice'
      }
    ],
    nextActionDate: '2026-08-26',
    nextActionNote: 'Attend preliminary hearing before SPCA Bench at 11:00 AM.',
    lastUpdated: '2026-08-14',
    isSample: true
  }
];

export const STORAGE_KEY_COMPLAINTS = 'saksham_portal_tracked_complaints_v1';

export function getSavedComplaints(): TrackedComplaint[] {
  if (typeof window === 'undefined') return INITIAL_SAMPLE_COMPLAINTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_COMPLAINTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_COMPLAINTS, JSON.stringify(INITIAL_SAMPLE_COMPLAINTS));
      return INITIAL_SAMPLE_COMPLAINTS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return INITIAL_SAMPLE_COMPLAINTS;
  } catch {
    return INITIAL_SAMPLE_COMPLAINTS;
  }
}

export function saveComplaints(complaints: TrackedComplaint[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_COMPLAINTS, JSON.stringify(complaints));
  } catch (err) {
    console.error('Failed to save tracked complaints to localStorage', err);
  }
}

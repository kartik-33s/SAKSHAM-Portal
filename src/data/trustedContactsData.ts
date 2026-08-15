export interface TrustedContact {
  id: string;
  name: string;
  relationship: 'Family' | 'Lawyer' | 'Trusted Contact' | 'Friend' | 'Colleague';
  phone: string;
  email?: string;
  notes?: string;
  isDefaultEnabled: boolean;
}

export const DEFAULT_TRUSTED_CONTACTS: TrustedContact[] = [
  {
    id: 'tc-family-1',
    name: 'Primary Family Member (Home)',
    relationship: 'Family',
    phone: '',
    email: '',
    notes: 'Immediate notification in case of detention or vehicle seizure.',
    isDefaultEnabled: true
  },
  {
    id: 'tc-lawyer-1',
    name: 'Criminal Defense Counsel / Legal Aid',
    relationship: 'Lawyer',
    phone: '15100',
    email: 'legalaid.helpline@nalsa.gov.in',
    notes: 'DLSA / Private Advocate representation under Art 22(1) & Sec 41D CrPC / Sec 38 BNSS.',
    isDefaultEnabled: true
  },
  {
    id: 'tc-trusted-1',
    name: 'Trusted Contact / Colleague',
    relationship: 'Trusted Contact',
    phone: '',
    email: '',
    notes: 'Secondary emergency contact to preserve evidence and witness timeline.',
    isDefaultEnabled: true
  }
];

const CONTACTS_STORAGE_KEY = 'saksham_trusted_contacts_v1';

export function getSavedTrustedContacts(): TrustedContact[] {
  try {
    const saved = localStorage.getItem(CONTACTS_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to parse trusted contacts from localStorage', e);
  }
  return DEFAULT_TRUSTED_CONTACTS;
}

export function saveTrustedContacts(contacts: TrustedContact[]): void {
  try {
    localStorage.setItem(CONTACTS_STORAGE_KEY, JSON.stringify(contacts));
  } catch (e) {
    console.error('Failed to save trusted contacts to localStorage', e);
  }
}

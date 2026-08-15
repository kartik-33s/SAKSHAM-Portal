import { HelplineItem, StateAuthority } from '../types';

export const NATIONAL_HELPLINES: HelplineItem[] = [
  {
    name: 'National Emergency Helpline (All-in-One ERSS)',
    hindiName: 'राष्ट्रीय आपातकालीन हेल्पलाइन',
    number: '112',
    description: 'Single unified emergency response number across India for Police, Fire, and Ambulance.',
    coverage: 'Pan-India (24x7)',
    category: 'emergency',
    isTollFree: true
  },
  {
    name: 'Anti-Corruption Bureau / Vigilance Helpline',
    hindiName: 'भ्रष्टाचार विरोधी हेल्पलाइन',
    number: '1064',
    description: 'National/State Anti-Corruption helpline to report police bribe demands, extortion, and bribery traps.',
    coverage: 'All States & UTs (24x7)',
    category: 'corruption',
    isTollFree: true
  },
  {
    name: 'NALSA Free Legal Aid Helpline',
    hindiName: 'नालसा निःशुल्क कानूनी सहायता',
    number: '15100',
    description: 'National Legal Services Authority helpline providing immediate free legal counsel for arrested/detained citizens.',
    coverage: 'Pan-India (24x7)',
    category: 'legal_aid',
    isTollFree: true
  },
  {
    name: 'Women in Distress Helpline',
    hindiName: 'महिला आपातकालीन हेल्पलाइन',
    number: '1091',
    description: '24-hour emergency police assistance for women facing harassment, unlawful custody, or domestic violence.',
    coverage: 'Pan-India (24x7)',
    category: 'women',
    isTollFree: true
  },
  {
    name: 'National Commission for Women (NCW 24x7)',
    hindiName: 'राष्ट्रीय महिला आयोग',
    number: '7827170170',
    description: 'Dedicated 24x7 NCW emergency cell for complaints of police harassment, sexual assault, and custody violations.',
    coverage: 'Pan-India',
    category: 'women',
    isTollFree: false
  },
  {
    name: 'National Human Rights Commission (NHRC)',
    hindiName: 'राष्ट्रीय मानवाधिकार आयोग',
    number: '14433',
    description: 'Direct NHRC helpline for illegal detention, custodial torture, and encounter complaints (Alt: 1800-11-9595).',
    coverage: 'Pan-India (Office Hours / Online 24x7)',
    category: 'human_rights',
    isTollFree: true
  },
  {
    name: 'National Cyber Crime Helpline',
    hindiName: 'राष्ट्रीय साइबर अपराध हेल्पलाइन',
    number: '1930',
    description: 'Citizen Financial Cyber Fraud Reporting & police cyber complaint coordination.',
    coverage: 'Pan-India (24x7)',
    category: 'cyber',
    isTollFree: true
  },
  {
    name: 'Childline (Child in Distress / Juvenile Protection)',
    hindiName: 'चाइल्डलाइन हेल्पलाइन',
    number: '1098',
    description: 'Emergency assistance for minors facing police detention, abuse, or legal violations.',
    coverage: 'Pan-India (24x7)',
    category: 'emergency',
    isTollFree: true
  },
  {
    name: 'CBI Anti-Corruption Toll-Free',
    hindiName: 'सीबीआई भ्रष्टाचार विरोधी सेल',
    number: '1800-113-444',
    description: 'Report corruption involving central government police, union territories, railways, or central agencies.',
    coverage: 'Pan-India (24x7)',
    category: 'corruption',
    isTollFree: true
  }
];

export const STATE_DIRECTORIES: StateAuthority[] = [
  {
    stateName: 'Delhi (NCT)',
    policeComplaintsAuthority: {
      name: 'Delhi Police Complaints Authority (PCA)',
      address: 'Room No. 308, 3rd Floor, B-Wing, Vikas Bhawan, New Delhi - 110002',
      phone: '011-23378484',
      email: 'pca.delhi@nic.in',
      website: 'https://pca.delhigovt.nic.in'
    },
    antiCorruptionBureau: {
      name: 'Anti-Corruption Branch (ACB), Govt. of NCT of Delhi',
      tollFree: '1064 / 011-23812905',
      email: 'acb-delhi@nic.in',
      website: 'https://acb.delhi.gov.in'
    },
    legalServicesAuthority: {
      name: 'Delhi State Legal Services Authority (DSLSA)',
      tollFree: '1516 / 15100',
      website: 'https://dslsa.org'
    }
  },
  {
    stateName: 'Maharashtra',
    policeComplaintsAuthority: {
      name: 'Maharashtra State Police Complaints Authority',
      address: 'Cooperage Telephone Exchange Bldg, Maharshi Karve Road, Nariman Point, Mumbai - 400021',
      phone: '022-22820057',
      email: 'spca.mumbai@gov.in',
      website: 'https://spca.maharashtra.gov.in'
    },
    antiCorruptionBureau: {
      name: 'Anti-Corruption Bureau, Maharashtra',
      tollFree: '1064 / 022-24921212',
      email: 'acbwebmail@mahapolice.gov.in',
      website: 'https://acbmaharashtra.gov.in'
    },
    legalServicesAuthority: {
      name: 'Maharashtra State Legal Services Authority (MSLSA)',
      tollFree: '15100 / 022-22691358',
      website: 'https://legalservices.maharashtra.gov.in'
    }
  },
  {
    stateName: 'Karnataka',
    policeComplaintsAuthority: {
      name: 'Karnataka State Police Complaints Authority',
      address: 'No. 54, 1st Floor, MS Building, Dr. Ambedkar Veedhi, Bengaluru - 560001',
      phone: '080-22353841',
      email: 'spca-kar@nic.in'
    },
    antiCorruptionBureau: {
      name: 'Karnataka Lokayukta / Anti-Corruption Wing',
      tollFree: '1064 / 080-22342080',
      email: 'lokayukta-ka@nic.in',
      website: 'https://lokayukta.kar.nic.in'
    },
    legalServicesAuthority: {
      name: 'Karnataka State Legal Services Authority (KSLSA)',
      tollFree: '15100 / 080-22111725',
      website: 'https://kslsa.kar.nic.in'
    }
  },
  {
    stateName: 'Uttar Pradesh',
    policeComplaintsAuthority: {
      name: 'UP State Police Complaints Authority',
      address: 'Police Headquarters, 4th Floor, Signature Building, Gomti Nagar Extension, Lucknow - 226010',
      phone: '0522-2239400'
    },
    antiCorruptionBureau: {
      name: 'UP Anti-Corruption Organization (ACO) & Vigilance',
      tollFree: '1064 / 9454402484',
      email: 'acohq-up@nic.in',
      website: 'https://uppolice.gov.in'
    },
    legalServicesAuthority: {
      name: 'UP State Legal Services Authority (UPSLSA)',
      tollFree: '15100 / 0522-2286395',
      website: 'https://upslsa.up.nic.in'
    }
  },
  {
    stateName: 'Tamil Nadu',
    policeComplaintsAuthority: {
      name: 'Tamil Nadu Police Complaints Authority',
      address: 'Police Headquarters, Dr. Radhakrishnan Salai, Mylapore, Chennai - 600004',
      phone: '044-28448000'
    },
    antiCorruptionBureau: {
      name: 'Directorate of Vigilance and Anti-Corruption (DVAC)',
      tollFree: '1064 / 044-22321085',
      email: 'dvac@nic.in',
      website: 'https://dvac.tn.gov.in'
    },
    legalServicesAuthority: {
      name: 'Tamil Nadu State Legal Services Authority (TNSLSA)',
      tollFree: '15100 / 044-25342834',
      website: 'https://tnlegal-services.nic.in'
    }
  },
  {
    stateName: 'West Bengal',
    policeComplaintsAuthority: {
      name: 'West Bengal Police Complaints Authority',
      address: 'Bhabani Bhavan, Alipore, Kolkata - 700027',
      phone: '033-24791000'
    },
    antiCorruptionBureau: {
      name: 'Directorate of Anti-Corruption Branch, West Bengal',
      tollFree: '1064 / 033-22145555',
      email: 'acb-wb@nic.in'
    },
    legalServicesAuthority: {
      name: 'West Bengal State Legal Services Authority (SLSA)',
      tollFree: '15100 / 033-22484838'
    }
  },
  {
    stateName: 'Telangana',
    policeComplaintsAuthority: {
      name: 'Telangana State Police Complaints Authority',
      address: 'DGP Office Complex, Lakdikapool, Hyderabad - 500004',
      phone: '040-23230191'
    },
    antiCorruptionBureau: {
      name: 'Telangana Anti-Corruption Bureau (ACB)',
      tollFree: '1064 / 040-23235081',
      email: 'dgtsacb@telangana.gov.in',
      website: 'https://acb.telangana.gov.in'
    },
    legalServicesAuthority: {
      name: 'Telangana State Legal Services Authority',
      tollFree: '15100 / 040-23446700'
    }
  },
  {
    stateName: 'Rajasthan',
    policeComplaintsAuthority: {
      name: 'Rajasthan State Police Complaints Authority',
      address: 'Police Headquarters, Lal Kothi, Jaipur - 302015',
      phone: '0141-2606666'
    },
    antiCorruptionBureau: {
      name: 'Anti-Corruption Bureau (ACB), Rajasthan',
      tollFree: '1064 / 1800-180-6124 / WhatsApp 9413502834',
      email: 'acb-raj@nic.in',
      website: 'https://acbrajasthan.gov.in'
    },
    legalServicesAuthority: {
      name: 'Rajasthan State Legal Services Authority (RSLSA)',
      tollFree: '15100 / 0141-2227481'
    }
  }
];

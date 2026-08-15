export interface DistrictCourtInfo {
  name: string;
  location: string;
  jurisdiction: string;
  magistrateCourtType: 'Chief Metropolitan Magistrate (CMM) / MM' | 'Chief Judicial Magistrate (CJM) / JMFC';
  eCourtsCode?: string;
  eCourtsPortalUrl: string;
  courtComplexAddress: string;
  legalAidFrontOfficePhone?: string;
  filingProcedures: string[];
}

export interface LegalAidCenterInfo {
  centerName: string;
  authorityType: 'SLSA' | 'DLSA' | 'TLSC' | 'HCLSC';
  address: string;
  helpline: string;
  email: string;
  website: string;
  freeLegalAidEligibility: string[];
  keyServices: string[];
}

export interface PoliceComplaintAuthorityInfo {
  authorityName: string;
  authorityLevel: 'State Level (SPCA)' | 'District Level (DPCA)' | 'Police Oversight Commission';
  chairpersonRank: string;
  address: string;
  phone: string;
  email: string;
  onlineGrievancePortal?: string;
  jurisdictionOffences: string[];
  howToLodgeComplaint: string[];
}

export interface StateLegalData {
  stateCode: string;
  stateName: string;
  hindiName: string;
  capital: string;
  policeComplaintsAuthority: PoliceComplaintAuthorityInfo;
  stateLegalServicesAuthority: LegalAidCenterInfo;
  majorDistricts: {
    districtName: string;
    dlsa: {
      address: string;
      phone: string;
      email: string;
    };
    districtCourt: DistrictCourtInfo;
  }[];
  stateAntiCorruptionVigilance: {
    agencyName: string;
    tollFree: string;
    website: string;
  };
  specialStateRules?: string[];
}

export const STATE_LEGAL_DATABASE: Record<string, StateLegalData> = {
  'DL': {
    stateCode: 'DL',
    stateName: 'Delhi (NCT)',
    hindiName: 'दिल्ली',
    capital: 'New Delhi',
    policeComplaintsAuthority: {
      authorityName: 'Police Complaints Authority, GNCT of Delhi',
      authorityLevel: 'State Level (SPCA)',
      chairpersonRank: 'Hon\'ble Retired Judge of Delhi High Court',
      address: 'Room No. 501-507, 5th Floor, Vikas Bhawan-I, Civil Lines, Delhi - 110054',
      phone: '011-23812066 / 011-23812067',
      email: 'pca.delhi@nic.in',
      onlineGrievancePortal: 'https://pca.delhigovt.nic.in',
      jurisdictionOffences: [
        'Custodial death or severe grievous hurt in police custody',
        'Rape or attempt to commit rape by police personnel',
        'Extortion, land grabbing, or bribery by ACP / DCP / Inspector ranks',
        'Illegal arrest and detention without compliance with D.K. Basu guidelines',
        'Willful refusal to register FIRs in cognizable crimes'
      ],
      howToLodgeComplaint: [
        'File an affidavit-backed petition in English or Hindi addressed to Chairperson, PCA.',
        'Attach copy of refusal/station GD entry and Speed Post proof to DCP South/North.',
        'Submit in person or via Speed Post to Vikas Bhawan-I, Civil Lines, Delhi - 110054.'
      ]
    },
    stateLegalServicesAuthority: {
      centerName: 'Delhi State Legal Services Authority (DSLSA)',
      authorityType: 'SLSA',
      address: 'Central Office, Pre-Fab Building, Patiala House Courts Complex, New Delhi - 110001',
      helpline: '1516 (24x7 Delhi Toll-Free) / 15100 (National NALSA)',
      email: 'dslsa-phc@nic.in',
      website: 'https://dslsa.org',
      freeLegalAidEligibility: [
        'Women and Children (regardless of income limit - Sec 12 LSA Act)',
        'Members of SC / ST communities',
        'Persons in police or judicial custody',
        'Victims of trafficking or begar (Art 23)',
        'Annual income below ₹3,00,000/- for general citizens in Delhi'
      ],
      keyServices: [
        'Free criminal defense lawyer appointed for bail & remand hearings',
        'Assistance in filing Sec 175(3) BNSS petitions for FIR registration',
        'Legal Aid Front Offices situated inside all Delhi District Court complexes',
        'Representation before Delhi Police Special Cell & Lok Adalat mediation'
      ]
    },
    majorDistricts: [
      {
        districtName: 'New Delhi / Central',
        dlsa: {
          address: 'Legal Aid Front Office, Ground Floor, Patiala House Courts, New Delhi - 110001',
          phone: '011-23384781',
          email: 'dlsa.newdelhi@nic.in'
        },
        districtCourt: {
          name: 'Patiala House District Courts Complex',
          location: 'India Gate, New Delhi',
          jurisdiction: 'New Delhi Police District, Parliament Street, Chanakyapuri, Connaught Place, Tilak Marg',
          magistrateCourtType: 'Chief Metropolitan Magistrate (CMM) / MM',
          eCourtsPortalUrl: 'https://districts.ecourts.gov.in/newdelhi',
          courtComplexAddress: 'Patiala House Court Complex, India Gate, New Delhi - 110001',
          legalAidFrontOfficePhone: '011-23384781',
          filingProcedures: [
            'File Application under Section 175(3) BNSS before CMM / MM duty court at Counter 4.',
            'Include affidavit, complaint copy, Speed Post tracking slip, and Lalita Kumari citation.'
          ]
        }
      },
      {
        districtName: 'South Delhi',
        dlsa: {
          address: 'South DLSA Front Office, Saket District Courts Complex, New Delhi - 110017',
          phone: '011-29562440',
          email: 'dlsa.south@nic.in'
        },
        districtCourt: {
          name: 'Saket District Courts Complex',
          location: 'Saket, New Delhi',
          jurisdiction: 'Hauz Khas, Malviya Nagar, Saket, Mehrauli, Greater Kailash, Defence Colony, Neb Sarai',
          magistrateCourtType: 'Chief Metropolitan Magistrate (CMM) / MM',
          eCourtsPortalUrl: 'https://districts.ecourts.gov.in/southdelhi',
          courtComplexAddress: 'Saket District Court Complex, Press Enclave Road, Saket, New Delhi - 110017',
          legalAidFrontOfficePhone: '011-29562440',
          filingProcedures: [
            'E-filing and physical counter available at Saket Courts Filing Section (Ground Floor).',
            'Urgent bail applications listed before Metropolitan Magistrate on same day if filed before 11:30 AM.'
          ]
        }
      },
      {
        districtName: 'South-West Delhi',
        dlsa: {
          address: 'South-West DLSA, Admin Block, Dwarka District Courts, Sector 10, Dwarka, New Delhi - 110075',
          phone: '011-28041480',
          email: 'dlsa.southwest@nic.in'
        },
        districtCourt: {
          name: 'Dwarka District Courts Complex',
          location: 'Sector 10, Dwarka, New Delhi',
          jurisdiction: 'Dwarka (North/South), Palam Village, Uttam Nagar, Najafgarh, IGI Airport, Kapashera',
          magistrateCourtType: 'Chief Metropolitan Magistrate (CMM) / MM',
          eCourtsPortalUrl: 'https://districts.ecourts.gov.in/southwestdelhi',
          courtComplexAddress: 'Dwarka Courts Complex, Sector 10, Dwarka, New Delhi - 110075',
          legalAidFrontOfficePhone: '011-28041480',
          filingProcedures: [
            'Magistrate counter located at 2nd Floor Admin Wing.',
            'Direct access to Legal Aid Remand Advocate for detained persons.'
          ]
        }
      },
      {
        districtName: 'East / Shahdara / North-East Delhi',
        dlsa: {
          address: 'East DLSA Front Office, Karkardooma Courts Complex, Delhi - 110032',
          phone: '011-22306660',
          email: 'dlsa.east@nic.in'
        },
        districtCourt: {
          name: 'Karkardooma District Courts Complex',
          location: 'Shahdara, Delhi',
          jurisdiction: 'Preet Vihar, Laxmi Nagar, Anand Vihar, Mayur Vihar, Kalyanpuri, Seelampur, Nand Nagri',
          magistrateCourtType: 'Chief Metropolitan Magistrate (CMM) / MM',
          eCourtsPortalUrl: 'https://districts.ecourts.gov.in/eastdelhi',
          courtComplexAddress: 'Karkardooma Court Complex, Maharaja Surajmal Marg, Delhi - 110032',
          legalAidFrontOfficePhone: '011-22306660',
          filingProcedures: [
            'Filing Counter at Block B, Ground Floor.',
            'Special Court for Anti-Corruption and Vigilance matters located in Block C.'
          ]
        }
      },
      {
        districtName: 'North / North-West Delhi',
        dlsa: {
          address: 'North-West DLSA, Rohini District Courts Complex, Sector 14, Rohini, Delhi - 110085',
          phone: '011-27554450',
          email: 'dlsa.northwest@nic.in'
        },
        districtCourt: {
          name: 'Rohini District Courts Complex',
          location: 'Sector 14, Rohini, Delhi',
          jurisdiction: 'Rohini, Prashant Vihar, Pitampura, Shalimar Bagh, Model Town, Ashok Vihar, Alipur, Narela',
          magistrateCourtType: 'Chief Metropolitan Magistrate (CMM) / MM',
          eCourtsPortalUrl: 'https://districts.ecourts.gov.in/northwestdelhi',
          courtComplexAddress: 'Rohini District Courts Complex, Outer Ring Road, Sector 14, Rohini, Delhi - 110085',
          legalAidFrontOfficePhone: '011-27554450',
          filingProcedures: [
            'Magistrate Filing Counter at Ground Floor Main Atrium.',
            'DLSA Legal Aid Helpdesk situated near Gate No. 2.'
          ]
        }
      }
    ],
    stateAntiCorruptionVigilance: {
      agencyName: 'Anti-Corruption Branch (ACB), Govt of NCT of Delhi',
      tollFree: '1064 / 011-23812905',
      website: 'https://acb.delhigovt.nic.in'
    }
  },
  'KA': {
    stateCode: 'KA',
    stateName: 'Karnataka',
    hindiName: 'कर्नाटक',
    capital: 'Bengaluru',
    policeComplaintsAuthority: {
      authorityName: 'State Police Complaints Authority (SPCA), Karnataka',
      authorityLevel: 'State Level (SPCA)',
      chairpersonRank: 'Hon\'ble Retired High Court Judge',
      address: '2nd Floor, Vikas Soudha / No. 1, Podium Block, Visvesvaraya Tower, Dr. Ambedkar Veedhi, Bengaluru - 560001',
      phone: '080-22942468 / 080-22032488',
      email: 'spca-kar@nic.in',
      onlineGrievancePortal: 'https://spca.karnataka.gov.in',
      jurisdictionOffences: [
        'Death or grievous hurt in police custody',
        'Rape, molestation, or assault of women/citizens',
        'Extortion, bribery, illegal seizure of vehicle keys/mobiles',
        'Refusal to register Zero FIR or cognizable complaint'
      ],
      howToLodgeComplaint: [
        'Submit affidavit complaint with audio/video/dashcam evidence to Registrar, SPCA Karnataka.',
        'District Police Complaints Authorities (DPCA) exist in each district headed by the Deputy Commissioner (DC).'
      ]
    },
    stateLegalServicesAuthority: {
      centerName: 'Karnataka State Legal Services Authority (KSLSA)',
      authorityType: 'SLSA',
      address: 'Nyaya Degula, 1st Floor, H. Siddaiah Road, Bengaluru - 560027',
      helpline: '080-22111730 / 15100 (NALSA)',
      email: 'kslsa.kar@nic.in',
      website: 'https://kslsa.kar.nic.in',
      freeLegalAidEligibility: [
        'Women, Children, SC/ST categories',
        'Persons in police custody or under arrest',
        'Annual income ceiling: ₹3,00,000/- for general category citizens'
      ],
      keyServices: [
        'Free remand advocate during 24-hour magistrate production (Art 22(1))',
        'Legal aid for bail in city and district courts',
        'Legal literacy and victim compensation assistance'
      ]
    },
    majorDistricts: [
      {
        districtName: 'Bengaluru Urban (City)',
        dlsa: {
          address: 'Bengaluru Urban DLSA, City Civil Court Complex, Opp. Cauvery Bhavan, Bengaluru - 560009',
          phone: '080-22238466',
          email: 'dlsa.bengaluru-urban@karnataka.gov.in'
        },
        districtCourt: {
          name: 'City Civil and Sessions Court / Chief Metropolitan Magistrate Court',
          location: 'K.G. Road / Nrupathunga Road, Bengaluru',
          jurisdiction: 'All Bengaluru City Police Stations (East, West, North, South, Central, Traffic Divisions)',
          magistrateCourtType: 'Chief Metropolitan Magistrate (CMM) / MM',
          eCourtsPortalUrl: 'https://districts.ecourts.gov.in/bengaluru',
          courtComplexAddress: 'City Civil Court Complex, KG Road, Bengaluru - 560009',
          legalAidFrontOfficePhone: '080-22238466',
          filingProcedures: [
            'Filing under Section 175(3) BNSS before CMM / Jurisdictional ACMM courts at Nrupathunga Road.',
            'CMM Court Complex has dedicated DLSA Remand Counsel on Duty.'
          ]
        }
      },
      {
        districtName: 'Mysuru',
        dlsa: {
          address: 'DLSA Mysore, Law Courts Complex, Krishnarajendra Boulevard, Mysuru - 570005',
          phone: '0821-2330130',
          email: 'dlsa.mysuru@karnataka.gov.in'
        },
        districtCourt: {
          name: 'District and Sessions Court, Mysuru',
          location: 'Krishnarajendra Boulevard, Mysuru',
          jurisdiction: 'Mysuru City and Rural Police Jurisdictions',
          magistrateCourtType: 'Chief Judicial Magistrate (CJM) / JMFC',
          eCourtsPortalUrl: 'https://districts.ecourts.gov.in/mysuru',
          courtComplexAddress: 'Law Courts Complex, KR Boulevard, Chamarajapuram, Mysuru - 570005',
          legalAidFrontOfficePhone: '0821-2330130',
          filingProcedures: [
            'Submit Section 175(3) BNSS petition to CJM Court at Main Building, Ground Floor.'
          ]
        }
      }
    ],
    stateAntiCorruptionVigilance: {
      agencyName: 'Karnataka Lokayukta / Lokayukta Police',
      tollFree: '1800-425-53333 / 080-22257038',
      website: 'https://lokayukta.kar.nic.in'
    }
  },
  'MH': {
    stateCode: 'MH',
    stateName: 'Maharashtra',
    hindiName: 'महाराष्ट्र',
    capital: 'Mumbai',
    policeComplaintsAuthority: {
      authorityName: 'Maharashtra State Police Complaints Authority (SPCA)',
      authorityLevel: 'State Level (SPCA)',
      chairpersonRank: 'Hon\'ble Retired High Court Judge',
      address: 'Cooperage Telephone Exchange Building, 7th Floor, Maharshi Karve Road, Nariman Point, Mumbai - 400021',
      phone: '022-22820040 / 022-22820042',
      email: 'spca-mah@gov.in',
      onlineGrievancePortal: 'https://grievances.maharashtra.gov.in',
      jurisdictionOffences: [
        'Custodial death or severe torture in lockup',
        'Sexual violence or unlawful frisking of women',
        'Illegal detention without 24-hour magistrate presentation',
        'Corrupt demands or unauthorized searches without search memo'
      ],
      howToLodgeComplaint: [
        'Submit written representation with affidavit and supporting evidence to SPCA Nariman Point office.',
        'Divisional Police Complaints Authorities active in Pune, Nagpur, Nashik, Aurangabad, Amravati, Nanded.'
      ]
    },
    stateLegalServicesAuthority: {
      centerName: 'Maharashtra State Legal Services Authority (MSLSA)',
      authorityType: 'SLSA',
      address: 'High Court Extension Building, No. 105, Fort, Mumbai - 400032',
      helpline: '022-22676342 / 15100 (NALSA)',
      email: 'mslsa-bhc@nic.in',
      website: 'https://legalservices.maharashtra.gov.in',
      freeLegalAidEligibility: [
        'Women and children, SC/ST citizens, custody undertrials',
        'Annual income ceiling: ₹3,00,000/- for general citizens in Maharashtra'
      ],
      keyServices: [
        'Free counsel assigned for magistrate court bail, FIR registration petitions, remand oversight'
      ]
    },
    majorDistricts: [
      {
        districtName: 'Mumbai (City & Suburban)',
        dlsa: {
          address: 'Mumbai DLSA, City Civil & Sessions Court, Old Secretariat Building, Fort, Mumbai - 400032',
          phone: '022-22672728',
          email: 'dlsa.mumbai@gov.in'
        },
        districtCourt: {
          name: 'Chief Metropolitan Magistrate (CMM) Court, Esplanade & Sessions Court, Fort',
          location: 'Esplanade / Fort, Mumbai',
          jurisdiction: 'Mumbai Police (Colaba, Marine Drive, Azad Maidan, DB Marg, Bandra, Andheri, Borivali)',
          magistrateCourtType: 'Chief Metropolitan Magistrate (CMM) / MM',
          eCourtsPortalUrl: 'https://districts.ecourts.gov.in/mumbai',
          courtComplexAddress: 'Old Secretariat Building, Karmaveer Bhaurao Patil Marg, Fort, Mumbai - 400032',
          legalAidFrontOfficePhone: '022-22672728',
          filingProcedures: [
            'File complaints under Sec 175(3) BNSS / 156(3) CrPC before the jurisdictional Addl. Chief Metropolitan Magistrate (ACMM) court (Esplanade, Girgaon, Dadar, Bandra, Kurla, Andheri, Borivali).'
          ]
        }
      },
      {
        districtName: 'Pune',
        dlsa: {
          address: 'Pune DLSA, District Court Building, Shivajinagar, Pune - 411005',
          phone: '020-25537540',
          email: 'dlsa.pune@gov.in'
        },
        districtCourt: {
          name: 'District & Sessions Court, Shivajinagar, Pune',
          location: 'Shivajinagar, Pune',
          jurisdiction: 'Pune City and Pimpri-Chinchwad Police Commissionerate',
          magistrateCourtType: 'Chief Judicial Magistrate (CJM) / JMFC',
          eCourtsPortalUrl: 'https://districts.ecourts.gov.in/pune',
          courtComplexAddress: 'District Court Complex, Shivajinagar, Pune - 411005',
          legalAidFrontOfficePhone: '020-25537540',
          filingProcedures: [
            'File Sec 175(3) BNSS applications at the CJM Filing Section, Ground Floor Court Building.'
          ]
        }
      }
    ],
    stateAntiCorruptionVigilance: {
      agencyName: 'Anti-Corruption Bureau (ACB), Maharashtra',
      tollFree: '1064 / 022-24921212',
      website: 'https://acbmaharashtra.gov.in'
    }
  },
  'UP': {
    stateCode: 'UP',
    stateName: 'Uttar Pradesh',
    hindiName: 'उत्तर प्रदेश',
    capital: 'Lucknow',
    policeComplaintsAuthority: {
      authorityName: 'UP State Police Complaints Authority',
      authorityLevel: 'State Level (SPCA)',
      chairpersonRank: 'Hon\'ble Retired High Court Judge',
      address: 'Police Headquarters Signature Building, 4th Floor, Gomti Nagar Extension, Lucknow - 226010',
      phone: '0522-2390200 / 0522-2724000',
      email: 'spca.lucknow@up.gov.in',
      onlineGrievancePortal: 'https://jansunwai.up.nic.in (IGRS Portal)',
      jurisdictionOffences: [
        'Refusal to register FIRs in cognizable offences',
        'Custodial assault, third-degree torture, unlawful encounter threats',
        'Extortion, seizure of vehicles without e-challan',
        'Disobedience of Lalita Kumari & Arnesh Kumar SC mandates'
      ],
      howToLodgeComplaint: [
        'File representation to SP/SSP under Sec 173(4) BNSS with Speed Post receipt.',
        'File online on UP IGRS JanSunwai Portal with direct escalation to ADG Grievance.',
        'Submit petition to State Police Complaints Authority at Signature Building, Lucknow.'
      ]
    },
    stateLegalServicesAuthority: {
      centerName: 'Uttar Pradesh State Legal Services Authority (UPSLSA)',
      authorityType: 'SLSA',
      address: 'III Floor, Jawahar Bhawan, Annexe, Lucknow - 226001',
      helpline: '0522-2286395 / 15100 (NALSA)',
      email: 'upslsa@nic.in',
      website: 'https://upslsa.up.nic.in',
      freeLegalAidEligibility: [
        'Women, Children, SC/ST citizens, custody detainees',
        'Annual income ceiling: ₹3,00,000/- for general citizens'
      ],
      keyServices: [
        'Free defense lawyer for bail & trial in all 75 District Courts',
        'DLSA Secretary monitoring of illegal detention in police stations'
      ]
    },
    majorDistricts: [
      {
        districtName: 'Gautam Buddha Nagar (Noida / Greater Noida)',
        dlsa: {
          address: 'DLSA Front Office, District & Sessions Court, Surajpur, Greater Noida - 201306',
          phone: '0120-2560040',
          email: 'dlsa.gbnagar@allahabadhighcourt.in'
        },
        districtCourt: {
          name: 'District & Sessions Court, Surajpur, Greater Noida',
          location: 'Surajpur, Greater Noida',
          jurisdiction: 'Noida (Sector 20, 24, 39, 58, 126, 142, Cyber Crime PS), Greater Noida, Dadri, Jewar',
          magistrateCourtType: 'Chief Judicial Magistrate (CJM) / JMFC',
          eCourtsPortalUrl: 'https://districts.ecourts.gov.in/gautambuddhanagar',
          courtComplexAddress: 'District Court Complex, Surajpur, Greater Noida, UP - 201306',
          legalAidFrontOfficePhone: '0120-2560040',
          filingProcedures: [
            'File Sec 175(3) BNSS application before CJM Court Surajpur.',
            'Include postal slip to Police Commissionerate Gautam Buddha Nagar.'
          ]
        }
      },
      {
        districtName: 'Lucknow',
        dlsa: {
          address: 'DLSA Lucknow, District Court Building, Qaiserbagh, Lucknow - 226001',
          phone: '0522-2623340',
          email: 'dlsa.lucknow@allahabadhighcourt.in'
        },
        districtCourt: {
          name: 'District & Sessions Court, Qaiserbagh, Lucknow',
          location: 'Qaiserbagh, Lucknow',
          jurisdiction: 'Lucknow Police Commissionerate (Hazratganj, Gomti Nagar, Alambagh, Chowk, Mahanagar)',
          magistrateCourtType: 'Chief Judicial Magistrate (CJM) / JMFC',
          eCourtsPortalUrl: 'https://districts.ecourts.gov.in/lucknow',
          courtComplexAddress: 'Civil Court Complex, Qaiserbagh, Lucknow - 226001',
          legalAidFrontOfficePhone: '0522-2623340',
          filingProcedures: [
            'File Sec 175(3) BNSS petitions at CJM Court Lucknow.'
          ]
        }
      }
    ],
    stateAntiCorruptionVigilance: {
      agencyName: 'UP Vigilance Establishment / Anti-Corruption Wing',
      tollFree: '9454401866 / 0522-2304144',
      website: 'https://vigilance.up.gov.in'
    }
  },
  'TN': {
    stateCode: 'TN',
    stateName: 'Tamil Nadu',
    hindiName: 'तमिलनाडु',
    capital: 'Chennai',
    policeComplaintsAuthority: {
      authorityName: 'State Police Complaints Authority, Tamil Nadu',
      authorityLevel: 'State Level (SPCA)',
      chairpersonRank: 'Hon\'ble Retired High Court Judge',
      address: 'Police Headquarters Complex, Dr. Radhakrishnan Salai, Mylapore, Chennai - 600004',
      phone: '044-28447700 / 044-28448000',
      email: 'spca-tn@gov.in',
      onlineGrievancePortal: 'https://eservices.tnpolice.gov.in',
      jurisdictionOffences: [
        'Custodial deaths, Lockup violence, Torture',
        'Refusal to register FIRs in cognizable offences',
        'Illegal vehicle seizure and harassment'
      ],
      howToLodgeComplaint: [
        'Send petition to DGP/SPCA Mylapore or District SP Office by Registered Post.'
      ]
    },
    stateLegalServicesAuthority: {
      centerName: 'Tamil Nadu State Legal Services Authority (TNSLSA)',
      authorityType: 'SLSA',
      address: 'North Fort Road, High Court Campus, Chennai - 600104',
      helpline: '044-25342834 / 15100 (NALSA)',
      email: 'tnslsa@gmail.com',
      website: 'https://tnslsa.tn.gov.in',
      freeLegalAidEligibility: [
        'Women, Children, SC/ST, custody undertrials',
        'Annual income ceiling: ₹3,00,000/-'
      ],
      keyServices: [
        'Free remand advocate, bail representation, legal aid helpline'
      ]
    },
    majorDistricts: [
      {
        districtName: 'Chennai',
        dlsa: {
          address: 'DLSA Chennai, High Court Campus, Chennai - 600104',
          phone: '044-25342442',
          email: 'dlsa.chennai@tn.gov.in'
        },
        districtCourt: {
          name: 'Chief Metropolitan Magistrate Court, Egmore & George Town Courts',
          location: 'Egmore / George Town, Chennai',
          jurisdiction: 'Greater Chennai Police Commissionerate',
          magistrateCourtType: 'Chief Metropolitan Magistrate (CMM) / MM',
          eCourtsPortalUrl: 'https://districts.ecourts.gov.in/chennai',
          courtComplexAddress: 'Egmore Court Complex, EVR Periyar Salai, Egmore, Chennai - 600008',
          legalAidFrontOfficePhone: '044-25342442',
          filingProcedures: [
            'File Sec 175(3) BNSS applications before CMM Egmore Court.'
          ]
        }
      }
    ],
    stateAntiCorruptionVigilance: {
      agencyName: 'Directorate of Vigilance and Anti-Corruption (DVAC), Tamil Nadu',
      tollFree: '044-22321085 / 044-22321090',
      website: 'https://dvac.tn.gov.in'
    }
  },
  'TS': {
    stateCode: 'TS',
    stateName: 'Telangana',
    hindiName: 'तेलंगाना',
    capital: 'Hyderabad',
    policeComplaintsAuthority: {
      authorityName: 'Telangana State Police Complaints Authority',
      authorityLevel: 'State Level (SPCA)',
      chairpersonRank: 'Hon\'ble Retired High Court Judge',
      address: 'DGP Office Complex, Lakdikapul, Hyderabad - 500004',
      phone: '040-23230489 / 040-27852435',
      email: 'spca.ts@telangana.gov.in',
      onlineGrievancePortal: 'https://police.telangana.gov.in',
      jurisdictionOffences: [
        'Custodial violence, illegal lockup detention',
        'Refusal to register Zero FIR',
        'Extortion and illegal phone search without warrant'
      ],
      howToLodgeComplaint: [
        'Submit written petition to SPCA Lakdikapul or CP Grievance Cell Hyderabad/Cyberabad/Rachakonda.'
      ]
    },
    stateLegalServicesAuthority: {
      centerName: 'Telangana State Legal Services Authority (TSLSA)',
      authorityType: 'SLSA',
      address: 'High Court Buildings Campus, Hyderabad - 500066',
      helpline: '040-24541525 / 15100 (NALSA)',
      email: 'tslsa-hc@telangana.gov.in',
      website: 'https://tslsa.telangana.gov.in',
      freeLegalAidEligibility: [
        'Women, Children, SC/ST, custody undertrials',
        'Annual income ceiling: ₹3,00,000/-'
      ],
      keyServices: [
        'Free advocate for remand & bail, Lok Adalat support'
      ]
    },
    majorDistricts: [
      {
        districtName: 'Hyderabad / Cyberabad / Rachakonda',
        dlsa: {
          address: 'DLSA Hyderabad, City Civil Court Complex, Purani Haveli, Hyderabad - 500002',
          phone: '040-24523315',
          email: 'dlsa.hyd@telangana.gov.in'
        },
        districtCourt: {
          name: 'Chief Metropolitan Magistrate Court, Nampally, Hyderabad',
          location: 'Nampally, Hyderabad',
          jurisdiction: 'Hyderabad Police Commissionerate, Cyberabad (Gachibowli, Madhapur, Hitec City), Rachakonda',
          magistrateCourtType: 'Chief Metropolitan Magistrate (CMM) / MM',
          eCourtsPortalUrl: 'https://districts.ecourts.gov.in/hyderabad',
          courtComplexAddress: 'Metropolitan Criminal Courts Complex, Nampally, Hyderabad - 500001',
          legalAidFrontOfficePhone: '040-24523315',
          filingProcedures: [
            'File Sec 175(3) BNSS petitions at CMM Court Nampally.'
          ]
        }
      }
    ],
    stateAntiCorruptionVigilance: {
      agencyName: 'Anti-Corruption Bureau (ACB), Telangana',
      tollFree: '1064 / 040-24750000',
      website: 'https://acb.telangana.gov.in'
    }
  },
  'WB': {
    stateCode: 'WB',
    stateName: 'West Bengal',
    hindiName: 'पश्चिम बंगाल',
    capital: 'Kolkata',
    policeComplaintsAuthority: {
      authorityName: 'West Bengal Police Complaints Authority',
      authorityLevel: 'State Level (SPCA)',
      chairpersonRank: 'Hon\'ble Retired High Court Judge',
      address: 'Bhabani Bhawan, Alipore, Kolkata - 700027',
      phone: '033-24792626 / 033-24791000',
      email: 'spca.wb@gov.in',
      onlineGrievancePortal: 'https://wbpolice.gov.in',
      jurisdictionOffences: [
        'Custodial violence, illegal detention, non-registration of cognizable FIR'
      ],
      howToLodgeComplaint: [
        'Submit written petition to SPCA Alipore or CP Office Lalbazar, Kolkata.'
      ]
    },
    stateLegalServicesAuthority: {
      centerName: 'West Bengal State Legal Services Authority (WBSLSA)',
      authorityType: 'SLSA',
      address: 'City Civil Court Building, 3rd Floor, 2 & 3 Kiran Sankar Roy Road, Kolkata - 700001',
      helpline: '033-22483892 / 15100',
      email: 'wbslsa@gmail.com',
      website: 'https://wbslsa.wb.gov.in',
      freeLegalAidEligibility: [
        'Women, Children, SC/ST, Undertrials, Income under ₹3,00,000/-'
      ],
      keyServices: ['Free remand legal aid, Bail filing, Trial representation']
    },
    majorDistricts: [
      {
        districtName: 'Kolkata',
        dlsa: {
          address: 'DLSA Kolkata, Bankshall Court Complex, 2/3 Bankshall Street, Kolkata - 700001',
          phone: '033-22485520',
          email: 'dlsa.kolkata@wb.gov.in'
        },
        districtCourt: {
          name: 'Chief Metropolitan Magistrate Court (Bankshall Court)',
          location: 'Bankshall Street, BBD Bagh, Kolkata',
          jurisdiction: 'Kolkata Police (Lalbazar, Park Street, Shakespeare Sarani, Bowbazar, Alipore, Shyampukur)',
          magistrateCourtType: 'Chief Metropolitan Magistrate (CMM) / MM',
          eCourtsPortalUrl: 'https://districts.ecourts.gov.in/kolkatacmm',
          courtComplexAddress: 'Bankshall Court Complex, Kolkata - 700001',
          legalAidFrontOfficePhone: '033-22485520',
          filingProcedures: ['File Sec 175(3) BNSS before CMM Bankshall Court.']
        }
      }
    ],
    stateAntiCorruptionVigilance: {
      agencyName: 'Anti-Corruption Branch, West Bengal',
      tollFree: '033-22145555',
      website: 'https://wbpolice.gov.in'
    }
  },
  'GJ': {
    stateCode: 'GJ',
    stateName: 'Gujarat',
    hindiName: 'गुजरात',
    capital: 'Gandhinagar',
    policeComplaintsAuthority: {
      authorityName: 'Gujarat State Police Complaints Authority',
      authorityLevel: 'State Level (SPCA)',
      chairpersonRank: 'Hon\'ble Retired High Court Judge',
      address: 'Police Bhavan, Sector 18, Gandhinagar - 382018',
      phone: '079-23254344 / 079-23254345',
      email: 'spca-guj@gujarat.gov.in',
      onlineGrievancePortal: 'https://dgpgujarat.gov.in',
      jurisdictionOffences: ['Custodial torture, unlawful arrest, extortion, FIR refusal'],
      howToLodgeComplaint: ['Submit affidavit petition to SPCA Sector 18, Gandhinagar.']
    },
    stateLegalServicesAuthority: {
      centerName: 'Gujarat State Legal Services Authority (GSLSA)',
      authorityType: 'SLSA',
      address: 'High Court of Gujarat Complex, Sola, Ahmedabad - 380060',
      helpline: '079-27664977 / 15100',
      email: 'gslsa-ahd@nic.in',
      website: 'https://gslsa.gujarat.gov.in',
      freeLegalAidEligibility: ['Women, Children, SC/ST, Custody detainees, Income under ₹3,00,000/-'],
      keyServices: ['Free criminal defense lawyer, Bail support, Legal aid clinic']
    },
    majorDistricts: [
      {
        districtName: 'Ahmedabad (City & Rural)',
        dlsa: {
          address: 'Ahmedabad DLSA, City Civil & Sessions Court, Bhadra, Ahmedabad - 380001',
          phone: '079-25507460',
          email: 'dlsa.ahmedabad@gujarat.gov.in'
        },
        districtCourt: {
          name: 'Chief Metropolitan Magistrate Court, Gheekanta, Ahmedabad',
          location: 'Gheekanta, Ahmedabad',
          jurisdiction: 'Ahmedabad City Police Stations (Navrangpura, Vastrapur, Satellite, Ellisbridge, Kalupur)',
          magistrateCourtType: 'Chief Metropolitan Magistrate (CMM) / MM',
          eCourtsPortalUrl: 'https://districts.ecourts.gov.in/ahmedabadcmm',
          courtComplexAddress: 'Metropolitan Courts Complex, Gheekanta Road, Ahmedabad - 380001',
          legalAidFrontOfficePhone: '079-25507460',
          filingProcedures: ['File Sec 175(3) BNSS application before CMM Gheekanta Court.']
        }
      }
    ],
    stateAntiCorruptionVigilance: {
      agencyName: 'Anti-Corruption Bureau (ACB), Gujarat',
      tollFree: '1064 / 079-22860344',
      website: 'https://acb.gujarat.gov.in'
    }
  },
  'RJ': {
    stateCode: 'RJ',
    stateName: 'Rajasthan',
    hindiName: 'राजस्थान',
    capital: 'Jaipur',
    policeComplaintsAuthority: {
      authorityName: 'Rajasthan State Police Complaints Authority',
      authorityLevel: 'State Level (SPCA)',
      chairpersonRank: 'Hon\'ble Retired High Court Judge',
      address: 'Police Headquarters, Lal Kothi, Tonk Road, Jaipur - 302015',
      phone: '0141-2606622 / 0141-2606623',
      email: 'spca.rajasthan@nic.in',
      onlineGrievancePortal: 'https://sampark.rajasthan.gov.in (Rajasthan Sampark)',
      jurisdictionOffences: ['Custodial assault, bribery, extortion, refusal of FIR'],
      howToLodgeComplaint: ['Submit petition to Police Headquarters Lal Kothi, Jaipur or on Rajasthan Sampark Portal (181).']
    },
    stateLegalServicesAuthority: {
      centerName: 'Rajasthan State Legal Services Authority (RSLSA)',
      authorityType: 'SLSA',
      address: 'Rajasthan High Court Campus, Jaipur Bench, Jaipur - 302005',
      helpline: '0141-2227481 / 15100',
      email: 'rslsajpr@gmail.com',
      website: 'https://rlsa.gov.in',
      freeLegalAidEligibility: ['Women, Children, SC/ST, Custody undertrials, Income under ₹3,00,000/-'],
      keyServices: ['Free advocate for bail & trial, District legal aid clinics']
    },
    majorDistricts: [
      {
        districtName: 'Jaipur (Metropolitan & District)',
        dlsa: {
          address: 'DLSA Jaipur Metro, Sessions Court Complex, Collectorate Circle, Bani Park, Jaipur - 302016',
          phone: '0141-2200420',
          email: 'dlsa.jaipurmetro@raj.gov.in'
        },
        districtCourt: {
          name: 'District & Sessions Court, Bani Park, Jaipur',
          location: 'Bani Park, Jaipur',
          jurisdiction: 'Jaipur Police Commissionerate (Vaishali Nagar, Mansarovar, Malviya Nagar, Jyoti Nagar, Kotwali)',
          magistrateCourtType: 'Chief Judicial Magistrate (CJM) / JMFC',
          eCourtsPortalUrl: 'https://districts.ecourts.gov.in/jaipur',
          courtComplexAddress: 'District Court Complex, Bani Park, Jaipur - 302016',
          legalAidFrontOfficePhone: '0141-2200420',
          filingProcedures: ['File Sec 175(3) BNSS application before CJM / ACJM Courts Bani Park.']
        }
      }
    ],
    stateAntiCorruptionVigilance: {
      agencyName: 'Anti-Corruption Bureau (ACB), Rajasthan',
      tollFree: '1064 / 1800-180-6120 / 9413502834',
      website: 'https://acb.rajasthan.gov.in'
    }
  },
  'KL': {
    stateCode: 'KL',
    stateName: 'Kerala',
    hindiName: 'केरल',
    capital: 'Thiruvananthapuram',
    policeComplaintsAuthority: {
      authorityName: 'Kerala State Police Complaints Authority (KSPCA)',
      authorityLevel: 'State Level (SPCA)',
      chairpersonRank: 'Hon\'ble Retired High Court Judge',
      address: 'TC 15/1454, Minchin Road, Vazhuthacaud, Thiruvananthapuram - 695014',
      phone: '0471-2320144 / 0471-2320145',
      email: 'spca.kerala@gov.in',
      onlineGrievancePortal: 'https://keralapolice.gov.in',
      jurisdictionOffences: ['Custodial torture, illegal detention, non-registration of complaints'],
      howToLodgeComplaint: ['Submit signed petition with evidence to SPCA Office, Vazhuthacaud, Thiruvananthapuram.']
    },
    stateLegalServicesAuthority: {
      centerName: 'Kerala State Legal Services Authority (KELSA)',
      authorityType: 'SLSA',
      address: 'Niyama Sahaya Bhavan, High Court Compound, Ernakulam, Kochi - 682031',
      helpline: '0484-2396717 / 15100',
      email: 'kelsakerala@gmail.com',
      website: 'https://kelsa.nic.in',
      freeLegalAidEligibility: ['Women, Children, SC/ST, Custody undertrials, Income under ₹3,00,000/-'],
      keyServices: ['Free legal defense, 24x7 helpdesk at all District Courts']
    },
    majorDistricts: [
      {
        districtName: 'Ernakulam (Kochi)',
        dlsa: {
          address: 'DLSA Ernakulam, District Court Complex, Marine Drive, Kochi - 682011',
          phone: '0484-2354140',
          email: 'dlsa.ekm@kerala.gov.in'
        },
        districtCourt: {
          name: 'Chief Judicial Magistrate Court, Ernakulam',
          location: 'Kochi / Ernakulam',
          jurisdiction: 'Kochi City & Ernakulam Rural Police',
          magistrateCourtType: 'Chief Judicial Magistrate (CJM) / JMFC',
          eCourtsPortalUrl: 'https://districts.ecourts.gov.in/ernakulam',
          courtComplexAddress: 'District Court Complex, Marine Drive, Kochi - 682011',
          legalAidFrontOfficePhone: '0484-2354140',
          filingProcedures: ['File Sec 175(3) BNSS application before CJM Ernakulam.']
        }
      }
    ],
    stateAntiCorruptionVigilance: {
      agencyName: 'Vigilance and Anti-Corruption Bureau (VACB), Kerala',
      tollFree: '1064 / 0471-2305393',
      website: 'https://vigilance.kerala.gov.in'
    }
  },
  'HR': {
    stateCode: 'HR',
    stateName: 'Haryana',
    hindiName: 'हरियाणा',
    capital: 'Chandigarh',
    policeComplaintsAuthority: {
      authorityName: 'Haryana State Police Complaints Authority',
      authorityLevel: 'State Level (SPCA)',
      chairpersonRank: 'Hon\'ble Retired High Court Judge',
      address: 'Paryatan Bhawan, 1st Floor, Sector 2, Panchkula - 134112',
      phone: '0172-2584144 / 0172-2584145',
      email: 'pca.haryana@gov.in',
      onlineGrievancePortal: 'https://haryanapolice.gov.in',
      jurisdictionOffences: ['Custodial torture, FIR refusal, illegal detention, bribery'],
      howToLodgeComplaint: ['Submit representation to PCA Panchkula or District Grievance Committee.']
    },
    stateLegalServicesAuthority: {
      centerName: 'Haryana State Legal Services Authority (HALSA)',
      authorityType: 'SLSA',
      address: 'Institutional Plot No. 9, Sector 14, Panchkula - 134109',
      helpline: '0172-2562309 / 15100',
      email: 'hslsa.haryana@gmail.com',
      website: 'https://hslsa.gov.in',
      freeLegalAidEligibility: ['Women, Children, SC/ST, Custody detainees, Income under ₹3,00,000/-'],
      keyServices: ['Free remand advocate, District court bail legal aid']
    },
    majorDistricts: [
      {
        districtName: 'Gurugram (Gurgaon)',
        dlsa: {
          address: 'DLSA Gurugram, District & Sessions Court, Mini Secretariat, Rajiv Chowk, Gurugram - 122001',
          phone: '0124-2225020',
          email: 'dlsa.gurugram@haryana.gov.in'
        },
        districtCourt: {
          name: 'District & Sessions Court, Gurugram',
          location: 'Rajiv Chowk, Gurugram',
          jurisdiction: 'Gurugram Police Commissionerate (DLF Phase 1/2/3, Sector 29, Cyber City, Sushant Lok, Sohna)',
          magistrateCourtType: 'Chief Judicial Magistrate (CJM) / JMFC',
          eCourtsPortalUrl: 'https://districts.ecourts.gov.in/gurgaon',
          courtComplexAddress: 'District Court Complex, Near Mini Secretariat, Rajiv Chowk, Gurugram - 122001',
          legalAidFrontOfficePhone: '0124-2225020',
          filingProcedures: ['File Sec 175(3) BNSS application before CJM Court Gurugram.']
        }
      },
      {
        districtName: 'Faridabad',
        dlsa: {
          address: 'DLSA Faridabad, District Court Complex, Sector 12, Faridabad - 121007',
          phone: '0129-2223840',
          email: 'dlsa.faridabad@haryana.gov.in'
        },
        districtCourt: {
          name: 'District & Sessions Court, Sector 12, Faridabad',
          location: 'Sector 12, Faridabad',
          jurisdiction: 'Faridabad Police Commissionerate (NIT, Central, Ballabgarh, Sarai Khawaja)',
          magistrateCourtType: 'Chief Judicial Magistrate (CJM) / JMFC',
          eCourtsPortalUrl: 'https://districts.ecourts.gov.in/faridabad',
          courtComplexAddress: 'District Court Complex, Sector 12, Faridabad - 121007',
          legalAidFrontOfficePhone: '0129-2223840',
          filingProcedures: ['File Sec 175(3) BNSS application before CJM Court Faridabad.']
        }
      }
    ],
    stateAntiCorruptionVigilance: {
      agencyName: 'Anti-Corruption Bureau (ACB), Haryana',
      tollFree: '1800-180-2022 / 1064',
      website: 'https://svbharyana.gov.in'
    }
  },
  'PB': {
    stateCode: 'PB',
    stateName: 'Punjab',
    hindiName: 'पंजाब',
    capital: 'Chandigarh',
    policeComplaintsAuthority: {
      authorityName: 'Punjab State Police Complaints Authority',
      authorityLevel: 'State Level (SPCA)',
      chairpersonRank: 'Hon\'ble Retired High Court Judge',
      address: 'Forest Complex, Sector 68, SAS Nagar (Mohali), Punjab - 160062',
      phone: '0172-2298500 / 0172-2298501',
      email: 'spca.punjab@punjab.gov.in',
      onlineGrievancePortal: 'https://punjabpolice.gov.in',
      jurisdictionOffences: ['Custodial torture, false implicate cases, extortion, FIR refusal'],
      howToLodgeComplaint: ['Submit signed petition with evidence to SPCA Office Sector 68, Mohali.']
    },
    stateLegalServicesAuthority: {
      centerName: 'Punjab State Legal Services Authority (PULSA)',
      authorityType: 'SLSA',
      address: 'Site No. 126, Sector 69, SAS Nagar (Mohali) - 160069',
      helpline: '1968 (Punjab Toll-Free) / 15100',
      email: 'pulsa.punjab@gmail.com',
      website: 'https://pulsa.punjab.gov.in',
      freeLegalAidEligibility: ['Women, Children, SC/ST, Custody undertrials, Income under ₹3,00,000/-'],
      keyServices: ['Free advocate for bail, Criminal trial representation']
    },
    majorDistricts: [
      {
        districtName: 'Ludhiana / SAS Nagar (Mohali)',
        dlsa: {
          address: 'DLSA Ludhiana, District & Sessions Court, Mini Secretariat, Ludhiana - 141001',
          phone: '0161-2401850',
          email: 'dlsa.ludhiana@punjab.gov.in'
        },
        districtCourt: {
          name: 'District & Sessions Court, Ludhiana',
          location: 'Mini Secretariat, Ludhiana',
          jurisdiction: 'Ludhiana Police Commissionerate',
          magistrateCourtType: 'Chief Judicial Magistrate (CJM) / JMFC',
          eCourtsPortalUrl: 'https://districts.ecourts.gov.in/ludhiana',
          courtComplexAddress: 'District Court Complex, Mini Secretariat, Ludhiana - 141001',
          legalAidFrontOfficePhone: '0161-2401850',
          filingProcedures: ['File Sec 175(3) BNSS before CJM Ludhiana.']
        }
      }
    ],
    stateAntiCorruptionVigilance: {
      agencyName: 'Punjab Vigilance Bureau',
      tollFree: '1800-1800-1000 / 0172-2298500',
      website: 'https://vigilancebureau.punjab.gov.in'
    }
  }
};

export const ALL_INDIAN_STATES_LIST = [
  { code: 'DL', name: 'Delhi (NCT)' },
  { code: 'KA', name: 'Karnataka' },
  { code: 'MH', name: 'Maharashtra' },
  { code: 'UP', name: 'Uttar Pradesh' },
  { code: 'TN', name: 'Tamil Nadu' },
  { code: 'TS', name: 'Telangana' },
  { code: 'WB', name: 'West Bengal' },
  { code: 'GJ', name: 'Gujarat' },
  { code: 'RJ', name: 'Rajasthan' },
  { code: 'KL', name: 'Kerala' },
  { code: 'HR', name: 'Haryana' },
  { code: 'PB', name: 'Punjab' }
];

export function getGenericStateData(stateName: string): StateLegalData {
  return {
    stateCode: 'GENERIC',
    stateName: stateName,
    hindiName: stateName,
    capital: 'State Capital',
    policeComplaintsAuthority: {
      authorityName: `${stateName} State Police Complaints Authority (SPCA)`,
      authorityLevel: 'State Level (SPCA)',
      chairpersonRank: 'Hon\'ble Retired High Court / District Judge (Prakash Singh Mandate)',
      address: `Office of the State Police Complaints Authority / DGP Headquarters, ${stateName}`,
      phone: '112 / 100 / State Police Control Room',
      email: 'spca-grievance@statepolice.gov.in',
      onlineGrievancePortal: 'https://services.india.gov.in',
      jurisdictionOffences: [
        'Custodial death or severe grievous hurt in police custody',
        'Rape or attempt to commit rape by police personnel',
        'Extortion, bribery, illegal seizure of vehicle keys/mobiles',
        'Refusal to register Zero FIR or cognizable complaint under Section 173 BNSS'
      ],
      howToLodgeComplaint: [
        'Submit written petition backed by affidavit to Chairperson, State Police Complaints Authority.',
        'Send copy via Speed Post to the Director General of Police (DGP) and Superintendent of Police (SP).'
      ]
    },
    stateLegalServicesAuthority: {
      centerName: `${stateName} State Legal Services Authority (SLSA)`,
      authorityType: 'SLSA',
      address: `High Court Complex, ${stateName}`,
      helpline: '15100 (24x7 NALSA National Free Legal Aid Helpline)',
      email: 'slsa@nic.in',
      website: 'https://nalsa.gov.in',
      freeLegalAidEligibility: [
        'Women and Children (regardless of income limit under Sec 12 of LSA Act)',
        'Members of Scheduled Castes (SC) and Scheduled Tribes (ST)',
        'Persons in police lockup or judicial custody',
        'Victims of human trafficking or forced labor (Art 23)',
        'Citizens with annual income below ₹3,00,000/- (statutory ceiling)'
      ],
      keyServices: [
        'Free criminal defense lawyer appointed for bail & remand hearings',
        'Assistance in filing Sec 175(3) BNSS petitions for FIR registration',
        'Representation in trial courts and High Court'
      ]
    },
    majorDistricts: [
      {
        districtName: `District Court Complex (${stateName})`,
        dlsa: {
          address: `District Legal Services Authority (DLSA) Front Office, District Court Complex, ${stateName}`,
          phone: '15100 (Toll-Free NALSA Helpline)',
          email: 'dlsa-helpline@nic.in'
        },
        districtCourt: {
          name: `District and Sessions Court Complex, ${stateName}`,
          location: stateName,
          jurisdiction: `All Jurisdictional Police Stations within ${stateName}`,
          magistrateCourtType: 'Chief Judicial Magistrate (CJM) / JMFC',
          eCourtsPortalUrl: 'https://districts.ecourts.gov.in',
          courtComplexAddress: `District Court Complex, ${stateName}`,
          legalAidFrontOfficePhone: '15100',
          filingProcedures: [
            'File Application under Section 175(3) BNSS (formerly 156(3) CrPC) before the CJM / JMFC.',
            'Attach proof of written complaint dispatched to SP under Section 173(4) BNSS with Speed Post receipt.',
            'Approach DLSA Front Office in the court premises for free advocate assignment if eligible.'
          ]
        }
      }
    ],
    stateAntiCorruptionVigilance: {
      agencyName: `${stateName} Anti-Corruption Bureau / State Vigilance Directorate`,
      tollFree: '1064 / 112',
      website: 'https://cbi.gov.in'
    }
  };
}

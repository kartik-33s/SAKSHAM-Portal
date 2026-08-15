export interface LawMapping {
  topic: string;
  bnssSection: string;
  crpcSection: string;
  description: string;
}

export interface PenalMapping {
  offence: string;
  bnsSection: string;
  ipcSection: string;
  punishment: string;
  nature: string;
}

export interface LandmarkJudgment {
  id: string;
  caseName: string;
  citation: string;
  bench: string;
  year: number;
  coreRule: string;
  keyDirectives: string[];
  importanceForCitizens: string;
}

export const BNSS_CRPC_MAPPINGS: LawMapping[] = [
  {
    topic: 'Notice of Appearance (Arrest below 7 years)',
    bnssSection: 'Section 35(3)',
    crpcSection: 'Section 41A',
    description: 'Police must serve written notice of appearance for offences punishable with imprisonment up to 7 years instead of routine physical arrest.'
  },
  {
    topic: 'Right to know grounds of arrest',
    bnssSection: 'Section 36',
    crpcSection: 'Section 50',
    description: 'Arresting officer must immediately communicate full particulars of the offence or other grounds for arrest.'
  },
  {
    topic: 'Arrest Memo & Witness Signature',
    bnssSection: 'Section 47',
    crpcSection: 'Section 41B',
    description: 'Mandatory preparation of an Arrest Memo with time, date, place, attested by at least one witness and countersigned by arrestee.'
  },
  {
    topic: 'Right to inform family / friend',
    bnssSection: 'Section 48',
    crpcSection: 'Section 50A',
    description: 'Police must immediately notify a nominated friend, relative, or advocate within 12 hours.'
  },
  {
    topic: 'Medical Examination of Arrested Person',
    bnssSection: 'Section 53 & 54',
    crpcSection: 'Section 54',
    description: 'Mandatory medical examination by a registered medical practitioner upon arrest and every 48 hours in custody.'
  },
  {
    topic: 'Production before Magistrate in 24 Hours',
    bnssSection: 'Section 57',
    crpcSection: 'Section 57',
    description: 'No person detained in police custody can be held for more than 24 hours without Judicial Magistrate authorization.'
  },
  {
    topic: 'Special Provisions for Women Arrest',
    bnssSection: 'Section 43(5) & 49(2)',
    crpcSection: 'Section 46(4) & 51(2)',
    description: 'No arrest of women after sunset and before sunrise without prior Magistrate order; body search only by female officer.'
  },
  {
    topic: 'Mandatory Registration of FIR & Zero FIR',
    bnssSection: 'Section 173(1) & 173(2)',
    crpcSection: 'Section 154(1) & 154(2)',
    description: 'Mandatory FIR on cognizable offence information; provision for Zero FIR and free copy of FIR to informant.'
  },
  {
    topic: 'FIR Refusal - Complaint to SP',
    bnssSection: 'Section 173(4)',
    crpcSection: 'Section 154(3)',
    description: 'Right to send written complaint by post to Superintendent of Police upon refusal of station SHO.'
  },
  {
    topic: 'Magistrate Direction to Police to Register FIR',
    bnssSection: 'Section 175(3)',
    crpcSection: 'Section 156(3)',
    description: 'Application before Judicial Magistrate to order investigation and FIR registration.'
  },
  {
    topic: 'Questioning of Women, Children & Seniors at Home',
    bnssSection: 'Section 179(1)',
    crpcSection: 'Section 160(1)',
    description: 'Witness statements of women, children (<15), and seniors (>60) must be recorded only at their residence.'
  },
  {
    topic: 'Search in presence of 2 Local Witnesses (Panch)',
    bnssSection: 'Section 107',
    crpcSection: 'Section 100',
    description: 'Mandatory presence of 2 independent local inhabitants and immediate free copy of seizure memo.'
  },
  {
    topic: 'Freezing of Bank Accounts & Property Seizure',
    bnssSection: 'Section 106',
    crpcSection: 'Section 102',
    description: 'Police can only seize property or freeze accounts suspected to be stolen or directly involved in an offence, and must report seizure forthwith to the Magistrate.'
  },
  {
    topic: 'Preventive Detention Safeguards',
    bnssSection: 'Section 170',
    crpcSection: 'Section 151',
    description: 'Preventive arrest without warrant only if cognizable offence cannot be otherwise prevented; cannot detain beyond 24 hours without Magistrate order.'
  },
  {
    topic: 'Orders in Urgent Cases of Nuisance / Assembly',
    bnssSection: 'Section 163',
    crpcSection: 'Section 144',
    description: 'Executive Magistrate orders must be based on material facts indicating imminent danger; cannot be used to extinguish fundamental rights indefinitely.'
  }
];

export const BNS_IPC_MAPPINGS: PenalMapping[] = [
  {
    offence: 'Public servant disobeying law to cause injury / Refusing FIR',
    bnsSection: 'Section 198',
    ipcSection: 'Section 166A',
    punishment: 'Rigorous Imprisonment up to 2 years + Fine',
    nature: 'Cognizable & Non-Bailable'
  },
  {
    offence: 'Voluntarily causing hurt to extort confession (Custodial Violence)',
    bnsSection: 'Section 118 & 127',
    ipcSection: 'Section 330 & 331',
    punishment: 'Imprisonment up to 7 to 10 years + Fine',
    nature: 'Cognizable & Non-Bailable'
  },
  {
    offence: 'Wrongful Confinement / Illegal Detention',
    bnsSection: 'Section 127',
    ipcSection: 'Section 342 & 344',
    punishment: 'Imprisonment up to 1 to 3 years + Fine',
    nature: 'Cognizable & Bailable'
  },
  {
    offence: 'Criminal Intimidation / Threats by Police',
    bnsSection: 'Section 351',
    ipcSection: 'Section 503 & 506',
    punishment: 'Imprisonment up to 2 to 7 years + Fine',
    nature: 'Non-Cognizable / Cognizable'
  },
  {
    offence: 'Public servant taking bribe / illegal gratification',
    bnsSection: 'Prevention of Corruption Act Sec 7',
    ipcSection: 'PC Act Sec 7 (Formerly Sec 161 IPC)',
    punishment: 'Imprisonment up to 7 years + Fine',
    nature: 'Cognizable & Non-Bailable'
  },
  {
    offence: 'Extortion by threat of false case / injury',
    bnsSection: 'Section 308',
    ipcSection: 'Section 384 & 389',
    punishment: 'Imprisonment up to 3 to 10 years + Fine',
    nature: 'Cognizable & Non-Bailable'
  }
];

export const DK_BASU_GUIDELINES = [
  {
    id: 1,
    title: 'Identification & Name Tags',
    detail: 'Police personnel carrying out arrest and handling interrogation must bear accurate, visible, and clear identification and name tags with designations. Details must be recorded in station register.'
  },
  {
    id: 2,
    title: 'Preparation of Arrest Memo',
    detail: 'The arresting officer must prepare an Arrest Memo at the time of arrest specifying exact date, time, and location. It must be attested by at least one witness (family member or respectable local citizen) and countersigned by the arrestee.'
  },
  {
    id: 3,
    title: 'Right to Inform Next of Kin / Friend',
    detail: 'The person arrested or detained is entitled to have a friend, relative, or person interested in their welfare informed of their arrest and place of custody as soon as practicable, within 8 to 12 hours.'
  },
  {
    id: 4,
    title: 'Notification Through Police Control Room',
    detail: 'The time, place of arrest, and venue of custody must be notified by police to the District Police Control Room and displayed prominently on a notice board within 12 hours of arrest.'
  },
  {
    id: 5,
    title: 'Inspection Memo & Injury Recording',
    detail: 'The arrestee may request a physical body inspection upon arrest. Any existing major/minor injuries on the body must be recorded in an "Inspection Memo" signed by both arrestee and officer.'
  },
  {
    id: 6,
    title: 'Medical Examination Every 48 Hours',
    detail: 'The arrestee must undergo a medical examination by a trained medical officer from the government health panel every 48 hours during detention in custody.'
  },
  {
    id: 7,
    title: 'Copies Sent to Magistrate',
    detail: 'Copies of all documents including the arrest memo and inspection memo must be dispatched to the Area Judicial Magistrate for record along with the remand application.'
  },
  {
    id: 8,
    title: 'Right to Meet Advocate During Interrogation',
    detail: 'The arrestee is permitted to meet and consult their advocate during interrogation, though not throughout the entire interrogation.'
  },
  {
    id: 9,
    title: 'Entry in Station Diary',
    detail: 'A complete entry must be made in the Daily Station Diary disclosing who was informed of the arrest, the name of the officer in whose custody the arrestee is held, and the witness details.'
  },
  {
    id: 10,
    title: 'Right to Free Legal Aid',
    detail: 'If the arrestee cannot afford legal representation, the police and magistrate must inform them of their right to free legal assistance from the Legal Services Authority.'
  },
  {
    id: 11,
    title: 'Contempt of Court Liability',
    detail: 'Failure to comply with these requirements renders the concerned police officials liable for Departmental action as well as Contempt of Court proceedings before the High Court.'
  }
];

export const LANDMARK_JUDGMENTS: LandmarkJudgment[] = [
  {
    id: 'dk-basu',
    caseName: 'D.K. Basu v. State of West Bengal',
    citation: '(1997) 1 SCC 416',
    bench: 'Supreme Court of India (Division Bench)',
    year: 1997,
    coreRule: 'Established 11 mandatory golden safeguards for any arrest and detention to prevent custodial torture and unlawful detention.',
    keyDirectives: [
      'Visible name badge for arresting officers',
      'Mandatory Arrest Memo witnessed by a local citizen',
      'Right to inform family within 12 hours',
      'Medical checkup by Govt doctor every 48 hours',
      'Violation constitutes direct criminal contempt of court'
    ],
    importanceForCitizens: 'If arrested, citing "D.K. Basu guidelines" alerts officers that you know the Supreme Court rules, creating immediate personal legal liability if violated.'
  },
  {
    id: 'lalita-kumari',
    caseName: 'Lalita Kumari v. Government of U.P.',
    citation: '(2014) 2 SCC 1',
    bench: 'Supreme Court of India (5-Judge Constitution Bench)',
    year: 2014,
    coreRule: 'Registration of FIR is mandatory under Section 154 CrPC (BNSS 173) if information discloses commission of a cognizable offence.',
    keyDirectives: [
      'Police CANNOT conduct preliminary inquiry if cognizable offence is disclosed',
      'Police MUST register FIR immediately without delay',
      'Refusal by police is punishable under Section 166A IPC / Section 198 BNS',
      'Preliminary inquiry is limited strictly to medical negligence, corruption, matrimonial disputes and cannot exceed 7 days'
    ],
    importanceForCitizens: 'Police cannot tell you "we will investigate first, then write FIR". They MUST register the FIR first.'
  },
  {
    id: 'arnesh-kumar',
    caseName: 'Arnesh Kumar v. State of Bihar',
    citation: '(2014) 8 SCC 273',
    bench: 'Supreme Court of India',
    year: 2014,
    coreRule: 'Police cannot automatically arrest persons in cases where the offence is punishable with imprisonment for 7 years or less.',
    keyDirectives: [
      'Police must issue a Notice of Appearance under Section 41A CrPC / 35(3) BNSS',
      'Arrest requires specific written reasons recorded by police',
      'Magistrate cannot authorize detention mechanically without reviewing police reasons'
    ],
    importanceForCitizens: 'Protects citizens against unnecessary and arbitrary arrests in minor disputes, matrimonial complaints, or low-threshold allegations.'
  },
  {
    id: 'paramvir-singh',
    caseName: 'Paramvir Singh Saini v. Baljit Singh',
    citation: '(2020) SCC OnLine SC 1230',
    bench: 'Supreme Court of India (3-Judge Bench)',
    year: 2020,
    coreRule: 'Mandatory installation of CCTV cameras with night vision and audio recording in every police station across India.',
    keyDirectives: [
      'CCTVs must cover entry/exit, main gate, lockups, corridors, reception, SHO room, and interrogation rooms',
      'Footage must be safely preserved for at least 18 months',
      'Victims of custodial torture can petition Magistrate/High Court for preservation of CCTV footage'
    ],
    importanceForCitizens: 'Stations can no longer hide behind closed doors. You can petition the court to summon the CCTV footage to prove police misconduct or illegal detention.'
  },
  {
    id: 'prakash-singh',
    caseName: 'Prakash Singh v. Union of India',
    citation: '(2006) 8 SCC 1',
    bench: 'Supreme Court of India',
    year: 2006,
    coreRule: 'Landmark Police Reforms directing establishment of independent State & District Police Complaints Authorities (SPCA / DPCA).',
    keyDirectives: [
      'Independent Police Complaints Authority at State & District levels',
      'Headed by retired High Court or District Judge',
      'Empowered to investigate custodial death, torture, rape, extortion, and abuse of power by police'
    ],
    importanceForCitizens: 'Provides an external civilian oversight body to complain against police officers outside the police chain of command.'
  },
  {
    id: 'prem-shankar-shukla',
    caseName: 'Prem Shankar Shukla v. Delhi Administration',
    citation: '(1980) 3 SCC 526',
    bench: 'Supreme Court of India (V.R. Krishna Iyer, J.)',
    year: 1980,
    coreRule: 'Handcuffing is prima facie inhuman and violates Article 21. Handcuffs cannot be used routinely during arrest or transit without judicial permission.',
    keyDirectives: [
      'Handcuffs cannot be used as routine practice or punitive humiliation',
      'Police must record reasons and obtain Magistrate sanction except in rare cases of extreme violence',
      'Handcuffing without recorded justification constitutes illegal custodial abuse'
    ],
    importanceForCitizens: 'Police cannot parade you in handcuffs for ordinary offences; you can object and demand reasons before the Magistrate.'
  },
  {
    id: 'puttaswamy-privacy',
    caseName: 'K.S. Puttaswamy v. Union of India',
    citation: '(2017) 10 SCC 1',
    bench: 'Supreme Court of India (9-Judge Constitution Bench)',
    year: 2017,
    coreRule: 'The Right to Privacy is a Fundamental Right guaranteed under Article 21 of the Constitution of India.',
    keyDirectives: [
      'Privacy extends to personal digital devices, phones, chats, and private correspondence',
      'Any state intrusion must satisfy legality, legitimate state aim, and strict proportionality',
      'Routine street search or forced unlocking of mobile phones without a warrant or specific FIR nexus is unconstitutional'
    ],
    importanceForCitizens: 'Protects citizens from arbitrary demands by police on the road to unlock phones or inspect personal WhatsApp/photos.'
  }
];

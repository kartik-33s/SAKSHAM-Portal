import { PoliceSituation } from '../types';

export const POLICE_SITUATIONS: PoliceSituation[] = [
  {
    id: 'fir-refusal',
    title: 'Police Refusal to Register an FIR',
    hindiTitle: 'पुलिस द्वारा एफआईआर (FIR) दर्ज करने से मना करने पर क्या करें',
    category: 'fir',
    urgency: 'HIGH',
    iconName: 'FileText',
    thirtySecondSummary: 'FIR is mandatory for cognizable offences (Lalita Kumari ruling). If SHO refuses: demand GD entry, send written complaint to SP/DCP by Speed Post, then move Magistrate under BNSS 175(3) / CrPC 156(3). Officer faces up to 2 years jail.',
    immediateActions: [
      'Understand Cognizable Offence: For offences like theft, assault, robbery, fraud, sexual harassment, kidnapping, or cybercrime, the police are MANDATED by law to register an FIR immediately.',
      'Request a GD Entry (General Diary / Daily Diary): If the officer hesitates, ask them to make an official entry of your written complaint in the station GD register and provide the GD number with a stamped acknowledgment.',
      'Remember the "Zero FIR" Rule: If the incident occurred outside the local station\'s jurisdiction, they MUST still register a "Zero FIR" and transfer it to the concerned police station (BNSS Sec 173(1)).',
      'Step 1 Escalation - Written Complaint to SP/DCP: Send the complete written complaint to the Superintendent of Police (SP / DCP) by Registered Post / Speed Post with Acknowledgment Due under BNSS Sec 173(4) / CrPC Sec 154(3).',
      'Step 2 Escalation - File Application to Magistrate: If SP does not act, file an application before the Metropolitan/Judicial Magistrate under BNSS Sec 175(3) / CrPC Sec 156(3) seeking court direction to register FIR.'
    ],
    thingsNotToDo: [
      'DO NOT leave the police station with only verbal assurances without a stamped copy of your complaint or GD number.',
      'DO NOT pay any money or "station fees" for registering an FIR (copy of FIR is legally 100% FREE under BNSS Sec 173(2)).',
      'DO NOT assume you cannot file if incident happened in another city; Zero FIR covers all jurisdictions.'
    ],
    spokenScript: {
      english: 'Officer, as held by the Constitution Bench of the Supreme Court of India in Lalita Kumari v. Govt of UP, registration of FIR is mandatory when information discloses a cognizable offence. Refusal to register is a punishable criminal offence under Section 198 of Bharatiya Nyaya Sanhita (Section 166A IPC). If not an FIR, please give me a stamped GD entry copy right now.',
      hindi: 'अधिकारी महोदय, सुप्रीम कोर्ट की 5 जजों की संवैधानिक पीठ (ललिता कुमारी बनाम यूपी सरकार) के अनुसार संज्ञेय अपराध में एफआईआर दर्ज करना अनिवार्य है। एफआईआर न लिखना बीएनएस की धारा 198 (आईपीसी 166ए) के तहत दंडनीय अपराध है। कृपया मुझे मेरी शिकायत की मुहर लगी पावती (GD एंट्री) दें।',
      hinglish: 'Officer, Supreme Court ke Lalita Kumari judgment ke anusaar cognizable offence me FIR darj karna mandatory hai. FIR na likhna BNS Section 198 / IPC 166A me punishable crime hai. Kripya mujhe stamped GD entry receipt dijiye.',
      contextNote: 'Firmly state Section 198 BNS / 166A IPC. Police officers are legally aware that non-registration carries mandatory jail term.'
    },
    legalRights: [
      {
        title: 'Mandatory FIR Registration (Lalita Kumari Mandate)',
        bnssSection: 'BNSS, 2023 - Section 173(1)',
        crpcSection: 'CrPC, 1973 - Section 154(1)',
        landmarkJudgment: 'Lalita Kumari v. Govt of U.P. (2014) 2 SCC 1',
        summary: 'Registration of FIR is mandatory under Section 173 BNSS / 154 CrPC if information discloses commission of a cognizable offence; no preliminary inquiry is permissible in such cases.'
      },
      {
        title: 'Punishment for Police Refusing FIR',
        bnsSection: 'BNS, 2023 - Section 198',
        ipcSection: 'IPC, 1860 - Section 166A(c)',
        summary: 'Public servant knowingly disobeying direction of law (including failing to record information regarding cognizable offences) shall be punished with rigorous imprisonment up to 2 years and fine.'
      },
      {
        title: 'Free Copy of FIR to Informant',
        bnssSection: 'BNSS, 2023 - Section 173(2)',
        crpcSection: 'CrPC, 1973 - Section 154(2)',
        summary: 'A copy of the FIR recorded under subsection (1) shall be given forth with, free of cost, to the informant or complainant.'
      },
      {
        title: 'Zero FIR Provision',
        bnssSection: 'BNSS, 2023 - Section 173(1) Proviso',
        summary: 'Information regarding cognizable offence can be provided irrespective of the area where the crime was committed. Station must register Zero FIR and transfer to jurisdiction.'
      }
    ],
    complaintRoutes: [
      {
        authority: 'Superintendent of Police (SP) / Deputy Commissioner of Police (DCP)',
        level: 'Statutory First Escalation',
        legalProvision: 'Under BNSS Section 173(4) / CrPC Section 154(3)',
        howToReach: 'Send your written complaint with evidence by Registered/Speed Post with AD or meet in person during public hearing hours.',
        documentRequired: ['Written complaint copy', 'Copy of GD entry/postal receipt showing station refusal', 'Identity proof']
      },
      {
        authority: 'Judicial Magistrate First Class (JMFC) / Metropolitan Magistrate',
        level: 'Judicial Remedy',
        legalProvision: 'Under BNSS Section 175(3) / CrPC Section 156(3)',
        howToReach: 'Engage a lawyer or DLSA Legal Aid advocate to file an application under Sec 175(3) BNSS directing police to register FIR and file compliance report.',
        documentRequired: ['Affidavit of complainant', 'Copy of Sec 173(4) complaint sent to SP with postal receipt', 'Evidence of offence']
      }
    ],
    officialSources: [
      {
        sourceName: 'Supreme Court of India (Constitution Bench)',
        citation: 'Lalita Kumari v. Government of U.P. (2014) 2 SCC 1'
      },
      {
        sourceName: 'Bharatiya Nagarik Suraksha Sanhita, 2023',
        citation: 'Sections 173(1), 173(2), 173(4), 175(3)'
      }
    ]
  },
  {
    id: 'detention-arrest',
    title: 'Questioning, Detention & Arrest',
    hindiTitle: 'हिरासत और गिरफ़्तारी के समय आपके संवैधानिक अधिकार',
    category: 'arrest',
    urgency: 'CRITICAL',
    iconName: 'ShieldAlert',
    thirtySecondSummary: 'You have a constitutional right to know the exact grounds of arrest, inform a family member within 12 hours, receive a signed Arrest Memo, get a free medical checkup, and be presented before a Magistrate within 24 hours.',
    immediateActions: [
      'Ask the arresting officer clearly: "Am I being detained or placed under formal arrest? Under what sections?"',
      'Demand an Arrest Memo (Form BNSS 47 / CrPC 41B). It must state the date, exact time, location, reasons for arrest, and be witnessed by at least one family member or respectable local citizen.',
      'Exercise your Right to Inform Family (BNSS Sec 48 / CrPC 50A). Police MUST allow you to phone or inform a relative/friend or advocate immediately.',
      'Insist on a Mandatory Medical Examination by a registered government medical officer upon arrest and every 48 hours (BNSS Sec 53 & 54 / CrPC 54). Any existing injuries must be noted down in the MLC report.',
      'Insist on production before the nearest Judicial Magistrate within 24 hours (excluding journey time) as guaranteed under Article 22(2) of the Constitution.'
    ],
    thingsNotToDo: [
      'DO NOT sign any blank paper, confession, or statement in the police station. Statements given to police are NOT admissible in court (BNSS Sec 183 / CrPC 162 & Sec 23 BSA / Sec 25 Evidence Act).',
      'DO NOT physically resist lawful arrest; instead, firmly state your constitutional rights on camera or in front of witnesses.',
      'DO NOT answer self-incriminating questions without an advocate present (Article 20(3) Right against Self-Incrimination).'
    ],
    spokenScript: {
      english: 'Sir, under Article 22(1) of the Constitution of India and Section 36 of BNSS (Section 50 CrPC), I have the legal right to know the precise grounds of my arrest. Please prepare my Arrest Memo signed by a witness as mandated by the Supreme Court in D.K. Basu v. State of West Bengal, and allow me to immediately inform my family and my advocate.',
      hindi: 'महोदय, भारतीय संविधान के अनुच्छेद 22(1) और बीएनएसएस की धारा 36 के तहत मुझे अपनी गिरफ़्तारी का स्पष्ट कारण जानने का अधिकार है। कृपया सुप्रीम कोर्ट के डी.के. बसु दिशानिर्देशों के अनुसार मेरा अरेस्ट मेमो तैयार करें और मुझे तुरंत अपने परिवार व वकील को सूचित करने दें।',
      hinglish: 'Sir, Article 22(1) Constitution aur BNSS Section 36 ke tehat mujhe grounds of arrest janne ka poora haq hai. Kripya D.K. Basu guidelines ke anusaar Arrest Memo banaiye aur mere parivaar aur vakeel ko phone karne dijiye.',
      contextNote: 'Recite calmly. Mention D.K. Basu guidelines by name—police officers know this judgment carries direct contempt of court liability.'
    },
    legalRights: [
      {
        title: 'Right to Grounds of Arrest & Arrest Memo',
        bnssSection: 'BNSS, 2023 - Section 36 & 47',
        crpcSection: 'CrPC, 1973 - Section 50 & 41B',
        constitutionalArticle: 'Article 22(1) Constitution of India',
        landmarkJudgment: 'D.K. Basu v. State of West Bengal (1997) 1 SCC 416',
        summary: 'Officer must bear visible, clear identification and name tag. Officer must prepare an Arrest Memo specifying date, time, and signed by at least one witness.'
      },
      {
        title: 'Mandatory Notice Before Arrest (< 7 Years Offence)',
        bnssSection: 'BNSS, 2023 - Section 35(3)',
        crpcSection: 'CrPC, 1973 - Section 41A',
        landmarkJudgment: 'Arnesh Kumar v. State of Bihar (2014) 8 SCC 273',
        summary: 'For offences carrying punishment up to 7 years, police CANNOT arrest mechanically. They must first issue a formal Notice of Appearance under Section 35(3) BNSS / 41A CrPC.'
      },
      {
        title: 'Right to Inform Relative / Friend',
        bnssSection: 'BNSS, 2023 - Section 48',
        crpcSection: 'CrPC, 1973 - Section 50A',
        summary: 'Police must immediately notify a friend, relative, or person nominated by the arrestee regarding the arrest and place of detention within 12 hours.'
      },
      {
        title: 'Production Before Magistrate in 24 Hours',
        bnssSection: 'BNSS, 2023 - Section 57',
        crpcSection: 'CrPC, 1973 - Section 57',
        constitutionalArticle: 'Article 22(2) Constitution of India',
        summary: 'No person detained in custody shall be detained beyond 24 hours without the specific authorization of a Judicial Magistrate.'
      },
      {
        title: 'Right to Free Legal Aid',
        bnssSection: 'BNSS, 2023 - Section 304',
        crpcSection: 'CrPC, 1973 - Section 304',
        constitutionalArticle: 'Article 39A Constitution of India',
        summary: 'Every arrested person unable to engage private counsel is entitled to free legal assistance from the District Legal Services Authority (DLSA / NALSA Helpline: 15100).'
      }
    ],
    complaintRoutes: [
      {
        authority: 'Duty Judicial Magistrate / Chief Judicial Magistrate (CJM)',
        level: 'Immediate Judicial Protection',
        legalProvision: 'Under Section 57 BNSS & Article 22 Constitution',
        howToReach: 'When produced before Magistrate within 24 hours, verbally state any illegal detention or torture directly to the Magistrate. The Magistrate will order immediate medical examination.',
        documentRequired: ['Medical examination record', 'Arrest memo', 'Written statement before Magistrate']
      },
      {
        authority: 'National Human Rights Commission (NHRC) / State HRC',
        level: 'Constitutional Oversight',
        legalProvision: 'Protection of Human Rights Act, 1993',
        howToReach: 'File online complaint at hrcnet.nic.in or Toll-Free 14433 / 1800-11-9595 for illegal detention, custodial violence, or failure to follow D.K. Basu norms.',
        documentRequired: ['Complaint details', 'Station name', 'Medical certificate']
      }
    ],
    officialSources: [
      {
        sourceName: 'Supreme Court of India',
        citation: 'D.K. Basu v. State of West Bengal (1997) 1 SCC 416 (11 Mandatory Directives on Arrest)'
      },
      {
        sourceName: 'Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023',
        citation: 'Sections 35, 36, 47, 48, 53, 54, 57, 304'
      }
    ]
  },
  {
    id: 'traffic-stop',
    title: 'Traffic Stop & Vehicle Interception',
    hindiTitle: 'ट्रैफिक पुलिस द्वारा रोके जाने पर आपके अधिकार',
    category: 'traffic',
    urgency: 'MEDIUM',
    iconName: 'Car',
    thirtySecondSummary: 'Stay calm inside the vehicle. Ask for officer rank & ID. DigiLocker/mParivahan documents are legally valid. Police cannot snatch vehicle keys or force you out without lawful cause.',
    immediateActions: [
      'Pull over safely, turn on hazard lights, and keep hands visible on the steering wheel.',
      'Politely ask the officer for their name, designation tag, and identity card. Only an officer of Sub-Inspector (SI) rank or above wearing official uniform can issue standard challans above specified limits.',
      'Show your Driving License, RC, Insurance, and PUC via government DigiLocker or mParivahan apps on your screen. You are NOT required to surrender physical documents unless license is being impounded under Section 206 MVA.',
      'If fined, demand an official electronic e-challan or printed receipt with the officer\'s ID and exact MV Act Section. Never pay cash without an instant official receipt.',
      'Police officers have NO legal right to snatch vehicle keys, deflate tires, or physically pull you out of the vehicle.'
    ],
    thingsNotToDo: [
      'DO NOT flee or speed away from a police barricade or checkpoint.',
      'DO NOT hand over your physical unlocked phone to the officer; show the DigiLocker screen while holding it.',
      'DO NOT offer or agree to pay unofficial cash "settlement" amounts.',
      'DO NOT touch, shove, or argue aggressively with on-duty police personnel.'
    ],
    spokenScript: {
      english: 'Namaste Officer. May I politely know your name and designation? Here are my valid Driving License and vehicle papers on the government DigiLocker app as recognized under Rule 139 of the Central Motor Vehicles Rules. Please issue an official e-challan if an infraction has occurred.',
      hindi: 'नमस्ते अधिकारी महोदय। क्या मैं आपका शुभ नाम और पद जान सकता हूँ? केंद्र सरकार के नियम 139 के तहत डिजीलॉकर/एम-परिवहन पर मेरे सभी वैध दस्तावेज़ उपलब्ध हैं। यदि कोई उल्लंघन हुआ है, तो कृपया मुझे आधिकारिक ई-चालान रसीद प्रदान करें।',
      hinglish: 'Namaste Officer. Kya main aapka naam aur designation jaan sakta hoon? Central Motor Vehicles Rules ke Rule 139 ke tehat DigiLocker par mere valid documents hain. Kripya mujhe official e-challan dijiye.',
      contextNote: 'Speak in a calm, respectful, yet firm tone. Maintain steady eye contact.'
    },
    legalRights: [
      {
        title: 'Digital Documents 100% Legally Valid',
        bnssSection: 'Central Motor Vehicles Rules (CMVR), 1989 - Rule 139',
        summary: 'MoRTH Notification (RT-11036/64/2017-MVL): Electronic records on DigiLocker / mParivahan platforms are legally treated at par with original physical certificates across all Indian States.'
      },
      {
        title: 'Rank Requirement for Compounding Fines',
        summary: 'Under Motor Vehicles Act Section 200, only police officers of the rank of Sub-Inspector (SI) / Assistant Sub-Inspector (ASI) or above (typically bearing 1 to 2 stars) are legally empowered to compound fines on the spot.'
      },
      {
        title: 'Breathalyzer & Blood Test Safeguards',
        bnssSection: 'Motor Vehicles Act, 1988 - Section 203 & 204',
        summary: 'Breath analysis test must use a clean, sealed disposable mouthpiece. If positive, you have the right to request a formal blood sample test at a registered government hospital within 2 hours.'
      },
      {
        title: 'Prohibition of Ignition Snatching',
        summary: 'High Court guidelines (e.g. Madras HC & Delhi HC directives) prohibit traffic police personnel from snatching keys from running vehicles or using physical coercion during routine checks.'
      }
    ],
    complaintRoutes: [
      {
        authority: 'Traffic Police Helpline / Traffic ACP',
        level: 'First Escalation',
        legalProvision: 'State Traffic Police Grievance Cell',
        howToReach: 'Call 1095 / 112 or tweet/tag the official state Traffic Police handle with time, date, vehicle number, and officer badge.',
        documentRequired: ['Time & location of stop', 'Officer name/badge number', 'Video/audio recording if taken in public']
      },
      {
        authority: 'State Police Complaints Authority (SPCA)',
        level: 'Independent Judicial Authority',
        legalProvision: 'Under Supreme Court Directive in Prakash Singh Case (2006)',
        howToReach: 'File a written complaint before District Police Complaints Authority (DPCA) or State PCA against extortion/abuse of power.',
        documentRequired: ['Copy of complaint', 'Photographs/challan copy', 'Affidavit']
      }
    ],
    officialSources: [
      {
        sourceName: 'Ministry of Road Transport and Highways (MoRTH)',
        citation: 'Notification No. RT-11036/64/2017-MVL dated 19.11.2018 (Acceptance of DL/RC on DigiLocker/mParivahan)'
      },
      {
        sourceName: 'Motor Vehicles Act, 1988 (Amended 2019)',
        citation: 'Sections 130, 139, 200, 203, 206'
      }
    ]
  },
  {
    id: 'search-seizure',
    title: 'Search & Seizure of Property / Body / Phone',
    hindiTitle: 'तलाशी और सामान ज़ब्त करने के नियम व अधिकार',
    category: 'search',
    urgency: 'HIGH',
    iconName: 'Search',
    thirtySecondSummary: 'Police must possess a valid Search Warrant or record emergency grounds in writing. 2 local witnesses (Panch) must be present. A free signed Seizure Memo (Panchnama) is mandatory. Women searched only by female officer.',
    immediateActions: [
      'Demand to see the Search Warrant issued by a Magistrate. If police claim emergency search without warrant (BNSS Sec 105 / CrPC 165), they MUST record reasons in writing prior to search.',
      'Insist on Independent Witnesses (Panch Witnesses): Search must be conducted in the presence of at least two independent, respectable inhabitants of the locality.',
      'Demand immediate copy of Seizure List (Panchnama): Police MUST prepare a detailed inventory of every single item seized and provide a free signed copy to the occupant on the spot.',
      'Body Search of Female: A female citizen can ONLY be searched by a female police officer with strict regard to decency (BNSS Sec 49(2) / CrPC 51(2)).',
      'Electronic Devices & Phone Privacy: Police CANNOT arbitrarily unlock, mirror, or confiscate mobile phones/laptops without specific judicial seizure memo/warrant (Right to Privacy - Puttaswamy).'
    ],
    thingsNotToDo: [
      'DO NOT allow police to search without local witnesses present.',
      'DO NOT sign a blank or incomplete seizure memo list; verify every single device and currency item noted.',
      'DO NOT physically obstruct search if warrant is produced, but record your formal objections in writing.'
    ],
    spokenScript: {
      english: 'Officer, please show the Search Warrant under Section 103 of BNSS (Section 93 CrPC). As required by Section 107 BNSS (Section 100 CrPC), this search must be conducted in the presence of two independent local witnesses. Please provide a stamped, signed copy of the Seizure Memo (Panchnama) before removing any item.',
      hindi: 'अधिकारी महोदय, कृपया बीएनएसएस की धारा 103 के तहत सर्च वारंट दिखाएं। बीएनएसएस की धारा 107 (सीआरपीसी 100) के अनुसार तलाशी दो स्थानीय स्वतंत्र गवाहों (पंच) की उपस्थिति में ही होनी चाहिए। कोई भी सामान ले जाने से पहले मुझे हस्ताक्षरित ज़ब्ती सूची (पंचनामा) की प्रति दें।',
      hinglish: 'Officer, kripya BNSS Section 103 ke tehat Search Warrant dikhaiye. Section 107 BNSS ke anusaar search do independent local witnesses ki presence me honi chahiye. Kisi bhi item ko le jane se pehle signed Seizure Memo (Panchnama) dijiye.',
      contextNote: 'Insist on receiving your copy of the seizure list before officers leave the premises.'
    },
    legalRights: [
      {
        title: 'Search in Presence of Independent Witnesses',
        bnssSection: 'BNSS, 2023 - Section 107',
        crpcSection: 'CrPC, 1973 - Section 100',
        summary: 'Before conducting a search, officer must call upon two or more independent and respectable inhabitants of the locality to attend and witness the search.'
      },
      {
        title: 'Mandatory Copy of Seizure List (Panchnama)',
        bnssSection: 'BNSS, 2023 - Section 107(7)',
        crpcSection: 'CrPC, 1973 - Section 100(7)',
        summary: 'The occupant of the place searched shall, in every instance, be permitted to attend during the search, and a copy of the list prepared under this section, signed by witnesses, shall be delivered to them.'
      },
      {
        title: 'Strict Decency in Searching Women',
        bnssSection: 'BNSS, 2023 - Section 49(2)',
        crpcSection: 'CrPC, 1973 - Section 51(2)',
        summary: 'Whenever it is necessary to cause a female to be searched, the search shall be made by another female with strict regard to decency.'
      },
      {
        title: 'Digital Evidence Seizure & Integrity',
        bnssSection: 'Bharatiya Sakshya Adhiniyam, 2023 - Section 63',
        landmarkJudgment: 'K.S. Puttaswamy v. Union of India (2017) 10 SCC 1 (Right to Privacy)',
        summary: 'Seizure of digital devices without hash value generation and strict chain of custody is legally challengeable; citizens possess fundamental right to data privacy.'
      }
    ],
    complaintRoutes: [
      {
        authority: 'Chief Judicial Magistrate / Jurisdictional Magistrate',
        level: 'Judicial Oversight',
        legalProvision: 'BNSS Section 497 / CrPC Section 451 & 457 (Return of Property)',
        howToReach: 'File an application before the Magistrate for return of seized property/devices (Superdari application) and challenge illegal search.',
        documentRequired: ['Copy of Seizure memo / Panchnama', 'Proof of ownership of items', 'Application for return of property']
      },
      {
        authority: 'State Police Complaints Authority (SPCA)',
        level: 'Disciplinary Complaint',
        legalProvision: 'Police Act / State Police Rules',
        howToReach: 'Submit formal complaint detailing search without warrant, missing seizure list, or harassment.',
        documentRequired: ['Affidavit', 'Witness statements']
      }
    ],
    officialSources: [
      {
        sourceName: 'Bharatiya Nagarik Suraksha Sanhita, 2023',
        citation: 'Sections 49(2), 103, 105, 107'
      },
      {
        sourceName: 'Supreme Court of India',
        citation: 'State of Punjab v. Baldev Singh (1999) 6 SCC 172'
      }
    ]
  },
  {
    id: 'police-assault-threat',
    title: 'Police Threat, Abuse, Assault & Custodial Violence',
    hindiTitle: 'पुलिस द्वारा धमकी, गाली-गलौज, मारपीट या प्रताड़ना पर कार्रवाई',
    category: 'assault',
    urgency: 'CRITICAL',
    iconName: 'AlertTriangle',
    thirtySecondSummary: 'Police have ZERO legal right to hit, torture, or verbally abuse any citizen. Get an immediate MLC (Medical Certificate) from a Govt Hospital. Demand station CCTV preservation (Paramvir Singh SC mandate). File criminal complaint before Magistrate.',
    immediateActions: [
      'Immediate Medical Checkup (MLC): Go immediately to the nearest Government Hospital (Civil Hospital / District Hospital) and tell the doctor you were assaulted by police. Insist on a formal Medico-Legal Certificate (MLC) noting all external and internal injuries.',
      'Preserve Station CCTV Footage: As per the Supreme Court landmark order in *Paramvir Singh Saini v. Baljit Singh (2020)*, all police stations MUST have functioning CCTV with audio in every room, lockup, and corridor, stored for up to 18 months. File an immediate preservation notice to the SP and Magistrate.',
      'Photograph All Injuries: Take clear, timestamped photographs and videos of all bruises, cuts, and swelling with a daily newspaper or timestamp visible.',
      'File Criminal Complaint Before Judicial Magistrate: Police protection under Section 218 BNSS / 197 CrPC does NOT apply to custodial torture or assault. You can file a direct private complaint under BNSS Sec 223 / CrPC 200.',
      'Report to NHRC / SHRC: National Human Rights Commission provides fast-track tracking of custodial violence.'
    ],
    thingsNotToDo: [
      'DO NOT wash off wounds or delay going to a government hospital for medical examination; delay weakens the MLC.',
      'DO NOT give up because the accused is a police officer; custodial torture is a grave criminal offence with zero immunity.',
      'DO NOT attend private compromise meetings at the police station without legal representation.'
    ],
    spokenScript: {
      english: 'Officer, physical assault, verbal abuse, or torture in custody violates Article 21 of the Constitution and is punishable under Sections 115, 118, and 127 of Bharatiya Nyaya Sanhita (Sections 323, 330 IPC). Under the Supreme Court ruling in Paramvir Singh Saini, this entire station is under mandatory CCTV surveillance. I will be undergoing immediate medical examination and reporting this to the Judicial Magistrate.',
      hindi: 'अधिकारी महोदय, किसी भी नागरिक पर हाथ उठाना या गाली देना संविधान के अनुच्छेद 21 का हनन है और बीएनएस की धारा 115, 118 और 127 (आईपीसी 323, 330) के तहत गैर-जमानती अपराध है। सुप्रीम कोर्ट के परमवीर सिंह सैनी आदेश के तहत थाने के सीसीटीवी सुरक्षित रहेंगे और मैं मजिस्ट्रेट के समक्ष मेडिकल रिपोर्ट प्रस्तुत करूँगा।',
      hinglish: 'Officer, custodial violence ya gaali-galoch Article 21 Constitution ka violation hai aur BNS 115, 118 me punishable crime hai. Supreme Court ke Paramvir Singh judgment ke anusaar station CCTV footage secure ki jayegi aur main Magistrate ke samne MLC present karunga.',
      contextNote: 'Citing the Paramvir Singh Saini CCTV judgment and MLC medical examination is the most effective legal deterrent against police misconduct.'
    },
    legalRights: [
      {
        title: 'Right to Life & Dignity (Zero Torture Immunity)',
        constitutionalArticle: 'Article 21 Constitution of India',
        bnsSection: 'BNS, 2023 - Sections 115, 118, 127',
        ipcSection: 'IPC, 1860 - Sections 323, 330, 331',
        summary: 'Causing hurt to extort confession or information is a severe criminal offence punishable with imprisonment up to 10 years and fine.'
      },
      {
        title: 'Mandatory CCTV Surveillance in All Police Stations',
        landmarkJudgment: 'Paramvir Singh Saini v. Baljit Singh (2020) SCC OnLine SC 1230',
        summary: 'Supreme Court mandated high-definition CCTV cameras with night vision and audio recording in all police stations, interrogation rooms, corridors, and lockups, with minimum 18-month data preservation.'
      },
      {
        title: 'Mandatory Judicial Inquiry for Custodial Injury/Death',
        bnssSection: 'BNSS, 2023 - Section 196',
        crpcSection: 'CrPC, 1973 - Section 176(1A)',
        summary: 'In any case of death, disappearance, or rape in police custody, an inquiry MUST be conducted by a Judicial Magistrate, not police.'
      }
    ],
    complaintRoutes: [
      {
        authority: 'Judicial Magistrate First Class (Private Criminal Complaint)',
        level: 'Direct Criminal Prosecution',
        legalProvision: 'Under BNSS Section 223 / CrPC Section 200',
        howToReach: 'File a complaint through an advocate before the Magistrate along with the government hospital MLC report and witness statements for issuance of summons.',
        documentRequired: ['Govt Hospital MLC report', 'Photographs of injuries', 'Witness affidavits', 'CCTV preservation request']
      },
      {
        authority: 'National Human Rights Commission (NHRC)',
        level: 'Apex Human Rights Body',
        legalProvision: 'Protection of Human Rights Act, 1993',
        howToReach: 'File online at hrcnet.nic.in or call Toll-Free 14433 / 1800-11-9595. NHRC issues direct summons to DGP and awards monetary compensation.',
        documentRequired: ['Complaint details', 'Medical papers', 'Station name and officer names']
      },
      {
        authority: 'State Police Complaints Authority (SPCA)',
        level: 'Disciplinary & Dismissal Oversight',
        legalProvision: 'Supreme Court Directive (Prakash Singh)',
        howToReach: 'Submit complaint for major misconduct leading to suspension/dismissal of erring officers.',
        documentRequired: ['Complaint copy', 'MLC']
      }
    ],
    officialSources: [
      {
        sourceName: 'Supreme Court of India',
        citation: 'Paramvir Singh Saini v. Baljit Singh (2020) SCC OnLine SC 1230 (Mandatory CCTV Directive)'
      },
      {
        sourceName: 'Supreme Court of India',
        citation: 'Nilabati Behera v. State of Orissa (1993) 2 SCC 746 (Compensation for Custodial Torture)'
      }
    ]
  },
  {
    id: 'bribe-extortion',
    title: 'Bribe Demanded / Extortion / Illegal Gratification',
    hindiTitle: 'रिश्वत मांगने या अवैध वसूली पर कानूनी कार्रवाई',
    category: 'bribe',
    urgency: 'HIGH',
    iconName: 'Coins',
    thirtySecondSummary: 'Demand of bribe is a non-bailable criminal offence under Prevention of Corruption Act (Sec 7). Never pay cash. Record audio/video (legal in public interactions). Report to State Anti-Corruption Bureau (Toll-Free 1064) or CBI (1800-113-444).',
    immediateActions: [
      'Do Not Pay the Bribe: Paying a bribe under duress is protected if reported to the Anti-Corruption Bureau within 7 days under Section 8 of the Prevention of Corruption (Amendment) Act, 2018.',
      'Record Evidence Discreetly: Audio or video recording of a public servant demanding illegal gratification while on public duty is legally admissible as electronic evidence under Section 63 of Bharatiya Sakshya Adhiniyam, 2023.',
      'Note Officer Identity: Note down the officer\'s name tag, vehicle number, station, and exact time/location.',
      'Call Anti-Corruption Helpline 1064: Every Indian state operates a 24x7 Anti-Corruption Bureau (ACB / Vigilance) toll-free number: 1064.',
      'Participate in ACB Trap: If you report before paying, the Anti-Corruption Bureau sets up a legally coordinated trap using phenolphthalein-marked currency to catch the corrupt official red-handed.'
    ],
    thingsNotToDo: [
      'DO NOT agree to pay cash without an official government treasury receipt.',
      'DO NOT delete audio/video recordings or original chat messages.',
      'DO NOT transfer money to private QR codes or UPI IDs shown by police personnel.'
    ],
    spokenScript: {
      english: 'Sir, demanding illegal gratification or bribe is a non-bailable offence under Section 7 of the Prevention of Corruption Act, 1988 punishable with up to 7 years imprisonment. If there is a legitimate fine or government fee, please issue an official government e-challan or treasury receipt, and I will pay through official government portal only.',
      hindi: 'महोदय, रिश्वत या अनुचित लाभ मांगना भ्रष्टाचार निवारण अधिनियम, 1988 की धारा 7 के तहत गैर-जमानती अपराध है जिसमें 7 साल तक की जेल हो सकती है। यदि कोई वैध सरकारी शुल्क या चालान है, तो मुझे आधिकारिक ई-चालान दें, मैं केवल सरकारी पोर्टल द्वारा भुगतान करूँगा।',
      hinglish: 'Sir, bribe ya illegal cash maangna Prevention of Corruption Act Section 7 me non-bailable offence hai. Agar koi valid fine hai toh official e-challan ya government receipt dijiye, main official portal se pay karunga.',
      contextNote: 'Insisting on an official e-challan or treasury receipt immediately stops informal extortion attempts.'
    },
    legalRights: [
      {
        title: 'Bribe Solicitation is a Severe Non-Bailable Offence',
        summary: 'Prevention of Corruption Act, 1988 (Sec 7 & 7A): Any public servant who obtains or attempts to obtain an undue advantage with intention to perform public duty improperly shall be punished with imprisonment up to 7 years.'
      },
      {
        title: 'Protection for Coerced Persons (7-Day Reporting Window)',
        summary: 'Prevention of Corruption (Amendment) Act, 2018 - Section 8 Proviso: A person compelled to give an undue advantage shall not be liable if they report the matter to the law enforcement authority within 7 days.'
      },
      {
        title: 'Electronic Recording as Valid Evidence',
        bnssSection: 'Bharatiya Sakshya Adhiniyam (BSA), 2023 - Section 63',
        summary: 'Phone audio/video recordings with certificate under Section 63 BSA (formerly 65B IEA) are fully admissible in court for corrupt trap proceedings.'
      }
    ],
    complaintRoutes: [
      {
        authority: 'State Anti-Corruption Bureau (ACB) / Directorate of Vigilance',
        level: 'State Anti-Corruption Law Enforcement',
        legalProvision: 'Prevention of Corruption Act, 1988',
        howToReach: 'Call Toll-Free 1064 (All States) or visit local ACB Superintendent office to register a complaint for laying a trap.',
        documentRequired: ['Audio/video recording', 'Details of demand', 'Officer name/station']
      },
      {
        authority: 'Central Bureau of Investigation (CBI Anti-Corruption Branch)',
        level: 'Central Government & UT Cases',
        legalProvision: 'Delhi Special Police Establishment Act, 1946',
        howToReach: 'Call Toll-Free 1800-113-444 / 011-24362755 or email acb@cbi.gov.in for cases involving central police/UT/railways.',
        documentRequired: ['Written complaint', 'Evidence of bribe demand']
      },
      {
        authority: 'Central Vigilance Commission (CVC) / CPGRAMS',
        level: 'Vigilance Oversight',
        legalProvision: 'CVC Act, 2003 / Public Interest Disclosure (Whistleblower)',
        howToReach: 'Lodge online grievance at pgportal.gov.in (CPGRAMS) or cvc.gov.in.',
        documentRequired: ['Complaint details']
      }
    ],
    officialSources: [
      {
        sourceName: 'Government of India',
        citation: 'Prevention of Corruption Act, 1988 (Amended 2018), Sections 7, 7A, 8, 13'
      },
      {
        sourceName: 'Supreme Court of India',
        citation: 'Neeraj Dutta v. State (Govt. of NCT of Delhi) (2023) 4 SCC 731 (Constitution Bench on Bribe Demand Proof)'
      }
    ]
  },
  {
    id: 'women-juveniles',
    title: 'Special Rights of Women, Juveniles & Vulnerable Persons',
    hindiTitle: 'महिलाओं, बच्चों और वरिष्ठ नागरिकों के विशेष कानूनी सुरक्षा अधिकार',
    category: 'women_juvenile',
    urgency: 'HIGH',
    iconName: 'HeartHandshake',
    thirtySecondSummary: 'Women CANNOT be arrested between sunset and sunrise (6 PM - 6 AM) without Magistrate order. Interrogation of women, children (<15), and seniors (>60) must happen at RESIDENCE only. Juveniles can NEVER be kept in police lockup or jail.',
    immediateActions: [
      'Sunset to Sunrise Rule for Women: Under BNSS Section 43(5) / CrPC Section 46(4), NO woman can be arrested after sunset and before sunrise except in extraordinary circumstances with prior written permission of Judicial Magistrate First Class.',
      'Presence of Female Officer Mandatory: Any arrest or search of a female citizen MUST be carried out strictly by or in the presence of a woman police officer (BNSS Sec 43(1) & 49(2)).',
      'Interrogation at Residence Only: Under BNSS Section 179(1) / CrPC Section 160(1), no male under 15, male above 60, woman of any age, or mentally/physically disabled person can be summoned to the police station for questioning; their statement MUST be recorded at their residence in presence of parents/guardians.',
      'Juveniles (Under 18 Years) Protection: Governed strictly by the Juvenile Justice (Care and Protection of Children) Act, 2015. A child in conflict with law CANNOT be placed in a police lockup or jail. Must be placed under the charge of Child Welfare Police Officer (CWPO) in plain clothes and produced before Juvenile Justice Board (JJB) within 24 hours.',
      'Free Legal Aid for All Women in Custody: Under Legal Services Authorities Act, 1987 Section 12, every woman and child in custody is automatically entitled to free legal counsel regardless of income.'
    ],
    thingsNotToDo: [
      'DO NOT allow a woman to be taken to a police station at night without a written Judicial Magistrate order.',
      'DO NOT allow male police officers to touch or physically handle a woman or young girl.',
      'DO NOT allow a minor child to be placed in an adult lockup or handcuffed.'
    ],
    spokenScript: {
      english: 'Officer, under Section 43(5) of Bharatiya Nagarik Suraksha Sanhita (Section 46(4) CrPC), no woman can be arrested after sunset and before sunrise without prior written permission of the Judicial Magistrate. Furthermore, under Section 179 BNSS (Section 160 CrPC), women and minors cannot be summoned to the police station for questioning; any statement must be recorded at our residence.',
      hindi: 'अधिकारी महोदय, बीएनएसएस की धारा 43(5) (सीआरपीसी 46(4)) के अनुसार सूर्यास्त के बाद और सूर्योदय से पहले किसी भी महिला को मजिस्ट्रेट के पूर्व आदेश के बिना गिरफ़्तार नहीं किया जा सकता। धारा 179 के तहत महिलाओं और 15 वर्ष से कम आयु के बच्चों को पूछताछ के लिए थाने नहीं बुलाया जा सकता, उनका बयान केवल निवास स्थान पर ही दर्ज होगा।',
      hinglish: 'Officer, BNSS Section 43(5) ke anusaar sunset ke baad aur sunrise se pehle kisi mahila ko bina Magistrate order ke arrest nahi kiya ja sakta. Section 179 ke tehat mahilaon aur 15 saal se kam bachhon ko station nahi bulaya ja sakta, statement ghar par hi record hogi.',
      contextNote: 'Firmly state BNSS Section 43(5) & 179. Police stations are strictly scrutinized for violations of female and child custody rules.'
    },
    legalRights: [
      {
        title: 'Prohibition of Night Arrest of Women',
        bnssSection: 'BNSS, 2023 - Section 43(5)',
        crpcSection: 'CrPC, 1973 - Section 46(4)',
        summary: 'Save in exceptional circumstances, no woman shall be arrested after sunset and before sunrise, and where such exceptional circumstances exist, the woman police officer shall obtain the prior permission of the Judicial Magistrate First Class.'
      },
      {
        title: 'Questioning of Women & Minors at Residence Only',
        bnssSection: 'BNSS, 2023 - Section 179(1) Proviso',
        crpcSection: 'CrPC, 1973 - Section 160(1) Proviso',
        summary: 'No male person under 15 years, or above 60 years, or woman, or person with physical disability shall be required to attend at any place other than the place in which such person resides.'
      },
      {
        title: 'Juvenile Justice Act Safeguards',
        summary: 'Juvenile Justice (Care & Protection of Children) Act, 2015: In no case shall a child alleged to be in conflict with law be placed in a police lockup or lodged in a jail. Handled only by Child Welfare Police Officer in plain clothes.'
      },
      {
        title: 'Universal Free Legal Aid for Women & Children',
        constitutionalArticle: 'Article 39A Constitution of India',
        summary: 'Section 12 of Legal Services Authorities Act, 1987: Women and children are eligible for free legal aid in all criminal/custodial matters.'
      }
    ],
    complaintRoutes: [
      {
        authority: 'National Commission for Women (NCW) / State Women Commission',
        level: 'Statutory Body for Women Rights',
        legalProvision: 'National Commission for Women Act, 1990',
        howToReach: 'Call 24x7 Women Helpline 1091 / 1090 (National 7827170170) or file online complaint at ncwapps.nic.in.',
        documentRequired: ['Complaint statement', 'Details of incident']
      },
      {
        authority: 'National Commission for Protection of Child Rights (NCPCR)',
        level: 'Child Rights Protection Body',
        legalProvision: 'CPCR Act, 2005 / JJ Act, 2015',
        howToReach: 'Call Childline 1098 or file complaint on POCSO E-box / baalsahajyata.ncpcr.gov.in.',
        documentRequired: ['Incident report', 'Child age proof']
      }
    ],
    officialSources: [
      {
        sourceName: 'Bharatiya Nagarik Suraksha Sanhita, 2023',
        citation: 'Sections 43(1), 43(5), 49(2), 179(1)'
      },
      {
        sourceName: 'Ministry of Women & Child Development',
        citation: 'Juvenile Justice (Care and Protection of Children) Act, 2015, Sections 10, 12'
      }
    ]
  },
  {
    id: 'cyber-fraud-account-freeze',
    title: 'Cyber Crime, Online Financial Fraud & Bank Account Freezing',
    hindiTitle: 'साइबर ठगी, बैंक खाता फ्रीज और ऑनलाइन धोखाधड़ी पर आपके अधिकार',
    category: 'cyber',
    urgency: 'HIGH',
    iconName: 'Laptop',
    thirtySecondSummary: 'Call 1930 immediately to freeze fraudulent money transfers. Police must register FIR for online scams. If police freeze your legitimate bank account due to layered transactions, you are entitled to Section 106 BNSS notice & de-freezing of un-tainted balance via Magistrate.',
    immediateActions: [
      'Call National Cyber Helpline 1930 Immediately: Dial 1930 within the "Golden Hour" (first 2-3 hours) so the Indian Cyber Crime Coordination Centre (I4C) can trigger automated freeze requests to destination banks and payment gateways.',
      'File Formal Online Complaint: Lodge a comprehensive complaint on the official portal www.cybercrime.gov.in and download the official acknowledgment PDF with the acknowledgment number.',
      'FIR Registration for Major Losses: Police cannot refuse to register an FIR for online financial theft or impersonation under BNS Sec 318(4) / IPC 420 & IT Act Sec 66D.',
      'If Your Bank Account is Frozen by Police: Request the exact requisition notice under Section 106 BNSS / 102 CrPC from your bank and the investigating Cyber Police Station.',
      'Remedy Against Total Account Lien: As ruled by various High Courts, police cannot freeze entire bank accounts if only a small specific fraction is disputed. File an application before the jurisdictional Judicial Magistrate for partial de-freezing (de-freezing non-disputed amount).'
    ],
    thingsNotToDo: [
      'DO NOT delete WhatsApp chats, transaction SMS, Telegram messages, transaction UTR numbers, or phishing URLs.',
      'DO NOT share OTPs, screen sharing apps (AnyDesk, TeamViewer), or remote access to anyone claiming to be "Cyber Police" on WhatsApp video calls.',
      'DO NOT visit unauthorized recovery agents or pay money to online third-parties promising to recover lost funds.'
    ],
    spokenScript: {
      english: 'Officer, I have registered my complaint on the MHA National Cybercrime Reporting Portal under Acknowledgment Number [Number] and contacted Helpline 1930. Under Section 173 BNSS and Section 66D of the IT Act, this discloses a cognizable cyber offence. Please register the Zero FIR and initiate a formal debit-freeze requisition to the nodal bank officers.',
      hindi: 'अधिकारी महोदय, मैंने गृह मंत्रालय के साइबर पोर्टल पर पावती संख्या [नंबर] के तहत शिकायत दर्ज की है और हेल्पलाइन 1930 पर सूचना दी है। बीएनएसएस की धारा 173 और आईटी एक्ट की धारा 66D के तहत यह संज्ञेय अपराध है। कृपया तत्काल एफआईआर दर्ज कर बैंक नोडल अधिकारी को रिकवरी नोटिस भेजें।',
      hinglish: 'Officer, maine MHA Cybercrime portal par acknowledgment number [Number] ke sath complaint file ki hai. BNSS Section 173 aur IT Act Section 66D ke tehat FIR register karein aur destination accounts ko freeze karne ke liye nodal officer ko notice bhejein.',
      contextNote: 'Provide the Cyber Crime Portal acknowledgment number and transaction UTR slips immediately to the investigating officer.'
    },
    legalRights: [
      {
        title: 'Mandatory FIR for Online Cheating & Impersonation',
        bnsSection: 'BNS, 2023 - Sections 318(4), 319',
        ipcSection: 'IPC, 1860 - Sections 419, 420',
        bnssSection: 'Information Technology Act, 2000 - Section 66C & 66D',
        summary: 'Cheating by personation using computer resources is a cognizable, non-bailable offence carrying up to 3 years imprisonment and mandatory police investigation.'
      },
      {
        title: 'Bank Account Freezing Safeguards & Notice Requirement',
        bnssSection: 'BNSS, 2023 - Section 106',
        crpcSection: 'CrPC, 1973 - Section 102',
        summary: 'Police power to seize/freeze bank accounts is restricted to property directly connected to the alleged crime. Police must report any seizure to the Magistrate forthwith.'
      },
      {
        title: 'Right to Partial De-Freezing of Legitimate Funds',
        landmarkJudgment: 'Madras HC (TMT. Shakila v. State) & Karnataka HC Directives (2023)',
        summary: 'High Courts have held that freezing of the entire account of innocent third-party merchants or account holders without isolating the disputed amount is an infringement of Article 21 livelihood rights.'
      }
    ],
    complaintRoutes: [
      {
        authority: 'National Cyber Crime Reporting Portal (MHA / I4C)',
        level: 'Central Nodal Cyber Authority',
        legalProvision: 'IT Act, 2000 & Ministry of Home Affairs I4C Framework',
        howToReach: 'Call Toll-Free 1930 (24x7) or file complaint on cybercrime.gov.in.',
        documentRequired: ['Bank account statement', 'Transaction UTR slips', 'Screenshots of fraudulent chats/links', 'ID proof']
      },
      {
        authority: 'State Cyber Crime Police Station / Cyber Cell ACP',
        level: 'District / State Cyber Wing',
        legalProvision: 'Under BNSS Section 173 / IT Act 2000',
        howToReach: 'Submit written complaint along with cybercrime.gov.in acknowledgment at the District Cyber Crime Police Station.',
        documentRequired: ['Online complaint copy', 'Detailed transaction trail', 'Device MAC/IP logs if available']
      },
      {
        authority: 'Judicial Magistrate (Application for Account De-freezing)',
        level: 'Judicial Remedy for Unlawful Bank Freeze',
        legalProvision: 'BNSS Section 497 / CrPC Section 451 & 457',
        howToReach: 'File petition before the Magistrate having jurisdiction over the freezing police station to allow operation of account upon furnishing bond/indemnity for the disputed sum.',
        documentRequired: ['Bank freeze letter', 'Bank account statement showing source of genuine funds', 'Affidavit']
      }
    ],
    officialSources: [
      {
        sourceName: 'Ministry of Home Affairs (I4C)',
        citation: 'Citizen Financial Cyber Fraud Reporting and Management System (CFCFRMS) SOP 2021'
      },
      {
        sourceName: 'Information Technology Act, 2000 (Amended 2008)',
        citation: 'Sections 43, 66, 66C, 66D, 72A'
      }
    ]
  },
  {
    id: 'recording-police-mobile-seizure',
    title: 'Filming / Recording Police on Duty & Mobile Phone Seizure',
    hindiTitle: 'सार्वजनिक स्थान पर पुलिस की वीडियो रिकॉर्डिंग और फ़ोन ज़ब्ती के नियम',
    category: 'rights_privacy',
    urgency: 'MEDIUM',
    iconName: 'Camera',
    thirtySecondSummary: 'Recording police officers discharging public duties in public spaces is legal and protected under Article 19(1)(a). Police CANNOT snatch your phone, delete videos, or force phone unlocking without a judicial warrant or written seizure memo.',
    immediateActions: [
      'Maintain Safe Distance: Stand at a reasonable distance (3-5 paces back) so you do not physically obstruct the officer from executing lawful duties.',
      'You Have the Right to Record Public Duty: Recording police conduct at checkpoints, public protests, or traffic stops is a constitutional exercise of freedom of speech and citizen journalism.',
      'Do Not Surrender Phone Password: You are not legally obligated to provide your device passcode or biometrics on the spot without a specific court order.',
      'Demand Seizure Memo if Confiscated: If an officer seizes your mobile phone as evidence, insist on an immediate signed Seizure Memo (Panchnama) with two independent witnesses noting the device IMEI, make, model, and condition.',
      'Deleting Videos is Illegal Destruction of Evidence: Police officers deleting citizen videos is an offence under Section 238 BNS / Section 201 IPC (Causing disappearance of evidence).'
    ],
    thingsNotToDo: [
      'DO NOT thrust your mobile phone right into an officer\'s face or touch their uniform/equipment.',
      'DO NOT physically resist if the officer illegally grabs the phone, but immediately demand bystanders witness the act and note badge details.',
      'DO NOT unlock phone and hand over open WhatsApp/gallery.'
    ],
    spokenScript: {
      english: 'Officer, under Article 19(1)(a) of the Constitution of India, citizens have the lawful right to record public servants discharging public functions in a public place without obstruction. You cannot seize my phone or force me to delete video recordings without a lawful warrant and a signed Seizure Memo under Section 107 of BNSS.',
      hindi: 'अधिकारी महोदय, भारतीय संविधान के अनुच्छेद 19(1)(a) के तहत किसी भी नागरिक को सार्वजनिक स्थान पर ड्यूटी कर रहे लोकसेवक की पारदर्शी रिकॉर्डिंग करने का कानूनी अधिकार है। बीएनएसएस की धारा 107 के तहत बिना वारंट और पंचनामा रसीद के आप मेरा फ़ोन नहीं छीन सकते और न ही वीडियो डिलीट कर सकते हैं।',
      hinglish: 'Officer, Article 19(1)(a) ke tehat public place par on-duty police ki video record karna legal right hai. Aap bina warrant aur signed Seizure Memo ke mera phone seize nahi kar sakte aur video delete karna BNS 238 me illegal hai.',
      contextNote: 'Speak calmly while maintaining cloud backup (Google Photos/iCloud) enabled.'
    },
    legalRights: [
      {
        title: 'Freedom of Speech & Right to Information in Public Spaces',
        constitutionalArticle: 'Article 19(1)(a) Constitution of India',
        summary: 'Public servants discharging public duty in open public view have no reasonable expectation of privacy; citizen recording fosters accountability.'
      },
      {
        title: 'Fundamental Right to Digital Privacy',
        landmarkJudgment: 'Justice K.S. Puttaswamy (Retd.) v. Union of India (2017) 10 SCC 1',
        summary: '9-Judge Constitution Bench ruled privacy is a fundamental right. Arbitrary browsing of citizen mobile phones, gallery, or chats without due process violates Article 21.'
      },
      {
        title: 'Offence of Deleting Evidence by Police',
        bnsSection: 'BNS, 2023 - Section 238',
        ipcSection: 'IPC, 1860 - Section 201',
        summary: 'Destroying, altering, or deleting electronic records to prevent them from being produced as legal evidence carries rigorous imprisonment.'
      }
    ],
    complaintRoutes: [
      {
        authority: 'State Police Complaints Authority (SPCA)',
        level: 'Misconduct & High-Handedness Redressal',
        legalProvision: 'Prakash Singh Supreme Court Directives',
        howToReach: 'File a complaint for harassment, illegal seizure of mobile, or deletion of footage by on-duty officers.',
        documentRequired: ['Cloud-backed video footage', 'Officer name/station', 'Witness details']
      },
      {
        authority: 'Superintendent of Police / Commissioner of Police',
        level: 'Departmental Inquest',
        legalProvision: 'Police Conduct Rules',
        howToReach: 'Submit a formal representation requesting inquiry and disciplinary action against officer for unlawful phone confiscation.',
        documentRequired: ['IMEI number of phone', 'Date/time of incident', 'Affidavit']
      }
    ],
    officialSources: [
      {
        sourceName: 'Supreme Court of India',
        citation: 'K.S. Puttaswamy v. Union of India (2017) 10 SCC 1 (Digital Privacy Mandate)'
      },
      {
        sourceName: 'Bharatiya Nyaya Sanhita, 2023',
        citation: 'Sections 198, 238'
      }
    ]
  },
  {
    id: 'police-notice-investigation',
    title: 'Police Notice for Interrogation / Appearance (BNSS Sec 35(3) / CrPC 41A)',
    hindiTitle: 'पूछताछ हेतु पुलिस नोटिस (BNSS 35(3) / CrPC 41A) और उपस्थिति के नियम',
    category: 'arrest',
    urgency: 'HIGH',
    iconName: 'Mail',
    thirtySecondSummary: 'For offences with punishment up to 7 years, police MUST issue a written Notice of Appearance (BNSS Sec 35(3) / CrPC 41A). As long as you comply, police CANNOT arrest you. You have the right to have an advocate present during interrogation (BNSS Sec 38).',
    immediateActions: [
      'Check if Notice is Written & Signed: A verbal call or WhatsApp message is NOT a valid statutory notice. Demand a formal written notice with station dispatch number specifying date, time, and FIR/case reference.',
      'Protection from Mechanical Arrest: Under the Supreme Court landmark ruling in *Arnesh Kumar v. State of Bihar*, if the alleged offence carries punishment under 7 years, police CANNOT arrest you if you comply with the notice.',
      'Right to Advocate Presence During Interrogation: Under BNSS Section 38 / CrPC Section 41D, you have the statutory right to meet and have your advocate present throughout the interrogation (within visible distance, though not audible distance).',
      'Obtain Stamped Attendance Acknowledgment: When you appear at the police station, carry 2 copies of your appearance letter and get a receiving stamp with date and time from the Investigating Officer (IO).',
      'No Coercive Self-Incrimination: You cannot be compelled to sign confessions or implicate yourself (Article 20(3) of the Constitution).'
    ],
    thingsNotToDo: [
      'DO NOT ignore a formal written Section 35(3) BNSS / 41A CrPC notice; non-compliance gives police legal grounds to arrest.',
      'DO NOT go to the police station alone for criminal interrogation without informing family, friends, or a legal counsel.',
      'DO NOT sign blank confession memos or non-typed statements.'
    ],
    spokenScript: {
      english: 'Officer, in compliance with the Notice of Appearance issued under Section 35(3) of BNSS (Section 41A CrPC), I am presenting myself for investigation. As per Section 38 of BNSS (Section 41D CrPC) and the Supreme Court mandate in Arnesh Kumar and Satender Kumar Antil, I am entitled to the presence of my legal counsel during questioning, and cannot be arrested so long as I cooperate with the investigation.',
      hindi: 'अधिकारी महोदय, बीएनएसएस की धारा 35(3) (सीआरपीसी 41ए) के नोटिस के पालन में मैं जाँच में सहयोग हेतु उपस्थित हुआ हूँ। बीएनएसएस की धारा 38 और सुप्रीम कोर्ट के अरनेश कुमार व सतिंदर कुमार अंतिल आदेशों के तहत मुझे पूछताछ के दौरान अपने अधिवक्ता को उपस्थित रखने का कानूनी अधिकार है।',
      hinglish: 'Officer, Section 35(3) BNSS notice ke compliance me main investigation ke liye present hoon. Arnesh Kumar judgment aur BNSS Section 38 ke tehat mere advocate questioning ke dauran upasthit rahenge aur arrest nahi kiya ja sakta.',
      contextNote: 'Ensure your advocate accompanies you and obtains a written endorsement of attendance.'
    },
    legalRights: [
      {
        title: 'Mandatory Notice in Offences up to 7 Years',
        bnssSection: 'BNSS, 2023 - Section 35(3)',
        crpcSection: 'CrPC, 1973 - Section 41A',
        landmarkJudgment: 'Arnesh Kumar v. State of Bihar (2014) 8 SCC 273',
        summary: 'Police must issue notice of appearance in all cases where arrest is not immediately necessary. Failure by police to follow this attracts departmental action and contempt of court.'
      },
      {
        title: 'Right to Counsel During Interrogation',
        bnssSection: 'BNSS, 2023 - Section 38',
        crpcSection: 'CrPC, 1973 - Section 41D',
        summary: 'When any person is arrested or interrogated by the police, they shall be entitled to meet an advocate of their choice throughout the interrogation, though not throughout the entire audible time.'
      },
      {
        title: 'Strict Bail & Non-Arrest Directives',
        landmarkJudgment: 'Satender Kumar Antil v. CBI (2022) 10 SCC 51',
        summary: 'Supreme Court laid down strict guidelines against mechanical arrests, mandating bail and compliance with Section 41A/BNSS 35(3).'
      }
    ],
    complaintRoutes: [
      {
        authority: 'Jurisdictional Judicial Magistrate First Class (JMFC)',
        level: 'Judicial Protection',
        legalProvision: 'Contempt of Supreme Court Mandate (Arnesh Kumar)',
        howToReach: 'If police threaten arrest despite complying with 35(3) notice, file an urgent application before Magistrate for anticipatory relief / recording compliance.',
        documentRequired: ['Copy of Sec 35(3) Notice', 'Stamped attendance receipt', 'Affidavit of appearance']
      },
      {
        authority: 'High Court of the State (Anticipatory Bail / Contempt)',
        level: 'Constitutional Remedy',
        legalProvision: 'BNSS Section 482 / CrPC Section 438 & Contempt of Courts Act',
        howToReach: 'File petition for Anticipatory Bail or Contempt against investigating officer for violating Arnesh Kumar binding directions.',
        documentRequired: ['Notice copy', 'FIR copy', 'Case details']
      }
    ],
    officialSources: [
      {
        sourceName: 'Supreme Court of India',
        citation: 'Arnesh Kumar v. State of Bihar (2014) 8 SCC 273'
      },
      {
        sourceName: 'Supreme Court of India',
        citation: 'Satender Kumar Antil v. CBI (2022) 10 SCC 51'
      }
    ]
  },
  {
    id: 'handcuffing-media-parading',
    title: 'Illegal Handcuffing, Public Parading & Media Humiliation',
    hindiTitle: 'गैरकानूनी हथकड़ी लगाना, सार्वजनिक जुलूस और मीडिया में फोटो डालने पर रोक',
    category: 'arrest',
    urgency: 'CRITICAL',
    iconName: 'ShieldAlert',
    thirtySecondSummary: 'Routine handcuffing is strictly illegal under Supreme Court rulings (Prem Shankar Shukla & Citizens for Democracy). Police cannot parade accused persons in public or share arrestee mugshots with media/social media without explicit judicial permission.',
    immediateActions: [
      'Handcuffing is Exception, Not the Rule: Police cannot put handcuffs on an accused person mechanically. It is permissible ONLY if the person is exceptionally violent, suicidal, or has proven history of escaping custody, and reasons MUST be recorded in writing and approved by the Magistrate.',
      'Prohibition of Public Parading: Parading arrested persons on the street or forcing them to apologize publicly violates fundamental dignity under Article 21.',
      'Ban on Media Mugshots & Social Media Leaking: Police stations are prohibited by High Court directives from photographing accused persons holding crime slates and circulating photos on WhatsApp/Twitter before conviction.',
      'Report Handcuffing Directly to Magistrate: When presented before the Magistrate, immediately point out if handcuffs or ropes were used without judicial sanction.',
      'Contempt of Court & Departmental Action: Erring officers who handcuff citizens routinely without Magistrate permission face direct contempt of court and disciplinary inquiry.'
    ],
    thingsNotToDo: [
      'DO NOT consent quietly to being handcuffed if you are a non-violent citizen cooperating with the process.',
      'DO NOT allow police officers to record humiliation videos or force scripted apologies on phone cameras.',
      'DO NOT sign consent waivers for media exhibition.'
    ],
    spokenScript: {
      english: 'Officer, under the binding Supreme Court rulings in Prem Shankar Shukla v. Delhi Administration and Citizens for Democracy v. State of Assam, routine handcuffing is unconstitutional and violates Article 21. Handcuffs cannot be used without prior recording of special reasons and judicial approval. I will formally bring this violation before the Judicial Magistrate.',
      hindi: 'अधिकारी महोदय, सुप्रीम कोर्ट के ऐतिहासिक फैसलों (प्रेम शंकर शुक्ला बनाम दिल्ली प्रशासन व सिटिज़न्स फॉर डेमोक्रेसी) के अनुसार किसी भी नागरिक को सामान्यतः हथकड़ी लगाना संविधान के अनुच्छेद 21 का उल्लंघन और गैरकानूनी है। बिना मजिस्ट्रेट की पूर्व लिखित अनुमति के हथकड़ी का प्रयोग न्यायालय की अवमानना है।',
      hinglish: 'Officer, Supreme Court ke Prem Shankar Shukla aur Citizens for Democracy judgments ke anusaar bina Magistrate permission ke handcuff lagana illegal hai. Article 21 violation ke tehat main iski complaint Magistrate ke samne karunga.',
      contextNote: 'Citing Prem Shankar Shukla and Citizens for Democracy immediately puts police officers on notice of contempt liability.'
    },
    legalRights: [
      {
        title: 'Constitutional Prohibition of Routine Handcuffing',
        constitutionalArticle: 'Article 14 & 21 Constitution of India',
        landmarkJudgment: 'Prem Shankar Shukla v. Delhi Administration (1980) 3 SCC 526',
        summary: 'Supreme Court held that handcuffing is prima facie inhuman, unreasonable, and arbitrary. Insurance against escape does not justify routine chaining of prisoners.'
      },
      {
        title: 'Mandatory Prior Judicial Permission for Handcuffing',
        landmarkJudgment: 'Citizens for Democracy v. State of Assam (1995) 3 SCC 743',
        summary: 'No prisoner or arrestee shall be handcuffed or fettered without prior approval obtained from the Magistrate. Police officers violating this are liable for summary contempt and prosecution.'
      },
      {
        title: 'Right to Dignity Against Media Parading & Leaks',
        landmarkJudgment: 'Bombay HC Directives in Pradeep Bhalekar & Karnataka HC (2022)',
        summary: 'High Courts have barred police from organizing press parades of accused persons and releasing their photographs before formal trial.'
      }
    ],
    complaintRoutes: [
      {
        authority: 'Judicial Magistrate / Remand Court',
        level: 'Immediate Court Record',
        legalProvision: 'Under Supreme Court Directives in Citizens for Democracy',
        howToReach: 'Directly inform the presiding Magistrate at the 24-hour remand production that you were handcuffed and paraded unlawfully without Magistrate permission.',
        documentRequired: ['Statement before Magistrate', 'Photographs/CCTV if available', 'Medical report']
      },
      {
        authority: 'National Human Rights Commission (NHRC)',
        level: 'Constitutional Human Rights Body',
        legalProvision: 'Protection of Human Rights Act, 1993',
        howToReach: 'File petition for violation of dignity and award of compensatory damages for illegal handcuffing and public humiliation.',
        documentRequired: ['Remand order copy', 'Details of officers involved', 'Media links if paraded']
      }
    ],
    officialSources: [
      {
        sourceName: 'Supreme Court of India',
        citation: 'Prem Shankar Shukla v. Delhi Administration (1980) 3 SCC 526'
      },
      {
        sourceName: 'Supreme Court of India',
        citation: 'Citizens for Democracy v. State of Assam (1995) 3 SCC 743'
      }
    ]
  },
  {
    id: 'peaceful-protest-detention',
    title: 'Peaceful Protest, Public Assembly & Section 163 BNSS (Sec 144 CrPC)',
    hindiTitle: 'शांतिपूर्ण प्रदर्शन, धारा 163 BNSS (144 CrPC) और निवारक हिरासत के नियम',
    category: 'protest',
    urgency: 'HIGH',
    iconName: 'Users',
    thirtySecondSummary: 'Peaceful protest without arms is a fundamental right (Art 19(1)(b)). Preventive detention under BNSS Sec 170 / CrPC 151 CANNOT exceed 24 hours. Orders under Section 163 BNSS (old 144 CrPC) cannot be imposed indefinitely or used to suppress dissent.',
    immediateActions: [
      'Protest Must Be Peaceful & Unarmed: Article 19(1)(b) protects the right to assemble peaceably and without arms.',
      'Check Validity of Section 163 BNSS Orders: Section 163 BNSS (formerly Section 144 CrPC) orders must state specific material facts and cannot be passed routinely to curb democratic expression (*Anuradha Bhasin v. UOI*).',
      'Preventive Detention Max Limit (24 Hours): If detained preventively under Section 170 BNSS / Section 151 CrPC to prevent a cognizable offence, police MUST release you within 24 hours unless produced before a Magistrate with formal remand application.',
      'Lathi Charge & Force Dispersal Protocols: Police CANNOT use force without first declaring assembly unlawful, giving audible warnings, and using minimum necessary force under supervision of an Executive Magistrate (BNSS Sec 148-150).',
      'Right to Medical Examination on Release: Demand an MLC if force or detention caused any injuries.'
    ],
    thingsNotToDo: [
      'DO NOT carry weapons, sticks, or incendiary materials.',
      'DO NOT damage public property or block emergency ambulances/fire services.',
      'DO NOT sign undertakings agreeing to forfeit your constitutional right to peaceful demonstration.'
    ],
    spokenScript: {
      english: 'Officer, peaceful assembly without arms is a fundamental right guaranteed under Article 19(1)(b) of the Constitution of India. If we are being preventively detained under Section 170 of BNSS (Section 151 CrPC), our detention cannot exceed 24 hours without production before a Judicial Magistrate. Please record our detention time and location in the station diary.',
      hindi: 'अधिकारी महोदय, संविधान के अनुच्छेद 19(1)(b) के तहत शांतिपूर्ण और निहत्थे प्रदर्शन करना हमारा मौलिक अधिकार है। यदि हमें बीएनएसएस की धारा 170 (सीआरपीसी 151) में एहतियातन हिरासत में लिया जा रहा है, तो 24 घंटे से अधिक हिरासत गैरकानूनी है। कृपया थाने के रोजनामचे में हमारी हिरासत का समय दर्ज करें।',
      hinglish: 'Officer, Article 19(1)(b) ke tehat peaceful assembly fundamental right hai. Section 170 BNSS ke tehat preventive detention maximum 24 hours ho sakti hai. Station diary me hamara entry time record kijiye.',
      contextNote: 'Keep national/state legal aid helplines (15100) and civil liberty groups informed of your detention center.'
    },
    legalRights: [
      {
        title: 'Fundamental Right to Peaceful Assembly',
        constitutionalArticle: 'Article 19(1)(a) & 19(1)(b) Constitution of India',
        landmarkJudgment: 'Himmat Lal K. Shah v. Commissioner of Police (1973) 1 SCC 227',
        summary: 'Citizens have a constitutional right to hold meetings and peaceful processions on public streets, subject only to reasonable traffic regulations.'
      },
      {
        title: 'Strict Proportionality in Section 163 BNSS (144 CrPC)',
        landmarkJudgment: 'Anuradha Bhasin v. Union of India (2020) 3 SCC 637',
        summary: 'Power under Section 144 CrPC / 163 BNSS is not an arbitrary tool to suppress legitimate expression or grievances; repetitive blanket orders are illegal.'
      },
      {
        title: 'Preventive Detention 24-Hour Constitutional Ceiling',
        bnssSection: 'BNSS, 2023 - Section 170',
        crpcSection: 'CrPC, 1973 - Section 151',
        constitutionalArticle: 'Article 22(2) Constitution of India',
        summary: 'No person arrested preventively shall be detained in custody for a period exceeding twenty-four hours from the time of their arrest without court order.'
      }
    ],
    complaintRoutes: [
      {
        authority: 'Judicial Magistrate / High Court (Habeas Corpus Petition)',
        level: 'Emergency Constitutional Remedy',
        legalProvision: 'Article 226 / 32 Constitution & BNSS Section 57',
        howToReach: 'If detained beyond 24 hours in unauthorized detention camps, family/advocate can immediately move High Court for Writ of Habeas Corpus.',
        documentRequired: ['Detention location', 'Time of interception', 'Affidavit of relative/lawyer']
      },
      {
        authority: 'State Police Complaints Authority (SPCA)',
        level: 'Oversight on Excessive Force',
        legalProvision: 'Prakash Singh Guidelines on Police Brutality',
        howToReach: 'File petition against unjustified lathi charge, tear gas usage without warning, or unlawful detention of peaceful protestors.',
        documentRequired: ['Video recordings', 'Hospital MLC certificates', 'Witness accounts']
      }
    ],
    officialSources: [
      {
        sourceName: 'Supreme Court of India',
        citation: 'Anuradha Bhasin v. Union of India (2020) 3 SCC 637 (Scope of Sec 144 / Sec 163 BNSS)'
      },
      {
        sourceName: 'Bharatiya Nagarik Suraksha Sanhita, 2023',
        citation: 'Sections 148, 149, 150, 163, 170'
      }
    ]
  },
  {
    id: 'civil-landlord-property-disputes',
    title: 'Police Interference in Civil, Tenant & Business Recovery Disputes',
    hindiTitle: 'दीवानी विवाद, मकान मालिक-किरायेदार और पैसे की वसूली में पुलिस का गैरकानूनी दखल',
    category: 'police_station',
    urgency: 'MEDIUM',
    iconName: 'Building',
    thirtySecondSummary: 'Police have ZERO legal jurisdiction to interfere in pure civil matters, landlord-tenant evictions, money recovery, or property title disputes. Demanding that you vacate premises or sign settlement agreements at the police station is unlawful.',
    immediateActions: [
      'Identify Nature of Dispute: Check if the dispute is a civil matter (e.g., pending rent, lease expiration, loan default, breach of contract, property boundary dispute). Police cannot adjudicate civil claims.',
      'Police Cannot Force Eviction: A tenant can ONLY be evicted through due process of law by an order of the Competent Rent Controller / Civil Court, not by police personnel.',
      'Refuse to Sign Compromise Papers Under Duress: Police stations cannot be used as informal recovery courts. Never sign settlement agreements or promissory notes in a police station.',
      'Demand Written Notice or Summons: If police summon you regarding a civil dispute, demand in writing whether any cognizable FIR has been registered or if it is merely a non-cognizable complaint (NCR).',
      'Move High Court for Protection: If police repeatedly harass you at the behest of an influential opponent, you can file a Writ Petition before the High Court seeking a direction to restrain police interference in civil matters.'
    ],
    thingsNotToDo: [
      'DO NOT hand over property keys or sign property surrender agreements inside a police station.',
      'DO NOT pay disputed civil amounts in cash to police officers acting as mediators.',
      'DO NOT agree to oral eviction ultimatums given by police officers.'
    ],
    spokenScript: {
      english: 'Officer, this matter relates strictly to a civil contract / landlord-tenant dispute pending between private parties. As repeatedly held by the Supreme Court of India in Mohd. Ibrahim and Indian Oil Corporation cases, the police have no statutory jurisdiction to intervene, act as recovery agents, or enforce evictions in civil matters. Please provide any registered FIR number or summon me only through formal statutory process.',
      hindi: 'अधिकारी महोदय, यह मामला पूरी तरह से दीवानी (सिविल) अनुबंध और संपत्ति से संबंधित है। सुप्रीम कोर्ट के स्पष्ट फैसलों के अनुसार पुलिस को दीवानी मामलों में हस्तक्षेप करने, मकान खाली कराने या वसूली करने का कोई कानूनी अधिकार नहीं है। यदि कोई संज्ञेय अपराध बनता है तो लिखित नोटिस दें, अन्यथा यह सिविल कोर्ट का क्षेत्राधिकार है।',
      hinglish: 'Officer, yeh pure civil/landlord-tenant dispute hai. Supreme Court ke judgments ke tehat police civil matters me recovery ya eviction nahi kara sakti. Agar koi FIR hai toh formal notice dijiye, warna yeh Civil Court ka matter hai.',
      contextNote: 'Citing the civil nature and Supreme Court bar on police interference immediately stops informal coercion.'
    },
    legalRights: [
      {
        title: 'Prohibition of Police Interference in Civil Matters',
        landmarkJudgment: 'Indian Oil Corporation v. NEPC India Ltd (2006) 6 SCC 736',
        summary: 'Supreme Court deprecated the growing tendency of using criminal law and police pressure as a tool for recovery in purely commercial and civil transactions.'
      },
      {
        title: 'Eviction Only Through Due Process of Law',
        landmarkJudgment: 'Bishandas v. State of Punjab (1961) 2 SCR 69',
        summary: 'State authorities and police cannot take the law into their own hands and forcibly dispossess occupants without an order from a competent civil court.'
      },
      {
        title: 'Cognizable vs. Non-Cognizable Boundaries',
        bnssSection: 'BNSS, 2023 - Section 174',
        crpcSection: 'CrPC, 1973 - Section 155',
        summary: 'For non-cognizable disputes, police must enter the substance in the station diary and refer the complainant to the Civil/Magistrate court without taking coercive action.'
      }
    ],
    complaintRoutes: [
      {
        authority: 'High Court (Writ Petition for Police Non-Interference)',
        level: 'Constitutional Remedy',
        legalProvision: 'Article 226 Constitution of India',
        howToReach: 'File a Writ of Mandamus before the High Court seeking direction restraining police from summoning or threatening in a pending civil/rent matter.',
        documentRequired: ['Rent agreement / Contract copy', 'Civil suit pleadings if pending', 'Call logs/complaint copies']
      },
      {
        authority: 'State Police Complaints Authority (SPCA) / Vigilance',
        level: 'Disciplinary Inquiry Against Erring Officers',
        legalProvision: 'Police Conduct Rules on Illegal Mediation',
        howToReach: 'Submit complaint detailing how police personnel acted as recovery agents or threatened illegal eviction.',
        documentRequired: ['Affidavit', 'Audio/CCTV if available', 'Station visit dates']
      }
    ],
    officialSources: [
      {
        sourceName: 'Supreme Court of India',
        citation: 'Indian Oil Corporation v. NEPC India Ltd (2006) 6 SCC 736'
      },
      {
        sourceName: 'Supreme Court of India',
        citation: 'Mohd. Ibrahim & Ors. v. State of Bihar (2009) 8 SCC 751'
      }
    ]
  },
  {
    id: 'passport-job-verification',
    title: 'Passport & Job Police Verification Delays or Illegal Demands',
    hindiTitle: 'पासपोर्ट, नौकरी और चरित्र सत्यापन में देरी या अवैध मांग',
    category: 'police_station',
    urgency: 'MEDIUM',
    iconName: 'CheckSquare',
    thirtySecondSummary: 'Police verification for passports must be completed within 21 days (mPassport app). Physical presence at the police station is NOT mandatory if field verification was done. Demanding "speed money" is illegal under the Prevention of Corruption Act.',
    immediateActions: [
      'Know the Time Limit (21 Days Maximum): Under the Ministry of External Affairs (MEA) Citizen Charter, police verification reports (PVR) for passports must be submitted online within 21 days.',
      'Field Verification is Standard: The designated Local Intelligence Unit (LIU) / Special Branch officer is mandated to visit your residential address to verify residency and citizenship documents.',
      'Physical Station Visits are Optional: Under the mPassport Police App initiative, citizens are not required to make repeated visits to local police stations if documents were verified at home.',
      'Never Pay Verification "Tips" or Bribes: Demanding money for issuing a clear verification report is an offence under Section 7 of the Prevention of Corruption Act, 1988.',
      'Adverse Reports Must Have Written Grounds: Police cannot mark your verification "Adverse" arbitrarily; adverse remarks require specific registered FIRs or criminal convictions.'
    ],
    thingsNotToDo: [
      'DO NOT pay cash "processing fees" to visiting verification constables.',
      'DO NOT conceal active pending criminal trials in your passport application form; concealment is an offence under Section 12 Passports Act.',
      'DO NOT panic if an adverse report is sent mistakenly; you have the right to show cause before the Regional Passport Officer (RPO).'
    ],
    spokenScript: {
      english: 'Officer, here are my verified address and identity documents as required under the Ministry of External Affairs mPassport guidelines. As per government guidelines, police verification must be submitted within the 21-day timeline. Demanding any unreceipted fee is a violation of the Prevention of Corruption Act. Please upload the clear report on the mPassport portal.',
      hindi: 'अधिकारी महोदय, विदेश मंत्रालय (MEA) के एम-पासपोर्ट नियमों के अनुसार मेरे सभी निवास और पहचान दस्तावेज़ पूर्ण हैं। सरकारी नियमों के तहत 21 दिनों में ऑनलाइन सत्यापन रिपोर्ट भेजना अनिवार्य है। किसी भी अनौपचारिक शुल्क की मांग भ्रष्टाचार निवारण अधिनियम का उल्लंघन है। कृपया रिपोर्ट पोर्टल पर अपलोड करें।',
      hinglish: 'Officer, MEA guidelines ke anusaar verification report 21 days me upload honi chahiye. Mere sabhi documents valid hain. Kisi unofficial fees ki demand Prevention of Corruption Act me prohibited hai.',
      contextNote: 'Keep photocopies of your Aadhaar, Voter ID, electricity bill, and Passport Application Form ready.'
    },
    legalRights: [
      {
        title: 'Passports Act & Right to Travel Abroad',
        constitutionalArticle: 'Article 21 Constitution of India',
        landmarkJudgment: 'Maneka Gandhi v. Union of India (1978) 1 SCC 248',
        summary: 'Supreme Court held that the right to travel abroad is part of personal liberty under Article 21, and cannot be curtailed without just, fair, and reasonable procedure.'
      },
      {
        title: 'Prevention of Extortion in Verification',
        bnsSection: 'Prevention of Corruption Act, 1988 - Section 7',
        summary: 'Demanding undue advantage to perform or expedite verification duty is punishable with imprisonment up to 7 years.'
      },
      {
        title: 'Right to Public Services Legislation',
        summary: 'State Right to Public Services Acts mandate delivery of police character certificates and verification reports within notified statutory timeframes.'
      }
    ],
    complaintRoutes: [
      {
        authority: 'Regional Passport Officer (RPO) / MEA Grievance Cell',
        level: 'Passport Authority Escalation',
        legalProvision: 'Passports Act, 1967',
        howToReach: 'Book an RPO Enquiry appointment or file grievance on passportindia.gov.in / CPGRAMS portal.',
        documentRequired: ['ARN (Application Reference Number)', 'Passport application acknowledgment', 'Proof of residence']
      },
      {
        authority: 'DCP / SP (Headquarters / Special Branch)',
        level: 'Supervising Police Authority',
        legalProvision: 'State Police Verification Guidelines',
        howToReach: 'Meet the SP/DCP Special Branch during public hearing hours regarding unexplained delay or bribery demands by local beats.',
        documentRequired: ['ARN receipt', 'Complaint copy', 'Identity proof']
      }
    ],
    officialSources: [
      {
        sourceName: 'Ministry of External Affairs (CPV Division)',
        citation: 'Passport Rules, 1980 & mPassport Police App Verification Guidelines'
      },
      {
        sourceName: 'Supreme Court of India',
        citation: 'Maneka Gandhi v. Union of India (1978) 1 SCC 248'
      }
    ]
  },
  {
    id: 'moral-policing-night-checks',
    title: 'Night Barricade Stops, Moral Policing & Harassment of Adults',
    hindiTitle: 'देर रात चेकिंग, मॉरल पुलिसिंग और बालिग जोड़ों (Couples) से पूछताछ के नियम',
    category: 'rights_privacy',
    urgency: 'MEDIUM',
    iconName: 'Shield',
    thirtySecondSummary: 'Adult citizens (18+) have a fundamental right to free movement (Art 19(1)(d)) and personal privacy (Art 21). Police CANNOT demand marriage certificates from consenting adult couples, search personal bags without warrant, or call parents to intimidate.',
    immediateActions: [
      'Consenting Adults are Protected: Consenting adults (18+ years) sitting together in parks, cars, cafes, or public spaces are NOT committing any offence. Police have no legal authority for "moral policing".',
      'No Obligation to Show Marriage Proof: Police cannot demand proof of marriage from two consenting adults traveling or staying together.',
      'Threatening to Call Parents is Unlawful: For adult citizens (above 18), police threatening to call parents or employer is illegal harassment and intimidation under Section 351 BNS / 503 IPC.',
      'Late Night Walking is Legal: Walking, driving, or commuting late at night is fully protected under Article 19(1)(d) (Freedom of Movement). Police can verify identity but cannot detain or harass without suspicion of specific cognizable crime.',
      'Record Officer ID & Escalate: If subjected to moral policing or extortion threats, note the patrol vehicle (PCR/ERT) number, officer name tags, and call 112 immediately to report harassment.'
    ],
    thingsNotToDo: [
      'DO NOT panic, pay bribes, or sign false confessions of "public nuisance" when sitting or traveling lawfully.',
      'DO NOT hand over unlocked mobile phones to allow officers to read personal chats or photo galleries.',
      'DO NOT accept moral lecturing or verbal abuse; remain polite, composed, and assert your adult legal status.'
    ],
    spokenScript: {
      english: 'Officer, we are both consenting adults (18+) exercising our fundamental right to liberty and freedom of movement under Articles 19 and 21 of the Constitution. We are not engaging in any unlawful activity. The law does not require consenting adults to carry marriage proof or permit moral policing. Please let us proceed or state the specific statutory provision under which you are detaining us.',
      hindi: 'अधिकारी महोदय, हम दोनों बालिग (18+) नागरिक हैं और संविधान के अनुच्छेद 19 और 21 के तहत अपनी व्यक्तिगत स्वतंत्रता का उपयोग कर रहे हैं। हम किसी भी गैरकानूनी गतिविधि में लिप्त नहीं हैं। कानून में बालिगों से विवाह प्रमाण मांगने या मॉरल पुलिसिंग का कोई प्रावधान नहीं है। कृपया हमें जाने दें।',
      hinglish: 'Officer, hum dono consenting adults (18+) hain aur koi unlawful activity nahi kar rahe hain. Law me adults se marriage certificate maangne ya moral policing karne ka koi right nahi hai. Article 21 ke tehat kripya hume proceed karne dein.',
      contextNote: 'Firmly state adult status (18+) and Constitution Article 21. Moral policing instantly collapses when citizens assert adult rights.'
    },
    legalRights: [
      {
        title: 'Fundamental Right to Personal Liberty & Privacy',
        constitutionalArticle: 'Article 21 Constitution of India',
        landmarkJudgment: 'Navtej Singh Johar & K.S. Puttaswamy Judgments',
        summary: 'Supreme Court established that personal autonomy and intimacy of consenting adults in private and public spaces is protected under Article 21.'
      },
      {
        title: 'Freedom of Movement Across India',
        constitutionalArticle: 'Article 19(1)(d) Constitution of India',
        summary: 'Every citizen has the fundamental right to move freely throughout the territory of India at any time without unreasonable police obstruction.'
      },
      {
        title: 'Criminal Intimidation by Public Servants',
        bnsSection: 'BNS, 2023 - Section 351',
        ipcSection: 'IPC, 1860 - Section 503 & 506',
        summary: 'Threatening injury to reputation (e.g. threatening to call parents or defame) to force an adult to pay money or surrender rights constitutes criminal intimidation.'
      }
    ],
    complaintRoutes: [
      {
        authority: 'Police Control Room (PCR / Dial 112)',
        level: 'Immediate Emergency Call',
        legalProvision: 'State Police Emergency Response System',
        howToReach: 'Call 112 on the spot and report that on-duty patrol officers are harassing you without legal cause.',
        documentRequired: ['Current GPS location', 'Patrol car registration / ERV number', 'Officer name tags']
      },
      {
        authority: 'State Police Complaints Authority (SPCA)',
        level: 'Misconduct & Harassment Inquest',
        legalProvision: 'Prakash Singh Supreme Court Directives',
        howToReach: 'Submit formal petition against moral policing, unauthorized bag search, or verbal intimidation.',
        documentRequired: ['Affidavit', 'Audio/video recording', 'Date and location']
      }
    ],
    officialSources: [
      {
        sourceName: 'Supreme Court of India',
        citation: 'K.S. Puttaswamy v. Union of India (2017) 10 SCC 1'
      },
      {
        sourceName: 'Supreme Court of India',
        citation: 'Navtej Singh Johar v. Union of India (2018) 10 SCC 1'
      }
    ]
  }
];

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize GoogleGenAI client
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}

// Helper function to generate content with retries and fallback models
async function generateContentWithRetryAndFallback(
  ai: GoogleGenAI,
  requestPayload: {
    contents: string | any;
    config: any;
  }
): Promise<string> {
  // Allowed models in priority order
  const models = ["gemini-3.7-flash", "gemini-flash-latest", "gemini-3.1-flash-lite"];
  let lastError: any = null;

  for (const model of models) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: requestPayload.contents,
          config: requestPayload.config,
        });

        const text = response.text;
        if (text && text.trim().length > 0) {
          return text.trim();
        }
      } catch (err: any) {
        lastError = err;
        console.warn(`[Gemini API] Model ${model} attempt ${attempt + 1} failed:`, err?.message || err);
        
        // Wait before retry if 503 or 429
        const isTemporary = err?.message?.includes("503") || 
                            err?.message?.includes("429") || 
                            err?.message?.includes("demand") ||
                            err?.status === "UNAVAILABLE";
        if (isTemporary) {
          await new Promise((resolve) => setTimeout(resolve, 800 * (attempt + 1)));
        } else {
          // If not temporary or other error, break to next model
          break;
        }
      }
    }
  }

  throw lastError || new Error("All AI models currently unavailable.");
}

// Emergency rule-based fallback analyzer if Gemini API is unreachable
function buildFallbackSituationResponse(situation: string, state: string, userRole: string) {
  const isTraffic = /traffic|car|bike|vehicle|helmet|license|rc|challan|dl|puc|signal|key|seatbelt/i.test(situation);
  const isFIR = /fir|refus|complaint|stolen|theft|robbery|register|station|thana/i.test(situation);
  const isAssault = /slap|beat|hit|assault|abuse|torture|custod|injur|bruise/i.test(situation);
  const isBribe = /bribe|cash|money|rupees|giri|demand|haddi|kharcha/i.test(situation);
  const isSearch = /search|phone|whatsapp|bag|pocket|frisk|confiscat|seiz/i.test(situation);
  const isDetention = /detain|lock|arrest|night|custody|station|warrant|sister|woman|female/i.test(situation);

  let summary = "Police Encounter & Legal Rights Verification";
  let urgencyLevel = "HIGH";
  let actions = [
    "Stay calm, ask for the officer's name and designation, and do not resist physically.",
    "Politely assert your rights under Section 36 & 48 BNSS 2023 / DK Basu directives.",
    "Call 112 emergency helpline or note the Police Station and PCR van numbers."
  ];
  let whatToSay = {
    english: "Officer, with due respect, please state your name and badge number. Under the law, I have the right to know the legal grounds of this action.",
    hindi: "अधिकारी महोदय, कृपया अपना नाम और पद बताएं। कानून के अनुसार मुझे इस कार्रवाई का कानूनी कारण जानने का अधिकार है।",
    hinglish: "Officer sahab, kripya apna naam aur post batayein. Kanoon ke mutabik mujhe is karyavahi ka legal reason janne ka haq hai."
  };
  let rights = [
    {
      right: "Right to Know Grounds & Identification of Officer",
      section: "BNSS Section 36 & 48 / CrPC 50 & 50A | Article 22(1) Constitution",
      explanation: "Every police officer must wear a clear nameplate and inform you of the exact legal grounds for any questioning, detention, or notice."
    },
    {
      right: "Right to Inform a Family Member / Friend Immediately",
      section: "BNSS Section 48 / CrPC Section 50A & D.K. Basu Landmark Directive #3",
      explanation: "The police must allow you to inform a relative or friend within 8-12 hours of any detention without delay."
    }
  ];

  if (isTraffic) {
    summary = "Traffic Stop: Vehicle Inspection & Penalty Enforcement";
    actions = [
      "Show digital documents via DigiLocker or mParivahan App (legally valid under Rule 139 MVA).",
      "Ask for an official printed e-Challan; only Sub-Inspector (SI) or above can compound fines over ₹100.",
      "Remind the officer that snatching keys or deflating tyres is illegal and violates police conduct codes."
    ];
    whatToSay = {
      english: "Officer, here are my driving documents verified on DigiLocker/mParivahan. Please issue an official e-challan if an infraction occurred. Taking keys is not permitted under the Motor Vehicles Act.",
      hindi: "अधिकारी महोदय, ये मेरे डिजिलॉकर/mParivahan में मान्य दस्तावेज हैं। यदि कोई उल्लंघन है तो कृपया आधिकारिक ई-चालान दें। वाहन की चाबी छीनना कानूनन गलत है।",
      hinglish: "Officer sahab, ye mere DigiLocker/mParivahan verified documents hain. Agar koi traffic violation hai toh official e-challan issue kijiye."
    };
    rights.push({
      right: "Right against Key Snatching & Arbitrary Towing",
      section: "Motor Vehicles (Amendment) Act 2019 & Police Code of Conduct",
      explanation: "Police officers have no statutory power to forcefully remove ignition keys or deflate tires during a check."
    });
  } else if (isFIR) {
    summary = "Mandatory FIR Registration Denial & Section 173 BNSS Escalation";
    actions = [
      "Demand a formal receipt or General Diary (GD) entry acknowledgment copy in writing.",
      "Inform the Station Officer that refusing an FIR for cognizable offence violates SC Lalita Kumari guidelines.",
      "Send the complaint by Registered/Speed Post to the Superintendent of Police (SP/DCP) under BNSS 173(4)."
    ];
    whatToSay = {
      english: "Sir, this discloses a cognizable offence. As per the Supreme Court Lalita Kumari judgment and Section 173 BNSS, registration of FIR is mandatory. Please provide a stamped copy of my complaint.",
      hindi: "महोदय, यह एक संज्ञेय अपराध (Cognizable Offence) का मामला है। सुप्रीम कोर्ट के ललिता कुमारी निर्णय और BNSS धारा 173 के तहत एफआईआर दर्ज करना अनिवार्य है। कृपया पावती (Receipt) दें।",
      hinglish: "Sir, yeh cognizable offence ka case hai. Supreme Court Lalita Kumari judgment aur Section 173 BNSS ke tehat FIR darj karna mandatory hai."
    };
    rights.push({
      right: "Mandatory Registration of FIR & Free Copy",
      section: "BNSS Section 173(1) & (2) / CrPC Section 154 | Lalita Kumari v. Govt of UP",
      explanation: "The police cannot refuse to register an FIR for cognizable offences like theft, robbery, or assault, and must provide a free copy immediately."
    });
  } else if (isBribe) {
    summary = "Unlawful Bribe Demand by Public Servant";
    urgencyLevel = "CRITICAL";
    actions = [
      "Do NOT pay any cash bribe; note the officer's name, badge number, station, and exact time.",
      "Politely insist on paying only via official government e-portal, online treasury challan, or court.",
      "Immediately dial 1064 (Anti-Corruption Bureau Helpline) to lodge a formal trap or complaint."
    ];
    whatToSay = {
      english: "I will only pay through the official government portal or court receipt. I cannot make any unofficial cash settlement.",
      hindi: "मैं केवल आधिकारिक सरकारी रसीद या ऑनलाइन पोर्टल के माध्यम से भुगतान करूंगा। मैं कोई नकद लेन-देन नहीं कर सकता।",
      hinglish: "Main sirf official government portal ya court e-challan ke through pay karunga. Cash transaction kanoonan mana hai."
    };
    rights.push({
      right: "Right Against Bribery & Extortion by Police",
      section: "Section 7, 13 Prevention of Corruption Act, 1988 & BNS Section 308 (Extortion)",
      explanation: "Demanding undue advantage is a severe non-bailable offence carrying up to 7 years rigorous imprisonment for the public servant."
    });
  }

  return {
    summary,
    urgencyLevel,
    thirtySecondActions: actions,
    exactWhatToSay: whatToSay,
    legalRightsAndSections: rights,
    doNotDo: [
      "Do not physically resist, push, or argue aggressively with on-duty police.",
      "Do not sign any blank paper, confession, or statement without reading and consulting a lawyer.",
      "Do not pay unofficial cash without receiving a printed government receipt."
    ],
    whereToComplain: [
      {
        authority: "Superintendent of Police (SP) / Deputy Commissioner of Police (DCP)",
        legalBasis: "Section 173(4) BNSS 2023 / Section 154(3) CrPC",
        contactInfo: `District SP/DCP Office, ${state || "Local District"}`
      },
      {
        authority: "State Police Complaints Authority (SPCA) & ACB 1064",
        legalBasis: "Prakash Singh Supreme Court Directive / PC Act 1988",
        contactInfo: "Toll-Free Helpline: 1064 (ACB) / Dial 112 (National Emergency)"
      }
    ]
  };
}

// Emergency rule-based fallback complaint letter generator
function buildFallbackComplaintDraft(complaintType: string, incidentDetails: any, complainantDetails: any, officerDetails: string) {
  const date = incidentDetails?.date || new Date().toLocaleDateString('en-IN');
  const location = incidentDetails?.location || "Local Police Station Jurisdiction";
  const desc = incidentDetails?.description || "Incident involving refusal of statutory duty and police misconduct.";
  const name = complainantDetails?.name || "[Complainant Full Name]";
  const address = complainantDetails?.address || "[Complainant Address]";
  const contact = complainantDetails?.contact || "[Complainant Phone Number]";
  const officer = officerDetails || "On-duty personnel at the police station";

  return {
    title: `Formal Complaint regarding ${complaintType || "Police Misconduct & Refusal of Statutory Duty"}`,
    authorityAddressed: "The Superintendent of Police (SP) / Chairperson, Police Complaints Authority",
    subjectLine: `SUBJECT: Formal complaint regarding refusal of statutory duties, misconduct by ${officer}, and prayer for urgent action under Section 173(4) BNSS 2023 and Supreme Court Directives.`,
    fullLetterText: `Date: ${date}

To,
The Superintendent of Police / Deputy Commissioner of Police,
Office of the District Police Chief,
${location}

SUBJECT: FORMAL COMPLAINT UNDER SECTION 173(4) BHARATIYA NAGARIK SURAKSHA SANHITA (BNSS), 2023 REGARDING POLICE MISCONDUCT AND NON-COMPLIANCE WITH STATUTORY DIRECTIVES

Respected Sir/Madam,

I, ${name}, residing at ${address} (Contact: ${contact}), wish to bring to your urgent notice the following serious breach of law and police misconduct:

1. STATEMENT OF FACTS:
On ${date}, at approximately the premises of ${location}, the following incident occurred:
"${desc}"

2. INVOLVED OFFICERS:
The incident involved the following police personnel: ${officer}.

3. STATUTORY BREACHES & VIOLATION OF SUPREME COURT PRECEDENTS:
a) Refusal to register FIR / non-compliance with Section 173 BNSS 2023 (CrPC 154) in direct defiance of the Constitution Bench judgment of the Hon'ble Supreme Court in 'Lalita Kumari v. Govt. of U.P. (2014) 2 SCC 1'.
b) Public servant disobeying direction under law punishable under Section 198 / 199 Bharatiya Nyaya Sanhita (BNS) 2023 (IPC Section 166 / 166A).
c) Violation of mandatory arrest and procedural directives laid down in 'D.K. Basu v. State of West Bengal (1997) 1 SCC 416' and 'Arnesh Kumar v. State of Bihar (2014) 8 SCC 273'.

4. PRAYER / RELIEF SOUGHT:
In light of the above facts, I humbly pray that your good office may be pleased to:
i. Direct immediate registration of an FIR in the matter under the appropriate penal sections.
ii. Order a departmental inquiry into the conduct of the concerned officers.
iii. Direct preservation of CCTV camera footage of the police station in terms of the Hon'ble Supreme Court judgment in 'Paramvir Singh Saini v. Baljit Singh (2021) 1 SCC 184'.
iv. Provide written acknowledgment and compliance status to the undersigned.

Yours sincerely,

(Signature)
${name}
Address: ${address}
Contact: ${contact}

Enclosures / Evidence:
1. Copy of original written representation / diary entry slip (if available)
2. Relevant photo/video/electronic evidence records (Sec 63 BSA 2023 certificate)`,
    nextFilingSteps: [
      "Print 2 identical copies of this letter on A4 paper and sign both copies.",
      "Submit one copy in person to the SP/DCP office and get a date-stamped receiving on the 2nd copy.",
      "Alternatively, send via Speed Post with Acknowledgment Due (AD) and preserve the postal tracking receipt."
    ],
    applicableSections: [
      "BNSS Sec 173(4) / CrPC Sec 154(3)",
      "BNS Sec 198 / IPC Sec 166A (Public Servant Disobeying Law)",
      "Supreme Court: Lalita Kumari (Mandatory FIR) & D.K. Basu (Arrest Directives)"
    ]
  };
}

// API Health Check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "Know Your Police Rights India API" });
});

// API: AI Situation Analyzer
app.post("/api/analyze-situation", async (req, res) => {
  try {
    const { situation, state, userRole } = req.body;
    if (!situation || typeof situation !== "string") {
      return res.status(400).json({ error: "Please describe your situation." });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.status(500).json({
        error: "Gemini API key is not configured. Please set GEMINI_API_KEY in environment variables."
      });
    }

    const prompt = `You are a high-precision Indian Legal Rights & Police Encounter Emergency Assistant.
A citizen in India is in an active or recent encounter with the police and needs to know EXACTLY what to do in 30 SECONDS.
User's situation description: "${situation}"
User's State/UT (if provided): "${state || "All-India"}"
User profile (e.g. general citizen, woman, juvenile, driver, etc.): "${userRole || "Citizen"}"

Provide a structured, legally sound response strictly grounded in current Indian Law:
- Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023 (and corresponding CrPC 1973 section for dual reference)
- Bharatiya Nyaya Sanhita (BNS), 2023 (and corresponding IPC section)
- Constitution of India (Articles 20, 21, 22, 39A)
- Landmark Supreme Court Judgments (D.K. Basu, Lalita Kumari, Arnesh Kumar, Prakash Singh)
- Motor Vehicles Act, 1988 / 2019 Rules if traffic related
- Prevention of Corruption Act, 1988 if bribe related

Return pure JSON matching this exact structure:
{
  "summary": "1-sentence emergency classification (e.g. 'Unlawful Detention & Search at Traffic Stop')",
  "urgencyLevel": "HIGH" | "MEDIUM" | "CRITICAL",
  "thirtySecondActions": [
    "Step 1 immediate concrete action (max 15 words)",
    "Step 2 immediate concrete action (max 15 words)",
    "Step 3 immediate concrete action (max 15 words)"
  ],
  "exactWhatToSay": {
    "english": "Polite, firm, legally precise spoken script to say to the officer.",
    "hindi": "Exact Hindi spoken script (in Devanagari script).",
    "hinglish": "Romanized Hindi for quick reading."
  },
  "legalRightsAndSections": [
    {
      "right": "Name of the right (e.g. Right to know grounds of arrest & inform family)",
      "section": "Section BNSS 36 & 48 / CrPC 50 & 50A | Article 22(1) Constitution",
      "explanation": "Simple 1-sentence explanation of what the law forbids the police from doing."
    }
  ],
  "doNotDo": [
    "Common mistake to avoid (e.g. Do not hand over original physical RC/DL if mParivahan/Digilocker is shown; do not resist physically)."
  ],
  "whereToComplain": [
    {
      "authority": "Exact authority name (e.g., Superintendent of Police / DCP, State Police Complaints Authority, NHRC, ACB 1064)",
      "legalBasis": "Under Section 173(4) BNSS / CrPC 154(3) or SC Directive",
      "contactInfo": "Helpline or standard filing procedure"
    }
  ]
}`;

    let data: any = null;

    try {
      const text = await generateContentWithRetryAndFallback(ai, {
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              summary: { type: Type.STRING },
              urgencyLevel: { type: Type.STRING },
              thirtySecondActions: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              exactWhatToSay: {
                type: Type.OBJECT,
                properties: {
                  english: { type: Type.STRING },
                  hindi: { type: Type.STRING },
                  hinglish: { type: Type.STRING }
                },
                required: ["english", "hindi", "hinglish"]
              },
              legalRightsAndSections: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    right: { type: Type.STRING },
                    section: { type: Type.STRING },
                    explanation: { type: Type.STRING }
                  },
                  required: ["right", "section", "explanation"]
                }
              },
              doNotDo: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              whereToComplain: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    authority: { type: Type.STRING },
                    legalBasis: { type: Type.STRING },
                    contactInfo: { type: Type.STRING }
                  },
                  required: ["authority", "legalBasis", "contactInfo"]
                }
              }
            },
            required: ["summary", "urgencyLevel", "thirtySecondActions", "exactWhatToSay", "legalRightsAndSections", "doNotDo", "whereToComplain"]
          }
        }
      });

      if (text) {
        data = JSON.parse(text);
      }
    } catch (modelErr: any) {
      console.warn("AI generation failed after retries, applying high-precision Indian statutory fallback:", modelErr?.message || modelErr);
      data = buildFallbackSituationResponse(situation, state, userRole);
    }

    if (!data) {
      data = buildFallbackSituationResponse(situation, state, userRole);
    }

    return res.json({ success: true, data });
  } catch (error: any) {
    console.error("Error in /api/analyze-situation:", error);
    // In critical emergencies, ensure citizen still gets verified guidance
    const { situation, state, userRole } = req.body || {};
    if (situation) {
      const fallbackData = buildFallbackSituationResponse(situation, state, userRole);
      return res.json({ success: true, data: fallbackData, fallback: true });
    }
    return res.status(500).json({ error: error.message || "Internal server error analyzing situation." });
  }
});

// API: Complaint & Legal Notice Draft Generator
app.post("/api/generate-complaint-draft", async (req, res) => {
  try {
    const { complaintType, incidentDetails, complainantDetails, officerDetails } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.status(500).json({
        error: "Gemini API key is not configured."
      });
    }

    const prompt = `Draft a formal, legally structured, and ready-to-submit official complaint letter under Indian Law for a citizen.

Complaint Type: "${complaintType}" (e.g. 'FIR Refusal to Superintendent of Police under BNSS 173(4)/CrPC 154(3)', 'Police Misconduct to State Police Complaints Authority (SPCA)', 'Illegal Detention & Custodial Assault to NHRC/Judicial Magistrate', 'Bribe Demand to Anti-Corruption Bureau (ACB)')

Incident Details:
- Date & Time: ${incidentDetails.date || "[Date of Incident]"}
- Location & Police Station: ${incidentDetails.location || "[Location/Station Name]"}
- What Happened: ${incidentDetails.description || "[Detailed sequence of events]"}
- Witnesses/Evidence available: ${incidentDetails.evidence || "[CCTV, recordings, witnesses, medical report]"}

Complainant Details:
- Name: ${complainantDetails.name || "[Citizen Name]"}
- Address: ${complainantDetails.address || "[Address]"}
- Phone/Email: ${complainantDetails.contact || "[Phone / Email]"}

Police Officer Details (if known):
- Name / Rank / Badge / Station: ${officerDetails || "Unidentified / On-duty officers at the stated police station"}

Requirements for the letter:
1. Formal header addressing the correct constitutional or statutory authority (e.g., The Superintendent of Police / The Chairperson, State Police Complaints Authority / The Director General, Anti-Corruption Bureau).
2. Proper subject line with relevant legal sections (BNSS 2023 / BNS 2023 / CrPC / IPC / Prevention of Corruption Act / NHRC Act).
3. Clear chronologically ordered paragraphs reciting facts.
4. Specific legal breaches highlighted (e.g. Lalita Kumari judgment violation, D.K. Basu arrest memo violation, BNSS Section 173 mandatory registration, etc.).
5. Clear prayer/remedy requested (e.g. Immediate registration of FIR, inquiry into erring officers, preservation of station CCTV footage as per Paramvir Singh Saini SC judgment).
6. Proper verification and signature block.

Return pure JSON:
{
  "title": "Formal Complaint Title",
  "authorityAddressed": "Exact Title & Designation of recipient",
  "subjectLine": "Subject: ...",
  "fullLetterText": "The complete formatted letter text ready to print or email",
  "nextFilingSteps": [
    "Step 1 (e.g. Print 2 copies, get receiving stamp on duplicate or send via Speed Post with Acknowledgment Due)",
    "Step 2",
    "Step 3"
  ],
  "applicableSections": [
    "BNSS Sec 173(4) / CrPC 154(3)",
    "BNS Sec 198 / IPC 166A (Public servant disobeying law)"
  ]
}`;

    let data: any = null;

    try {
      const text = await generateContentWithRetryAndFallback(ai, {
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              authorityAddressed: { type: Type.STRING },
              subjectLine: { type: Type.STRING },
              fullLetterText: { type: Type.STRING },
              nextFilingSteps: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              applicableSections: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: ["title", "authorityAddressed", "subjectLine", "fullLetterText", "nextFilingSteps", "applicableSections"]
          }
        }
      });

      if (text) {
        data = JSON.parse(text);
      }
    } catch (modelErr: any) {
      console.warn("AI complaint draft generation failed after retries, applying statutory legal template fallback:", modelErr?.message || modelErr);
      data = buildFallbackComplaintDraft(complaintType, incidentDetails, complainantDetails, officerDetails);
    }

    if (!data) {
      data = buildFallbackComplaintDraft(complaintType, incidentDetails, complainantDetails, officerDetails);
    }

    return res.json({ success: true, data });
  } catch (error: any) {
    console.error("Error in /api/generate-complaint-draft:", error);
    const { complaintType, incidentDetails, complainantDetails, officerDetails } = req.body || {};
    const fallbackData = buildFallbackComplaintDraft(complaintType, incidentDetails, complainantDetails, officerDetails);
    return res.json({ success: true, data: fallbackData, fallback: true });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Know Your Police Rights India server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

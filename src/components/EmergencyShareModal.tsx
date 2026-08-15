import React, { useState, useEffect } from 'react';
import {
  Share2,
  MapPin,
  Send,
  Phone,
  Mail,
  MessageSquare,
  ShieldAlert,
  Users,
  Scale,
  Heart,
  Plus,
  Trash2,
  Edit2,
  Check,
  Copy,
  AlertTriangle,
  Radio,
  ExternalLink,
  Navigation,
  RefreshCw,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Lock
} from 'lucide-react';
import {
  TrustedContact,
  getSavedTrustedContacts,
  saveTrustedContacts
} from '../data/trustedContactsData';
import { POLICE_SITUATIONS } from '../data/legalSituations';

interface EmergencyShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSituationTitle?: string;
}

export const EmergencyShareModal: React.FC<EmergencyShareModalProps> = ({
  isOpen,
  onClose,
  initialSituationTitle
}) => {
  const [contacts, setContacts] = useState<TrustedContact[]>([]);
  const [selectedContactIds, setSelectedContactIds] = useState<string[]>([]);
  
  // Incident State
  const [incidentType, setIncidentType] = useState<string>(
    initialSituationTitle || 'Detention / Unlawful Police Restraint'
  );
  const [policeStation, setPoliceStation] = useState<string>('');
  const [officerDetails, setOfficerDetails] = useState<string>('');
  const [customNotes, setCustomNotes] = useState<string>('');
  
  // Geo State
  const [gpsLocation, setGpsLocation] = useState<{
    lat: number;
    lng: number;
    accuracy: number;
    address?: string;
  } | null>(null);
  const [isGettingGps, setIsGettingGps] = useState<boolean>(false);
  const [gpsError, setGpsError] = useState<string | null>(null);

  // UI state
  const [copied, setCopied] = useState<boolean>(false);
  const [isEditingContacts, setIsEditingContacts] = useState<boolean>(false);
  const [newContactName, setNewContactName] = useState<string>('');
  const [newContactRel, setNewContactRel] = useState<'Family' | 'Lawyer' | 'Trusted Contact' | 'Friend'>('Family');
  const [newContactPhone, setNewContactPhone] = useState<string>('');
  const [newContactEmail, setNewContactEmail] = useState<string>('');
  const [dispatchStatus, setDispatchStatus] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      const loaded = getSavedTrustedContacts();
      setContacts(loaded);
      setSelectedContactIds(loaded.filter(c => c.isDefaultEnabled).map(c => c.id));
      acquireGpsLocation();
    }
  }, [isOpen]);

  const acquireGpsLocation = () => {
    setIsGettingGps(true);
    setGpsError(null);

    if (!navigator.geolocation) {
      setGpsError('Geolocation is not supported on this browser.');
      setIsGettingGps(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        let resolvedAddress = `Coordinates: ${latitude.toFixed(6)}, ${longitude.toFixed(6)} (±${Math.round(accuracy)}m)`;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=16&addressdetails=1`,
            { headers: { 'Accept-Language': 'en' } }
          );
          if (res.ok) {
            const data = await res.json();
            if (data.display_name) {
              resolvedAddress = data.display_name;
            }
          }
        } catch {
          // fallback to coordinates string
        }

        setGpsLocation({
          lat: latitude,
          lng: longitude,
          accuracy,
          address: resolvedAddress
        });
        setIsGettingGps(false);
      },
      (err) => {
        setIsGettingGps(false);
        setGpsError(`Location error (${err.message || 'Permission denied'}). Enter location manually.`);
      },
      { timeout: 7000, enableHighAccuracy: true }
    );
  };

  const toggleContactSelection = (id: string) => {
    setSelectedContactIds(prev => 
      prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
    );
  };

  const handleAddContact = () => {
    if (!newContactName.trim() || !newContactPhone.trim()) return;

    const newContact: TrustedContact = {
      id: `tc-${Date.now()}`,
      name: newContactName.trim(),
      relationship: newContactRel,
      phone: newContactPhone.trim(),
      email: newContactEmail.trim(),
      isDefaultEnabled: true
    };

    const updated = [...contacts, newContact];
    setContacts(updated);
    saveTrustedContacts(updated);
    setSelectedContactIds(prev => [...prev, newContact.id]);

    setNewContactName('');
    setNewContactPhone('');
    setNewContactEmail('');
  };

  const handleDeleteContact = (id: string) => {
    const updated = contacts.filter(c => c.id !== id);
    setContacts(updated);
    saveTrustedContacts(updated);
    setSelectedContactIds(prev => prev.filter(cId => cId !== id));
  };

  const googleMapsUrl = gpsLocation 
    ? `https://maps.google.com/?q=${gpsLocation.lat},${gpsLocation.lng}` 
    : '';

  // Generate Emergency SOS Broadcast Payload
  const generateSosMessage = (recipientRel?: 'Family' | 'Lawyer' | 'Trusted Contact') => {
    const timeString = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const dateString = new Date().toLocaleDateString('en-IN');

    let specificGreeting = 'EMERGENCY LEGAL & SAFETY ALERT:';
    if (recipientRel === 'Lawyer') {
      specificGreeting = 'URGENT LEGAL AID / COUNSEL NOTICE (Art 22(1) & Sec 41D CrPC / Sec 38 BNSS):';
    } else if (recipientRel === 'Family') {
      specificGreeting = 'URGENT FAMILY SAFETY SOS:';
    }

    return `🚨 ${specificGreeting}
I am currently detained/involved in an active police encounter.

• Incident Nature: ${incidentType}
• Time & Date: ${timeString} IST, ${dateString}
${policeStation ? `• Police Station / Chowki: ${policeStation}` : ''}
${officerDetails ? `• Officer Name/Rank/Badge: ${officerDetails}` : ''}
${gpsLocation ? `• Exact Live Location: ${gpsLocation.address}` : ''}
${googleMapsUrl ? `• Google Maps Link: ${googleMapsUrl}` : ''}
${customNotes ? `• Crucial Details: ${customNotes}` : ''}

⚖️ STATUTORY INVOCATION:
Under Article 22(1) of the Constitution of India, Section 38 BNSS (Sec 41D CrPC), and D.K. Basu guidelines, I have the fundamental right to consult my advocate, inform family, and not be detained beyond 24 hours without magistrate production.

Please track my location and dispatch legal assistance immediately.
[Dispatched via SAKSHAM Citizen Legal Shield]`;
  };

  const fullSosMessage = generateSosMessage();

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(fullSosMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareToWhatsApp = (phone?: string, recipientRel?: 'Family' | 'Lawyer' | 'Trusted Contact') => {
    const text = encodeURIComponent(generateSosMessage(recipientRel));
    let cleanPhone = phone ? phone.replace(/[^0-9]/g, '') : '';
    if (cleanPhone.length === 10) {
      cleanPhone = `91${cleanPhone}`;
    }
    const url = cleanPhone 
      ? `https://wa.me/${cleanPhone}?text=${text}`
      : `https://wa.me/?text=${text}`;
    window.open(url, '_blank');
    setDispatchStatus('Opened in WhatsApp with incident coordinates and statutory rights notice.');
  };

  const handleShareToSMS = (phone?: string, recipientRel?: 'Family' | 'Lawyer' | 'Trusted Contact') => {
    const text = encodeURIComponent(generateSosMessage(recipientRel));
    const cleanPhone = phone ? phone.replace(/[^0-9]/g, '') : '';
    const url = `sms:${cleanPhone}?body=${text}`;
    window.location.href = url;
    setDispatchStatus('Opened in SMS dispatch client.');
  };

  const handleShareToEmail = (email?: string, recipientRel?: 'Family' | 'Lawyer' | 'Trusted Contact') => {
    const subject = encodeURIComponent(`URGENT LEGAL SOS: Police Encounter at ${policeStation || 'Current Location'}`);
    const body = encodeURIComponent(generateSosMessage(recipientRel));
    const url = `mailto:${email || ''}?subject=${subject}&body=${body}`;
    window.location.href = url;
    setDispatchStatus('Opened email client with legal dispatch memo.');
  };

  const handleNativeWebShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'URGENT LEGAL SOS - SAKSHAM',
          text: fullSosMessage,
          url: googleMapsUrl || window.location.href
        });
        setDispatchStatus('Successfully broadcasted via native share.');
      } catch {
        // user cancelled or share failed
      }
    } else {
      handleCopyMessage();
    }
  };

  if (!isOpen) return null;

  const familyContacts = contacts.filter(c => c.relationship === 'Family');
  const lawyerContacts = contacts.filter(c => c.relationship === 'Lawyer');
  const trustedContacts = contacts.filter(c => c.relationship === 'Trusted Contact' || c.relationship === 'Friend' || c.relationship === 'Colleague');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-[#25282b]/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white border-2 border-[#e60000] rounded-[12px] w-full max-w-4xl shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col text-[#25282b]">
        
        {/* Header Strip */}
        <div className="bg-[#e60000] p-4 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0">
              <Share2 className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-extrabold uppercase tracking-tight text-white">
                  One-Tap Emergency Sharing
                </h2>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-white text-[#e60000] uppercase">
                  Safety SOS
                </span>
              </div>
              <p className="text-xs text-white/90 font-normal">
                Instantly broadcast your live GPS location, incident details, and statutory legal notice to Family, Lawyer, and Trusted Contacts.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 bg-[#fbfbfb]">
          
          {/* Live GPS & Location Card */}
          <div className="bg-white p-4 rounded-[10px] border border-[#bebebe]/60 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#e60000]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#25282b]">
                  1. Live GPS Location & Incident Coordinates
                </span>
              </div>

              <button
                onClick={acquireGpsLocation}
                disabled={isGettingGps}
                className="flex items-center gap-1 text-xs font-bold text-[#e60000] hover:underline disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isGettingGps ? 'animate-spin' : ''}`} />
                <span>{isGettingGps ? 'Locating...' : 'Refresh GPS'}</span>
              </button>
            </div>

            {gpsLocation ? (
              <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-[8px] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-0.5 text-xs text-emerald-950">
                  <div className="flex items-center gap-1.5 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>GPS Coordinates Locked (Accuracy: ±{Math.round(gpsLocation.accuracy)}m)</span>
                  </div>
                  <p className="text-[11px] text-emerald-900 line-clamp-2">
                    {gpsLocation.address}
                  </p>
                </div>

                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shrink-0 flex items-center justify-center gap-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Maps</span>
                </a>
              </div>
            ) : (
              <div className="p-3 bg-amber-50 border border-amber-300 rounded-[8px] text-xs text-amber-950 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{gpsError || 'Acquiring GPS coordinates... Please grant permission when prompted.'}</span>
                </div>
              </div>
            )}

            {/* Incident Fast Triage Inputs */}
            <div className="grid sm:grid-cols-3 gap-3 pt-2">
              <div>
                <label className="block text-[11px] font-bold text-[#25282b] uppercase mb-1">
                  Incident Nature:
                </label>
                <select
                  value={incidentType}
                  onChange={(e) => setIncidentType(e.target.value)}
                  className="w-full p-2 bg-[#f2f2f2] border border-[#bebebe]/60 rounded-[6px] text-xs text-[#25282b] focus:outline-none focus:border-[#e60000]"
                >
                  {POLICE_SITUATIONS.map(s => (
                    <option key={s.id} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                  <option value="Vehicle Impound / Document Seizure">Vehicle Impound / Document Seizure</option>
                  <option value="Unlawful Custody / Station Detainment">Unlawful Custody / Station Detainment</option>
                  <option value="Bribe / Extortion Coercion">Bribe / Extortion Coercion</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#25282b] uppercase mb-1">
                  Police Station / Landmark:
                </label>
                <input
                  type="text"
                  placeholder="e.g. Connaught Place PS / Hauz Khas"
                  value={policeStation}
                  onChange={(e) => setPoliceStation(e.target.value)}
                  className="w-full p-2 bg-[#f2f2f2] border border-[#bebebe]/60 rounded-[6px] text-xs text-[#25282b] focus:outline-none focus:border-[#e60000]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#25282b] uppercase mb-1">
                  Officer Name / Rank / Badge:
                </label>
                <input
                  type="text"
                  placeholder="e.g. SI Sharma / Badge #482"
                  value={officerDetails}
                  onChange={(e) => setOfficerDetails(e.target.value)}
                  className="w-full p-2 bg-[#f2f2f2] border border-[#bebebe]/60 rounded-[6px] text-xs text-[#25282b] focus:outline-none focus:border-[#e60000]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#25282b] uppercase mb-1">
                Additional Urgent Note (Optional):
              </label>
              <input
                type="text"
                placeholder="e.g. Seized my phone, asking for ₹5000 cash, refusing to give memo"
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                className="w-full p-2 bg-[#f2f2f2] border border-[#bebebe]/60 rounded-[6px] text-xs text-[#25282b] focus:outline-none focus:border-[#e60000]"
              />
            </div>
          </div>

          {/* 3 Dedicated Recipient Channels: Family, Lawyer, Trusted Contacts */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#e60000]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#25282b]">
                  2. Select One-Tap Emergency Channels
                </span>
              </div>

              <button
                onClick={() => setIsEditingContacts(!isEditingContacts)}
                className="flex items-center gap-1 text-xs font-bold text-[#25282b] hover:text-[#e60000] transition"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>{isEditingContacts ? 'Done Editing' : 'Manage Contacts'}</span>
              </button>
            </div>

            {/* Recipient Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* CHANNEL 1: FAMILY */}
              <div className="bg-white rounded-[10px] border border-rose-200 shadow-sm p-4 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5 text-rose-700 font-bold text-xs uppercase">
                      <Heart className="w-4 h-4 fill-rose-100" />
                      <span>1. Family Members</span>
                    </div>
                    <span className="px-2 py-0.5 bg-rose-50 text-rose-700 text-[10px] font-bold rounded-full border border-rose-200">
                      Primary
                    </span>
                  </div>

                  <p className="text-[11px] text-[#7e7e7e] leading-snug mb-3">
                    Notifies family of your exact location, station name, and provides legal reassurance.
                  </p>

                  {familyContacts.length > 0 ? (
                    <div className="space-y-2">
                      {familyContacts.map(c => (
                        <div key={c.id} className="p-2.5 rounded-[6px] bg-rose-50/50 border border-rose-200/80 text-xs">
                          <div className="flex items-center justify-between font-bold text-[#25282b]">
                            <span>{c.name}</span>
                            {isEditingContacts && (
                              <button
                                onClick={() => handleDeleteContact(c.id)}
                                className="text-red-600 hover:text-red-800 p-1"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                          <p className="text-[11px] text-[#7e7e7e]">{c.phone || 'No phone set'}</p>

                          <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-rose-200/60">
                            <button
                              onClick={() => handleShareToWhatsApp(c.phone, 'Family')}
                              className="flex-1 py-1 px-2 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] flex items-center justify-center gap-1"
                            >
                              <MessageSquare className="w-3 h-3" />
                              <span>WhatsApp</span>
                            </button>
                            <button
                              onClick={() => handleShareToSMS(c.phone, 'Family')}
                              className="flex-1 py-1 px-2 rounded bg-[#25282b] hover:bg-black text-white font-bold text-[11px] flex items-center justify-center gap-1"
                            >
                              <Phone className="w-3 h-3" />
                              <span>SMS</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-3 bg-[#f2f2f2] rounded text-center text-xs text-[#7e7e7e]">
                      No family contact added yet.
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleShareToWhatsApp(familyContacts[0]?.phone, 'Family')}
                  className="w-full py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-[6px] text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send SOS to Family</span>
                </button>
              </div>

              {/* CHANNEL 2: LAWYER / LEGAL AID */}
              <div className="bg-white rounded-[10px] border border-blue-200 shadow-sm p-4 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5 text-blue-700 font-bold text-xs uppercase">
                      <Scale className="w-4 h-4" />
                      <span>2. Defense Lawyer / Legal Aid</span>
                    </div>
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-full border border-blue-200">
                      Art 22(1)
                    </span>
                  </div>

                  <p className="text-[11px] text-[#7e7e7e] leading-snug mb-3">
                    Sends statutory notice citing Sec 38 BNSS / 41D CrPC demanding immediate counsel presence.
                  </p>

                  {lawyerContacts.length > 0 ? (
                    <div className="space-y-2">
                      {lawyerContacts.map(c => (
                        <div key={c.id} className="p-2.5 rounded-[6px] bg-blue-50/50 border border-blue-200/80 text-xs">
                          <div className="flex items-center justify-between font-bold text-[#25282b]">
                            <span>{c.name}</span>
                            {isEditingContacts && (
                              <button
                                onClick={() => handleDeleteContact(c.id)}
                                className="text-red-600 hover:text-red-800 p-1"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                          <p className="text-[11px] text-[#7e7e7e]">{c.phone || '15100 (NALSA)'}</p>

                          <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-blue-200/60">
                            <button
                              onClick={() => handleShareToWhatsApp(c.phone, 'Lawyer')}
                              className="flex-1 py-1 px-2 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] flex items-center justify-center gap-1"
                            >
                              <MessageSquare className="w-3 h-3" />
                              <span>WhatsApp</span>
                            </button>
                            <button
                              onClick={() => handleShareToSMS(c.phone, 'Lawyer')}
                              className="flex-1 py-1 px-2 rounded bg-[#25282b] hover:bg-black text-white font-bold text-[11px] flex items-center justify-center gap-1"
                            >
                              <Phone className="w-3 h-3" />
                              <span>SMS</span>
                            </button>
                            {c.email && (
                              <button
                                onClick={() => handleShareToEmail(c.email, 'Lawyer')}
                                className="py-1 px-2 rounded bg-blue-700 hover:bg-blue-800 text-white font-bold text-[11px] flex items-center justify-center"
                                title="Send Legal Email"
                              >
                                <Mail className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-3 bg-[#f2f2f2] rounded text-center text-xs text-[#7e7e7e]">
                      No lawyer added. (NALSA 15100 available)
                    </div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <button
                    onClick={() => handleShareToWhatsApp(lawyerContacts[0]?.phone, 'Lawyer')}
                    className="w-full py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-[6px] text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-sm"
                  >
                    <Scale className="w-3.5 h-3.5" />
                    <span>Send Legal SOS to Counsel</span>
                  </button>
                  <a
                    href="tel:15100"
                    className="w-full py-1.5 bg-[#f2f2f2] hover:bg-[#e6e6e6] text-[#25282b] border border-[#bebebe]/60 rounded-[6px] text-[11px] font-bold flex items-center justify-center gap-1"
                  >
                    <Phone className="w-3 h-3 text-blue-700" />
                    <span>Call 15100 (Free NALSA Legal Aid)</span>
                  </a>
                </div>
              </div>

              {/* CHANNEL 3: TRUSTED CONTACT / WITNESS */}
              <div className="bg-white rounded-[10px] border border-amber-200 shadow-sm p-4 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5 text-amber-800 font-bold text-xs uppercase">
                      <ShieldCheck className="w-4 h-4" />
                      <span>3. Trusted Contact / Friend</span>
                    </div>
                    <span className="px-2 py-0.5 bg-amber-50 text-amber-800 text-[10px] font-bold rounded-full border border-amber-200">
                      Backup
                    </span>
                  </div>

                  <p className="text-[11px] text-[#7e7e7e] leading-snug mb-3">
                    Maintains chronological event logs and preserves evidence outside police physical custody.
                  </p>

                  {trustedContacts.length > 0 ? (
                    <div className="space-y-2">
                      {trustedContacts.map(c => (
                        <div key={c.id} className="p-2.5 rounded-[6px] bg-amber-50/50 border border-amber-200/80 text-xs">
                          <div className="flex items-center justify-between font-bold text-[#25282b]">
                            <span>{c.name}</span>
                            {isEditingContacts && (
                              <button
                                onClick={() => handleDeleteContact(c.id)}
                                className="text-red-600 hover:text-red-800 p-1"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                          <p className="text-[11px] text-[#7e7e7e]">{c.phone || 'No phone set'}</p>

                          <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-amber-200/60">
                            <button
                              onClick={() => handleShareToWhatsApp(c.phone, 'Trusted Contact')}
                              className="flex-1 py-1 px-2 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] flex items-center justify-center gap-1"
                            >
                              <MessageSquare className="w-3 h-3" />
                              <span>WhatsApp</span>
                            </button>
                            <button
                              onClick={() => handleShareToSMS(c.phone, 'Trusted Contact')}
                              className="flex-1 py-1 px-2 rounded bg-[#25282b] hover:bg-black text-white font-bold text-[11px] flex items-center justify-center gap-1"
                            >
                              <Phone className="w-3 h-3" />
                              <span>SMS</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-3 bg-[#f2f2f2] rounded text-center text-xs text-[#7e7e7e]">
                      No trusted contact configured.
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleShareToWhatsApp(trustedContacts[0]?.phone, 'Trusted Contact')}
                  className="w-full py-2 bg-[#25282b] hover:bg-black text-white rounded-[6px] text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-sm"
                >
                  <Send className="w-3.5 h-3.5 text-amber-400" />
                  <span>Send SOS to Trusted Contact</span>
                </button>
              </div>

            </div>

            {/* Add New Contact Form if in Editing Mode */}
            {isEditingContacts && (
              <div className="p-4 bg-white rounded-[10px] border border-[#bebebe]/80 space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#25282b]">
                  <Plus className="w-4 h-4 text-[#e60000]" />
                  <span>Add New Emergency Contact</span>
                </div>

                <div className="grid sm:grid-cols-4 gap-2">
                  <input
                    type="text"
                    placeholder="Full Name / Relation"
                    value={newContactName}
                    onChange={(e) => setNewContactName(e.target.value)}
                    className="p-2 bg-[#f2f2f2] border border-[#bebebe]/60 rounded text-xs"
                  />
                  <select
                    value={newContactRel}
                    onChange={(e) => setNewContactRel(e.target.value as any)}
                    className="p-2 bg-[#f2f2f2] border border-[#bebebe]/60 rounded text-xs"
                  >
                    <option value="Family">Family</option>
                    <option value="Lawyer">Lawyer</option>
                    <option value="Trusted Contact">Trusted Contact</option>
                    <option value="Friend">Friend</option>
                  </select>
                  <input
                    type="tel"
                    placeholder="Phone / WhatsApp Number"
                    value={newContactPhone}
                    onChange={(e) => setNewContactPhone(e.target.value)}
                    className="p-2 bg-[#f2f2f2] border border-[#bebebe]/60 rounded text-xs"
                  />
                  <input
                    type="email"
                    placeholder="Email (Optional)"
                    value={newContactEmail}
                    onChange={(e) => setNewContactEmail(e.target.value)}
                    className="p-2 bg-[#f2f2f2] border border-[#bebebe]/60 rounded text-xs"
                  />
                </div>

                <button
                  onClick={handleAddContact}
                  disabled={!newContactName || !newContactPhone}
                  className="px-4 py-2 bg-[#e60000] hover:bg-[#cc0000] text-white rounded text-xs font-bold transition disabled:opacity-50"
                >
                  Save Contact to Local Device
                </button>
              </div>
            )}

            {/* Generated Broadcast Preview */}
            <div className="bg-[#25282b] text-white p-4 rounded-[10px] space-y-2 border border-black">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-white/90 flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-[#e60000] animate-pulse" />
                  <span>Generated Emergency Legal SOS Payload</span>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyMessage}
                    className="flex items-center gap-1 px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded text-xs font-bold transition"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied to Clipboard!' : 'Copy SOS Text'}</span>
                  </button>
                </div>
              </div>

              <div className="p-3 bg-black/50 border border-white/10 rounded-[6px] text-xs font-mono text-[#bebebe] leading-relaxed whitespace-pre-wrap max-h-44 overflow-y-auto">
                {fullSosMessage}
              </div>
            </div>

            {dispatchStatus && (
              <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-[6px] text-xs text-emerald-950 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{dispatchStatus}</span>
              </div>
            )}

          </div>

        </div>

        {/* Bottom Master Broadcast Bar */}
        <div className="bg-[#f2f2f2] border-t border-[#bebebe]/50 p-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-[#7e7e7e]">
            <Lock className="w-3.5 h-3.5 text-emerald-700" />
            <span>Stored strictly client-side on your device. Zero cloud uploads.</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleNativeWebShare}
              className="px-4 py-2 bg-[#25282b] hover:bg-black text-white rounded-full text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share via Any App</span>
            </button>

            <button
              onClick={() => handleShareToWhatsApp()}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>One-Tap WhatsApp Broadcast</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 bg-white hover:bg-[#e6e6e6] text-[#25282b] border border-[#bebebe]/60 rounded-full text-xs font-bold transition"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

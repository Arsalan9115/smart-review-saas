"use client";
import React, { useMemo, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

type NicheKey = "clinic" | "salon" | "gym";

interface NicheConfig {
  label: string;
  defaultBusiness: string;
  badgeText: string;
  tags: Record<string, string[]>;
  theme: {
    pageBg: string;
    cardBg: string;
    softBox: string;
    border: string;
    textPrimary: string;
    textMuted: string;
    starActive: string;
    starInactive: string;
    primaryBtn: string;
    pillActive: string;
    pillInactive: string;
  };
}

const NICHES: Record<NicheKey, NicheConfig> = {
  clinic: {
    label: "Dental & Skin Clinic",
    defaultBusiness: "Aurelia Skin & Dental Studio",
    badgeText: "Patient Experience Funnel",
    tags: {
      "Painless Care": [
        "Had a completely painless and comfortable visit at {name}. The doctor explained every step clearly and made me feel completely at ease.",
        "Zero discomfort and very gentle care at {name}. One of the most reassuring clinics in Ahmedabad!",
      ],
      "Spotless Clinic": [
        "Super clean, hygienic, and well-organized clinic at {name}. Appointments ran smoothly with almost no waiting time.",
        "Impressed by the hygiene and modern setup at {name}. Felt completely safe from reception to treatment.",
      ],
      "Kind Doctor & Staff": [
        "The doctor and staff at {name} are genuinely polite, patient, and helpful. Truly a 5-star experience!",
        "Warm welcome and attentive care at {name}. Every question was answered patiently without rushing.",
      ],
    },
    theme: {
      pageBg: "bg-[#F6F4EF] text-[#18221D]",
      cardBg: "bg-white shadow-xl shadow-[#18221D]/5",
      softBox: "bg-[#FAF8F4]",
      border: "border-[#E6E0D4]",
      textPrimary: "text-[#18221D]",
      textMuted: "text-[#5C6660]",
      starActive: "text-amber-500",
      starInactive: "text-[#DDD6C7]",
      primaryBtn: "bg-[#1B4332] hover:bg-[#143326] text-white",
      pillActive: "bg-[#1B4332] text-white border-[#1B4332]",
      pillInactive: "bg-[#FAF8F4] text-[#37413C] border-[#DFD8C8] hover:border-[#1B4332]",
    },
  },
  salon: {
    label: "Salon & Spa",
    defaultBusiness: "Velvet Aura Unisex Salon & Spa",
    badgeText: "Guest Experience Funnel",
    tags: {
      "Expert Stylist": [
        "Loved my transformation at {name}! The stylist understood exactly what I wanted and delivered clean, natural results.",
        "Top-notch styling and attention to detail at {name}. Definitely coming back for my next session!",
      ],
      "Relaxing Ambience": [
        "Super calming vibe and relaxing experience at {name} from the moment I walked in. Felt completely refreshed!",
        "Peaceful ambience, great hospitality, and zero rush at {name}. Easily a 5-star spot!",
      ],
      "Hygienic & Premium": [
        "Clean tools, genuine products, and courteous staff at {name}. Worth every rupee!",
        "Clean stations and polished service at {name}. Everything felt well-maintained and professional.",
      ],
    },
    theme: {
      pageBg: "bg-[#120F10] text-[#F8F4F2]",
      cardBg: "bg-[#1B1618] shadow-2xl shadow-black/50",
      softBox: "bg-[#241D20]",
      border: "border-[#33292D]",
      textPrimary: "text-[#F8F4F2]",
      textMuted: "text-[#B5A7AD]",
      starActive: "text-[#E5A99C]",
      starInactive: "text-[#3D3236]",
      primaryBtn: "bg-[#D89587] hover:bg-[#E2A396] text-[#171214]",
      pillActive: "bg-[#D89587] text-[#171214] border-[#D89587] font-semibold",
      pillInactive: "bg-[#241D20] text-[#E6D9D5] border-[#3A2F33] hover:border-[#D89587]",
    },
  },
  gym: {
    label: "Gym & Fitness",
    defaultBusiness: "IronPulse Fitness & CrossFit",
    badgeText: "Member Check-In Funnel",
    tags: {
      "Top Trainers": [
        "Coaches at {name} actually watch your form and push you safely. Best fitness environment in the area!",
        "Knowledgeable and motivating trainers at {name}. Great workouts every single day!",
      ],
      "Clean Equipment": [
        "Well-maintained machines, clean floor, and zero crowding issues at {name}. Solid 5 stars!",
        "Modern equipment and hygienic workout space at {name}. Makes consistency so much easier.",
      ],
      "High Energy Vibe": [
        "Crazy good energy and supportive crowd at {name}. Keeps me motivated even on tired days!",
        "Great community and positive energy at {name}. Highly recommended for serious fitness goals.",
      ],
    },
    theme: {
      pageBg: "bg-[#0B0E11] text-white",
      cardBg: "bg-[#13181E] shadow-2xl shadow-black/60",
      softBox: "bg-[#1A2129]",
      border: "border-[#26303B]",
      textPrimary: "text-white",
      textMuted: "text-[#9AA7B4]",
      starActive: "text-[#A3E635]",
      starInactive: "text-[#2A3441]",
      primaryBtn: "bg-[#A3E635] hover:bg-[#B4F249] text-[#0B0E11]",
      pillActive: "bg-[#A3E635] text-[#0B0E11] border-[#A3E635] font-semibold",
      pillInactive: "bg-[#1A2129] text-[#DCE4EC] border-[#2C3744] hover:border-[#A3E635]",
    },
  },
};

export default function SmartReviewStudio() {
  const [niche, setNiche] = useState<NicheKey>("clinic");
  const [view, setView] = useState<"customer" | "owner" | "qr">("customer");

  const [businessName, setBusinessName] = useState(NICHES.clinic.defaultBusiness);
  const [googlePlaceLink, setGooglePlaceLink] = useState("");
  const [managerWhatsapp, setManagerWhatsapp] = useState("919876543210");

  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const tagKeys = useMemo(() => Object.keys(NICHES[niche].tags), [niche]);
  const [selectedTag, setSelectedTag] = useState<string>(tagKeys[0]);
  const [variantIdx, setVariantIdx] = useState<number>(0);
  const [copied, setCopied] = useState(false);

  const [complaint, setComplaint] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [feedbackSent, setFeedbackSent] = useState(false);

  const currentNiche = NICHES[niche];
  const t = currentNiche.theme;

  const handleNicheChange = (nextNiche: NicheKey) => {
    setNiche(nextNiche);
    const nextTags = Object.keys(NICHES[nextNiche].tags);
    setSelectedTag(nextTags[0]);
    setVariantIdx(0);
    setBusinessName(NICHES[nextNiche].defaultBusiness);
    setRating(0);
    setHover(0);
    setFeedbackSent(false);
    setCopied(false);
  };

  const activeDraft = useMemo(() => {
    const list = currentNiche.tags[selectedTag] || currentNiche.tags[tagKeys[0]];
    const template = list[variantIdx % list.length];
    return template.replaceAll("{name}", businessName.trim() || "this place");
  }, [currentNiche, selectedTag, tagKeys, variantIdx, businessName]);

  const targetGoogleUrl = useMemo(() => {
    const clean = googlePlaceLink.trim();
    if (clean.startsWith("http://") || clean.startsWith("https://")) {
      return clean;
    }
    return `https://www.google.com/search?q=${encodeURIComponent(
      `${businessName || "business"} Ahmedabad reviews`
    )}`;
  }, [googlePlaceLink, businessName]);

  const qrFunnelUrl = useMemo(() => {
    const slug = encodeURIComponent((businessName || "demo").toLowerCase().trim());
    return `https://smart-review-saas.vercel.app/?client=${slug}&niche=${niche}`;
  }, [businessName, niche]);

  const whatsappEscalationUrl = useMemo(() => {
    const cleanPhone = managerWhatsapp.replace(/\D/g, "");
    const text = [
      `🚨 *Private Customer Alert — ${businessName}*`,
      `Rating: ${rating}/5 Stars`,
      `Feedback: ${complaint}`,
      `Customer Contact: ${customerPhone || "Not shared"}`,
    ].join("\n");
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
  }, [managerWhatsapp, businessName, rating, complaint, customerPhone]);

  const handleCopyAndOpenGoogle = async () => {
    try {
      await navigator.clipboard.writeText(activeDraft);
    } catch {
      // Fallback if clipboard permission is blocked
    }
    setCopied(true);
    setTimeout(() => {
      window.open(targetGoogleUrl, "_blank", "noopener,noreferrer");
    }, 500);
  };

  const handlePrivateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackSent(true);
  };

  const resetCustomerFlow = () => {
    setRating(0);
    setHover(0);
    setComplaint("");
    setCustomerPhone("");
    setFeedbackSent(false);
    setCopied(false);
  };

  return (
    <div className={`min-h-screen ${t.pageBg} transition-colors duration-300 py-8 px-4`}>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className={`${t.cardBg} border ${t.border} rounded-2xl p-4 space-y-3`}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              {(Object.keys(NICHES) as NicheKey[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleNicheChange(key)}
                  className={`text-xs px-3 py-1.5 rounded-xl border transition ${
                    niche === key ? t.pillActive : t.pillInactive
                  }`}
                >
                  {NICHES[key].label}
                </button>
              ))}
            </div>

            <div className={`flex items-center gap-1 p-1 rounded-xl border ${t.border} ${t.softBox}`}>
              <button
                type="button"
                onClick={() => setView("customer")}
                className={`text-xs font-medium px-3 py-1.5 rounded-lg transition ${
                  view === "customer" ? t.primaryBtn : t.textMuted
                }`}
              >
                Customer Funnel
              </button>
              <button
                type="button"
                onClick={() => setView("owner")}
                className={`text-xs font-medium px-3 py-1.5 rounded-lg transition ${
                  view === "owner" ? t.primaryBtn : t.textMuted
                }`}
              >
                Owner ROI
              </button>
              <button
                type="button"
                onClick={() => setView("qr")}
                className={`text-xs font-medium px-3 py-1.5 rounded-lg transition ${
                  view === "qr" ? t.primaryBtn : t.textMuted
                }`}
              >
                QR Standee
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1">
            <input
              type="text"
              value={businessName}
              onChange={(e) => {
                setBusinessName(e.target.value);
                setCopied(false);
              }}
              placeholder="Client Business Name..."
              className={`w-full text-xs px-3.5 py-2.5 rounded-xl border ${t.border} ${t.softBox} ${t.textPrimary} outline-none`}
            />
            <input
              type="url"
              value={googlePlaceLink}
              onChange={(e) => setGooglePlaceLink(e.target.value)}
              placeholder="Optional: Paste Direct Google Review Link (https://g.page/...)"
              className={`w-full text-xs px-3.5 py-2.5 rounded-xl border ${t.border} ${t.softBox} ${t.textPrimary} outline-none`}
            />
          </div>
        </div>

        {view === "customer" && (
          <div className="max-w-md mx-auto">
            <div className={`${t.cardBg} border ${t.border} rounded-3xl p-7 text-center space-y-5`}>
              <div className="space-y-1.5">
                <span className={`inline-block text-[11px] font-medium px-3 py-1 rounded-full border ${t.border} ${t.softBox} ${t.textMuted}`}>
                  {currentNiche.badgeText}
                </span>
                <h1 className={`text-2xl font-bold tracking-tight ${t.textPrimary}`}>
                  {businessName || "Your Business"}
                </h1>
                <p className={`text-xs ${t.textMuted}`}>
                  How was your experience today? Tap a star to begin.
                </p>
              </div>

              <div className="flex items-center justify-center gap-2 py-1">
                {[1, 2, 3, 4, 5].map((star) => {
                  const active = star <= (hover || rating);
                  return (
                    <button
                      key={star}
                      type="button"
                      aria-label={`Rate ${star} stars`}
                      onClick={() => {
                        setRating(star);
                        setFeedbackSent(false);
                        setCopied(false);
                      }}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                      className={`text-4xl leading-none transition-transform duration-150 hover:scale-110 ${
                        active ? t.starActive : t.starInactive
                      }`}
                    >
                      ★
                    </button>
                  );
                })}
              </div>

              {rating >= 4 && (
                <div className={`border ${t.border} ${t.softBox} rounded-2xl p-4 text-left space-y-3.5`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-semibold ${t.textPrimary}`}>
                      {rating}★ Experience — Pick a Highlight
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setVariantIdx((v) => v + 1);
                        setCopied(false);
                      }}
                      className={`text-[11px] underline ${t.textMuted} hover:opacity-80`}
                    >
                      New Draft
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {tagKeys.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => {
                          setSelectedTag(tag);
                          setCopied(false);
                        }}
                        className={`text-[11px] px-3 py-1 rounded-full border transition ${
                          selectedTag === tag ? t.pillActive : t.pillInactive
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>

                  <div className={`border ${t.border} rounded-xl p-3 text-xs leading-relaxed ${t.textPrimary}`}>
                    “{activeDraft}”
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyAndOpenGoogle}
                    className={`w-full py-3 px-4 rounded-xl text-xs font-semibold transition ${t.primaryBtn}`}
                  >
                    {copied
                      ? "Copied to Clipboard — Opening Google..."
                      : "Copy Review & Open Google"}
                  </button>
                </div>
              )}

              {rating > 0 && rating <= 3 && !feedbackSent && (
                <form
                  onSubmit={handlePrivateSubmit}
                  className={`border ${t.border} ${t.softBox} rounded-2xl p-4 text-left space-y-3`}
                >
                  <div className="space-y-1">
                    <p className={`text-xs font-semibold ${t.textPrimary}`}>
                      We’re sorry we missed the mark ({rating}★)
                    </p>
                    <p className={`text-[11px] leading-relaxed ${t.textMuted}`}>
                      This goes privately to management—not posted publicly—so we can resolve it quickly.
                    </p>
                  </div>

                  <textarea
                    required
                    rows={3}
                    value={complaint}
                    onChange={(e) => setComplaint(e.target.value)}
                    placeholder="What could we have done better?"
                    className={`w-full text-xs p-3 rounded-xl border ${t.border} ${t.cardBg} ${t.textPrimary} outline-none`}
                  />

                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Phone number (optional, for manager follow-up)"
                    className={`w-full text-xs px-3 py-2.5 rounded-xl border ${t.border} ${t.cardBg} ${t.textPrimary} outline-none`}
                  />

                  <button
                    type="submit"
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold transition ${t.primaryBtn}`}
                  >
                    Send Privately to Owner
                  </button>
                </form>
              )}

              {feedbackSent && (
                <div className={`border ${t.border} ${t.softBox} rounded-2xl p-4 space-y-3`}>
                  <p className={`text-sm font-semibold ${t.textPrimary}`}>
                    Private Feedback Recorded
                  </p>
                  <p className={`text-xs ${t.textMuted}`}>
                    Thank you for sharing this with us. Management has been alerted privately.
                  </p>
                  <a
                    href={whatsappEscalationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-block w-full py-2.5 px-4 rounded-xl text-xs font-semibold transition ${t.primaryBtn}`}
                  >
                    Open Owner WhatsApp Alert
                  </a>
                </div>
              )}

              {rating > 0 && (
                <button
                  type="button"
                  onClick={resetCustomerFlow}
                  className={`text-[11px] underline ${t.textMuted}`}
                >
                  Reset Rating Flow
                </button>
              )}
            </div>
          </div>
        )}

        {view === "owner" && (
          <div className={`${t.cardBg} border ${t.border} rounded-3xl p-6 space-y-6`}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className={`text-lg font-bold ${t.textPrimary}`}>
                  {businessName} — Reputation ROI
                </h2>
                <p className={`text-xs ${t.textMuted}`}>
                  30-day overview of Google review conversions and private issue interception
                </p>
              </div>
              <span className={`text-xs px-3 py-1 rounded-full border ${t.border} ${t.softBox} ${t.textMuted}`}>
                Monthly Plan Preview
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className={`border ${t.border} ${t.softBox} rounded-2xl p-4`}>
                <p className={`text-xs ${t.textMuted}`}>4–5★ Google Conversions</p>
                <p className={`text-2xl font-bold mt-1 ${t.textPrimary}`}>+48</p>
                <p className={`text-[11px] mt-1 ${t.textMuted}`}>1-tap AI draft completion</p>
              </div>
              <div className={`border ${t.border} ${t.softBox} rounded-2xl p-4`}>
                <p className={`text-xs ${t.textMuted}`}>1–3★ Routed Privately</p>
                <p className={`text-2xl font-bold mt-1 ${t.textPrimary}`}>7</p>
                <p className={`text-[11px] mt-1 ${t.textMuted}`}>Escalated via WhatsApp</p>
              </div>
              <div className={`border ${t.border} ${t.softBox} rounded-2xl p-4`}>
                <p className={`text-xs ${t.textMuted}`}>Google Rating Lift</p>
                <p className={`text-2xl font-bold mt-1 ${t.textPrimary}`}>4.2 → 4.8★</p>
                <p className={`text-[11px] mt-1 ${t.textMuted}`}>Higher local map visibility</p>
              </div>
            </div>

            <div className={`border ${t.border} ${t.softBox} rounded-2xl p-4 space-y-2`}>
              <label className={`block text-xs font-medium ${t.textPrimary}`}>
                Owner WhatsApp Alert Number (with country code, e.g. 9198XXXXXXXX)
              </label>
              <input
                type="tel"
                value={managerWhatsapp}
                onChange={(e) => setManagerWhatsapp(e.target.value)}
                className={`w-full max-w-sm text-xs px-3.5 py-2.5 rounded-xl border ${t.border} ${t.cardBg} ${t.textPrimary} outline-none`}
              />
            </div>
          </div>
        )}

        {view === "qr" && (
          <div className="max-w-md mx-auto">
            <div className={`${t.cardBg} border ${t.border} rounded-3xl p-7 text-center space-y-5`}>
              <div className="space-y-1">
                <p className={`text-[11px] uppercase tracking-wider ${t.textMuted}`}>
                  Reception Desk Standee Preview
                </p>
                <h2 className={`text-xl font-bold ${t.textPrimary}`}>
                  {businessName}
                </h2>
                <p className={`text-xs ${t.textMuted}`}>
                  Scan to rate your visit or share private feedback
                </p>
              </div>

              <div className="inline-flex p-5 rounded-2xl bg-white border border-neutral-200">
                <QRCodeSVG value={qrFunnelUrl} size={176} level="M" />
              </div>

              <p className={`text-[11px] break-all ${t.textMuted}`}>
                {qrFunnelUrl}
              </p>

              <button
                type="button"
                onClick={() => window.print()}
                className={`w-full py-3 px-4 rounded-xl text-xs font-semibold transition ${t.primaryBtn}`}
              >
                Print / Save Standee PDF
              </button>
            </div>
          </div>
        )}

        <p className={`text-center text-[11px] ${t.textMuted}`}>
          Built by Arsalan Botawala • Smart Review & Reputation Funnel
        </p>
      </div>
    </div>
  );
}
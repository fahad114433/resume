import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";

const templates = [
  {
    id: "executive",
    name: "Executive",
    tag: "Most Popular",
    tagColor: "#7c3aed",
    description: "Commanding presence for senior professionals. Bold headers, structured layout, and authoritative typography.",
    accent: "#1e293b",
    bg: "#f8fafc",
    suits: ["C-Suite", "Directors", "VPs"],
    preview: {
      header: "#1e293b",
      accent: "#7c3aed",
      bar1: "#1e293b",
      bar2: "#334155",
    },
  },
  {
    id: "modern",
    name: "Modern",
    tag: "Trending",
    tagColor: "#0891b2",
    description: "Sleek two-column design with a color sidebar. Perfect for tech and creative professionals.",
    accent: "#0891b2",
    bg: "#f0f9ff",
    suits: ["Engineers", "Designers", "PMs"],
    preview: {
      header: "#0891b2",
      accent: "#0e7490",
      bar1: "#0891b2",
      bar2: "#7dd3fc",
    },
  },
  {
    id: "minimal",
    name: "Minimal",
    tag: "Clean",
    tagColor: "#059669",
    description: "Refined whitespace-driven layout. Lets your content breathe and speak for itself.",
    accent: "#059669",
    bg: "#f0fdf4",
    suits: ["Academics", "Writers", "Consultants"],
    preview: {
      header: "#374151",
      accent: "#059669",
      bar1: "#d1fae5",
      bar2: "#6ee7b7",
    },
  },
  {
    id: "creative",
    name: "Creative",
    tag: "Bold",
    tagColor: "#dc2626",
    description: "Vibrant asymmetric layout with personality. Stand out in creative industries.",
    accent: "#dc2626",
    bg: "#fff1f2",
    suits: ["Designers", "Artists", "Marketers"],
    preview: {
      header: "#dc2626",
      accent: "#f97316",
      bar1: "#fecaca",
      bar2: "#fed7aa",
    },
  },
  {
    id: "corporate",
    name: "Corporate",
    tag: "Professional",
    tagColor: "#1d4ed8",
    description: "Traditional structure with modern refinement. Trusted by Fortune 500 candidates.",
    accent: "#1d4ed8",
    bg: "#eff6ff",
    suits: ["Finance", "Legal", "Banking"],
    preview: {
      header: "#1d4ed8",
      accent: "#1e40af",
      bar1: "#bfdbfe",
      bar2: "#93c5fd",
    },
  },
  {
    id: "elegant",
    name: "Elegant",
    tag: "Premium",
    tagColor: "#b45309",
    description: "Sophisticated serif typography with tasteful gold accents. For those who want to impress.",
    accent: "#b45309",
    bg: "#fffbeb",
    suits: ["Executives", "Lawyers", "Academics"],
    preview: {
      header: "#78350f",
      accent: "#b45309",
      bar1: "#fde68a",
      bar2: "#fcd34d",
    },
  },
];

// Mini resume preview SVG component
const MiniPreview = ({ preview, templateId }) => (
  <svg viewBox="0 0 200 260" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Background */}
    <rect width="200" height="260" fill="white" rx="4" />

    {templateId === "modern" ? (
      <>
        {/* Two-column modern */}
        <rect width="70" height="260" fill={preview.header} rx="0" />
        <circle cx="35" cy="40" r="20" fill="white" opacity="0.2" />
        <rect x="10" y="70" width="50" height="5" rx="2" fill="white" opacity="0.8" />
        <rect x="10" y="82" width="40" height="3" rx="2" fill="white" opacity="0.5" />
        <rect x="10" y="100" width="50" height="3" rx="2" fill="white" opacity="0.6" />
        <rect x="10" y="110" width="45" height="3" rx="2" fill="white" opacity="0.4" />
        <rect x="10" y="120" width="50" height="3" rx="2" fill="white" opacity="0.4" />
        <rect x="10" y="140" width="50" height="3" rx="2" fill="white" opacity="0.6" />
        <rect x="10" y="150" width="30" height="16" rx="3" fill="white" opacity="0.2" />
        <rect x="45" y="150" width="20" height="16" rx="3" fill="white" opacity="0.2" />
        <rect x="80" y="20" width="110" height="7" rx="3" fill={preview.header} opacity="0.8" />
        <rect x="80" y="32" width="80" height="4" rx="2" fill="#94a3b8" />
        <rect x="80" y="50" width="110" height="3" rx="2" fill={preview.accent} opacity="0.6" />
        <rect x="80" y="60" width="110" height="3" rx="2" fill="#e2e8f0" />
        <rect x="80" y="68" width="90" height="3" rx="2" fill="#e2e8f0" />
        <rect x="80" y="82" width="60" height="4" rx="2" fill={preview.header} opacity="0.7" />
        <rect x="80" y="92" width="110" height="3" rx="2" fill="#e2e8f0" />
        <rect x="80" y="100" width="95" height="3" rx="2" fill="#e2e8f0" />
        <rect x="80" y="115" width="60" height="4" rx="2" fill={preview.header} opacity="0.7" />
        <rect x="80" y="125" width="110" height="3" rx="2" fill="#e2e8f0" />
        <rect x="80" y="133" width="100" height="3" rx="2" fill="#e2e8f0" />
      </>
    ) : templateId === "creative" ? (
      <>
        {/* Creative diagonal */}
        <rect width="200" height="80" fill={preview.header} />
        <polygon points="0,60 200,80 200,100 0,80" fill={preview.accent} opacity="0.5" />
        <rect x="15" y="15" width="120" height="8" rx="3" fill="white" opacity="0.9" />
        <rect x="15" y="30" width="80" height="4" rx="2" fill="white" opacity="0.6" />
        <rect x="15" y="42" width="60" height="4" rx="2" fill="white" opacity="0.5" />
        <rect x="15" y="95" width="170" height="3" rx="2" fill="#e2e8f0" />
        <rect x="15" y="103" width="150" height="3" rx="2" fill="#e2e8f0" />
        <rect x="15" y="118" width="80" height="5" rx="2" fill={preview.header} opacity="0.7" />
        <rect x="15" y="130" width="170" height="3" rx="2" fill="#e2e8f0" />
        <rect x="15" y="138" width="140" height="3" rx="2" fill="#e2e8f0" />
        <rect x="15" y="153" width="80" height="5" rx="2" fill={preview.header} opacity="0.7" />
        <rect x="15" y="165" width="170" height="3" rx="2" fill="#e2e8f0" />
        <rect x="15" y="173" width="120" height="3" rx="2" fill="#e2e8f0" />
        <rect x="15" y="190" width="50" height="14" rx="7" fill={preview.bar1} />
        <rect x="72" y="190" width="50" height="14" rx="7" fill={preview.bar2} />
        <rect x="129" y="190" width="50" height="14" rx="7" fill={preview.bar1} />
      </>
    ) : templateId === "minimal" ? (
      <>
        {/* Minimal centered */}
        <rect x="15" y="20" width="170" height="1" rx="1" fill="#e2e8f0" />
        <rect x="50" y="28" width="100" height="9" rx="3" fill={preview.header} opacity="0.85" />
        <rect x="60" y="42" width="80" height="4" rx="2" fill="#94a3b8" />
        <rect x="70" y="52" width="60" height="3" rx="2" fill="#94a3b8" opacity="0.6" />
        <rect x="15" y="65" width="170" height="1" rx="1" fill="#e2e8f0" />
        <rect x="15" y="75" width="60" height="4" rx="2" fill={preview.accent} opacity="0.8" />
        <rect x="15" y="85" width="170" height="3" rx="2" fill="#e2e8f0" />
        <rect x="15" y="93" width="150" height="3" rx="2" fill="#e2e8f0" />
        <rect x="15" y="108" width="60" height="4" rx="2" fill={preview.accent} opacity="0.8" />
        <rect x="15" y="118" width="170" height="3" rx="2" fill="#e2e8f0" />
        <rect x="15" y="126" width="130" height="3" rx="2" fill="#e2e8f0" />
        <rect x="15" y="141" width="60" height="4" rx="2" fill={preview.accent} opacity="0.8" />
        <rect x="15" y="151" width="45" height="12" rx="6" fill={preview.bar1} />
        <rect x="65" y="151" width="45" height="12" rx="6" fill={preview.bar2} />
        <rect x="115" y="151" width="45" height="12" rx="6" fill={preview.bar1} />
      </>
    ) : (
      <>
        {/* Executive / Corporate / Elegant default */}
        <rect width="200" height="55" fill={preview.header} />
        <rect x="15" y="14" width="130" height="9" rx="3" fill="white" opacity="0.95" />
        <rect x="15" y="28" width="90" height="4" rx="2" fill="white" opacity="0.6" />
        <rect x="15" y="38" width="110" height="3" rx="2" fill="white" opacity="0.4" />
        <rect x="15" y="65" width="170" height="1" rx="1" fill={preview.accent} opacity="0.3" />
        <rect x="15" y="72" width="55" height="4" rx="2" fill={preview.accent} opacity="0.9" />
        <rect x="15" y="82" width="170" height="3" rx="2" fill="#e2e8f0" />
        <rect x="15" y="90" width="140" height="3" rx="2" fill="#e2e8f0" />
        <rect x="15" y="98" width="155" height="3" rx="2" fill="#e2e8f0" />
        <rect x="15" y="112" width="170" height="1" rx="1" fill={preview.accent} opacity="0.3" />
        <rect x="15" y="119" width="55" height="4" rx="2" fill={preview.accent} opacity="0.9" />
        <rect x="15" y="130" width="100" height="3" rx="2" fill="#e2e8f0" />
        <rect x="15" y="138" width="170" height="3" rx="2" fill="#e2e8f0" />
        <rect x="15" y="146" width="130" height="3" rx="2" fill="#e2e8f0" />
        <rect x="15" y="160" width="170" height="1" rx="1" fill={preview.accent} opacity="0.3" />
        <rect x="15" y="167" width="55" height="4" rx="2" fill={preview.accent} opacity="0.9" />
        <rect x="15" y="178" width="50" height="13" rx="6" fill={preview.bar1} opacity="0.7" />
        <rect x="70" y="178" width="50" height="13" rx="6" fill={preview.bar2} opacity="0.7" />
        <rect x="125" y="178" width="50" height="13" rx="6" fill={preview.bar1} opacity="0.5" />
        <rect x="15" y="202" width="170" height="1" rx="1" fill={preview.accent} opacity="0.3" />
        <rect x="15" y="209" width="55" height="4" rx="2" fill={preview.accent} opacity="0.9" />
        <rect x="15" y="220" width="170" height="3" rx="2" fill="#e2e8f0" />
        <rect x="15" y="228" width="120" height="3" rx="2" fill="#e2e8f0" />
      </>
    )}
  </svg>
);

export default function Templates() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const handleSelectTemplate = (templateId) => {
    setSelectedId(templateId);
    localStorage.setItem("selectedTemplate", templateId);

    setTimeout(() => {
      if (user) {
        navigate(`/dashboard/create?template=${templateId}`);
      } else {
        navigate(`/login?redirect=/dashboard/create&template=${templateId}`);
      }
    }, 300);
  };

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }} className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-200 text-purple-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
            ✦ 6 Professional Templates
          </div>
          <h1 className="text-5xl font-black text-gray-900 mb-4 leading-tight">
            Your Resume,{" "}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #7c3aed, #2563eb)" }}>
              Perfectly Styled
            </span>
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto mb-8">
            Choose from professionally designed templates crafted to pass ATS systems and impress hiring managers.
          </p>

          {/* Stats row */}
          <div className="flex justify-center gap-10 text-center">
            {[["50K+", "Resumes Created"], ["95%", "ATS Compatible"], ["3min", "Average Build Time"]].map(([num, label]) => (
              <div key={label}>
                <div className="text-2xl font-black text-gray-900">{num}</div>
                <div className="text-xs text-gray-400 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <p className="text-gray-500 text-sm">
          Showing <span className="font-semibold text-gray-800">6 templates</span>
        </p>
        <div className="flex gap-2">
          {["All", "Minimal", "Creative", "Professional"].map((f) => (
            <button
              key={f}
              className="text-xs px-4 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:border-purple-400 hover:text-purple-600 transition font-medium"
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <div
              key={template.id}
              onMouseEnter={() => setHoveredId(template.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group bg-white rounded-2xl overflow-hidden transition-all duration-300"
              style={{
                boxShadow: hoveredId === template.id
                  ? `0 20px 60px -10px ${template.accent}30, 0 0 0 2px ${template.accent}40`
                  : "0 2px 20px rgba(0,0,0,0.06)",
                transform: hoveredId === template.id ? "translateY(-6px)" : "translateY(0)",
              }}
            >
              {/* Preview Area */}
              <div
                className="relative h-64 flex items-center justify-center p-6"
                style={{ background: template.bg }}
              >
                {/* Tag */}
                <div
                  className="absolute top-3 left-3 text-white text-xs font-bold px-3 py-1 rounded-full"
                  style={{ backgroundColor: template.tagColor }}
                >
                  {template.tag}
                </div>

                {/* Mini Resume Preview */}
                <div
                  className="w-36 rounded-lg overflow-hidden transition-transform duration-300"
                  style={{
                    boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
                    transform: hoveredId === template.id ? "scale(1.05) rotate(-1deg)" : "scale(1) rotate(0deg)",
                  }}
                >
                  <MiniPreview preview={template.preview} templateId={template.id} />
                </div>

                {/* Hover overlay with Use Template button */}
                <div
                  className="absolute inset-0 flex items-center justify-center transition-all duration-200"
                  style={{
                    background: `${template.accent}15`,
                    opacity: hoveredId === template.id ? 1 : 0,
                  }}
                >
                  <button
                    onClick={() => handleSelectTemplate(template.id)}
                    className="text-white text-sm font-bold px-6 py-2.5 rounded-xl shadow-lg transition-transform duration-150 active:scale-95"
                    style={{ backgroundColor: template.accent }}
                  >
                    {selectedId === template.id ? "✓ Selected!" : "Use This Template →"}
                  </button>
                </div>
              </div>

              {/* Info Area */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-lg text-gray-900">{template.name}</h3>
                  <div
                    className="w-3 h-3 rounded-full mt-1"
                    style={{ backgroundColor: template.accent }}
                  />
                </div>

                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  {template.description}
                </p>

                {/* Best for tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {template.suits.map((s) => (
                    <span
                      key={s}
                      className="text-xs px-2.5 py-1 rounded-full font-medium"
                      style={{ backgroundColor: template.bg, color: template.accent }}
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handleSelectTemplate(template.id)}
                  className="w-full py-2.5 rounded-xl text-sm font-bold transition-all duration-200 border-2"
                  style={{
                    borderColor: template.accent,
                    color: hoveredId === template.id ? "white" : template.accent,
                    backgroundColor: hoveredId === template.id ? template.accent : "transparent",
                  }}
                >
                  {selectedId === template.id ? "✓ Selected!" : "Use Template"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className="mt-16 rounded-3xl p-10 text-center text-white"
          style={{ background: "linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)" }}
        >
          <h2 className="text-3xl font-black mb-3">Ready to land your dream job?</h2>
          <p className="text-white/70 mb-6 max-w-md mx-auto">
            Pick a template above and build your professional resume in minutes. No design skills needed.
          </p>
          <button
            onClick={() => handleSelectTemplate("executive")}
            className="bg-white text-purple-700 font-bold px-8 py-3 rounded-xl hover:shadow-lg transition"
          >
            Get Started Free →
          </button>
        </div>
      </div>
    </div>
  );
}
import { useNavigate } from "react-router-dom";

const templates = [
  {
    id: "executive",
    name: "Executive",
    description: "Commanding presence for senior professionals",
    tag: "Most Popular",
    tagColor: "#7c3aed",
    accent: "#1e293b",
    bg: "#f8fafc",
    suits: ["C-Suite", "Directors", "VPs"],
  },
  {
    id: "modern",
    name: "Modern",
    description: "Sleek two-column design for tech professionals",
    tag: "Trending",
    tagColor: "#0891b2",
    accent: "#0891b2",
    bg: "#f0f9ff",
    suits: ["Engineers", "Designers", "PMs"],
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean whitespace-driven elegant layout",
    tag: "Clean",
    tagColor: "#059669",
    accent: "#059669",
    bg: "#f0fdf4",
    suits: ["Academics", "Writers", "Consultants"],
  },
  {
    id: "creative",
    name: "Creative",
    description: "Bold asymmetric layout with personality",
    tag: "Bold",
    tagColor: "#dc2626",
    accent: "#dc2626",
    bg: "#fff1f2",
    suits: ["Designers", "Artists", "Marketers"],
  },
  {
    id: "corporate",
    name: "Corporate",
    description: "Traditional structure trusted by Fortune 500",
    tag: "Professional",
    tagColor: "#1d4ed8",
    accent: "#1d4ed8",
    bg: "#eff6ff",
    suits: ["Finance", "Legal", "Banking"],
  },
  {
    id: "elegant",
    name: "Elegant",
    description: "Sophisticated serif with tasteful gold accents",
    tag: "Premium",
    tagColor: "#b45309",
    accent: "#b45309",
    bg: "#fffbeb",
    suits: ["Executives", "Lawyers", "Academics"],
  },
];

export default function TemplateSelector() {
  const navigate = useNavigate();

  const handleSelect = (templateId) => {
    localStorage.setItem("selectedTemplate", templateId);
    navigate(`/dashboard/create?template=${templateId}`);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Working on it....</h1>
        <h1 className="text-3xl font-bold text-gray-800">Choose a Template</h1>
        <p className="text-gray-500 mt-1">
          Select a template to start building your resume
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((t) => (
          <div
            key={t.id}
            onClick={() => handleSelect(t.id)}
            className="bg-white rounded-2xl overflow-hidden cursor-pointer border-2 border-transparent hover:border-purple-400 hover:-translate-y-1 transition-all duration-200 shadow-sm hover:shadow-lg"
          >
            {/* Preview box */}
            <div
              className="h-40 flex items-center justify-center relative"
              style={{ backgroundColor: t.bg }}
            >
              {/* Tag */}
              <span
                className="absolute top-3 left-3 text-white text-xs font-bold px-3 py-1 rounded-full"
                style={{ backgroundColor: t.tagColor }}
              >
                {t.tag}
              </span>

              {/* Mini resume mockup */}
              <div
                className="w-24 bg-white rounded-lg shadow-lg overflow-hidden"
              >
                {/* Header bar */}
                <div className="h-8 w-full" style={{ backgroundColor: t.accent }} />
                {/* Lines */}
                <div className="p-2 space-y-1">
                  <div className="h-2 rounded-full bg-gray-200 w-full" />
                  <div className="h-2 rounded-full bg-gray-100 w-3/4" />
                  <div className="h-2 rounded-full bg-gray-200 w-full" />
                  <div className="h-2 rounded-full bg-gray-100 w-5/6" />
                  <div className="h-2 rounded-full bg-gray-200 w-2/3" />
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-bold text-gray-800 text-base">{t.name}</h3>
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: t.accent }} />
              </div>
              <p className="text-gray-500 text-xs mb-3">{t.description}</p>

              {/* Best for */}
              <div className="flex flex-wrap gap-1 mb-4">
                {t.suits.map((s) => (
                  <span
                    key={s}
                    className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{ backgroundColor: t.bg, color: t.accent }}
                  >
                    {s}
                  </span>
                ))}
              </div>

              <button
                className="w-full py-2 rounded-xl text-sm font-bold text-white transition"
                style={{ backgroundColor: t.accent }}
              >
                Use Template →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
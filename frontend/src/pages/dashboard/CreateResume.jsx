import { useState } from "react";
import { useNavigate , useLocation} from "react-router-dom";
import API from "../../services/api";

export default function CreateResume() {
  const navigate = useNavigate();


  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const selectedTemplate = params.get("template") ||
    localStorage.getItem("selectedTemplate") ||
    "modern";

  const [resumeData, setResumeData] = useState({
    template: selectedTemplate,

    name: "",
    email: "",
    phone: "",
    linkedin: "",
    website: "",
    summary: "",
    experience: [],
    skills: [""],
    education: [{ degree: "", institution: "", year: "", description: "" }],
    projects: [],
    certifications: [],
    references: [],
  });

  // =========================
  // SKILLS
  // =========================
  const handleSkillChange = (index, value) => {
    const updated = [...resumeData.skills];
    updated[index] = value;
    setResumeData({ ...resumeData, skills: updated });
  };

  const addSkill = () => {
    setResumeData({ ...resumeData, skills: [...resumeData.skills, ""] });
  };

  const removeSkill = (index) => {
    setResumeData({
      ...resumeData,
      skills: resumeData.skills.filter((_, i) => i !== index),
    });
  };

  // =========================
  // DYNAMIC SECTIONS
  // =========================
  const handleArrayChange = (section, index, field, value) => {
    const updated = [...resumeData[section]];
    updated[index][field] = value;
    setResumeData({ ...resumeData, [section]: updated });
  };

  const addItem = (section, template) => {
    setResumeData({
      ...resumeData,
      [section]: [...resumeData[section], template],
    });
  };

  const removeItem = (section, index) => {
    setResumeData({
      ...resumeData,
      [section]: resumeData[section].filter((_, i) => i !== index),
    });
  };

  // =========================
  // SAVE
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/api/resume", resumeData);

      const savedResume = res.data;

      navigate("/dashboard/resume"); {
        state: { resume: savedResume }
      };

    } catch (error) {
      alert("Error saving resume");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">



                {/* ✅ ADD THIS - Template indicator */}
        <div className="mb-4 flex items-center justify-between bg-white border border-purple-200 rounded-xl px-4 py-3 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-purple-600">🎨</span>
            <span className="text-sm text-gray-600">Template:</span>
            <span className="text-sm font-bold text-purple-700 capitalize">{selectedTemplate}</span>
          </div>
          <button
            type="button"
            onClick={() => navigate("/dashboard/templates")}
            className="text-xs text-purple-500 hover:underline font-medium"
          >
            Change Template
          </button>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-1.5 h-8 bg-purple-600 rounded-full" />
            <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
              Create New Resume
            </h1>
          </div>
          <p className="text-gray-400 text-sm ml-5">
            Fill in your details to build a professional resume.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">

          {/* Top accent bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-purple-500 via-purple-600 to-purple-400" />

          <form onSubmit={handleSubmit} className="p-8 space-y-10">



            {/* PERSONAL INFO */}
            <div>
              <SectionLabel label="Personal Information" emoji="👤" />

              {/* Full Name - centered */}
              <div className="mt-4 flex flex-col items-center text-center mb-6">
                <input
                  type="text"
                  placeholder="Your Full Name"
                  value={resumeData.name}
                  onChange={(e) => setResumeData({ ...resumeData, name: e.target.value })}
                  className="text-2xl font-extrabold text-center text-gray-800 border-b-2 border-gray-800 focus:border-purple-600 focus:outline-none bg-transparent w-full max-w-sm placeholder-gray-300 pb-1 transition"
                />

              </div>

              {/* Contact Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <StyledInput
                  type="email"
                  placeholder="Email Address"
                  value={resumeData.email}
                  onChange={(e) => setResumeData({ ...resumeData, email: e.target.value })}
                />
                <StyledInput
                  type="tel"
                  placeholder="Phone Number"
                  value={resumeData.phone}
                  onChange={(e) => setResumeData({ ...resumeData, phone: e.target.value })}
                />
                <StyledInput
                  type="text"
                  placeholder="Location"
                  value={resumeData.linkedin}
                  onChange={(e) => setResumeData({ ...resumeData, linkedin: e.target.value })}
                />
                <StyledInput
                  type="url"
                  placeholder="Portfolio / Website URL / Linkdin"
                  value={resumeData.website}
                  onChange={(e) => setResumeData({ ...resumeData, website: e.target.value })}
                />
              </div>
            </div>

            <Hr />



            {/* SUMMARY */}
            <div>
              <SectionLabel label="Professional Summary" emoji="📝" />
              <textarea
                className="w-full mt-3 border border-gray-200 rounded-xl p-4 text-gray-700 placeholder-gray-300 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white transition resize-none"
                rows="4"
                placeholder="Write a short, powerful summary about your career and goals..."
                value={resumeData.summary}
                onChange={(e) =>
                  setResumeData({ ...resumeData, summary: e.target.value })
                }
              />
            </div>

            <Hr />

            {/* EXPERIENCE */}
            <Section
              title="Experience"
              emoji="💼"
              data={resumeData.experience}
              add={() =>
                addItem("experience", {
                  company: "",
                  role: "",
                  description: "",
                })
              }
              render={(item, index) => (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <StyledInput
                      placeholder="Company Name"
                      onChange={(e) =>
                        handleArrayChange("experience", index, "company", e.target.value)
                      }
                    />
                    <StyledInput
                      placeholder="Your Role / Title"
                      onChange={(e) =>
                        handleArrayChange("experience", index, "role", e.target.value)
                      }
                    />
                  </div>
                  <StyledTextarea
                    placeholder="Describe your key responsibilities and achievements..."
                    rows={3}
                    onChange={(e) =>
                      handleArrayChange("experience", index, "description", e.target.value)
                    }
                  />
                  <div className="flex justify-end">
                    <RemoveBtn onClick={() => removeItem("experience", index)} />
                  </div>
                </>
              )}
            />

            <Hr />

            {/* SKILLS */}
            <div>
              <SectionLabel label="Skills" emoji="⚡" />
              <div className="mt-3 space-y-2">
                {resumeData.skills.map((skill, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <StyledInput
                      value={skill}
                      placeholder={`e.g. React, Node.js, Figma`}
                      onChange={(e) => handleSkillChange(index, e.target.value)}
                    />
                    <RemoveBtn onClick={() => removeSkill(index)} />
                  </div>
                ))}
              </div>
              <AddBtn onClick={addSkill} text="Add Skill" className="mt-3" />
            </div>

            <Hr />

            {/* EDUCATION */}
            <Section
              title="Education"
              emoji="🎓"
              data={resumeData.education}
              add={() =>
                addItem("education", {
                  degree: "",
                  institution: "",
                  year: "",
                  description: "",
                })
              }
              render={(edu, index) => (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <StyledInput
                      placeholder="Degree / Qualification"
                      onChange={(e) =>
                        handleArrayChange("education", index, "degree", e.target.value)
                      }
                    />
                    <StyledInput
                      placeholder="Institution Name"
                      onChange={(e) =>
                        handleArrayChange("education", index, "institution", e.target.value)
                      }
                    />
                  </div>
                  <StyledInput
                    placeholder="Year (e.g. 2020 – 2024)"
                    onChange={(e) =>
                      handleArrayChange("education", index, "year", e.target.value)
                    }
                  />
                  <StyledTextarea
                    placeholder="Additional details, GPA, honors..."
                    rows={2}
                    onChange={(e) =>
                      handleArrayChange("education", index, "description", e.target.value)
                    }
                  />
                  <div className="flex justify-end">
                    <RemoveBtn onClick={() => removeItem("education", index)} />
                  </div>
                </>
              )}
            />

            <Hr />

            {/* PROJECTS */}
            <Section
              title="Projects"
              emoji="🚀"
              data={resumeData.projects}
              add={() =>
                addItem("projects", { title: "", description: "" })
              }
              render={(proj, index) => (
                <>
                  <StyledInput
                    placeholder="Project Title"
                    onChange={(e) =>
                      handleArrayChange("projects", index, "title", e.target.value)
                    }
                  />
                  <StyledTextarea
                    placeholder="Describe the project, tech stack, and your role..."
                    rows={3}
                    onChange={(e) =>
                      handleArrayChange("projects", index, "description", e.target.value)
                    }
                  />
                  <div className="flex justify-end">
                    <RemoveBtn onClick={() => removeItem("projects", index)} />
                  </div>
                </>
              )}
            />

            <Hr />

            {/* CERTIFICATIONS */}
            <Section
              title="Certifications"
              emoji="🏆"
              data={resumeData.certifications}
              add={() =>
                addItem("certifications", { title: "" })
              }
              render={(cert, index) => (
                <>
                  <StyledInput
                    placeholder="Certification Title (e.g. AWS Certified Developer)"
                    onChange={(e) =>
                      handleArrayChange("certifications", index, "title", e.target.value)
                    }
                  />
                  <div className="flex justify-end">
                    <RemoveBtn onClick={() => removeItem("certifications", index)} />
                  </div>
                </>
              )}
            />

            <Hr />

            {/* REFERENCES */}
            <Section
              title="References"
              emoji="👤"
              data={resumeData.references}
              add={() =>
                addItem("references", { name: "", contact: "" })
              }
              render={(ref, index) => (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <StyledInput
                      placeholder="Reference Name"
                      onChange={(e) =>
                        handleArrayChange("references", index, "name", e.target.value)
                      }
                    />
                    <StyledInput
                      placeholder="Contact (email / phone)"
                      onChange={(e) =>
                        handleArrayChange("references", index, "contact", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex justify-end">
                    <RemoveBtn onClick={() => removeItem("references", index)} />
                  </div>
                </>
              )}
            />

            {/* SAVE BUTTON */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 active:scale-[0.99] text-white font-bold py-4 rounded-2xl text-base tracking-wide shadow-lg shadow-purple-200 transition-all duration-200"
              >
                Save Resume →
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

/* ================= COMPONENT HELPERS ================= */

const SectionLabel = ({ label, emoji }) => (
  <div className="flex items-center gap-2">
    <span className="text-lg">{emoji}</span>
    <h2 className="text-gray-800 font-bold text-base tracking-tight">{label}</h2>
  </div>
);

const Hr = () => (
  <div className="border-t border-dashed border-gray-200" />
);

const StyledInput = ({ className = "", ...props }) => (
  <input
    className={`w-full border border-gray-200 bg-gray-50 text-gray-700 placeholder-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white transition ${className}`}
    {...props}
  />
);

const StyledTextarea = ({ className = "", ...props }) => (
  <textarea
    className={`w-full border border-gray-200 bg-gray-50 text-gray-700 placeholder-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white transition resize-none ${className}`}
    {...props}
  />
);

const Section = ({ title, emoji, data, render, add }) => (
  <div>
    <SectionLabel label={title} emoji={emoji} />
    <div className="mt-3 space-y-4">
      {data.map((item, index) => (
        <div
          key={index}
          className="border border-purple-100 bg-purple-50/40 rounded-2xl p-5 space-y-3"
        >
          {render(item, index)}
        </div>
      ))}
    </div>
    <AddBtn onClick={add} text={`Add ${title}`} className="mt-3" />
  </div>
);

const AddBtn = ({ onClick, text, className = "" }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex items-center gap-1.5 border border-purple-300 text-purple-600 hover:bg-purple-50 px-4 py-2 rounded-xl text-sm font-semibold transition ${className}`}
  >
    <span className="text-base leading-none">+</span> {text}
  </button>
);

const RemoveBtn = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="text-xs text-red-400 hover:text-red-600 border border-red-200 hover:border-red-400 px-3 py-1.5 rounded-lg font-semibold transition whitespace-nowrap"
  >
    ✕ Remove
  </button>
);
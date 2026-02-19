import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function ResumeBuilder() {
  const navigate = useNavigate();

  const [resumeData, setResumeData] = useState({
    summary: "",
    experience: [],
    skills: [""],
    education: [
      { degree: "", institution: "", year: "", description: "" }],
    projects: [],
    certifications: [],
    references: [],
  });

  // =========================
  // HANDLE SIMPLE INPUT
  // =========================
  const handleSkillChange = (index, value) => {
    const updatedSkills = [...resumeData.skills];
    updatedSkills[index] = value;
    setResumeData({ ...resumeData, skills: updatedSkills });
  };

  const addSkill = () => {
    setResumeData({ ...resumeData, skills: [...resumeData.skills, ""] });
  };

  const removeSkill = (index) => {
    const updatedSkills = resumeData.skills.filter((_, i) => i !== index);
    setResumeData({ ...resumeData, skills: updatedSkills });
  };
  const removeEdu = (index) => {
    const updatedSkills = resumeData.education.filter((_, i) => i !== index);
    setResumeData({ ...resumeData, education: updatedSkills });
  };

  // =========================
  // HANDLE DYNAMIC SECTIONS
  // =========================
  const handleArrayChange = (section, index, field, value) => {
    const updatedSection = [...resumeData[section]];
    updatedSection[index][field] = value;
    setResumeData({ ...resumeData, [section]: updatedSection });
  };

  const addItem = (section, template) => {
    setResumeData({
      ...resumeData,
      [section]: [...resumeData[section], template],
    });
  };

  const removeItem = (section, index) => {
    const updatedSection = resumeData[section].filter((_, i) => i !== index);
    setResumeData({ ...resumeData, [section]: updatedSection });
  };

  // =========================
  // SAVE RESUME
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/api/resume", resumeData);
      alert("Resume Saved Successfully ✅");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Error saving resume");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Resume Builder
        </h1>

        <form onSubmit={handleSubmit} className="space-y-10">

          <div className="mb-6">
            <label className="block font-semibold mb-2">Professional Summary</label>
            <textarea
              className="w-full border rounded p-2"
              rows="4"
              value={resumeData.summary}
              onChange={(e) =>
                setResumeData({ ...resumeData, summary: e.target.value })
              }
            />
          </div>


          {/* ================= EXPERIENCE ================= */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-700">Experience</h2>
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="p-4 border rounded-xl shadow-sm bg-gray-50 space-y-3">
                <input
                  type="text"
                  placeholder="Company"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                  onChange={(e) =>
                    handleArrayChange("experience", index, "company", e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="Role"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                  onChange={(e) =>
                    handleArrayChange("experience", index, "role", e.target.value)
                  }
                />
                <textarea
                  placeholder="Description"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 resize-none"
                  rows={3}
                  onChange={(e) =>
                    handleArrayChange("experience", index, "description", e.target.value)
                  }
                />
                <button
                  type="button"
                  onClick={() => removeItem("experience", index)}
                  className="text-red-500 font-semibold hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                addItem("experience", { company: "", role: "", description: "" })
              }
              className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              + Add Experience
            </button>
          </div>

          {/* ================= SKILLS ================= */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-700">Skills</h2>
            {resumeData.skills.map((skill, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => handleSkillChange(index, e.target.value)}
                  placeholder="Skill"
                  className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400"
                />
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className="text-red-500 font-semibold hover:underline"
                >
                  X
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addSkill}
              className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition"
            >
              + Add Skill
            </button>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold mt-6 mb-3">Education</h2>

            {resumeData.education.map((edu, index) => (
              <div key={index} className="border p-4 rounded mb-4">
                <input
                  type="text"
                  placeholder="Degree"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                  value={edu.degree}
                  onChange={(e) => {
                    const newEdu = [...resumeData.education];
                    newEdu[index].degree = e.target.value;
                    setResumeData({ ...resumeData, education: newEdu });
                  }}
                />

                <input
                  type="text"
                  placeholder="Institution"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 "
                  value={edu.institution}
                  onChange={(e) => {
                    const newEdu = [...resumeData.education];
                    newEdu[index].institution = e.target.value;
                    setResumeData({ ...resumeData, education: newEdu });
                  }}
                />

                <input
                  type="text"
                  placeholder="Year"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                  value={edu.year}
                  onChange={(e) => {
                    const newEdu = [...resumeData.education];
                    newEdu[index].year = e.target.value;
                    setResumeData({ ...resumeData, education: newEdu });
                  }}
                />

                <textarea
                  placeholder="Description"
                  className=" input mb-3 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                  value={edu.description}
                  onChange={(e) => {
                    const newEdu = [...resumeData.education];
                    newEdu[index].description = e.target.value;
                    setResumeData({ ...resumeData, education: newEdu });
                  }}

                />
                <button
                  type="button"
                  onClick={() => removeEdu(index)}
                  className="text-red-500 font-semibold hover:underline"
                >
                  X
                </button>
              </div>

            ))}



            <button
              type="button"
              className="bg-blue-500 text-white px-3 py-1 rounded"
              onClick={() =>
                setResumeData({
                  ...resumeData,
                  education: [
                    ...resumeData.education,
                    { degree: "", institution: "", year: "", description: "" },
                  ],
                })
              }
            >
              + Add Education
            </button>
          </div>




          {/* ================= PROJECTS ================= */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-700">Projects</h2>
            {resumeData.projects.map((proj, index) => (
              <div key={index} className="p-4 border rounded-xl shadow-sm bg-gray-50 space-y-3">
                <input
                  type="text"
                  placeholder="Project Title"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400"
                  onChange={(e) =>
                    handleArrayChange("projects", index, "title", e.target.value)
                  }
                />
                <textarea
                  placeholder="Description"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400 resize-none"
                  rows={3}
                  onChange={(e) =>
                    handleArrayChange("projects", index, "description", e.target.value)
                  }
                />
                <button
                  type="button"
                  onClick={() => removeItem("projects", index)}
                  className="text-red-500 font-semibold hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addItem("projects", { title: "", description: "" })}
              className="bg-purple-500 text-white px-5 py-2 rounded-lg hover:bg-purple-600 transition"
            >
              + Add Project
            </button>
          </div>

          {/* ================= CERTIFICATIONS ================= */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-700">Certifications</h2>
            {resumeData.certifications.map((cert, index) => (
              <div key={index} className="p-4 border rounded-xl shadow-sm bg-gray-50 space-y-3">
                <input
                  type="text"
                  placeholder="Certification Title"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400"
                  onChange={(e) =>
                    handleArrayChange("certifications", index, "title", e.target.value)
                  }
                />
                <button
                  type="button"
                  onClick={() => removeItem("certifications", index)}
                  className="text-red-500 font-semibold hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addItem("certifications", { title: "" })}
              className="bg-yellow-500 text-white px-5 py-2 rounded-lg hover:bg-yellow-600 transition"
            >
              + Add Certification
            </button>
          </div>

          {/* ================= REFERENCES ================= */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-700">References</h2>
            {resumeData.references.map((ref, index) => (
              <div key={index} className="p-4 border rounded-xl shadow-sm bg-gray-50 space-y-3">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400"
                  onChange={(e) =>
                    handleArrayChange("references", index, "name", e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="Contact"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400"
                  onChange={(e) =>
                    handleArrayChange("references", index, "contact", e.target.value)
                  }
                />
                <button
                  type="button"
                  onClick={() => removeItem("references", index)}
                  className="text-red-500 font-semibold hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addItem("references", { name: "", contact: "" })}
              className="bg-pink-500 text-white px-5 py-2 rounded-lg hover:bg-pink-600 transition"
            >
              + Add Reference
            </button>
          </div>

          {/* ================= SAVE BUTTON ================= */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-green-600 text-white px-8 py-3 rounded-xl text-lg font-semibold hover:bg-green-700 transition transform hover:scale-105"
            >
              Save Resume
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

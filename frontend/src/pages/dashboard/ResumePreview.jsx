import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../services/api";
import html2pdf from "html2pdf.js"
import jsPDF from "jspdf";

export default function ResumePreview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);
  const resumeRef = useRef();

  const handleDownloadPDF = () => {
    const element = resumeRef.current;

    const options = {
      margin: 10,
      filename: "resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        // ✅ This overrides oklch color issue
        onclone: (clonedDoc) => {
          const allEls = clonedDoc.querySelectorAll("*");
          allEls.forEach((el) => {
            const style = window.getComputedStyle(el);
            if (style.color.includes("oklch")) el.style.color = "#111827";
            if (style.backgroundColor.includes("oklch")) el.style.backgroundColor = "#ffffff";
            if (style.borderColor.includes("oklch")) el.style.borderColor = "#e5e7eb";
          });
        },
      },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(options).from(element).save();
  };

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await API.get(`/api/resume/${id}`);
        setResume(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchResume();
  }, [id]);

  if (!resume) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ✅ Buttons OUTSIDE resumeRef — won't appear in PDF */}
      <div className="max-w-4xl mx-auto px-6 pt-6 flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-700">Resume Preview</h2>
        <div className="flex gap-3">
          <button
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition"
            onClick={() => navigate("/dashboard/resume")}
          >
            ← Dashboard
          </button>
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
            onClick={handleDownloadPDF}
          >
            Download PDF
          </button>
        </div>
      </div>

      {/* ✅ Only resume content inside resumeRef */}
      <div
        className="max-w-4xl mx-auto p-6 md:p-10 bg-white shadow-xl rounded-xl mt-4 mb-10 font-sans text-gray-800"
        ref={resumeRef}
      >
        {/* Header - Name + Contact */}
        <div className="mb-8 text-center border-b-2 border-gray-200 pb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            {resume.name || "Your Name"}
          </h1>

          {/* Contact Info row */}
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-sm text-gray-600">
            {resume.email && (
              <span className="flex items-center gap-1">
                📧 {resume.email}
              </span>
            )}
            {resume.phone && (
              <span className="flex items-center gap-1">
                📞 {resume.phone}
              </span>
            )}
            {resume.linkedin && (
              <a href={resume.linkedin} className="flex items-center gap-1 text-blue-600 hover:underline" target="_blank">
                💼 {resume.linkedin}
              </a>
            )}
            {resume.website && (
              <a href={resume.website} className="flex items-center gap-1 text-blue-600 hover:underline" target="_blank">
                🌐 {resume.website}
              </a>
            )}
          </div>

          {/* Fallback if nothing filled */}
          {!resume.email && !resume.phone && !resume.linkedin && !resume.website && (
            <p className="text-gray-400 text-sm mt-2">No contact info added.</p>
          )}
        </div>

        {/* Summary */}
        <section className="mb-6">
          <h2 className="text-3xl text-center font-semibold border-b-2 border-gray-200 pb-2 mb-3">Professional Summary</h2>
          <p className="text-gray-700 leading-relaxed">{resume.summary || "No summary added."}</p>
        </section>

        {/* Experience */}
        <section className="mb-6">
          <h2 className="text-3xl text-center font-semibold border-b-2 border-gray-200 pb-2 mb-3">Experience</h2>
          {resume.experience.map((exp, i) => (
            <div key={i} className="mb-4">
              <p className="font-semibold text-lg">{exp.role}</p>
              <p className="text-gray-500">{exp.company}</p>
              <p className="text-gray-700">{exp.description}</p>
            </div>
          ))}
        </section>

        {/* Skills */}
        <section className="mb-6">
          <h2 className="text-3xl text-center font-semibold border-b-2 border-gray-200 pb-2 mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill, i) => (
              <span key={i} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">{skill}</span>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mb-6">
          <h2 className="text-3xl text-center font-semibold border-b-2 border-gray-200 pb-2 mb-3">Education</h2>
          {resume.education?.length === 0 && <p className="text-gray-500">No education added.</p>}
          {resume.education?.map((edu, i) => (
            <div key={i} className="mb-4">
              <p className="font-semibold">{edu.degree || "Degree not specified"}</p>
              <p className="text-gray-600">{edu.institution || ""}{edu.year ? ` (${edu.year})` : ""}</p>
              {edu.description && <p className="text-gray-500 mt-1">{edu.description}</p>}
            </div>
          ))}
        </section>

        {/* Projects */}
        <section className="mb-6">
          <h2 className="text-3xl text-center font-semibold border-b-2 border-gray-200 pb-2 mb-3">Projects</h2>
          {resume.projects.map((proj, i) => (
            <div key={i} className="mb-3">
              <p className="font-semibold">{proj.title}</p>
              <p className="text-gray-700">{proj.description}</p>
              {proj.link && <a href={proj.link} target="_blank" className="text-blue-600 underline">{proj.link}</a>}
            </div>
          ))}
        </section>

        {/* Certifications */}
        <section className="mb-6">
          <h2 className="text-3xl text-center font-semibold border-b-2 border-gray-200 pb-2 mb-3">Certifications</h2>
          {resume.certifications.map((cert, i) => (
            <p key={i} className="text-gray-700">{cert.title} {cert.issuer && `(${cert.issuer})`}</p>
          ))}
        </section>

        {/* References */}
        <section className="mb-6">
          <h2 className="text-3xl text-center font-semibold border-b-2 border-gray-200 pb-2 mb-3">References</h2>
          {resume.references.map((ref, i) => (
            <p key={i} className="text-gray-700 break-words">
              {ref.name || "Name not provided"} | {ref.contact || "Contact not provided"}
            </p>
          ))}
        </section>
      </div>
    </div>
  );
}
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function ResumePreview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);
  const resumeRef = useRef();

  const handleDownloadPDF = async () => {
    const element = resumeRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    pdf.save("resume.pdf");
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
    <div className="max-w-4xl mx-auto p-6 md:p-10 bg-white shadow-xl rounded-xl mt-8 font-sans text-gray-800" ref={resumeRef}>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">{resume.name || "Your Name"}</h1>
        <div className="flex gap-3">
          <button
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition"
            onClick={() => navigate("/")}
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

      {/* Contact Info */}
      <div className="flex flex-wrap gap-4 text-gray-600 mb-6">
        {resume.email && <p>Email: {resume.email}</p>}
        {resume.phone && <p>Phone: {resume.phone}</p>}
        {resume.linkedin && <p>LinkedIn: <a href={resume.linkedin} className="text-blue-600" target="_blank">{resume.linkedin}</a></p>}
        {resume.website && <p>Website: <a href={resume.website} className="text-blue-600" target="_blank">{resume.website}</a></p>}
      </div>

      {/* Summary */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold border-b-2 border-gray-200 pb-2 mb-3">Professional Summary</h2>
        <p className="text-gray-700 leading-relaxed">{resume.summary || "No summary added."}</p>
      </section>

      {/* Experience */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold border-b-2 border-gray-200 pb-2 mb-3">Experience</h2>
        {resume.experience.map((exp, i) => (
          <div key={i} className="mb-4">
            <p className="font-semibold text-lg">{exp.role} <span className="text-gray-500">@ {exp.company}</span></p>
            <p className="text-gray-700">{exp.description}</p>
          </div>
        ))}
      </section>

      {/* Skills */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold border-b-2 border-gray-200 pb-2 mb-3">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {resume.skills.map((skill, i) => (
            <span key={i} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">{skill}</span>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold border-b-2 border-gray-200 pb-2 mb-3">Education</h2>
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
        <h2 className="text-2xl font-semibold border-b-2 border-gray-200 pb-2 mb-3">Projects</h2>
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
        <h2 className="text-2xl font-semibold border-b-2 border-gray-200 pb-2 mb-3">Certifications</h2>
        {resume.certifications.map((cert, i) => (
          <p key={i} className="text-gray-700">{cert.title} {cert.issuer && `(${cert.issuer})`}</p>
        ))}
      </section>

      {/* References */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold border-b-2 border-gray-200 pb-2 mb-3">References</h2>
        {resume.references.map((ref, i) => (
          <p key={i} className="text-gray-700 break-words">
            {ref.name || "Name not provided"} | {ref.contact || "Contact not provided"}
          </p>
        ))}
      </section>
    </div>
  );
}
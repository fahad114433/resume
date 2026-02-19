import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function ResumePreview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);

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
  if (!resume) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded shadow mt-6">
      <button
        className="mb-4 text-white bg-gray-700 px-5 py-2"
        onClick={() => navigate("/")}
      >
        ← Back to Dashboard
      </button>

      <h1 className="text-3xl font-bold mb-4">Resume Preview</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold border-b pb-2 mb-3">
          Professional Summary
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {resume.summary || "No summary added."}
        </p>
      </section>


      <section className="mb-4">
        <h2 className="text-3xl font-semibold mb-2">Experience</h2>
        <hr />
        {resume.experience.map((exp, i) => (
          <div key={i} className="mb-2">
            <p className="font-semibold text-xl">{exp.role} at {exp.company}</p>
            <p>{exp.description}</p>
          </div>
        ))}
      </section>

      <section className="mb-4">
        <h2 className="text-3xl font-semibold mb-2">Skills</h2>
        <hr />
        <p>{resume.skills.join(", ")}</p>
      </section>


      <section className="mb-8">
        <h2 className="text-2xl font-semibold border-b pb-2 mb-3">
          Education
        </h2>

        {resume.education.length === 0 && (
          <p className="text-gray-500">No education added.</p>
        )}

        {resume.education.map((edu, i) => (
          <div key={i} className="mb-4 p-4 border rounded-lg">
            <p className="font-semibold text-lg">
              {edu.degree}
            </p>
            <p className="text-gray-600">
              {edu.institution} ({edu.year})
            </p>
            <p className="text-gray-500 mt-1">{edu.description}</p>
          </div>
        ))}
      </section>


      <section className="mb-4">
        <h2 className="text-3xl font-semibold mb-2">Projects</h2>
        <hr />
        {resume.projects.map((proj, i) => (
          <div key={i}>
            <p className="font-semibold">{proj.title}</p>
            <p>{proj.description}</p>
            {proj.link && <a href={proj.link} className="text-blue-500" target="_blank">Link</a>}
          </div>
        ))}
      </section>

      <section className="mb-4">
        <h2 className="text-3xl font-semibold mb-2">Certifications</h2>
        <hr />
        {resume.certifications.map((cert, i) => (
          <p key={i}>{cert.title} ({cert.issuer})</p>
        ))}
      </section>

      <section className="mb-4">
        <h2 className="text-3xl font-semibold mb-2">References</h2>
        <hr />
        {resume.references.map((ref, i) => (
          <p key={i}>{ref.name} - {ref.contact}</p>
        ))}
      </section>
    </div>
  );
}

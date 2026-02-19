import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Dashboard() {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);

  // Fetch saved resumes
  const fetchResumes = async () => {
    try {
      const res = await API.get("/api/resume");
      setResumes(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Your Saved Resumes</h1>

      {/* Create Resume Button */}
      <button
        onClick={() => navigate("/builder")}
        className=" text-white bg-gray-700 px-5 py-2 rounded-lg font-medium mb-8 hover:bg-gray-900-600 hover:scale-105 transition transform shadow"
      >
        + Create My Resume
      </button>

      {resumes.length === 0 ? (
        <p className="text-gray-500 text-lg">No resumes saved yet.</p>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <div
              key={resume._id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition cursor-pointer flex flex-col justify-between"
              onClick={() => navigate(`/preview/${resume._id}`)}
            >
              <div>
                <h2 className="font-semibold text-xl text-gray-800 mb-2">
                  {resume.projects[0]?.title || "Untitled Resume"}
                </h2>
                <p className="text-gray-500 text-sm mb-1">
                  {resume.experience[0]?.role || "No Experience Yet"}
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  Skills: {resume.skills.join(", ")}
                </p>
              </div>

              <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
                <span>{resume.projects.length} Projects</span>
                <span>{resume.experience.length} Experiences</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

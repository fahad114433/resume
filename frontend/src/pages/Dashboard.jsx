import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Dashboard() {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);

  // Fetch resumes
  const fetchResumes = async () => {
    try {
      const res = await API.get("/api/resume");
      setResumes(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.log(error);
    }
  };

  // Delete resume
  const handleDelete = async (id) => {
    try {
      await API.delete(`/api/resume/${id}`);
      fetchResumes();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-800">
            Your Saved Resumes
          </h1>

          <button
            onClick={() => navigate("/builder")}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
          >
            + Create My Resume
          </button>
        </div>

        {/* Empty State */}
        {resumes.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">
              No resumes yet
            </h2>
            <p className="text-gray-500 mb-6">
              Start building your professional resume now 🚀
            </p>
            <button
              onClick={() => navigate("/builder")}
              className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Create Resume
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resumes.map((resume) => (
              <div
                key={resume._id}
                className="bg-white/80 backdrop-blur-lg border border-gray-200 p-6 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Clickable Area */}
                <div
                  onClick={() => navigate(`/preview/${resume._id}`)}
                  className="cursor-pointer"
                >
                  <h2 className="font-bold text-xl text-gray-800 mb-2 truncate">
                    {resume.projects?.[0]?.title || "Untitled Resume"}
                  </h2>

                  <p className="text-gray-500 text-sm mb-2">
                    {resume.experience?.[0]?.role || "No Experience Yet"}
                  </p>

                  <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                    <span className="font-medium text-gray-700">Skills:</span>{" "}
                    {resume.skills?.length > 0
                      ? resume.skills.join(", ")
                      : "No skills added"}
                  </p>
                </div>

                {/* Footer */}
                <div className="mt-6">
                  <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
                    <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full">
                      {resume.projects?.length || 0} Projects
                    </span>
                    <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full">
                      {resume.experience?.length || 0} Experiences
                    </span>
                  </div>

                  {/* Edit & Delete Buttons */}
                  <div className="flex justify-between">
                    <button
                      onClick={() => navigate(`/builder/${resume._id}`)}
                      className="text-indigo-600 font-medium hover:underline"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(resume._id)}
                      className="text-red-500 font-medium hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
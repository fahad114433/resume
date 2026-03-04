import { useNavigate } from "react-router-dom";
import { useEffect, useState,useContext } from "react";
import API from "../../services/api";
import { AuthContext } from "../../context/authContext";

export default function ResumeView() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [resumes, setResumes] = useState([]);

  const fetchResumes = async () => {
    try {
      const res = await API.get("/api/resume");
      setResumes(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/api/resume/${id}`);
      fetchResumes();
    } catch (error) {
      console.log(error);
    }
  };

  // refetch when the component mounts or route changes
  useEffect(() => {
    fetchResumes();
  }, [user]);

  if (resumes.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        No Resume Found
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {resumes.map((resume) => (
        <div
          key={resume._id}
          className="bg-white/80 backdrop-blur-lg border border-gray-200 p-6 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
        >
          {/* Clickable Area */}
          <div
            onClick={() => navigate(`/dashboard/preview/${resume._id}`)}
            className="cursor-pointer"
          >
                 
            <h2 className="font-bold text-xl text-gray-800 mb-2 truncate">
              {resume.name || "Untitled Resume"}  {/* ✅ use resume.name */}
            </h2>

            <p className="text-gray-400 text-xs mb-2">{resume.email || ""}</p>

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
  )
};
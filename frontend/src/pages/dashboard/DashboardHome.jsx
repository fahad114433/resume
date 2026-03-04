import { useNavigate } from "react-router-dom";

const DashboardHome = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-300 text-white p-8 rounded-2xl shadow mb-8">
        <h1 className="text-3xl font-bold">
          Welcome to Your CV Dashboard 
        </h1>
        <p className="mt-2 opacity-90">
          AI-powered resume and cover letter builder platform.
        </p>
      </div>

      {/* Action Cards */}
      <div className="grid md:grid-cols-3 gap-6 items-center">

        <div
          onClick={() => navigate("/dashboard/create")}
          className="cursor-pointer bg-white p-6 rounded-2xl shadow hover:shadow-xl hover:scale-105 transition"
        >
          <h2 className="text-xl font-semibold mb-2">
            Create New Resume
          </h2>
          <p className="text-gray-500">
            Let AI craft a job-winning resume for you.
          </p>
        </div>

        {/* <div
          onClick={() => navigate("/dashboard/update")}
          className="cursor-pointer bg-white p-6 rounded-2xl shadow hover:shadow-xl hover:scale-105 transition"
        >
          <h2 className="text-xl font-semibold mb-2">
            Update Existing Resume
          </h2>
          <p className="text-gray-500">
            Upload and enhance your resume instantly.
          </p>
        </div>

        <div
          onClick={() => navigate("/dashboard/cover-letter")}
          className="cursor-pointer bg-white p-6 rounded-2xl shadow hover:shadow-xl hover:scale-105 transition"
        >
          <h2 className="text-xl font-semibold mb-2">
            Create Cover Letter
          </h2>
          <p className="text-gray-500">
            Generate a professional cover letter.
          </p>
        </div> */}

      </div>
    </div>
  );
};

export default DashboardHome;
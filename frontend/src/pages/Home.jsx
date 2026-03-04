import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-purple-50 via-white to-purple-100">

      {/* ================= HERO SECTION ================= */}
      <div className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-6xl w-full text-center">

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
            Build a Job-Winning{" "}
            <span className="text-purple-600 underline decoration-wavy">
              Resume
            </span>
            <br />
            resume for free
          </h1>

          <p className="mt-4 sm:mt-6 text-gray-600 text-base sm:text-lg md:text-xl max-w-3xl mx-auto">
            Create a professional, job-ready resume for free.
            Fast, simple, and designed to impress recruiters.
          </p>

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <button
              onClick={() => navigate("/login")}
              className="px-6 sm:px-8 py-3 rounded-full bg-purple-600 text-white text-lg sm:text-xl font-semibold shadow-lg hover:bg-purple-700 hover:scale-105 transition duration-300"
            >
              Create Your Resume
            </button>

            <button
              onClick={() => navigate("/login")}
              className="px-6 sm:px-8 py-3 rounded-full border-2 border-purple-600 text-purple-600 text-lg sm:text-xl font-semibold hover:bg-purple-600 hover:text-white hover:scale-105 transition duration-300"
            >
              Get Started Free
            </button>
          </div>
        </div>
      </div>

      {/* ================= FEATURES SECTION ================= */}
      <section className="py-16 sm:py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
            Powerful Features
          </h2>
          <p className="mt-2 sm:mt-4 text-gray-600 text-sm sm:text-base md:text-lg">
            Everything you need to create a professional resume.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mt-10 sm:mt-12">
            {[
              {
                title: "Easy Builder",
                desc: "Simple and user-friendly interface to build your resume quickly."
              },
              {
                title: "Professional Templates",
                desc: "Modern and ATS-friendly resume templates."
              },
              {
                title: "Instant Download",
                desc: "Download your resume in PDF format instantly."
              }
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300"
              >
                <h3 className="text-lg sm:text-xl font-semibold text-purple-600">
                  {item.title}
                </h3>
                <p className="mt-2 sm:mt-4 text-gray-600 text-sm sm:text-base">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-16 sm:py-20 bg-purple-50 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
            How It Works
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10 mt-10 sm:mt-12">
            {[
              "Sign Up & Login",
              "Fill Your Information",
              "Download Your Resume"
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto flex items-center justify-center rounded-full bg-purple-600 text-white text-lg sm:text-xl font-bold shadow-lg">
                  {i + 1}
                </div>
                <p className="mt-2 sm:mt-4 text-gray-700 font-medium text-sm sm:text-base">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-16 sm:py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
            Why Choose Us?
          </h2>

          <div className="mt-6 sm:mt-10 space-y-3 sm:space-y-6 text-gray-600 text-base sm:text-lg">
            <p>✔ 100% Free Resume Builder</p>
            <p>✔ No Hidden Charges</p>
            <p>✔ ATS Optimized Templates</p>
            <p>✔ Trusted by Job Seekers</p>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-16 sm:py-20 bg-purple-600 text-white text-center px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
          Ready to Build Your Resume?
        </h2>
        <p className="mt-2 sm:mt-4 text-sm sm:text-base md:text-lg text-purple-100">
          Start now and create your professional resume in minutes.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="mt-6 sm:mt-8 px-8 sm:px-10 py-3 bg-white text-purple-600 font-semibold rounded-full shadow-lg hover:scale-105 transition duration-300"
        >
          Get Started Now
        </button>
      </section>

    </div>
  );
};

export default Home;
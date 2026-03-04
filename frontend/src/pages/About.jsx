import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-purple-50 via-white to-purple-100 min-h-screen">

      {/* ================= HERO SECTION ================= */}
      <section className="py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          About <span className="text-purple-600">Our Resume Builder</span>
        </h1>
        <p className="mt-6 text-gray-600 text-lg max-w-3xl mx-auto">
          We help job seekers create professional, job-winning resumes easily and for free.
          Our mission is to simplify the resume creation process for everyone.
        </p>
      </section>

      {/* ================= OUR MISSION ================= */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto bg-white p-10 rounded-2xl shadow-lg text-center">
          <h2 className="text-3xl font-bold text-purple-600">
            Our Mission
          </h2>
          <p className="mt-6 text-gray-600 text-lg">
            Our goal is to provide a simple, fast, and completely free resume builder
            that helps students, professionals, and job seekers land their dream jobs.
            We believe everyone deserves access to professional tools without paying high fees.
          </p>
        </div>
      </section>

      {/* ================= WHY WE BUILT THIS ================= */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              Why We Built This Platform
            </h2>
            <p className="mt-6 text-gray-600 text-lg">
              Many resume builders charge high subscription fees.
              We wanted to create a modern, ATS-friendly resume builder
              that is accessible to everyone — completely free.
            </p>
          </div>

          <div className="bg-purple-600 text-white p-10 rounded-2xl shadow-xl">
            <h3 className="text-2xl font-semibold">
              ✔ 100% Free
            </h3>
            <h3 className="text-2xl font-semibold mt-4">
              ✔ Easy to Use
            </h3>
            <h3 className="text-2xl font-semibold mt-4">
              ✔ Professional Templates
            </h3>
            <h3 className="text-2xl font-semibold mt-4">
              ✔ Instant PDF Download
            </h3>
          </div>

        </div>
      </section>

      {/* ================= CALL TO ACTION ================= */}
      <section className="py-20 bg-purple-600 text-white text-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold">
          Ready to Build Your Resume?
        </h2>
        <p className="mt-4 text-purple-100 text-lg">
          Start now and create your professional resume in minutes.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="mt-8 px-10 py-3 bg-white text-purple-600 font-semibold rounded-full shadow-lg hover:scale-105 transition duration-300"
        >
          Get Started Now
        </button>
      </section>

    </div>
  );
};

export default About;
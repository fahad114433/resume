import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can integrate your API to send messages
    alert("Thank you for your message! We'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 px-6 py-20">
      
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-2xl">
        <h2 className="text-4xl font-bold text-gray-800 text-center">
          Get in Touch
        </h2>
        <p className="text-gray-600 text-center mt-2">
          Have a question or want to work together? Fill out the form below.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition duration-300 shadow-md hover:scale-105"
          >
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="mt-10 text-center text-gray-600">
          <p>Email: support@resumebuilder.com</p>
          <p>Location: Pakistan</p>
          <p className="mt-4 font-medium text-purple-600">
            Designed by Muhammad Fahad
          </p>
        </div>
      </div>

    </div>
  );
}
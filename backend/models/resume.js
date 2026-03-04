import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {


    template: {
      type: String,
      default: "modern",
      enum: ["executive", "modern", "minimal", "creative", "corporate", "elegant"],
    },


    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    linkedin: { type: String },
    website: { type: String },
    summary: {
      type: String,
    },
    experience: [
      {
        company: String,
        role: String,
        startDate: String,
        endDate: String,
        description: String,
      },
    ],
    skills: [String],
    projects: [
      {
        title: String,
        description: String,
        link: String,
      },
    ],

    education: [
      {
        degree: String,
        institution: String,
        year: String,
        description: String,
      },
    ],
    certifications: [
      {
        title: String,
        issuer: String,
        date: String,
      },
    ],
    references: [
      {
        name: String,
        contact: String,
        relationship: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Resume", resumeSchema);

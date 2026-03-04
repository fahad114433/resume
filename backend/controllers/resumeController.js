import Resume from "../models/resume.js";

// CREATE NEW RESUME
export const createResume = async (req, res) => {
  try {
    const {name, email, phone,linkedin,website, summary, experience, skills, education, projects, certifications, references } = req.body;

    const resume = await Resume.create({
      user: req.user._id, // From auth middleware
      name,
      email,
      phone,
      linkedin,
      website,
      summary,
      experience,
      skills,
      education,
      projects,
      certifications,
      references,
    });

    res.status(201).json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL RESUMES FOR LOGGED-IN USER
export const getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user._id });
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE RESUME BY ID
export const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    // Check if resume belongs to logged-in user
    if (resume.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// UPDATE RESUME
export const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    // Check ownership
    if (resume.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const updatedResume = await Resume.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );

    res.json(updatedResume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// DELETE RESUME
export const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    if (resume.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await Resume.findByIdAndDelete(req.params.id);

    res.json({ message: "Resume deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

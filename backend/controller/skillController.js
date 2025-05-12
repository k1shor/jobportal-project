const Skill = require("../models/Skill");

// Add a skill
exports.addSkill = async (req, res) => {
  try {
    const { name } = req.body;

    const newSkill = new Skill({ name });
    await newSkill.save();

    res.status(201).json({ message: "Skill added successfully", skill: newSkill });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get all skills
exports.getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Update a skill
exports.updateSkill = async (req, res) => {
  try {
    const { skillId } = req.params;
    const { name } = req.body;

    const updatedSkill = await Skill.findByIdAndUpdate(
      skillId,
      { name },
      { new: true }
    );

    if (!updatedSkill) return res.status(404).json({ error: "Skill not found" });

    res.json({ message: "Skill updated", skill: updatedSkill });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a skill
exports.deleteSkill = async (req, res) => {
  try {
    const { skillId } = req.params;

    const deletedSkill = await Skill.findByIdAndDelete(skillId);
    if (!deletedSkill) return res.status(404).json({ error: "Skill not found" });

    res.json({ message: "Skill deleted" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

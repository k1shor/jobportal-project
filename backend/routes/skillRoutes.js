const express = require("express");
const { addSkill, getAllSkills, updateSkill, deleteSkill } = require("../controller/skillController");
const router = express.Router();

router.post("/add", addSkill);
router.get("/", getAllSkills);
router.put("/:skillId", updateSkill);
router.delete("/:skillId", deleteSkill);

module.exports = router;

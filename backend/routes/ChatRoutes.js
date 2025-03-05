const express = require("express");
const {getAllUsers} = require("../controller/ChatController");
const router = express.Router();

router.get("/all-user", getAllUsers)




module.exports = router;
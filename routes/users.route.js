const express = require("express");
const { register, login, editBasicRecord, getDashboard } = require("../controllers/user.controller");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/edit", editBasicRecord);
router.get("/dashboard", getDashboard);

module.exports = router;
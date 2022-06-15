const express = require("express");
const { getPatients, editHealthRecords } = require("../controllers/admin.controller");
const router = express.Router()

router.get("/patients", getPatients);
router.post("/edit-health", editHealthRecords)

module.exports = router;
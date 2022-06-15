const mongoose = require("mongoose");

const healthSchema = mongoose.Schema({
  userId: Number,
  bloodGroup: String,
  genotype: String,
  HIVStatus: Boolean,
})

const HealthModel = mongoose.model("health_tbs", healthSchema);

module.exports = HealthModel;
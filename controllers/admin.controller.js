const HealthModel = require("../models/health.model");
const UserModel = require("../models/user.model");

const getPatients = (req, res) => {
  UserModel.find((err, result) => {
    if (err) {
      res.status(501).send({message: "Internal Server Error", status: false})
    } else {
      HealthModel.find((err, response) => {
        if (err) {
          res.status(501).send({message: "Internal Server Error", status: false});
        } else {
          res.send({status: true, basic: result, health: response});
        }
      })
    }
  })
}

const editHealthRecords = (req, res) => {
  const update = req.body;
  HealthModel.findOneAndUpdate({userId: req.body.userId}, update, (err, result) => {
    if (err) {
      res.status(501).send({status: false, message: "Internal Server Error"});
    } else {
      if(result) {
        res.send({message: "Patient record updated successfully", status: true, result});
      } else {
        res.send({message: "Update Failed", status: false});
      }
    }
  })
}

module.exports = {getPatients, editHealthRecords};
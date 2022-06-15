const HealthModel = require("../models/health.model");
const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const generateId = () => {
  return Math.floor((Math.random() * 10000));
}

const validateId = (id) => {
  UserModel.findOne({ userId: id }, (error, user) => {
    if (error) {
      res.status(501).send({ message: "Internal server error", status: false });
    } else {
      if (user) {
        let newId = generateId();
        validateId(newId);
      } else {
        return id;
      }
    }
  });
}

const register = (req, res) => {
  let newUser = req.body;
  id = generateId()
  // console.log(id)
  // newUser.userId = validateId(id);
  newUser.userId = id;
  const healthRecord = {userId: newUser.userId, genotype: "", bloodGroup: "", HIVStatus: false}
  UserModel.findOne({email: newUser.email}, (err, result) => {
    if (err) {
      res.status(501).send({message: "Internal server error", status: false});
    } else {
      if (result) {
        res.send({status: false, message: "Email already exist"})
      } else {
        const form = new UserModel(newUser);
        const healthForm = new HealthModel(healthRecord)
        form.save((error) => {
          if (error) {
            res.status(501).send({message: "Internal server error", status: false});
          } else {
            healthForm.save((lastError) => {
              if(lastError) {
                res.status(501).send({message: "Internal Server Error", status: false});
              } else {
                res.send({
                  message: "Registration successful",
                  status: true,
                  id: newUser.userId,
                });
              }
            })
          }
        })
      }
    }
  })
}

const login = (req, res) => {
  // console.log(req.body);
  UserModel.findOne({userId: req.body.id}, (err, result) => {
    if (err) {
      res.status(501).send({message: "Internal Server error", status: false});
    } else {
      if (!result) {
        res.send({status: false, message: "Invalid Id"})
      } else {
        HealthModel.findOne({userId: req.body.id}, (error, response) => {
          if (error) {
            res.status(501).send({message: "Internal Server Error", status: false});
          } else {
            const token = jwt.sign({email: result.email}, "secret", {expiresIn: "1d"})
            res.send({ message: "login successful", status: true, basic: result, health: response, token });
          }
        })
      }
    }
  })
}

const editBasicRecord = (req, res) => {
  const update = req.body;
  UserModel.findOneAndUpdate({userId: req.body.userId}, update, (err, result) => {
    if (err) {
      res.status(501).send({status: false, message: "Internal Server Error"});
    } else {
      if (result) {
        res.send({message: "Patient record updated successfully", status: true, result});
      } else {
        res.send({message: "Unable to Update", status: false});
      }
    }
  })
}

const getDashboard = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, "secret", (err, response) => {
    if (err) {
      res.send({status: false, message: "Unauthorized"});
    } else {
      if (response) {
        UserModel.findOne({ email: response.email }, (errors, result) => {
          if (errors) {
            res
              .status(501)
              .send({ message: "Internal Server error", status: false });
          } else {
            if (!result) {
              res.send({ status: false, message: "Invalid Id" });
            } else {
              HealthModel.findOne(
                { userId: result.userId },
                (error, response) => {
                  if (error) {
                    res
                      .status(501)
                      .send({
                        message: "Internal Server Error",
                        status: false,
                      });
                  } else {
                    res.send({
                      status: true,
                      basic: result,
                      health: response,
                    });
                  }
                }
              );
            }
          }
        });
      }
    }
  })
}

module.exports = {register, login, editBasicRecord, getDashboard};

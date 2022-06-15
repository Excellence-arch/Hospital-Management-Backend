const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./routes/users.route");
const adminRouter = require("./routes/admin.route")
require("dotenv").config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use("/users", userRouter);
app.use("/admin", adminRouter)

const PORT = process.env.PORT;
const URI = process.env.URI;
mongoose.connect(URI, (err) => {
  if (err) {
    console.log("Error connecting to the database");
  } else {
    console.log("Connection to the database established successfully");
  }
});

app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});

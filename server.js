// SERVER FILE
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send({
    message: "Welcome",
  });
});

//SERVER LISTENING

app.listen(port, () => {
  console.log(
    `The Server is running in ${process.env.DEV_MODE} mode on ${port}`.bgGreen
      .white
  );
});

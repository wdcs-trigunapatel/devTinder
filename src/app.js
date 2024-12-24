const express = require("express");

const app = express();

app.use("/api", (req, res) => {
  res.send("Hello I am in the project");
});

app.use("/hello/2", (req, res) => {
  res.send("Here is node js");
});

app.use("/hello", (req, res) => {
  res.send("Hello Hello Hello hello Hello");
});

app.use("/", (req, res) => {
  res.send("Hello this is dashboard");
});

app.listen(3001, () => {
  console.log("server is running up........");
});

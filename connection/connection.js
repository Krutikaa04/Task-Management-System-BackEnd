const mongoose = require("mongoose");

const db = process.env.DB;

const conn = mongoose
  .connect(db, {})
  .then(() => {
    console.log(`Connection Successful`);
  })
  .catch((err) => {
    console.log("No Connection", err);
  });

  module.exports = conn;
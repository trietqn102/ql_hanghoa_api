const mongoose = require("mongoose");

// connect database in Mongo
async function connect() {
  try {
    await mongoose.connect("mongodb+srv://admin:admin@cluster0.fydnpjs.mongodb.net/Manager_Product");
    console.log("Connect successfully");
  } catch (error) {
    console.log("Connect failure");
  }
}

module.exports = { connect };

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: Number, default: 1}
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", schema);

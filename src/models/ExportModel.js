const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    userImport: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    storedId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("exportStored", schema);

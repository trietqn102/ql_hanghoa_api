const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    productCode: { type: String, required: true, unique: true },
    userImport: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    name: { type: String, required: true },
    weight: { type: Number, required: true },
    location: { type: Number, required: true },
    status: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", schema);

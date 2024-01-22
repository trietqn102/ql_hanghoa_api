const ExportModel = require("../models/ExportModel");
const StoredModel = require("../models/StoredModel");

module.exports = {
  getStored(req, res, next) {
    ExportModel.find({ })
      .populate(["storedId", "userImport"])
      .then((data) => res.status(200).json({ data }))
      .catch((err) => res.status(500).json({ err }));
  },

  exportStored(req, res, next) {
    if (req.user.role == 0) {
      const dataToInsert = req.body.map((item) => ({
        storedId: item.id,
        userImport: req.user.id,
      }));
      ExportModel.insertMany(dataToInsert)
        .then((result) => {
          const storedIdsToUpdate = dataToInsert.map((item) => item.storedId);

          return StoredModel.updateMany(
            { _id: { $in: storedIdsToUpdate } },
            { $set: { status: 1 } }
          );
        })
        .then((updateResult) => {
          res.status(200).json({ data: updateResult });
        })
        .catch((error) => {
          res.status(500).json({ error: "Internal Server Error" });
        });
    } else {
      res.status(401).json({ error: "You are not allowed" });
    }
  },
};

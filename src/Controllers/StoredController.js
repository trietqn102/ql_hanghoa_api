const StoredModel = require("../models/StoredModel");

module.exports = {
  getStored(req, res, next) {
    StoredModel.find()
      .populate(["userImport"])
      .then((data) => res.json({ data }))
      .catch((err) => res.status(500).json({ err }));
  },

  getStoredImport(req, res, next) {
    if (req.user.role == 0) {
      StoredModel.find({ status: 0 })
        .populate("userImport")
        .then((data) => res.json({ data }))
        .catch((err) => res.status(500).json({ err }));
    } else {
      res.status(401).json({ error: "You are not allowed" });
    }
  },

  postStored(req, res, next) {
    if (req.user.role == 0) {
      req.body.userImport = req.user.id;
      const stored = new StoredModel(req.body);
      stored
        .save()
        .then((data) => res.json({ data }))
        .catch((err) => res.status(500).json(err));
    } else {
      res.status(401).json({ error: "You are not allowed" });
    }
  },

  deleteStored(req, res, next) {
    if (req.user.role == 0) {
      const idsToUpdate = req.body.map((item) => item.id);
      StoredModel.deleteMany({ _id: { $in: idsToUpdate } })
        .then((data) => res.status(200).json({ data }))
        .catch((err) => res.status(500).json({ err }));
    } else {
      res.status(401).json({ error: "You are not allowed" });
    }
  },

  editStored(req, res, next) {
    if (req.user.role == 0) {
      StoredModel.findByIdAndUpdate(req.params.id, req.body)
        .then((data) => res.status(200).json({ data }))
        .catch((err) => res.status(500).json({ err }));
    } else {
      res.status(401).json({ error: "You are not allowed" });
    }
  },
};

const authModel = require("../models/AuthModel");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

module.exports = {
  getAll(req, res, next) {
    if (req.user.role == 0) {
      authModel
        .find()
        .then((data) => res.status(200).json({ data }))
        .catch((err) => res.status(500).json(err));
    } else {
      res.status(401).json({ error: "You are not allowed" });
    }
  },

  login(req, res, next) {
    authModel
      .findOne({ username: req.body.username })
      .then((data) => {
        if (!data) res.status(404).json({ error: "Invalid username" });
        else {
          const hashedPassword = CryptoJS.AES.decrypt(
            data.password,
            "Qlhanghoa2024"
          ).toString(CryptoJS.enc.Utf8);

          if (hashedPassword !== req.body.password) {
            return res.status(401).json({ error: "Invalid password" });
          }

          const accessToken = jwt.sign(
            {
              id: data._id,
              role: data.role,
            },
            "Qlhanghoa2024",
            {
              expiresIn: "7d",
            }
          );

          const { ...other } = data._doc;

          res.status(200).json({ ...other, token: accessToken });
        }
      })
      .catch((err) => res.sendStatus(500));
  },

  register(req, res, next) {
    const handlePassword = CryptoJS.AES.encrypt(
      req.body.password,
      "Qlhanghoa2024"
    ).toString();

    req.body.password = handlePassword;
    const auth = new authModel(req.body);
    auth
      .save()
      .then((data) => {
        res.status(200).json({ data });
      })
      .catch((err) => {
        res.status(500).json({ err });
      });
  },

  getCurrent(req, res, next) {
    res.status(200).json({ data: req.user });
  },

  edit(req, res, next) {
    const handlePassword = CryptoJS.AES.encrypt(
      req.body.password,
      "Qlhanghoa2024"
    ).toString();
    req.body.password = handlePassword;

    authModel
      .findOneAndUpdate({ _id: req.user.id }, req.body, { new: true })
      .then((user) => {
        res.status(200).json({ data: user });
      })
      .catch(() => res.sendStatus(500));
  },
};

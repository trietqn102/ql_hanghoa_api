const express = require("express");
const router = express.Router();

const authControllers = require("../Controllers/AuthController");
const checkLogin = require("../middleware/checkLogin");

router.get("/get-all", checkLogin, authControllers.getAll);

router.post("/login", authControllers.login);
router.get("/get-current", checkLogin, authControllers.getCurrent);
router.post("/register", checkLogin, authControllers.register);
router.put("/edit-user", checkLogin, authControllers.edit);

module.exports = router;

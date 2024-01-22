const express = require("express");
const router = express.Router();

const mainControllers = require("../Controllers/ExportController");
const checkLogin = require("../middleware/checkLogin");

router.get("/get-stored", checkLogin, mainControllers.getStored);
router.put("/export-stored", checkLogin, mainControllers.exportStored);

module.exports = router;

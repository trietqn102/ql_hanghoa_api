const express = require("express");
const router = express.Router();

const mainControllers = require("../Controllers/StoredController");
const checkLogin = require("../middleware/checkLogin");

router.get("/get-stored",  mainControllers.getStored);

router.get("/get-stored-import", checkLogin, mainControllers.getStoredImport);
router.post("/post-stored", checkLogin, mainControllers.postStored);
router.put("/edit-stored/:id", checkLogin, mainControllers.editStored);
router.post("/delete-stored", checkLogin, mainControllers.deleteStored);

module.exports = router;

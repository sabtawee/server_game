const express = require("express");
const { getLogin, getLoginById, createLogin, userLogin, userChangePassword } = require("../controllers/UserController");

const router = express.Router();

router.get("/", getLogin);
router.get("/:account_id", getLoginById);
router.post("/", createLogin);
router.post("/login", userLogin);
router.post("/changepassword", userChangePassword);


module.exports = router;
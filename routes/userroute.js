const express = require("express");
const router = express.Router();
const authcontroller = require("../contorller/authenticationController");

router.get("/user", authcontroller.user);
router.get("/login", authcontroller.login);
router.post("/logins", authcontroller.logins);
router.get("/logout", authcontroller.logout);

module.exports = router;

const express = require("express");
const router = express.Router();
const homeController = require("../contorller/homeController");
const authcontroller = require("../contorller/authenticationController");
router.get("/", authcontroller.loggedin, homeController.homepage);

module.exports = router;

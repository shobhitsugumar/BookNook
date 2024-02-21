const express = require("express");
const router = express.Router();
const authorController = require("../contorller/authorContorller");
const authenticationController = require("../contorller/authenticationController");

//all author routes
router.get("/", authenticationController.loggedin, authorController.allAuthor);

//for new author
router.get(
  "/new",
  authenticationController.loggedin,
  authenticationController.protect,
  authorController.newAuthor
);

//create author route
router.post("/", authorController.crtAuthor);

//get one author
router.get(
  "/:id",
  authenticationController.loggedin,
  authorController.oneauthor
);

//edit the author
router.get(
  "/:id/edit",
  authenticationController.protect,
  authenticationController.loggedin,
  authorController.editauthor
);

//update the author
router.put("/:id", authorController.updateauthor);

//Delete the author
router.delete(
  "/:id",
  authenticationController.protect,
  authorController.deleteauthor
);

module.exports = router;

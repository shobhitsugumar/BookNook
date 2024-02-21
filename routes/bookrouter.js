const express = require("express");
const router = express.Router();
const bookController = require("../contorller/bookController");
const authenticationController = require("../contorller/authenticationController");

router.get("/", authenticationController.loggedin, bookController.allBooks);

router.get(
  "/new",
  authenticationController.loggedin,
  authenticationController.protect,
  bookController.newbook
);

router.post("/", bookController.createBook);

router.get("/:id", bookController.bookshow);

//show the edit page to the user
router.get(
  "/:id/edit",
  authenticationController.loggedin,
  authenticationController.protect,
  bookController.editbook
);

//edit it in the server
router.patch("/:id", bookController.updatebook);

router.delete(
  "/:id",
  authenticationController.protect,
  bookController.deletebook
);

module.exports = router;

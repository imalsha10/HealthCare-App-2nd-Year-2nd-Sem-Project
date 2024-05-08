const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const USER_ROLES = require("../constants/roles");

const router = express.Router();

router.get(
  "/",
  authMiddleware(USER_ROLES.LAB_ASSISTANT),
  userController.getUsers
);

module.exports = router;

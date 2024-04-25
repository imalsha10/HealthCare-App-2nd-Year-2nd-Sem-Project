const express = require("express");
const labServiceController = require("../controllers/labServiceController");
const authMiddleware = require("../middleware/authMiddleware");
const USER_ROLES = require("../constants/roles");

const router = express.Router();

router.post(
  "/",
  authMiddleware([USER_ROLES.LAB_ASSISTANT]),
  labServiceController.createLabService
);
router.get(
  "/",
  authMiddleware([USER_ROLES.LAB_ASSISTANT, USER_ROLES.PATIENT]),
  labServiceController.getLabServices
);
router.get(
  "/count",
  authMiddleware([USER_ROLES.LAB_ASSISTANT]),
  labServiceController.getLabServicesCount
);
router.get(
  "/:id",
  authMiddleware([USER_ROLES.LAB_ASSISTANT, USER_ROLES.PATIENT]),
  labServiceController.getLabServiceById
);
router.patch(
  "/:id",
  authMiddleware([USER_ROLES.LAB_ASSISTANT]),
  labServiceController.updateLabService
);
router.delete(
  "/:id",
  authMiddleware([USER_ROLES.LAB_ASSISTANT]),
  labServiceController.deleteLabService
);

module.exports = router;

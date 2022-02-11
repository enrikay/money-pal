const router = require("express").Router();

//Controller
const {
  verifyEmailController,
} = require("../controllers/authController");

// @desc To activate a user
router.get("/confirm", verifyEmailController);

module.exports = router;

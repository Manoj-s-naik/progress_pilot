const express = require("express");
const { signupHandler, loginHandler, logoutHandler } = require("../controllers/authController");

const router = express.Router();

router.post("/sign", signupHandler);
router.post("/login", loginHandler);
router.post("/logout", logoutHandler);

module.exports = router;

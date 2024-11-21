const express = require("express");
const router = express.Router();
const { createUser, loginUser, userProfile, forgotPassword, resetPassword } = require("../controllers/user.controller");
const  isAuthenticated  = require("../middleware/auth");

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.get("/profile", isAuthenticated, userProfile);
router.post("/reset-password", resetPassword);


module.exports = router;
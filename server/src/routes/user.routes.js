const express = require("express");

const router = express.Router();

const protect = require("../middlewares/auth.middleware");

const { getMyProfile } = require("../controllers/user.controller");

router.get("/profile", protect, getMyProfile);

module.exports = router;
const express = require("express");

const router = express.Router();

const protect = require("../middlewares/auth.middleware");

const {
  getDashboardData,
} = require("../controllers/dashboard.controller");

router.get(
  "/",
  protect,
  getDashboardData
);

module.exports = router;
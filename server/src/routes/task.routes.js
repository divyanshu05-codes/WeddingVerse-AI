const express = require("express");

const router = express.Router();

const protect = require("../middlewares/auth.middleware");

const validate = require("../middlewares/validation.middleware");

const {
  createTaskSchema,
  updateTaskSchema,
} = require("../validators/task.validator");

const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");

router.get(
  "/wedding/:weddingId",
  protect,
  getTasks
);

router.post(
  "/wedding/:weddingId",
  protect,
  createTask
);

router.patch(
  "/wedding/:weddingId/:taskId",
  protect,
  updateTask
);

router.delete(
  "/wedding/:weddingId/:taskId",
  protect,
  deleteTask
);

module.exports = router;
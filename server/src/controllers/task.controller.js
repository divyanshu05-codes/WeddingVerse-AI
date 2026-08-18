const asyncHandler =
  require("../utils/asyncHandler");

const ApiResponse =
  require("../utils/ApiResponse");

const ApiError =
  require("../utils/ApiError");

const taskRepository =
  require("../repositories/task.repository");

const weddingRepository =
  require("../repositories/wedding.repository");


// ======================================================
// GET TASKS
// ======================================================

const getTasks =
  asyncHandler(async (req, res) => {

    const {
      weddingId,
    } = req.params;


    const wedding =
      await weddingRepository
        .findByIdAndOwner(
          weddingId,
          req.user._id
        );


    if (!wedding) {
      throw new ApiError(
        404,
        "Wedding not found."
      );
    }


    const tasks =
      await taskRepository
        .findAllByWedding(
          weddingId
        );


    res.status(200).json(
      new ApiResponse(
        200,
        tasks,
        "Tasks fetched successfully."
      )
    );
  });


// ======================================================
// CREATE TASK
// ======================================================

const createTask =
  asyncHandler(async (req, res) => {

    const {
      weddingId,
    } = req.params;


    const wedding =
      await weddingRepository
        .findByIdAndOwner(
          weddingId,
          req.user._id
        );


    if (!wedding) {
      throw new ApiError(
        404,
        "Wedding not found."
      );
    }


    const task =
      await taskRepository.create({
        ...req.body,
        wedding: weddingId,
      });


    res.status(201).json(
      new ApiResponse(
        201,
        task,
        "Task created successfully."
      )
    );
  });


// ======================================================
// UPDATE TASK
// ======================================================

const updateTask =
  asyncHandler(async (req, res) => {

    const {
      weddingId,
      taskId,
    } = req.params;


    const wedding =
      await weddingRepository
        .findByIdAndOwner(
          weddingId,
          req.user._id
        );


    if (!wedding) {
      throw new ApiError(
        404,
        "Wedding not found."
      );
    }


    const existingTask =
      await taskRepository
        .findByIdAndWedding(
          taskId,
          weddingId
        );


    if (!existingTask) {
      throw new ApiError(
        404,
        "Task not found."
      );
    }


    // Prevent moving the task
    // to another wedding.

    if (
      req.body.wedding &&
      req.body.wedding.toString() !==
        weddingId.toString()
    ) {
      throw new ApiError(
        403,
        "Task cannot be moved to another wedding."
      );
    }


    const task =
      await taskRepository
        .updateByIdAndWedding(
          taskId,
          weddingId,
          req.body
        );


    if (!task) {
      throw new ApiError(
        404,
        "Task not found."
      );
    }


    res.status(200).json(
      new ApiResponse(
        200,
        task,
        "Task updated successfully."
      )
    );
  });


// ======================================================
// DELETE TASK
// ======================================================

const deleteTask =
  asyncHandler(async (req, res) => {

    const {
      weddingId,
      taskId,
    } = req.params;


    const wedding =
      await weddingRepository
        .findByIdAndOwner(
          weddingId,
          req.user._id
        );


    if (!wedding) {
      throw new ApiError(
        404,
        "Wedding not found."
      );
    }


    const existingTask =
      await taskRepository
        .findByIdAndWedding(
          taskId,
          weddingId
        );


    if (!existingTask) {
      throw new ApiError(
        404,
        "Task not found."
      );
    }


    await taskRepository
      .deleteByIdAndWedding(
        taskId,
        weddingId
      );


    res.status(200).json(
      new ApiResponse(
        200,
        null,
        "Task deleted successfully."
      )
    );
  });


module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
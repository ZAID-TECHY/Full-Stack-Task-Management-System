const express = require("express");

const {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
} = require("../controllers/taskController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();


// Create task (Admin only)
router.post(
    "/",
    authMiddleware,
    roleMiddleware("admin"),
    createTask
);


// Get all tasks
router.get(
    "/",
    authMiddleware,
    getTasks
);


// Get single task
router.get(
    "/:id",
    authMiddleware,
    getTaskById
);


// Update task
router.put(
    "/:id",
    authMiddleware,
    updateTask
);


// Delete task (Admin only)
router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("admin"),
    deleteTask
);

module.exports = router;
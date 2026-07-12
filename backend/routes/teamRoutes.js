const express = require("express");

const {
    getUsers,
    searchUsers,
    getDashboardStats
} = require("../controllers/teamController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();


// Get all users (Admin only)
router.get(
    "/users",
    authMiddleware,
    getUsers
);


// Search users
router.get(
    "/search",
    authMiddleware,
    searchUsers
);


// Dashboard statistics
router.get(
    "/stats",
    authMiddleware,
    getDashboardStats
);

module.exports = router;
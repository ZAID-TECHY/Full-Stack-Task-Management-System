const User = require("../models/User.js");
const Task = require("../models/Task.js");


// Get all users
const getUsers = async (req, res) => {

    try {

        const users = await User.find()
            .select("-password");

        res.status(200).json({
            success: true,
            count: users.length,
            users
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// Search users
const searchUsers = async (req, res) => {

    try {

        const keyword = req.query.keyword || "";

        const users = await User.find({
            name: {
                $regex: keyword,
                $options: "i"
            }
        }).select("-password");

        res.status(200).json({
            success: true,
            users
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// Dashboard statistics
const getDashboardStats = async (req, res) => {

    try {

        const totalTasks = await Task.countDocuments();

        const pendingTasks = await Task.countDocuments({
            status: "Pending"
        });

        const inProgressTasks = await Task.countDocuments({
            status: "In Progress"
        });

        const completedTasks = await Task.countDocuments({
            status: "Completed"
        });

        const totalUsers = await User.countDocuments();

        res.status(200).json({
            success: true,
            stats: {
                totalTasks,
                pendingTasks,
                inProgressTasks,
                completedTasks,
                totalUsers
            }
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


module.exports = {
    getUsers,
    searchUsers,
    getDashboardStats
};
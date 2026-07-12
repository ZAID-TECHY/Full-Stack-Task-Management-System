const Task = require("../models/Task");


// Create Task
const createTask = async (req, res) => {

    try {

        const {
            title,
            description,
            status,
            priority,
            assignedTo,
            dueDate
        } = req.body;

        const task = await Task.create({
            title,
            description,
            status,
            priority,
            assignedTo,
            dueDate,
            createdBy: req.user.id
        });

        res.status(201).json({
            success: true,
            task
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};



// Get All Tasks
const getTasks = async (req, res) => {

    try {

        let tasks;

        // Admin can see all tasks
        if (req.user.role === "admin") {

            tasks = await Task.find()
                .populate("assignedTo", "name email role")
                .populate("createdBy", "name email");

        }

        // Member can only see assigned tasks
        else {

            tasks = await Task.find({
                assignedTo: req.user.id
            })
                .populate("assignedTo", "name email role")
                .populate("createdBy", "name email");

        }

        res.status(200).json({
            success: true,
            count: tasks.length,
            tasks
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// Get Single Task
const getTaskById = async (req, res) => {

    try {

        const task = await Task.findById(req.params.id)
            .populate("assignedTo", "name email role")
            .populate("createdBy", "name email");

        if (!task) {

            return res.status(404).json({
                success: false,
                message: "Task not found"
            });

        }

        res.status(200).json({
            success: true,
            task
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};



// Update Task
// Update Task
const updateTask = async (req, res) => {

    try {

        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        // Admin can update any task
        if (req.user.role === "admin") {

            const updatedTask = await Task.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );

            return res.status(200).json({
                success: true,
                task: updatedTask
            });
        }

        // Member can only update tasks assigned to them
        if (
            task.assignedTo &&
            task.assignedTo.toString() === req.user.id
        ) {

            const updatedTask = await Task.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );

            return res.status(200).json({
                success: true,
                task: updatedTask
            });
        }

        // Unauthorized
        return res.status(403).json({
            success: false,
            message: "You are not authorized to update this task"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};



// Delete Task
const deleteTask = async (req, res) => {

    try {

        const task = await Task.findById(req.params.id);

        if (!task) {

            return res.status(404).json({
                success: false,
                message: "Task not found"
            });

        }

        await task.deleteOne();

        res.status(200).json({
            success: true,
            message: "Task deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
};
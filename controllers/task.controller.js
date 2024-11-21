const UserModel = require("../models/user.mode");
const TaskModel = require("../models/task.model");

const createTask = async (req, res) => {
    try {
        const userId =  req.user.id;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const {priority,startDate, dueDate, title, description } = req.body;

        if (!(title && description && priority && startDate && dueDate)) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const taskExist = await TaskModel.findOne({ title });
        if (taskExist) {
            return res.status(400).json({ message: "Task already exists" });
        }

        const newTask = new TaskModel({
            title,
            description,
            priority,
            startDate,
            dueDate,
            owner: userId

        });

        await newTask.save();
        return res.status(201).json({ message: "Task created successfully" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getTasks = async (req, res) => {
    try {
        const { status } = req.query;
        const userId =  req.user.id;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

       if (status) {
            const tasks = await TaskModel.find({ owner: userId, status });
            return res.status(200).json({ tasks });
        }
        const tasks = await TaskModel.find({ owner: userId });
        return res.status(200).json({ tasks, count: tasks.length });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getTask = async (req, res) => {
    try {
        const userId =  req.user.id;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const taskId = req.params.id;
        const task = await TaskModel.findOne({ _id: taskId, owner: userId });
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        return res.status(200).json({ task });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const updateTask = async (req, res) => {
    try {
        const userId =  req.user.id;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const taskId = req.params.id;
        const task = await TaskModel.findOne({ _id: taskId, owner: userId });
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        const { title, description, priority, startDate, dueDate } = req.body;

        await TaskModel.updateOne({ _id: taskId }, {
            title,
            description,
            priority,
            startDate,
            dueDate
        });

        return res.status(200).json({ message: "Task updated successfully" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const deleteTask = async (req, res) => {
    try {
        const userId =  req.user.id;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const taskId = req.params.id;
        const task = await TaskModel.findOne({ _id: taskId, owner: userId });
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        await TaskModel.deleteOne({ _id: taskId });
        return res.status(200).json({ message: "Task deleted successfully" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask
};
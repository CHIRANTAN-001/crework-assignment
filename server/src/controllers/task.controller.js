import { Task } from "../models/task.model.js"

export const createTask = async (req, res) => {
    try {
        const { title, description, status, priority, deadline } = req.body

        if (!title || !status) {
            return res.status(400).json({
                message: "Please enter title and status"
            })
        }

        const task = new Task({
            title,
            description,
            status,
            priority,
            deadline,
            user: req.user?._id
        })

        const createdTask = await task.save()

        res.status(201).json({
            data: createdTask,
            message: "Task created successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        })
    }
}

export const getTasks = async (req, res) => { 
    try {
        const tasks = await Task.find({ user: req.user?._id })

        res.status(200).json({
            data: tasks
        })
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        })
    }
}

export const getTaskById = async (req, res) => { 
    try {
        const { taskId } = req.params

        const task = await Task.findById(taskId)
        
        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            })
        }

        res.status(200).json({
            data: task
        })
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        })
    }
}

export const updateTask = async (req, res) => { 
    try {
        const { taskId } = req.params
        const { title, description, status, priority, deadline } = req.body;

        if (!title || !status) {
            return res.status(400).json({
                message: "Title and status are required"
            })
        }

        const task = await Task.findById(taskId)

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            })
        }

        const updateTask = await Task.findByIdAndUpdate(
            taskId,
            {
                $set: {
                    title: title || task.title,
                    description: description || task.description,
                    status: status || task.status,
                    priority: priority || task.priority,
                    deadline: deadline || task.deadline,
                }
            },
            {
                new: true,
            }
        );

        res.status(200).json({
            data: updateTask,
            message: "Task updated successfully"
        })
    } catch (error) {   
        res.status(500).json({
            message: "Server error"
        })
    }
}

export const deleteTask = async (req, res) => { 
    try {
        const { taskId } = req.params

        const task = await Task.findById(taskId)

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            })
        }

        const deletedTask = await Task.findByIdAndDelete(taskId)

        if (!deletedTask) {
            return res.status(500).json({
                message: "Error deleting task"
            })
        }

        res.status(200).json({
            message: "Task deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        })
    }
}
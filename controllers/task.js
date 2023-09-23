import ErrorHandler from "../middlewares/errorMiddleware.js";
import { task } from "../models/task.js";

export const createNewTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    const createdTask = await task.create({
      title,
      description,
      user: req.user,
    });
    return res.status(200).json({
      success: true,
      message: "Task Added.",
    });
  } catch (error) {
    next(error);
  }
};

export const getMyTask = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const tasks = await task.find({ user: userId });
    console.log(req.user);

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const taskForUpdation = await task.findById(id);
    
    if(!taskForUpdation) return next(new ErrorHandler('Task not found', 404))

    taskForUpdation.isCompleted = !taskForUpdation.isCompleted;

    await taskForUpdation.save();
    res.status(200).json({ success: true, message: "Task updated." });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const delTask = await task.findById(id);


    if(!delTask) return next(new ErrorHandler('Task not found', 404 ))
     
    await delTask.deleteOne();

    res
      .status(200)
      .json({ success: true, message: "Task deleted successfully." });
  } catch (error) {
    next(error);
  }
};

import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { createNewTask, deleteTask, getMyTask, updateTask } from "../controllers/task.js";

const router = express.Router();

router.post("/newTask", isAuthenticated, createNewTask);
router.get("/my", isAuthenticated, getMyTask);

router.route("/:id").put(isAuthenticated, updateTask).delete(isAuthenticated, deleteTask)

export default router
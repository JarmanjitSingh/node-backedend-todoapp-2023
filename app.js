import "dotenv/config";
import express from "express";
import userRouter from "./routes/user.js";
import cookieParser from "cookie-parser";
import taskRouter from "./routes/task.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import cors from 'cors';

export const app = express();


//using middlewares
app.use(express.json()); //for accessing req.body via postman and always use first before use routes
app.use(cookieParser())

//using routes
app.use("/api/v1/users", userRouter); // using the user router because with user router we will able to add prifix of url
app.use("/api/v1/task", taskRouter)
app.use(cors({
  origin: [process.env.FRONTEND_URL],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true //with true you can send headers or cookies to frontend otherwise api will work but you dont able to set cookie and headers to the frontend. and withCredentials frontend te true krna.
}))



app.get("/", (req, res) => {
  res.send("welcome to todo backend");
});


//using error middleware
app.use(errorMiddleware)


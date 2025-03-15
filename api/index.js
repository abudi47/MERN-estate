import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js"
import cookieParser from "cookie-parser";


mongoose.connect(
    process.env.MONGO
).then(() => {
    console.log("connected to MongoDB")
}).catch ((err) => {
    console.log(err)
})

const app = express();

app.use(express.json()); // allow the server to recieve json file
app.use(cookieParser());
app.listen(3000, () => {
  console.log("Server is running on port 3000.!.");
});

// app.get("/test", (req,res) => {
//     res.json({
//         msg: "elloa..."})
// } )

app.use("/api/user" , userRouter)
app.use("/api/auth" , authRouter)

app.use((err, req , res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "internal server error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})
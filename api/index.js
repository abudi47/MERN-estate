import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();
import userRouter from "./routes/user.route.js";


mongoose.connect(
    process.env.MONGO
).then(() => {
    console.log("connected to MongoDB")
}).catch ((err) => {
    console.log(err)
})

const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000.!.");
});

// app.get("/test", (req,res) => {
//     res.json({
//         msg: "elloa..."})
// } )

app.use("/api/user" , userRouter)
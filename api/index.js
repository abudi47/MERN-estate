import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.router.js";
import cookieParser from "cookie-parser";
import path from "path";
// import { seedAdmin } from "./controllers/seedAdmin.js";

mongoose
  .connect(process.env.MONGO)
  .then(async () => {
    console.log("connected to MongoDB");
    // await seedAdmin(); // Seed the admin account
  })
  .catch((err) => {
    console.log(err);
  });
// create a dynamic path for the server
const __dirname = path.resolve();

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

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);
// app.use("/api/listing", listingRouter);
app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

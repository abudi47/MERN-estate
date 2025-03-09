import express from "express";
import { test } from "../controllers/userController.js";


const router = express.Router();

router.get("/tst", test  );

export default router;
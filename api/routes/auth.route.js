import express from "express"
import { signin, signup, google, signOut, admin } from "../controllers/authController.js";
import { isAdmin } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/signup" , signup);
router.post("/signin" , signin);
router.post("/google" , google);
router.get("/signout", signOut);
router.get("/admin" , isAdmin , admin);



export default router;
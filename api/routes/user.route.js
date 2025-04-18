import express from "express";
import {
  deleteUser,
  test,
  updateUser,
  getUserListing,
  getUser,
} from "../controllers/userController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/tst", test);
router.post("/update/:id", verifyToken, updateUser);
// router.post("/delete/:id", verifyToken ,deleteUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/listings/:id", verifyToken, getUserListing);
router.get("/:id" , verifyToken , getUser);

export default router;

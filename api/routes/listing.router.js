import express from "express";
import {
  createListing,
  deleteListing,
  updateListing,
  getListing,
  getListings,
  updateStatus,
} from "../controllers/listingController.js";
import { verifyToken, isAdmin } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", createListing);
router.delete("/delete/:id", verifyToken, deleteListing);
router.post("/update/:id", verifyToken, updateListing);
router.get("/get/:id", getListing);
router.get("/get", getListings);
router.post("/updateStatus/:id", verifyToken, isAdmin, updateStatus); // Assuming you want to allow admin to update status

export default router;

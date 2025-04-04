import express from "express"
import { createListing, deleteListing, updateListing } from "../controllers/listingController.js";
import { verifyToken } from "../utils/verifyUser.js";


const router = express.Router();

router.post("/create", createListing);
router.delete("/delete/:id", verifyToken, deleteListing);
router.post("/update/:id", verifyToken, updateListing);



export default router;
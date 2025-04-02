import express from "express"
import { createListing, deleteListing } from "../controllers/listingController.js";
import { verifyToken } from "../utils/verifyUser.js";


const router = express.Router();

router.post("/create", createListing);
router.delete("/delete/:id", verifyToken, deleteListing);



export default router;
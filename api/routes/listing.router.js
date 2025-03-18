import express from "express"
import { createListing } from "../controllers/listingController.js";
// import verifyToken from "../utils/verifyUser";


const router = express.Router();

router.post("/create", createListing);

export default router;
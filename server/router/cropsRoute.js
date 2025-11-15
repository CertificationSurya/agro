// package
import { Router } from "express";
const router = Router();
// items
import fetchuser from "../middleware/fetchuser.js";
import cropsController from "../controllers/cropsController.js";

// routes
// router.get("/", cropsController.get);

export default router
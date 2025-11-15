// package
import { Router } from "express";
const router = Router();
// items
import fetchuser from "../middleware/fetchuser.js";
import blogsController from "../controllers/blogsController.js";

// routes
router.get("/", blogsController.get);
router.get("/user", fetchuser, blogsController.getUserPosts);
router.get("/user-related/:userId", fetchuser, blogsController.getUserRelatedPosts);
router.get("/user/:id", fetchuser, blogsController.getSingleUserPost);
router.post("/", fetchuser, blogsController.createPost);
router.get("/:id", blogsController.getSinglePost);
router.patch("/:id",fetchuser, blogsController.updatePost);  
router.delete("/:id", fetchuser, blogsController.deletePost);  


export default router
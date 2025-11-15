// package
import {Router} from "express";
import userController from "../controllers/userController.js";

import fetchUser from "../middleware/fetchuser.js"
import fileUpload from "../middleware/fileUpload.js";
import fileDownload from "../middleware/fileDownload.js";

const router = Router();

// routes
router.get("/conversation/:userId", fetchUser, userController.getConversation);
router.get("/:userId", userController.getUserInfo);
router.get("/img/:photoId", fileDownload);
router.patch("/img", fetchUser, fileUpload.single('profilePic'), userController.updateUserDetails);
export default router;

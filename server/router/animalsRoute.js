// package
import {Router} from 'express'
const router = Router()

// items
import fetchuser from '../middleware/fetchuser.js';
import animalsController from '../controllers/animalsController.js';


// routes
// router.get("/", animalsController.get);
export default router
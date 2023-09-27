import { Router } from "express";

const router = Router()

import * as userController from '../controllers/user.js'
import verifyAuth from "../middlewares/verifyAuth.js";


//verifyAuth add to protected routes

router.get('/:id', verifyAuth, userController.getProfile)

router.delete('/:id', verifyAuth, userController.deleteUser)


export default router;

import { Router } from "express";

const router = Router()

import * as userController from '../controllers/user.js'

router.get('/:id', userController.getProfile)


export default router;

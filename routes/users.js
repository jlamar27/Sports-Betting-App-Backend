import { Router } from "express";

const router = Router()

router.get('/:handle', userController.getProfile)


export default router;

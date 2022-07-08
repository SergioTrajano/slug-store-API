import { Router } from "express";

import validatePost from "../middlewares/validatePostAuthMiddleware.js";
import validateGet from "../middlewares/validateGetAuthMiddleware.js";
import { signIn, signUp } from "../controllers/AuthController.js";

const router = Router();

router.get('/auth', validateGet, signIn);
router.post('/auth', validatePost, signUp);
//router.put('/auth', );

export default router;
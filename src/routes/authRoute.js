import { Router } from "express";

import validatePostAuthMiddleware from "../middlewares/validatePostAuthMiddleware.js";
import { signUp } from "../controllers/postAuthController.js";

const router = Router();

//router.get('/auth', );
router.post('/auth', validatePostAuthMiddleware, signUp);
//router.put('/auth', );

export default router;
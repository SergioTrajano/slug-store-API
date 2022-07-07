import dotenv from "dotenv";

import postAuthSchema from "../schemas/postAuthorizationSchema.js";
import db from "../db-strategy/mongo.js";

dotenv.config();

async function validatePostAuthMiddleware(req, res, next) {
    const dadosUsuario = req.body;

    const { error } = postAuthSchema.validate(dadosUsuario);

    if (error) {
        res.sendStatus(422);
        return;
    }

    const verifyEmail = await db.collection(process.env.MONGO_CADASTRADOS).findOne({ email: dadosUsuario.email });

    if (verifyEmail) {
        res.sendStatus(409);
        return;
    }

    next();
}

export default validatePostAuthMiddleware;
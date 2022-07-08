import dotenv from "dotenv";
import { compareSync } from "bcrypt";

import getAuthSchema from "../schemas/getAuthorizationSchema.js";
import db from "../db-strategy/mongo.js";

dotenv.config();

async function validateGetAuth(req, res, next) {
    const dadosUsuario = {
        email: req.headers.email,
        senha: req.headers.senha
    };

    const { error } = getAuthSchema.validate(dadosUsuario);

    if (error) {
        res.sendStatus(422);
        return;
    }

    const usuarioNoBanco = await db.collection(process.env.MONGO_CADASTRADOS).findOne({ email: dadosUsuario.email});

    if (!usuarioNoBanco) {
        res.sendStatus(404);
        return;
    }
    if (!compareSync(dadosUsuario.senha, usuarioNoBanco.senha)) {
        res.sendStatus(403);
        return;
    }

    res.locals.usuario = usuarioNoBanco;

    next();
}

export default validateGetAuth;
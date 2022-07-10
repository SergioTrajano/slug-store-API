import db from "../db-strategy/mongo.js";
import dotenv from "dotenv";

dotenv.config();

export default async function (req, res, next) {
    const usuario = res.locals.usuario;

    const carrinho = await db.collection(process.env.MONGO_CARRINHOS).findOne({ carrinhoId: usuario.sessionId});

    if (!carrinho) {
        res.sendStatus(404);
        return;
    }

    res.locals.carrinho = carrinho;

    next();
}
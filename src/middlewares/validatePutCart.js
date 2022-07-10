import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";


import db from "../db-strategy/mongo.js";

export default async function validatePutCart(req, res, next) {
    const token = req.headers.authorization;
    const chaveSecreta = process.env.JWT_SECRET;

    try {
        const usuario = jwt.verify(token.replace("Bearer ", ""), chaveSecreta);
        const carrinho = await db.collection(process.env.MONGO_CARRINHOS).findOne({carrinhoId: new ObjectId(usuario.sessionId)});

        if (!carrinho) {
            res.sendStatus(404);
            return;
        }

        res.locals.carrinho = carrinho;

        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
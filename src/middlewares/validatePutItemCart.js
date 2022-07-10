import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ObjectId } from "mongodb";

import db from "../db-strategy/mongo.js";


dotenv.config();

export default function validateDeleteCCartItem(req, res, next) {
    const item = req.params.item;
    const token = req.headers.authorization;
    const chaveSecreta = process.env.JWT_SECRET;

    try {
        const usuario = jwt.verify(token, chaveSecreta);
        const carrinho = await db.collection(process.env.MONGO_CARRINHOS).findOne({ carrinhoId: new ObjectId(usuario.sessionId)});

        if (!carrinho) {
            res.sendStatus(404);
            return;
        }
        const novoCarrinho = carrinho.filter( i => i !== item);

        res.locals.carrinho = novoCarrinho;

        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
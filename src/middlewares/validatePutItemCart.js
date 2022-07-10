import dotenv from "dotenv";
import { ObjectId } from "mongodb";

import db from "../db-strategy/mongo.js";

dotenv.config();

export default async function validateDeleteCCartItem(req, res, next) {
    const usuario = res.locals.usuario;
    const itemString = req.params.item;
    const item = JSON.parse(itemString);


    try {
        const carrinho = await db.collection(process.env.MONGO_CARRINHOS).findOne({ carrinhoId: new ObjectId(usuario.sessionId)});

        if (!carrinho) {
            res.sendStatus(404);
            return;
        }
        const novoCarrinho = carrinho.filter( i => i !== item);

        res.locals.novoCarrinho = novoCarrinho;

        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
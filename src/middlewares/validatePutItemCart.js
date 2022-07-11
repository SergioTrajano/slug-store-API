import dotenv from "dotenv";
import { ObjectId } from "mongodb";

import db from "../db-strategy/mongo.js";

dotenv.config();

function filter(carrinho, item) {
    const carrinhoNovo = [];
    for(let i = 0; i < carrinho.length; i++) {
        if (i !== item) {
            carrinhoNovo = [...carrinhoNovo, carrinho[i]];
        }
    }
    return carrinhoNovo;
}

export default async function validateDeleteCCartItem(req, res, next) {
    const usuario = res.locals.usuario;
    const item = req.params.item;
    console.log(item)


    try {
        const carrinho = await db.collection(process.env.MONGO_CARRINHOS).findOne({ carrinhoId: ObjectId(usuario.sessionId)});

        if (!carrinho) {
            res.sendStatus(404);
            return;
        }
        const novoCarrinho = filter(carrinho, item);

        res.locals.novoCarrinho = novoCarrinho;

        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
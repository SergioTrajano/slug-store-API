import dotenv from "dotenv";

import db from "../db-strategy/mongo.js";

dotenv.config();

export async function deletarItem(req, res) {
    const novoCarrinho = res.locals.novoCarrinho;

    try {
        await db.collection(process.env.MONGO_CARRINHOS).updateOne(
            { carrinhoId: user.sessionId }, 
            { 
                $set: {
                    itens: novoCarrinho,
                } 
            });
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function esvaziarCarrinho(req, res) {
    const carrinho = res.locals.carrinho;

    try {
        await db.collection(MONGO_CARRINHOS).updateOne(
            {
               carrinhoId: new Object(carrinho.carrinhoId) 
            },
            {
                $set: {
                    itens: [],
                }
            }
        );

        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
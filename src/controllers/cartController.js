import dotenv from "dotenv";
import { ObjectId } from "mongodb";

import db from "../db-strategy/mongo.js";

dotenv.config();

export async function adicionarItem(req, res) {
    const carrinho = res.locals.carrinho;
    const usuario = res.locals.usuario;
    const novoProduto = req.body;

    try {
        await db.collection(process.env.MONGO_CARRINHOS).updateOne(
            { carrinhoId: ObjectId(usuario.sessionId) }, 
            { 
                $push: {
                    itens: novoProduto,
                } 
            });
        const carrinhoAtualizado = await db.collection(process.env.MONGO_CARRINHOS).findOne({carrinhoId: ObjectId(usuario.sessionId)});
        res.status(200).send(carrinhoAtualizado.itens);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}


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
        res.status(200).send(novoCarrinho);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function esvaziarCarrinho(req, res) {
    const usuario = res.locals.usuario;


    try {
        await db.collection(process.env.MONGO_CARRINHOS).updateOne(
            {
               carrinhoId: ObjectId(usuario.sessionId) 
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

export async function atualizarCarrinho(req, res) {
    const carrinho = req.body;
    const usuario = res.locals.usuario;

    try {
        for(let i = 0; i < carrinho.length; i++) {
            await db.collection(process.env.MONGO_CARRINHOS).updateOne(
                { carrinhoId: ObjectId(usuario.sessionId)},
                {
                    $push: {
                        itens: carrinho[i],
                    }
                }
            );
        }
        const carrinhoAtualizado = await db.collection(process.env.MONGO_CARRINHOS).findOne({carrinhoId: ObjectId(usuario.sessionId)});

        res.status(200).send(carrinhoAtualizado.itens);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
import dotenv from "dotenv";
import { ObjectId } from "mongodb";

import db from "../db-strategy/mongo.js";

dotenv.config();

function filter(carrinho, item) {
    const carrinhoNovo = [];
    let k = 0;
    console.log(`Item: ${item}`)
    for(let i = 0; i < carrinho.length; i++) {
        if (carrinho[[i]] !== item) {
            console.log("entrei aqui");
            carrinhoNovo[k] = carrinho[i];
            k++;
            console.log(carrinhoNovo);
        }
    }
    return carrinhoNovo;
}

export default async function validateDeleteCCartItem(req, res, next) {
    const usuario = res.locals.usuario;
    const item = req.params.item;


    try {
        const carrinho = await db.collection(process.env.MONGO_CARRINHOS).findOne({ carrinhoId: ObjectId(usuario.sessionId)});
        console.log(`${carrinho.itens} carrinho`)

        if (!carrinho) {
            res.sendStatus(404);
            return;
        }
        const novoCarrinho = filter(carrinho.itens, item);

        res.locals.novoCarrinho = novoCarrinho;

        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
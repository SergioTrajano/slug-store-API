import dotenv from "dotenv";
import db from "../db-strategy/mongo.js";

dotenv.config();

export async function arquivarPedido(req, res) {
    const usuario = res.locals.usuario;
    const pedido = req.body;

    try {
        await db.collection(process.env.MONGO_PEDIDOS).insertOne({...pedido, pedidoId: usuario.sessionId});

        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
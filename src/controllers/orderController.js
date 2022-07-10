import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import db from "../db-strategy/mongo";

dotenv.config();

export async function arquivarPedido(req, res) {
    const pedido = req.body;
    const token = req.headers.authorization;
    const chaveSecreta = process.env.JWT_SECRET;

    try {
        const usuario = jwt.verify(token.replace("Bearer ", ""), chaveSecreta);
        await db.collection(process.env.MONGO_PEDIDOS).insertOne({...pedido, pedidoId: usuario.sessionId});

        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
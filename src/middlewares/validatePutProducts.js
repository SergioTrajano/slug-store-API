import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";


import db from "../db-strategy/mongo.js";

export default async function validatePutCart(req, res, next) {
    const token = req.headers.authorization;
    const chaveSecreta = process.env.JWT_SECRET;

    try {
        const usuario = jwt.verify(token.replace("Bearer ", ""), chaveSecreta);
        const pedido = await db.collection(process.env.MONGO_PEDIDOS).findOne({pedidoId: new ObjectId(usuario.sessionId)});

        if (!pedido) {
            res.sendStatus(404);
            return;
        }

        res.locals.pedido = pedido;

        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";


import db from "../db-strategy/mongo.js";

export default async function validatePutProducts(req, res, next) {
    const token = req.headers.authorization;
    const chaveSecreta = process.env.JWT_SECRET;

    try {
        const usuario = jwt.verify(token.replace("Bearer ", ""), chaveSecreta);
        const pedidosArray = await db.collection(process.env.MONGO_PEDIDOS).find({pedidoId: (usuario.sessionId)}).toArray();
        const pedido = pedidosArray[pedidosArray.length -1];


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
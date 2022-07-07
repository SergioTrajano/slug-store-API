import dotenv from "dotenv";

import db from "../db-strategy/mongo.js";

dotenv.config();

export async function signUp(req, res) {
    const dadosUsuarios = req.body;

    try {
        await db.collection(process.env.MONGO_CADASTRADOS).insertOne(dadosUsuarios);

        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
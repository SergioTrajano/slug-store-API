import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { hashSync } from "bcrypt";

import db from "../db-strategy/mongo.js";

dotenv.config();

export async function signUp(req, res) {
    const dadosUsuarios = req.body;
    const senhaHashada = hashSync(dadosUsuarios.password, 13);

    try {
        await db.collection(process.env.MONGO_CADASTRADOS).insertOne({...dadosUsuarios, password: senhaHashada});

        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function signIn(req, res) {
    const usuario = res.locals.usuario;
    const dadosSessao = {
        email: usuario.email,
        sessionId: usuario._id,
    }
    
    try {
        await db.collection(process.env.MONGO_SESSIONS).insertOne(dadosSessao);
        
        const chaveSecreta = process.env.JWT_SECRET;
        const token = jwt.sign(dadosSessao, chaveSecreta);
        
        const dadosParaEnviar = {
            name: usuario.name,
            token,
        }

        res.status(200).send(dadosParaEnviar);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
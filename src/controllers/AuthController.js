import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { hashSync } from "bcrypt";

import db from "../db-strategy/mongo.js";

dotenv.config();

export async function signUp(req, res) {
    const dadosUsuarios = req.body;
    const senhaHashada = hashSync(dadosUsuarios.senha, 13);

    try {
        await db.collection(process.env.MONGO_CADASTRADOS).insertOne({ ...dadosUsuarios, senha: senhaHashada });
        const usuario = await db.collection(process.env.MONGO_CADASTRADOS).findOne({ email: dadosUsuarios.email });

        await db.collection(process.env.MONGO_CARRINHOS).insertOne({
            carrinhoId: usuario._id,
            itens: [],
        });

        res.sendStatus(201);
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
    };

    try {
        await db.collection(process.env.MONGO_SESSIONS).insertOne(dadosSessao);

        const chaveSecreta = process.env.JWT_SECRET;
        const token = jwt.sign(dadosSessao, chaveSecreta);

        const dadosParaEnviar = {
            nome: usuario.nome,
            token,
        };

        res.status(200).send(dadosParaEnviar);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

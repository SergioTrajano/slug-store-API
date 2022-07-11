import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import headerSchema from "../schemas/putCartSchema.js";

dotenv.config();

export default async function validateHeaders(req, res, next) {
    const header = {
        Authorization: req.headers.authorization,
    };

    const { error } = headerSchema.validate(header);

    if (error) {
        res.sendStatus(422);
        return;
    }

    const chaveSecreta = process.env.JWT_SECRET;
    const token = header.Authorization.replace("Bearer ", "");

    try {
        const usuario = jwt.verify(token, chaveSecreta);

        res.locals.usuario = usuario;
        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
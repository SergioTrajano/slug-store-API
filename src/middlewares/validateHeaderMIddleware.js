import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import headerSchema from "../schemas/headerSchema.js";

dotenv.config();

async function validateHeader(req, res, next) {
    const header = { Authorization: req.headers.authorization};

    const { error } = headerSchema.validate(header);

    if (error) {
        res.sendStatus(422);
        return;
    }

    const token = header.Authorization;
    const chaveSecreta = process.env.JWT_SECRET;
    const usuario = jwt.verify(token.replace("Bearer ", ""), chaveSecreta);

    res.locals.usuario = usuario;

    next();
}

export default validateHeader;
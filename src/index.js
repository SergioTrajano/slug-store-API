import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRouter from "./routes/authRoute.js";

dotenv.config();

const server = express();

server.use(cors());
server.use(express.json());

server.use(authRouter);


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
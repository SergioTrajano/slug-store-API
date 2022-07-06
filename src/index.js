import express from 'express';
import dotenv from 'dotenv';

dotenv.config();


const server = express();

server.use(cors());
server.use(express.json());


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
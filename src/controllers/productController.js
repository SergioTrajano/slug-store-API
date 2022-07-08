import dotenv from "dotenv";
import dayjs from 'dayjs';
import db from "../db-strategy/mongo.js";

dotenv.config();

export async function cadastrarProduto (req, res) {
  
    const dadosProduto = req.body;
  
        try {
            await db
            .collection(process.env.MONGO_PRODUTOS)
            .insertOne({
              product: dadosProduto.product,
              type: dadosProduto.type,
              image: dadosProduto.image,
              price: dadosProduto.price,
              description: dadosProduto.description,
              quantity: dadosProduto.quantity,
              createdAt: dayjs().format('DD/MM/YYYY')
            });
          res.sendStatus(201);
        } catch (error) {
          console.error('Problemas para cadastrar produto!');
          res.sendStatus(500);
        }
       
};

export async function retornarProdutos (req, res) {
    const type = req.params.type; // como importar o parametro que está em routes?

  try {
    const produtosDisplay = await db
      .collection(process.env.MONGO_PRODUTOS)
      .find({ type: type })
      .toArray();

    res.status(200).send(produtosDisplay);
  } catch (error) {
    console.error('Não foi possível carregar os produtos');
  }
}

export async function retornarProdutoSelecionado (req, res) {
    const {
        type,
        id
      } = req.params // como importar o parametro que está em routes?

  try {
    const produtoSelecionado = await db
      .collection(process.env.MONGO_PRODUTOS)
      .findOne({ type: type, _id: id });

    res.status(200).send(produtoSelecionado);
  } catch (error) {
    console.error('Não foi possível carregar o produto selecionado');
  }
}
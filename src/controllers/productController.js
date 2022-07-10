import dotenv from "dotenv";
import dayjs from 'dayjs';
import db from "../db-strategy/mongo.js";
import { ObjectId } from "mongodb";

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
    const { type } = req.headers; // PEGA OS DADOS DO HEADERS PARA INDICAR A COLECAO DO BANCO! 

  try {
    const produtosDisplay = await db
      .collection(process.env.MONGO_PRODUTOS)
      .find({ type: type })
      .toArray();

    res.status(200).send(produtosDisplay);
  } catch (error) {
    console.error('Não foi possível carregar os produtos');
  }
};

export async function retornarProdutoSelecionado (req, res) {
  const { id } = req.headers;

  try {
    const produtoSelecionado = await db
      .collection(process.env.MONGO_PRODUTOS)
      .findOne({ _id: ObjectId(id) });

    res.status(200).send(produtoSelecionado);
  } catch (error) {
    console.error('Não foi possível carregar o produto selecionado');
  }
};

export async function atualizarProdutos (req, res) {
  const pedido = res.locals.pedido;

  try {
      const carrinhodoUsuario = pedido.itens.cart; // seria o array de objetos = produtos
      carrinhodoUsuario.map(produto => 
        await db.collection(process.env.MONGO_PRODUTOS).updateOne(
          { produtoId: produto._id }, //me perdi com os nomes! Compara o id do produto do pedido com o id do produto da colecao produtos
          { 
              $set: {
                  quantity: (produto.quantity -1),
              } 
          }));
     
      res.sendStatus(200);
  } catch (error) {
      console.log(error);
      res.sendStatus(500);
  }
}
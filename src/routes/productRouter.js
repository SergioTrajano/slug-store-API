import { cadastrarProduto, retornarProdutos, retornarProdutoSelecionado, atualizarProdutos } from '../controllers/productController.js';
import validatePutProducts from "../middlewares/validatePutProducts.js";
import { Router } from 'express';

const router = Router();

router.post('/products', cadastrarProduto);
router.get('/products', retornarProdutos);
router.get('/products/id', retornarProdutoSelecionado);
router.put('/products', validatePutProducts, atualizarProdutos); // rota put -> alterar quantidade em estoque

export default router;
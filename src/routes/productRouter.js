import { cadastrarProduto, retornarProdutos, retornarProdutoSelecionado } from '../controllers/productController.js';
import { Router } from 'express';

const router = Router();

router.post('/products', cadastrarProduto);
router.get('/products', retornarProdutos);
router.get('/products/id', retornarProdutoSelecionado);
// rota put -> alterar quantidade em estoque
// rota delete -> acabou produto no estoque

export default router;
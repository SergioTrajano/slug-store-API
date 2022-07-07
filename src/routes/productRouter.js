import { cadastrarProduto, retornarProdutos, retornarProdutoSelecionado } from '../controllers/productController.js';
import { Router } from 'express';

const router = Router();

router.post('/product', cadastrarProduto);
router.get('/:type', retornarProdutos);
router.get('/:type/:id', retornarProdutoSelecionado);
// rota put -> alterar quantidade em estoque
// rota delete -> acabou produto no estoque

export default router;
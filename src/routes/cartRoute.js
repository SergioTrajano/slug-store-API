import { Router } from "express";
import { deletarItem, esvaziarCarrinho, adicionarItem } from "../controllers/cartController.js";
import validateDeleteCCartItem from "../middlewares/validatePutItemCart.js";
import validateHeader from "../middlewares/validateHeaderMIddleware.js";
import validateUser from "../middlewares/validateUser.js";
import validateHeaders from "../middlewares/validateHeadersPutCartMiddleware.js";
import { atualizarCarrinho } from "../controllers/cartController.js";

const router = Router();

router.put("/cart", validateHeaders, atualizarCarrinho);
router.put("/cart/add", validateHeader, validateUser, adicionarItem ); // quando adicionar produto so carrinho deveria ser put tbm, nao post
router.delete("/cart/:item", validateHeader, validateDeleteCCartItem, deletarItem);
router.delete("/cart", validateHeader, validateUser, esvaziarCarrinho);

export default router;
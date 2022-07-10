import { Router } from "express";
import { deletarItem, esvaziarCarrinho, adicionarItem } from "../controllers/cartController.js";
import validateDeleteCCartItem from "../middlewares/validatePutItemCart.js";
import validateHeader from "../middlewares/validateHeaderMIddleware.js";
import validateUser from "../middlewares/validateUser.js";

const router = Router();

router.put("/cart/add", validateHeader, validateUser, adicionarItem ) // quando adicionar produto so carrinho deveria ser put tbm, nao post
router.put("/cart/:item", validateHeader, validateDeleteCCartItem, deletarItem);
router.put("/cart", validateHeader, validateUser, esvaziarCarrinho);

export default router;
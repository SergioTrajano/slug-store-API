import { Router } from "express";
import { deletarItem, esvaziarCarrinho } from "../controllers/cartController.js";
import validateDeleteCCartItem from "../middlewares/validatePutItemCart.js";
import validateHeader from "../middlewares/validateHeaderMIddleware.js";

const router = Router();

router.put("/cart/:item", validateHeader, validateDeleteCCartItem, deletarItem);
router.put("/cart", validateHeader, esvaziarCarrinho);

export default router;
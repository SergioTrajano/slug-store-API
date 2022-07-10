import { Router } from "express";
import { deletarItem, esvaziarCarrinho } from "../controllers/cartController.js";
import validateDeleteCCartItem from "../middlewares/validatePutItemCart.js";
import validateHeader from "../middlewares/validateHeaderMIddleware.js";
import validateUser from "../middlewares/validateUser.js";

const router = Router();

router.put("/cart/:item", validateHeader, validateDeleteCCartItem, deletarItem);
router.put("/cart", validateHeader, validateUser, esvaziarCarrinho);

export default router;
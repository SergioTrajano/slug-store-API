import { Router } from "express";
import { arquivarPedido } from "../controllers/orderController.js";
import validateBodyOrder from "../middlewares/validateBodyOrder.js";
import validateHeader from "../middlewares/validateHeaderMIddleware.js";

const router = Router();

router.post("/order", validateBodyOrder, validateHeader, arquivarPedido);

export default router;
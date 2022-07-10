import orderSchema from "../schemas/postOrderSchema";


export default function validateBodyOrder(req, res, next) {
    const pedido = req.body;

    const { error } = orderSchema.validate(pedido);

    if (error) {
        res.sendStatus(422);
        return;
    }

    next();
}
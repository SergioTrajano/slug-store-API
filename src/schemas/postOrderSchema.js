import dayjs from "dayjs";
import joi from "joi";

const orderSchema = joi.object({
    itens: joi.array().required(),
    valor: joi.number().positive().precision(2).required(),
    formaPagamento: joi.string().required().valid("crédito", "débito"),
    paymentData: {
        numero: joi.string().length(16).required(),
        codigo: joi.string().length(3).required(),
        validade: joi.string().required(),
    },
});

export default orderSchema;
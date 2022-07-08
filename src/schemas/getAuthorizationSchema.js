import joi from "joi";

const getAuthSchema = joi.object({
    email: joi.string().email({ tlds: {allow: false}}).required(),
    senha: joi.string().required(),
});

export default getAuthSchema;
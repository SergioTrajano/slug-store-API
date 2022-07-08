import joi from 'joi';

const postAuthSchema = joi.object({
    nome: joi.string().required(),
    email: joi.string().email({tlds: { allow: false}}).required(),
    senha: joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,16}$/), 
});

export default postAuthSchema;
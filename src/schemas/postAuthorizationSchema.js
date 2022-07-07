import joi from 'joi';

const postAuthSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email({tlds: { allow: false}}).required(),
    password: joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,16}$/), 
});

export default postAuthSchema;
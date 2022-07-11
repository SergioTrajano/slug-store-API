import joi from "joi";

const headerSchema = joi.object({
    Authorization: joi.string().required().pattern(/Bearer /),
});

export default headerSchema;
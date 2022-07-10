import headerSchema from "../schemas/headerSchema.js";

function validateHeader(req, res, next) {
    const header = { Authorization: req.headers.authorization};

    const { error } = headerSchema.validate(header);

    if (error) {
        res.sendStatus(422);
        return;
    }

    next();
}

export default validateHeader;
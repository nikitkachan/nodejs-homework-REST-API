const { HttpError } = require("../helpers");
const { isValidObjectId } = require("mongoose");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId)) {
    next(HttpError(404, `${contactId} is not a valid id`));
    return;
  }

  next();
};
module.exports = isValidId;

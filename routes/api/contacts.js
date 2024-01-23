const express = require("express");

const ContactController = require("../../controllers/contacts");

const { validateBody, auth, isValidId } = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();
const jsonParser = express.json();

router.get("/", auth, ContactController.getContacts);

router.get("/:contactId", auth, isValidId, ContactController.getContact);

router.post(
  "/",
  auth,
  jsonParser,
  validateBody(schemas.addSchema),
  ContactController.createContact
);

router.put(
  "/:contactId",
  auth,
  isValidId,
  validateBody(schemas.addSchema),
  jsonParser,
  ContactController.updateContact
);

router.delete("/:contactId", auth, isValidId, ContactController.deleteContact);

router.patch(
  "/:contactId/favorite",
  auth,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  jsonParser,
  ContactController.updateStatusContact
);

module.exports = router;

const express = require("express");

const ContactController = require("../../controllers/contacts");
const isValidId = require("../../validateObjectId");

const router = express.Router();
const jsonParser = express.json();

router.get("/", ContactController.getContacts);

router.get("/:contactId", isValidId, ContactController.getContact);

router.post("/", jsonParser, ContactController.createContact);

router.put(
  "/:contactId",
  isValidId,
  jsonParser,
  ContactController.updateContact
);

router.delete("/:contactId", isValidId, ContactController.deleteContact);

router.patch(
  "/:contactId/favorite",
  isValidId,
  jsonParser,
  ContactController.updateStatusContact
);

module.exports = router;

const express = require("express");

const ContactController = require("../../controllers/contacts");

const router = express.Router();
const jsonParser = express.json();

router.get("/", ContactController.getContacts);

router.get("/:contactId", ContactController.getContact);

router.post("/", jsonParser, ContactController.createContact);

router.put("/:contactId", jsonParser, ContactController.updateContact);

router.delete("/:contactId", ContactController.deleteContact);

router.patch(
  "/:contactId/favorite",
  jsonParser,
  ContactController.updateStatusContact
);

module.exports = router;

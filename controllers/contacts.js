const Contact = require("../models/contact");
const addSchema = require("../schemas/addSchema");
const putSchema = require("../schemas/putSchema");

async function getContacts(req, res, next) {
  try {
    const contacts = await Contact.find();

    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
}

async function getContact(req, res, next) {
  const { contactId } = req.params;
  try {
    const contact = await Contact.findById(contactId);

    if (contact === null) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
}

async function createContact(req, res, next) {
  const response = addSchema.validate(req.body, { abortEarly: false });
  const body = req.body;

  try {
    if (response.error) {
      return res
        .status(400)
        .send(response.error.details.map((err) => err.message).join(", "));
    } else {
      const newContact = await Contact.create(body);
      res.status(201).json(newContact);
    }
  } catch (error) {
    next(error);
  }
}

async function updateContact(req, res, next) {
  const { contactId } = req.params;
  const body = req.body;

  try {
    if (Object.keys(body).length === 0) {
      return res.status(400).json({ message: "missing fields" });
    }

    const response = putSchema.validate(body, { abortEarly: false });
    if (response.error) {
      return res
        .status(400)
        .send(response.error.details.map((err) => err.message).join(", "));
    }

    const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
      new: true,
    });

    if (updatedContact === null) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
}

async function deleteContact(req, res, next) {
  const { contactId } = req.params;

  try {
    const deletedContact = await Contact.findByIdAndDelete(contactId);

    if (deletedContact === null) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
}

async function updateStatusContact(req, res, next) {
  const { contactId } = req.params;
  const body = req.body;

  try {
    if (!body || typeof body.favorite === "undefined") {
      return res.status(400).json({ message: "missing field favorite" });
    }

    const updatedContact = await Contact.findByIdAndUpdate(contactId, body);

    if (updatedContact !== null) {
      res.status(200).json(updatedContact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
  updateStatusContact,
};

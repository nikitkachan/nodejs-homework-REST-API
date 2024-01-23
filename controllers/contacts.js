const { Contact } = require("../models/contact");
const { HttpError } = require("../helpers");

async function getContacts(req, res, next) {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const contacts = await Contact.find({ owner: userId }, { skip, limit });

    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
}

async function getContact(req, res, next) {
  try {
    const { contactId } = req.params;
    const userId = req.user.id;
    const contact = await Contact.findById(contactId);

    if (contact === null) {
      throw HttpError(404, "Not found");
    }
    if (contact.owner.toString() !== userId) {
      throw HttpError(404, "Not found");
    }

    res.status(200).json(contact);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function createContact(req, res, next) {
  try {
    const userId = req.user.id;
    const newContact = await Contact.create({ ...req.body, owner: userId });
    res.status(201).json(newContact);
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

    const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
      new: true,
    });

    if (updatedContact === null) {
      throw HttpError(404, "Not found");
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function deleteContact(req, res, next) {
  try {
    const { contactId } = req.params;
    const deletedContact = await Contact.findByIdAndDelete(contactId);

    if (deletedContact === null) {
      throw HttpError(404, "Not found");
    }

    res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function updateStatusContact(req, res, next) {
  try {
    const { contactId } = req.params;
    const body = req.body;

    if (!body || typeof body.favorite === "undefined") {
      return res.status(400).json({ message: "missing field favorite" });
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { $set: { favorite: body.favorite } },
      { new: true }
    );

    if (updatedContact !== null) {
      res.status(200).json(updatedContact);
    } else {
      throw HttpError(404, "Not found");
    }
  } catch (error) {
    console.error(error);
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

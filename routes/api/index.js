const express = require("express");

const router = express.Router();

const authRoutes = require("./auth");
const contactRoutes = require("./contacts");

router.use("/contacts", contactRoutes);
router.use("/users", authRoutes);

module.exports = router;

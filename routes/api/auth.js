const express = require("express");

const AuthController = require("../../controllers/auth");

const { validateBody, auth, upload } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();
const jsonParser = express.json();

router.post(
  "/register",
  jsonParser,
  validateBody(schemas.registerSchema),
  AuthController.register
);
router.post(
  "/login",
  jsonParser,
  validateBody(schemas.loginSchema),
  AuthController.login
);
router.post("/logout", auth, AuthController.logout);
router.get("/current", auth, AuthController.getCurrent);
router.get("/verify/:verificationToken", AuthController.verify);
router.post(
  "/verify",
  validateBody(schemas.secondTryVerifySchema),
  AuthController.secondTryVerify
);
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  AuthController.updateAvatar
);

module.exports = router;

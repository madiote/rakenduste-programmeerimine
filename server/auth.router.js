const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const userController = require("./user.controller.js");

const validationMiddleware = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
};

/** Login */
router.post("/login", userController.login);

/** Creates a new user (signup) */
router.post("/signup", 
    [
        check("email").isEmail().normalizeEmail(),
        check("password").isLength({ min: 5 }).withMessage("must be at least 5 characters")
            .matches(/\d/).withMessage("must contain a number")
            .not().isIn(["123", "password1", "parool1"]).withMessage("Do not use a common word as the password")
    ],
    validationMiddleware,
    userController.signup);

module.exports = router;
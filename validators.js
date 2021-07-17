const db_connection = require("./dbConnection").promise();
const { body, param, validationResult } = require("express-validator");

module.exports = {
  // User name and email Validation
  userInfo: [
    body("username", "username minimal 3 karakter")
      .optional()
      .isLength({ min: 3 })
      .trim()
      .unescape()
      .escape(),
  ],

  userID: [param("id", "Invalid User ID").trim().isInt()],

  // Checking Validation Result
  result: (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
};

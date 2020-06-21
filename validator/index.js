const EMAIL_PATTERN =
  "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@" +
  "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";

const FULLNAME_PATTERN = "^[a-z0-9_-]{3,16}$";

exports.userSignupValidator = (req, res, next) => {
  req.check("name", "Name is required!").notEmpty();
  req
    .check("name")
    .matches(FULLNAME_PATTERN)
    .withMessage("ko dc chua cac ki tu co dau");
  req
    .check("email", "Email must be between 3 to 32 characters")
    .matches(EMAIL_PATTERN)
    .withMessage("Email must contain @, have dot, Capital ")
    .isLength({ min: 4, max: 32 });

  req.check("password", "Password is required!").notEmpty();
  req
    .check("password")
    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain at least 1 numbers");

  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map((error) => error.err)[0];
    return res.status(400).json({ error: firstError });
  }
  next();
};

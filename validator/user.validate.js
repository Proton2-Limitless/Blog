const Joi = require("joi");

const UserSignUp = Joi.object({
  firstname: Joi.string().max(255).trim().required(),
  lastname: Joi.string().max(255).required().trim(),
  email: Joi.string().max(255).trim().required(),
  password: Joi.string().max(255).required().trim(),
});

const LoginSchema = Joi.object({
  email: Joi.string().max(255).trim().required(),
  password: Joi.string().max(255).required().trim(),
});

async function SignUpUser(req, res, next) {
  const authorPayLoad = req.body;

  try {
    await UserSignUp.validateAsync(authorPayLoad);
    next();
  } catch (error) {
    next({
      message: error.details[0].message,
      status: 400,
    });
  }
}

async function LogUser(req, res, next) {
  const authorPayLoad = req.body;

  try {
    await LoginSchema.validateAsync(authorPayLoad);
    next();
  } catch (error) {
    next({
      message: error.details[0].message,
      status: 400,
    });
  }
}

module.exports = {
  SignUpUser,
  LogUser,
};

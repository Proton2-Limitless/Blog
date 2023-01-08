const Joi = require("joi");

const createPost = Joi.object({
  title: Joi.string().max(255).trim().required(),
  description: Joi.string().max(255).required().trim(),
  tags: Joi.string().max(255).trim().required(),
  body: Joi.string().max(255).required().trim(),
});
const updateState = Joi.object({
    state: Joi.string().max(255).trim().required(),
});
const updatePost = Joi.object({
  title: Joi.string().max(255).trim(),
  description: Joi.string().max(255).trim(),
  tags: Joi.string().max(255).trim(),
  body: Joi.string().max(255).trim(),
});

async function asyncCreatePost(req, res, next) {
    const PayLoad = req.body;
    
    try {
        await createPost.validateAsync(PayLoad);
        next();
    } catch (error) {
        next({
            message: error.details[0].message,
            status: 400,
        });
    }
}
async function asyncUpdateState(req, res, next) {
    const PayLoad = req.query;
    
    try {
        await updateState.validateAsync(PayLoad);
        next();
    } catch (error) {
        next({
            message: error.details[0].message,
            status: 400,
        });
    }
}
async function asyncUpdatePost(req, res, next) {
  const PayLoad = req.body;

  try {
    await updatePost.validateAsync(PayLoad);
    next();
  } catch (error) {
    next({
      message: error.details[0].message,
      status: 400,
    });
  }
}

module.exports = {
    asyncCreatePost,
    asyncUpdateState,
    asyncUpdatePost
}

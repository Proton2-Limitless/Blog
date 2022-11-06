// const errorController = async (error,req,res,next) => {
//     const errorCode = error.status || 500
//     const errorMessage = error.message || "Server errror"

//     return res.status(errorCode).send(errorMessage)
// }

// const errorPage = async (req, res, next) => {
//     const error = new Error("page not found");
//     error.status = 404;
//     next(error);
//   }

// module.exports = {errorController,errorPage}
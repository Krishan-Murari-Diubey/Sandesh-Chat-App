export const errorMiddleware = (err, req, res, next) => {
  console.log(err);
  const status = err.status || 500;
  const message = err.message || "BACKEND ERROR";
  const extraDetails = err.errorDetail || "Error From Backend";
  if (err.status === 11000) {
    err.message = "duplicate field";
    err.statusCode ||= 500;
  }
  return res.status(status).json({ message, extraDetails });
};

export const TryCatch = (passedFunc) => async (req, res, next) => {
  try {
    await passedFunc(req, res, next);
  } catch (error) {
    next(error);
  }
};

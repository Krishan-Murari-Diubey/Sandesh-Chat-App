import { User } from "../models/user.js";
import { TryCatch } from "./ErrorMiddleware.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = TryCatch((req, res, next) => {
  const token = req.cookies.sandesh;
  if (!token) {
    return res
      .status(401)
      .json({ message: "UnAuthorized HTTP , Token Not Provided" });
  }
  const decodedData = jwt.verify(token, process.env.SECRET_KEY);
  req.user = decodedData._id;
  next();
});

export const adminOnly = (req, res, next) => {
  const token = req.cookies["sandesh-admin-token"];

  if (!token) return next(new Error("Only Admin can access this route", 401));

  const secretKey = jwt.verify(token, process.env.SECRET_KEY);

  const isMatched = secretKey === process.env.ADMIN_SECRET_KEY;

  if (!isMatched)
    return next(new Error("Only Admin can access this route", 401));

  next();
};

export const socketAuthenticator = async (err, socket, next) => {
  try {
    if (err) return next(err);
    const authToken = socket.request.cookies.sandesh;

    if (!authToken)
      return next(new Error("Please login to access this route", 401));

    const decodedData = jwt.verify(authToken, process.env.SECRET_KEY);

    const user = await User.findById(decodedData._id);

    if (!user) return next(new Error("Please login to access this route", 401));

    socket.user = user;

    return next();
  } catch (error) {
    console.log(error);
    return next(new Error("Please login to access this route", 401));
  }
};

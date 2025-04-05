import { Router } from "express";
import {
  acceptFriendRequest,
  getMyFriends,
  getMyNotifications,
  getMyProfile,
  login,
  logout,
  newUser,
  searchUser,
  sendFriendRequest,
} from "../controllers/user.js";
import { singleAvatar } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/AuthMiddlware.js";
import {
  acceptRequestValidator,
  loginValidator,
  registerValidator,
  sendRequestValidator,
  validateHandler,
} from "../lib/validators.js";
const router = Router();

router
  .post("/signUp", singleAvatar, registerValidator(), validateHandler, newUser)
  .post("/login", loginValidator(), validateHandler, login);
router
  .use(isAuthenticated)
  .get("/logout", logout)
  .get("/me", getMyProfile)
  .get("/searchUser", searchUser)
  .put(
    "/sendrequest",
    sendRequestValidator(),
    validateHandler,
    sendFriendRequest
  )
  .put(
    "/acceptrequest",
    acceptRequestValidator(),
    validateHandler,
    acceptFriendRequest
  )
  .get("/notification", getMyNotifications)
  .get("/friends", getMyFriends);

export default router;

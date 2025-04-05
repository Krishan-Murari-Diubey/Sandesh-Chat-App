import { Router } from "express";
import { adminLoginValidator, validateHandler } from "../lib/validators.js";
import {
  adminLogin,
  adminLogout,
  allChats,
  allMessages,
  allUsers,
  getAdminData,
  getDashboardStats,
} from "../controllers/admin.js";
import { adminOnly } from "../middlewares/AuthMiddlware.js";

const router = Router();

router
  .post("/verify", adminLoginValidator(), validateHandler, adminLogin)
  .get("/logout", adminLogout)
  .use(adminOnly)
  .get("/", getAdminData)
  .get("/users", allUsers)
  .get("/chats", allChats)
  .get("/messages", allMessages)
  .get("/stats", getDashboardStats);

export default router;

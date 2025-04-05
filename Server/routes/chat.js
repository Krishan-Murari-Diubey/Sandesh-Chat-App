import { Router } from "express";
import { isAuthenticated } from "../middlewares/AuthMiddlware.js";
import {
  addMembers,
  deleteChat,
  getChatDetails,
  getMessages,
  getMyChats,
  getMyGroups,
  leaveGroup,
  newGroupChat,
  removeMember,
  renameGroup,
  sendAttachments,
} from "../controllers/chat.js";
import {
  addMemberValidator,
  chatIdValidator,
  newGroupValidator,
  removeMemberValidator,
  renameValidator,
  sendAttachmentsValidator,
  validateHandler,
} from "../lib/validators.js";
import { attachmentsMulter } from "../middlewares/multer.js";

const router = Router();

router
  .use(isAuthenticated)
  .post("/newGroupChat", newGroupValidator(), validateHandler, newGroupChat)
  .get("/MyChat", getMyChats)
  .get("/GetMyGroup", getMyGroups)
  .put("/addmembers", addMemberValidator(), validateHandler, addMembers)
  .put("/removemember", removeMemberValidator(), validateHandler, removeMember)
  .delete("/leave/:id", chatIdValidator(), validateHandler, leaveGroup)
  .post(
    "/message",
    attachmentsMulter,
    sendAttachmentsValidator(),
    validateHandler,
    sendAttachments
  )
  .get("/message/:id", chatIdValidator(), validateHandler, getMessages)
  .route("/:id")
  .get(chatIdValidator(), validateHandler, getChatDetails)
  .put(renameValidator(), validateHandler, renameGroup)
  .delete(chatIdValidator(), validateHandler, deleteChat);

export default router;

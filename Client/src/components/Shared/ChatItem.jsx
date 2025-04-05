/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "../styles/StyledComponent";
import AvatarCard from "./AvatarCard";

const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessagesAlert,
  index = 0,
  handleDeleteChatOpen,
}) => {
  return (
    <Link
      to={`/chat/${_id}`}
      onContextMenu={(e) => handleDeleteChatOpen(e, _id, groupChat)}
      style={{
        backgroundColor: sameSender ? "black" : "unset",
        textDecoration: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          padding: "0.5rem",
          color: sameSender ? "white" : "unset",
          position: "relative",
        }}
      >
        <AvatarCard avatar={avatar} />
        <Stack>
          <Typography>{name}</Typography>
          {newMessagesAlert && (
            <Typography>{newMessagesAlert.count} new Message</Typography>
          )}
        </Stack>
        {isOnline && (
          <Box
            sx={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "#00C896",
              position: "absolute",
              top: "50%",
              right: "1rem",
              transform: "translateY(-50%)",
            }}
          />
        )}
      </div>
    </Link>
  );
};

export default ChatItem;

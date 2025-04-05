/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Stack } from "@mui/material";

import ChatItem from "../Shared/ChatItem";

const ChatList = ({
  w = "100%",
  chats = [],
  chatId,
  onlineUsers = [],
  newMessageAlert = [{ chatId: "", count: 0 }],
  handleDeleteChat,
}) => {
  return (
    <Stack width={w} direction={"column"}>
      {chats?.map((data) => {
        const { avatar, _id, name, groupChat, members } = data;
        const newMessagesAlert = newMessageAlert?.find(
          ({ chatId }) => chatId === _id
        );
        const isOnline = members?.some((member) =>
          onlineUsers.includes(member)
        );

        return (
          <ChatItem
            newMessagesAlert={newMessagesAlert}
            isOnline={isOnline}
            avatar={avatar}
            name={name}
            _id={_id}
            key={_id}
            groupChat={groupChat}
            sameSender={chatId === _id}
            handleDeleteChatOpen={handleDeleteChat}
          />
        );
      })}
    </Stack>
  );
};

export default ChatList;

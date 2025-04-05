/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
/* eslint-disable react-hooks/rules-of-hooks */
import { Drawer, Grid, Skeleton } from "@mui/material";
import { useCallback, useRef, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import DeleteChatMenu from "../dialogs/DeleteChatMenu";
import Title from "../Shared/Title";
import ChatList from "../specific/ChatList";
import Profile from "../specific/Profile";

import Header from "./Header";
import { useMyChatsQuery } from "../../redux/api/api";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsDeleteMenu,
  setIsMobile,
  setSelectedDeleteChat,
} from "../../redux/reducers/misc";
import { useErrors, useSocketEvents } from "../../hooks/hook";
import { GetSocket } from "../../Socket";
import {
  incrementNotification,
  setNewMessagesAlert,
} from "../../redux/reducers/chat";
import {
  NEW_MESSAGE_ALERT,
  NEW_REQUEST,
  ONLINE_USERS,
  REFETCH_CHATS,
} from "../Constant/events";
import { useEffect } from "react";
import { getOrSaveFromStorage } from "../../lib/features";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const { isLoading, data, isError, refetch } = useMyChatsQuery("");
    const socket = GetSocket();

    const chatId = params.chatId;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const deleteMenuAnchor = useRef(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { isMobile } = useSelector((state) => state.misc);
    const { user } = useSelector((state) => state.auth);
    const { newMessagesAlert } = useSelector((state) => state.chat);

    useErrors([isError]);

    const newRequestListener = useCallback(() => {
      dispatch(incrementNotification());
    }, [dispatch]);

    useEffect(() => {
      getOrSaveFromStorage({ key: NEW_MESSAGE_ALERT, value: newMessagesAlert });
    }, [newMessagesAlert]);

    const newMessageAlertListener = useCallback(
      (data) => {
        if (data.chatId === chatId) return;
        dispatch(setNewMessagesAlert(data));
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [chatId]
    );
    const refetchListener = useCallback(() => {
      refetch();
      navigate("/");
    }, [refetch, navigate]);

    const onlineUsersListener = useCallback((data) => {
      console.log(data);
      setOnlineUsers(data);
    }, []);

    const eventHandlers = {
      [NEW_MESSAGE_ALERT]: newMessageAlertListener,
      [NEW_REQUEST]: newRequestListener,
      [REFETCH_CHATS]: refetchListener,
      [ONLINE_USERS]: onlineUsersListener,
    };

    const handleDeleteChat = (e, chatId, groupChat) => {
      dispatch(setIsDeleteMenu(true));
      dispatch(setSelectedDeleteChat({ chatId, groupChat }));
      deleteMenuAnchor.current = e.currentTarget;
    };

    useSocketEvents(socket, eventHandlers);
    const handleMobileClose = () => dispatch(setIsMobile(false));

    return (
      <>
        <Title />
        <Header />

        <DeleteChatMenu
          dispatch={dispatch}
          deleteMenuAnchor={deleteMenuAnchor}
        />

        {isLoading ? (
          <Skeleton />
        ) : (
          <Drawer open={isMobile} onClose={handleMobileClose}>
            <ChatList
              w="70vw"
              chats={data?.chats}
              chatId={chatId}
              onlineUsers={onlineUsers}
              handleDeleteChat={handleDeleteChat}
              newMessageAlert={newMessagesAlert}
            />
          </Drawer>
        )}

        <Grid container height={"calc(100vh - 4rem)"}>
          <Grid
            item
            sm={4}
            md={3}
            sx={{
              display: { xs: "none", sm: "block" },
            }}
            height={"100%"}
          >
            {isLoading ? (
              <Skeleton />
            ) : (
              <ChatList
                chats={data?.chats}
                chatId={chatId}
                onlineUsers={onlineUsers}
                handleDeleteChat={handleDeleteChat}
                newMessageAlert={newMessagesAlert}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
            <WrappedComponent {...props} chatId={chatId} user={user} />
          </Grid>

          <Grid
            item
            md={4}
            lg={3}
            height={"100%"}
            sx={{
              display: { xs: "none", md: "block" },
              padding: "2rem",
              bgcolor: "black",
            }}
          >
            <Profile user={user} />
          </Grid>
        </Grid>
      </>
    );
  };
};

export default AppLayout;

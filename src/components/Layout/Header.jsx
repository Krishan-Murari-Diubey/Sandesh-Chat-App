import React, { Suspense, lazy, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import { Backdrop, Tooltip } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";

const SearchDialogue = lazy(() => import("../specific/Search"));
const NotificationDialogue = lazy(() => import("../specific/Notification"));
const NewGroupDialogue = lazy(() => import("../specific/NewGroup"));

const Header = () => {
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isNewGroup, setIsNewGroup] = useState(false);
  const [isNotification, setIsNotification] = useState(false);

  const handleMobile = () => {
    console.log("mobile");
    setIsMobile((prev) => !prev);
  };
  const handleSearch = () => {
    console.log("Search");
    setIsSearch((prev) => !prev);
  };
  const OpenNewGroup = () => {
    console.log("groups");
    setIsNewGroup((prev) => !prev);
  };
  const NavigateToGroup = () => {
    console.log("NavigateToGroup");
    navigate("/groups");
  };
  const LogoutHandler = () => {
    console.log("LogoutHandler");
  };
  const OpenNotification = () => {
    console.log("OpenNotification");
    setIsNotification((prev) => !prev);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar position="static" sx={{ bgcolor: "black" }}>
          <Toolbar>
            <Typography
              variant="h6"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Sandesh
            </Typography>

            <Box
              sx={{
                display: { xs: "block", sm: "none", border: "1px solid white" },
              }}
            >
              <IconBtn
                size="large"
                onClick={handleMobile}
                icon={<MenuIcon />}
              />
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box>
              <IconBtn
                onClick={handleSearch}
                icon={<SearchIcon />}
                title={"search"}
                sx={{
                  "&:hover": {
                    bgcolor: "purple",
                  },
                }}
              />

              <IconBtn
                title="New group"
                icon={<AddIcon />}
                onClick={OpenNewGroup}
              />
              <IconBtn
                title="Manage Groups"
                icon={<GroupIcon />}
                onClick={NavigateToGroup}
              />
              <IconBtn
                title="Logout"
                icon={<LogoutIcon />}
                onClick={LogoutHandler}
              />
              <IconBtn
                title="NotificationsIcon"
                icon={<NotificationsIcon />}
                onClick={OpenNotification}
              />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <SearchDialogue />
        </Suspense>
      )}{" "}
      {isNotification && (
        <Suspense fallback={<Backdrop open />}>
          <NotificationDialogue />
        </Suspense>
      )}{" "}
      {isNewGroup && (
        <Suspense fallback={<Backdrop open />}>
          <NewGroupDialogue />
        </Suspense>
      )}
    </>
  );
};

const IconBtn = ({ title, icon, onClick }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" onClick={onClick}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};
export default Header;

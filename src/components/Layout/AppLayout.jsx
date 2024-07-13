import Title from "../Shared/Title";
import { Grid } from "@mui/material";
import Header from "./Header";
import ChatList from "../specific/ChatList";
import { SampleChats } from "../Constant/SampleData";

const AppLayout = (WrapperComponent) => {
  return (props) => {
    return (
      <>
        <Title />
        <Header />
        <Grid container height={"calc(100vh - 4rem)"}>
          <Grid
            item
            sm={4}
            md={3}
            sx={{ display: { xs: "none", sm: "block" } }}
            height={"100%"}
            // bgcolor={"black"}
          >
            <ChatList chats={SampleChats} />
          </Grid>
          <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
            <WrapperComponent {...props} />
          </Grid>
          <Grid
            item
            md={4}
            lg={3}
            height={"100%"}
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            third
          </Grid>
        </Grid>
      </>
    );
  };
};
export default AppLayout;

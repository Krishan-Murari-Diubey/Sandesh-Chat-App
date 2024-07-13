import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { VisuallyHiddenInput } from "../components/styles/StyledComponent";
import { useFileHandler, useInputValidation, useStrongPassword } from "6pp";
import { usernameValidator } from "../utils/validators";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const toggleChain = () => setIsLogin((pre) => !pre);

  const UserName = useInputValidation("", usernameValidator);
  const Email = useInputValidation("");
  const PassWord = useStrongPassword();
  const ConfirmPassWord = useStrongPassword();
  const avatar = useFileHandler("single");

  return (
    <Container
      component={"main"}
      maxWidth="xs"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          fontSize: "5px",
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {isLogin ? (
          <>
            <Typography variant="h5">Login</Typography>
            <form style={{ width: "80%", marginTop: "1rem" }}>
              <TextField
                required
                fullWidth
                label="Username"
                margin="normal"
                variant="outlined"
                size="small"
              />
              <TextField
                required
                fullWidth
                label="Password"
                margin="normal"
                variant="outlined"
                size="small"
              />
              <Button
                sx={{ marginTop: "1rem" }}
                variant="contained"
                fullWidth
                color="primary"
                type="submit"
                size="small"
              >
                Login
              </Button>

              <Typography textAlign={"center"} sx={{ marginTop: "1rem" }}>
                or
              </Typography>

              <Button
                sx={{ marginTop: "1rem" }}
                variant="text"
                fullWidth
                color="secondary"
                onClick={toggleChain}
                size="small"
              >
                SignUp
              </Button>
            </form>
          </>
        ) : (
          <>
            <Typography variant="h5">Sign Up</Typography>
            <form style={{ width: "100%", marginTop: "1rem" }}>
              <Stack position={"relative"} width={"5rem"} margin={"auto"}>
                <Avatar
                  sx={{ width: "5rem", height: "5rem", objectFit: "contain" }}
                  src={avatar.preview}
                />
                {avatar.error && (
                  <Typography variant="caption" color="error">
                    {avatar.error}
                  </Typography>
                )}

                <IconButton component="label">
                  <CameraAltIcon />
                  <VisuallyHiddenInput
                    type="file"
                    onChange={avatar.changeHandler}
                  />
                </IconButton>
              </Stack>
              <TextField
                required
                fullWidth
                label="Username"
                sx={{
                  marginTop: "10px",
                }}
                variant="outlined"
                size="small"
                value={UserName.value}
                onChange={UserName.changeHandler}
              />
              {UserName.error && (
                <Typography color="error" variant="caption">
                  {UserName.error}
                </Typography>
              )}
              <TextField
                required
                fullWidth
                label="email"
                sx={{
                  marginTop: "10px",
                }}
                variant="outlined"
                size="small"
                value={Email.value}
                onChange={Email.changeHandler}
              />
              <TextField
                required
                fullWidth
                label="Password"
                sx={{
                  marginTop: "10px",
                }}
                variant="outlined"
                size="small"
                value={PassWord.value}
                onChange={PassWord.changeHandler}
              />
              {PassWord.error && (
                <Typography color="error" variant="caption">
                  {PassWord.error}
                </Typography>
              )}
              <TextField
                required
                fullWidth
                label="ConfirmPassword"
                sx={{
                  marginTop: "10px",
                }}
                variant="outlined"
                size="small"
                value={ConfirmPassWord.value}
                onChange={ConfirmPassWord.changeHandler}
              />

              {ConfirmPassWord.error && (
                <Typography color="error" variant="caption">
                  {ConfirmPassWord.error}
                </Typography>
              )}
              <Button
                sx={{ marginY: "1rem" }}
                variant="contained"
                fullWidth
                color="primary"
                type="submit"
                size="small"
              >
                SignUp
              </Button>

              <Typography textAlign={"center"}>or</Typography>

              <Button
                sx={{ marginTop: "1rem", marginY: "1rem" }}
                variant="text"
                fullWidth
                color="secondary"
                onClick={toggleChain}
                size="small"
              >
                Login Instead
              </Button>
            </form>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Login;

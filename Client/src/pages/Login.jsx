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
import axios from "axios";
import toast from "react-hot-toast";
import { server } from "../constant/config";
import { useDispatch } from "react-redux";
import { userExists } from "../redux/reducers/auth";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const toggleChain = () => setIsLogin((pre) => !pre);

  const UserName = useInputValidation("", usernameValidator);
  const Email = useInputValidation("");
  const PassWord = useStrongPassword();
  const ConfirmPassWord = useStrongPassword();
  const avatar = useFileHandler("single");
  const bio = useInputValidation("");
  const name = useInputValidation("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Logging In...");

    setIsLoading(true);
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/user/login`,
        {
          username: UserName.value,
          password: PassWord.value,
        },
        config
      );
      dispatch(userExists(data.user));
      toast.success(data.message, {
        id: toastId,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Signing Up...");
    setIsLoading(true);

    const formData = new FormData();
    formData.append("avatar", avatar.file);
    formData.append("name", name.value);
    formData.append("bio", bio.value);
    formData.append("username", UserName.value);
    formData.append("password", PassWord.value);

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/user/signUp`,
        formData,
        config
      );

      dispatch(userExists(data.user));
      toast.success(data.message, {
        id: toastId,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

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
                value={UserName.value}
                onChange={UserName.changeHandler}
              />
              <TextField
                required
                fullWidth
                label="Password"
                margin="normal"
                variant="outlined"
                size="small"
                value={PassWord.value}
                onChange={PassWord.changeHandler}
              />
              <Button
                sx={{ marginTop: "1rem" }}
                variant="contained"
                fullWidth
                color="primary"
                type="submit"
                size="small"
                onClick={handleLogin}
                disabled={isLoading}
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
                disabled={isLoading}
              >
                SignUp
              </Button>
            </form>
          </>
        ) : (
          <>
            <Typography variant="h5">Sign Up</Typography>
            <form
              style={{ width: "100%", marginTop: "1rem" }}
              onSubmit={handleSignUp}
            >
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
                label="Name"
                sx={{
                  marginTop: "10px",
                }}
                variant="outlined"
                size="small"
                value={name.value}
                onChange={name.changeHandler}
              />

              <TextField
                required
                fullWidth
                label="Bio"
                sx={{
                  marginTop: "10px",
                }}
                variant="outlined"
                size="small"
                value={bio.value}
                onChange={bio.changeHandler}
              />

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
                disabled={isLoading}
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
                disabled={isLoading}
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

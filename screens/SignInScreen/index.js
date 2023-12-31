import React from "react";
// api
import { apiClient, ApiService } from "../../lib/axios";
import { useToast } from "native-base";
//components
import {
  Box,
  Heading,
  Column,
  FormControl,
  Input,
  Link,
  Button,
  Row,
  Center,
  Checkbox,
  Spacer,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
//redux
import { useDispatch, useSelector } from "react-redux";
import {
  setUser,
  setToken,
  setLoginInfo,
  setUserId,
} from "../../lib/redux/reducers/authReducer";
import { setUserProfile } from "../../lib/redux/reducers/authReducer";
import jwt_decode from "jwt-decode";
export const SignInScreen = () => {
  const dispatch = useDispatch();
  const { loginInfo } = useSelector((state) => state.auth);
  // const [email, onChangeEmail] = React.useState(loginInfo?.email);
  const [username, onChangeUserName] = React.useState(loginInfo?.username);
  const [password, onChangePassword] = React.useState(loginInfo?.password);
  const [rememberMe, setRememberMe] = React.useState(!!loginInfo?.username);
  const toast = useToast();
  const navigation = useNavigation();
  const GetProfile = () => {
    // const e = await ApiService.getProfile();
    ApiService.getProfile().then((e) => {
      dispatch(setUserProfile(e.data));
    });
    // dispatch(setUserProfile(e.data));
  };
  const onPressSigninButton = async () => {
    const values = {
      username,
      password,
    };
    ApiService.signin(values)
      .then((res) => {
        let userId = jwt_decode(res.data.access).user_id;
        dispatch(setToken(res.data));
        dispatch(setUser(username));
        dispatch(setUserId(userId));
        // Set auth token
        apiClient.interceptors.request.use((config) => {
          if (config.headers) {
            config.headers.Authorization = `Bearer ${res?.data?.access}`;
          }
          return config;
        });
        GetProfile();

        // If remember me checked, then save user data to storage
        if (rememberMe) {
          dispatch(
            setLoginInfo({
              username: username,
              password: password,
            })
          );
        }
        navigation.navigate("Dashboard");
      })
      .catch((error) => {
        console.log("Errror", error);
        const errorMessage = error.response?.data?.message || error.message;
        toast.show({
          title: "Error",
          placement: "top-right",
          description: errorMessage,
        });
      });
  };
  return (
    <Center width="100%">
      <Box safeArea p="2" py="8" w="90%">
        <Heading>Welcome</Heading>
        <Column space={3} mt="5">
          <FormControl>
            <FormControl.Label>User Name</FormControl.Label>
            <Input
              value={username}
              onChangeText={onChangeUserName}
              type="text"
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              value={password}
              onChangeText={onChangePassword}
              type="password"
            />
          </FormControl>
          <Row space={3} width="100%">
            <Checkbox value="" isChecked={rememberMe} onChange={setRememberMe}>
              Remember me
            </Checkbox>
            <Spacer />
            <Link href={"https://your.app.web/forgot-password"} isExternal>
              Forget Password?
            </Link>
          </Row>
          <Button onPress={onPressSigninButton} mt="2">
            Sign in
          </Button>
        </Column>
      </Box>
    </Center>
  );
};

import * as React from "react";

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
  setLoginEmail,
  setUserId,
} from "../../lib/redux/reducers/authReducer";
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
  const onPressSigninButton = async () => {
    const values = {
      username,
      password,
    };
    console.log("Values -- ", values);
    ApiService.signin(values)
      .then((res) => {
        console.log("res", res);
        let userId = jwt_decode(res.data.access).user_id;
        // dispatch(setUser(res.data.user));
        dispatch(setToken(res.data));
        dispatch(setUser(username));
        dispatch(setUserId(userId));
        // dispatch(setToken("user@1212"));
        // Set auth token
        apiClient.interceptors.request.use((config) => {
          if (config.headers) {
            config.headers.Authorization = `Bearer ${res?.data?.access}`;
          }
          return config;
        });
        // If remember me checked, then save user data to storage
        if (rememberMe) {
          dispatch(
            setLoginEmail({
              username: username,
              password: password,
            })
          );
        }
        navigation.navigate("Dashboard");
      })
      .catch((err) => {
        console.log("Errror", err);
        toast.show({
          title: "Error",
          placement: "top-right",
          description: err.message,
        });
      });
  };
  //   const onPressSignupLink = () => {
  //     props.navigation.navigate("Signup");
  //   };
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
          {/* <Row mt="6" justifyContent="center">
            <Text>I&apos;m a new user. </Text>
            <Link onPress={onPressSignupLink}>Sign Up</Link>
          </Row> */}
        </Column>
      </Box>
    </Center>
  );
};

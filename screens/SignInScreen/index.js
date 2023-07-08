import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// api
import { ApiService } from "../../lib/axios";
import logo from "../../assets/logo.png";
import bgImg from "../../assets/crowd.png";
import { ImageBackground, Dimensions } from "react-native";
import { Feather } from "@expo/vector-icons";
const screenWidth = Dimensions.get("window").width;

//components
import {
  Heading,
  Stack,
  Text,
  useToast,
  Column,
  FormControl,
  Input,
  Link,
  Button,
  Row,
  Center,
  Checkbox,
  Spacer,
  useColorMode,
  IconButton,
  Flex,
  Image,
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
  const { toggleColorMode } = useColorMode();
  // const [email, onChangeEmail] = React.useState(loginInfo?.email);
  const [username, onChangeUserName] = useState(loginInfo?.username);
  const [password, onChangePassword] = useState(loginInfo?.password);
  const [rememberMe, setRememberMe] = useState(!!loginInfo?.username);
  const [isLoaded, setIsLoaded] = useState(true);

  const toast = useToast();
  const navigation = useNavigation();
  const GetProfile = () => {
    ApiService.getProfile().then((e) => {
      dispatch(setUserProfile(e.data));
    });
  };
  const onPressSigninButton = async () => {
    setIsLoaded(false);
    const values = {
      username,
      password,
    };
    try {
      const response = await ApiService.signin(values);
      const { access, refresh } = response.data;
      let userId = jwt_decode(access).user_id;
      await AsyncStorage.setItem("token", access);
      await AsyncStorage.setItem("refreshToken", refresh);
      dispatch(setUser(username));
      dispatch(setUserId(userId));
      dispatch(setToken(access));
      GetProfile();
      if (rememberMe) {
        dispatch(
          setLoginInfo({
            username: username,
            password: password,
          })
        );
      }
      setIsLoaded(true);
      navigation.navigate("Dashboard");
    } catch (error) {
      console.error("Login failed:", error.message);
      // Handle error and display appropriate message
      const errorMessage = error.response?.data?.message || error.message;
      toast.show({
        title: "Error",
        placement: "top-right",
        description: errorMessage,
      });
      setIsLoaded(true);
    }
  };
  return (
    <Stack
      justifyContent={screenWidth > 800 ? "center" : "space-between"}
      alignItems={screenWidth > 800 ? "center" : "flex-start"}
      width="100%"
      h={"100%"}
      direction={screenWidth > 800 ? "row" : "column"}
    >
      <Flex
        px={0}
        width={screenWidth > 800 ? "50%" : "100%"}
        bg={"primary.600"}
        borderBottomRadius={8}
        h={screenWidth > 800 ? "100%" : "240px"}
        justifyContent={screenWidth > 800 ? "flex-end" : "space-between"}
        alignItems={"center"}
      >
        <Center
          px={screenWidth > 800 ? 2 : 16}
          pt={8}
          width={screenWidth > 800 ? "100%" : "100%"}
          h={screenWidth > 800 ? "80%" : "auto"}
          m={2}
        >
          <Image
            // source={{
            //   uri: logo.toString(),
            // }}
            source={logo}
            size={screenWidth > 800 ? "50%" : "xl"}
            h={screenWidth > 800 ? "60%" : "100px"}
            alt="cms logo"
          />
          <Text
            fontWeight={"semibold"}
            fontSize={
              screenWidth > 1800
                ? "4xl"
                : screenWidth > 1200
                ? "2xl"
                : screenWidth > 800
                ? "xl"
                : "xs"
            }
            textAlign={"center"}
            color={"white"}
            mt={2}
          >
            Empower your campaigns with actionable insights!
          </Text>
        </Center>
        <ImageBackground
          // source={{ uri: bgImg.toString() }}
          source={bgImg}
          resizeMode={screenWidth > 800 ? "cover" : "cover"}
          style={{
            width: "100%",
            flex: 1,
            // position: screenWidth > 800 ? "absolute" : "relative",
          }}
        />
      </Flex>
      <Flex
        mt={screenWidth > 800 ? "-4" : -16}
        safeArea
        px="4"
        pb="2"
        width={screenWidth > 800 ? "50%" : "100%"}
        h={screenWidth > 800 ? "100%" : "auto"}
        justifyContent={screenWidth > 800 ? "center" : "space-between"}
        alignItems={screenWidth > 800 ? "center" : "flex-start"}
      >
        <Heading>Login</Heading>
        <Column space={3} mt="5" width={screenWidth > 800 ? "80%" : "100%"}>
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
          <Button isLoading={!isLoaded} mt={8} onPress={onPressSigninButton}>
            Sign in
          </Button>
        </Column>
      </Flex>

      <Flex
        px={screenWidth > 800 ? 8 : "2"}
        position={"absolute"}
        py={screenWidth > 800 ? 8 : "0"}
        w="100%"
        alignItems={"flex-end"}
        bottom={"0"}
      >
        <IconButton
          h={"50px"}
          w={"50px"}
          onPress={toggleColorMode}
          variant="solid"
          borderRadius="full"
          _icon={{
            as: Feather,
            name: "sun",
          }}
        />
      </Flex>
    </Stack>
  );
};

import React, { useState } from "react";
import {
  Box,
  AspectRatio,
  Stack,
  HStack,
  Heading,
  Text,
  Icon,
  Button,
  Spinner,
  // Avatar,
  Image,
} from "native-base";
import UserAvatar from "react-native-user-avatar";
import { Feather } from "@expo/vector-icons";
import FallbackImg from "../../assets/useravatar.png";
const AgentCard = ({ modalData, makePhoneCall }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    // setIsImageLoading(false);
  };

  const handleLoadError = () => {
    setIsLoading(false);
    setIsError(true);
  };

  return (
    <Box alignItems="center" w={"100%"}>
      <Box
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        _dark={{
          borderColor: "coolGray.600",
          backgroundColor: "gray.700",
        }}
        _web={{
          shadow: 2,
          borderWidth: 0,
        }}
        _light={{
          backgroundColor: "gray.50",
        }}
        w="100%"
      >
        <Box>
          <AspectRatio w="100%" ratio={1 / 1}>
            {modalData?.avatarUrl ? (
              <Image
                source={{
                  uri: modalData?.avatarUrl,
                }}
                cache="reload"
                fallbackSource={FallbackImg}
                alt="image"
                onLoadEnd={handleLoad}
                // onLoadEnd={() => setIsLoading(false)}
                onError={handleLoadError}
              />
            ) : (
              <UserAvatar name={modalData?.name} />
            )}
          </AspectRatio>
          {isLoading ? (
            /* Show loading indicator while image is loading */
            /* You can use a custom loader or a Spinner component from NativeBase */
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              alignItems="center"
              justifyContent="center"
            >
              {/* Show a loading indicator here */}
              <Spinner size="small" color="blue.500" />
            </Box>
          ) : null}
          {isError && !isLoading ? (
            /* Show fallback image if there's an error loading the image */
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              alignItems="center"
              justifyContent="center"
            >
              <Image source={FallbackImg} alt="Fallback Image" />
            </Box>
          ) : null}
        </Box>
        <HStack
          p="4"
          space={3}
          justifyContent={"space-between"}
          alignItems={"center"}
          maxW={"100%"}
        >
          <Stack space={1} w={"70%"}>
            <Heading size="md" ml="-1">
              {modalData?.name}
            </Heading>
            <Text
              fontSize="sm"
              _light={{
                color: "secondary.600",
              }}
              _dark={{
                color: "secondary.200",
              }}
              fontWeight="500"
              ml="-0.5"
              mt="-1"
            >
              {modalData?.zone}
            </Text>
          </Stack>
          <Button
            rounded={"full"}
            py={1}
            h={"10"}
            bg={"green.600"}
            size={"sm"}
            disabled={!modalData?.contact_number}
            onPress={() => makePhoneCall(modalData?.contact_number)}
            leftIcon={
              <Icon
                as={
                  <Feather
                    name={
                      modalData?.contact_number === "NA" ||
                      modalData?.contact_number === "Not added" ||
                      modalData?.contact_number === null
                        ? "slash"
                        : "phone-call"
                    }
                  />
                }
              />
            }
          >
            CALL
          </Button>
        </HStack>
      </Box>
    </Box>
  );
};
// export default AgentCard;
export default React.memo(AgentCard, (prevProps, nextProps) => {
  return prevProps.modalData === nextProps.modalData;
});

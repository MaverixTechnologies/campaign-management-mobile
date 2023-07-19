import React, { useState, useEffect } from "react";
import {
  Alert,
  VStack,
  Box,
  CloseIcon,
  IconButton,
  Text,
  HStack,
  Center,
} from "native-base";

const AlertCenter = ({ status, title, duration = 3000, description }) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsOpen(false);
    }, duration);

    return () => {
      clearTimeout(timeout);
    };
  }, [duration]);

  if (!isOpen) {
    return null;
  }

  //   let bgColor = "";
  //   let icon = null;

  //   switch (status) {
  //     case "success":
  //       bgColor = "green.500";
  //       icon = "check-circle";
  //       break;
  //     case "error":
  //       bgColor = "red.500";
  //       icon = "warning";
  //       break;
  //     case "info":
  //       bgColor = "blue.500";
  //       icon = "info";
  //       break;
  //     default:
  //       bgColor = "gray.500";
  //       icon = "question";
  //   }

  return (
    <Center position="absolute" top={0} bottom={0} left={0} right={0}>
      <Alert
        status={status}
        bg={"primary.50"}
        variant={"outline-light"}
        justifyContent="center"
      >
        <HStack space={2} flexShrink={1} alignItems="flex-end">
          <IconButton
            variant="unstyled"
            _focus={{
              borderWidth: 0,
            }}
            icon={<CloseIcon size="3" />}
            _icon={{
              color: "coolGray.600",
            }}
            onPress={() => setIsOpen(false)}
          />
        </HStack>
        <VStack space={1} flexShrink={1} w="100%" alignItems="center">
          <Alert.Icon size="md" />
          <Text
            fontSize="md"
            fontWeight="medium"
            _dark={{
              color: "coolGray.800",
            }}
          >
            {title}
          </Text>

          <Box
            _text={{
              textAlign: "center",
            }}
            _dark={{
              _text: {
                color: "coolGray.600",
              },
            }}
          >
            {description}
          </Box>
        </VStack>
      </Alert>
    </Center>
  );
};

export default AlertCenter;

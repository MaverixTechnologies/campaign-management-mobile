import React from "react";
import { Box, VStack, Heading, Text, HStack, Divider } from "native-base";
const InfoCard = ({ screenWidth }) => {
  // const info = [
  //   {
  //     h1: "Mandal",
  //     h2: "2",
  //   },
  // ];
  return (
    <Box
      w={screenWidth > 800 ? "800" : screenWidth - 20}
      rounded="lg"
      overflow="scroll"
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
        backgroundColor: "coolGray.50",
        borderColor: "coolGray.200",
      }}
      px="2"
    >
      <VStack>
        <HStack
          px="4"
          py="4"
          justifyContent={"space-between"}
          space={2}
          alignItems={"center"}
        >
          <Heading
            size="xs"
            ml="-1"
            _light={{
              color: "gray.500",
            }}
            _dark={{
              color: "gray.50",
            }}
          >
            Mandalam
          </Heading>
          <Text
            fontSize="lg"
            _light={{
              color: "gray.800",
            }}
            _dark={{
              color: "gray.50",
            }}
            fontWeight="500"
            ml="-0.5"
            mt="-1"
          >
            8
          </Text>
        </HStack>
        <Divider
          orientation="horizontal"
          thickness={"0.5"}
          alignSelf={"center"}
          // mr={2}
        />
        <HStack
          px="4"
          py="4"
          justifyContent={"space-between"}
          space={2}
          alignItems={"center"}
        >
          <Heading
            size="xs"
            ml="-1"
            _light={{
              color: "gray.500",
            }}
            _dark={{
              color: "gray.50",
            }}
          >
            Incharge
          </Heading>
          <Text
            fontSize="lg"
            _light={{
              color: "gray.800",
            }}
            _dark={{
              color: "gray.50",
            }}
            fontWeight="500"
            ml="-0.5"
            mt="-1"
          >
            John Doe
          </Text>
        </HStack>
        <Divider
          orientation="horizontal"
          thickness={"0.5"}
          alignSelf={"center"}
          // mr={2}
        />
        <HStack
          px="4"
          py="4"
          justifyContent={"space-between"}
          space={2}
          alignItems={"center"}
        >
          <Heading
            size="xs"
            ml="-1"
            _light={{
              color: "gray.500",
            }}
            _dark={{
              color: "gray.50",
            }}
          >
            Contact No
          </Heading>
          <Text
            fontSize="lg"
            _light={{
              color: "gray.800",
            }}
            _dark={{
              color: "gray.50",
            }}
            fontWeight="500"
            ml="-0.5"
            mt="-1"
          >
            +91 9898785645
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
};
export default InfoCard;

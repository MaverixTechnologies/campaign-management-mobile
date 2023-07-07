import React from "react";
import { Box, VStack, Heading, Text, HStack, Divider } from "native-base";
const InfoCard = ({ screenWidth, data }) => {
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
            _light={{
              color: "primary.800",
            }}
            _dark={{
              color: "gray.50",
            }}
          >
            Sector
          </Heading>
          <Text
            fontSize="lg"
            _light={{
              color: "primary.800",
            }}
            _dark={{
              color: "gray.50",
            }}
            fontWeight="500"
          >
            {data?.sector_name}
          </Text>
        </HStack>
        <Divider
          orientation="horizontal"
          thickness={"0.5"}
          alignSelf={"center"}
          w={"90%"}
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
            _light={{
              color: "primary.800",
            }}
            _dark={{
              color: "gray.50",
            }}
          >
            Sector Incharge
          </Heading>
          <Text
            fontSize="lg"
            _light={{
              color: "primary.800",
            }}
            _dark={{
              color: "gray.50",
            }}
            fontWeight="500"
          >
            {data?.sectorincharge_name
              ? data?.sectorincharge_name
              : "Not added"}
          </Text>
        </HStack>
        <Divider
          orientation="horizontal"
          thickness={"0.5"}
          alignSelf={"center"}
          w={"90%"}
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
            _light={{
              color: "primary.800",
            }}
            _dark={{
              color: "gray.50",
            }}
          >
            Mandal
          </Heading>
          <Text
            fontSize="lg"
            _light={{
              color: "primary.800",
            }}
            _dark={{
              color: "gray.50",
            }}
            fontWeight="500"
          >
            {data?.mandal_name}
          </Text>
        </HStack>
        <Divider
          orientation="horizontal"
          thickness={"0.5"}
          alignSelf={"center"}
          w={"90%"}
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
            _light={{
              color: "primary.800",
            }}
            _dark={{
              color: "gray.50",
            }}
          >
            Mandal Incharge
          </Heading>
          <Text
            fontSize="lg"
            _light={{
              color: "primary.800",
            }}
            _dark={{
              color: "gray.50",
            }}
            fontWeight="500"
          >
            {data?.mandalincharge_name
              ? data?.mandalincharge_name
              : "Not added"}
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
};
export default InfoCard;

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
            ml="-1"
            _light={{
              color: "gray.500",
            }}
            _dark={{
              color: "gray.50",
            }}
          >
            Booth
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
            {data?.pollingbooth_name}
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
            BLA
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
            {data?.bla_name ? data?.bla_name : "Not added"}
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
            Sector
          </Heading>
          <Text
            textTransform={"capitalize"}
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
            {data?.sector_name ? data?.sector_name : "Not added"}
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
            Sector Incharge
          </Heading>
          <Text
            textTransform={"capitalize"}
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
            {data?.sectorincharge_name
              ? data?.sectorincharge_name
              : "Not added"}
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
            Sector Incharge Contact
          </Heading>
          <Text
            textTransform={"capitalize"}
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
            {data?.sectorincharge_contact
              ? data?.sectorincharge_contact
              : "Not added"}
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
            BLO
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
            textTransform={"capitalize"}
            mt="-1"
          >
            {data?.blo_name ? data?.blo_name : "Not added"}
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
            BLO Contact
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
            textTransform={"capitalize"}
          >
            {data?.blo_contact ? data?.blo_contact : "Not added"}
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
};
export default InfoCard;

import React from "react";
import { Box, VStack, Heading, Text, HStack, Divider } from "native-base";
import PhoneCall from "../../components/Cards/PhoneCall";
const InfoCard = ({ screenWidth, data }) => {
  return (
    <Box
      w={screenWidth > 800 ? "800" : screenWidth - 20}
      overflow="scroll"
      borderColor="primary.200"
      borderWidth="1"
      borderBottomRadius={8}
      borderTopRightRadius={8}
      _dark={{
        backgroundColor: "primary.700",
      }}
      _web={{
        shadow: 1,
        borderWidth: 0,
      }}
      _light={{
        backgroundColor: "white",
      }}
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
            Booth
          </Heading>
          <Text
            fontSize="md"
            _light={{
              color: "primary.800",
            }}
            _dark={{
              color: "gray.50",
            }}
            fontWeight="500"
          >
            {data?.pollingbooth_name}
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
            BLA
          </Heading>
          <Text
            fontSize="md"
            _light={{
              color: "primary.800",
            }}
            _dark={{
              color: "gray.50",
            }}
            fontWeight="500"
          >
            {data?.bla_name ? data?.bla_name : "Not added"}
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
            Sector
          </Heading>
          <Text
            textTransform={"capitalize"}
            fontSize="md"
            _light={{
              color: "primary.800",
            }}
            _dark={{
              color: "gray.50",
            }}
            fontWeight="500"
          >
            {data?.sector_name ? data?.sector_name : "Not added"}
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
            textTransform={"capitalize"}
            fontSize="md"
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
            Sector Incharge Contact
          </Heading>
          {/* <Text
            textTransform={"capitalize"}
            fontSize="md"
            _light={{
              color: "primary.800",
            }}
            _dark={{
              color: "gray.50",
            }}
            fontWeight="500"
          >
            {data?.sectorincharge_contact
              ? data?.sectorincharge_contact
              : "Not added"}
          </Text> */}
          <PhoneCall
            number={
              data?.sectorincharge_contact
                ? data?.sectorincharge_contact
                : "Not added"
            }
          />
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
            BLO
          </Heading>
          <Text
            fontSize="md"
            _light={{
              color: "primary.800",
            }}
            _dark={{
              color: "gray.50",
            }}
            fontWeight="500"
            textTransform={"capitalize"}
          >
            {data?.blo_name ? data?.blo_name : "Not added"}
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
            BLO Contact
          </Heading>
          <Text
            fontSize="md"
            _light={{
              color: "primary.800",
            }}
            _dark={{
              color: "gray.50",
            }}
            fontWeight="500"
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

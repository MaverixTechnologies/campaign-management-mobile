import React from "react";
import {
  Text,
  //   ScrollView,
  //   FlatList,
  VStack,
  HStack,
  Icon,
  Flex,
  //   IconButton,
  //   Pressable,
} from "native-base";
import { SimpleLineIcons } from "@expo/vector-icons";
const VoterCard = ({ data }) => {
  return (
    <HStack alignItems="center" pl={2} w={"100%"}>
      <Flex
        borderColor={"primary.500"}
        bgColor={"primary.100"}
        borderWidth={1}
        rounded={8}
        p={2}
      >
        <Icon
          as={SimpleLineIcons}
          size={"lg"}
          name={
            data?.gender === "MALE"
              ? "user-male"
              : data?.gender === "FEMALE"
              ? "user-female"
              : "star"
          }
          variant={"outline"}
          color={"primary.600"}
          _dark={{
            color: "warmGray.50",
          }}
        />
      </Flex>
      {/* <Text
        color="coolGray.800"
        _dark={{
          color: "warmGray.50",
        }}
        bold
        fontSize="lg"
        w={"12%"}
      >
        #{data?.number}
      </Text> */}
      <VStack
        pl="4"
        pr="5"
        py="2"
        alignItems="flex-start"
        justifyContent={"space-between"}
        space={1}
        w={"87%"}
      >
        <HStack w={"100%"} alignItems="center" justifyContent={"space-between"}>
          <Text
            fontSize={"md"}
            color="coolGray.600"
            _dark={{
              color: "warmGray.200",
            }}
            bold
          >
            {data?.full_name}
          </Text>
          <HStack
            alignItems="center"
            space={3}
            borderRadius={"full"}
            backgroundColor={"rose.100"}
            _dark={{
              backgroundColor: "rose.200",
            }}
            px={2}
          >
            <Text
              fontSize="xs"
              color="gray.900"
              _dark={{
                color: "rose.600",
              }}
              alignSelf="flex-end"
            >
              {data.sector?.name}
            </Text>
          </HStack>
        </HStack>
        <HStack alignItems="center" space={3}>
          <Text
            color="primary.800"
            _dark={{
              color: "warmGray.50",
            }}
            fontSize="xs"
          >
            BLA -
          </Text>
          <Text
            color="primary.800"
            _dark={{
              color: "warmGray.200",
            }}
            fontSize="xs"
          >
            {data.boothlevelagent
              ? data.boothlevelagent?.full_name
              : "Not added"}
          </Text>
        </HStack>
        <HStack alignItems="center" space={3}>
          <Text
            color="primary.800"
            _dark={{
              color: "warmGray.50",
            }}
            fontSize="xs"
          >
            Sector Incharge -
          </Text>
          <Text
            color="primary.800"
            _dark={{
              color: "warmGray.200",
            }}
            fontSize="xs"
          >
            {data.sector.sectorincharge
              ? data.sector?.sectorincharge?.full_name
              : "Not added"}
          </Text>
        </HStack>
      </VStack>
    </HStack>
  );
};

export default VoterCard;

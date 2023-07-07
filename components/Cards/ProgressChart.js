import React from "react";
import {
  Box,
  Heading,
  Text,
  Icon,
  VStack,
  HStack,
  Progress,
  Flex,
  // Flex,
} from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ProgressChart = ({ width, data, screenWidth }) => {
  const total = data.reduce((n, { count }) => n + count, 0);
  console.log("Total - ", total);
  return (
    <Box
      w={screenWidth > 800 ? "800" : screenWidth - 20}
      borderBottomRadius={8}
      borderTopRightRadius={8}
      overflow="scroll"
      _dark={{
        backgroundColor: "primary.700",
      }}
      _light={{
        backgroundColor: "white",
      }}
    >
      <VStack w={width} py="3" px="8" space={2}>
        {data.map((item, i) => (
          <HStack
            key={i}
            space={2}
            alignItems={"center"}
            justifyContent={"flex-start"}
          >
            <HStack space={2} w={"15%"}>
              {item?.icon ? (
                <Icon
                  as={MaterialCommunityIcons}
                  size={"sm"}
                  name={item?.icon}
                  variant={"outline"}
                  color={item?.color}
                />
              ) : null}
              <Heading
                size="xs"
                _light={{
                  color: "primary.700",
                }}
                _dark={{
                  color: "primary.50",
                }}
              >
                {item?.name}
              </Heading>
            </HStack>
            <HStack
              space={4}
              alignItems={"center"}
              justifyContent={"space-between"}
              w={"85%"}
            >
              <Flex w="60%" maxW="60%">
                <Progress
                  value={item?.count}
                  max={total}
                  rounded="full"
                  _filledTrack={{
                    bg: item?.color,
                  }}
                  size={"sm"}
                  mx="4"
                />
              </Flex>
              <Text
                fontSize="sm"
                _light={{
                  color: "primary.700",
                }}
                _dark={{
                  color: "primary.50",
                }}
                fontWeight="500"
              >
                {item?.count} -{`${((item?.count / total) * 100).toFixed(1)}%`}
              </Text>
            </HStack>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};
export default ProgressChart;

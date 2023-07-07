import React from "react";
import { Box, Heading, Text, Icon, VStack, HStack } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CounterStatsCard = ({ width, data, screenWidth }) => {
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
            justifyContent={"space-between"}
          >
            <HStack space={2}>
              <Icon
                as={MaterialCommunityIcons}
                size={"sm"}
                name={"circle"}
                variant={"outline"}
                color={item?.color}
              />
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
              {item?.count}
            </Text>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};
export default CounterStatsCard;

import React from "react";
import { Box, Heading, Text, Icon, VStack, Pressable } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const FilterCard = ({
  heading,
  text,
  width,
  //   borderColor,
  //   bg,
  onClick,
  icon,
  //   iconColor,
}) => {
  return (
    <Pressable
      w={width}
      safeArea
      onPress={onClick}
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
      {/* <Box
        w={width}
        borderBottomRadius={8}
        borderTopRightRadius={8}
        overflow="scroll"
        _dark={{
          backgroundColor: "primary.700",
        }}
        _light={{
          backgroundColor: "white",
        }}
      > */}
      <VStack py="3" px="4" space={2}>
        <Icon
          as={MaterialCommunityIcons}
          size={"lg"}
          name={icon}
          variant={"outline"}
          color={"secondary.600"}
          //   _dark={{
          //     color: "warmGray.50",
          //   }}
        />

        <Heading
          size="sm"
          _light={{
            color: "primary.700",
          }}
          _dark={{
            color: "primary.50",
          }}
        >
          {heading}
        </Heading>
        <Text
          fontSize="xl"
          _light={{
            color: "primary.700",
          }}
          _dark={{
            color: "primary.50",
          }}
          fontWeight="500"
        >
          {text}
        </Text>
      </VStack>
      {/* </Box> */}
    </Pressable>
  );
};
export default FilterCard;

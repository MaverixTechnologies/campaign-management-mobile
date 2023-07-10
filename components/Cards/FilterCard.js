import React from "react";
import { Heading, Text, Icon, Stack, Pressable } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const FilterCard = ({
  heading,
  text,
  width,
  //   borderColor,
  //   bg,
  onClick,
  icon,
  type,
  //   iconColor,
}) => {
  return (
    <Pressable
      w={width}
      safeArea
      onPress={onClick}
      borderBottomRadius={8}
      borderTopRightRadius={8}
      borderWidth={2}
      borderColor={"gray.50"}
      overflow="scroll"
      _dark={{
        backgroundColor: "primary.700",
      }}
      _light={{
        backgroundColor: type === "advance" ? "secondary.50" : "white",
      }}
    >
      <Stack
        pt={type === "advance" ? 3 : 3}
        pb={type === "advance" ? 3 : 2}
        px="4"
        justifyContent={type === "advance" ? "center" : "center"}
        alignItems={type === "advance" ? "center" : "flex-start"}
        space={type === "advance" ? 4 : 2}
        direction={type === "advance" ? "row" : "column"}
      >
        <Icon
          as={MaterialCommunityIcons}
          size={"lg"}
          name={icon}
          variant={"outline"}
          color={"secondary.600"}
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
      </Stack>
    </Pressable>
  );
};
export default FilterCard;

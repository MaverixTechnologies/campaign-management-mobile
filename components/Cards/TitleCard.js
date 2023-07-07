import React from "react";
import {
  Button,
  Flex,
  HStack,
  Heading,
  Icon,
  Text,
  // HStack,
  VStack,
} from "native-base";
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
import { Feather } from "@expo/vector-icons";

const TitleCard = ({
  bg,
  borderColor,
  icon,
  iconColor,
  heading,
  subheading,
  isMore,
  onClick,
}) => {
  return (
    <HStack
      p={2}
      // space={2}
      pb={4}
      alignItems={"center"}
      justifyContent={"space-between"}
      w={screenWidth > 800 ? "800" : screenWidth - 20}
      // overflow={"scroll"}
    >
      <HStack space={4}>
        <Flex
          borderColor={borderColor}
          bgColor={bg}
          borderWidth={1}
          rounded={8}
          p={2}
        >
          <Icon
            as={Feather}
            size={"lg"}
            name={icon}
            variant={"outline"}
            color={iconColor}
            _dark={{
              color: "warmGray.50",
            }}
          />
        </Flex>
        <VStack>
          <HStack alignItems={"center"} justifyContent={"space-between"}>
            <Heading size={"md"}>{heading}</Heading>
          </HStack>
          <Text fontSize={"xs"}>{subheading}</Text>
        </VStack>
      </HStack>
      {isMore ? (
        <Button
          iconRight
          variant={"ghost"}
          bgColor={"transparent"}
          fontWeight={700}
          rightIcon={<Icon as={Feather} name="arrow-right" size="md" />}
          onPress={onClick}
        >
          View All
        </Button>
      ) : null}
    </HStack>
  );
};

export default TitleCard;

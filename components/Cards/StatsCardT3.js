import React from "react";
import {
  Stack,
  Heading,
  Text,
  Skeleton,
  Pressable,
  HStack,
  Icon,
  //   Button,
} from "native-base";
import { Feather } from "@expo/vector-icons";
const StatsCardT3 = ({ heading, text, width, isLoaded, onClick }) => {
  return (
    <Pressable
      w={width}
      borderBottomRadius={8}
      borderTopRightRadius={8}
      borderWidth={2}
      borderColor={"gray.100"}
      overflow="scroll"
      onPress={onClick}
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
      <Stack py="4" px="4" space={2}>
        <Heading
          size="xs"
          _light={{
            color: "primary.800",
          }}
          _dark={{
            color: "primary.50",
          }}
        >
          {heading}
        </Heading>
        <Skeleton.Text lines={1} isLoaded={isLoaded}>
          <HStack justifyContent={"space-between"} alignItems={"flex-end"}>
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
            {/* <HStack alignItems={"center"}> */}
            <Icon
              as={Feather}
              name="external-link"
              color="warmGray.300"
              _dark={{
                color: "warmGray.50",
              }}
            />

            {/* </HStack> */}
            {/* <Button
              size={"sm"}
              variant={"unstyled"}
              bg={"transparent"}
              color="primary.100"
              leftIcon={<Icon as={Feather} name="external-link" size="sm" />}
            >
              More
            </Button> */}
          </HStack>
        </Skeleton.Text>
      </Stack>
    </Pressable>
  );
};
export default StatsCardT3;

import React from "react";
import { Stack, Heading, Text, HStack, Pressable, Skeleton } from "native-base";
const StatsCardT2 = ({
  heading,
  text,
  width,
  subheading,
  text2,
  onClick,
  isLoaded,
}) => {
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
      <Stack py="4" px="4" space={0}>
        <HStack justifyContent={"space-between"} alignItems={"flex-start"}>
          <Skeleton.Text lines={2} isLoaded={isLoaded}>
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
          </Skeleton.Text>
        </HStack>
        <HStack justifyContent={"space-between"} alignItems={"flex-start"}>
          {/* <Skeleton.Text lines={1} isLoaded={isLoaded}> */}
          <Text
            fontSize="xs"
            _light={{
              color: "secondary.600",
            }}
            _dark={{
              color: "secondary.100",
            }}
          >
            {subheading} -{/* {text2} */}
          </Text>
          <Text
            fontSize="xs"
            _light={{
              color: "primary.700",
            }}
            _dark={{
              color: "primary.50",
            }}
            fontWeight="500"
          >
            {text2}
          </Text>
          {/* </Skeleton.Text> */}
        </HStack>
      </Stack>
    </Pressable>
  );
};
export default StatsCardT2;

import React from "react";
import { Box, Stack, Heading, Text, VStack, Skeleton } from "native-base";
const GraphCard = ({ heading, text, children, width, isLoaded }) => {
  return (
    <Box
      w={width}
      rounded={8}
      overflow="scroll"
      _light={{
        backgroundColor: "primary.50",
        borderColor: "primary.300",
      }}
    >
      <Stack
        py={4}
        space={1}
        alignItems={"center"}
        justifyContent={"center"}
        px={4}
      >
        <Skeleton h="40" startColor={"blue.50"} isLoaded={isLoaded}>
          <Box>{children}</Box>
        </Skeleton>
        <VStack>
          <Heading
            size="sm"
            _light={{
              color: "gray.600",
            }}
            _dark={{
              color: "gray.50",
            }}
          >
            {heading}
          </Heading>
          <Text
            fontSize="sm"
            _light={{
              color: "gray.600",
            }}
            _dark={{
              color: "gray.50",
            }}
            textAlign={"left"}
          >
            {text}
          </Text>
        </VStack>
      </Stack>
    </Box>
  );
};
export default GraphCard;

import React from "react";
import { Box, Stack, Heading, Text, VStack } from "native-base";
const GraphCard = ({ heading, text, children, width }) => {
  return (
    <Box
      w={width}
      rounded={8}
      overflow="scroll"
      // _dark={{
      //   backgroundColor: "gray.700",
      // }}
      _light={{
        backgroundColor: "primary.50",
        borderColor: "primary.300",
      }}
      // px="4"
    >
      <Stack
        py={4}
        space={1}
        alignItems={"center"}
        justifyContent={"center"}
        px={4}
      >
        <Box>{children}</Box>
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

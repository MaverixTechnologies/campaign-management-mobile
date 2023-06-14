import React from "react";
import { Box, Stack, Heading, Text } from "native-base";
const GraphCard = ({ heading, text, children, width }) => {
  return (
    <Box
      w={width}
      rounded="lg"
      overflow="scroll"
      borderColor="coolGray.200"
      borderWidth="1"
      _dark={{
        borderColor: "coolGray.600",
        backgroundColor: "gray.700",
      }}
      _web={{
        shadow: 2,
        borderWidth: 0,
      }}
      _light={{
        backgroundColor: "rgba(250,250,250,0.64)",
        borderColor: "coolGray.200",
      }}
      px="2"
    >
      <Stack py="4" space={1} alignItems={"center"}>
        <Heading size="md" ml="-1">
          {heading}
        </Heading>
        <Text
          fontSize="md"
          _light={{
            color: "blue.500",
          }}
          _dark={{
            color: "violet.400",
          }}
          fontWeight="500"
          ml="-0.5"
          mt="-1"
        >
          {text}
        </Text>
        <Box> {children}</Box>
      </Stack>
    </Box>
  );
};
export default GraphCard;

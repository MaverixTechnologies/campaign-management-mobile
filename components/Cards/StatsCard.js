import React from "react";
import { Box, Stack, Heading, Text } from "native-base";
const StatsCard = ({ heading, text, width }) => {
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
      <Stack py="3" px="4" space={3}>
        <Heading
          size="xs"
          ml="-1"
          _light={{
            color: "gray.500",
          }}
          _dark={{
            color: "gray.50",
          }}
        >
          {heading}
        </Heading>
        <Text
          fontSize="2xl"
          _light={{
            color: "gray.800",
          }}
          _dark={{
            color: "gray.50",
          }}
          fontWeight="500"
          ml="-0.5"
          mt="-1"
        >
          {text}
        </Text>
      </Stack>
    </Box>
  );
};
export default StatsCard;

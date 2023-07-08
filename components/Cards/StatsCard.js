import React from "react";
import { Box, Stack, Heading, Text, Skeleton } from "native-base";
const StatsCard = ({ heading, text, width, isLoaded }) => {
  return (
    <Box
      w={width}
      borderBottomRadius={8}
      borderTopRightRadius={8}
      overflow="scroll"
      borderWidth={2}
      borderColor={"gray.100"}
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
      </Stack>
    </Box>
  );
};
export default StatsCard;

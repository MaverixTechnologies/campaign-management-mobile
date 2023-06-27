import React from "react";
import { VStack, Stack } from "native-base";
import StatsCard from "../../components/Cards/StatsCard";
const BLACardsStack = ({ screenWidth, data }) => {
  return (
    <VStack space={4}>
      <Stack
        flexDirection={screenWidth > 300 ? "row" : "column"}
        justifyContent={screenWidth > 300 ? "space-between" : "center"}
        alignItems={screenWidth > 300 ? "space-between" : "center"}
        space={6}
        w={screenWidth > 800 ? "800" : screenWidth - 20}
      >
        <StatsCard
          heading={"Voters"}
          text={478}
          width={screenWidth > 800 ? "380" : screenWidth > 300 ? "48%" : "full"}
          bg="gray.50"
        />
        <StatsCard
          heading={"Voters Added"}
          text={data?.total_voters_added}
          width={screenWidth > 800 ? "380" : screenWidth > 300 ? "48%" : "full"}
          bg="gray.50"
        />
      </Stack>
    </VStack>
  );
};

export default BLACardsStack;

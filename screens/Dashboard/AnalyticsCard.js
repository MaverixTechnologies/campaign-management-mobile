import React from "react";
import { VStack, Stack } from "native-base";
import StatsCard from "../../components/Cards/StatsCard";
import { PieChart } from "react-native-chart-kit";
import { chartConfig } from "../../components/Charts/chartConfig";
import GraphCard from "../../components/Cards/GraphCard";

const CardsStack = ({ screenWidth, data, chartData }) => {
  return (
    <VStack space={"4"}>
      <Stack
        flexDirection={screenWidth > 300 ? "row" : "column"}
        justifyContent={screenWidth > 300 ? "space-around" : "center"}
        alignItems={screenWidth > 300 ? "space-between" : "center"}
        space={4}
        w={screenWidth > 800 ? "800" : screenWidth - 20}
      >
        <StatsCard
          heading={"Voters"}
          text={170568}
          width={screenWidth > 800 ? "380" : screenWidth > 300 ? "45%" : "full"}
          bg="white"
        />
        <StatsCard
          heading={"Added Voters"}
          text={data?.total_voters_added}
          width={screenWidth > 800 ? "380" : screenWidth > 300 ? "45%" : "full"}
          bg="white"
        />
      </Stack>
      <GraphCard
        heading={"Gender wise voters distribution"}
        width={screenWidth > 800 ? 800 : screenWidth - 20}
      >
        <PieChart
          data={chartData}
          width={screenWidth > 800 ? 800 : screenWidth - 40}
          height={200}
          chartConfig={chartConfig}
          accessor={"population"}
          backgroundColor={"transparent"}
          paddingLeft={"15"}
        />
      </GraphCard>
    </VStack>
  );
};

export default CardsStack;

import React from "react";
import { Center, ScrollView, HStack, VStack, Heading } from "native-base";
import StatsCard from "../../components/Cards/StatsCard";
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { chartConfig } from "../../components/Charts/chartConfig";
const screenWidth = Dimensions.get("window").width;

const Pollings = () => {
  const data = [
    {
      name: "Seoul",
      population: 21500000,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Toronto",
      population: 2800000,
      color: "#F00",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Beijing",
      population: 527612,
      color: "red",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "New York",
      population: 8538000,
      color: "#ffffff",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Moscow",
      population: 11920000,
      color: "rgb(0, 0, 255)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];
  return (
    <ScrollView>
      <VStack p={2} space={4}>
        <Center>
          <HStack space={6}>
            <StatsCard heading={"Mandals"} text={8} width={140} bg="gray.50" />
            <StatsCard heading={"Sectors"} text={18} width={140} bg="gray.50" />
          </HStack>
        </Center>
        <Center>
          <HStack space={6}>
            <StatsCard heading={"Booths"} text={120} width={140} bg="gray.50" />
            <StatsCard
              heading={"Pollings"}
              text={232}
              width={140}
              bg="gray.50"
            />
          </HStack>
        </Center>
        <Center px="4">
          <StatsCard
            heading={"Total Voters Added"}
            text={232}
            width="full"
            bg="primary.100"
          />
        </Center>
        <Center p="4">
          <Heading size="md" ml="-1">
            Constituency Distribution
          </Heading>
          <PieChart
            data={data}
            width={screenWidth - 10}
            height={200}
            chartConfig={chartConfig}
            accessor={"population"}
            backgroundColor={"transparent"}
            paddingLeft={"15"}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
};

export default Pollings;

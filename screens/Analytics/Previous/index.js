import React from "react";
import { VStack, Stack } from "native-base";
import StatsCard from "../../../components/Cards/StatsCard";
import StatsCardT2 from "../../../components/Cards/StatsCardT2";
import { PieChart } from "react-native-chart-kit";
import { chartConfig } from "../../../components/Charts/chartConfig";
import GraphCard from "../../../components/Cards/GraphCard";
import TitleCard from "../../../components/Cards/TitleCard";
import FilterCard from "../../../components/Cards/FilterCard";

const Previous = ({ screenWidth, data, chartData }) => {
  return (
    <VStack space={"0"} w={"100%"} alignItems={"center"}>
      <VStack
        bg={{
          linearGradient: {
            colors: ["secondary.50", "blue.100"],
            start: [0, 0],
            end: [0, 1],
          },
        }}
        // bg={"gray.50"}
        space={"4"}
        pt={4}
        pb={6}
        w={"100%"}
        alignItems={"center"}
      >
        <TitleCard
          bg={"blue.50"}
          borderColor={"primary.400"}
          icon={"pie-chart"}
          iconColor={"primary.400"}
          heading={"Voters Stats"}
          subheading={`Voter's statistics of the constituency`}
          isMore={true}
        />
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
            width={
              screenWidth > 800 ? "380" : screenWidth > 300 ? "45%" : "full"
            }
            bg="white"
          />
          <StatsCard
            heading={"Added Voters"}
            text={data?.total_voters_added}
            width={
              screenWidth > 800 ? "380" : screenWidth > 300 ? "45%" : "full"
            }
            bg="white"
          />
        </Stack>
        <GraphCard
          heading={"Gender wise (total) voters distribution"}
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
      <VStack
        bg={{
          linearGradient: {
            colors: ["secondary.50", "secondary.100"],
            start: [0, 0],
            end: [0, 1],
          },
        }}
        space={"4"}
        pt={4}
        pb={6}
        w={"100%"}
        alignItems={"center"}
      >
        <TitleCard
          bg={"secondary.50"}
          borderColor={"secondary.400"}
          icon={"map-pin"}
          iconColor={"secondary.400"}
          heading={"Zone Stats"}
          subheading={`Zonal statistics of the constituency`}
          isMore={true}
        />
        <Stack
          flexDirection={screenWidth > 300 ? "row" : "column"}
          justifyContent={screenWidth > 300 ? "space-between" : "center"}
          alignItems={screenWidth > 300 ? "space-between" : "center"}
          space={6}
          w={screenWidth > 800 ? "800" : screenWidth - 20}
        >
          <StatsCardT2
            heading={"Mandals"}
            subheading={"Mandal Incharges"}
            text={data?.total_mandals}
            text2={data?.total_mics}
            width={
              screenWidth > 800 ? "380" : screenWidth > 300 ? "48%" : "full"
            }
          />
          <StatsCardT2
            heading={"Sectors"}
            subheading={"Sector Incharges"}
            text={data?.total_sectors}
            text2={data?.total_sics}
            width={
              screenWidth > 800 ? "380" : screenWidth > 300 ? "48%" : "full"
            }
          />
        </Stack>

        <Stack
          flexDirection={screenWidth > 300 ? "row" : "column"}
          justifyContent={screenWidth > 300 ? "space-between" : "center"}
          alignItems={screenWidth > 300 ? "space-between" : "center"}
          space={6}
          w={screenWidth > 800 ? "800" : screenWidth - 20}
        >
          <StatsCardT2
            heading={"Booths"}
            subheading={"BLAs"}
            text={data?.total_polling_booths}
            text2={data?.total_blas}
            width={
              screenWidth > 800 ? "380" : screenWidth > 300 ? "48%" : "full"
            }
          />
          <StatsCardT2
            heading={"Pollings"}
            subheading={"PAs"}
            text={data?.total_polling_booths}
            text2={data?.total_pas}
            width={
              screenWidth > 800 ? "380" : screenWidth > 300 ? "48%" : "full"
            }
          />
        </Stack>
      </VStack>
      <VStack
        bg={{
          linearGradient: {
            colors: ["primary.50", "emerald.100"],
            start: [0, 0],
            end: [0, 1],
          },
        }}
        space={"4"}
        pt={4}
        pb={4}
        w={"100%"}
        alignItems={"center"}
      >
        <TitleCard
          bg={"teal.50"}
          borderColor={"teal.400"}
          icon={"filter"}
          iconColor={"teal.400"}
          heading={"Filter Voters"}
          subheading={`Filter voters of the constituency`}
        />
        <Stack
          flexDirection={screenWidth > 300 ? "row" : "column"}
          justifyContent={screenWidth > 300 ? "space-between" : "center"}
          alignItems={screenWidth > 300 ? "space-between" : "center"}
          space={6}
          w={screenWidth > 800 ? "800" : screenWidth - 20}
        >
          <FilterCard
            heading={"By First Name"}
            icon={"format-letter-case-upper"}
            width={
              screenWidth > 800 ? "380" : screenWidth > 300 ? "48%" : "full"
            }
          />
          <FilterCard
            heading={"By Last Name"}
            icon={"signature-text"}
            width={
              screenWidth > 800 ? "380" : screenWidth > 300 ? "48%" : "full"
            }
          />
        </Stack>
        <Stack
          flexDirection={screenWidth > 300 ? "row" : "column"}
          justifyContent={screenWidth > 300 ? "space-between" : "center"}
          alignItems={screenWidth > 300 ? "space-between" : "center"}
          space={6}
          w={screenWidth > 800 ? "800" : screenWidth - 20}
        >
          <FilterCard
            heading={"By Age Range"}
            icon={"calendar-range-outline"}
            width={
              screenWidth > 800 ? "380" : screenWidth > 300 ? "48%" : "full"
            }
          />

          <FilterCard
            heading={"By Caste"}
            icon={"tag-text-outline"}
            width={
              screenWidth > 800 ? "380" : screenWidth > 300 ? "48%" : "full"
            }
          />
        </Stack>
        <Stack
          flexDirection={screenWidth > 300 ? "row" : "column"}
          justifyContent={screenWidth > 300 ? "space-between" : "center"}
          alignItems={screenWidth > 300 ? "space-between" : "center"}
          space={6}
          w={screenWidth > 800 ? "800" : screenWidth - 20}
        >
          <FilterCard
            heading={"By Category"}
            icon={"badge-account-outline"}
            width={
              screenWidth > 800 ? "380" : screenWidth > 300 ? "48%" : "full"
            }
          />
          <FilterCard
            heading={"By Gender"}
            icon={"human-male-female"}
            width={
              screenWidth > 800 ? "380" : screenWidth > 300 ? "48%" : "full"
            }
          />
        </Stack>
        <Stack
          flexDirection={screenWidth > 300 ? "row" : "column"}
          justifyContent={screenWidth > 300 ? "space-around" : "center"}
          alignItems={screenWidth > 300 ? "space-between" : "center"}
          space={6}
          w={screenWidth > 800 ? "800" : screenWidth - 20}
        >
          <FilterCard
            heading={"By Dead/Alive"}
            icon={"account-alert-outline"}
            width={
              screenWidth > 800 ? "380" : screenWidth > 300 ? "48%" : "full"
            }
          />
          <FilterCard
            heading={"By Region"}
            icon={"map-marker-account-outline"}
            width={
              screenWidth > 800 ? "380" : screenWidth > 300 ? "48%" : "full"
            }
          />
        </Stack>
      </VStack>
    </VStack>
  );
};

export default Previous;

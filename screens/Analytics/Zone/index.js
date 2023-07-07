import React from "react";
import { VStack, Stack } from "native-base";
import StatsCardT2 from "../../../components/Cards/StatsCardT2";
import TitleCard from "../../../components/Cards/TitleCard";

const Zone = ({ screenWidth, data }) => {
  return (
    <VStack space={"0"} w={"100%"} alignItems={"center"}>
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
            text2={data?.total_pas * 2}
            width={
              screenWidth > 800 ? "380" : screenWidth > 300 ? "48%" : "full"
            }
          />
        </Stack>
      </VStack>
    </VStack>
  );
};

export default Zone;

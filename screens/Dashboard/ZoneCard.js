import React from "react";
import { VStack, Stack } from "native-base";
import StatsCard from "../../components/Cards/StatsCard";

const ZoneCard = ({ screenWidth, data }) => {
  return (
    <VStack space={"4"}>
      <Stack
        flexDirection={screenWidth > 300 ? "row" : "column"}
        justifyContent={screenWidth > 300 ? "space-between" : "center"}
        alignItems={screenWidth > 300 ? "space-between" : "center"}
        space={6}
        w={screenWidth > 800 ? "800" : screenWidth - 20}
      >
        <StatsCard
          heading={"Mandal Incharges"}
          text={`${data?.total_mics}/${data?.total_mandals}`}
          width={screenWidth > 800 ? "380" : screenWidth > 300 ? "48%" : "full"}
        />
        <StatsCard
          heading={"Sectors Incharges"}
          text={`${data?.total_sics}/${data?.total_sectors}`}
          width={screenWidth > 800 ? "380" : screenWidth > 300 ? "48%" : "full"}
        />
      </Stack>

      <Stack
        flexDirection={screenWidth > 300 ? "row" : "column"}
        justifyContent={screenWidth > 300 ? "space-between" : "center"}
        alignItems={screenWidth > 300 ? "space-between" : "center"}
        space={6}
        w={screenWidth > 800 ? "800" : screenWidth - 20}
      >
        <StatsCard
          heading={"BLAs"}
          text={`${data?.total_blas}/${data?.total_polling_booths}`}
          width={screenWidth > 800 ? "380" : screenWidth > 300 ? "48%" : "full"}
        />
        <StatsCard
          heading={"PAs"}
          text={`${data?.total_pas}/${data?.total_polling_booths * 2}`}
          width={screenWidth > 800 ? "380" : screenWidth > 300 ? "48%" : "full"}
        />
      </Stack>
    </VStack>
  );
};

export default ZoneCard;

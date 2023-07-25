import React from "react";
import { VStack, Stack, Spacer, Text, HStack, Box } from "native-base";
import TitleCard from "../../components/Cards/TitleCard";
import StatsCard from "../../components/Cards/StatsCard";
import InfoCard from "./InfoCard";
import { useNavigation } from "@react-navigation/native";
const PACardsStack = ({ screenWidth, data, itemId, isLoaded }) => {
  const navigation = useNavigation();
  return (
    <VStack space={"0"} w={"100%"} alignItems={"center"}>
      <VStack
        bg={{
          linearGradient: {
            colors: ["primary.50", "fuchsia.100"],
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
          heading={`#${data?.pollingbooth_number} ${data?.sector_name} booth Info`}
          subheading={`Details of polling booth`}
          isLoaded={isLoaded}
        />
        <InfoCard data={data} screenWidth={screenWidth} />
      </VStack>
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
          onClick={() =>
            navigation.navigate("Voters Analytics", {
              zone: "booth",
              zone_id: itemId,
            })
          }
          isLoaded={isLoaded}
        />
        <Stack
          flexDirection={screenWidth > 300 ? "row" : "column"}
          justifyContent={screenWidth > 300 ? "space-around" : "center"}
          alignItems={screenWidth > 300 ? "space-between" : "center"}
          space={4}
          w={screenWidth > 800 ? "800" : screenWidth - 20}
        >
          <StatsCard
            heading={"Total Voters"}
            text={data?.total_voters}
            width={
              screenWidth > 800 ? "380" : screenWidth > 300 ? "45%" : "full"
            }
            bg="white"
            isLoaded={isLoaded}
          />
          <StatsCard
            heading={"Added Voters"}
            text={data?.total_voters_added}
            width={
              screenWidth > 800 ? "380" : screenWidth > 300 ? "45%" : "full"
            }
            bg="white"
            isLoaded={isLoaded}
          />
        </Stack>
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
          heading={"Recently Added Voters"}
          subheading={`Last 5 added voters list`}
          isLoaded={isLoaded}
        />
        <Stack space={1} w={screenWidth > 800 ? "800" : screenWidth - 20}>
          {data?.last_5_voters_added_by_agent.map((item, i) => {
            return (
              <Box
                borderWidth={2}
                borderColor={"gray.100"}
                borderBottomRadius={8}
                borderTopRightRadius={8}
                p="2"
                key={i}
                bg="secondary.50"
              >
                <HStack
                  alignItems="flex-start"
                  justifyContent={"space-between"}
                  space={1}
                >
                  <HStack alignItems="center" space={3}>
                    <VStack space={1}>
                      <Text
                        color="coolGray.800"
                        _dark={{
                          color: "warmGray.50",
                        }}
                        bold
                      >
                        {item?.full_name}
                      </Text>
                      <Text
                        color="coolGray.600"
                        _dark={{
                          color: "warmGray.200",
                        }}
                      >
                        Age - {item?.age}
                      </Text>
                    </VStack>
                  </HStack>
                  <Spacer />
                  <VStack
                    alignItems={"flex-end"}
                    pr={2}
                    space={2}
                    justifyContent={"flex-start"}
                  >
                    <Text
                      fontSize="xs"
                      color="secondary.600"
                      _dark={{
                        color: "warmGray.50",
                      }}
                      alignSelf="flex-end"
                    >
                      {item?.epic_number ? item?.epic_number : "NA"}
                    </Text>

                    <HStack>
                      <Text
                        fontSize="xs"
                        color="primary.800"
                        _dark={{
                          color: "warmGray.50",
                        }}
                        alignSelf="flex-end"
                      >
                        {item?.contact_number ? item?.contact_number : "NA"}
                      </Text>
                    </HStack>
                  </VStack>
                </HStack>
              </Box>
            );
          })}
        </Stack>
      </VStack>
    </VStack>
  );
};

export default PACardsStack;

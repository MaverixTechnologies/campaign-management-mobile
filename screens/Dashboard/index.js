import React, { useCallback, useState } from "react";
import { Center, ScrollView, VStack, Spinner } from "native-base";
import MLACardsStack from "./CardsStack";
import MICardsStack from "../Mandals/CardsStack";
import SICardsStack from "../Sectors/CardsStack";
import BLACardsStack from "../Booths/BLACardsStack";
import { Dimensions } from "react-native";
import MLAInfoCard from "./InfoCard";
// import MIInfoCard from "../Mandals/InfoCard";
// import SIInfoCard from "../Sectors/InfoCard";
// import BLAInfoCard from "../Booths/InfoCard";
const screenWidth = Dimensions.get("window").width;
import { useFocusEffect } from "@react-navigation/native";
import { ApiService } from "../../lib/axios";
import { useSelector } from "react-redux";
const screenHeight = Dimensions.get("window").height;

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const { userProfile } = useSelector((state) => state.auth);
  const data = [
    {
      name: "MALE",
      population: 27566,
      color: "#5095D9",
      legendFontColor: "#5095D9",
      legendFontSize: 15,
    },
    {
      name: "FEMALE",
      population: 25452,
      color: "#FFB59F",
      legendFontColor: "#FFB59F",
      legendFontSize: 15,
    },
    {
      name: "THIRD",
      population: 440,
      color: "#a855f7",
      legendFontColor: "#a855f7",
      legendFontSize: 15,
    },
  ];
  const GetDashboard = () => {
    ApiService.getDashboard()
      .then((e) => {
        setDashboardData(e.data);
        setIsLoaded(true);
      })
      .catch(() => {
        setIsLoaded(true);
      });
  };
  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      // GetProfile();
      GetDashboard();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );
  return (
    <ScrollView bgColor={"primary.50"}>
      {isLoaded ? (
        <VStack
          alignSelf={"center"}
          w={"100%"}
          space={2}
          maxWidth={"800"}
          pb={8}
        >
          <Center p={0}>
            {userProfile?.role === "MLA" || userProfile?.role === "ADMIN" ? (
              <MLAInfoCard
                isLoaded={isLoaded}
                screenWidth={screenWidth}
                data={dashboardData}
              />
            ) : // userProfile?.role === "MANDAL_INCHARGE" ? (
            //   <MIInfoCard
            //     isLoaded={isLoaded}
            //     screenWidth={screenWidth}
            //     data={dashboardData}
            //   />
            // ) : userProfile?.role === "SECTOR_INCHARGE" ? (
            //   <SIInfoCard
            //     isLoaded={isLoaded}
            //     screenWidth={screenWidth}
            //     data={dashboardData}
            //   />
            // ) : userProfile?.role === "BOOTH_LEVEL_AGENT" ? (
            //   <BLAInfoCard
            //     isLoaded={isLoaded}
            //     screenWidth={screenWidth}
            //     data={dashboardData}
            //   />
            // ) :
            null}
          </Center>
          <Center w={"100%"}>
            {userProfile?.role === "MLA" || userProfile?.role === "ADMIN" ? (
              <MLACardsStack
                screenWidth={screenWidth}
                data={dashboardData}
                chartData={data}
                isLoaded={isLoaded}
              />
            ) : userProfile?.role === "MANDAL_INCHARGE" ? (
              <MICardsStack
                isLoaded={isLoaded}
                screenWidth={screenWidth}
                data={dashboardData}
              />
            ) : userProfile?.role === "SECTOR_INCHARGE" ? (
              <SICardsStack
                isLoaded={isLoaded}
                screenWidth={screenWidth}
                data={dashboardData}
              />
            ) : userProfile?.role === "BOOTH_LEVEL_AGENT" ? (
              <BLACardsStack
                isLoaded={isLoaded}
                screenWidth={screenWidth}
                data={dashboardData}
              />
            ) : null}
          </Center>
        </VStack>
      ) : (
        <Center h={screenHeight - 80}>
          <Spinner size={"lg"} />
        </Center>
      )}
    </ScrollView>
  );
};

export default Dashboard;

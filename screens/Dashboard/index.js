import React, { useCallback, useState } from "react";
import { Center, ScrollView, VStack } from "native-base";
import MLACardsStack from "./CardsStack";
import MICardsStack from "../Mandals/CardsStack";
import SICardsStack from "../Sectors/CardsStack";
import BLACardsStack from "../Booths/BLACardsStack";
import { Dimensions } from "react-native";
import MLAInfoCard from "./InfoCard";
import MIInfoCard from "../Mandals/InfoCard";
import SIInfoCard from "../Sectors/InfoCard";
import BLAInfoCard from "../Booths/InfoCard";
const screenWidth = Dimensions.get("window").width;
import { useFocusEffect } from "@react-navigation/native";
import { ApiService } from "../../lib/axios";
import { useSelector } from "react-redux";
const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({});
  const { userProfile } = useSelector((state) => state.auth);
  const data = [
    {
      name: "Male",
      population: 80568,
      color: "#5095D9",
      legendFontColor: "#5095D9",
      legendFontSize: 15,
    },
    {
      name: "Female",
      population: 70568,
      color: "#FFB59F",
      legendFontColor: "##FFB59F",
      legendFontSize: 15,
    },
    {
      name: "Others",
      population: 5568,
      color: "#a855f7",
      legendFontColor: "#a855f7",
      legendFontSize: 15,
    },
  ];
  // const data2 = {
  //   labels: ["January", "February", "March", "April", "May", "June"],
  //   datasets: [
  //     {
  //       data: [20, 45, 28, 80, 99, 43],
  //     },
  //   ],
  // };
  // const GetProfile = () => {
  //   ApiService.getProfile().then((e) => {
  //     dispatch(setUserProfile(e.data));
  //   });
  // };
  const GetDashboard = () => {
    ApiService.getDashboard().then((e) => {
      setDashboardData(e.data);
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
      <VStack alignSelf={"center"} w={"100%"} space={2} maxWidth={"800"} pb={8}>
        <Center p={0}>
          {userProfile?.role === "MLA" || userProfile?.role === "ADMIN" ? (
            <MLAInfoCard screenWidth={screenWidth} data={dashboardData} />
          ) : userProfile?.role === "MANDAL_INCHARGE" ? (
            <MIInfoCard screenWidth={screenWidth} data={dashboardData} />
          ) : userProfile?.role === "SECTOR_INCHARGE" ? (
            <SIInfoCard screenWidth={screenWidth} data={dashboardData} />
          ) : userProfile?.role === "BOOTH_LEVEL_AGENT" ? (
            <BLAInfoCard screenWidth={screenWidth} data={dashboardData} />
          ) : null}
        </Center>
        <Center w={"100%"}>
          {userProfile?.role === "MLA" || userProfile?.role === "ADMIN" ? (
            <MLACardsStack
              screenWidth={screenWidth}
              data={dashboardData}
              chartData={data}
            />
          ) : userProfile?.role === "MANDAL_INCHARGE" ? (
            <MICardsStack screenWidth={screenWidth} data={dashboardData} />
          ) : userProfile?.role === "SECTOR_INCHARGE" ? (
            <SICardsStack screenWidth={screenWidth} data={dashboardData} />
          ) : userProfile?.role === "BOOTH_LEVEL_AGENT" ? (
            <BLACardsStack screenWidth={screenWidth} data={dashboardData} />
          ) : null}
        </Center>
      </VStack>
    </ScrollView>
  );
};

export default Dashboard;

import React, { useCallback, useState } from "react";
import {
  Center,
  ScrollView,
  // HStack,
  VStack,
} from "native-base";
import MLACardsStack from "./CardsStack";
import MICardsStack from "../Mandals/CardsStack";
import SICardsStack from "../Sectors/CardsStack";
import BLACardsStack from "../Booths/BLACardsStack";

import { PieChart, BarChart } from "react-native-chart-kit";
// import { PieChart as gfPieChart } from "react-native-gifted-charts";

import { Dimensions } from "react-native";
import GraphCard from "../../components/Cards/GraphCard";
import { chartConfig } from "../../components/Charts/chartConfig";
import MLAInfoCard from "./InfoCard";
import MIInfoCard from "../Mandals/InfoCard";
import SIInfoCard from "../Sectors/InfoCard";
import BLAInfoCard from "../Booths/InfoCard";
const screenWidth = Dimensions.get("window").width;
import { useFocusEffect } from "@react-navigation/native";
import { ApiService } from "../../lib/axios";
import { useSelector } from "react-redux";

const Dashboard = () => {
  // const navigation = useNavigation();
  // const dispatch = useDispatch();
  const [dashboardData, setDashboardData] = useState({});
  // const [userProfile, setProfile] = useState({});
  const { userProfile } = useSelector((state) => state.auth);
  // console.log("userProfile : ", userProfile);
  const data = [
    {
      name: "Remaining Voters",
      population: 170568 - 1,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Voters Added",
      population: 1,
      // dashboardData?.total_voters_added === 0
      //   ? 1
      //   : dashboardData?.total_voters_added,
      color: "green",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];
  const data2 = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };
  // const GetProfile = () => {
  //   ApiService.getProfile().then((e) => {
  //     dispatch(setUserProfile(e.data));
  //   });
  // };
  const GetDashboard = () => {
    ApiService.getDashboard().then((e) => {
      // console.log(e);
      // let splitData = e.data.slice(0, 10);
      // setLists(splitData);
      setDashboardData(e.data);
      // dispatch(resetAuthData());
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
    <ScrollView bgColor={"coolGray.100"}>
      <VStack alignSelf={"center"} p={2} space={4} maxWidth={"600"}>
        <Center>
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
        <Center>
          {userProfile?.role === "MLA" || userProfile?.role === "ADMIN" ? (
            <MLACardsStack screenWidth={screenWidth} data={dashboardData} />
          ) : userProfile?.role === "MANDAL_INCHARGE" ? (
            <MICardsStack screenWidth={screenWidth} data={dashboardData} />
          ) : userProfile?.role === "SECTOR_INCHARGE" ? (
            <SICardsStack screenWidth={screenWidth} data={dashboardData} />
          ) : userProfile?.role === "BOOTH_LEVEL_AGENT" ? (
            <BLACardsStack screenWidth={screenWidth} data={dashboardData} />
          ) : null}
        </Center>

        <Center>
          <GraphCard heading={"Constituency Distribution"}>
            <PieChart
              data={data}
              width={screenWidth > 800 ? 800 : screenWidth - 40}
              height={200}
              chartConfig={chartConfig}
              accessor={"population"}
              backgroundColor={"transparent"}
              paddingLeft={"15"}
            />
          </GraphCard>
          <GraphCard heading={"Previous Election"}>
            <BarChart
              data={data2}
              width={screenWidth > 800 ? 800 : screenWidth - 40}
              height={200}
              // style={graphStyle}
              yAxisLabel="$"
              chartConfig={chartConfig}
              verticalLabelRotation={30}
            />
            {/* <gfPieChart
              data={data}
              width={screenWidth > 800 ? 800 : screenWidth - 40}
              height={200}
              chartConfig={chartConfig}
              accessor={"population"}
              backgroundColor={"transparent"}
              paddingLeft={"15"}
            /> */}
          </GraphCard>
        </Center>
      </VStack>
    </ScrollView>
  );
};

export default Dashboard;

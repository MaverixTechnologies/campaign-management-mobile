import React, { useCallback, useState } from "react";
import {
  VStack,
  HStack,
  IconButton,
  Text,
  ScrollView,
  Stack,
  Spinner,
  Center,
  Box,
} from "native-base";
import StatsCard from "../../../components/Cards/StatsCard";
import { MaterialIcons } from "@expo/vector-icons";
import { PieChart } from "react-native-chart-kit";
// import { BarChart } from "react-native-gifted-charts";
// import { PieChart as pc } from "react-native-gifted-charts";
import ProgressChart from "../../../components/Cards/ProgressChart";
import { chartConfig } from "../../../components/Charts/chartConfig";
import GraphCard from "../../../components/Cards/GraphCard";
import TitleCard from "../../../components/Cards/TitleCard";
import { Dimensions } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { ApiService } from "../../../lib/axios";
import CounterStatsCard from "../../../components/Cards/CounterStatsCard";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Voters = ({ route, navigation }) => {
  const [dashboardData, setDashboardData] = useState({});
  const [categoryData, setCategoryData] = useState([]);
  const [casteData, setCasteData] = useState([]);
  const [politicalInclinationData, setPoliticalInclinationData] = useState([]);
  const [genderData, setGenderData] = useState([]);
  const [ageData, setAgeData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  // const [staunchSupporterData, setStaunchSupporterData] = useState([]);
  // const [voterStatsData, setVoterStatsData] = useState({});
  const { zone, zone_id } = route.params;
  // console.log("ZONE __", route.params.zone);
  const { goBack } = navigation;
  const colors = [
    "#FF6384", // Red
    "#36A2EB", // Blue
    "#FFCE56", // Yellow
    "#4BC0C0", // Cyan
    "#9966FF", // Purple
    "#FF9F40", // Orange
    "#8DB600", // Green
    "#FF66C3", // Pink
    "#00C49F", // Teal
    "#FFBB28", // Gold
    "#FF99E6", // Lavender
    "#00E6B8", // Aqua
    "#C299FF", // Lilac
    "#FF6347", // Tomato
    "#D8BFD8", // Thistle
    "#7FFFD4", // Aquamarine
    "#FF4500", // Orange Red
    "#FFD700", // Gold Yellow
    "#90EE90", // Light Green
    "#DDA0DD", // Plum
  ];
  const getColorForInclination = (inclination) => {
    switch (inclination) {
      case "BJP":
        return "#F97D09";
      case "INC":
        return "#5095D9";
      case "BSP":
        return "#020062";
      case "AAP":
        return "#0C3893";
      case "SP":
        return "#8DB600";
      case "JYAS":
        return "#FF4500";
      case "GGP":
        return "#6d28d9";

      default:
        return "#CCCCCC"; // Default color for other inclinations
    }
  };

  const getColorForGender = (gender) => {
    switch (gender) {
      case "MALE":
        return "#5095D9";
      case "FEMALE":
        return "#FFB59F";
      case "THIRD":
        return "#a855f7";
      default:
        return "#CCCCCC"; // Default color for other inclinations
    }
  };
  const getAgeKeys = (range) => {
    switch (range) {
      case "age_18_24":
        return "18-24";
      case "age_25_34":
        return "25-34";
      case "age_35_44":
        return "35-44";
      case "age_45_54":
        return "35-44";
      case "age_55_64":
        return "55-64";
      case "age_65_plus":
        return "65+";
    }
  };
  // const data = [
  //   {
  //     name: "Male",
  //     count: 80568,
  //     color: "#5095D9",
  //     legendFontColor: "#5095D9",
  //     legendFontSize: 15,
  //   },
  //   {
  //     name: "Female",
  //     count: 70568,
  //     color: "#FFB59F",
  //     legendFontColor: "##FFB59F",
  //     legendFontSize: 15,
  //   },
  //   {
  //     name: "Others",
  //     count: 5568,
  //     color: "#a855f7",
  //     legendFontColor: "#a855f7",
  //     legendFontSize: 15,
  //   },
  // ];

  // const ageData = [
  //   {
  //     name: "18-24",
  //     count: 26615,
  //     label: "18-24",
  //     value: 26615,
  //     color: "#5095D9",
  //     frontColor: "#bae6fd",
  //     gradientColor: "#5095D9",
  //     legendFontColor: "#5095D9",
  //     legendFontSize: 15,
  //   },
  //   {
  //     name: "25-34",
  //     count: 43473,
  //     label: "25-34",
  //     value: 43473,
  //     color: "#FFB59F",
  //     legendFontColor: "##FFB59F",
  //     legendFontSize: 15,
  //     frontColor: "#ffe4e6",
  //     gradientColor: "#FFB59F",
  //   },
  //   {
  //     name: "35-44",
  //     count: 37146,
  //     label: "35-44",
  //     value: 37146,
  //     color: "#facc15",
  //     legendFontColor: "#facc15",
  //     legendFontSize: 15,
  //     frontColor: "#fefce8",
  //     gradientColor: "#facc15",
  //   },
  //   {
  //     name: "44-54",
  //     count: 26996,
  //     label: "44-54",
  //     value: 26996,
  //     color: "#a855f7",
  //     legendFontColor: "#a855f7",
  //     legendFontSize: 15,
  //     frontColor: "#f3e8ff",
  //     gradientColor: "#a855f7",
  //   },
  //   {
  //     name: "55-64",
  //     count: 14346,
  //     label: "55-64",
  //     value: 14346,
  //     color: "#10b981",
  //     legendFontColor: "#10b981",
  //     legendFontSize: 15,
  //     frontColor: "#dcfce7",
  //     gradientColor: "#10b981",
  //   },
  //   {
  //     name: "65+",
  //     count: 12964,
  //     label: "65+",
  //     value: 12964,
  //     color: "#f43f5e",
  //     legendFontColor: "#f43f5e",
  //     legendFontSize: 15,
  //     frontColor: "#ffe4e6",
  //     gradientColor: "#f43f5e",
  //   },
  // ];
  const GetVotersStats = () => {
    const data = {
      filters: JSON.stringify({
        vidhansabha_id: "243",
        ...(zone === "mandal" && { mandal_id: zone_id }),
        ...(zone === "sector" && { sector_id: zone_id }),
        ...(zone === "booth" && { polling_booth_id: zone_id }),
      }),
    };
    ApiService.votersStats(data).then((e) => {
      // setVoterStatsData(e.data);
      // set the category data
      const tempCategoryData =
        e.data?.added_voters_info?.category &&
        Object.entries(e.data?.added_voters_info?.category)
          .sort(([nameA], [nameB]) =>
            nameA === "NA" ? 1 : nameB === "NA" ? -1 : 0
          )
          .map(([name, count], index) => ({
            name,
            count,
            color: colors[index % colors.length],
            legendFontColor: colors[index % colors.length],
            legendFontSize: 15,
          }));
      setCategoryData(tempCategoryData);
      // set the caste data
      // Calculate the percentage for each caste
      const totalCount = Object.values(e.data?.added_voters_info?.caste).reduce(
        (sum, count) => sum + count,
        0
      );
      const chartData = Object.entries(e.data?.added_voters_info?.caste)
        .filter(([name]) => name !== "NA") // Exclude 'NA' caste
        .sort((a, b) => b[1] - a[1]) // Sort in descending order based on values
        .slice(0, 5) // Get the top 5 castes
        .map(([name, count], index) => ({
          name,
          count,
          percentage: ((count / totalCount) * 100).toFixed(2), // Calculate percentage
          color: colors[index % colors.length],
          legendFontColor: colors[index % colors.length],
          legendFontSize: 15,
        }));
      setCasteData(chartData);

      // political inclination data
      const pIData = Object.entries(
        e.data?.added_voters_info?.political_inclination
      )
        .filter(([inclination]) => inclination !== "NA")
        .sort((a, b) => b[1] - a[1])
        .map(([inclination, count]) => ({
          name: inclination,
          count,
          color: getColorForInclination(inclination),
        }));
      setPoliticalInclinationData(pIData);
      // setAgeData(e.data?.added_voters_info?.category);

      // Set Staunch Supporter Data
      // const sIData = Object.entries(
      //   e.data?.added_voters_info?.staunch_supporter
      // )
      //   .filter(([inclination]) => inclination !== "NA")
      //   .sort((a, b) => b[1] - a[1])
      //   .map(([inclination, count]) => ({
      //     name: inclination,
      //     count,
      //     color: getColorForInclination(inclination),
      //   }));
      // const tempSiData = e.data?.added_voters_info?.staunch_supporter;
      // const siData = {
      //   labels: ["Staunch Supporters", "Total Supporters"],
      //   data: Object.keys(tempSiData).map((item) => [
      //     tempSiData[item].staunch_supporters,
      //     tempSiData[item].total,
      //   ]),
      //   legend: Object.keys(tempSiData),
      //   barColors: Object.keys(tempSiData).map((inclination) =>
      //     getColorForInclination(inclination)
      //   ),
      // };
      // console.log("SI DATA __ ", siData);
      // setStaunchSupporterData(siData);

      // Set Gender Data
      const tempGenderData = Object.entries(
        e.data?.added_voters_info?.gender
      ).map(([gender, count]) => ({
        name: gender,
        count,
        color: getColorForGender(gender),
        legendFontColor: getColorForGender(gender),
        legendFontSize: 15,
      }));
      setGenderData(tempGenderData);

      // Age data
      const tempAgeData = Object.entries(e.data?.added_voters_info?.age).map(
        ([range, count], index) => ({
          name: getAgeKeys(range),
          count,
          color: colors[index % colors.length],
          legendFontColor: colors[index % colors.length],
          legendFontSize: 15,
        })
      );
      setAgeData(tempAgeData);
      setIsLoaded(true);
    });
  };
  const GetDashboard = () => {
    const tempDash =
      zone === "mandal"
        ? ApiService.getMandalDashboard(zone_id)
        : zone === "sector"
        ? ApiService.getSectorDashboard(zone_id)
        : zone === "booth"
        ? ApiService.getBoothDashboard(zone_id)
        : ApiService.getDashboard();

    tempDash
      .then((e) => {
        setDashboardData(e.data);
        GetVotersStats();
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
      // GetVotersStats();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        setDashboardData({});
        setCategoryData([]);
        setCasteData([]);
        setPoliticalInclinationData([]);
        setGenderData([]);
        setAgeData([]);
        setIsLoaded(false);
      };
    }, [zone, zone_id])
  );
  return (
    <ScrollView>
      <HStack
        space={2}
        p={1}
        bgColor={"secondary.50"}
        alignItems={"center"}
        justifyContent={"flex-start"}
        borderBottomColor={"primary.100"}
        borderBottomWidth={1}
        w={screenWidth > 800 ? "800" : screenWidth}
      >
        <IconButton
          size={"md"}
          variant="ghost"
          _icon={{
            as: MaterialIcons,
            name: "arrow-back",
          }}
          onPress={() => goBack()}
          title="Go back"
        />
        <Text
          color="coolGray.600"
          _dark={{
            color: "warmGray.200",
          }}
          bold
        >
          Go back
        </Text>
      </HStack>
      {isLoaded ? (
        <>
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
              heading={"Voters Count"}
              subheading={`Total voters and voters added till now`}
              // isMore={true}
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
                text={dashboardData?.total_voters}
                width={
                  screenWidth > 800 ? "380" : screenWidth > 300 ? "45%" : "full"
                }
                bg="white"
                isLoaded={isLoaded}
              />
              <StatsCard
                heading={"Added Voters"}
                text={dashboardData?.total_voters_added}
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
              heading={"Gender Wise Voters Stats"}
              subheading={`Breakdown of voters based on gender`}
              // isMore={true}
              isLoaded={isLoaded}
            />

            <GraphCard
              isLoaded={isLoaded}
              width={screenWidth > 800 ? 800 : screenWidth - 20}
            >
              {dashboardData?.total_voters_added < 1 ? (
                <Box>
                  <Text>No Data to Show, add some voters to see analytics</Text>
                </Box>
              ) : (
                <>
                  <PieChart
                    data={genderData}
                    width={screenWidth > 800 ? 800 : screenWidth - 20}
                    height={200}
                    chartConfig={chartConfig}
                    accessor={"count"}
                    backgroundColor={"transparent"}
                    paddingLeft={"15"}
                  />
                  <CounterStatsCard
                    screenWidth={screenWidth}
                    data={genderData}
                    w={"100%"}
                    isLoaded={isLoaded}
                  />
                </>
              )}
            </GraphCard>
          </VStack>
          <VStack
            bg={{
              linearGradient: {
                colors: ["secondary.50", "blue.100"],
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
              bg={"blue.50"}
              borderColor={"primary.400"}
              icon={"pie-chart"}
              iconColor={"primary.400"}
              heading={"Age wise"}
              subheading={`Voter's statistics based on age range`}
            />

            <GraphCard
              isLoaded={isLoaded}
              width={screenWidth > 800 ? 800 : screenWidth - 20}
            >
              {dashboardData?.total_voters_added < 1 ? (
                <Box>
                  <Text>No Data to Show, add some voters to see analytics</Text>
                </Box>
              ) : (
                <ProgressChart
                  screenWidth={screenWidth}
                  data={ageData}
                  w={"100%"}
                />
              )}
            </GraphCard>
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
              heading={"Category Wise"}
              subheading={`Category based distribution of voters in the constituency`}
              // isMore={true}
            />
            <GraphCard
              isLoaded={isLoaded}
              width={screenWidth > 800 ? 800 : screenWidth - 20}
            >
              {dashboardData?.total_voters_added < 1 ? (
                <Box>
                  <Text>No Data to Show, add some voters to see analytics</Text>
                </Box>
              ) : (
                <>
                  <PieChart
                    data={categoryData}
                    width={screenWidth > 800 ? 800 : screenWidth - 40}
                    height={200}
                    chartConfig={chartConfig}
                    accessor={"count"}
                    backgroundColor={"transparent"}
                    paddingLeft={"15"}
                  />
                  <ProgressChart
                    screenWidth={screenWidth}
                    data={categoryData}
                    w={"100%"}
                  />
                </>
              )}
            </GraphCard>
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
              heading={"Caste Wise"}
              subheading={`Major castes of voters in the constituency`}
            />
            <GraphCard
              isLoaded={isLoaded}
              width={screenWidth > 800 ? 800 : screenWidth - 20}
            >
              {dashboardData?.total_voters_added < 1 ? (
                <Box>
                  <Text>No Data to Show, add some voters to see analytics</Text>
                </Box>
              ) : (
                <PieChart
                  data={casteData}
                  width={screenWidth > 800 ? 800 : screenWidth - 40}
                  height={200}
                  chartConfig={chartConfig}
                  accessor={"count"}
                  backgroundColor={"transparent"}
                  paddingLeft={"15"}
                />
              )}
            </GraphCard>
          </VStack>
          <VStack
            bg={{
              linearGradient: {
                colors: ["secondary.50", "blue.100"],
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
              bg={"blue.50"}
              borderColor={"primary.400"}
              icon={"pie-chart"}
              iconColor={"primary.400"}
              heading={"Political Inclination"}
              subheading={`Political inclination of voters in the constituency`}
            />
            <GraphCard
              isLoaded={isLoaded}
              width={screenWidth > 800 ? 800 : screenWidth - 20}
            >
              {dashboardData?.total_voters_added < 1 ? (
                <Box>
                  <Text>No Data to Show, add some voters to see analytics</Text>
                </Box>
              ) : (
                <ProgressChart
                  screenWidth={screenWidth}
                  data={politicalInclinationData}
                  w={"100%"}
                />
              )}
              {/* <BarChart
            // style={graphStyle}
            data={{
              labels: politicalInclinationData.map((item) => item.name),
              datasets: [
                {
                  data: politicalInclinationData.map((item) => item.count),
                  colors: politicalInclinationData.map((item) => {
                    return () => item.color;
                  }),
                },
              ],
            }}
            width={screenWidth - 20}
            height={240}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
            chartConfig={{
              backgroundColor: "#blue",
              color: () => "#fff", // THIS
              strokeWidth: 2,
              barPercentage: 0.5,
              propsForLabels: {
                fontSize: "10",
              },
              fillShadowGradient: "white",
              fillShadowGradientOpacity: 1,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "0",
                strokeWidth: "2",
                stroke: "#fff",
              },
              propsForBackgroundLines: {
                strokeWidth: 0,
              },
            }}
            withHorizontalLabels={false}
            withInnerLines={false}
            showBarTops={false}
            showValuesOnTopOfBars={true}
            fromZero={true}
            flatColor={true}
            withCustomBarColorFromData={true}

            // verticalLabelRotation={30}
          /> */}
            </GraphCard>
          </VStack>
          {/* <VStack
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
          heading={"Staunch (Kattar) Supporters"}
          subheading={`Staunch upporters in the constituency`}
          // isMore={true}
        />
        <GraphCard
          // heading={"Gender wise (total) voters distribution"}
          width={screenWidth > 800 ? 800 : screenWidth - 20}
        >
          <StackedBarChart
            data={staunchSupporterData}
            width={screenWidth > 800 ? 800 : screenWidth - 40}
            height={240}
            chartConfig={{
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
            showLegend={true}
          />
        </GraphCard>
      </VStack> */}
        </>
      ) : (
        <Center h={screenHeight - 80}>
          <Spinner size={"lg"} />
        </Center>
      )}
    </ScrollView>
  );
};

export default Voters;

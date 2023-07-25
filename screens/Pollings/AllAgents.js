import React, { useCallback, useState } from "react";
import {
  Text,
  // FlatList,
  // VStack,
  HStack,
  IconButton,
  // Pressable,
  Spinner,
  Center,
  View,
  Input,
  // Box,
  // Image,
} from "native-base";
import { ApiService } from "../../lib/axios";
import { useFocusEffect, CommonActions } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import { groupedImages } from "../../lib/images";
// import VoterList from "../../../components/Lists/VoterList";
import AgentsList from "../../components/Lists/AgentsList";
// import { useNavigation } from "@react-navigation/native";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
let imageIndex = 0;
const AllAgents = ({ navigation }) => {
  const [lists, setLists] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredLists, setFilteredLists] = useState([]);
  // const [isDragging, setIsDragging] = useState(false);
  // const [isAtEndOfList, setIsAtEndOfList] = useState(false);
  // const navigation = useNavigation();
  const goBack = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Dashboard" }],
      })
    );
  };
  // const goBack = () => {
  //   navigation.replace("Dashboard");
  // };
  const getRandomAvatar = () => {
    const totalImages = groupedImages.male.length;
    const avatarUrl = groupedImages.male[imageIndex];

    // Increment the image index and reset to 0 if it exceeds the total number of images
    imageIndex = (imageIndex + 1) % totalImages;

    return avatarUrl;
  };

  const GetPollingAgents = async () => {
    const e = await ApiService.getPollingAgents();
    // const e = await ApiService.getMandalIncharges();
    // const newData = getRandomAvatar(e.data);
    const updatedDataArray = e?.data?.map((item) => {
      const avatarUrl = getRandomAvatar();
      const role = "Mandal Incharge"; // Replace this with your desired fixed role.

      return {
        id: item?.id,
        name: item?.full_name,
        role: role,
        avatarUrl: avatarUrl,
        contact_number: item?.contact_number,
        zone: item?.polling_booth,
      };
    });
    setLists(updatedDataArray);
    setIsLoaded(true);
  };

  // const handleScrollEnd = () => {
  //   setIsDragging(true);
  // };
  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      GetPollingAgents();

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  // Function to handle search and update the filtered list
  const handleSearch = useCallback(
    (query) => {
      setIsLoaded(false);
      setSearchQuery(query);
      const filteredData = lists.filter((item) =>
        item?.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredLists(filteredData);
      setIsLoaded(true);
    },
    [lists]
  );
  // Use the filtered list for rendering
  const dataToRender = searchQuery ? filteredLists : lists;

  return (
    <View bgColor={"primary.50"} maxH={"full"}>
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

      {/* Sticky search bar */}
      <HStack
        space={2}
        p={1}
        bgColor={"secondary.50"}
        alignItems={"center"}
        justifyContent={"flex-start"}
        borderBottomColor={"primary.100"}
        borderBottomWidth={1}
        w={screenWidth > 800 ? "800" : screenWidth}
        zIndex={1}
      >
        <Input
          placeholder="Search Polling Agents"
          value={searchQuery}
          onChangeText={handleSearch}
          size="md"
          width="100%"
          bg="white"
          borderRadius={8}
          px={2}
          maxLength={10}
        />
      </HStack>
      {isLoaded && dataToRender.length > 0 ? (
        <AgentsList
          data={dataToRender}
          // currentPage={currentPage}
          // totalPages={totalPages}
          // handleLoadMore={handleLoadMore}
          // isLoadingMore={isLoadingMore}
          // formData={formData}
          // onResetFilter={onResetFilter}
        />
      ) : (
        <Center h={screenHeight - 80}>
          <Spinner size={"lg"} />
        </Center>
      )}
    </View>
  );
};

export default AllAgents;

import React, { useCallback, useState } from "react";
import {
  Text,
  FlatList,
  VStack,
  HStack,
  IconButton,
  Pressable,
  Spinner,
  Center,
  View,
  Input,
} from "native-base";
import { ApiService } from "../../lib/axios";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const AllMandals = ({ navigation: { goBack } }) => {
  const [lists, setLists] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredLists, setFilteredLists] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isAtEndOfList, setIsAtEndOfList] = useState(false);
  const navigation = useNavigation();
  const GetMandals = async () => {
    const e = await ApiService.getMandals();
    setLists(e.data);
    setIsLoaded(true);
  };
  const handleScrollEnd = () => {
    setIsDragging(true);
  };
  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      GetMandals();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );
  // Use the filtered list for rendering
  const dataToRender = searchQuery ? filteredLists : lists;

  // Function to handle search and update the filtered list
  const handleSearch = useCallback(
    (query) => {
      setIsLoaded(false);
      setSearchQuery(query);
      const filteredData = lists.filter(
        (item, i) =>
          item?.name.toLowerCase().includes(query.toLowerCase()) ||
          (i + 1)?.toString().includes(query.toLowerCase())
      );
      setFilteredLists(filteredData);
      setIsLoaded(false);
    },
    [lists]
  );
  const RenderItemComponent = React.memo(({ item, index }) => {
    return (
      <Pressable
        safeArea
        flex="1"
        onPress={() =>
          navigation.navigate("MandalDashboard", {
            itemId: item?.id,
          })
        }
        _dark={{
          bg: "coolGray.800",
        }}
        _light={{
          bgColor: "primary.50",
        }}
        borderBottomRadius={8}
        borderBottomColor={"primary.100"}
        borderBottomWidth={1}
      >
        <HStack
          pl="4"
          pr="5"
          py="2"
          alignItems="center"
          justifyContent={"space-between"}
          space={3}
        >
          <HStack alignItems="center" space={3}>
            <Text
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
              bold
            >
              #
              {lists.findIndex((item) => dataToRender[index].id === item.id) +
                1}
            </Text>
            <Text
              fontSize={"md"}
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
              bold
            >
              {item?.name}
            </Text>
          </HStack>
          <VStack alignItems={"flex-end"}>
            <Text
              fontSize={"xs"}
              color="coolGray.700"
              _dark={{
                color: "warmGray.200",
              }}
            >
              Mandal Incharge -
            </Text>
            <Text
              color="coolGray.700"
              _dark={{
                color: "warmGray.50",
              }}
              bold
            >
              {item?.mandalincharge
                ? item?.mandalincharge?.full_name
                : "Not Added Yet"}
            </Text>
          </VStack>
        </HStack>
      </Pressable>
    );
  });
  // Assign the display name
  RenderItemComponent.displayName = "RenderItemComponent";

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
        // position="sticky"
        // top={screenWidth > 800 ? "40px" : "32px"}
        zIndex={1}
      >
        <Input
          placeholder="Search Mandal"
          value={searchQuery}
          onChangeText={handleSearch}
          size="md"
          width="100%"
          bg="white"
          borderRadius={8}
          px={2}
        />
      </HStack>
      {isLoaded ? (
        <FlatList
          data={dataToRender}
          bg="white"
          px={2}
          renderItem={({ item, index }) => (
            <RenderItemComponent item={item} index={index} />
          )}
          keyExtractor={(item) => item.id}
          removeClippedSubviews={true}
          onEndReachedThreshold={0.1}
          onScrollBeginDrag={handleScrollEnd}
          onEndReached={() => setIsAtEndOfList(true)}
        />
      ) : (
        <Center h={screenHeight - 80}>
          <Spinner size={"lg"} />
        </Center>
      )}
      {isDragging && !isAtEndOfList ? (
        <Center h={20} position="absolute" left={0} right={0} bottom={0}>
          <Spinner size="lg" />
        </Center>
      ) : null}
    </View>
  );
};

export default AllMandals;

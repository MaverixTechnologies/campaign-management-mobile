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

const AllBooths = ({ navigation: { goBack } }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [filteredLists, setFilteredLists] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [lists, setLists] = useState();
  const [isDragging, setIsDragging] = useState(false);
  const [isAtEndOfList, setIsAtEndOfList] = useState(false);

  const navigation = useNavigation();

  const GetBooths = () => {
    ApiService.getBooths()
      .then((e) => {
        setLists(e.data);
        setIsLoaded(true);
      })
      .catch((err) => {
        alert(err?.response?.detail || err?.message);
        setIsLoaded(true);
      });
  };

  const handleScrollEnd = () => {
    setIsDragging(true);
  };

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      GetBooths();
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
      const filteredData = lists.filter(
        (item) =>
          item?.name.toLowerCase().includes(query.toLowerCase()) ||
          item?.number?.toString().includes(query.toLowerCase())
      );
      setFilteredLists(filteredData);
      setIsLoaded(true);
    },
    [lists]
  );

  // Use the filtered list for rendering
  const dataToRender = searchQuery ? filteredLists : lists;

  const RenderItemComponent = React.memo(({ item }) => {
    return (
      <Pressable
        safeArea
        flex="1"
        onPress={() =>
          navigation.navigate("BoothDashboard", {
            itemId: item.id,
          })
        }
        _dark={{
          bg: "coolGray.800",
        }}
        _light={{
          bgColor: "primary.50",
        }}
        borderRadius={8}
        borderBottomColor={"primary.100"}
        borderBottomWidth={1}
      >
        <HStack alignItems="center" pl={2} w={"100%"}>
          <Text
            color="coolGray.800"
            _dark={{
              color: "warmGray.50",
            }}
            bold
            fontSize="md"
            w={"12%"}
          >
            #{item?.number}
          </Text>
          <VStack
            pl="4"
            pr="5"
            py="2"
            alignItems="flex-start"
            justifyContent={"space-between"}
            space={1}
            w={"87%"}
          >
            <HStack
              w={"100%"}
              alignItems="center"
              justifyContent={"space-between"}
            >
              <Text
                fontSize={"md"}
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
                bold
              >
                {item.name}
              </Text>
              <HStack
                alignItems="center"
                space={3}
                borderRadius={"full"}
                backgroundColor={"rose.100"}
                _dark={{
                  backgroundColor: "rose.200",
                }}
                px={2}
              >
                <Text
                  fontSize="xs"
                  color="gray.900"
                  _dark={{
                    color: "rose.600",
                  }}
                  alignSelf="flex-end"
                >
                  {item.sector?.name}
                </Text>
              </HStack>
            </HStack>
            <HStack alignItems="center" space={3}>
              <Text
                color="primary.800"
                _dark={{
                  color: "warmGray.50",
                }}
                fontSize="xs"
              >
                BLA -
              </Text>
              <Text
                color="primary.800"
                _dark={{
                  color: "warmGray.200",
                }}
                fontSize="xs"
              >
                {item.boothlevelagent
                  ? item.boothlevelagent?.full_name
                  : "Not added"}
              </Text>
            </HStack>
            <HStack alignItems="center" space={3}>
              <Text
                color="primary.800"
                _dark={{
                  color: "warmGray.50",
                }}
                fontSize="xs"
              >
                Sector Incharge -
              </Text>
              <Text
                color="primary.800"
                _dark={{
                  color: "warmGray.200",
                }}
                fontSize="xs"
              >
                {item.sector.sectorincharge
                  ? item.sector?.sectorincharge?.full_name
                  : "Not added"}
              </Text>
            </HStack>
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
        // position="sticky"
        // top={screenWidth > 800 ? "0px" : "0px"}
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
        maxLength={10}
      >
        <Input
          placeholder="Search Polling Booth"
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
          renderItem={({ item }) => <RenderItemComponent item={item} />}
          keyExtractor={(item) => item.id}
          removeClippedSubviews={true}
          onEndReachedThreshold={0.1}
          onScrollEndDrag={handleScrollEnd}
          onScrollBeginDrag={handleScrollEnd}
          onEndReached={() => setIsAtEndOfList(true)}
        />
      ) : (
        <Center h={screenHeight - 80}>
          <Spinner size={"lg"} />
        </Center>
      )}
      {/* {isLoadingMore && !endReached ? (
        <Center bg={"transparent"}>
          <Spinner size="sm" />
        </Center>
      ) : null} */}
      {isDragging && !isAtEndOfList ? (
        <Center h={20} position="absolute" left={0} right={0} bottom={0}>
          <Spinner size="lg" />
        </Center>
      ) : null}
    </View>
  );
};

export default AllBooths;

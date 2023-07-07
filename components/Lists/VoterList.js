import React, { useState } from "react";
import {
  Spacer,
  Text,
  VStack,
  HStack,
  Box,
  Icon,
  Pressable,
  Flex,
} from "native-base";
// import UserAvatar from "react-native-user-avatar";
import { SwipeListView } from "react-native-swipe-list-view";
import { Entypo, MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
const VoterList = ({ data }) => {
  const [listData, setListData] = useState(data);

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex((item) => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };

  const onRowDidOpen = (rowKey) => {
    console.log("This row opened", rowKey);
  };

  const renderItem = ({ item }) => (
    <Box key={item.id}>
      <Pressable
        onPress={() => console.log("You touched me")}
        _dark={{
          bg: "coolGray.800",
        }}
        _light={{
          bg: "white",
        }}
      >
        <Box py="2">
          <HStack
            alignItems="flex-start"
            justifyContent={"space-between"}
            space={3}
          >
            <HStack alignItems="center" space={3}>
              <Flex
                borderColor={"primary.500"}
                bgColor={"primary.100"}
                borderWidth={1}
                rounded={8}
                p={2}
              >
                <Icon
                  as={SimpleLineIcons}
                  size={"lg"}
                  name={
                    item?.gender === "MALE"
                      ? "user-female"
                      : item?.gender === "FEMALE"
                      ? "user"
                      : "star"
                  }
                  variant={"outline"}
                  color={"primary.600"}
                  _dark={{
                    color: "warmGray.50",
                  }}
                />
              </Flex>
              <VStack>
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
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  Category - {item?.category}
                </Text>
              </VStack>
            </HStack>
            <Spacer />
            <VStack
              alignItems={"flex-end"}
              pr={2}
              justifyContent={"flex-start"}
            >
              <Text
                fontSize="md"
                color="secondary.600"
                _dark={{
                  color: "warmGray.50",
                }}
                alignSelf="flex-start"
              >
                {item?.epic_number}
              </Text>

              {/* <HStack>
                <Icon
                  as={SimpleLineIcons}
                  size={"xs"}
                  name={"phone"}
                  variant={"outline"}
                  color={"primary.800"}
                  _dark={{
                    color: "warmGray.50",
                  }}
                />
                <Text
                  fontSize="xs"
                  color="primary.800"
                  _dark={{
                    color: "warmGray.50",
                  }}
                  alignSelf="flex-start"
                >
                  {item?.contact_number ? item?.contact_number : "NA"}
                </Text>
              </HStack> */}
            </VStack>
          </HStack>
        </Box>
      </Pressable>
    </Box>
  );

  const renderHiddenItem = (data, rowMap) => (
    <HStack flex="1" pl="2">
      <Pressable
        w="70"
        ml="auto"
        cursor="pointer"
        bg="coolGray.200"
        justifyContent="center"
        onPress={() => closeRow(rowMap, data.item.key)}
        _pressed={{
          opacity: 0.5,
        }}
      >
        <VStack alignItems="center" space={2}>
          <Icon
            as={<Entypo name="dots-three-horizontal" />}
            size="xs"
            color="coolGray.800"
          />
          <Text fontSize="xs" fontWeight="medium" color="coolGray.800">
            More
          </Text>
        </VStack>
      </Pressable>
      <Pressable
        w="70"
        cursor="pointer"
        bg="red.500"
        justifyContent="center"
        onPress={() => deleteRow(rowMap, data.item.key)}
        _pressed={{
          opacity: 0.5,
        }}
      >
        <VStack alignItems="center" space={2}>
          <Icon as={<MaterialIcons name="delete" />} color="white" size="xs" />
          <Text color="white" fontSize="xs" fontWeight="medium">
            Delete
          </Text>
        </VStack>
      </Pressable>
    </HStack>
  );

  return (
    <Box bg="white" safeArea w={"100%"} px={4}>
      <SwipeListView
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-130}
        previewRowKey={"0"}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        onRowDidOpen={onRowDidOpen}
        key={1}
        // ListHeaderComponent={props.ListHeaderComponent}
      />
    </Box>
  );
};

export default VoterList;

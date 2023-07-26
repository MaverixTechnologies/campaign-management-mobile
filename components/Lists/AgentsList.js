import React, { useMemo, useState } from "react";
import {
  Spacer,
  Text,
  VStack,
  HStack,
  Box,
  Icon,
  Pressable,
  Spinner,
  Button,
  Center,
  Avatar,
  Modal,
  FlatList,
} from "native-base";
import { Platform, Linking } from "react-native";
// import { SwipeListView } from "react-native-swipe-list-view";
import { Feather } from "@expo/vector-icons";
import AgentCard from "../Cards/AgentCard";
import { Dimensions } from "react-native";
import UserAvatar from "react-native-user-avatar";
const screenHeight = Dimensions.get("window").height;

const AgentsList = ({
  data,
  // isLoadingMore,
  // handleLoadMore,
  // currentPage,
  // totalPages,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAtEndOfList, setIsAtEndOfList] = useState(false);
  // const [isImageLoading, setIsImageLoading] = useState(false);
  const handleModalClose = () => {
    setModalVisible(false);
    setModalData(null);
  };
  const makePhoneCall = (number) => {
    if (number !== "NA" || number !== "Not added" || number === null) {
      if (Platform.OS === "android") {
        Linking.openURL(`tel:${number}`);
      } else {
        Linking.openURL(`telprompt:${number}`);
      }
    }
  };
  const handleModal = (item) => {
    // setIsImageLoading(true);
    setModalData(item);
    setModalVisible(true);
  };
  const handleScrollEnd = () => {
    setIsDragging(true);
  };
  const RenderItemComponent = React.memo(({ item, index }) => {
    return (
      <Box key={item?.id ? item?.id : index} px={4}>
        <Box
          _dark={{
            bg: "coolGray.800",
          }}
          _light={{
            bg: "white",
          }}
          // onPress={() => handleModal(item)}
        >
          <Box py="2">
            <HStack
              alignItems="center"
              justifyContent={"space-between"}
              space={3}
            >
              <HStack alignItems="center" space={3}>
                {item?.avatarUrl ? (
                  <Pressable onPress={() => handleModal(item)}>
                    <Avatar
                      source={{ uri: item?.avatarUrl }}
                      // source={item?.avatarUrl}
                      alt="User Profile"
                      size={12}
                    />
                  </Pressable>
                ) : (
                  <UserAvatar name={item?.name} size={64} />
                )}
                <VStack>
                  <Text
                    fontSize="md"
                    color="coolGray.800"
                    _dark={{
                      color: "warmGray.50",
                    }}
                    bold
                  >
                    {item?.name}
                  </Text>
                  <Text
                    color="secondary.600"
                    _dark={{
                      color: "warmGray.50",
                    }}
                    alignSelf="flex-start"
                  >
                    {item?.zone}
                  </Text>
                </VStack>
              </HStack>
              <Spacer />
              <VStack alignItems={"flex-end"} pr={2} justifyContent={"center"}>
                <Button
                  rounded={"full"}
                  py={2}
                  bg={"green.600"}
                  size={"sm"}
                  disabled={
                    item?.contact_number === "NA" ||
                    item?.contact_number === "Not added" ||
                    item?.contact_number === null
                      ? true
                      : false
                  }
                  onPress={() => makePhoneCall(item?.contact_number)}
                  leftIcon={
                    <Icon
                      as={
                        <Feather
                          name={
                            item?.contact_number === "NA" ||
                            item?.contact_number === "Not added" ||
                            item?.contact_number === null
                              ? "slash"
                              : "phone-call"
                          }
                        />
                      }
                    />
                  }
                >
                  CALL
                </Button>
              </VStack>
            </HStack>
          </Box>
        </Box>
      </Box>
    );
  });
  // Assign the display name
  RenderItemComponent.displayName = "RenderItemComponent";

  const modalContent = useMemo(() => {
    if (modalData) {
      // Replace the following line with your desired modal content component
      return (
        <AgentCard
          // setIsImageLoading={setIsImageLoading}
          modalData={modalData}
          makePhoneCall={makePhoneCall}
        />
      );
    } else {
      return (
        <Center h={screenHeight - 80}>
          <Spinner size={"lg"} />
        </Center>
      );
    }
  }, [modalData]); // Memoize the modal content based on modalData

  return (
    <>
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <RenderItemComponent item={item} index={index} />
        )}
        keyExtractor={(item) => item.id}
        removeClippedSubviews={true}
        // onEndReachedThreshold={0.1}
        onScrollBeginDrag={handleScrollEnd}
        onEndReached={() => setIsAtEndOfList(true)}
        onScrollEndDrag={handleScrollEnd}
      />
      {isDragging && !isAtEndOfList ? (
        <Center h={20} position="absolute" left={0} right={0} bottom={0}>
          <Spinner size="lg" />
        </Center>
      ) : null}
      {/* {isImageLoading ? (
        <Center bg={"transparent"} h={screenHeight - 80}>
          <Spinner size={"lg"} />
        </Center>
      ) : null} */}
      <Modal
        isOpen={modalVisible}
        onRequestClose={handleModalClose}
        animationPreset="none"
        onClose={handleModalClose}
        size={"md"}
        closeOnOverlayClick
      >
        <Modal.Content maxH="500">
          <Modal.Body p={0}>{modalContent}</Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default AgentsList;

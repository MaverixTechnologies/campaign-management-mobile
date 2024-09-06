import React, { useCallback, useState, useEffect } from "react";
import {
  Text,
  HStack,
  IconButton,
  //   Spinner,
  Center,
  VStack,
  Button,
  Image,
  Modal,
  Box,
  //   Divider,
  AlertDialog,
  Pressable,
  //   Container,
  ScrollView,
  Icon,
  View,
  Flex,
  //   Heading,
} from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Platform, Dimensions } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const UploadForm17C = ({ navigation: { goBack } }) => {
  const [fileList, setFileList] = useState([]);
  const [disable, setDisable] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility
  const [selectedImage, setSelectedImage] = useState(null); // Image for modal
  const [isAlertOpen, setIsAlertOpen] = useState(false); // Alert for delete confirmation
  const [imageToDelete, setImageToDelete] = useState(null); // Image selected for deletion
  const [cameraPermission, requestCameraPermission] =
    ImagePicker.useCameraPermissions();
  const [mediaLibraryStatus, requestMediaLibraryPermission] =
    ImagePicker.useMediaLibraryPermissions();
  // Request permissions for camera and media library
  const requestPermissions = async () => {
    // const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
    // const mediaLibraryPermission =
    //   await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (
      Platform.OS !== "web" &&
      (cameraPermission !== "granted" || mediaLibraryStatus !== "granted")
    ) {
      //   alert("Permissions are required to access the camera and media library.");
      requestMediaLibraryPermission();
      requestCameraPermission();
    }
  };

  useEffect(() => {
    requestPermissions();
  }, [cameraPermission, mediaLibraryStatus]);

  // Load images from AsyncStorage on focus
  useFocusEffect(
    useCallback(() => {
      const loadImages = async () => {
        const storedImages = await AsyncStorage.getItem("selectedImages");
        if (storedImages) {
          setFileList(JSON.parse(storedImages));
        }
      };

      loadImages();

      // Disable button if 4 images are already selected
      if (fileList.length === 4) {
        setDisable(true);
      } else {
        setDisable(false);
      }
    }, [fileList])
  );

  // Function to pick images from the library
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
      selectionLimit: 4 - fileList.length, // Only allow picking enough to fill 4
    });

    if (!result.canceled && result.assets.length > 0) {
      const newImages = await Promise.all(
        result.assets.map(async (asset) => {
          const fileName = `${FileSystem.documentDirectory}${Date.now()}.jpg`;
          await FileSystem.copyAsync({
            from: asset.uri,
            to: fileName,
          });
          return fileName;
        })
      );

      const updatedFileList = [...fileList, ...newImages];
      setFileList(updatedFileList);

      // Save to AsyncStorage
      await AsyncStorage.setItem(
        "selectedImages",
        JSON.stringify(updatedFileList)
      );
    }
  };

  // Function to handle image click for modal
  const openModal = (image) => {
    setSelectedImage(image); // Set the clicked image
    setIsModalVisible(true); // Show the modal
  };

  // Function to confirm delete
  const confirmDeleteImage = (image) => {
    setImageToDelete(image); // Store image to be deleted
    setIsAlertOpen(true); // Open confirmation alert
  };

  // Function to delete image
  const deleteImage = async () => {
    const updatedFileList = fileList.filter((img) => img !== imageToDelete);
    setFileList(updatedFileList);
    setIsAlertOpen(false); // Close confirmation dialog
    setImageToDelete(null);

    // Update AsyncStorage
    await AsyncStorage.setItem(
      "selectedImages",
      JSON.stringify(updatedFileList)
    );

    // Enable button if images are less than 4
    if (updatedFileList.length < 4) {
      setDisable(false);
    }
  };

  return (
    <View display={"flex"} flex={1} justifyContent={"center"}>
      <HStack
        space={2}
        p={1}
        bgColor={"secondary.50"}
        alignItems={"center"}
        justifyContent={"flex-start"}
        borderBottomColor={"primary.100"}
        borderBottomWidth={1}
        // w={screenWidth > 800 ? "800" : screenWidth}
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
        <Text color="coolGray.600" bold>
          Go back
        </Text>
      </HStack>
      <ScrollView bgColor={"primary.50"}>
        <Flex
          justifyContent={"center"}
          alignItems={"stretch"}
          space={2}
          h={screenHeight - 80}
        >
          {/* <Container
          // w={"full"}
          p={5}
          // maxH="full"
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        > */}
          <VStack
            alignItems={"center"}
            // justifyContent={"space-between"}
            h={screenHeight - 120}
            my={2}
            space={4}
            // maxW={"full"}
            w={"full"}
          >
            {fileList.length === 0 ? (
              // <HStack
              //   space={2}
              //   m={4}
              //   flexWrap="wrap"
              //   justifyContent={"center"}
              //   w={"full"}
              //   p={8}
              //   borderRadius={5}
              //   borderColor={"gray.300"}
              //   borderWidth={1}
              // >
              <Center
                border="1"
                borderRadius="md"
                borderWidth={1}
                p={5}
                // justifyContent={"center"}
                // alignItems={"center"}
                borderColor={"gray.300"}
                minH={400}
                w={"full"}
                maxW={"xl"}
                // width={screenWidth - 40}
                // mx={4}
              >
                {/* <Center> */}
                {/* <Center px="4" pt="4"> */}
                <Icon
                  as={MaterialCommunityIcons}
                  size={"4xl"}
                  name={"file-image"}
                  variant={"outline"}
                  color={"primary.300"}
                />
                {/* </Center> */}
                <Text fontSize={"lg"}>No image selected</Text>
                {/* </Center> */}
              </Center>
            ) : (
              // </HStack>
              <HStack
                space={2}
                m={4}
                flexWrap="wrap"
                justifyContent={"flex-start"}
                width={screenWidth - 40}
                p={8}
                borderRadius={5}
                borderColor={"gray.300"}
                borderWidth={1}
              >
                {fileList.length > 0 &&
                  fileList.map((image, index) => (
                    <Pressable
                      key={index}
                      onPress={() => openModal(image)}
                      onLongPress={() => confirmDeleteImage(image)} // Long press to delete
                    >
                      <Image
                        source={{ uri: image }}
                        alt={`Selected image ${index + 1}`}
                        size="md"
                        style={{
                          width: 140,
                          height: 200,
                          margin: 2,
                        }}
                        resizeMode="contain"
                        borderRadius={5}
                        borderColor={"gray.300"}
                        borderWidth={1}
                      />
                    </Pressable>
                  ))}
              </HStack>
            )}
            <Pressable
              // key={index}
              onPress={pickImage}
              disabled={disable}
              maxW={"xl"}
            >
              <Box
                border="1"
                borderRadius="md"
                borderWidth={1}
                p={5}
                borderColor={"gray.500"}
                bgColor={"silver.100"}
              >
                <VStack space="4">
                  <Center px="4" pt="4">
                    <Icon
                      as={MaterialCommunityIcons}
                      size={"4xl"}
                      name={"cloud-upload"}
                      variant={"outline"}
                      color={"primary.300"}
                    />
                  </Center>
                  <Box px="4">
                    <Text textAlign={"center"} fontSize={"lg"}>
                      Upload Form-17C Images (Max 4) Or Click Picture using
                      Camera
                    </Text>
                  </Box>
                </VStack>
              </Box>
            </Pressable>
            {/* <Button
            disabled={disable}
            title="Pick Images from camera roll"
            onPress={pickImage}
          >
            Pick Images
          </Button> */}
          </VStack>

          {/* </Container> */}

          {/* Modal for displaying clicked image */}
          <Modal
            isOpen={isModalVisible}
            onClose={() => setIsModalVisible(false)}
          >
            <Modal.Content maxWidth="full">
              <Modal.CloseButton />
              <Modal.Body>
                {selectedImage && (
                  <Image
                    source={{ uri: selectedImage }}
                    alt="Selected Image"
                    size="4xl"
                    resizeMode="contain"
                    style={{ width: "100%", height: 500 }}
                  />
                )}
              </Modal.Body>
            </Modal.Content>
          </Modal>

          {/* Confirmation Alert for Deleting Image */}
          <AlertDialog
            isOpen={isAlertOpen}
            onClose={() => setIsAlertOpen(false)}
          >
            <AlertDialog.Content>
              <AlertDialog.Header>Delete Image</AlertDialog.Header>
              <AlertDialog.Body>
                Are you sure you want to delete this image?
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button.Group space={2}>
                  <Button onPress={() => setIsAlertOpen(false)}>Cancel</Button>
                  <Button colorScheme="danger" onPress={deleteImage}>
                    Delete
                  </Button>
                </Button.Group>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog>

          {/* {fileList.length === 0 && (
          <Center h={screenHeight - 80}>
            <Spinner size={"lg"} />
          </Center>
        )} */}
        </Flex>
      </ScrollView>
    </View>
  );
};

export default UploadForm17C;

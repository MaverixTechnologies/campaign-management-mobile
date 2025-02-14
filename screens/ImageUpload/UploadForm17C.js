import React, { useCallback, useState, useEffect } from "react";
import { Camera } from "expo-camera";
import {
  Text,
  HStack,
  IconButton,
  //   Spinner,
  Center,
  VStack,
  Button,
  Image,
  //   Modal,
  Box,
  Actionsheet,
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
import ImageModal from "react-native-image-modal";
import { Platform, Dimensions, TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const UploadForm17C = ({ navigation: { goBack } }) => {
  const [fileList, setFileList] = useState([]);
  const [disable, setDisable] = useState(false);
  //   const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility
  //   const [selectedImage, setSelectedImage] = useState(null); // Image for modal
  const [isAlertOpen, setIsAlertOpen] = useState(false); // Alert for delete confirmation
  const [imageToDelete, setImageToDelete] = useState(null); // Image selected for deletion
  const [camera, setCamera] = useState(null);
  //   const [isSourceAlertOpen, setIsSourceAlertOpen] = useState(false);
  const [selectedSource, setSelectedSource] = useState(false);
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

  //   if (!cameraPermission) {
  //     // Camera permissions are still loading
  //     return <View />;
  //   }

  //   if (cameraPermission !== "granted") {
  //     // Camera permissions are not granted yet
  //     return (
  //       <View flex={1} justifyContent={"center"}>
  //         <Text style={{ textAlign: "center" }}>
  //           We need your cameraPermission to show the camera
  //         </Text>
  //         <Button
  //           onPress={requestCameraPermission}
  //           title="grant cameraPermission"
  //         />
  //       </View>
  //     );
  //   }

  const captureImage = async () => {
    if (cameraPermission === "granted") {
      const photo = await camera.takePictureAsync({ base64: true });
      uploadImage(photo.uri);
    }
  };

  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    if (!response.canceled && response.assets.length > 0) {
      const newImages = await Promise.all(
        response.assets.map(async (asset) => {
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
  //   const openModal = (image) => {
  //     setSelectedImage(image); // Set the clicked image
  //     setIsModalVisible(true); // Show the modal
  //   };

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
          <VStack
            alignItems={"center"}
            h={screenHeight - 120}
            my={2}
            space={4}
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
                    <ImageModal
                      key={index}
                      swipeToDismiss={false}
                      resizeMode="contain"
                      imageBackgroundColor="#000000"
                      style={{
                        width: image.width,
                        height: 100,
                      }}
                      source={{
                        uri: image,
                      }}
                      renderHeader={() => (
                        <HStack justifyContent={"flex-end"}>
                          <Button
                            onPress={() => confirmDeleteImage(image)}
                            // variant=""
                            _text={{ color: "red.500" }}
                          >
                            Delete
                          </Button>
                        </HStack>
                      )}
                      renderImageComponent={({ source, resizeMode }) => (
                        <Image
                          source={{ uri: source }}
                          alt={`Selected image ${index + 1}`}
                          size="md"
                          style={{
                            width: 140,
                            height: 200,
                            margin: 2,
                          }}
                          resizeMode={resizeMode}
                          borderRadius={5}
                          borderColor={"gray.300"}
                          borderWidth={1}
                        />
                      )}
                    />
                    // // <Pressable
                    // //   key={index}
                    // //   onPress={() => openModal(image)}
                    // //   onLongPress={() => confirmDeleteImage(image)} // Long press to delete
                    // // >
                    //   {/* <Image
                    //     source={{ uri: image }}
                    //     alt={`Selected image ${index + 1}`}
                    //     size="md"
                    //     style={{
                    //       width: 140,
                    //       height: 200,
                    //       margin: 2,
                    //     }}
                    //     resizeMode="contain"
                    //     borderRadius={5}
                    //     borderColor={"gray.300"}
                    //     borderWidth={1}
                    //   /> */}
                    // {/* </Pressable> */}
                  ))}
              </HStack>
            )}
            <Pressable
              onPress={() => setSelectedSource(true)}
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
            <Actionsheet
              isOpen={selectedSource}
              onClose={() => setSelectedSource("false")}
              size="full"
            >
              <Actionsheet.Content>
                <Box w="100%" h={60} px={4} justifyContent="center">
                  <Text
                    fontSize="16"
                    color="gray.500"
                    _dark={{
                      color: "gray.300",
                    }}
                  >
                    Choose Option
                  </Text>
                </Box>
                <Actionsheet.Item
                  onPress={() => setSelectedSource("camera")}
                  startIcon={
                    <Icon as={Ionicons} size="6" name="camera-outline" />
                  }
                >
                  Take Photo
                </Actionsheet.Item>
                <Actionsheet.Item
                  onPress={() => pickImage()}
                  startIcon={
                    <Icon as={Ionicons} size="6" name="images-outline" />
                  }
                >
                  Select From Gallery
                </Actionsheet.Item>
              </Actionsheet.Content>
            </Actionsheet>
          </VStack>

          {/* Modal for displaying clicked image */}
          {/* <Modal
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
          </Modal> */}

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

          {/* <AlertDialog
            isOpen={isSourceAlertOpen}
            onClose={() => setIsSourceAlertOpen(false)}
            onPointerCancel={() => setIsSourceAlertOpen(false)}
          >
            <AlertDialog.Content>
              <AlertDialog.Header>Select</AlertDialog.Header>
              <AlertDialog.Body>
                Are you sure you want to delete this image?
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button.Group space={2}>
                  <Button onPress={() => setSelectedSource(false)}>
                    Cancel
                  </Button>
                  <Button colorScheme="danger" onPress={deleteImage}>
                    Delete
                  </Button>
                </Button.Group>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog> */}

          {/* {fileList.length === 0 && (
          <Center h={screenHeight - 80}>
            <Spinner size={"lg"} />
          </Center>
        )} */}
        </Flex>
      </ScrollView>
      {selectedSource === "camera" && (
        <View flex={1} justifyContent={"center"}>
          <Camera
            // style={styles.camera}
            style={{ flex: 1 }}
            ref={(ref) => {
              setCamera(ref);
            }}
          >
            <View
              flex={1}
              flexDirection={"row"}
              justifyContent={"center"}
              backgroundColor={"transparent"}
              m={32}
            >
              <TouchableOpacity
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 35,
                  backgroundColor: "#fff",
                  justifyContent: "center",
                  alignSelf: "flex-end",
                  alignItems: "center",
                }}
                onPress={captureImage}
              >
                <MaterialCommunityIcons name="camera" size={36} color="black" />
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      )}
    </View>
  );
};

export default UploadForm17C;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//   },
//   camera: {
//     flex: 1,
//   },
//   buttonContainer: {
//     flex: 1,
//     flexDirection: "row",
//     backgroundColor: "transparent",
//     justifyContent: "center",
//     margin: 32,
//   },
//   button: {
//     width: 70,
//     height: 70,
//     borderRadius: 35,
//     backgroundColor: "#fff",
//     justifyContent: "center",
//     alignSelf: "flex-end",
//     alignItems: "center",
//   },
//   text: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "white",
//   },
// });

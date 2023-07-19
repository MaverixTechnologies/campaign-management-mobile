import React, { useCallback, useState } from "react";
import {
  FormControl,
  Text,
  VStack,
  Button,
  Input,
  // Select,
  Radio,
  HStack,
  Heading,
  Spinner,
  Center,
  ScrollView,
  View,
  // ScrollView,
} from "native-base";
import { useToast } from "native-base";
import { ApiService } from "../../lib/axios";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { Dimensions } from "react-native";
import ToastAlert from "../../components/Alert/ToastAlert";
// import DropDownPicker from "react-native-dropdown-picker";
import CustomDropDownPicker from "../../components/CustomDropDownPicker";
// import AlertCenter from "../../components/Alert/AlertCenter";
const screenHeight = Dimensions.get("window").height;
const AddVoter = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(null);
  const [caste, setCaste] = useState("");
  const [category, setCategory] = useState("");
  const [contact, setContact] = useState(null);
  const [epicNumber, setEpicNumber] = useState("");
  const [politicalInclination, setPoliticalInclination] = useState("");
  const [pollingBooth, setPollingBooth] = useState(null);
  const [staunchSupporter, setStaunchSupporter] = useState("No");
  const [isLoaded, setIsLoaded] = useState(true);
  const [enums, setEnums] = useState({});
  const [lists, setLists] = useState();
  const [errors, setErrors] = useState({});
  const [openBooths, setOpenBooths] = useState(false);
  const [openParties, setOpenParties] = useState(false);
  const [openCategories, setOpenCategories] = useState(false);
  const [openCastes, setOpenCastes] = useState(false);

  const toast = useToast();
  const { userId } = useSelector((state) => state.auth);

  let regexEpicNumber = new RegExp(/^[A-Z]{4}[0-9]{6}$/);
  const validate = () => {
    if (name === undefined) {
      setErrors({ ...errors, name: "Name is required" });
      toast.show({
        render: () => {
          return (
            <ToastAlert
              title="Name is required"
              toast={toast}
              id={"addvotername"}
              status={"error"}
            />
          );
        },
        placement: "top-right",
        id: "addvotername",
        isClosable: true,
      });
      return false;
    } else if (name.length < 3) {
      setErrors({ ...errors, name: "Name is too short" });
      toast.show({
        render: () => {
          return (
            <ToastAlert
              title="Name is too short"
              id={"addvotername2"}
              toast={toast}
              status={"warning"}
            />
          );
        },
        placement: "top-right",
        id: "addvotername2",
        isClosable: true,
      });
      return false;
    } else if (age === undefined || age === null || age.length < 1) {
      setErrors({ ...errors, age: "Age is required" });
      toast.show({
        render: () => {
          return (
            <ToastAlert
              title="Age is required"
              id={"addvoterage2"}
              toast={toast}
              status={"error"}
            />
          );
        },
        placement: "top-right",
        id: "addvoterage2",
        isClosable: true,
      });
      return false;
    } else if (age < 18) {
      setErrors({ ...errors, age: "Not a valid voter: Age must be above 18" });
      toast.show({
        render: () => {
          return (
            <ToastAlert
              title="Not a valid voter: Age must be above 18"
              id={"addvoterage"}
              toast={toast}
              status={"warning"}
            />
          );
        },
        placement: "top-right",
        id: "addvoterage",
        isClosable: true,
      });
      return false;
    } else if (
      contact === undefined ||
      contact === null ||
      contact.length < 1
    ) {
      setErrors({ ...errors, contact_number: "Contact number is required" });
      toast.show({
        render: () => {
          return (
            <ToastAlert
              title="Contact number is required"
              id={"addvotercontact"}
              toast={toast}
              status={"error"}
            />
          );
        },
        placement: "top-right",
        id: "addvotercontact",
        isClosable: true,
      });
      return false;
    } else if (contact.length !== 10) {
      setErrors({
        ...errors,
        contact_number: "Invalid: Contact number must be of 10 digit",
      });
      toast.show({
        render: () => {
          return (
            <ToastAlert
              title="Invalid: Contact number must be of 10 digit"
              id={"addvotercontactinvalid"}
              toast={toast}
              status={"error"}
            />
          );
        },
        placement: "top-right",
        id: "addvotercontactinvalid",
        isClosable: true,
      });
      return false;
    } else if (caste === undefined || caste?.length < 1) {
      setErrors({
        ...errors,
        caste: "Select a caste",
      });
      toast.show({
        render: () => {
          return (
            <ToastAlert
              title="Select a caste"
              id={"addvotercaste"}
              toast={toast}
              status={"error"}
            />
          );
        },
        placement: "top-right",
        id: "addvotercaste",
        isClosable: true,
      });
      return false;
    } else if (category === undefined || category?.length < 1) {
      setErrors({
        ...errors,
        voter_category: "Select a category",
      });
      toast.show({
        render: () => {
          return (
            <ToastAlert
              title="Select a category"
              id={"addvotercategory"}
              toast={toast}
              status={"error"}
            />
          );
        },
        placement: "top-right",
        id: "addvotercategory",
        isClosable: true,
      });
      return false;
    } else if (
      pollingBooth === undefined ||
      pollingBooth === null ||
      pollingBooth?.length < 1
    ) {
      setErrors({
        ...errors,
        polling_booth: "Select a polling booth",
      });
      toast.show({
        render: () => {
          return (
            <ToastAlert
              title="Select a polling booth"
              id={"addvoterpolling"}
              toast={toast}
              status={"error"}
            />
          );
        },
        placement: "top-right",
        id: "addvoterpolling",
        isClosable: true,
      });
      return false;
    } else if (
      epicNumber === undefined ||
      epicNumber === null ||
      epicNumber?.length < 1
    ) {
      setErrors({
        ...errors,
        epic_number: "Epic Number is required",
      });
      toast.show({
        render: () => {
          return (
            <ToastAlert
              title="Epic Number is required"
              id={"addvoterepicnumber"}
              toast={toast}
              status={"error"}
            />
          );
        },
        placement: "top-right",
        id: "addvoterepicnumber",
        isClosable: true,
      });
      return false;
    } else if (!regexEpicNumber.test(epicNumber)) {
      setErrors({
        ...errors,
        epic_number: "Invalid Epic Number",
      });
      toast.show({
        render: () => {
          return (
            <ToastAlert
              title="Enter a valid Epic Number"
              id={"addvoterepicinvalidepic"}
              toast={toast}
              status={"error"}
            />
          );
        },
        placement: "top-right",
        id: "addvoterepicinvalidepic",
        isClosable: true,
      });
      return false;
    }
    return true;
  };
  const onSubmit = () => {
    // let newFormData = { ...formData, added_by: userId };
    let newFormData = {
      name: name,
      age: age,
      caste: caste,
      voter_category: category,
      contact_number: contact,
      epic_number: epicNumber,
      political_inclination: politicalInclination,
      polling_booth: pollingBooth,
      staunch_supporter: staunchSupporter,
      added_by: userId,
    };
    validate()
      ? ApiService.addVoter(newFormData)
          .then(() => {
            toast.show({
              render: () => {
                return (
                  <ToastAlert
                    title="Voter Added Successfully"
                    id={"addvotersuccess"}
                    toast={toast}
                    status={"success"}
                  />
                );
              },
              placement: "top-right",
              id: "addvotersuccess",
              isClosable: true,
            });
            cleanUp();
          })
          .catch((err) => {
            toast.show({
              render: () => {
                return (
                  <ToastAlert
                    title={err?.response?.detail || err?.message}
                    id={"addvoterfailed"}
                    toast={toast}
                    status={"error"}
                  />
                );
              },
              placement: "top-right",
              id: "addvoterfailed",
              isClosable: true,
            });
          })
      : console.log("Validation Failed");
  };
  const GetEnums = () => {
    ApiService.getEnums().then((e) => {
      setEnums(e.data);
      setIsLoaded(true);
    });
  };
  const GetBooths = () => {
    setIsLoaded(false);
    ApiService.getBooths()
      .then((e) => {
        const newList = e?.data?.map((option) => {
          return {
            id: option.id,
            label: `#${option.number} - ${option.name}`,
            value: option.id,
          };
        });
        setLists(newList);

        GetEnums();
        // setIsLoaded(true);
      })
      .catch((err) => {
        console.log(err);
        setIsLoaded(true);
      });
  };
  const cleanUp = () => {
    setErrors({});
    setName("");
    setAge(null);
    setCaste("");
    setCategory("");
    setContact(null);
    setEpicNumber("");
    setPoliticalInclination("");
    setPollingBooth(null);
    setStaunchSupporter("No");
  };

  useFocusEffect(
    useCallback(() => {
      GetBooths();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        cleanUp();
        // alertCleanUp();
      };
    }, [])
  );
  return (
    <View bg={"primary.50"} maxH={"100%"}>
      {isLoaded ? (
        <ScrollView>
          <VStack
            width="90%"
            space={2}
            py={4}
            mx="auto"
            maxW="600px"
            alignItems="center"
            bg={"primary.50"}
          >
            <Heading w={"full"} textAlign={"left"} fontSize="xl" pb="3">
              Enter Voter Details
            </Heading>
            <FormControl isRequired isInvalid={"name" in errors}>
              <FormControl.Label mb="2">
                <Text fontWeight={"semibold"} fontSize="14">
                  Name
                </Text>
              </FormControl.Label>
              <Input
                placeholder="Enter voter name"
                value={name}
                onChangeText={(value) => setName(value)}
                width="100%"
                borderRadius="8"
                py="3"
                size="2xl"
                fontSize="16"
                variant={"outline"}
                color={"text"}
                maxLength={30}
              />
              {"name" in errors ? (
                <FormControl.ErrorMessage>
                  {errors.name}
                </FormControl.ErrorMessage>
              ) : (
                <FormControl.HelperText>
                  Name should contain atleast 3 character.
                </FormControl.HelperText>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={"age" in errors}>
              <FormControl.Label htmlFor="age">
                <Text fontWeight={"semibold"} fontSize="14">
                  Age
                </Text>
              </FormControl.Label>
              <Input
                keyboardType="numeric"
                id="age"
                name="age"
                min={0}
                max={120}
                placeholder="Enter age"
                value={age}
                onChangeText={(value) => setAge(value)}
                width="100%"
                py="3"
                fontSize="16"
                maxLength={3}
              />
              {"age" in errors ? (
                <FormControl.ErrorMessage>
                  {errors.age}
                </FormControl.ErrorMessage>
              ) : (
                <FormControl.HelperText>
                  Name should contain atleast 3 character.
                </FormControl.HelperText>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={"contact_number" in errors}>
              <FormControl.Label htmlFor="contactNumber">
                <Text fontWeight={"semibold"} fontSize="14">
                  Contact Number
                </Text>
              </FormControl.Label>
              <Input
                keyboardType="numeric"
                id="contactNumber"
                name="contactNumber"
                placeholder="Enter your number"
                value={contact}
                width="100%"
                py="3"
                fontSize="16"
                onChangeText={(value) => setContact(value)}
                maxLength={10}
              />

              {"contact_number" in errors ? (
                <FormControl.ErrorMessage>
                  {errors.contact_number}
                </FormControl.ErrorMessage>
              ) : (
                <FormControl.HelperText>
                  Contact Number should contain 10 character.
                </FormControl.HelperText>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={"caste" in errors}>
              <FormControl.Label htmlFor="caste">
                <Text fontWeight={"semibold"} fontSize="14">
                  Caste
                </Text>
              </FormControl.Label>
              <CustomDropDownPicker
                open={openCastes}
                setOpen={setOpenCastes}
                value={caste}
                setValue={setCaste}
                items={enums?.caste?.sort()?.map((item) => {
                  return {
                    label: item,
                    value: item,
                  };
                })}
                placeholder="Select Caste"
                searchable={true}
                searchPlaceholder="Search Caste here..."
                onChangeValue={(value) => setCaste(value)}
              />
              {"caste" in errors ? (
                <FormControl.ErrorMessage>
                  {errors.caste}
                </FormControl.ErrorMessage>
              ) : (
                <FormControl.HelperText>
                  {/* Caste should contain atleast 3 character. */}
                </FormControl.HelperText>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={"voter_category" in errors}>
              <FormControl.Label htmlFor="voter_category">
                <Text fontWeight={"semibold"} fontSize="14">
                  Category
                </Text>
              </FormControl.Label>
              <CustomDropDownPicker
                open={openCategories}
                setOpen={setOpenCategories}
                value={category}
                setValue={setCategory}
                items={[
                  {
                    label: "General",
                    value: "General",
                  },
                  {
                    label: "OBC",
                    value: "OBC",
                  },
                  {
                    label: "SC",
                    value: "SC",
                  },
                  {
                    label: "ST",
                    value: "ST",
                  },
                ]}
                placeholder="Select Category"
                onChangeValue={(value) => setCategory(value)}
              />
              {"voter_category" in errors ? (
                <FormControl.ErrorMessage>
                  {errors.voter_category}
                </FormControl.ErrorMessage>
              ) : (
                <FormControl.HelperText>
                  {/* Caste should contain atleast 3 character. */}
                </FormControl.HelperText>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={"epic_number" in errors}>
              <FormControl.Label htmlFor="epic_number">
                <Text fontWeight={"semibold"} fontSize="14">
                  EPIC/Voter ID Number
                </Text>
              </FormControl.Label>
              <Input
                type="text"
                id="epic_number"
                name="epic_number"
                placeholder="Enter EPIC number"
                value={epicNumber}
                onChangeText={(value) => setEpicNumber(value.toUpperCase())}
                width="100%"
                py="3"
                fontSize="16"
                autoCapitalize="characters"
                maxLength={10}
              />
              {"epic_number" in errors ? (
                <FormControl.ErrorMessage>
                  {errors.epic_number}
                </FormControl.ErrorMessage>
              ) : (
                <FormControl.HelperText>
                  EPIC/Voter ID Number must be alphanumeric 10-digit code.
                </FormControl.HelperText>
              )}
            </FormControl>
            <FormControl>
              <FormControl.Label htmlFor="political_inclination">
                <Text fontWeight={"semibold"} fontSize="14">
                  Political Inclination
                </Text>
              </FormControl.Label>
              <CustomDropDownPicker
                open={openParties}
                setOpen={setOpenParties}
                value={politicalInclination}
                setValue={setPoliticalInclination}
                items={enums?.political_party?.map((item) => {
                  return {
                    label: item,
                    value: item,
                  };
                })}
                placeholder="Select Party"
                onChangeValue={(value) => setPoliticalInclination(value)}
              />
              {"political_inclination" in errors ? (
                <FormControl.ErrorMessage>Error</FormControl.ErrorMessage>
              ) : (
                <FormControl.HelperText>
                  Party supported by the voter.
                </FormControl.HelperText>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={"polling_booth" in errors}>
              <FormControl.Label htmlFor="polling_booth">
                <Text fontWeight={"semibold"} fontSize="14">
                  Polling Booth
                </Text>
              </FormControl.Label>
              <CustomDropDownPicker
                open={openBooths}
                value={pollingBooth}
                items={lists}
                setOpen={setOpenBooths}
                setValue={setPollingBooth}
                setItems={setLists}
                placeholder="Select Polling Booth"
                searchable={true}
                searchPlaceholder="Search Polling Booth here..."
                onChangeValue={(value) => setPollingBooth(value)}
              />
              {"polling_booth" in errors ? (
                <FormControl.ErrorMessage>
                  {errors.polling_booth}
                </FormControl.ErrorMessage>
              ) : (
                <FormControl.HelperText>
                  Polling booth of the voter
                </FormControl.HelperText>
              )}
            </FormControl>
            <FormControl>
              <FormControl.Label htmlFor="staunch_supporter">
                <Text fontWeight={"semibold"} fontSize="14">
                  Staunch Supporter
                </Text>
              </FormControl.Label>
              <Radio.Group
                id="staunch_supporter"
                name="staunch_supporter"
                accessibilityLabel={"staunch_supporter"}
                value={staunchSupporter}
                onChange={(value) => setStaunchSupporter(value)}
              >
                <HStack direction="row" space={4}>
                  <Radio value="Yes">Yes</Radio>
                  <Radio value="No">No</Radio>
                </HStack>
              </Radio.Group>
              {"staunch_supporter" in errors ? (
                <FormControl.ErrorMessage>Error</FormControl.ErrorMessage>
              ) : (
                <FormControl.HelperText>
                  Is voter is a Staunch Supporter (Kattar Samarthak).
                </FormControl.HelperText>
              )}
            </FormControl>
            <Button
              onPress={onSubmit}
              mt="5"
              colorScheme="primary"
              width="100%"
              py="3"
              px="1"
              fontSize="16"
              bottom={2}
            >
              Submit
            </Button>
          </VStack>
        </ScrollView>
      ) : (
        <Center h={screenHeight - 80}>
          <Spinner size={"lg"} />
        </Center>
      )}
    </View>
  );
};

export default AddVoter;

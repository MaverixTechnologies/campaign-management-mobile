import React, { useCallback, useState } from "react";
import { ScrollView } from "react-native-virtualized-view";
import {
  FormControl,
  Text,
  VStack,
  Button,
  Input,
  Select,
  Radio,
  HStack,
  Heading,
  Spinner,
  Center,
  // ScrollView,
  View,
  // ScrollView,
} from "native-base";
import { useToast } from "native-base";
import { ApiService } from "../../lib/axios";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { Dimensions } from "react-native";
const screenHeight = Dimensions.get("window").height;
const AddVoter = () => {
  const [formData, setFormData] = React.useState({});
  const [isLoaded, setIsLoaded] = useState(true);
  const [enums, setEnums] = useState({});
  const [lists, setLists] = useState();
  const [errors, setErrors] = useState({});
  const toast = useToast();
  const { userId } = useSelector((state) => state.auth);
  const validate = () => {
    if (formData.name === undefined) {
      setErrors({ ...errors, name: "Name is required" });
      return false;
    } else if (formData.name.length < 3) {
      setErrors({ ...errors, name: "Name is too short" });
      return false;
    }
    return true;
  };
  const onSubmit = () => {
    let newFormData = { ...formData, added_by: userId };
    validate()
      ? ApiService.addVoter(newFormData)
          .then((res) => {
            console.log(res);
            console.log("Submitted");
            toast.show({
              title: "Voter Added",
              placement: "top-right",
              description: "Voter Added Successfully",
            });
          })
          .catch((err) => {
            toast.show({
              title: "Error",
              placement: "top-right",
              description: err,
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

  console.log("FormaData : -", formData);
  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      // GetProfile();

      GetBooths();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );
  return (
    <View>
      {isLoaded ? (
        <ScrollView>
          <VStack
            width="90%"
            space={2}
            py={4}
            mx="auto"
            maxW="600px"
            alignItems="center"
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
                value={formData.name}
                onChangeText={(value) =>
                  setFormData({ ...formData, name: value })
                }
                width="100%"
                borderRadius="8"
                py="3"
                px="3"
                size="2xl"
                fontSize="16"
                variant={"outline"}
                color={"text"}
              />
              {"name" in errors ? (
                <FormControl.ErrorMessage>Error</FormControl.ErrorMessage>
              ) : (
                <FormControl.HelperText>
                  Name should contain atleast 3 character.
                </FormControl.HelperText>
              )}
            </FormControl>
            <FormControl isRequired>
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
                value={formData.age}
                onChangeText={(value) =>
                  setFormData({ ...formData, age: value })
                }
                width="100%"
                py="3"
                px="1"
                fontSize="16"
              />
            </FormControl>
            <FormControl isRequired>
              <FormControl.Label htmlFor="contactNumber">
                <Text fontWeight={"semibold"} fontSize="14">
                  Contact Number
                </Text>
              </FormControl.Label>
              <Input
                type="tel"
                keyboardType="numeric"
                id="contactNumber"
                name="contactNumber"
                placeholder="Enter your number"
                value={formData.contact_number}
                width="100%"
                py="3"
                px="1"
                fontSize="16"
                onChangeText={(value) =>
                  setFormData({ ...formData, contact_number: value })
                }
              />

              {"contact_number" in errors ? (
                <FormControl.ErrorMessage>Error</FormControl.ErrorMessage>
              ) : (
                <FormControl.HelperText>
                  Contact Number should contain atleast 10 character.
                </FormControl.HelperText>
              )}
            </FormControl>
            <FormControl isRequired>
              <FormControl.Label htmlFor="caste">
                <Text fontWeight={"semibold"} fontSize="14">
                  Caste
                </Text>
              </FormControl.Label>
              <Select
                id="caste"
                name="caste"
                selectedValue={formData?.caste}
                minWidth="200"
                accessibilityLabel={`Select Caste}`}
                placeholder={`Select Caste`}
                mt={1}
                py="3"
                px="1"
                onValueChange={(itemValue) =>
                  setFormData({ ...formData, caste: itemValue })
                }
              >
                {enums?.caste?.map((option, i) => (
                  <Select.Item key={i} label={option} value={option} />
                ))}
              </Select>
              {"caste" in errors ? (
                <FormControl.ErrorMessage>Error</FormControl.ErrorMessage>
              ) : (
                <FormControl.HelperText>
                  {/* Caste should contain atleast 3 character. */}
                </FormControl.HelperText>
              )}
            </FormControl>
            <FormControl isRequired>
              <FormControl.Label htmlFor="voter_category">
                <Text fontWeight={"semibold"} fontSize="14">
                  Category
                </Text>
              </FormControl.Label>
              <Select
                id="voter_category"
                name="voter_category"
                accessibilityLabel="Select Category"
                placeholder="Select Category"
                // _selectedItem={{
                //   bg: "teal.600",
                // }}
                mt="1"
                value={formData.voter_category}
                onValueChange={(value) =>
                  setFormData({ ...formData, voter_category: value })
                }
                width="100%"
                py="3"
                px="1"
                // fontSize="16"
              >
                <Select.Item label="General" value="General" />
                <Select.Item label="OBC" value="OBC" />
                <Select.Item label="SC" value="SC" />
                <Select.Item label="ST" value="ST" />
              </Select>
            </FormControl>
            <FormControl>
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
                value={formData.epic_number}
                onChangeText={(value) =>
                  setFormData({ ...formData, epic_number: value })
                }
                width="100%"
                py="3"
                px="1"
                fontSize="16"
              />
              {"epic_number" in errors ? (
                <FormControl.ErrorMessage>Error</FormControl.ErrorMessage>
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
              <Select
                id="political_inclination"
                name="political_inclination"
                value={formData.politicalInclination}
                accessibilityLabel="Select Party"
                placeholder="Select Party"
                mt="1"
                onValueChange={(value) =>
                  setFormData({ ...formData, political_inclination: value })
                }
                width="100%"
                py="3"
                px="1"
                // fontSize="16"
              >
                {enums?.political_party?.map((option, i) => (
                  <Select.Item key={i} label={option} value={option} />
                ))}
              </Select>
              {"political_inclination" in errors ? (
                <FormControl.ErrorMessage>Error</FormControl.ErrorMessage>
              ) : (
                <FormControl.HelperText>
                  Party supported by the voter.
                </FormControl.HelperText>
              )}
            </FormControl>
            <FormControl>
              <FormControl.Label htmlFor="polling_booth">
                <Text fontWeight={"semibold"} fontSize="14">
                  Polling Booth
                </Text>
              </FormControl.Label>
              <Select
                id="polling_booth"
                name="polling_booth"
                value={formData?.polling_booth}
                accessibilityLabel="Select Polling Booth"
                placeholder={
                  formData?.polling_booth
                    ? lists?.find(
                        (list) => list?.value === formData?.polling_booth
                      )?.label
                    : "Select Polling Booth"
                }
                mt="1"
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    polling_booth: value,
                  })
                }
                width="100%"
                py="3"
                px="1"
              >
                {lists?.map((option) => (
                  <Select.Item
                    key={option.id}
                    label={option.label}
                    value={option.value}
                  />
                ))}
              </Select>
              {/* <CustomSelect placeholder="Select Polling Booth" options={lists} /> */}
              {"epic_number" in errors ? (
                <FormControl.ErrorMessage>Error</FormControl.ErrorMessage>
              ) : (
                <FormControl.HelperText>
                  EPIC/Voter ID Number must be alphanumeric 10-digit code.
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
                value={formData.staunch_supporter}
                onValueChange={(value) =>
                  setFormData({ ...formData, staunch_supporter: value })
                }
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

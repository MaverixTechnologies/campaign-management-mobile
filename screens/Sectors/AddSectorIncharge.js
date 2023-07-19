import React, { useCallback, useState } from "react";
import {
  FormControl,
  VStack,
  Button,
  Input,
  // Select,
  Heading,
  Text,
} from "native-base";
import { ScrollView } from "react-native";
import { useToast } from "native-base";
import { useFocusEffect } from "@react-navigation/native";
import { ApiService } from "../../lib/axios";
const AddSectorIncharge = ({ route, navigation }) => {
  const [formData, setFormData] = useState({});
  const [sectorList, setSectorList] = useState();
  const [mandalList, setMandalList] = useState();

  const [errors, setErrors] = useState({});
  const toast = useToast();
  const { itemId } = route.params;
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

  const GetSectors = () => {
    ApiService.getSectors().then((e) => {
      // console.log(e);
      let splitData = e.data.slice(0, 10);
      setSectorList(splitData);
    });
  };
  const GetMandals = () => {
    ApiService.getMandals().then((e) => {
      // console.log(e);
      let splitData = e.data.slice(0, 10);
      setMandalList(splitData);
    });
  };
  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      GetSectors();
      GetMandals();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );
  const onSubmit = () => {
    let newFormData = { ...formData, sector: itemId };
    validate()
      ? ApiService.addSectorIncharge(newFormData)
          .then(() => {
            // console.log(res);
            // console.log("Submitted");
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
  return (
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
          Enter Sector Incharge Details
        </Heading>
        <FormControl isRequired isInvalid={"name" in errors}>
          <FormControl.Label mb="2">
            <Text fontWeight={"semibold"} fontSize="14">
              Name
            </Text>
          </FormControl.Label>
          <Input
            placeholder="Enter Sector name"
            value={formData.name}
            onChangeText={(value) => setFormData({ ...formData, name: value })}
            width="100%"
            borderRadius="8"
            py="3"
            px="3"
            size="2xl"
            fontSize="16"
            variant={"outline"}
            color={"text"}
            placeholderTextColor={"gray.500"}
            // backgroundColor={"blue.100"}
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
            borderRadius="4"
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
        {/* <FormControl isRequired>
          <FormControl.Label htmlFor="political_inclination">
            <Text fontWeight={"semibold"} fontSize="14">
              Political Inclination
            </Text>
          </FormControl.Label>
          <Select
            id="political_inclination"
            name="political_inclination"
            value={formData.politicalInclination}
            accessibilityLabel="Choose Party"
            placeholder="Choose Party"
            _selectedItem={{
              bg: "teal.600",
            }}
            mt="1"
            onChangeText={(value) =>
              setFormData({ ...formData, political_inclination: value })
            }
            width="100%"
            borderRadius="4"
            py="3"
            px="1"
            fontSize="16"
          >
            {lists.map((item, i) => {
              return (
                <Select.Item key={i} label={item.name} value={item.name} />
              );
            })}
          </Select>
        </FormControl> */}

        <Button
          onPress={onSubmit}
          mt="5"
          colorScheme="primary"
          width="100%"
          borderRadius="4"
          py="3"
          px="1"
          fontSize="16"
          // position={"sticky"}
          bottom={2}
        >
          Submit
        </Button>
      </VStack>
    </ScrollView>
  );
};

export default AddSectorIncharge;

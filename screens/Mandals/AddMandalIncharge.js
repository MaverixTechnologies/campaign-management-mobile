import React, { useCallback, useState } from "react";
import {
  FormControl,
  VStack,
  Button,
  Input,
  Heading,
  Text,
  Select,
} from "native-base";
import { ScrollView } from "react-native";
import { useToast } from "native-base";
import { useFocusEffect } from "@react-navigation/native";
import { ApiService } from "../../lib/axios";
import { useSelector } from "react-redux";
const AddMandalIncharge = ({ route }) => {
  const [formData, setFormData] = useState({});
  // const [sectorList, setSectorList] = useState();
  const [mandalList, setMandalList] = useState([]);
  const [errors, setErrors] = useState({});
  const toast = useToast();
  const { userId } = useSelector((state) => state.auth);
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

  const onSubmit = () => {
    let newFormData = { ...formData, mandal: itemId, added_by: userId };
    validate()
      ? ApiService.addMandalIncharge(newFormData)
          .then((res) => {
            console.log(res);
            console.log("Submitted");
            toast.show({
              title: "Mandal Incharge Added",
              placement: "top-right",
              description: "Mandal Incharge Successfully",
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
  const GetMandals = () => {
    ApiService.getMandals().then((e) => {
      // console.log(e);
      // let splitData = e.data.slice(0, 10);
      setMandalList(e.data);
    });
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
          Enter Mandalam Incharge Details
        </Heading>
        <FormControl isRequired isInvalid={"name" in errors}>
          <FormControl.Label mb="2">
            <Text fontWeight={"semibold"} fontSize="14">
              Name
            </Text>
          </FormControl.Label>
          <Input
            placeholder="Enter Mandal Incharge name"
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
          <FormControl.Label htmlFor="mandalam">
            <Text fontWeight={"semibold"} fontSize="14">
              Mandalam
            </Text>
          </FormControl.Label>
          <Select
            id="mandalam"
            name="mandalam"
            accessibilityLabel="Choose Mandalam"
            placeholder="Choose Mandalam"
            _selectedItem={{
              bg: "teal.600",
            }}
            mt="1"
            value={formData.mandalam}
            onValueChange={(value) =>
              setFormData({ ...formData, mandalam: value })
            }
            width="100%"
            borderRadius="4"
            py="3"
            px="1"
            fontSize="16"
          >
            {mandalList.map((item) => {
              return (
                <Select.Item
                  key={item.id}
                  label={item.name}
                  value={item.name}
                />
              );
            })}
          </Select>
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
            placeholder="Enter Mobile number"
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

export default AddMandalIncharge;

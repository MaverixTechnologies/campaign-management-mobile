import React from "react";
import {
  FormControl,
  Text,
  VStack,
  Button,
  Input,
  //   Select,
  //   Radio,
  //   HStack,
  Heading,
} from "native-base";
import { ScrollView } from "react-native";
import { useToast } from "native-base";
import { ApiService } from "../../lib/axios";
const AddNewMember = () => {
  const [formData, setFormData] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const toast = useToast();
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
    validate()
      ? ApiService.addVoter(formData)
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
          Enter Member Details
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
            onChangeText={(value) => setFormData({ ...formData, name: value })}
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
            onChangeText={(value) => setFormData({ ...formData, age: value })}
            width="100%"
            borderRadius="4"
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
        <FormControl>
          <FormControl.Label htmlFor="epic_number">
            <Text fontWeight={"semibold"} fontSize="14">
              EPIC Number
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
            borderRadius="4"
            py="3"
            px="1"
            fontSize="16"
          />
          {"epic_number" in errors ? (
            <FormControl.ErrorMessage>Error</FormControl.ErrorMessage>
          ) : (
            <FormControl.HelperText>
              Name should contain atleast 3 character.
            </FormControl.HelperText>
          )}
        </FormControl>
        <FormControl>
          <FormControl.Label htmlFor="polling_booth">
            <Text fontWeight={"semibold"} fontSize="14">
              Polling Booth
            </Text>
          </FormControl.Label>
          <Input
            type="text"
            id="polling_booth"
            name="polling_booth"
            placeholder="Enter polling booth"
            value={formData.polling_booth}
            onChangeText={(value) =>
              setFormData({ ...formData, polling_booth: value })
            }
            width="100%"
            borderRadius="4"
            py="3"
            px="1"
            fontSize="16"
          />
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

export default AddNewMember;

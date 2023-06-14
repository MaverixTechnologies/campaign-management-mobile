import React from "react";
import {
  VStack,
  Input,
  Icon,
  Select,
  Button,
  FormControl,
  Text,
  ScrollView,
  Center,
  HStack,
  Badge,
  View,
} from "native-base";
import { useToast } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
// import { ApiService } from "../../lib/axios";
import SearchList from "../../components/Lists/SearchList";
const SearchVoters = () => {
  const [formData, setFormData] = React.useState({});
  const [errors, setErrors] = React.useState({});
  // const [results, setResults] = React.useState([]);
  const [show, setShow] = React.useState(false);
  const toast = useToast();
  const validate = () => {
    if (formData.search === undefined) {
      setErrors({ ...errors, search: "Search Text is required" });
      return false;
    } else if (formData.search.length < 3) {
      setErrors({ ...errors, search: "Search Text is too short" });
      return false;
    }
    return true;
  };
  const onSubmit = () => {
    validate()
      ? setShow(true)
      : toast.show({
          variant: "subtle",
          title: "Something went wrong",
          placement: "top-right",
          description: errors.search,
          isClosable: true,
        });
    //   ? ApiService.addVoter(formData)
    //       .then((res) => {
    //         console.log(res);
    //         console.log("Submitted");
    //         // setResults(res.results);
    //         toast.show({
    //           title: "Voter Added",
    //           placement: "top-right",
    //           description: "Voter Added Successfully",
    //         });
    //       })
    //       .catch((err) => {
    //         toast.show({
    //           title: "Error",
    //           placement: "top-right",
    //           description: err,
    //         });
    //       })
    //   : console.log("Validation Failed");
    console.log("Formdata : -", formData);
  };
  return (
    <>
      {!show ? (
        <View>
          <VStack
            mt="4"
            width="90%"
            space={2}
            py={4}
            mx="auto"
            maxW="600px"
            alignItems="center"
          >
            <FormControl isRequired>
              <FormControl.Label htmlFor="contactNumber">
                <Text fontWeight={"semibold"} fontSize="14">
                  Search Here
                </Text>
              </FormControl.Label>
              <Input
                placeholder="Search People & Places"
                width="100%"
                borderRadius="4"
                py="3"
                px="1"
                fontSize="14"
                InputLeftElement={
                  <Icon
                    m="2"
                    ml="3"
                    size="6"
                    color="gray.400"
                    as={<MaterialIcons name="search" />}
                  />
                }
                onChangeText={(value) =>
                  setFormData({ ...formData, search: value })
                }
              />
              {/* {"search" in errors ? (
                <FormControl.ErrorMessage>Error</FormControl.ErrorMessage>
              ) : (
                <FormControl.HelperText>
                  Search text should contain atleast 3 character.
                </FormControl.HelperText>
              )} */}
            </FormControl>
            <FormControl>
              <FormControl.Label htmlFor="voter_category">
                <Text fontWeight={"semibold"} fontSize="14">
                  Search by Role
                </Text>
              </FormControl.Label>
              <Select
                id="search_by_role"
                name="search_by_role"
                accessibilityLabel="Choose Role"
                placeholder="Choose Role"
                _selectedItem={{
                  bg: "teal.600",
                }}
                mt="1"
                value={formData.role}
                onValueChange={(value) =>
                  setFormData({ ...formData, role: value })
                }
                width="100%"
                borderRadius="4"
                py="3"
                px="1"
                fontSize="16"
              >
                <Select.Item label="Voter" value="Voter" />
                <Select.Item label="Mandal Incharge" value="MI" />
                <Select.Item label="Sector Incharge" value="SI" />
                <Select.Item label="Booth Level Agent" value="BLA" />
                <Select.Item label="Booth Co-ordinator" value="BC" />
                <Select.Item label="Polling Agent" value="PA" />
              </Select>
            </FormControl>
            <Text fontWeight={"semibold"} fontSize="14">
              OR
            </Text>
            <FormControl>
              <FormControl.Label htmlFor="voter_category">
                <Text fontWeight={"semibold"} fontSize="14">
                  Search by Division
                </Text>
              </FormControl.Label>
              <Select
                id="search_by_division"
                name="search_by_division"
                accessibilityLabel="Choose Division"
                placeholder="Choose Division"
                _selectedItem={{
                  bg: "teal.600",
                }}
                mt="1"
                value={formData.division}
                onValueChange={(value) =>
                  setFormData({ ...formData, division: value })
                }
                width="100%"
                borderRadius="4"
                py="3"
                px="1"
                fontSize="16"
              >
                <Select.Item label="Mandal" value="Mandal" />
                <Select.Item label="Sector" value="Sector" />
                <Select.Item label="Booth" value="Booth" />
                <Select.Item label="Polling" value="Polling" />
              </Select>
            </FormControl>
          </VStack>
          <Center>
            <Button
              onPress={onSubmit}
              mt="5"
              colorScheme="primary"
              width="90%"
              borderRadius="4"
              py="3"
              px="1"
              fontSize="16"
              maxW="600px"
              // position={"sticky"}
              // bottom={2}
            >
              Submit
            </Button>
          </Center>
        </View>
      ) : (
        <>
          <VStack mt="4" width="100%" space={4}>
            <HStack
              background={"gray.50"}
              justifyContent={"space-between"}
              px={4}
            >
              <HStack space={4}>
                <Badge rounded={"lg"} colorScheme="info">
                  {formData.search}
                </Badge>
                {formData?.role ? (
                  <Badge rounded={"lg"} colorScheme="info">
                    {formData.role}
                  </Badge>
                ) : null}
                {formData?.division ? (
                  <Badge rounded={"lg"} colorScheme="info">
                    {formData.division}
                  </Badge>
                ) : null}
              </HStack>

              <Button
                colorScheme="red"
                leftIcon={<Icon as={MaterialIcons} name="cancel" size="sm" />}
                onPress={() => setShow(false)}
                rounded={"full"}
              >
                Reset
              </Button>
            </HStack>
            <ScrollView showsVerticalScrollIndicator={false}>
              <SearchList />
            </ScrollView>
          </VStack>
        </>
      )}
    </>
  );
};

export default SearchVoters;

import React, { useCallback, useState } from "react";
import {
  VStack,
  HStack,
  IconButton,
  Text,
  ScrollView,
  Button,
  Badge,
  Icon,
  // Alert,
  useToast,
  Spinner,
  Center,
} from "native-base";
import { useFocusEffect } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import AgeRangeInput from "./AgeRangeInput";
import NameInput from "./NameInput";
import CasteFilter from "./CasteFilter";
import CategoryFilter from "./CategoryFilter";
import DeadAliveFilter from "./DeadAliveFilter";
// import GenderFilter from "./GenderFilter";
import RegionFilter from "./RegionFilter";
import { ApiService } from "../../../lib/axios";
import VoterList from "../../../components/Lists/VoterList";
import { Dimensions } from "react-native";
import GenderFilter from "./GenderFilter";
import AdvanceFilter from "./AdvanceFilter";
import ToastAlert from "../../../components/Alert/ToastAlert";
const screenHeight = Dimensions.get("window").height;

const Filters = ({ screenWidth, route, navigation }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  const [results, setResults] = useState([]);
  const [enums, setEnums] = useState({});
  const { filter } = route.params;
  // const filter = "age-range";
  const [isLoaded, setIsLoaded] = useState(true);
  const toast = useToast();
  const filterOn =
    filter === "age-range"
      ? "Age Range"
      : filter === "first-name"
      ? "First Name"
      : filter === "last-name"
      ? "Last Name"
      : filter === "caste"
      ? "Caste"
      : filter === "gender"
      ? "Gender"
      : filter === "category"
      ? "Category"
      : "Advance";
  const { goBack } = navigation;
  const onSubmit = () => {
    setIsLoaded(false);
    const apidata = {
      filters: JSON.stringify(formData),
    };
    ApiService.filterVoters(apidata)
      .then((res) => {
        // console.log(res);
        // console.log("Submitted");
        // setResults(res.data?.results);
        setIsLoaded(true);
        !res.data?.results.length > 0
          ? toast.show({
              render: () => {
                return (
                  <ToastAlert
                    title="No result found for the query!"
                    description="Try searching another."
                    toast={toast}
                    id={"filternotfound"}
                    isClosable={true}
                  />
                );
              },
              placement: "top-right",
              id: "filternotfound",
              isClosable: true,
            })
          : setResults(res.data?.results);
      })
      .catch((err) => {
        console.log(err);
        toast.show({
          render: () => {
            return (
              <ToastAlert
                title="Something Went Wrong!!"
                description="Please try again in sometime."
                status="error"
                toast={toast}
                id={"filtersomethingwentwrong"}
                isClosable={true}
              />
            );
          },
          placement: "top-right",
          id: "filtersomethingwentwrong",
          isClosable: true,
        });
        setIsLoaded(true);
        setFormData({});
      });
  };
  const GetEnums = () => {
    setIsLoaded(false);
    ApiService.getEnums().then((e) => {
      setEnums(e.data);
      setIsLoaded(true);
    });
  };

  const onResetFilter = () => {
    setResults([]);
    setFormData({});
  };
  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      // GetProfile();
      filter === "age-range" ||
      filter === "first-name" ||
      filter === "gender" ||
      filter === "last-name"
        ? null
        : GetEnums();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        setResults([]);
        setFormData({});
      };
    }, [filter])
  );
  return (
    <ScrollView bgColor={"primary.50"} w={"100%"}>
      <HStack
        space={2}
        p={1}
        bgColor={"secondary.50"}
        alignItems={"center"}
        justifyContent={"flex-start"}
        borderBottomColor={"primary.100"}
        borderBottomWidth={1}
        w={screenWidth > 800 ? "800" : screenWidth}
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
        <Text
          color="coolGray.600"
          _dark={{
            color: "warmGray.200",
          }}
          bold
        >
          Go back
        </Text>
      </HStack>
      {!results?.length > 0 ? (
        <Center w={"100%"}>
          {isLoaded ? (
            <VStack space={"2"} pt={4} pb={4} w={"100%"} alignItems={"center"}>
              {filter === "first-name" || filter === "last-name" ? (
                <NameInput
                  filter={filter}
                  formData={formData}
                  setFormData={setFormData}
                  show={show}
                  setShow={setShow}
                  errors={errors}
                  setErrors={setErrors}
                  filterOn={filterOn}
                  searchKey={
                    filter === "first-name"
                      ? "first_name"
                      : filter === "last-name"
                      ? "last_name"
                      : "full_name"
                  }
                />
              ) : filter === "age-range" ? (
                <AgeRangeInput
                  filter={filter}
                  formData={formData}
                  setFormData={setFormData}
                  show={show}
                  setShow={setShow}
                  errors={errors}
                  setErrors={setErrors}
                  searchKey={"age"}
                  filterOn={filterOn}
                />
              ) : filter === "gender" ? (
                <GenderFilter
                  filter={filter}
                  formData={formData}
                  setFormData={setFormData}
                  show={show}
                  setShow={setShow}
                  errors={errors}
                  setErrors={setErrors}
                  filterOn={filterOn}
                  searchKey={"gender"}
                />
              ) : filter === "caste" ? (
                <CasteFilter
                  filter={filter}
                  formData={formData}
                  setFormData={setFormData}
                  show={show}
                  setShow={setShow}
                  errors={errors}
                  setErrors={setErrors}
                  filterOn={filterOn}
                  searchKey={"caste"}
                  options={
                    enums?.caste
                      ? enums?.caste?.map((item) => ({
                          label: item,
                          value: item,
                        }))
                      : []
                  }
                />
              ) : filter === "category" ? (
                <CategoryFilter
                  filter={filter}
                  formData={formData}
                  setFormData={setFormData}
                  show={show}
                  setShow={setShow}
                  errors={errors}
                  setErrors={setErrors}
                  filterOn={filterOn}
                  options={
                    enums?.category
                      ? enums?.category?.map((item) => ({
                          label: item,
                          value: item,
                        }))
                      : []
                  }
                  searchKey={"category"}
                />
              ) : filter === "region" ? (
                <RegionFilter
                  filter={filter}
                  formData={formData}
                  setFormData={setFormData}
                  show={show}
                  setShow={setShow}
                  errors={errors}
                  setErrors={setErrors}
                  filterOn={filterOn}
                />
              ) : filter === "dead-alive" ? (
                <DeadAliveFilter
                  filter={filter}
                  formData={formData}
                  setFormData={setFormData}
                  show={show}
                  setShow={setShow}
                  errors={errors}
                  setErrors={setErrors}
                  filterOn={filterOn}
                />
              ) : (
                <AdvanceFilter
                  filter={filter}
                  formData={formData}
                  setFormData={setFormData}
                  show={show}
                  setShow={setShow}
                  errors={errors}
                  setErrors={setErrors}
                  filterOn={filterOn}
                  enums={enums}
                />
              )}
              <Button borderRadius={8} onPress={onSubmit}>
                Search
              </Button>
            </VStack>
          ) : (
            <Center h={screenHeight - 80}>
              <Spinner size={"lg"} />
            </Center>
          )}
        </Center>
      ) : (
        <VStack w={"100%"}>
          <HStack
            background={"primary.50"}
            justifyContent={"space-between"}
            px={4}
            py={2}
          >
            <HStack space={4}>
              {/* {formData.values((value) => (
                <Badge rounded={"lg"} colorScheme="info">
                  {value}
                </Badge>
              ))} */}
              {Object.keys(formData).map((key) => {
                // if (key === "age_min" || key === "age_max") {
                //   return (
                //     <Badge
                //       key={key}
                //       rounded={"lg"}
                //       colorScheme="secondary"
                //       mr={2}
                //     >
                //       {`${formData.age_min} - ${formData.age_max}`}
                //     </Badge>
                //   );
                // } else {
                return (
                  <Badge
                    rounded={"lg"}
                    colorScheme="secondary"
                    key={key}
                    mr={2}
                  >
                    {formData[key]}
                  </Badge>
                );
                // }
              })}
            </HStack>
            <Button
              colorScheme="red"
              leftIcon={<Icon as={MaterialIcons} name="cancel" size="sm" />}
              onPress={() => onResetFilter()}
              rounded={"full"}
              size={"sm"}
            >
              Reset
            </Button>
          </HStack>
          <VoterList data={results} />
        </VStack>
      )}
    </ScrollView>
  );
};

export default Filters;

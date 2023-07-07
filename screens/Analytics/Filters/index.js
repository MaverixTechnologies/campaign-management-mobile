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
import GenderFilter from "./GenderFilter";
const Filters = ({ screenWidth, route, navigation }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  const [results, setResults] = useState([]);
  const [enums, setEnums] = useState({});
  const { filter } = route.params;
  // const filter = "age-range";

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
      : null;
  const { goBack } = navigation;
  const onSubmit = () => {
    const apidata = {
      filters: JSON.stringify(formData),
    };
    ApiService.filterVoters(apidata).then((res) => {
      console.log(res);
      console.log("Submitted");
      setResults(res.data?.results);
    });
  };
  // console.log("Formdata : -", formData);
  const GetEnums = () => {
    ApiService.getEnums().then((e) => {
      setEnums(e.data);
    });
  };
  console.log("enums enums", enums);
  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      // GetProfile();
      GetEnums();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
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
        <VStack
          // bg={{
          //   linearGradient: {
          //     colors: ["primary.50", "emerald.100"],
          //     start: [0, 0],
          //     end: [0, 1],
          //   },
          // }}
          space={"2"}
          pt={4}
          pb={4}
          w={"100%"}
          alignItems={"center"}
        >
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
          ) : null}
          <Button borderRadius={8} onPress={onSubmit}>
            Search
          </Button>
        </VStack>
      ) : (
        <VStack w={"100%"}>
          <HStack
            background={"primary.50"}
            justifyContent={"space-between"}
            px={4}
            py={2}
          >
            <HStack space={4}>
              <Badge rounded={"lg"} colorScheme="info">
                {filterOn}
              </Badge>
            </HStack>
            <Button
              colorScheme="red"
              leftIcon={<Icon as={MaterialIcons} name="cancel" size="sm" />}
              onPress={() => setResults([])}
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

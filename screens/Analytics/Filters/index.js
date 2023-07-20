import React, { useCallback, useState } from "react";
import {
  VStack,
  HStack,
  IconButton,
  Text,
  // ScrollView,
  Button,
  Badge,
  Icon,
  useToast,
  Spinner,
  Center,
  View,
} from "native-base";
import { useFocusEffect } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import AgeRangeInput from "./AgeRangeInput";
import NameInput from "./NameInput";
import CasteFilter from "./CasteFilter";
import CategoryFilter from "./CategoryFilter";
import DeadAliveFilter from "./DeadAliveFilter";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { filter } = route.params;
  const [isLoaded, setIsLoaded] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

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
    ApiService.filterVoters(apidata, 1)
      .then((res) => {
        setIsLoaded(true);
        if (!res.data?.results.length > 0) {
          toast.show({
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
          });
        } else {
          setResults(res.data?.results);
          setTotalPages(res.data?.total);
          setCurrentPage(1);
        }
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
  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setIsLoadingMore(true);
      const nextPage = currentPage + 1;
      const apidata = {
        filters: JSON.stringify(formData),
      };
      ApiService.filterVoters(apidata, nextPage)
        .then((res) => {
          if (!res.data?.results.length > 0) {
            toast.show({
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
            });
            setIsLoadingMore(false);
          } else {
            const newData = res.data?.results;
            setResults((prevResults) => [...prevResults, ...newData]);
            setCurrentPage(nextPage);
            setIsLoadingMore(false);
          }
        })
        .catch((err) => {
          toast.show({
            render: () => {
              return (
                <ToastAlert
                  title={Object.keys(err?.response?.data)[0] || err?.code}
                  description={
                    Object.values(err?.response?.data)[0] || err?.message
                  }
                  status="error"
                  toast={toast}
                  id={"filtersomethingwentwrong2"}
                  isClosable={true}
                />
              );
            },
            placement: "top-right",
            id: "filtersomethingwentwrong2",
            isClosable: true,
          });
          setIsLoadingMore(false);
        });
    }
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
    <View bgColor={"primary.50"} w={"100%"} maxH={"full"} overflow={"scroll"}>
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
              {Object.keys(formData).map((key) => {
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
          {results.length > 0 && currentPage < totalPages && (
            <HStack w={"100%"} justifyContent={"center"}>
              <Button
                onPress={handleLoadMore}
                isLoading={isLoadingMore}
                // mt={4}
                // colorScheme="primary"
                bg={"transparent"}
                variant={"ghost"}
                isLoadingText="Loading"
              >
                Load More Results
              </Button>
            </HStack>
          )}
        </VStack>
      )}
    </View>
  );
};

export default Filters;

import { Box } from "native-base";
import React from "react";
import AgeRangeInput from "./AgeRangeInput";
import NameInput from "./NameInput";
import CasteFilter from "./CasteFilter";
import GenderFilter from "./GenderFilter";
import CategoryFilter from "./CategoryFilter";
const AdvanceFilter = ({
  filter,
  formData,
  setFormData,
  show,
  setShow,
  errors,
  setErrors,
  // filterOn,
  enums,
}) => {
  return (
    <Box w={"100%"}>
      <NameInput
        filter={filter}
        formData={formData}
        setFormData={setFormData}
        show={show}
        setShow={setShow}
        errors={errors}
        setErrors={setErrors}
        filterOn={"Full Name"}
        searchKey={"full_name"}
      />
      <AgeRangeInput
        filter={filter}
        formData={formData}
        setFormData={setFormData}
        show={show}
        setShow={setShow}
        errors={errors}
        setErrors={setErrors}
        searchKey={"age"}
        filterOn={"Age"}
      />
      <GenderFilter
        filter={filter}
        formData={formData}
        setFormData={setFormData}
        show={show}
        setShow={setShow}
        errors={errors}
        setErrors={setErrors}
        filterOn={"Gender"}
        searchKey={"gender"}
      />
      <CasteFilter
        filter={filter}
        formData={formData}
        setFormData={setFormData}
        show={show}
        setShow={setShow}
        errors={errors}
        setErrors={setErrors}
        filterOn={"Caste"}
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
      <CategoryFilter
        filter={filter}
        formData={formData}
        setFormData={setFormData}
        show={show}
        setShow={setShow}
        errors={errors}
        setErrors={setErrors}
        filterOn={"Category"}
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
    </Box>
  );
};

export default AdvanceFilter;

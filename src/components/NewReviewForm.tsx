import React from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-native";
import { StyleSheet, View } from "react-native";
import { Formik, FormikProps } from "formik";
import * as yup from "yup";

import {
  CreateReviewInput,
  CreateReviewResult,
  NewReviewFormValues,
} from "../types";
import FormikTextInput from "./FormikTextInput";
import Button from "./Button";
import theme from "../theme";
import { CREATE_REVIEW } from "../graphql/mutations";

const NewReviewForm = () => {
  const [createReview] = useMutation<CreateReviewResult, CreateReviewInput>(
    CREATE_REVIEW
  );
  const navigate = useNavigate();

  const handleSubmit = async (values: NewReviewFormValues) => {
    try {
      const { ownerName, repositoryName, rating, text } = values;
      const { data } = await createReview({
        variables: {
          review: { ownerName, repositoryName, rating: Number(rating), text },
        },
      });
      navigate(`/repositories/${data?.createReview.repositoryId}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit }: FormikProps<NewReviewFormValues>) => (
        <FormContent onSubmit={handleSubmit} />
      )}
    </Formik>
  );
};

const FormContent = ({ onSubmit }: Props) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="ownerName" placeholder="Repository owner name" />
      <FormikTextInput name="repositoryName" placeholder="Repository name" />
      <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
      <FormikTextInput name="text" placeholder="Review" multiline />
      <Button text="Create a review" onPress={onSubmit} />
    </View>
  );
};

interface Props {
  onSubmit: () => void;
}

const initialValues = {
  ownerName: "",
  repositoryName: "",
  rating: 0,
  text: "",
};

const validationSchema = yup.object<NewReviewFormValues>().shape({
  ownerName: yup.string().required("Repository owner name is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup
    .number()
    .required("Rating is required")
    .moreThan(-1, "Rating must be between 0 and 100")
    .lessThan(101, "Rating must be between 0 and 100")
    .integer("Rating must be an integer"),
  text: yup.string(),
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: 15,
  },
});

export default NewReviewForm;

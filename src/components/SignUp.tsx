import React from "react";
import { useMutation } from "@apollo/client";
import { StyleSheet, View } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";

import useSignIn from "../hooks/useSignIn";
import theme from "../theme";
import { CREATE_USER } from "../graphql/mutations";
import Button from "./Button";
import FormikTextInput from "./FormikTextInput";

const SignUp = () => {
  const [signUp] = useMutation<CreateUserResult, CreateUserInput>(CREATE_USER);
  const [signIn] = useSignIn();

  const handleSubmit = async (values: SignUpFormValues) => {
    console.log(values);
    const { username, password } = values;
    try {
      await signUp({
        variables: {
          user: { username, password },
        },
      });
      await signIn({ username, password });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Formik<SignUpFormValues>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignUpForm = ({ onSubmit }: SignUpFormProps) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      <FormikTextInput
        name="passwordConfirmation"
        placeholder="Password confirmation"
        secureTextEntry
      />
      <Button text="Sign up" onPress={onSubmit} />
    </View>
  );
};

interface SignUpFormProps {
  onSubmit: () => void;
}

interface SignUpFormValues {
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface CreateUserInput {
  user: {
    username: string;
    password: string;
  };
}

interface CreateUserResult {
  createUser: {
    id: string;
  };
}

const initialValues: SignUpFormValues = {
  username: "",
  password: "",
  passwordConfirmation: "",
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(1, "Username must have at least 1 character")
    .max(50, "Username must have at most 50 characters"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Password must have at least 1 character")
    .max(50, "Password must have at most 50 characters"),
  passwordConfirmation: yup
    .string()
    .required("Password confirmation is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: 15,
  },
});

export default SignUp;

import React from "react";
import { View, StyleSheet } from "react-native";
import { useNavigate } from "react-router-native";
import { Formik, FormikProps } from "formik";
import * as yup from "yup";

import useSignIn from "../hooks/useSignIn";
import theme from "../theme";
import { LoginFormValues } from "../types";
import Button from "./Button";
import FormikTextInput from "./FormikTextInput";

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values: LoginFormValues) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log(data?.authenticate.accessToken);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return <SignInContainer onSubmit={onSubmit} />;
};

export const SignInContainer = ({ onSubmit }: SignInContainerProps) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }: FormikProps<LoginFormValues>) => (
        <View style={styles.container}>
          <FormikTextInput name="username" placeholder="Username" />
          <FormikTextInput
            name="password"
            placeholder="Password"
            secureTextEntry
          />
          <Button text="Sign in" onPress={() => handleSubmit()} />
        </View>
      )}
    </Formik>
  );
};

interface SignInContainerProps {
  onSubmit: (values: LoginFormValues) => Promise<void>;
}

const initialValues: LoginFormValues = {
  username: "",
  password: "",
};

const validationSchema = yup.object<LoginFormValues>().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: 15,
  },
});

export default SignIn;

import React from "react";
import { View, StyleSheet, Pressable, Alert } from "react-native";
import { useNavigate } from "react-router-native";
import { Formik, FormikProps } from "formik";
import * as yup from "yup";

import theme from "../theme";
import { LoginFormValues } from "../types";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import useSignIn from "../hooks/useSignIn";

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values: LoginFormValues) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log(data?.authenticate.accessToken);
      Alert.alert(JSON.stringify(data?.authenticate.accessToken));
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

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
          <Pressable style={styles.button} onPress={() => handleSubmit()}>
            <Text color="white" fontSize="subheading" fontWeight="bold">
              Sign in
            </Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

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
  button: {
    color: theme.colors.white,
    backgroundColor: theme.colors.primary,
    width: "100%",
    height: 50,
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});

export default SignIn;

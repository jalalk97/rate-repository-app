import React from "react";
import { View, StyleSheet, Pressable, Alert } from "react-native";
import { Formik, FormikProps } from "formik";
import * as yup from "yup";

import theme from "../theme";
import { LoginFormValues } from "../types";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";

const SignIn = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }: FormikProps<LoginFormValues>) => (
        <View style={styles.container}>
          <FormikTextInput name="Username" placeholder="Username" />
          <FormikTextInput
            name="Password"
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
  Username: "",
  Password: "",
};

const validationSchema = yup.object<LoginFormValues>().shape({
  Username: yup.string().required(),
  Password: yup.string().required(),
});

const onSubmit = (values: LoginFormValues) => {
  console.log(values);
  Alert.alert(JSON.stringify(values));
};

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

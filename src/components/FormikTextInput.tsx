import React from "react";
import { useField } from "formik";
import { StyleSheet, TextInputProps } from "react-native";

import theme from "../theme";
import Text from "./Text";
import TextInput from "./TextInput";

const FormikTextInput = ({ name, ...textInputProps }: Props) => {
  const [field, meta, helpers] = useField(name);

  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={!!showError}
        {...textInputProps}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

interface Props extends TextInputProps {
  name: string;
}

const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
    color: theme.colors.error,
  },
});

export default FormikTextInput;

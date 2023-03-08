import React from "react";
import {
  TextInput as NativeTextInput,
  StyleSheet,
  TextInputProps,
} from "react-native";

import theme from "../theme";

const TextInput = ({ error, ...textInputProps }: Props) => {
  const { style } = textInputProps;
  const textInputStyle = [styles.input, error && styles.inputError, style];

  return <NativeTextInput style={textInputStyle} {...textInputProps} />;
};

interface Props extends TextInputProps {
  error: boolean;
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: theme.colors.white,
    width: "100%",
    height: 50,
    paddingLeft: 15,
    marginTop: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.colors.grey,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
});

export default TextInput;

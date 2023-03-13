import React from "react";
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";

import theme from "../theme";
import Text from "./Text";

const Button = ({ text, error = false, ...pressableProps }: Props) => {
  const pressableStyle = [
    styles.button,
    pressableProps.style as StyleProp<ViewStyle>,
    error && styles.error,
  ];

  return (
    <Pressable {...pressableProps} style={pressableStyle}>
      <Text color="white" fontSize="subheading" fontWeight="bold">
        {text}
      </Text>
    </Pressable>
  );
};

interface Props extends PressableProps {
  text: string;
  error?: boolean;
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    flexGrow: 1,
    flexShrink: 1,
    height: 50,
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  error: {
    backgroundColor: theme.colors.error,
  },
});

export default Button;

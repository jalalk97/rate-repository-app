import React from "react";
import { Pressable, PressableProps, StyleSheet } from "react-native";

import theme from "../theme";
import Text from "./Text";

const Button = ({ text, ...pressableProps }: Props) => {
  return (
    <Pressable {...pressableProps} style={styles.button}>
      <Text color="white" fontSize="subheading" fontWeight="bold">
        {text}
      </Text>
    </Pressable>
  );
};

interface Props extends PressableProps {
  text: string;
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    width: "100%",
    height: 50,
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});

export default Button;

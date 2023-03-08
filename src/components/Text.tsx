import React from "react";
import { Text as NativeText, StyleSheet, TextProps } from "react-native";

import theme, { Theme } from "../theme";

const Text = ({ color, fontSize, fontWeight, ...textProps }: Props) => {
  const { style } = textProps;
  const textStyle = [
    styles.text,
    color === "textSecondary" && styles.colorTextSecondary,
    color === "primary" && styles.colorPrimary,
    color === "white" && styles.colorWhite,
    color === "grey" && styles.colorGrey,
    color === "backgroundDark" && styles.colorBackgroundDark,
    color === "backgroundLight" && styles.colorBackgroundLight,
    color === "error" && styles.colorError,
    fontSize === "subheading" && styles.fontSizeSubheading,
    fontWeight === "bold" && styles.fontWeightBold,
    style,
  ];

  return <NativeText style={textStyle} {...textProps} />;
};

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  colorWhite: {
    color: theme.colors.white,
  },
  colorGrey: {
    color: theme.colors.grey,
  },
  colorBackgroundDark: {
    color: theme.colors.backgroundDark,
  },
  colorBackgroundLight: {
    color: theme.colors.backgroundLight,
  },
  colorError: {
    color: theme.colors.error,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
});

interface Props extends TextProps {
  color?: keyof Theme["colors"];
  fontSize?: keyof Theme["fontSizes"];
  fontWeight?: keyof Theme["fontWeights"];
}

export default Text;

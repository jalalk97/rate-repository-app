import React from "react";
import { StyleSheet, Pressable } from "react-native";
import { Link } from "react-router-native";

import theme from "../theme";
import Text from "./Text";

const AppBarTab = ({ tabName, link }: Props) => {
  return (
    <Pressable>
      <Link to={link}>
        <Text style={styles.item}>{tabName}</Text>
      </Link>
    </Pressable>
  );
};

interface Props {
  tabName: string;
  link: string;
}

const styles = StyleSheet.create({
  item: {
    color: theme.colors.white,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    padding: 15,
  },
});

export default AppBarTab;

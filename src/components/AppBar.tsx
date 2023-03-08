import React from "react";
import Constants from "expo-constants";
import { View, StyleSheet, ScrollView } from "react-native";

import theme from "../theme";
import AppBarTab from "./AppBarTab";

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab tabName="Repositories" link="/" />
        <AppBarTab tabName="Sign in" link="/signin" />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.backgroundDark,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});

export default AppBar;

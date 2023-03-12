import React from "react";
import Constants from "expo-constants";
import { View, StyleSheet, ScrollView } from "react-native";

import theme from "../theme";
import AppBarTab from "./AppBarTab";
import { useApolloClient, useQuery } from "@apollo/client";
import { CURRENT_USER } from "../graphql/queries";
import { CurrentUserResponse } from "../types";
import { useAuthStorage } from "../contexts/AuthStorageContext";

const AppBar = () => {
  const { data } = useQuery<CurrentUserResponse>(CURRENT_USER);
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();

  const handleSignOut = async () => {
    await authStorage?.removeAccessToken();
    apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab tabName="Repositories" link="/" />
        {data?.me && (
          <AppBarTab tabName="Create a review" link="/reviews/new" />
        )}
        {data?.me && <AppBarTab tabName="My reviews" link="/reviews" />}
        {data?.me && (
          <AppBarTab
            tabName="Sign out"
            onPress={async () => await handleSignOut()}
          />
        )}
        {!data?.me && <AppBarTab tabName="Sign in" link="/signin" />}
        {!data?.me && <AppBarTab tabName="Sign up" link="/signup" />}
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

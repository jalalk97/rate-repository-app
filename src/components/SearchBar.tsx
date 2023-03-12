import React from "react";
import { StyleSheet } from "react-native";
import { Searchbar, SearchbarProps } from "react-native-paper";

import theme from "../theme";

const SearchBar = ({ value, onChangeText }: SearchbarProps) => {
  return (
    <Searchbar
      onChangeText={onChangeText}
      value={value}
      placeholder="Search"
      placeholderTextColor={theme.colors.textSecondary}
      style={styles.searchBar}
    />
  );
};

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: theme.colors.white,
    borderRadius: 5,
    margin: 15,
    marginBottom: 0,
  },
});

export default SearchBar;

import React from "react";
import { FlatList, View, StyleSheet } from "react-native";

import useRepositories from "../hooks/useRepositories";
import { Repository } from "../types";
import RepositoryItem from "./RepositoryItem";

const RepositoryList = () => {
  const { data } = useRepositories();

  const repositoryNodes =
    data?.repositories.edges.map((edge) => edge.node) ?? [];

  return (
    <FlatList<Repository>
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem repository={item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export default RepositoryList;

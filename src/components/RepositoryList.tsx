import React from "react";
import { FlatList, View, StyleSheet } from "react-native";

import useRepositories from "../hooks/useRepositories";
import { RepositoriesResponse, Repository } from "../types";
import RepositoryItem from "./RepositoryItem";

const RepositoryList = () => {
  const { data } = useRepositories();

  return <RespositoryListContainer data={data} />;
};

const ItemSeparator = () => <View style={styles.separator} />;

export const RespositoryListContainer = ({
  data,
}: RespositoryListContainerProps) => {
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

interface RespositoryListContainerProps {
  data: RepositoriesResponse | undefined;
}

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export default RepositoryList;

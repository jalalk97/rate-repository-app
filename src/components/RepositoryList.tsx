import React from "react";
import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { useNavigate } from "react-router-native";

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
  const navigate = useNavigate();

  const repositoryNodes =
    data?.repositories.edges.map((edge) => edge.node) ?? [];

  return (
    <FlatList<Repository>
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/repositories/${item.id}`)}>
          <RepositoryItem repository={item} />
        </Pressable>
      )}
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

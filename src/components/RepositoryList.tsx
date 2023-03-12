import React, { useState } from "react";
import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigate } from "react-router-native";

import useRepositories from "../hooks/useRepositories";
import { RepositoriesResponse, Repository, SortingPrinciple } from "../types";
import RepositoryItem from "./RepositoryItem";
import {
  CREATED_AT_DESC,
  RATING_AVERAGE_ASC,
  RATING_AVERAGE_DESC,
} from "../constants/sortingPrinciples";

const RepositoryList = () => {
  const [sortingPrinciple, setSortingPrinciple] =
    useState<SortingPrinciple>(CREATED_AT_DESC);

  const { data } = useRepositories(sortingPrinciple);

  const handleChange = (value: SortingPrinciple) => {
    setSortingPrinciple(value);
  };

  return (
    <RespositoryListContainer
      data={data}
      sortingPrinciple={sortingPrinciple}
      onChange={handleChange}
    />
  );
};

const SortingPicker = ({ sortingPrinciple, onChange }: SortingPickerProps) => {
  return (
    <Picker<SortingPrinciple>
      selectedValue={sortingPrinciple}
      onValueChange={onChange}
    >
      <Picker.Item label="Latest repositories" value={CREATED_AT_DESC} />
      <Picker.Item
        label="Highest rated repositories"
        value={RATING_AVERAGE_DESC}
      />
      <Picker.Item
        label="Lowest rated repositories"
        value={RATING_AVERAGE_ASC}
      />
    </Picker>
  );
};

export const RespositoryListContainer = ({
  data,
  sortingPrinciple,
  onChange,
}: RepositoryListContainerProps) => {
  const navigate = useNavigate();

  const repositoryNodes =
    data?.repositories.edges.map((edge) => edge.node) ?? [];

  return (
    <FlatList<Repository>
      data={repositoryNodes}
      ListHeaderComponent={
        <SortingPicker
          sortingPrinciple={sortingPrinciple}
          onChange={onChange}
        />
      }
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

const ItemSeparator = () => <View style={styles.separator} />;

interface RepositoryListContainerProps {
  data: RepositoriesResponse | undefined;
  sortingPrinciple: SortingPrinciple;
  onChange: (value: SortingPrinciple) => void;
}

type SortingPickerProps = Omit<RepositoryListContainerProps, "data">;

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export default RepositoryList;

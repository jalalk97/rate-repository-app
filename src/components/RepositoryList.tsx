import React, { useState } from "react";
import { useNavigate } from "react-router-native";
import { useDebounce } from "use-debounce";
import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { Picker } from "@react-native-picker/picker";

import useRepositories from "../hooks/useRepositories";
import { RepositoriesResponse, Repository, SortingPrinciple } from "../types";
import RepositoryItem from "./RepositoryItem";
import {
  CREATED_AT_DESC,
  RATING_AVERAGE_ASC,
  RATING_AVERAGE_DESC,
} from "../constants/sortingPrinciples";
import SearchBar from "./SearchBar";

const RepositoryList = () => {
  const [sortingPrinciple, setSortingPrinciple] = useState(CREATED_AT_DESC);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedSearch] = useDebounce(searchKeyword, 500);

  const { data } = useRepositories(sortingPrinciple, debouncedSearch);

  const handleChange = (value: SortingPrinciple) => {
    setSortingPrinciple(value);
  };

  const onChangeSearch = (query: string) => {
    setSearchKeyword(query);
  };

  return (
    <RespositoryListContainer
      data={data}
      sortingPrinciple={sortingPrinciple}
      onChange={handleChange}
      searchQuery={searchKeyword}
      onChangeSearch={onChangeSearch}
    />
  );
};

const SortingPicker = ({ sortingPrinciple, onChange }: SortingPickerProps) => {
  return (
    <Picker<SortingPrinciple>
      selectedValue={sortingPrinciple}
      onValueChange={onChange}
      style={{ marginHorizontal: 15, marginVertical: 5 }}
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
  searchQuery,
  onChangeSearch,
}: RepositoryListContainerProps) => {
  const navigate = useNavigate();

  const repositoryNodes =
    data?.repositories.edges.map((edge) => edge.node) ?? [];

  return (
    <FlatList<Repository>
      data={repositoryNodes}
      ListHeaderComponent={
        <>
          <SearchBar value={searchQuery} onChangeText={onChangeSearch} />
          <SortingPicker
            sortingPrinciple={sortingPrinciple}
            onChange={onChange}
          />
        </>
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
  searchQuery: string;
  onChangeSearch: (query: string) => void;
}

interface SortingPickerProps {
  sortingPrinciple: SortingPrinciple;
  onChange: (value: SortingPrinciple) => void;
}

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export default RepositoryList;

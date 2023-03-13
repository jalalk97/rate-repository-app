import React, { useState } from "react";
import { useNavigate } from "react-router-native";
import { useDebounce } from "use-debounce";
import { FlatList, Pressable } from "react-native";
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
import ItemSeparator from "./ItemSeparator";

const RepositoryList = () => {
  const [sortingPrinciple, setSortingPrinciple] = useState(CREATED_AT_DESC);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedSearch] = useDebounce(searchKeyword, 500);

  const { data, fetchMore } = useRepositories({
    ...sortingPrinciple,
    searchKeyword: debouncedSearch,
    first: 8,
  });

  const handleChange = (value: SortingPrinciple) => {
    setSortingPrinciple(value);
  };

  const onChangeSearch = (query: string) => {
    setSearchKeyword(query);
  };

  const onEndReached = () => {
    fetchMore();
  };

  return (
    <RespositoryListContainer
      data={data}
      sortingPrinciple={sortingPrinciple}
      onChange={handleChange}
      searchQuery={searchKeyword}
      onChangeSearch={onChangeSearch}
      onEndReached={onEndReached}
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
  onEndReached,
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
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
    />
  );
};

interface RepositoryListContainerProps {
  data: RepositoriesResponse | undefined;
  sortingPrinciple: SortingPrinciple;
  onChange: (value: SortingPrinciple) => void;
  searchQuery: string;
  onChangeSearch: (query: string) => void;
  onEndReached: () => void;
}

interface SortingPickerProps {
  sortingPrinciple: SortingPrinciple;
  onChange: (value: SortingPrinciple) => void;
}

export default RepositoryList;

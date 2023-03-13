import React from "react";
import { useParams } from "react-router-native";
import { FlatList } from "react-native";

import { Repository, Review } from "../types";
import RepositoryItem from "./RepositoryItem";
import ReviewItem from "./ReviewItem";
import ItemSeparator from "./ItemSeparator";
import useRepository from "../hooks/useRepository";

const SingleRepository = () => {
  const { id } = useParams();

  if (!id) {
    return null;
  }

  const { data, fetchMore } = useRepository({ repositoryId: id, first: 3 });

  if (!data) {
    return null;
  }

  const onEndReached = () => {
    fetchMore();
  };

  const reviewNodes = data.repository.reviews.edges.map((edge) => edge.node);

  return (
    <FlatList<Review>
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <RepositoryInfo repository={data.repository} />
      )}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
    />
  );
};

const RepositoryInfo = ({ repository }: RepositoryInfoProps) => {
  return (
    <>
      <RepositoryItem repository={repository} showButton />
      <ItemSeparator />
    </>
  );
};

interface RepositoryInfoProps {
  repository: Repository;
}

export default SingleRepository;

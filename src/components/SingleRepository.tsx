import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-native";
import { FlatList } from "react-native";

import { GET_REPOSITORY } from "../graphql/queries";
import { GetRepositoryResponse, Repository, Review } from "../types";
import RepositoryItem from "./RepositoryItem";
import ReviewItem from "./ReviewItem";
import ItemSeparator from "./ItemSeparator";

const SingleRepository = () => {
  const { id } = useParams();
  const { data } = useQuery<GetRepositoryResponse>(GET_REPOSITORY, {
    variables: { repositoryId: id },
    fetchPolicy: "cache-and-network",
  });

  if (!data) {
    return null;
  }

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

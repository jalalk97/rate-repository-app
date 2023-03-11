import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-native";
import { FlatList, StyleSheet, View } from "react-native";

import { GET_REPOSITORY } from "../graphql/queries";
import { GetRepositoryResponse, Repository, Review } from "../types";
import RepositoryItem from "./RepositoryItem";
import Text from "./Text";
import theme from "../theme";

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

const ReviewItem = ({ review }: ReviewItemProps) => {
  const {
    createdAt,
    rating,
    text,
    user: { username },
  } = review;

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text
          color="primary"
          fontSize="subheading"
          fontWeight="bold"
          style={styles.rating}
        >
          {rating}
        </Text>
      </View>
      <View style={styles.right}>
        <Text fontWeight="bold">{username}</Text>
        <Text color="textSecondary">{createdAt.split("T")[0]}</Text>
        {text && <Text>{text}</Text>}
      </View>
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

interface RepositoryInfoProps {
  repository: Repository;
}

interface ReviewItemProps {
  review: Review;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: 15,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  left: {
    marginRight: 15,
  },
  right: {
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "flex-start",
    paddingRight: 51,
  },
  rating: {
    fontSize: theme.fontSizes.subheading,
    width: 46,
    height: 46,
    lineHeight: 40,
    textAlign: "center",
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderRadius: 23,
  },
  separator: {
    height: 10,
  },
});

export default SingleRepository;

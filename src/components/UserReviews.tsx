import { useQuery } from "@apollo/client";
import React from "react";
import { FlatList } from "react-native";
import { Navigate } from "react-router-native";
import { CURRENT_USER } from "../graphql/queries";
import { CurrentUserInput, CurrentUserResponse, Review } from "../types";
import ItemSeparator from "./ItemSeparator";
import ReviewItem from "./ReviewItem";

const UserReviews = () => {
  const { data } = useQuery<CurrentUserResponse, CurrentUserInput>(
    CURRENT_USER,
    {
      variables: { includeReviews: true },
    }
  );

  if (data && !data.me) {
    return <Navigate to="/" replace />;
  }

  const reviewNodes = data?.me.reviews?.edges.map((edge) => edge.node) ?? [];

  return (
    <FlatList<Review>
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ReviewItem review={item} own />}
    />
  );
};

export default UserReviews;

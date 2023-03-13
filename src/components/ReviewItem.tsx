import { ApolloQueryResult, useMutation } from "@apollo/client";
import React from "react";
import { Alert, StyleSheet, View } from "react-native";
import { useNavigate } from "react-router-native";
import { DELETE_REVIEW } from "../graphql/mutations";

import theme from "../theme";
import { CurrentUserInput, CurrentUserResponse, Review } from "../types";
import Button from "./Button";
import Text from "./Text";

const ReviewItem = ({
  review: { id, createdAt, rating, text, user, repository },
  refetchUser,
  own = false,
}: ReviewItemProps) => {
  const [deleteReview] = useMutation(DELETE_REVIEW, {
    variables: { deleteReviewId: id },
  });
  const navigate = useNavigate();

  const handleViewRepository = () => {
    navigate(`/repositories/${repository.id}`);
  };

  const handleDeleteReview = () => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            deleteReview();
            if (refetchUser) {
              refetchUser();
            }
          },
          style: "destructive",
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
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
          <Text fontWeight="bold">
            {own ? repository.fullName : user.username}
          </Text>
          <Text color="textSecondary">{createdAt.split("T")[0]}</Text>
          {text && <Text>{text}</Text>}
        </View>
      </View>
      {own && (
        <View style={styles.buttonsContainer}>
          <Button
            text="View repository"
            onPress={handleViewRepository}
            style={{ marginRight: 15 }}
          />
          <Button text="Delete review" onPress={handleDeleteReview} error />
        </View>
      )}
    </View>
  );
};

interface ReviewItemProps {
  review: Review;
  refetchUser?: (
    variables?: Partial<CurrentUserInput> | undefined
  ) => Promise<ApolloQueryResult<CurrentUserResponse>>;
  own?: boolean;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: 15,
  },
  main: {
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
  buttonsContainer: {
    flexDirection: "row",
  },
});

export default ReviewItem;

import React from "react";
import { StyleSheet, View } from "react-native";

import theme from "../theme";
import { Review } from "../types";
import Text from "./Text";

const ReviewItem = ({ review, own = false }: ReviewItemProps) => {
  const { createdAt, rating, text, user, repository } = review;

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
        <Text fontWeight="bold">
          {own ? repository.fullName : user.username}
        </Text>
        <Text color="textSecondary">{createdAt.split("T")[0]}</Text>
        {text && <Text>{text}</Text>}
      </View>
    </View>
  );
};

interface ReviewItemProps {
  review: Review;
  own?: boolean;
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
});

export default ReviewItem;

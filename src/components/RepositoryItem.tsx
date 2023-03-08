import React from "react";
import { Image, StyleSheet, View } from "react-native";

import theme from "../theme";
import { Repository } from "../types";
import RepositoryStatistic from "./RepositoryStatistic";
import Text from "./Text";

const RepositoryItem = ({
  repository: {
    ownerAvatarUrl,
    ratingAverage,
    reviewCount,
    forksCount,
    stargazersCount,
    language,
    description,
    fullName,
  },
}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.firstRow}>
        <View style={styles.avatar}>
          <Image style={styles.avatar} source={{ uri: ownerAvatarUrl }} />
        </View>

        <View style={styles.main}>
          <Text fontSize="subheading" fontWeight="bold">
            {fullName}
          </Text>
          <Text color="textSecondary" style={{ marginVertical: 8 }}>
            {description}
          </Text>
          <Text style={styles.badge} color="white" fontSize="subheading">
            {language}
          </Text>
        </View>
      </View>

      <View style={styles.secondRow}>
        <RepositoryStatistic label="Stars" number={stargazersCount} />
        <RepositoryStatistic label="Forks" number={forksCount} />
        <RepositoryStatistic label="Reviews" number={reviewCount} />
        <RepositoryStatistic label="Rating" number={ratingAverage} />
      </View>
    </View>
  );
};

interface Props {
  repository: Repository;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: 15,
  },
  firstRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  secondRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  main: {
    justifyContent: "space-around",
    alignItems: "flex-start",
    marginLeft: 20,
  },
  badge: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    padding: 6,
    borderRadius: 5,
  },
});

export default RepositoryItem;

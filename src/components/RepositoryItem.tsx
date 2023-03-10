import React from "react";
import { Image, Linking, StyleSheet, View } from "react-native";

import theme from "../theme";
import { Repository } from "../types";
import Button from "./Button";
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
    url,
  },
  showButton = false,
}: Props) => {
  return (
    <View testID="repositoryItem" style={styles.container}>
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
      {showButton && (
        <Button text="Open in Github" onPress={() => Linking.openURL(url)} />
      )}
    </View>
  );
};

interface Props {
  repository: Repository;
  showButton?: boolean;
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
    paddingRight: 40,
  },
  badge: {
    backgroundColor: theme.colors.primary,
    padding: 6,
    borderRadius: 5,
  },
});

export default RepositoryItem;

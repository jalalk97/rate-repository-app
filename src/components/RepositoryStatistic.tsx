import React from "react";
import { StyleSheet, View } from "react-native";

import { formatNumber } from "../utils";
import Text from "./Text";

const RepositoryStatistic = ({ label, number }: Props) => {
  return (
    <View style={styles.stats}>
      <Text color="textPrimary" fontSize="body" fontWeight="bold">
        {formatNumber(number)}
      </Text>
      <Text color="textSecondary" fontSize="body" fontWeight="normal">
        {label}
      </Text>
    </View>
  );
};

interface Props {
  label: string;
  number: number;
}

const styles = StyleSheet.create({
  stats: {
    alignItems: "center",
  },
});

export default RepositoryStatistic;

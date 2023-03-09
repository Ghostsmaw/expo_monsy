import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import Text from "@components/Text";

import { CurrencyFragment } from "@constant/Types";

interface Props {
  item: CurrencyFragment;
  onPress?(): void;
}

const CurrencyItem = ({ item, onPress }: Props) => {
  const { name, description, currency } = item;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={{ flex: 1 }}>
        <Text numberOfLines={1} category="body" marginRight={40}>
          {name}
        </Text>
        <Text
          numberOfLines={1}
          category="footnote"
          status="description"
          marginTop={4}
          marginRight={40}
        >
          {description}
        </Text>
      </View>
      <Text category="headline" status="title">
        {currency}
      </Text>
    </TouchableOpacity>
  );
};

export default CurrencyItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
});

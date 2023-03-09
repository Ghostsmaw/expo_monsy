import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";

import Text from "./Text";
import CurrencyText from "./CurrencyText";

import dayjs from "@utils/dayjs";

import {
  Category_Types_Enum,
  Format_Types_Enum,
  TransactionFragment,
} from "@constant/Types";
import { IMAGE_ICON_CATEGORY } from "@assets/IconCategory";
import { useTheme } from "@ui-kitten/components";

interface TransactionProps {
  item: TransactionFragment;
  onPress?(): void;
  last?: boolean;
}

const Transaction = ({ item, last, onPress }: TransactionProps) => {
  const { category, note, type, date, balance } = item;

  const theme = useTheme();

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Image
        source={IMAGE_ICON_CATEGORY[`${category?.icon}`]}
        style={styles.imageIcon}
      />
      <View
        style={[
          styles.flexRow,
          {
            borderBottomColor: last
              ? "transparent"
              : theme["background-basic-color-3"],
          },
        ]}
      >
        <View style={styles.flex}>
          <View style={styles.viewText}>
            <Text numberOfLines={1}>
              {note && note.length > 0 ? note : category ? category.name : ""}
            </Text>
          </View>
          <Text category="subhead" status="description" marginTop={2}>
            {dayjs(date).format("MMM DD,YYYY")}
          </Text>
        </View>
        <CurrencyText
          category="callout"
          status={type === Category_Types_Enum.Income ? "success" : "danger"}
          formatType={Format_Types_Enum.Inky}
          type={type}
        >
          {balance}
        </CurrencyText>
      </View>
    </TouchableOpacity>
  );
};

export default Transaction;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  flexRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 16,
    paddingBottom: 10,
    paddingRight: 16,
    borderBottomWidth: 1,
  },
  imageIcon: {
    width: 16,
    height: 16,
    marginRight: 12,
    marginLeft: 16,
    marginTop: 16,
  },
  flex: {
    flex: 1,
  },
  viewText: {
    flex: 1,
    marginRight: 24,
  },
});

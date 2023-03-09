import React from "react";
import { View, StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { useTheme, Icon } from "@ui-kitten/components";

import Text from "@components/Text";
import CurrencyText from "@components/CurrencyText";

import { Category_Types_Enum, Format_Types_Enum } from "@constant/Types";

interface Props {
  style?: ViewStyle;
  income?: number;
  expense?: number;
  onPressIncome?(): void;
  onPressExpense?(): void;
}

const TotalTransaction = ({
  style,
  income = 0,
  expense = 0,
  onPressIncome,
  onPressExpense,
}: Props) => {
  const theme = useTheme();

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        onPress={onPressIncome}
        activeOpacity={0.7}
        style={[
          styles.box,
          { backgroundColor: theme["background-basic-color-1"] },
        ]}
      >
        <View style={styles.setRow}>
          <Icon
            pack="assets"
            name="income"
            style={[styles.icon, { tintColor: theme["color-success-500"] }]}
          />
          <Text marginTop={4} marginLeft={4}>
            Income
          </Text>
        </View>
        <CurrencyText
          category="title3"
          status="success"
          showMark ={true}
          formatType={Format_Types_Enum.Limit}
          type={Category_Types_Enum.Income}
          marginTop={4}
        >
          {income}
        </CurrencyText>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPressExpense}
        activeOpacity={0.7}
        style={[
          styles.box,
          { backgroundColor: theme["background-basic-color-1"] },
          { marginLeft: 16 },
        ]}
      >
        <View style={styles.setRow}>
          <Icon
            pack="assets"
            name="expense"
            style={[styles.icon, { tintColor: theme["color-danger-500"] }]}
          />
          <Text marginLeft={4} marginTop={4}>
            Expense
          </Text>
        </View>
        <CurrencyText
          category="title3"
          status="danger"
          showMark ={true}
          formatType={Format_Types_Enum.Limit}
          type={Category_Types_Enum.Expense}
          marginTop={4}
        >
          {expense}
        </CurrencyText>
      </TouchableOpacity>
    </View>
  );
};

export default TotalTransaction;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  box: {
    borderRadius: 12,
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 5,
    flex: 1,
  },
  setRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 16,
    height: 16,
  },
});

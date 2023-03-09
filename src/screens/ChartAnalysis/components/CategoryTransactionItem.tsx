import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import colors from "@utils/colors";
import Text from "@elements/Text";
import { currencyFormat, truncateString } from "@utils/formatNumber";
import { CURRENCY } from "@store/models";
import { IMAGE_ICON_CATEGORY } from "@assets/IconCategory";

interface Props {
  style?: object;
  title?: string;
  icon?: string;
  amount?: number;
  totalBalance: number;
  percent?: number;
  currency: CURRENCY;
}

const CategoryTransactionItem = ({
  style,
  title,
  icon,
  amount,
  totalBalance,
  percent,
  currency,
  ...props
}: Props) => {
  // source image icon
  const sourceIcon = IMAGE_ICON_CATEGORY[`${icon}`];
  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.7}
      style={[styles.container, style]}
    >
      <View style={{ flexDirection: "row" }}>
        <Image source={sourceIcon} style={styles.imageIcon} />
        <Text marginLeft={4} size={14}>
          {truncateString(title, 25)}
        </Text>
      </View>
      <Text marginTop={18} color={colors.grey2} bold size={17} lineHeight={22}>
        {currencyFormat(amount, currency)}
      </Text>
      <Text color={colors.grey3} marginTop={4} size={12} lineHeight={16}>
        {percent ? percent : 0}%
      </Text>
      {/* <Text color={colors.grey3} marginTop={4} size={12} lineHeight={16}>
        {(amount / totalBalance) * 100}%
      </Text> */}
    </TouchableOpacity>
  );
};
export default CategoryTransactionItem;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.white,
    borderRadius: 12,
    flex: 1,
  },
  imageIcon: {
    width: 20,
    height: 20,
  },
});

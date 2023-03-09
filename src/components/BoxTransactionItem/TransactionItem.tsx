import React from "react";
import moment from "moment";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import Text from "@elements/Text";
import colors from "@utils/colors";
import { currencyFormat, truncateString } from "@utils/formatNumber";
import { CATEGORY, CURRENCY } from "@store/models";
import { IMAGE_ICON_CATEGORY } from "@assets/IconCategory";

interface Props {
  style?: object;
  id?: string;
  icon?: string;
  note?: string;
  date?: string;
  balance: number;
  income?: boolean;
  expense?: boolean;
  type?: string;
  category?: CATEGORY;
  currency: CURRENCY;
}

const TransactionItem = ({
  style,
  icon,
  date,
  balance,
  note,
  income,
  expense,
  category,
  currency,
  type,
  ...props
}: Props) => {
  const sourceIcon = IMAGE_ICON_CATEGORY[`${icon}`];

   const title = note && note.length > 0 ? note : category ? category.name : "";

  let displayDate = "";
  if (date) {
    displayDate = moment(date).format("DD MMM YYYY");
  }

  return (
    <TouchableOpacity
      {...props}
      style={[styles.container, style]}
      activeOpacity={0.7}
    >
      <View style={styles.flexRow}>
        <Image source={sourceIcon} style={styles.imageIcon} />
        <View>
          <Text size={16} lineHeight={22} color={colors.grey1}>
            {truncateString(title, 23)}
          </Text>
          <Text size={14} lineHeight={20} color={colors.grey3}>
            {displayDate}
          </Text>
        </View>
      </View>
      <Text
        marginRight={16}
        semiBold
        size={16}
        lineHeight={21}
        right
        color={
          type == "income"
            ? colors.bleuDeFrance
            : colors.redCrayola
        }
      >
        {type == "expense" && "-"}
        {currencyFormat(balance, currency)}
      </Text>
    </TouchableOpacity>
  );
};

export default TransactionItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: colors.snow,
    paddingTop: 16,
    paddingBottom: 10,
  },
  flexRow: {
    paddingLeft: 16,
    flexDirection: "row",
    justifyContent: "center",
  },
  imageIcon: {
    width: 16,
    height: 16,
    marginRight: 12,
  },
});

import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "@elements/Text";
import { ICON } from "@svg/Icon";
import colors from "@utils/colors";

interface Props {
  style?: object;
  title?: string;
  description?: string;
  icon: string;
}

const PremiumItem = ({ style, title, description, icon }: Props) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.iconView}>{ICON[`${icon}`]}</View>
      <View>
        <Text bold size={17}>
          {title}
        </Text>
        <Text lineHeight={22} marginTop={4} size={16} color={colors.grey3}>
          {description}
        </Text>
      </View>
    </View>
  );
};

export default PremiumItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconView: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.snow,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
});

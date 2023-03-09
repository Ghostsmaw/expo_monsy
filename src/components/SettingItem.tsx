import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Icon, Layout, Toggle, useTheme } from "@ui-kitten/components";

import Text from "@components/Text";

import { SettingFragment } from "@constant/Types";

const SettingItem = ({
  title,
  icon,
  currency,
  last,
  isToggle,
  checked,
  onChange,
  onPress,
}: SettingFragment) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={[styles.container]}
    >
      <Icon
        pack="assets"
        name={icon}
        style={[styles.icon, { tintColor: theme["color-info-500"] }]}
      />
      <View
        style={[
          styles.content,
          {
            borderBottomWidth: last ? 0 : 1,
            borderBottomColor: theme["background-basic-color-4"],
          },
        ]}
      >
        <Text>{title}</Text>
        {isToggle ? (
          <Toggle checked={checked} onChange={onChange} />
        ) : (
          <View style={styles.iconView}>
            {!!currency && currency !== "" ? (
              <Layout level="4" style={styles.currencyView}>
                <Text category="subhead">{currency}</Text>
              </Layout>
            ) : null}
            <Icon
              pack="assets"
              name="arrowRight"
              style={[
                styles.arrow,
                { tintColor: theme["background-basic-color-5"] },
              ]}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default SettingItem;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 22,
    paddingVertical: 22,
  },
  iconView: {
    flexDirection: "row",
    alignItems: "center",
  },
  currencyView: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    marginRight: 22,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  icon: {
    height: 24,
    width: 24,
  },
  arrow: {
    width: 16,
    height: 16,
  },
});

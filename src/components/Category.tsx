import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "@ui-kitten/components";

import Text from "./Text";

import { CategoryFragment } from "@constant/Types";
import { IMAGE_ICON_CATEGORY } from "@assets/IconCategory";
import { Icons } from "@assets/icons";

interface ListItemProps {
  item: CategoryFragment;
  selected: boolean;
  onPress?(): void;
}

const Category = ({ item, selected = false, onPress }: ListItemProps) => {
  const { icon, name } = item;

  const theme = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        styles.container,
        {
          borderBottomColor: theme["line-background-color"],
        },
      ]}
    >
      <View style={styles.component2}>
        <View style={styles.component}>
          {icon && (
            <Image
              style={styles.imageIcon}
              source={IMAGE_ICON_CATEGORY[`${icon}`]}
            />
          )}
          <Text marginLeft={12} marginTop={4}>
            {name}
          </Text>
        </View>
        {selected ?<Image
              style={styles.imageIcon}
              source={Icons.checkMark}
            /> : <Text>{""}</Text>}
      </View>
    </TouchableOpacity>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    marginLeft: 36,
    borderBottomWidth: 1,
    height: 54,
  },
  component: {
    flexDirection: "row",
  },
  component2: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageIcon: {
    width: 24,
    height: 24,
  },
});

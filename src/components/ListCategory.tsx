import React from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Image,
} from "react-native";
import { useTheme } from "@ui-kitten/components";
import Animated, {
  useAnimatedRef,
  measure,
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  withTiming,
  runOnUI,
} from "react-native-reanimated";

import Text from "./Text";
import Category from "./Category";

import Chevron from "@svg/Chevron";
import {
  CategoriesFragment,
  CategoryFragment,
  Category_Types_Enum,
} from "@constant/Types";
import { IMAGE_ICON_CATEGORY } from "@assets/IconCategory";

interface ListCategoryProps {
  item: CategoriesFragment;
  expand?: boolean;
  close?: boolean;
  idCategorySelected?: int;
  onCategory?(category: CategoryFragment): void;
}

const ListCategory = ({
  item,
  expand,
  close,
  idCategorySelected,
  onCategory,
}: ListCategoryProps) => {
  const { id, parentId, name, icon, type, createAt, updateAt, children } = item;
  const aref = useAnimatedRef<View>();
  const open = useSharedValue(false);
  const progress = useDerivedValue(() =>
    open.value ? withSpring(1) : withTiming(0)
  );
  const height = useSharedValue(0);

  const style = useAnimatedStyle(() => ({
    height: height.value * progress.value + 1,
    opacity: progress.value === 0 ? 0 : 1,
  }));

  const theme = useTheme();

  React.useEffect(() => {
    if (expand) {
      setTimeout(() => {
        if (height.value === 0) {
          runOnUI(() => {
            "worklet";
            height.value = measure(aref).height;
          })();
        }
        open.value = true;
      }, 100);
    } else if (close) {
      setTimeout(() => {
        if (height.value === 0) {
          runOnUI(() => {
            "worklet";
            height.value = measure(aref).height;
          })();
        }
        open.value = false;
      }, 100);
    }
  }, [expand, close, height, open, aref]);

  const handleChoseCategory = React.useCallback(() => {
    if (type !== Category_Types_Enum.Income) {
      const item: CategoryFragment = {
        id,
        parentId,
        name,
        icon,
        type,
        createAt,
        updateAt,
      };
      onCategory && onCategory(item);
    }
  }, []);

  return (
    <>
      <TouchableWithoutFeedback onPress={handleChoseCategory}>
        <Animated.View
          style={[
            styles.container,
            {
              borderBottomColor: theme["line-background-color"],
            },
          ]}
        >
          <View style={styles.row}>
            <Image
              style={styles.imageIcon}
              source={IMAGE_ICON_CATEGORY[`${icon}`]}
            />
            <Text marginLeft={12} category="headline" marginTop={8}>
              {name}
            </Text>
          </View>
          {/* <Chevron {...{ progress }} /> */}
        </Animated.View>
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.items, style]}>
        <View ref={aref}>
          {children &&
            children.map((item, key) => (
              <Category
                key={key}
                item={item}
                selected={
                  idCategorySelected ? idCategorySelected == item.id : false
                }
                onPress={() => onCategory && onCategory(item)}
              />
            ))}
        </View>
      </Animated.View>
    </>
  );
};

export default ListCategory;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
  },
  items: {
    overflow: "hidden",
  },
  imageIcon: {
    width: 24,
    height: 24,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
});

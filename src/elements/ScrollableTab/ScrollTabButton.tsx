import React, { memo, useCallback } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Text from "@elements/Text";
import colors from "@utils/colors";
import FONTS from "@utils/fonts";

interface Props {
  index: number;
  title: string;
  focus?: boolean;
  onPressTab: (index: number) => void;
  onLayout: (event: any) => void;
  onScrollTo: (event: any, isPress?: boolean) => void;
}

const ScrollTabButton = memo(
  ({ title, focus, onPressTab, index, onLayout, onScrollTo }: Props) => {
    const onPress = useCallback(() => {
      onPressTab && onPressTab(index);
      onScrollTo && onScrollTo(index, true);
    }, [index, onPressTab, onScrollTo]);
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.button, focus && styles.focus]}
        {...{ onLayout, onPress }}
      >
        <Text
          style={styles.textStyle}
          color={focus ? colors.purplePlum : colors.grey2}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
);

export default ScrollTabButton;

const styles = StyleSheet.create({
  button: {
    width: 141,
    height: 48,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  focus: {
    backgroundColor: colors.white,
    borderBottomWidth: 2,
    borderBottomColor: colors.purplePlum,
  },
  textStyle: {
    fontFamily: FONTS.MUKTA.SemiBold,
    fontSize: 14,
  },
});

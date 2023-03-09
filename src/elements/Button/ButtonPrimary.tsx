import React, { useState } from "react";
import { StyleSheet, TouchableHighlight } from "react-native";
import colors from "@utils/colors/index";
import Text from "@elements/Text";
import FONTS from "@utils/fonts";

interface Props {
  style?: any;
  title?: string;
  titleStyle?: any;
  onPress?: any;
  disabled?: boolean;
  underlayColor?: string;
}

const ButtonPrimary = (props: Props) => {
  const { style, title, underlayColor, titleStyle, onPress, disabled } = props;
  const [focus, setFocus] = useState(false);

  const onPressIn = () => {
    setFocus(true);
  };

  const onPressOut = () => {
    setFocus(false);
  };

  const disabledStyle = disabled && styles.disabledStyle;
  const color = focus
    ? { backgroundColor: colors.silverTree }
    : { backgroundColor: colors.emerald };

  return (
    <TouchableHighlight
      disabled={disabled}
      activeOpacity={1}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      underlayColor={underlayColor ? underlayColor : colors.mediumAquamarine}
      onPress={onPress}
      style={[styles.buttonPrimacy, color, disabledStyle, style]}
    >
      <Text style={[styles.txtTitle, disabledStyle, titleStyle]}>{title}</Text>
    </TouchableHighlight>
  );
};

export default ButtonPrimary;

const styles = StyleSheet.create({
  buttonPrimacy: {
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.emerald,
  },
  disabledStyle: {
    backgroundColor: colors.grey5,
    color: colors.white,
  },
  txtTitle: {
    fontSize: 17,
    color: colors.white,
    fontFamily: FONTS.MUKTA.SemiBold,
    fontWeight: "600",
  },
});

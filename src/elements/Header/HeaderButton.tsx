import React, { memo, useCallback } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ICON } from "@svg/Icon";
import FONTS from "@utils/fonts";

interface Props {
  icon?: any;
  title?: string;
  titleStyle?: object;
  disabled?: boolean;
  titleInIcon?: string;
  onPress?: () => void;
}

const HeaderButton = memo((props: Props) => {
  const { title, titleStyle, icon, disabled, titleInIcon } = props;
  const navigation = useNavigation();

  const onPress = useCallback(() => {
    if (props.onPress) {
      props.onPress();
    } else {
      navigation.goBack();
    }
  }, [navigation, props]);

  return title ? (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={disabled}
      style={styles.container}
      onPress={onPress}
    >
      <Text style={[styles.textTitle, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  ) : titleInIcon ? (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={disabled}
      style={styles.iconView}
      onPress={onPress}
    >
      {icon ? icon : ICON.backArrow}
      <Text style={[styles.textTitle, titleStyle]}>{titleInIcon}</Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={disabled}
      style={styles.iconView}
      onPress={onPress}
    >
      {icon ? icon : ICON.backArrow}
    </TouchableOpacity>
  );
});
export default HeaderButton;

const styles = StyleSheet.create({
  container: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  iconView: {
    width: 50,
    height: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  textTitle: {
    fontFamily: FONTS.MUKTA.SemiBold,
    fontSize: 17,
    fontWeight: "600",
  },
});

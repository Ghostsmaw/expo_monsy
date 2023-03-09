import React, { useState } from 'react';
import { StyleSheet, TouchableHighlight, View, ViewStyle } from 'react-native';
import colors from '@utils/colors/index';
import Text from '@elements/Text';
import FONTS from '@utils/fonts';

interface Props {
  style?: ViewStyle;
  title?: string;
  iconRight?: any;
  iconLeft?: any;
  titleStyle?: any;
  onPress?: any;
  disabled?: boolean;
  underlayColor?: string;
  colorFocus?: string;
  colorBlur?: string;
}
const ButtonPrimaryIcon = (props: Props) => {
  const {
    style,
    iconLeft,
    iconRight,
    title,
    titleStyle,
    onPress,
    disabled,
    underlayColor,
    colorFocus,
    colorBlur,
  } = props;
  const [focus, setFocus] = useState(false);

  const onPressIn = () => {
    setFocus(true);
  };

  const onPressOut = () => {
    setFocus(false);
  };

  const disabledStyle = disabled && styles.disabledStyle;

  const color = focus
    ? { backgroundColor: colorFocus ? colorFocus : colors.silverTree }
    : { backgroundColor: colorBlur ? colorBlur : colors.emerald };

  return (
    <TouchableHighlight
      disabled={disabled}
      activeOpacity={1}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      underlayColor={underlayColor}
      onPress={onPress}
      style={[styles.buttonPrimacy, color, disabledStyle, style]}
    >
      <>
        {iconLeft && <View style={styles.iconLeft}>{iconLeft}</View>}
        <Text style={[styles.txtTitle, disabledStyle, titleStyle]}>
          {title}
        </Text>
        {iconRight && <View style={styles.iconRight}>{iconRight}</View>}
      </>
    </TouchableHighlight>
  );
};

export default ButtonPrimaryIcon;

const styles = StyleSheet.create({
  buttonPrimacy: {
    width: 295,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.emerald,
    flexDirection: 'row',
  },
  disabledStyle: {
    backgroundColor: colors.grey5,
    color: colors.grey1Opacity,
  },
  txtTitle: {
    fontSize: 17,
    color: colors.white,
    fontFamily: FONTS.MUKTA.SemiBold,
    fontWeight: '600',
  },
  iconLeft: {
    marginRight: 11,
  },
  iconRight: {
    marginLeft: 11,
  },
});

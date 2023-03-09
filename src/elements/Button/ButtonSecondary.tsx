import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import colors from '@utils/colors/index';
import Text from '@elements/Text';
import FONTS from '@utils/fonts';

interface Props {
  style?: any;
  title?: string;
  titleStyle?: any;
  onPress?: any;
  disabled?: boolean;
}
const ButtonSecondary = (props: Props) => {
  const { style, title, titleStyle, onPress, disabled } = props;
  const [focus, setFocus] = useState(false);

  const onPressIn = () => {
    setFocus(true);
  };

  const onPressOut = () => {
    setFocus(false);
  };

  const disabledStyle = disabled && styles.disabledStyle;

  const color = focus
    ? { backgroundColor: colors.purplePlum }
    : { backgroundColor: colors.snow };

  const textColor = focus
    ? { color: colors.white }
    : { color: colors.purplePlum };

  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={1}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={onPress}
      style={[styles.buttonPrimacy, color, disabledStyle, style]}>
      <Text style={[styles.txtTitle, textColor, disabledStyle, titleStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonSecondary;

const styles = StyleSheet.create({
  buttonPrimacy: {
    width: 285,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.snow,
    borderWidth: 1,
    borderColor: colors.purplePlum,
  },
  disabledStyle: {
    backgroundColor: colors.grey5,
    color: colors.grey1Opacity,
    borderWidth: 0,
  },
  txtTitle: {
    fontSize: 22,
    color: colors.purplePlum,
    fontFamily: FONTS.MUKTA.SemiBold,
    fontWeight: '600',
  },
});

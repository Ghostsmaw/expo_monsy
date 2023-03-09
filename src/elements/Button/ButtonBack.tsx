import React, { useCallback } from 'react';
import SvgDelete from '@svg/Icon/SvgDelete';
import {
  TouchableOpacity,
  Platform,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '@utils/colors';
import useLayout from '@hooks/useLayout';

interface PropsBack {
  svgBack?: any;
  color?: string;
  onPress?: any;
  style?: ViewStyle;
}

const ButtonBack = (props: PropsBack) => {
  const navigation = useNavigation();
  const { top } = useLayout();

  const onGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onPress = props.onPress ? props.onPress : onGoBack;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        styles.container,
        props.style,
        { marginTop: Platform.OS === 'ios' ? top + 27 : 27 },
      ]}
    >
      {props.svgBack ? (
        props.svgBack
      ) : (
        <SvgDelete color={props.color ? props.color : colors.black} />
      )}
    </TouchableOpacity>
  );
};
export default ButtonBack;

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    marginLeft: 12,
  },
});

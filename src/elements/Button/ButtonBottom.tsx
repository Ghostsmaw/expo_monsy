import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import ButtonPrimary from '@elements/Button/ButtonPrimary';
import { widthScreen } from '@utils/dimensions';
import colors from '@utils/colors';
import useLayout from '@hooks/useLayout';

interface Props {
  style?: any;
  title?: string;
  titleStyle?: any;
  onPress?: any;
  disabled?: boolean;
  translateUp?: boolean;
  withOutAnimation?: boolean;
  visible?: boolean;
}

const ButtonBottomAnimated = (props: Props) => {
  const {
    withOutAnimation,
    translateUp,
    style,
    title,
    titleStyle,
    onPress,
    disabled,
    visible,
  } = props;
  const { bottom } = useLayout();

  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (withOutAnimation) {
      return;
    } else {
      if (!translateUp) {
        if (visible) {
          Animated.timing(translateY, {
            toValue: 200,
            duration: 1000,
            useNativeDriver: false,
          }).start();
        } else if (visible === false) {
          Animated.timing(translateY, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
          }).start();
        }
      } else if (translateUp) {
        if (visible) {
          Animated.timing(translateY, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false,
          }).start();
        } else if (visible === false) {
          Animated.timing(translateY, {
            toValue: 200,
            duration: 200,
            useNativeDriver: false,
          }).start();
        }
      }
    }
  }, [visible, translateY, translateUp, withOutAnimation]);

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ translateY: translateY }], paddingBottom: bottom + 8 },
      ]}
    >
      <ButtonPrimary
        onPress={onPress}
        title={title}
        titleStyle={titleStyle}
        disabled={disabled}
        style={[styles.buttonPrimary, style]}
      />
    </Animated.View>
  );
};

export default ButtonBottomAnimated;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 12,
    width: widthScreen,
    backgroundColor: colors.white,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 15,
    shadowOpacity: 0.5,
    shadowColor: 'rgba(120, 121, 121, 0.08)',
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    elevation: 5,
  },
  buttonPrimary: {
    width: '100%',
  },
});

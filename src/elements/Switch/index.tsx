import React, { useRef } from "react";
import {
  ViewStyle,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Animated,
} from "react-native";

interface Props {
  style?: ViewStyle;
  enable?: boolean;
  backgroundActive?: string;
  backgroundInactive?: string;
  circleActiveColor?: string;
  circleInActiveColor?: string;
  onPress?: () => void;
}

export default (props: Props) => {
  const transX = useRef(new Animated.Value(0)).current;
  const {
    style,
    enable,
    backgroundActive,
    backgroundInactive,
    circleActiveColor,
    circleInActiveColor,
    onPress,
  } = props;
  const colorToggle = enable ? circleActiveColor : circleInActiveColor;
  const viewToggle = enable
    ? { backgroundColor: backgroundActive }
    : { backgroundColor: backgroundInactive };

  const _onPress = (type: any) => {
    if (enable) {
      Animated.spring(transX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else if (enable === false) {
      Animated.spring(transX, {
        toValue: 22,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
    onPress && onPress();
  };

  return (
    <TouchableWithoutFeedback onPress={_onPress}>
      <View style={[styles.container, viewToggle, style]}>
        <Animated.View
          style={[
            styles.circleToggle,
            { backgroundColor: colorToggle },
            { transform: [{ translateX: transX }] },
          ]}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 24,
    borderRadius: 20,
    padding: 2,
    justifyContent: "center",
  },
  circleToggle: {
    width: 24,
    height: 24,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
});
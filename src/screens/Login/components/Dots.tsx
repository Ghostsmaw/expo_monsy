import React, { memo } from "react";
import { widthScreen } from "@utils/dimensions";
import { Animated, StyleSheet, View, ViewStyle } from "react-native";
import colors from "@utils/colors";

interface Props {
  scrollX: Animated.Value;
  style?: ViewStyle;
}

const Dots = memo(({ scrollX, ...props }: Props) => {
  const opacity1 = scrollX.interpolate({
    inputRange: [0, widthScreen, widthScreen * 2, widthScreen * 3],
    outputRange: [1, 0.4, 0.4, 0.4],
    extrapolate: "clamp",
  });
  const opacity2 = scrollX.interpolate({
    inputRange: [0, widthScreen, widthScreen * 2, widthScreen * 3],
    outputRange: [0.4, 1, 0.4, 0.4],
    extrapolate: "clamp",
  });
  const opacity3 = scrollX.interpolate({
    inputRange: [0, widthScreen, widthScreen * 2, widthScreen * 3],
    outputRange: [0.4, 0.4, 1, 0.4],
    extrapolate: "clamp",
  });
  const opacity4 = scrollX.interpolate({
    inputRange: [0, widthScreen, widthScreen * 2, widthScreen * 3],
    outputRange: [0.4, 0.4, 0.4, 1],
    extrapolate: "clamp",
  });

  const scale1 = scrollX.interpolate({
    inputRange: [0, widthScreen, widthScreen * 2, widthScreen * 3],
    outputRange: [1.4, 1, 1, 1],
    extrapolate: "clamp",
  });
  const scale2 = scrollX.interpolate({
    inputRange: [0, widthScreen, widthScreen * 2, widthScreen * 3],
    outputRange: [1, 1.4, 1, 1],
    extrapolate: "clamp",
  });
  const scale3 = scrollX.interpolate({
    inputRange: [0, widthScreen, widthScreen * 2, widthScreen * 3],
    outputRange: [1, 1, 1.4, 1],
    extrapolate: "clamp",
  });
  const scale4 = scrollX.interpolate({
    inputRange: [0, widthScreen, widthScreen * 2, widthScreen * 3],
    outputRange: [1, 1, 1, 1.4],
    extrapolate: "clamp",
  });

  return (
    <View style={[styles.container, props.style]}>
      <Animated.View
        style={[
          styles.dot,
          { marginLeft: 0 },
          { opacity: opacity1 },
          { transform: [{ scale: scale1 }] },
        ]}
      />
      <Animated.View
        style={[
          styles.dot,
          { opacity: opacity2 },
          { transform: [{ scale: scale2 }] },
        ]}
      />
      <Animated.View
        style={[
          styles.dot,
          { opacity: opacity3 },
          { transform: [{ scale: scale3 }] },
        ]}
      />
      <Animated.View
        style={[
          styles.dot,
          { opacity: opacity4 },
          { transform: [{ scale: scale4 }] },
        ]}
      />
    </View>
  );
});

export default Dots;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "center",
    top: -50,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.white,
    marginLeft: 8,
  },
});

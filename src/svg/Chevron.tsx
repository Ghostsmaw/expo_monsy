import React from "react";
import { StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { mix } from "react-native-redash";

interface ChevronProps {
  progress: Animated.SharedValue<number>;
}

const Chevron = ({ progress }: ChevronProps) => {
  const style = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${mix(progress.value, 0, Math.PI)}rad` }],
  }));
  return (
    <Animated.View style={[styles.container, style]}>
      <Svg
        width={12}
        height={12}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#9C9E9D"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M6 9l6 6 6-6" />
      </Svg>
    </Animated.View>
  );
};

export default Chevron;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

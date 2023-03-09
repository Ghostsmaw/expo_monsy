import React from "react";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { useTheme, Layout } from "@ui-kitten/components";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolateColor,
} from "react-native-reanimated";

import Text from "./Text";

import { Category_Types_Enum } from "@constant/Types";

const data = [
  Category_Types_Enum.Expense,
  Category_Types_Enum.Income,
  //Category_Types_Enum.Transfer,
];

interface Props {
  style?: ViewStyle;
  disabled?: boolean;
  selectedIndex: number;
  onChange(index: number): void;
}

const Segment = ({ style, selectedIndex, disabled, onChange }: Props) => {
  const theme = useTheme();
  const transX = useSharedValue(0);

  const [widthItem, setWidthItem] = React.useState(0);

  React.useEffect(() => {
    transX.value = widthItem * selectedIndex;
  }, [selectedIndex, transX, widthItem]);

  const animatedStyles = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      transX.value,
      [0, widthItem * 1, widthItem * 2],
      [
        theme["color-danger-500"],
        theme["color-success-500"],
        theme["color-primary-500"],
      ]
    );

    return {
      transform: [
        {
          translateX: withSpring(transX.value, {
            stiffness: 200,
            damping: 15,
          }),
        },
      ],
      backgroundColor: backgroundColor,
    };
  });

  return (
    <Layout level="2" style={[styles.container, style]}>
      <Animated.View
        style={[
          styles.boxAni,
          animatedStyles,
          { width: `${100 / data.length}%` },
        ]}
        onLayout={({ nativeEvent }) => setWidthItem(nativeEvent.layout.width)}
      />
      {data.map((item, index) => {
        return (
          <TouchableOpacity
            style={styles.btn}
            key={index}
            disabled={disabled}
            onPress={() => onChange(index)}
          >
            <Text
              capitalize
              category="headline"
              status={selectedIndex === index ? "white" : "description"}
              marginTop={4}
            >
              {item}
            </Text>
          </TouchableOpacity>
        );
      })}
    </Layout>
  );
};

export default Segment;

const styles = StyleSheet.create({
  container: {
    height: 40,
    borderRadius: 20,
    flexDirection: "row",
    overflow: "hidden",
    alignSelf: "center",
  },
  boxAni: {
    height: 40,
    position: "absolute",
    borderRadius: 20,
  },
  btn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

import { useTheme } from "@ui-kitten/components";
import React, { memo } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import Text from "./Text";

interface TabProps {
  active?: boolean;
  title?: string;
  status?: "basic" | "info" | "placeholder";
  onPress?(): void;
}

const Tab = memo(({ active, title, status = "basic", onPress }: TabProps) => {
  const theme = useTheme();
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { borderBottomColor: active ? theme["color-info-500"] : "transparent" },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text category="subhead" status={status} opacity={0.7}>
        {title}
      </Text>
    </TouchableOpacity>
  );
});

export default Tab;

const styles = StyleSheet.create({
  container: {
    width: 140,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
  },
});

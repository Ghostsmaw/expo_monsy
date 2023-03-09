import React from "react";
import { StyleSheet } from "react-native";
import { Button, ButtonProps, Icon, useTheme } from "@ui-kitten/components";
import useLayout from "@hooks/useLayout";

export interface ButtonCalculatorProps extends ButtonProps {
  icon?: string;
  size?: "giant" | "large" | "medium";
  status?: "control" | "info" | "action";
}

const ButtonCalculator = ({
  style,
  icon,
  status = "control",
  size = "large",
  ...props
}: ButtonCalculatorProps) => {
  const { width } = useLayout();

  const theme = useTheme();

  const getSize = (size: "giant" | "large" | "medium") => {
    switch (size) {
      case "giant":
        return (width - 8) / 2;
      case "large":
        return width - 135;
      case "medium":
        return 67;
      default:
        return width - 135;
    }
  };

  const getFlex = (size: "giant" | "large" | "medium") => {
    switch (size) {
      case "giant":
        return 0;
      case "large":
        return 1;
      case "medium":
        return 0;
      default:
        return 1;
    }
  };

  const getIconColor = (status: "control" | "info" | "action") => {
    switch (status) {
      case "control":
        return theme["text-basic-color"];
      case "action":
        return theme["color-info-500"];
      case "info":
        return theme["color-basic-100"];
      default:
        return theme["text-basic-color"];
    }
  };

  return (
    <Button
      style={[
        styles.container,
        { width: getSize(size) },
        { flex: getFlex(size) },
      ]}
      status={status === "action" ? "control" : status}
      activeOpacity={0.7}
      children={() => (
        <Icon
          pack="assets"
          name={icon}
          style={{ tintColor: getIconColor(status) }}
        />
      )}
      {...props}
    />
  );
};

export default ButtonCalculator;

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    margin: 4,
  },
});

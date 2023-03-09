import React from "react";
import { StyleSheet } from "react-native";
import { Button, ButtonProps, Layout } from "@ui-kitten/components";
import useLayout from "@hooks/useLayout";
import HideWithKeyboard from "./HideWithKeyboard";

interface ButtonBottomProps extends ButtonProps {
  title?: string;
}

const ButtonBottom = ({ title, ...props }: ButtonBottomProps) => {
  const { bottom } = useLayout();
  return (
    <HideWithKeyboard>
      <Layout style={[styles.container, { paddingBottom: bottom + 8 }]}>
        <Button {...props} activeOpacity={0.7}>
          {title}
        </Button>
      </Layout>
    </HideWithKeyboard>
  );
};

export default ButtonBottom;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 0,
    left: 0,
    bottom: 0,
    paddingTop: 8,
    paddingHorizontal: 16,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 15,
    shadowOpacity: 0.5,
    shadowColor: "rgba(120, 121, 121, 0.08)",
  },
});

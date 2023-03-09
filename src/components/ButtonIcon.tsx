import React from "react";
import { StyleSheet, Image } from "react-native";
import { Button, ButtonProps, Layout } from "@ui-kitten/components";
import useLayout from "@hooks/useLayout";
import { Icons } from "@assets/icons";
import colors from "@utils/colors";

interface ButtonBottomProps extends ButtonProps {
  title?: string;
}

const ButtonIcon = ({ title, ...props }: ButtonBottomProps) => {
  const { bottom } = useLayout();
  return (
    <Layout style={styles.container}>
      <Button {...props} activeOpacity={0.7}>
        <Image style={styles.imageIcon} source={Icons.award} /> {title}
      </Button>
    </Layout>
  );
};

export default ButtonIcon;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 15,
    shadowOpacity: 0.5,
    shadowColor: "rgba(120, 121, 121, 0.08)",
    elevation: 5,
  },
  imageIcon: {
    tintColor: colors.white,
    width: 24,
    height: 24,
  },
});

import React, { memo } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { Layout } from "@ui-kitten/components";

interface PropsHeader {
  style?: ViewStyle;
}

const HeaderBackGround = memo(({ style }: PropsHeader) => {
  return <Layout style={[styles.container, style]} />;
});

export default HeaderBackGround;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

import React from "react";
import { View, StyleSheet, ActivityIndicator, Modal } from "react-native";
import colors from "@utils/colors";

interface Props {
  isLoading?: boolean;
}

export default ({ isLoading }: Props) => {
  return (
    <Modal visible={isLoading} statusBarTranslucent={true} transparent={true}>
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.emerald} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(51, 51, 51, 0.7)",
  },
});

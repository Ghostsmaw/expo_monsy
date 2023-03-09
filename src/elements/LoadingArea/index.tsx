import React from "react";
import { View, StyleSheet, ActivityIndicator, Modal, Text } from "react-native";
import colors from "@utils/colors";

interface Props {
  isLoading?: boolean;
}

export default ({ isLoading }: Props) => {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.loadingArea,
          {
            paddingVertical: 15,
            paddingHorizontal: 15,
          },
        ]}
      >
        <ActivityIndicator color={colors.emerald} size={"large"} />
        <Text
          allowFontScaling={false}
          style={{
            flex: 1,
            alignItems: "center",
            alignSelf: "center",
            marginLeft: 10,
          }}
        >
          {"LOADING"}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(51, 51, 51, 0.7)",
    position: "absolute",
  },
  loadingArea: {
    backgroundColor: "white",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent:'center',
    alignItems:'center',
    width: "95%",
  },
});

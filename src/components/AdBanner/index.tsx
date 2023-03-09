import React from "react";
import { View, StyleSheet, ColorValue } from "react-native";

interface Props {
  bannerSize?:
    | "banner"
    | "largeBanner"
    | "mediumRectangle"
    | "fullBanner"
    | "leaderboard"
    | "smartBannerPortrait"
    | "smartBannerLandscape";
  marginTop?: number;
  marginBottom?: number;
  marginVertical?: number;
  marginHorizontal?: number;
  backgroundColor?: ColorValue;
}

const AdBanner = ({
  marginBottom,
  marginTop,
  marginVertical,
  marginHorizontal,
  bannerSize = "banner",
  backgroundColor,
}: Props) => {
  React.useEffect(() => {
    // setTestDeviceIDAsync("EMULATOR");
  });
  return (
    <View
      style={[
        styles.container,
        {
          marginBottom: marginBottom,
          marginTop: marginTop,
          marginVertical: marginVertical,
          marginHorizontal: marginHorizontal,
          backgroundColor: backgroundColor,
        },
      ]}
    ></View>
  );
};

export default AdBanner;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderRadius: 8,
    overflow: "hidden",
  },
  banner: {
    flex: 1,
  },
});

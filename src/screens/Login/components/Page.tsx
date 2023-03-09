import React, { memo } from "react";
import { Image, StyleSheet, View } from "react-native";
import Text from "@elements/Text";
import { widthScreen } from "@utils/dimensions";
import colors from "@utils/colors";

interface Props {
  image?: any;
  title?: string;
  description?: string;
}

const Page = memo(({ image, title, description }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.round}>
        <Image source={image} style={styles.image} />
      </View>
      <Text bold size={22} lineHeight={37} marginTop={32} color={colors.white}>
        {title}
      </Text>
      <Text
        marginHorizontal={51}
        size={16}
        center
        lineHeight={22}
        marginTop={4}
        color={colors.white}
      >
        {description}
      </Text>
    </View>
  );
});

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: widthScreen * 0.43,
    height: widthScreen * 0.43,
  },
  round: {
    width: widthScreen * 0.42,
    height: widthScreen * 0.42,
    borderRadius: widthScreen,
    backgroundColor: "#ffffff50",
    alignItems: "center",
    justifyContent: "center",
  },
});

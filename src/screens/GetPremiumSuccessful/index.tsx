import React, { memo, useCallback } from "react";
import { View, StyleSheet, Image } from "react-native";
import Text from "@elements/Text";
import ButtonPrimary from "@elements/Button/ButtonPrimary";
import colors from "@utils/colors";
import ButtonBack from "@elements/Button/ButtonBack";

const GetPremiumSuccessful = memo(() => {
  const onPressExperience = useCallback(() => {}, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("@assets/GetPremium/Frame.png")}
      />
      <Text color={colors.grey2} bold size={28} lineHeight={34} marginTop={24}>
        Congratulations
      </Text>
      <Text center size={16} lineHeight={22} color={colors.grey2}>
        {`You have successfully upgraded\n` + `to premium account`}
      </Text>
      <ButtonPrimary
        style={styles.buttonExperience}
        onPress={onPressExperience}
        titleStyle={styles.textExperience}
        title={"Experience now"}
      />
      <ButtonBack style={styles.svgDelete} />
    </View>
  );
});

export default GetPremiumSuccessful;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    alignSelf: "center",
    marginTop: 8,
    width: 280,
    height: 118,
  },
  buttonExperience: {
    width: 162,
    height: 46,
    marginTop: 18,
  },
  textExperience: {
    fontSize: 17,
  },
  svgDelete: {
    position: "absolute",
    top: 0,
    right: 14,
  },
});

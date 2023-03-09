import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "@elements/Text";
import ButtonIcon from "@elements/Button/ButtonIcon";
import { ICON } from "@svg/Icon";
import colors from "@utils/colors";

interface Props {
  style?: object;
  onPress: () => void;
}

export default ({ style, onPress }: Props) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.setRow}>
        <Text
          uppercase
          semiBold
          size={18}
          lineHeight={24}
          marginTop={16}
          marginLeft={16}
        >
          Transactions
        </Text>
        <ButtonIcon
          icon={ICON.add}
          style={styles.buttonAdd}
          onPress={() => onPress()}
        />
      </View>
      <Text
        semiBold
        size={18}
        lineHeight={24}
        marginTop={24}
        marginBottom={32}
        marginHorizontal={60}
        color={colors.grey3}
        uppercase
        center
      >
        Tap “+” button to create your new transaction
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 12,
  },
  setRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: colors.snow,
    paddingBottom: 8,
  },
  buttonAdd: {
    width: 40,
    height: 40,
    borderRadius: 12,
    marginTop: 8,
    marginRight: 8,
    marginBottom: 8,
    alignItems: "center",
    position: "relative",
  },
});

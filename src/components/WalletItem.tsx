import React from "react";
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import { WALLET_ICON } from "@svg/WalletIcon";
import Text from "@elements/Text";
import SvgCircleChevronRight from "@svg/Icon/SvgCircleChevronRight";
import FONTS from "@utils/fonts";
import colors from "@utils/colors";
import { currencyFormat } from "@utils/formatNumber";
import ButtonIcon from "@elements/Button/ButtonIcon";
import { ICON } from "@svg/Icon";
import { TYPE_WALLET, CURRENCY } from "@store/models";

const LIST_CARD = [
  require("@assets/Dashboard/card0.png"),
  require("@assets/Dashboard/card1.png"),
  require("@assets/Dashboard/card2.png"),
  require("@assets/Dashboard/card3.png"),
  require("@assets/Dashboard/card4.png"),
  require("@assets/Dashboard/card5.png"),
  require("@assets/Dashboard/card6.png"),
  require("@assets/Dashboard/card7.png"),
  require("@assets/Dashboard/card8.png"),
  require("@assets/Dashboard/card9.png"),
];

interface Props {
  style?: object;
  id?: number;
  index?: number;
  name?: string;
  balance?: number;
  typeWallet: TYPE_WALLET;
  currency: CURRENCY;
  imageBackGround?: string;
  defaultWallet?: boolean;
  onPressWallet?: () => void;
  onClickAddWallet?: () => void;
  scrollY?: Animated.Value;
  noneArrow?: boolean;
}

const WalletItem = ({
  style,
  id,
  index,
  name,
  typeWallet,
  balance,
  currency,
  imageBackGround,
  defaultWallet,
  onClickAddWallet,
  onPressWallet,
  scrollY,
  noneArrow,
  ...props
}: Props) => {
  const cardId = id ? (id > 10 ? (id - 1) % 10 : id - 1) : 0;
  const sourceImage = imageBackGround
    ? { uri: imageBackGround }
    : LIST_CARD[cardId];

  const formatAmount = balance
    ? currencyFormat(balance, currency)
    : currencyFormat(0, currency);

  return defaultWallet ? (
    <TouchableOpacity {...props} onPress={onClickAddWallet} activeOpacity={0.7}>
      <ImageBackground
        source={require("@assets/Dashboard/default.png")}
        style={styles.imageDefault}
      >
        <ButtonIcon icon={ICON.addWallet} onPress={onClickAddWallet} />
        <Text style={styles.textCreate}>Create a new wallet</Text>
      </ImageBackground>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity key={id} onPress={onPressWallet} activeOpacity={0.7}>
      <Animated.View style={[styles.container, style]}>
        <ImageBackground style={styles.image} source={sourceImage}>
          <View style={styles.iconView}>
            {WALLET_ICON[`${typeWallet?.icon}`]}
            <Text style={styles.wallet}>{name}</Text>
          </View>
          <Text style={styles.textBalance}>Balance</Text>
          <Text style={styles.textAmount}>{formatAmount}</Text>
        </ImageBackground>
        {noneArrow ? null : <SvgCircleChevronRight style={styles.svgCircle} />}
      </Animated.View>
    </TouchableOpacity>
  );
};

export default WalletItem;

const styles = StyleSheet.create({
  container: {
    width: 280,
    height: 140,
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
  },
  image: {
    height: "100%",
    borderRadius: 12,
    paddingHorizontal: 24,
  },
  iconView: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
    height: 28,
  },
  wallet: {
    fontFamily: FONTS.MUKTA.Bold,
    fontWeight: "600",
    fontSize: 17,
    color: colors.white,
    marginLeft: 10,
  },
  svgCircle: {
    position: "absolute",
    top: 24,
    right: 24,
  },
  textBalance: {
    marginTop: 30,
    fontFamily: FONTS.MUKTA.Bold,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 21,
    color: colors.white,
    opacity: 0.7,
  },
  textAmount: {
    fontFamily: FONTS.MUKTA.Bold,
    fontSize: 22,
    lineHeight: 37,
    color: colors.white,
  },
  imageDefault: {
    width: 280,
    height: 140,
    borderRadius: 12,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  textCreate: {
    color: colors.white,
    fontFamily: FONTS.MUKTA.Bold,
    fontSize: 16,
    lineHeight: 21,
    marginTop: 8,
  },
});

import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { widthScreen } from "@utils/dimensions";
import WalletItem from "@components/WalletItem";
import Carousel from "react-native-reanimated-carousel";

interface Props {
  onClickAddWallet?: () => void;
  onPressWallet?: () => void;
  currency?: string;
}

const HeaderList = ({
  onClickAddWallet,
  onPressWallet,
  walletData,
  currency,
}: any) => {
  const ITEM_WIDTH = 296;

  const renderItem = ({ item }: any) => {
    return (
      <WalletItem
        onPressWallet={() => onPressWallet(item)}
        onClickAddWallet={onClickAddWallet}
        currency={currency}
        {...item}
      />
    );
  };

  return (
    <View style={styles.containerCustomStyle}>
      <Carousel
        loop
        width={widthScreen}
        autoPlay={false}
        pagingEnabled={true}
        snapEnabled={true}
        mode="horizontal-stack"
        modeConfig={{
          snapDirection: "left",
          stackInterval: 18,
        }}
        data={walletData}
        onSnapToItem={(index) => console.log("current index:", index)}
        renderItem={({ index }) => renderItem({ item: walletData[index] })}
      />
    </View>
  );
};

export default HeaderList;

const styles = StyleSheet.create({
  containerCustomStyle: {
    paddingLeft: 16,
    marginTop: 16,
  },
});

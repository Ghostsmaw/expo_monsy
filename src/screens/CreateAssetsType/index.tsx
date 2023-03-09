import React, { memo } from "react";
import { View, StyleSheet } from "react-native";
import colors from "@utils/colors";
import { useNavigation } from "@react-navigation/native";
import WalletTypeItem from "@components/WalletTypeItem";
import ROUTES from "@utils/routes";
import { useSelector } from "react-redux";
import { IMasterState } from "@store/models/reducers/master";
import { TYPE_WALLET } from "@store/models";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ButtonPrimary from "@elements/Button/ButtonPrimary";
interface IState {
  masterReducer: IMasterState;
}

const CreateAssetsType = memo(({ route }: any) => {
  const navigation = useNavigation();
  const { bottom } = useSafeAreaInsets();

  const typeWallets = useSelector(
    (state: IState) => state.masterReducer.typeWallets
  );
  const [typeWallet, setTypeWallet] = React.useState<TYPE_WALLET>();
  const [goBack, setGoBack] = React.useState<string>("");

  const disabled = typeWallet === undefined;

  React.useEffect(() => {
    console.log("params: ", route.params);
    if (route.params?.route) {
      setGoBack(route.params?.route);
    } else {
      setGoBack(ROUTES.CreateAssets);
    }
    setTypeWallet(route.params?.typeWallet);
  }, [route.params?.route, route.params?.typeWallet]);

  const onDone = React.useCallback(() => {
    const param = { typeWallet: typeWallet };
    navigation.navigate(goBack, param);
  }, [goBack, typeWallet]);

  return (
    <View style={styles.container}>
      <View style={styles.contentView}>
        {typeWallets.map((item: any, index: number) => {
          const onPress = () => {
            setTypeWallet(item);
          };
          return (
            <WalletTypeItem
              isChose={typeWallet?.id}
              onPress={onPress}
              {...item}
              key={index}
            />
          );
        })}
      </View>
      <View style={[styles.keyboard, { paddingBottom: bottom + 8 }]}>
        <ButtonPrimary
          disabled={disabled}
          onPress={onDone}
          title="Done"
          style={styles.button}
        />
      </View>
    </View>
  );
});

export default CreateAssetsType;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.snow,
  },
  contentView: {
    marginTop: 16,
    paddingLeft: 16,
    paddingRight: 18,
    borderRadius: 12,
    backgroundColor: colors.white,
    marginHorizontal: 16,
  },
  keyboard: {
    paddingTop: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    position: "absolute",
    right: 0,
    left: 0,
    bottom: 0,
  },
  button: {
    flex: 1,
  },
});

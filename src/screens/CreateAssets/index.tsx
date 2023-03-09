import React, { memo, useState } from "react";
import { View, StyleSheet, Modal, ActivityIndicator } from "react-native";
import { heightScreen, widthScreen } from "@utils/dimensions";
// @ts-ignore
import { useNavigation } from "@react-navigation/native";
// @ts-ignore
import { currencyFormat } from "@utils/formatNumber";
import { IMAGE_ICON } from "@assets/Icon";
import { apiCreateTransaction, apiCreateWallet } from "@api/index";
import ROUTES from "@utils/routes";
import colors from "@utils/colors";
import ButtonBottom from "@elements/Button/ButtonBottom";
import AnimatedInput from "@components/AnimatedInput";
import SvgCalculator from "@svg/Icon/SvgCalculator";
import SvgEdit from "@svg/Icon/SvgNote";
import AdBanner from "@components/AdBanner";
import { CURRENCY, TYPE_WALLET, WALLET } from "@store/models";
import { useDispatch, useSelector } from "react-redux";
import { onAddWalletResponse } from "@store/actions/commonActions";
import { IMasterState } from "@store/models/reducers/master";

const CATEGORY_GIFT = 51;
interface IState {
  masterReducer: IMasterState;
}

const CreateAssets = memo(({ route }: any) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [currency, setCurrency] = useState<CURRENCY>();
  const [nameAccount, setNameAccount] = useState<string>("");
  const [balance, setBalance] = useState<number>(0);
  const [walletType, setWalletType] = useState<TYPE_WALLET>();
  const [isLoading, setIsLoading] = useState(false);
  const [goback, setGoback] = useState<string>(ROUTES.Dashboard);

  const user = useSelector((state: IState) => state.masterReducer.user);

  React.useEffect(() => {
    if (route.params?.route) {
      setGoback(route.params?.route);
    }
    if (route.params?.name) {
      setNameAccount(route.params?.name);
    }
    setBalance(route.params?.balance || 0);
    if (route.params?.typeWallet) {
      setWalletType(route.params?.typeWallet);
    }
    setCurrency(user.currency);
  }, [
    route.params?.name,
    route.params?.balance,
    route.params?.typeWallet,
    user,
  ]);

  const onCreateAssetsName = () => {
    navigation.navigate(ROUTES.CreateAssetsName, {
      route: ROUTES.CreateAssets,
    });
  };
  const onCreateAssetsBalance = () => {
    let resCurrency = {
      route: ROUTES.CreateAssets,
    };
    navigation.navigate(ROUTES.CreateAssetsBalance, resCurrency);
  };
  const onCreateAssetsType = () => {
    navigation.navigate(ROUTES.CreateAssetsType, {
      route: ROUTES.CreateAssets,
    });
  };

  const onCreate = async () => {
    try {
      setIsLoading(true);
      const wallet = {
        name: nameAccount,
        balance: 0,
        typeWalletId: walletType?.id,
      };
      const response = await apiCreateWallet(wallet);
      if (balance !== 0) {
        await apiCreateTransaction({
          balanceAdd: balance,
          balance: balance,
          categoryId: CATEGORY_GIFT, // type category Gifts
          walletId: response?.id,
          date: new Date(),
          note: "Create Wallet",
          type: "income",
        });
        let action: WALLET = {
          id: response?.id,
          userId: response?.userId,
          name: response?.name,
          typeWalletId: response?.typeWalletId,
          balance: balance,
          // @ts-ignore
          typeWallet: walletType,
        };

        setIsLoading(false);
        dispatch(onAddWalletResponse(action));
      } else {
        let action: WALLET = {
          id: response?.id,
          userId: response?.userId,
          name: response?.name,
          typeWalletId: response?.typeWalletId,
          balance: response?.balance,
          // @ts-ignore
          typeWallet: walletType,
        };

        setIsLoading(false);
        dispatch(onAddWalletResponse(action));
      }

      navigation.navigate(goback);
    } catch (e) {
      console.log("Error Create Wallet ", e);
      setIsLoading(false);
    }
  };

  const buttonCreate = () => {
    const disabled = nameAccount === "" || walletType === undefined;
    return (
      <ButtonBottom onPress={onCreate} disabled={disabled} title={"Create"} />
    );
  };

  return (
    <View style={styles.container}>
      <AdBanner />
      <View style={styles.contentView}>
        <AnimatedInput
          onPress={onCreateAssetsName}
          icon={<SvgEdit />}
          value={nameAccount}
          placeholder={"Name Account"}
        />
        {currency ? (
          <AnimatedInput
            onPress={onCreateAssetsBalance}
            value={currencyFormat(balance, currency)}
            placeholder={"Amount"}
            currency={currency.currency}
            icon={<SvgCalculator />}
          />
        ) : null}
        <AnimatedInput
          onPress={onCreateAssetsType}
          imageIcon={
            walletType?.icon
              ? IMAGE_ICON[`${walletType?.icon}`]
              : IMAGE_ICON.wallet
          }
          value={walletType?.name ? walletType.name : ""}
          placeholder={"Type"}
          nonBorder={true}
        />
      </View>
      {buttonCreate()}
      <Modal visible={isLoading} statusBarTranslucent={true} transparent={true}>
        <View style={styles.loadingScreen}>
          <ActivityIndicator size="large" color={colors.redCrayola} />
        </View>
      </Modal>
    </View>
  );
});

export default CreateAssets;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.snow,
  },
  contentView: {
    marginHorizontal: 16,
    backgroundColor: colors.white,
    borderRadius: 12,
    marginTop: 24,
    paddingRight: 21,
    paddingLeft: 18,
  },
  loadingScreen: {
    flex: 1,
    backgroundColor: "rgba(51, 51, 51, 0.7)",
    height: heightScreen,
    width: widthScreen,
    justifyContent: "center",
    alignItems: "center",
  },
});

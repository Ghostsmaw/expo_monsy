import React, { memo, useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import WalletTypeItem from "@components/WalletTypeItem";
import ROUTES from "@utils/routes";
import { useSelector } from "react-redux";
import { IDataState } from "@store/models/reducers/data";
import { TYPE_WALLET, WALLET } from "@store/models";
import ButtonBottom from "@components/ButtonBottom";
import Container from "@components/Container";
import Content from "@components/Content";
import { Layout } from "@ui-kitten/components";

interface IState {
  dataReducer: IDataState;
}

const AddTransactionWallets = memo(({ route }: any) => {
  const navigation = useNavigation();
  const [wallet, setWallet] = useState<WALLET>();
  const [goback, setGoBack] = useState<string>(ROUTES.CreateTransaction);
  const [type, setType] = useState<number>(0);

  const wallets = useSelector((state: IState) => state.dataReducer.wallets);
  const [walletsAll, setWalletsAll] = useState<Array<WALLET>>();
  const disabled = wallet?.id === undefined;

  React.useEffect(() => {
    if (route.params?.route) {
      setGoBack(route.params?.route);
    } else {
      setGoBack(ROUTES.CreateTransaction);
    }
    if (route.params?.wallet) {
      setWallet(route.params?.wallet);
    }
    if (route.params?.type) {
      setType(route.params?.type);
    }
    let type_wallet: TYPE_WALLET = {
      id: -1,
      name: "",
      icon: "wallet",
    };
    let walletAll: WALLET = {
      id: -1,
      userId: "",
      name: "All wallet",
      balance: route.params?.wallet?.balance,
      typeWalletId: -1,
      typeWallet: type_wallet,
    };
    let allWallet: Array<WALLET> = [];
    if (route.params?.route == ROUTES.Transaction) {
      allWallet.push(walletAll);
    }
    wallets.map((item) => {
      allWallet.push(item);
    });
    setWalletsAll(allWallet);
  }, [route.params?.wallet, route.params?.route]);

  const onDone = useCallback(() => {
    let params: object;
    if (type == 1) {
      params = { walletFrom: wallet };
    } else {
      if (type == 2) {
        params = { walletTo: wallet };
      } else {
        params = { wallet: wallet };
      }
    }
    navigation.navigate(goback, params);
  }, [wallet]);

  return (
    <Container>
      <Content padder>
        <Layout style={styles.contentView}>
          {walletsAll &&
            walletsAll.map((item: any, index: number) => {
              return (
                <WalletTypeItem
                  isChose={wallet?.id}
                  id={item.id}
                  onPress={() => setWallet(item)}
                  wallet={item}
                  key={index}
                />
              );
            })}
        </Layout>
      </Content>
      <ButtonBottom disabled={disabled} title="Done" onPress={onDone} />
    </Container>
  );
});

export default AddTransactionWallets;

const styles = StyleSheet.create({
  contentView: {
    marginTop: 16,
    paddingLeft: 16,
    paddingRight: 18,
    borderRadius: 12,
  },
});

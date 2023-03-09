import React, { memo } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
// @ts-ignore
import ROUTES from "@utils/routes";
import AdBanner from "@components/AdBanner";
import Container from "@components/Container";
import LoadingView from "@elements/LoadingView";
import Transaction from "@components/Transaction";
import TransactionEmpty from "@components/TransactionEmpty";
import NavigationAction from "@components/NavigationAction";
import HeaderList from "@screens/Dashboard/components/HeaderList";
// @ts-ignore
import { IMasterState } from "@store/models/reducers/master";
import { IDataState } from "@store/models/reducers/data";
import { ILoading } from "@store/models/reducers/loading";
import { WALLET } from "@store/models";
import Text from "@components/Text";
import { Button, Layout } from "@ui-kitten/components";
import {
  askNotification,
  onSubmit,
  onCreateTransaction,
} from "@components/Notification";
import * as Notifications from "expo-notifications";

interface IState {
  loadingReducer: ILoading;
  masterReducer: IMasterState;
  dataReducer: IDataState;
}

const Dashboard = memo(() => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const loading = useSelector(
    (state: IState) => state.loadingReducer.isLoading
  );

  const user = useSelector((state: IState) => state.masterReducer.user);
  const wallets = useSelector((state: IState) => state.dataReducer.wallets);

  const walletData = [...wallets, { defaultWallet: true }];

  const latestTransactions = useSelector(
    (state: IState) => state.dataReducer.latestTransactions
  );

  const onCreateAssets = React.useCallback(() => {
    const params = { route: ROUTES.Dashboard };
    navigation.navigate(ROUTES.CreateAssets, params);
  }, []);

  const onAddTransaction = React.useCallback(() => {
    const params = { route: ROUTES.Dashboard };
    navigation.navigate(ROUTES.CreateTransaction, params);
  }, []);

  const onPressWallet = React.useCallback(
    (item: WALLET) => {
      let params = { wallet: item };
      navigation.navigate(ROUTES.Transaction, params);
    },
    [wallets, latestTransactions]
  );

  const onClickAddWallet = React.useCallback(() => {
    navigation.navigate(ROUTES.CreateAssets);
  }, [navigation]);

  const onPressSeeAll = React.useCallback(() => {
    navigation.navigate(ROUTES.MyWallets);
  }, []);

  const onPressSeeAllTransaction = React.useCallback(() => {
    let params = { wallet: null };
    navigation.navigate(ROUTES.Transaction, params);
  }, []);

  const assetsNone = () => {
    return (
      <Layout style={styles.assetsNone}>
        <Text category="title3" marginHorizontal={38} center>
          You don’t have any wallets!
        </Text>
        <Button
          onPress={onCreateAssets}
          children="Create Now"
          style={styles.buttonCreate}
        />
      </Layout>
    );
  };

  const renderNoneTransactions = () => {
    return (
      <TransactionEmpty
        style={styles.transactionEmpty}
        onPress={() => onAddTransaction()}
      />
    );
  };

  const renderLatestTransactions = () => {
    return (
      <Layout style={styles.latestTransactions}>
        <View style={styles.setRowLine}>
          <Text category="title4" uppercase>
            Latest Transactions
          </Text>
          <TouchableOpacity
            onPress={onPressSeeAllTransaction}
            activeOpacity={0.7}
          >
            <Text category="headline" status="info">
              See All
            </Text>
          </TouchableOpacity>
        </View>
        <Layout level="3" style={{ height: 1 }} />
        {latestTransactions.map((item: any, index: number) => {
          const onPress = () => {
            navigation.navigate(ROUTES.EditTransaction, item);
          };

          return (
            index < 4 && (
              <Transaction key={index} onPress={onPress} item={item} />
            )
          );
        })}
      </Layout>
    );
  };

  React.useEffect(() => {
    askNotification();
    const foregroundSubcription = Notifications.addNotificationReceivedListener(
      (response) => {
        onCreateTransaction(navigation);
      }
    );
    const backgroundSubcription =
      Notifications.addNotificationResponseReceivedListener((response) => {
        onCreateTransaction(navigation);
      });
    return () => {
      backgroundSubcription.remove();
      foregroundSubcription.remove();
    };
  });

  return (
    <Container level="2" paddingTop>
      {loading ? (
        <LoadingView isLoading={loading} />
      ) : (
        <>
          <View style={styles.topView}>
            <Text uppercase category="title4">
              My Wallets
            </Text>
            {wallets.length !== 0 && (
              <TouchableOpacity onPress={onPressSeeAll} activeOpacity={0.7}>
                <Text category="headline" status="info">
                  See All
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {wallets.length === 0 ? (
              assetsNone()
            ) : (
              <>
                {true && (
                  <HeaderList
                    onClickAddWallet={onClickAddWallet}
                    onPressWallet={onPressWallet}
                    walletData={walletData}
                    currency={user.currency}
                  />
                )}
                <View style={{ marginBottom: 16 }}>
                  {latestTransactions.length === 0
                    ? renderNoneTransactions()
                    : renderLatestTransactions()}
                </View>
              </>
            )}
            <AdBanner
              bannerSize="largeBanner"
              marginHorizontal={16}
              backgroundColor="white"
            />
          </ScrollView>
          {latestTransactions.length !== 0 && (
            <NavigationAction
              status="rounded"
              size="giant"
              onPress={onAddTransaction}
              style={styles.button}
            />
          )}
        </>
      )}
    </Container>
  );
});

export default Dashboard;

const styles = StyleSheet.create({
  topView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 24,
    alignItems: "center",
  },
  assetsNone: {
    paddingBottom: 16,
    paddingTop: 23,
    borderRadius: 8,
    marginVertical: 16,
    marginHorizontal: 16,
  },
  buttonCreate: {
    marginTop: 16,
    marginHorizontal: 86,
  },
  latestTransactions: {
    borderRadius: 12,
    marginHorizontal: 16,
  },
  setRowLine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  button: {
    position: "absolute",
    right: 16,
    bottom: 16,
  },
  transactionEmpty: {
    marginHorizontal: 16,
  },
});

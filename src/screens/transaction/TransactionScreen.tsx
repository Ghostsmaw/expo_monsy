import React, { memo } from "react";
import { View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import {
  useTheme,
  CalendarRange,
  Icon,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import useLayout from "@hooks/useLayout";
import useModalize from "@hooks/useModalize";

import Text from "@components/Text";
import Container from "@components/Container";
import CurrencyText from "@components/CurrencyText";
import TransactionBox from "@components/TransactionBox";
import TotalTransaction from "@components/TotalTransaction";
import ModalizeCalendar from "@components/ModalizeCalendar";
import NavigationAction from "@components/NavigationAction";
import FocusAwareStatusBar from "@components/FocusAwareStatusBar";

import dayjs from "@utils/dayjs";
import ROUTES from "@utils/routes";
import keyExtractor from "@utils/keyExtractor";
import { IMasterState } from "@store/models/reducers/master";
import { IDataState } from "@store/models/reducers/data";
import { ITransactionRequestState } from "@store/models/actions/transaction";
import { TYPE_WALLET, WALLET } from "@store/models";
import { ILoading } from "@store/models/reducers/loading";
import { RefreshControl } from "react-native-web-refresh-control";
import { TransactionFragment, TransactionProps } from "@constant/Types";
import { onTransactionRequest } from "@store/actions/transactionAction";

interface IState {
  dataReducer: IDataState;
  loadingReducer: ILoading;
  masterReducer: IMasterState;
}

interface ToTal {
  income: number;
  expense: number;
}

const TransactionScreen = ({ route }: any) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const wallets = useSelector((state: IState) => state.dataReducer.wallets);
  const transactions = useSelector(
    (state: IState) => state.dataReducer.transactions
  );
  const user = useSelector((state: IState) => state.masterReducer.user);

  const { top, bottom } = useLayout();
  const { navigate, goBack } = useNavigation();
  const { modalizeRef, open, close } = useModalize();

  const [wallet, setWallet] = React.useState<WALLET>();
  const [total, setTotal] = React.useState<ToTal>({ income: 0, expense: 0 });
  const [range, setRange] = React.useState<CalendarRange<Date>>({
    startDate: dayjs().startOf("month").toDate(),
    endDate: dayjs().endOf("month").toDate(),
  });
  const [listTransaction, setListTransaction] = React.useState<
    TransactionProps[]
  >([]);

  useFocusEffect(
    React.useCallback(() => {
      if (
        route &&
        route.params &&
        route.params.wallet &&
        route.params.wallet.id != -1
      ) {
        // Get transactions of selected wallet
        for (let i = 0; i < wallets.length; i++) {
          if (route.params.wallet.id == wallets[i].id) {
            setWallet(wallets[i]);
          }
        }
        initialized(route.params.wallet.id);
      } else {
        // Get transactions of all wallet
        let balance = 0;
        for (let i = 0; i < wallets.length; i++) {
          balance += wallets[i].balance;
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
          balance: balance,
          typeWalletId: -1,
          typeWallet: type_wallet,
        };
        setWallet(walletAll);
        initialized(-1);
      }
    }, [route.params?.wallet, wallets, user, range])
  );

  const initialized = async (walletId: number) => {
    let actionData: ITransactionRequestState;

    actionData = {
      walletId,
      //@ts-ignore
      from: range.startDate,
      to: range.endDate,
    };
    await dispatch(onTransactionRequest(actionData));
  };
  React.useEffect(() => {
    initialized(wallet?.id || -1);
  }, [range]);

  React.useEffect(() => {
    let listTransaction: TransactionFragment[] = [];
    if (transactions[0]) {
      setTotal({
        income: transactions[0].income,
        expense: transactions[0].expense,
      });
      if (wallet?.id != -1) {
        const lTransactions = transactions[0].items.filter(
          (i) => i.walletId === wallet?.id
        );
        lTransactions.forEach((i) => {
          //@ts-ignore
          listTransaction.push(i);
        });
      } else {
        //@ts-ignore
        listTransaction = transactions[0].items;
      }

      let list = setDataUI(listTransaction.flat());
      setListTransaction(list);
    }
  }, [transactions, wallet]);

  const setDataUI = (dataArray: TransactionFragment[]) => {
    let listTitle = [
      ...new Set(
        [...dataArray].map((transaction) =>
          dayjs(transaction.date).format("DD/MM/YYYY")
        )
      ),
    ]
      .sort()
      .reverse();

    let data = [] as TransactionProps[];

    listTitle.forEach((title) => {
      let content = [] as TransactionFragment[];
      dataArray.forEach((transaction) => {
        if (dayjs(transaction.date).format("DD/MM/YYYY") === title) {
          content.push(transaction);
        }
      });
      data.push({ title: title, content: content });
    });

    return data;
  };

  const onChooseWallet = React.useCallback(() => {
    const params = { wallet: wallet, route: ROUTES.Transaction };
    navigate(ROUTES.AddTransactionWallets, params);
  }, [wallet]);

  const onCreateTransaction = React.useCallback(() => {
    const params = {
      route: ROUTES.Transaction,
      initialwallet: wallet,
    };
    navigate(ROUTES.CreateTransaction, params);
  }, [wallet]);
  const paramsIncome = {
    type: "Income",
    totalIncome: total?.income,
    totalExpense: total?.expense,
    walletId: wallet?.id,
  };
  const paramsExpense = {
    type: "Expense",
    totalIncome: total?.income,
    totalExpense: total?.expense,
    walletId: wallet?.id,
  };

  const listHeaderComponent = React.useCallback(() => {
    return (
      <TotalTransaction
        style={styles.item}
        income={total?.income}
        expense={total?.expense}
        onPressIncome={() => navigate(ROUTES.ChartAnalysis, paramsIncome)}
        onPressExpense={() => navigate(ROUTES.ChartAnalysis, paramsExpense)}
      />
    );
  }, [total]);

  const renderItem = React.useCallback(({ item }) => {
    return <TransactionBox item={item} />;
  }, []);

  return (
    <Container level="2">
      <FocusAwareStatusBar barStyle="light-content" />
      <View
        style={{ paddingTop: top, backgroundColor: theme["color-primary-500"] }}
      >
        <TopNavigation
          appearance="control"
          title={() => (
            <Text category="title4" marginTop={8} status="white">{`${dayjs(
              range.startDate
            ).format("DD/MM/YYYY")} - ${dayjs(range.endDate).format(
              "DD/MM/YYYY"
            )}`}</Text>
          )}
          accessoryLeft={
            <TopNavigationAction
              appearance="control"
              icon={<Icon pack="assets" name="arrowLeft" />}
              onPress={goBack}
            />
          }
          accessoryRight={
            <TopNavigationAction
              appearance="control"
              icon={<Icon pack="assets" name="calendar" />}
              onPress={open}
            />
          }
        />
        <TouchableOpacity
          onPress={onChooseWallet}
          activeOpacity={0.7}
          style={styles.setRow}
        >
          <Text status="white" marginRight={8} marginTop={4}>
            {wallet?.name}
          </Text>
          <Icon
            style={[styles.icon, { tintColor: theme["color-basic-100"] }]}
            pack="assets"
            name="arrowRight"
          />
        </TouchableOpacity>
        <CurrencyText
          category="title2"
          status="white"
          children={total?.income - total?.expense}
          marginTop={6}
          marginLeft={24}
          marginBottom={16}
        />
      </View>
      <FlatList
        data={listTransaction || []}
        renderItem={renderItem}
        ListHeaderComponent={listHeaderComponent}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl style={{ tintColor: theme["color-primary-500"] }} />
        }
        contentContainerStyle={[
          styles.contentContainerStyle,
          { paddingBottom: bottom },
        ]}
      />
      <NavigationAction
        status="rounded"
        size="giant"
        onPress={onCreateTransaction}
        //@ts-ignore
        style={[styles.button, { bottom: bottom + 24 }]}
      />
      <ModalizeCalendar
        ref={modalizeRef}
        title={"Select Range"}
        rangeCalendar
        range={range}
        onSelect={(nextRange) => setRange(nextRange)}
      />
    </Container>
  );
};

export default TransactionScreen;

const styles = StyleSheet.create({
  setRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 24,
  },
  icon: {
    width: 16,
    height: 16,
  },
  item: {
    marginBottom: 16,
  },
  button: {
    position: "absolute",
    right: 16,
  },
  contentContainerStyle: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});

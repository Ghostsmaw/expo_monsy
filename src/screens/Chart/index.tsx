import React, { memo, useState, useCallback, useRef } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import Text from "@elements/Text";
import colors from "@utils/colors";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import ScrollableTab from "@elements/ScrollableTab";
import ROUTES from "@utils/routes";
import { ICON } from "@svg/Icon";
import FocusAwareStatusBar from "@components/FocusAwareStatusBar";
import LoadingView from "@elements/LoadingView";
import StatisticPage from "@screens/Chart/components/StatisticPage";
import { currencyFormat } from "@utils/formatNumber";
import moment, { Moment } from "moment";
import { IDataState } from "@store/models/reducers/data";
import { ILoading } from "@store/models/reducers/loading";
import { useSelector, useDispatch } from "react-redux";
import { IChartStateRequest } from "@store/models/actions/chart";
import {
  onCharttAllWalletByMonthRequest,
  onCharttAllWalletByYearRequest,
} from "../../store/actions/chartAction";
import { IChartData } from "@store/models/reducers/chart";
import { CHART, CURRENCY, WALLET } from "@store/models";
import { IMasterState } from "../../store/models/reducers/master";
import HeaderButton from "@elements/Header/HeaderButton";
import RBSheet from "react-native-raw-bottom-sheet";

interface IState {
  dataReducer: IDataState;
  loadingReducer: ILoading;
  chartReducer: IChartData;
  masterReducer: IMasterState;
}

const Chart = memo(({ route }: any) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const refRBSheet = useRef();
  const [walletId, setWalletId] = useState<number>(-1);
  const [walletName, setWalletName] = useState<string>("All wallet");
  const [wallet, setWallet] = useState<WALLET>();
  const [balance, setBalance] = useState<number>(0);
  const [frequency, setFrequency] = useState<string>("Monthly");
  const [monthAfter] = useState<Moment>(moment(new Date()).add(1, "month"));
  const [monthPrev1] = useState<Moment>(
    moment(new Date()).subtract(1, "month")
  );
  const [monthCurrent] = useState<Moment>(moment(new Date()));

  //yearly
  const [yearAfter1] = useState<Moment>(moment(new Date()).add(1, "year"));
  const [yearPrev1] = useState<Moment>(moment(new Date()).subtract(1, "year"));
  const [yearPrev2] = useState<Moment>(moment(new Date()).subtract(2, "year"));
  const [yearPrev3] = useState<Moment>(moment(new Date()).subtract(3, "year"));
  const [yearCurrent] = useState<Moment>(moment(new Date()));

  const [newChartData, setNewChartData] = useState<string[]>([
    monthPrev1.format("YYYY/MM"),
    monthCurrent.format("YYYY/MM"),
    monthAfter.format("YYYY/MM"),
  ]);

  const loading = false;
  //  useSelector(
  //   (state: IState) => state.loadingReducer.isLoading
  // );
  const user = useSelector((state: IState) => state.masterReducer.user);
  const [currency] = useState<CURRENCY>(user.currency);

  const wallets = useSelector((state: IState) => state.dataReducer.wallets);
  const chartData = useSelector(
    (state: IState) => state.chartReducer.chartData
  );

  const list = ["Monthly", "Yearly"];

  useFocusEffect(
    React.useCallback(() => {
      if (route && route.params && route.params.wallet) {
        setWallet(route.params.wallet);
        setWalletName(route.params.wallet.name);
        setBalance(route.params.wallet.balance);
        setWalletId(route.params.wallet.id);
        initialized(route.params.wallet.id);
      } else {
        let balance = 0;
        for (let i = 0; i < wallets.length; i++) {
          balance += wallets[i].balance;
        }
        setBalance(balance);
        setWalletName("All Wallet");
        setWalletId(-1);
        initialized(-1);
      }
    }, [route.params?.wallet, frequency, user])
  );

  const initialized = async (walletId: number) => {
    let actionData: IChartStateRequest;
    if (frequency === "Monthly") {
      setNewChartData([
        monthPrev1.format("YYYY/MM"),
        monthCurrent.format("YYYY/MM"),
        monthAfter.format("YYYY/MM"),
      ]);
      actionData = {
        walletId,
        year: monthPrev1.format("YYYY"),
        month: monthPrev1.format("MM"),
      };
      dispatch(onCharttAllWalletByMonthRequest(actionData));
      actionData = {
        walletId,
        year: monthCurrent.format("YYYY"),
        month: monthCurrent.format("MM"),
      };
      dispatch(onCharttAllWalletByMonthRequest(actionData));
      actionData = {
        walletId,
        year: monthAfter.format("YYYY"),
        month: monthAfter.format("MM"),
      };
      dispatch(onCharttAllWalletByMonthRequest(actionData));
    }
    if (frequency === "Yearly") {
      setNewChartData([
        yearPrev3.format("YYYY"),
        yearPrev2.format("YYYY"),
        yearPrev1.format("YYYY"),
        yearCurrent.format("YYYY"),
        yearAfter1.format("YYYY"),
      ]);
      actionData = {
        walletId,
        year: yearCurrent.format("YYYY"),
      };
      dispatch(onCharttAllWalletByYearRequest(actionData));
      actionData = {
        walletId,
        year: yearAfter1.format("YYYY"),
      };
      dispatch(onCharttAllWalletByYearRequest(actionData));
      actionData = {
        walletId,
        year: yearPrev1.format("YYYY"),
      };
      dispatch(onCharttAllWalletByYearRequest(actionData));
      actionData = {
        walletId,
        year: yearPrev2.format("YYYY"),
      };
      dispatch(onCharttAllWalletByYearRequest(actionData));
      actionData = {
        walletId,
        year: yearPrev3.format("YYYY"),
      };
      dispatch(onCharttAllWalletByYearRequest(actionData));
    }
  };

  // React.useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <HeaderButton
  //         icon={ICON.whiteCalendar}
  //         onPress={() => refRBSheet.current.open()}
  //       />
  //     ),
  //   });
  // }, []);

  const onChooseWallet = useCallback(() => {
    const params = { wallet: wallet, route: ROUTES.Chart };
    navigation.navigate(ROUTES.AddTransactionWallets, params);
  }, [wallet]);

  const onChangeFrequency = (frequency: string) => {
    refRBSheet.current.close();
    setFrequency(frequency);
  };

  function setDataChartUI(
    data: Array<CHART>,
    incomArr: Array<number>,
    expenseArr: Array<number>
  ) {
    let totalIn = 0;
    let totalEx = 0;
    let ArrIncome = incomArr;
    let ArrExpense = expenseArr;
    let index = [];
    for (let i = 0; i < data.length; i++) {
      index[i] = Number(
        moment(walletId == -1 ? data[i].transactionDate : data[i].date).format(
          "DD"
        )
      );
      if (i > 0 && index[i] == index[i - 1]) {
        ArrIncome[index[i] - 1] += data[i].totalIncome;
        ArrExpense[index[i] - 1] += data[i].totalExpense;
      } else {
        ArrIncome[index[i] - 1] = data[i].totalIncome;
        ArrExpense[index[i] - 1] = data[i].totalExpense;
      }

      totalIn = totalIn + data[i].totalIncome;
      totalEx = totalEx + data[i].totalExpense;
    }
    let dataReturn = {
      dataIncome: ArrIncome,
      dataExpense: ArrExpense,
      totalIncome: totalIn,
      totalExpense: totalEx,
    };
    return dataReturn;
  }

  const renderStatisticPage = useCallback(
    (index: number, month?: string, year?: string) => {
      const chartElement = chartData.find((item) => {
        if (frequency === "Monthly") {
          return (
            item.month == month &&
            item.year == year &&
            item.walletId == walletId
          );
        }
        if (frequency === "Yearly") {
          return item.year == year && item.walletId == walletId;
        }
      });
      let category = [];
      let incomeArr = [];
      let expenseArr = [];
      if (frequency === "Monthly") {
        for (
          let i = 1;
          i <= moment(year + "/" + month, "YYYY/MM").daysInMonth();
          i++
        ) {
          category.push(`${i}`);
          incomeArr.push(0);
          expenseArr.push(0);
        }
      }
      if (frequency === "Yearly") {
        for (let i = 1; i <= 12; i++) {
          category.push(`${i}`);
          incomeArr.push(0);
          expenseArr.push(0);
        }
      }

      const dataUI: any = setDataChartUI(
        chartElement?.dailyChartData || [],
        incomeArr,
        expenseArr
      );
      return (
        <StatisticPage
          index={index}
          walletId={walletId}
          currency={currency}
          income={dataUI?.totalIncome}
          expense={dataUI?.totalExpense}
          category={category}
          incomeArr={dataUI?.dataIncome}
          expenseArr={dataUI?.dataExpense}
          isNull={false}
        />
      );
    },
    [chartData, newChartData, frequency]
  );

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar barStyle="light-content" />
      {loading ? (
        <LoadingView isLoading={loading} />
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={onChooseWallet}
                activeOpacity={0.7}
                style={styles.setRow}
              >
                <Text size={14} marginRight={14} color={colors.white}>
                  {walletName}
                </Text>
                {ICON.whiteRightArrow}
              </TouchableOpacity>
              {currency ? (
                <Text
                  bold
                  lineHeight={34}
                  size={28}
                  color={colors.white}
                  marginTop={8}
                >
                  {currencyFormat(balance, currency)}
                </Text>
              ) : null}
            </View>
            {/*
            <ScrollableTab titles={newChartData}>
              {newChartData.map((item, index) => {
                let date = item.split("/", 2);
                return renderStatisticPage(index, date[1], date[0]);
              })}
            </ScrollableTab>
            */}
          </ScrollView>
          <RBSheet
            ref={refRBSheet}
            closeOnPressMask={true}
            customStyles={{
              wrapper: {
                backgroundColor: "rgba(37, 40, 39, 0.6)",
              },
              container: {
                height: 150,
              },
            }}
          >
            <View>
              <Text
                onPress={() => refRBSheet.current.close()}
                lineHeight={22}
                size={17}
                right={true}
                color={colors.purplePlum}
                marginTop={16}
                marginRight={16}
              >
                Done
              </Text>
              {list.map((item, index) => {
                return (
                  <Text
                    key={index}
                    lineHeight={22}
                    size={16}
                    color={colors.emerald}
                    center={true}
                    marginBottom={34}
                    onPress={() => onChangeFrequency(item)}
                  >
                    {item}
                  </Text>
                );
              })}
            </View>
          </RBSheet>
        </>
      )}
    </View>
  );
});

export default Chart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.snow,
  },

  header: {
    backgroundColor: colors.emerald,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  setRow: {
    flexDirection: "row",
    alignItems: "center",
    height: 20,
  },
});

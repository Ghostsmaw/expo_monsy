import React, { memo, useCallback, useState } from "react";
import { View, StyleSheet } from "react-native";
import colors from "@utils/colors";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import HeaderButton from "@elements/Header/HeaderButton";
import { ICON } from "@svg/Icon";
import LoadingView from "@elements/LoadingView";
import AnalysisPage from "./components/AnalysisPage";
import { AnyIfEmpty, useSelector } from "react-redux";
import { IMasterState } from "@store/models/reducers/master";
import { IChartData } from "@store/models/reducers/chart";
import ScrollableTab from "@elements/ScrollableTab";
import { Moment } from "moment";
import moment from "moment";
import { CHART, CIRCLE_CHART } from "@store/models";

interface IState {
  masterReducer: IMasterState;
  chartReducer: IChartData;
}
const colorsRandom = [
  colors.bleuDeFrance,
  colors.emerald,
  colors.purplePlum,
  colors.coral,
  colors.honeyDrew,
];

const ChartAnalysis = ({ route }: any) => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState<boolean>(true);
  const [frequency, setFrequency] = useState<object>({});
  const currency = useSelector(
    (state: IState) => state.masterReducer.user
  ).currency;
  const [stateAnalysis, setStateAnalysis] = useState<boolean>(true);
  const chartData = useSelector(
    (state: IState) => state.chartReducer.chartData
  );
  const [monthAfter] = useState<Moment>(moment(new Date()).add(1, "month"));
  const [monthPrev1] = useState<Moment>(
    moment(new Date()).subtract(1, "month")
  );
  const [monthCurrent] = useState<Moment>(moment(new Date()));
  const listTab = [
    monthPrev1.format("MMMM YYYY"),
    monthCurrent.format("MMMM YYYY"),
    monthAfter.format("MMMM YYYY"),
  ];
  const [dataDetail, setDataDetail] = useState<CIRCLE_CHART[][]>([]);

  React.useEffect(() => {
    let categoryData: CIRCLE_CHART[][] = [];
    chartData.sort(function (a, b) {
      return (
        Date.parse(a.year + "-" + a.month) - Date.parse(b.year + "-" + b.month)
      );
    });
    for (let i = 0; i < chartData.length; i++) {
      if (chartData[i].walletId == route.params.walletId) {
        categoryData.push(chartData[i].categoryChartData);
      }
    }
    setDataDetail(categoryData);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      initialized();
    }, [])
  );

  const initialized = async () => {
    try {
      if (route?.params?.type && route.params.type == "Income") {
        setStateAnalysis(true);
      } else {
        setStateAnalysis(false);
      }
      setLoading(false);
    } catch (e) {}
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: route.params.type + " Analysis",
      // headerRight: () => <HeaderButton icon={ICON.calendar} />,
    });
  }, []);

  const onChangeFrequency = (frequency: any) => {
    close();
    setFrequency(frequency);
  };

  function setDataChartUI(
    data: Array<CHART>,
    incomArr: Array<number>,
    expenseArr: Array<number>
  ) {
    let ArrIncome = incomArr;
    let ArrExpense = expenseArr;
    let index = [];
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        index[i] = Number(
          moment(
            route.params.walletId == -1 ? data[i].transactionDate : data[i].date
          ).format("DD")
        );
        if (i > 0 && index[i] == index[i - 1]) {
          ArrIncome[index[i] - 1] += data[i].totalIncome;
          ArrExpense[index[i] - 1] += data[i].totalExpense;
        } else {
          ArrIncome[index[i] - 1] = data[i].totalIncome;
          ArrExpense[index[i] - 1] = data[i].totalExpense;
        }
      }
    }

    let dataReturn = {
      dataIncome: ArrIncome,
      dataExpense: ArrExpense,
    };

    return dataReturn;
  }

  const handleData = (item: CIRCLE_CHART[], index: number, tab: string) => {
    let dataPieIncomeTmp: any[] = [];
    let dataPieExpenseTmp: any[] = [];
    let category: any[] = [];
    let dataColumnIncome: any[] = [];
    let dataColumnExpense: any[] = [];
    let categoryDate: any[] = [];
    for (let i = 1; i <= moment(tab, "MMMM YYYY").daysInMonth(); i++) {
      category.push(`${i}`);
      dataColumnIncome.push(0);
      dataColumnExpense.push(0);
    }
    for (let i = 0; i < chartData.length; i++) {
      if (chartData[i].walletId == route.params.walletId) {
        categoryDate.push(chartData[i].dailyChartData);
      }
    }
    if (item && item.length > 0) {
      for (let i = 0; i < item.length; i++) {
        dataPieIncomeTmp.push({
          name: item[i].category.name,
          y: Math.round((item[i].totalIncome / route.params.totalIncome) * 100),
          color: colorsRandom[Math.floor(Math.random() * colorsRandom.length)],
        });
        dataPieExpenseTmp.push({
          name: item[i].category.name,
          y: Math.round(
            (item[i].totalExpense / route.params.totalExpense) * 100
          ),
          color: colorsRandom[Math.floor(Math.random() * colorsRandom.length)],
        });
      }
      const dataUI: any = setDataChartUI(
        categoryDate[index],
        dataColumnIncome,
        dataColumnExpense
      );

      return (
        <AnalysisPage
          index={index}
          walletId={route.params.walletId}
          balance={
            stateAnalysis ? route.params.totalIncome : route.params.totalExpense
          }
          category={category}
          categoryItems={item}
          dataColumnIncome={dataUI?.dataIncome}
          dataColumnExpense={dataUI?.dataExpense}
          dataPieIncome={dataPieIncomeTmp}
          dataPieExpense={dataPieExpenseTmp}
          currency={currency}
          typeTransaction={stateAnalysis ? "income" : "expense"}
        />
      );
    } else {
      return (
        <AnalysisPage
          index={index}
          walletId={route.params.walletId}
          balance={0}
          categoryItems={item}
          category={category}
          dataColumnIncome={dataColumnIncome}
          dataColumnExpense={dataColumnExpense}
          dataPieIncome={dataPieIncomeTmp}
          dataPieExpense={dataPieExpenseTmp}
          currency={currency}
          typeTransaction={stateAnalysis ? "income" : "expense"}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <LoadingView isLoading={loading} />
      ) : (
        <ScrollableTab titles={listTab}>
          {dataDetail.map((item, index) => {
            return handleData(item, index, listTab[index]);
          })}
        </ScrollableTab>
      )}
    </View>
  );
};

export default ChartAnalysis;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.snow,
  },
});

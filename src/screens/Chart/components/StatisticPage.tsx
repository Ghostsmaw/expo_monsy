import React, { memo } from "react";
import { View, StyleSheet } from "react-native";
import { heightScreen, widthScreen } from "@utils/dimensions";
//@ts-ignore
import HighchartsReactNative from "@lib/highcharts-react-native";
import colors from "@utils/colors";
import { useNavigation } from "@react-navigation/native";
import ROUTES from "@utils/routes";
import { CURRENCY } from "@store/models";
import TotalTransaction from "@components/TotalTransaction";

interface Props {
  index: number;
  walletId?: number;
  tabLabel?: string;
  income?: number;
  expense?: number;
  currency: CURRENCY;
  category?: any;
  incomeArr?: any;
  expenseArr?: any;
  isNull?: boolean;
}

const StatisticPage = memo(
  ({
    index,
    walletId,
    income,
    expense,
    currency,
    category,
    incomeArr,
    expenseArr,
    isNull,
  }: Props) => {
    const { navigate } = useNavigation();
    const options = {
      chart: {
        type: "column",
        scrollablePlotArea: {
          minWidth: 1400,
          scrollPositionX: 1,
        },
        margin: [16, 32, 48, 64],
      },
      title: {
        text: "",
      },
      legend: {
        enabled: false,
      },
      xAxis: {
        categories: category,
        crosshair: true,
      },
      yAxis: {
        labels: {
          formatter: function () {
            var ret,
              numericSymbols = ["k", "M", "G", "T", "P", "E"],
              i = 6;
            if (this.value >= 1000) {
              while (i-- && ret === undefined) {
                let multi = Math.pow(1000, i + 1);
                if (this.value >= multi && numericSymbols[i] !== null) {
                  ret = this.value / multi + numericSymbols[i];
                }
              }
            }
            return ret ? ret : this.value;
          },
        },
        min: 0,
        title: {
          text: "",
        },
        lineWidth: 1,
      },
      credits: {
        enabled: false,
      },
      tooltip: {
        followPointer: false,
        split: false,
        shared: true,
        backgroundColor: "#fff",
        borderRadius: 4,
        padding: 8,
        borderWidth: 0,
        shadow: true,
        useHTML: true,
        formatter: function () {
          let amountIncome = this.points[0].y
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
          let amountExpense = this.points[1].y
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
          return (
            '<table style="font-family: Ek Mukta; color:#252827; min-width: 80"><tr><td>' +
            '<img src="https://firebasestorage.googleapis.com/v0/b/habit-run.appspot.com/o/ic-income%403x.png?alt=media&token=443730dd-5f04-4dcf-b753-ad86729ca5c7" height="24" width="24"/>' +
            "</td><td>" +
            "+$" +
            amountIncome +
            "</td></tr><tr><td>" +
            '<img src="https://firebasestorage.googleapis.com/v0/b/habit-run.appspot.com/o/ic_expense%403x.png?alt=media&token=be0cf17e-4d9f-4214-890c-5ba2ab06c097" height="24" width="24"/>' +
            "</td><td>" +
            "-$" +
            amountExpense +
            "</td></tr></table>"
          );
        },
      },
      plotOptions: {
        column: {
          pointPadding: 0.5,
          borderWidth: 0,
          pointWidth: 7.5,
        },
      },
      series: [
        {
          color: colors.bleuDeFrance,
          data: incomeArr,
        },
        {
          color: colors.redCrayola,
          data: expenseArr,
        },
      ],
    };
    const paramsIncome = {
      type: "Income",
      totalIncome: income,
      totalExpense: expense,
      walletId: walletId,
    };
    const paramsExpense = {
      type: "Expense",
      totalIncome: income,
      totalExpense: expense,
      walletId: walletId,
    };

    return (
      <View key={index} style={styles.container}>
        <View style={styles.chartView}>
          {!isNull && (
            <HighchartsReactNative
              styles={styles.chart}
              options={options}
              useSSL
              useCDN
            />
          )}
        </View>

        <TotalTransaction
          style={styles.transactionEmpty}
          income={income}
          expense={expense}
          onPressIncome={() => navigate(ROUTES.ChartAnalysis, paramsIncome)}
          onPressExpense={() => navigate(ROUTES.ChartAnalysis, paramsExpense)}
        />
      </View>
    );
  }
);

export default StatisticPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: widthScreen,
    padding: 16,
  },
  chart: {
    height: heightScreen / 2.2,
    width: widthScreen,
  },
  chartView: {
    paddingHorizontal: 8,
    borderRadius: 16,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  transactionEmpty: {
    bottom: 0,
    marginTop: 16,
  },
});

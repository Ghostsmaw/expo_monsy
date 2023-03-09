import React, { memo, useCallback, useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Animated,
} from 'react-native';
import { heightScreen, widthScreen } from '@utils/dimensions';
//@ts-ignore
import HighchartsReactNative from '@lib/highcharts-react-native';
import colors from '@utils/colors';
import { ICON } from '@svg/Icon';
import Text from '@elements/Text';
import { currencyFormat } from '@utils/formatNumber';
import CategoryTransactionItem from './CategoryTransactionItem';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import ROUTES from '@utils/routes';
import SvgChartPie from '@svg/Icon/SvgChartPie';
import SvgChartBar from '@svg/Icon/SvgChartBar';
import keyExtractor from '@utils/keyExtractor';
import LoadingView from '@elements/LoadingView';
import { CIRCLE_CHART, CURRENCY } from '@store/models';
import useLayout from '@hooks/useLayout';
interface Props {
  index: number;
  walletId: number;
  currency: CURRENCY;
  typeTransaction: string;
  balance: number;
  categoryItems: CIRCLE_CHART[];
  dataPieIncome: any[];
  dataPieExpense: any[];
  dataColumnIncome: any[];
  dataColumnExpense: any[];
  category?: any;
}

const AnalysisPage = ({
  index,
  walletId,
  currency,
  typeTransaction,
  balance,
  category,
  categoryItems,
  dataPieIncome,
  dataPieExpense,
  dataColumnIncome,
  dataColumnExpense,
}: Props) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(true);
  const [tabActive, setTabActive] = useState(0);
  const [title, setTitle] = useState<string>('All categories');
  const [dataDetailIncome, setdataDetailIncome] = useState<any[]>([]);
  const [dataDetailExpense, setdataDetailExpense] = useState<any[]>([]);
  const { bottom } = useLayout();

  const transX = useRef(new Animated.Value(0)).current;
  useFocusEffect(
    React.useCallback(() => {
      initialized();
    }, []),
  );
  useEffect(() => {
    let dataDetailIncomeTmp: any[] = [];
    let dataDetailExpenseTmp: any[] = [];
    if (categoryItems && categoryItems.length > 0) {
      for (let i = 0; i < categoryItems.length; i++) {
        dataDetailIncomeTmp.push({
          title: categoryItems[i].category.name,
          icon: categoryItems[i].category.icon,
          amount: categoryItems[i].totalIncome,
          percent: Math.round((categoryItems[i].totalIncome / balance) * 100),
        });
        dataDetailExpenseTmp.push({
          title: categoryItems[i].category.name,
          icon: categoryItems[i].category.icon,
          amount: categoryItems[i].totalExpense,
          percent: Math.round((categoryItems[i].totalExpense / balance) * 100),
        });
      }
      setdataDetailIncome(dataDetailIncomeTmp);
      setdataDetailExpense(dataDetailExpenseTmp);
    }
  }, []);

  const initialized = async () => {
    try {
      setLoading(false);
    } catch (e) {}
  };

  useEffect(() => {
    if (tabActive === 0) {
      Animated.parallel([
        //@ts-ignore
        Animated.spring(transX, {
          toValue: 0,
          //@ts-ignore
          duration: 100,
          useNativeDriver: false,
        }).start(),
        //@ts-ignore
        Animated.spring(transX, {
          toValue: 0,
          //@ts-ignore
          duration: 100,
          useNativeDriver: false,
        }).start(),
      ]);
    } else if (tabActive === 1) {
      Animated.parallel([
        //@ts-ignore
        Animated.spring(transX, {
          toValue: 0,
          //@ts-ignore
          duration: 165 / 2,
          useNativeDriver: false,
        }).start(),
        //@ts-ignore
        Animated.spring(transX, {
          toValue: 165 / 2,
          //@ts-ignore
          duration: 100,
          useNativeDriver: false,
        }).start(),
      ]);
    }
  }, [tabActive]);

  const optionsChartPie = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
    },
    title: {
      text:
        "<p style='font-size:17;font-weight:600'>" +
        title +
        '</p></br>' +
        "<p style='font-size:16;color:#008BF8'>" +
        '$' +
        balance.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') +
        '</p>',
      align: 'center',
      verticalAlign: 'middle',
      y: 20,
    },
    credits: {
      enabled: false,
    },
    tooltip: {
      enabled: true,
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        dataLabels: {
          enabled: true,
          useHTML: true,
          distance: -35,
          filter: {
            property: 'percentage',
            operator: '>',
            value: 4,
          },
          formatter: function () {
            let percent = Math.round(this.point.percentage);
            return (
              "<p style='text-align:center;font-size:14;'>" + percent + '%</p>'
            );
          },
        },
      },
    },
    series: [
      {
        name: 'Percent',
        innerSize: '50%',
        data: typeTransaction === 'income' ? dataPieIncome : dataPieExpense,
      },
    ],
  };

  const optionsChartBar = {
    chart: {
      type: 'column',
      scrollablePlotArea: {
        minWidth: 1400,
        scrollPositionX: 1,
      },
    },
    xAxis: {
      categories: category,
      crosshair: true,
      title: {
        enabled: false,
      },
    },
    yAxis: {
      labels: {
        formatter: function () {
          var ret,
            numericSymbols = ['k', 'M', 'G', 'T', 'P', 'E'],
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
        text: '',
      },
      lineWidth: 1,
    },
    title: {
      text: '',
    },
    credits: {
      enabled: false,
    },
    scrollbar: {
      enabled: false,
    },
    tooltip: {
      followPointer: false,
      split: false,
      backgroundColor: '#fff',
      borderRadius: 4,
      padding: 8,
      borderWidth: 0,
      shadow: true,
      useHTML: true,
      formatter: function () {
        let amount = this.y
          .toString()
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        let type = this.series.name === 'Income' ? '+$' : '-$';
        let img =
          this.series.name === 'Income'
            ? '<img src="https://firebasestorage.googleapis.com/v0/b/habit-run.appspot.com/o/ic-income%403x.png?alt=media&token=443730dd-5f04-4dcf-b753-ad86729ca5c7" height="24" width="24"/>'
            : '<img src="https://firebasestorage.googleapis.com/v0/b/habit-run.appspot.com/o/ic_expense%403x.png?alt=media&token=be0cf17e-4d9f-4214-890c-5ba2ab06c097" height="24" width="24"/>';
        return (
          '<table style="font-family: Ek Mukta; color:#252827; min-width: 80"><tr><td>' +
          img +
          '</td><td>' +
          type +
          amount +
          '</td></tr></table>'
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
        name: typeTransaction === 'income' ? 'Income' : 'Expense',
        color:
          typeTransaction === 'income'
            ? colors.bleuDeFrance
            : colors.redCrayola,
        data:
          typeTransaction === 'income' ? dataColumnIncome : dataColumnExpense,
      },
    ],
  };

  const onPressChartPie = () => {
    setTabActive(0);
  };

  const onPressChartBar = () => {
    setTabActive(1);
  };

  const listHeaderComponent = useCallback(() => {
    return (
      <View key={index} style={styles.box}>
        <View style={styles.setRow}>
          {ICON[`${typeTransaction}`]}
          <Text size={16} marginLeft={8} capitalize>
            {typeTransaction}
          </Text>
          {/* <View style={styles.iconView}>{ICON.rightArrow}</View> */}
        </View>
        <Text
          color={
            typeTransaction === 'expense'
              ? colors.redCrayola
              : colors.bleuDeFrance
          }
          bold
          size={22}
          lineHeight={37}
        >
          {currencyFormat(balance, currency)}
        </Text>
        {tabActive === 0 ? (
          <View style={styles.chart}>
            <HighchartsReactNative
              useSSL={false}
              useCDN={false}
              styles={styles.chartView}
              options={optionsChartPie}
            />
          </View>
        ) : (
          <View style={styles.chart}>
            <HighchartsReactNative
              useSSL={false}
              useCDN={false}
              styles={styles.chartView}
              options={optionsChartBar}
            />
          </View>
        )}
        <View style={styles.tabBar}>
          <Animated.View
            style={[styles.tab, { transform: [{ translateX: transX }] }]}
          />
          <TouchableOpacity onPress={onPressChartPie} style={styles.tabStyle}>
            <SvgChartPie
              color={tabActive === 0 ? colors.white : colors.grey3}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressChartBar} style={styles.tabStyle}>
            <SvgChartBar
              color={tabActive === 1 ? colors.white : colors.grey3}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }, [typeTransaction, currency, balance, tabActive]);

  const renderItem = useCallback(({ item, index }) => {
    const params = {
      walletId: walletId,
      type: typeTransaction === 'income' ? 'income' : 'expense',
      title: item.title,
      item: item,
    };
    const onHandleChartTransaction = () => {
      navigation.navigate(ROUTES.ChartTransaction, params);
    };
    return (
      <CategoryTransactionItem
        onPress={onHandleChartTransaction}
        style={[styles.item, { marginLeft: index % 2 ? 16 : 0 }]}
        totalBalance={balance}
        currency={currency}
        {...item}
      />
    );
  }, []);

  return (
    <View key={index} style={styles.container}>
      {loading ? (
        <LoadingView isLoading={loading} />
      ) : (
        <FlatList
          data={
            typeTransaction === 'income' ? dataDetailIncome : dataDetailExpense
          }
          ListHeaderComponent={listHeaderComponent}
          contentContainerStyle={[
            styles.contentContainerStyle,
            { paddingBottom: bottom + 16 },
          ]}
          keyExtractor={keyExtractor}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          numColumns={2}
        />
      )}
    </View>
  );
};

export default AnalysisPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: widthScreen,
  },
  chart: {
    height: heightScreen / 2.2,
    width: widthScreen / 1.1,
    alignSelf: 'center',
  },
  box: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: colors.white,
    paddingTop: 12,
    paddingHorizontal: 12,
  },
  setRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconView: {
    transform: [{ rotate: '90deg' }],
    marginLeft: 12,
  },
  item: {
    marginTop: 16,
  },
  contentContainerStyle: {
    backgroundColor: colors.snow,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  tabBar: {
    position: 'absolute',
    width: 159,
    height: 33,
    backgroundColor: colors.snow,
    top: 16,
    right: 8,
    borderRadius: 20,
    flexDirection: 'row',
  },
  tab: {
    width: '50%',
    height: '100%',
    backgroundColor: colors.emerald,
    borderRadius: 20,
    position: 'absolute',
  },
  tabStyle: {
    width: '50%',
    height: '100%',
    backgroundColor: 'transparent',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartView: {
    flex: 1,
    marginTop: 20,
  },
});

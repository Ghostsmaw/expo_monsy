import React, { useState, useCallback } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Text from '@elements/Text';
import colors from '@utils/colors';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { currencyFormat } from '@utils/formatNumber';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import BoxTransactionItem from '@components/BoxTransactionItem';
import keyExtractor from '@utils/keyExtractor';
import LoadingView from '@elements/LoadingView';
import { CURRENCY } from '@store/models';
import { useSelector, useDispatch } from 'react-redux';
import { IMasterState } from '../../store/models/reducers/master';
import { ITransactionRequestState } from '@store/models/actions/transaction';
import { onTransactionRequest } from '@store/actions/transactionAction';
import { IDataState } from '@store/models/reducers/data';
import { CalendarRange } from '@ui-kitten/components';
import dayjs from '@utils/dayjs';
import moment from 'moment';
import useLayout from '@hooks/useLayout';

interface IState {
  masterReducer: IMasterState;
  dataReducer: IDataState;
}

const ChartTransaction = ({ route }: any) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { bottom } = useLayout();
  const [loading, setLoading] = useState<boolean>(true);
  const [transactions, setTransactions] = useState<any>([]);
  const user = useSelector((state: IState) => state.masterReducer.user);
  const [currency] = useState<CURRENCY>(user.currency);
  const listTransactions = useSelector(
    (state: IState) => state.dataReducer.transactions,
  );
  const [range] = React.useState<CalendarRange<Date>>({
    startDate: dayjs().startOf('month').toDate(),
    endDate: dayjs().endOf('month').toDate(),
  });

  function sameDay(d1: string, d2: string) {
    let timeOne = d1.split('T')[0];
    let timeTwo = d2.split('T')[0];
    return timeOne === timeTwo;
  }

  useFocusEffect(
    React.useCallback(() => {
      initialized();
    }, [user]),
  );

  const initialized = async () => {
    try {
      let actionData: ITransactionRequestState;

      actionData = {
        walletId: route.params.walletId,
        from: range.startDate,
        to: range.endDate,
      };
      await dispatch(onTransactionRequest(actionData));

      let transactions: any[] = [];
      let transactionsss: any[] = [];
      let count = 0;
      if (listTransactions[0].items.length > 0) {
        listTransactions[0].items.sort(function (a, b) {
          return new Date(b.date).valueOf() - new Date(a.date).valueOf();
        });

        for (let i = 0; i < listTransactions[0].items.length; i++) {
          if (
            route.params.title === listTransactions[0].items[i].category.name &&
            route.params.type === listTransactions[0].items[i].type
          ) {
            transactionsss.push(listTransactions[0].items[i]);
          }
        }
        for (let i = 0; i < transactionsss.length; i++) {
          if (
            i > 0 &&
            sameDay(transactionsss[i - 1].date, transactionsss[i].date)
          ) {
            transactions[i - count - 1].content.push({
              id: transactionsss[i].id,
              icon: transactionsss[i].category.icon,
              note: transactionsss[i].note,
              date: transactionsss[i].date,
              balance: transactionsss[i].balance,
              type: transactionsss[i].type,
            });
            count++;
          } else {
            transactions.push({
              title: moment(transactionsss[i].date).format('dddd DD, MMMM'),
              content: [
                {
                  id: transactionsss[i].id,
                  icon: transactionsss[i].category.icon,
                  note: transactionsss[i].note,
                  date: transactionsss[i].date,
                  balance: transactionsss[i].balance,
                  type: transactionsss[i].type,
                },
              ],
            });
          }
        }
      }
      setTransactions(transactions);
      setLoading(false);
    } catch (e) {}
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: route.params.item.title,
    });
  }, []);

  const renderItem = useCallback(({ item }) => {
    return <BoxTransactionItem style={styles.item} {...item} />;
  }, []);

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar barStyle="light-content" />
      <View style={styles.containerUnderHeader}>
        <Text bold lineHeight={34} size={28} color={colors.white} marginTop={8}>
          {currencyFormat(route.params.item.amount, currency)}
        </Text>
      </View>
      {loading ? (
        <LoadingView isLoading={loading} />
      ) : (
        <FlatList
          data={transactions}
          renderItem={renderItem}
          bounces={false}
          contentContainerStyle={[
            styles.contentContainerStyle,
            { paddingBottom: bottom + 16 },
          ]}
          showsVerticalScrollIndicator={false}
          keyExtractor={keyExtractor}
        />
      )}
    </View>
  );
};

export default ChartTransaction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.snow,
  },
  contentContainerStyle: {
    alignItems: 'stretch',
  },
  containerUnderHeader: {
    backgroundColor: colors.emerald,
    alignItems: 'center',
  },
  item: {
    marginTop: 16,
    marginLeft: 16,
    marginRight: 16,
  },
});

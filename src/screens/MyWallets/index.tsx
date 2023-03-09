import React, { memo, useCallback, useRef, useState } from 'react';
import { View, StyleSheet, Animated, ScrollView } from 'react-native';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import colors from '@utils/colors';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import HeaderButton from '@elements/Header/HeaderButton';
import { ICON } from '@svg/Icon';
import WalletItem from '@components/WalletItem';
import { currencyFormat } from '@utils/formatNumber';
import ROUTES from '@utils/routes';
import { useSelector } from 'react-redux';
import { IDataState } from '@store/models/reducers/data';
import { CURRENCY } from '@store/models';
import { ILoading } from '@store/models/reducers/loading';
import { RefreshControl } from 'react-native-web-refresh-control';
import { IMasterState } from '@store/models/reducers/master';
import { useTheme } from '@ui-kitten/components';
import Text from '@components/Text';
import useLayout from '@hooks/useLayout';

interface IState {
  dataReducer: IDataState;
  masterReducer: IMasterState;
  loadingReducer: ILoading;
}

const MyWallets = memo(() => {
  const navigation = useNavigation();
  const [currency, setCurrency] = useState<CURRENCY>();
  const [amount, setAmount] = useState<number>(0);
  const { bottom } = useLayout();

  const theme = useTheme();

  const scrollY = useRef(new Animated.Value(0)).current;
  const wallets = useSelector((state: IState) => state.dataReducer.wallets);
  const user = useSelector((state: IState) => state.masterReducer.user);

  const onPressAdd = useCallback(() => {
    const params = { route: ROUTES.MyWallets };
    navigation.navigate(ROUTES.CreateAssets, params);
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <HeaderButton icon={ICON.whiteBackArrow} />,
      headerRight: () => <HeaderButton onPress={onPressAdd} icon={ICON.add} />,
    });
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      initialized();
    }, [wallets]),
  );

  const initialized = async () => {
    try {
      let balance = 0;
      for (let i = 0; i < wallets.length; i++) {
        balance += wallets[i].balance;
      }
      setAmount(balance);
      setCurrency(user.currency);
    } catch (e) {}
  };

  const onPressWallet = useCallback((item: any) => {
    const res = item;
    navigation.navigate(ROUTES.MyWalletsEdit, res);
  }, []);

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar barStyle="light-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: bottom }}
        refreshControl={
          <RefreshControl style={{ tintColor: theme['color-primary-500'] }} />
        }
      >
        <View style={styles.topView}>
          <Text
            category="headline"
            status="white"
            center
            opacity={0.7}
            marginTop={24}
          >
            Total balance
          </Text>
          {currency && (
            <Text category="title2" status="white" center>
              {currencyFormat(amount, currency)}
            </Text>
          )}
        </View>
        <View style={styles.contentStyle}>
          <Text
            category="title4"
            marginTop={24}
            marginLeft={32}
            uppercase
            marginBottom={16}
          >
            Available wallets
          </Text>
          {wallets.map((item: any, index: number) => {
            return (
              <View key={index} style={styles.item}>
                <WalletItem
                  onPressWallet={() => onPressWallet(item)}
                  style={styles.walletItem}
                  currency={currency}
                  scrollY={scrollY}
                  {...item}
                />
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
});

export default MyWallets;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  walletItem: {
    width: '100%',
  },
  contentStyle: {
    backgroundColor: colors.white,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    marginTop: -20,
  },
  textTotal: {
    marginTop: 24,
    fontSize: 17,
    lineHeight: 24,
    alignSelf: 'center',
    color: colors.white,
  },
  textBalance: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
    alignSelf: 'center',
    color: colors.white,
  },
  item: {
    paddingHorizontal: 32,
  },
  topView: {
    backgroundColor: colors.emerald,
    paddingBottom: 30,
  },
});

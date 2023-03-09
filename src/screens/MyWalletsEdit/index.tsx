import React, { memo, useState, useRef } from 'react';
import { View, StyleSheet, ScrollView, Animated, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HeaderButton from '@elements/Header/HeaderButton';
import WalletItem from '@components/WalletItem';
import { ICON } from '@svg/Icon';
import { format } from '@utils/formatNumber';
import ButtonPrimary from '@elements/Button/ButtonPrimary';
import { widthScreen } from '@utils/dimensions';
import colors from '@utils/colors';
import AnimatedInput from '@components/AnimatedInput';
import ROUTES from '@utils/routes';
import ConfirmDialog from '@elements/Dialog/ConfirmDialog';
import { IMAGE_ICON } from '@assets/Icon';
import {
  onDeleteWalletRequest,
  onDeleteWalletResponse,
  onUpdateWalletRequest,
} from '../../store/actions/commonActions';
import { onDeleteAllTransactionRequest } from '../../store/actions/transactionAction';
import { CURRENCY, TYPE_WALLET } from '@store/models';
import { useSelector, useDispatch } from 'react-redux';
import { IMasterState } from '../../store/models/reducers/master';
import useLayout from '@hooks/useLayout';

interface IState {
  masterReducer: IMasterState;
}

const MyWalletsEdit = memo(({ route }: any) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [currency, setCurrency] = useState<CURRENCY>();
  const [walletName, setWalletName] = useState<string>('');
  const [balance, setBalance] = useState<number>(0);
  const [showDialog, setShowDialog] = useState(false);
  const [walletId, setWalletId] = useState<number>(0);
  const [typeWallet, setTypeWallet] = useState<TYPE_WALLET>();
  const user = useSelector((state: IState) => state.masterReducer.user);
  const transY = useRef(new Animated.Value(0)).current;
  const { bottom } = useLayout();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Wallet Edit',
      headerLeft: () => <HeaderButton />,
    });
  }, []);

  React.useEffect(() => {
    if (route.params?.id) {
      setWalletId(route.params?.id);
    }
    if (route.params?.name) {
      setWalletName(route.params?.name);
    }
    setBalance(route.params?.balance);
    if (route.params?.typeWallet) {
      setTypeWallet(route.params?.typeWallet);
    }
    user && setCurrency(user.currency);
  }, [
    route.params?.name,
    route.params?.balance,
    route.params?.typeWallet,
    user,
  ]);

  const onPressDelete = () => {
    setShowDialog(true);
    //navigation.goBack();
  };

  const onPressSave = () => {
    dispatch(
      onUpdateWalletRequest({
        id: walletId,
        name: walletName,
        balance: balance,
        typeWalletId: typeWallet?.id ? typeWallet?.id : 1,
      }),
    );
    navigation.goBack();
  };

  const onCreateAssetsName = () => {
    const param = { name: walletName, route: ROUTES.MyWalletsEdit };
    navigation.navigate(ROUTES.CreateAssetsName, param);
  };
  const onCreateAssetsBalance = () => {
    const param = { currency: currency?.currency, route: ROUTES.MyWalletsEdit };
    navigation.navigate(ROUTES.CreateAssetsBalance, param);
  };
  const onCreateAssetsType = () => {
    const param = { typeWallet: typeWallet, route: ROUTES.MyWalletsEdit };
    navigation.navigate(ROUTES.CreateAssetsType, param);
  };

  const onPressYes = async () => {
    dispatch(onDeleteWalletRequest(walletId));
    dispatch(onDeleteAllTransactionRequest(walletId));
    setShowDialog(false);
    navigation.goBack();
  };

  const onPressNo = () => {
    setShowDialog(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView scrollEnabled={false}>
        <View style={styles.walletView}>
          {typeWallet && currency ? (
            <WalletItem
              {...route.params}
              style={styles.walletItem}
              noneArrow={true}
            />
          ) : null}
        </View>
        <View style={styles.contentView}>
          <AnimatedInput
            onPress={onCreateAssetsName}
            icon={ICON.note}
            value={walletName}
            placeholder={'Name Account'}
          />
          <AnimatedInput
            onPress={onCreateAssetsBalance}
            value={`${currency?.code || '$'} ${format(balance)}`}
            placeholder={'Amount'}
            currency={currency?.currency}
            icon={ICON.calculator}
          />
          <AnimatedInput
            onPress={onCreateAssetsType}
            imageIcon={
              typeWallet?.icon ? IMAGE_ICON[`${typeWallet.icon}`] : null
            }
            value={typeWallet?.name ? typeWallet.name : ''}
            placeholder={'Type'}
            nonBorder={true}
          />
        </View>
      </ScrollView>
      <View
        style={[
          styles.buttonView,
          { paddingBottom: Platform.OS === 'ios' ? bottom + 12 : 12 },
        ]}
      >
        <View style={styles.buttonDeleteView}>
          <ButtonPrimary
            onPress={onPressDelete}
            title={'Delete this wallet'}
            titleStyle={styles.textDelete}
            underlayColor={colors.snow}
            style={styles.buttonDelete}
          />
        </View>
        <View style={styles.buttonSaveView}>
          <ButtonPrimary
            onPress={onPressSave}
            title={'Save'}
            style={styles.buttonSave}
          />
        </View>
      </View>
      <ConfirmDialog
        titleButton1={'Yes'}
        titleButton2={'No'}
        image={IMAGE_ICON.confuse}
        description={'Do you want remove\nthis wallet'}
        visible={showDialog}
        onTouchOutside={onPressNo}
        onButton1={onPressYes}
        onButton2={onPressNo}
      />
    </View>
  );
});

export default MyWalletsEdit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.snow,
  },
  walletView: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  walletItem: {
    width: '100%',
    alignSelf: 'center',
  },
  buttonView: {
    width: widthScreen,
    backgroundColor: colors.white,
    bottom: 0,
    position: 'absolute',
  },
  buttonSave: {
    width: '100%',
  },
  buttonDelete: {
    backgroundColor: colors.snow,
  },
  textDelete: {
    color: colors.redCrayola,
  },
  buttonSaveView: {
    shadowColor: 'rgba(0, 0, 0, 0.7)',
    shadowOffset: { width: -1, height: -1 },
    shadowRadius: 4,
    shadowOpacity: 0.05,
    borderTopWidth: 1,
    borderTopColor: colors.snow,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  buttonDeleteView: {
    flex: 1,
    backgroundColor: colors.snow,
    alignItems: 'center',
  },
  contentView: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginTop: 24,
    paddingRight: 21,
    paddingLeft: 18,
    marginHorizontal: 16,
  },
});

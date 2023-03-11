import React, { memo, useCallback, useState, useRef, useEffect } from "react";
import { View, StyleSheet, Platform, Animated, Alert } from "react-native";
import colors from "@utils/colors";
import AnimatedInput from "@components/AnimatedInput";
import { useNavigation } from "@react-navigation/native";
import ROUTES from "@utils/routes";
import { format } from "@utils/formatNumber";
import AnimatedTab from "@elements/AnimatedTab";
import Animated2Tab from "@elements/Animated2Tab";
import Text from "@elements/Text";
import FONTS from "@utils/fonts";
import { IMAGE_ICON } from "@assets/Icon";
import { ICON } from "@svg/Icon";
import { widthScreen } from "@utils/dimensions";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import HeaderButton from "@elements/Header/HeaderButton";
import ButtonPrimary from "@elements/Button/ButtonPrimary";
import ConfirmDialog from "@elements/Dialog/ConfirmDialog";
import ButtonSecondary from "@elements/Button/ButtonSecondary";
import AnimatedModal from "@elements/AnimatedModal";
import { CATEGORY, TRANSACTION, WALLET } from "@store/models";
import { useSelector, useDispatch } from "react-redux";
import { IDataState } from "@store/models/reducers/data";
import { ILoading } from "@store/models/reducers/loading";
import {
  onDeleteTransactionRequest,
  onUpdateTransactionRequest,
} from "../../store/actions/transactionAction";
import moment from "moment";
import { IMAGE_ICON_CATEGORY } from "@assets/IconCategory";
import { IMasterState } from "../../store/models/reducers/master";
import ModalizeKeyboard from "@components/ModalizeKeyboard";
import ModalizeCalendar from "@components/ModalizeCalendar";
import useModalize from "@hooks/useModalize";
import dayjs from "@utils/dayjs";
import useLayout from "@hooks/useLayout";
interface IState {
  dataReducer: IDataState;
  loadingReducer: ILoading;
  masterReducer: IMasterState;
}

const EditTransaction = memo(({ route }: any) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { bottom } = useLayout();

  const wallets = useSelector((state: IState) => state.dataReducer.wallets);
  const userData = useSelector((state: IState) => state.masterReducer.user);

  const [currency, setCurrency] = useState<string>("NGN");
  const [balance, setBalance] = useState<any>(0);
  const [category, setCategory] = useState<CATEGORY>();
  const [wallet, setWallet] = useState<WALLET>();
  const [walletFrom, setWalletFrom] = useState<any>({});
  const [walletTo, setWalletTo] = useState<any>({});
  const [date, setDate] = useState<string>(dayjs().format());
  const [note, setNote] = useState<string>("");

  const [showDialog, setShowDialog] = useState(false);
  const [tabActive, setTabActive] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(false);
  const [tmpBalance, setTmpBalance] = useState<string>("");
  const [visibleKeyBoard, setVisibleKeyBoard] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const translateY = useRef(new Animated.Value(0)).current;
  const transY = useRef(new Animated.Value(0)).current;
  const transaction: TRANSACTION = route.params;

  const now = new Date();
  const max = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const { modalizeRef, open, close } = useModalize();

  const {
    modalizeRef: modalizeKeyboard,
    open: openKeyboard,
    close: closeKeyBoard,
  } = useModalize();

  React.useEffect(() => {
    setCategory(route.params?.category);
    if (route.params?.date) {
      setDate(route.params?.date);
    }
    if (route.params?.note) {
      setNote(route.params?.note);
    }
    if (route.params?.balance) {
      setBalance(route.params?.balance);
      setTmpBalance(route.params?.balance);
    }

    if (route.params?.walletId) {
      const wallet = wallets.find((item) => {
        return item.id == route.params?.walletId;
      });
      setWallet(wallet);
    }
    if (route.params?.wallet) {
      setWallet(route.params?.wallet);
    }
    if (route.params?.walletFrom) {
      setWalletFrom(route.params?.walletFrom);
    }
    if (route.params?.walletTo) {
      setWalletTo(route.params?.walletTo);
    }
    userData && userData.currency && setCurrency(userData.currency.currency);
  }, [
    route.params?.category,
    route.params?.walletId,
    route.params?.date,
    route.params?.note,
    route.params?.balance,
    route.params?.wallet,
    route.params?.walletFrom,
    route.params?.walletTo,
    route.params?.type,
  ]);

  React.useLayoutEffect(() => {
    const onPressGoBack = () => {
      //setShowModal(true);
      navigation.goBack();
    };

    navigation.setOptions({
      headerLeft: () => <HeaderButton onPress={onPressGoBack} />,
    });
  }, []);

  useEffect(() => {
    if (showModal) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 400,
        useNativeDriver: false,
      }).start();
    } else if (!showModal) {
      Animated.timing(translateY, {
        toValue: 200,
        duration: 400,
        useNativeDriver: false,
      }).start();
    }
    if (showModal) {
      Animated.timing(transY, {
        toValue: 200,
        duration: 400,
        useNativeDriver: false,
      }).start();
    } else if (!showModal) {
      Animated.timing(transY, {
        toValue: 0,
        duration: 400,
        useNativeDriver: false,
      }).start();
    }
  }, [showModal, transY, translateY]);

  const onAddTransactionCategory = useCallback(() => {
    const params = {
      category: category,
      route: ROUTES.EditTransaction,
      type: category?.type,
    };
    navigation.navigate(ROUTES.AddTransactionCategory, params);
  }, [category]);

  const onAddTransactionWallet = useCallback(() => {
    const params = { wallet: wallet, route: ROUTES.EditTransaction };
    navigation.navigate(ROUTES.AddTransactionWallets, params);
  }, [wallet]);

  const onAddTransactionNote = () => {
    const params = { route: ROUTES.EditTransaction, note: note };
    navigation.navigate(ROUTES.AddTransactionNote, params);
  };

  const onAddTransactionWalletFrom = useCallback(() => {
    const params = { type: 1 };
    navigation.navigate(ROUTES.AddTransactionWallets, params);
  }, []);

  const onAddTransactionWalletTo = useCallback(() => {
    const params = { type: 2 };
    navigation.navigate(ROUTES.AddTransactionWallets, params);
  }, []);
  const onSelectDate = () => {
    setVisible(true);
  };
  const onOpenKeyboard = () => {
    setVisibleKeyBoard(true);
    openKeyboard();
  };
  const onCloseKeyboard = () => {
    setVisibleKeyBoard(false);
  };
  const onTextChange = (text: string) => {
    setTmpBalance(text);
  };

  const onHandleCalculation = (value: number) => {
    setBalance(value);
  };

  const onDone = React.useCallback((value: number) => {
    setBalance(value);
    setVisibleKeyBoard(false);
    closeKeyBoard();
  }, []);

  const onPressDiscardChange = () => {
    Animated.timing(translateY, {
      toValue: 200,
      duration: 400,
      useNativeDriver: false,
    }).start(() => setShowModal(false));
  };

  const onPressKeepEditing = () => {
    Animated.timing(translateY, {
      toValue: 200,
      duration: 400,
      useNativeDriver: false,
    }).start(() => setShowModal(false));
  };

  const onDismiss = () => {
    Animated.timing(translateY, {
      toValue: 200,
      duration: 400,
      useNativeDriver: false,
    }).start(() => setShowModal(false));
  };

  const onPressDelete = () => {
    setShowDialog(true);
  };

  const onPressSave = async () => {
    switch (tabActive) {
      case 0:
        if (wallet && category && date) {
          await dispatch(
            onUpdateTransactionRequest({
              id: transaction.id,
              balanceMinus:
                route.params?.type == "expense"
                  ? wallet.balance + (balance - transaction.balance)
                  : wallet.balance - (transaction.balance + balance),
              balanceAdd: 0,
              balance: balance,
              categoryId: category.id,
              walletId: wallet.id,
              walletFromId: 0,
              walletToId: 0,
              date: date,
              note: note,
              type: "expense",
            })
          );
          navigation.goBack();
        }
        break;
      case 1:
        if (wallet && category && date) {
          await dispatch(
            onUpdateTransactionRequest({
              id: transaction.id,
              balanceMinus: 0,
              balanceAdd:
                route.params?.type == "expense"
                  ? wallet.balance + (balance + transaction.balance)
                  : wallet.balance + (balance - transaction.balance),
              balance: balance,
              categoryId: category.id,
              walletId: wallet.id,
              walletFromId: 0,
              walletToId: 0,
              date: date,
              note: note,
              type: "income",
            })
          );
          navigation.goBack();
        }
        break;
      case 2:
        if (walletFrom.id == walletTo.id) {
          setTimeout(() => {
            Alert.alert("Wallet overlap");
          }, 200);
        } else {
          if (wallet && category && date) {
            await dispatch(
              onUpdateTransactionRequest({
                id: transaction.id,
                balanceAdd:
                  route.params?.type == "transfer"
                    ? walletTo.balance + (balance - transaction.balance)
                    : walletTo.balance + balance,
                balanceMinus:
                  route.params?.type == "income"
                    ? wallet.balance - (transaction.balance + balance)
                    : walletFrom.balance + (balance - transaction.balance),
                balance: balance,
                categoryId: 52,
                walletId: 0,
                walletFromId: walletFrom.id,
                walletToId: walletTo.id,
                date: date,
                note: note,
                type: "transfer",
              })
            );
            navigation.goBack();
          }
          break;
        }
      default:
        if (wallet && category && date) {
          await dispatch(
            onUpdateTransactionRequest({
              id: transaction.id,
              balanceMinus:
                route.params?.type == "expense"
                  ? wallet.balance + (balance - transaction.balance)
                  : wallet.balance - (transaction.balance + balance),
              balanceAdd: 0,
              balance: balance,
              categoryId: category.id,
              walletId: wallet.id,
              walletFromId: 0,
              walletToId: 0,
              date: date,
              note: note,
              type: "expense",
            })
          );
          navigation.goBack();
        }
        break;
    }
  };
  const onPressYes = async () => {
    await dispatch(
      onDeleteTransactionRequest(transaction, wallet?.balance || 0)
    );
    navigation.goBack();
    setShowDialog(false);
  };

  const onPressNo = () => {
    setShowDialog(false);
  };

  const renderButtons = useCallback(() => {
    return (
      <Animated.View
        style={[
          styles.buttonsView,
          {
            transform: [{ translateY: translateY }],
            paddingBottom: Platform.OS === "ios" ? bottom + 12 : 12,
          },
        ]}
      >
        <ButtonSecondary
          onPress={onPressDiscardChange}
          titleStyle={styles.textDiscard}
          title={"Discard changes"}
          style={styles.buttonDiscard}
        />
        <ButtonPrimary
          onPress={onPressKeepEditing}
          title={"Keep editing"}
          titleStyle={styles.textKeep}
          style={styles.buttonPrimary}
        />
      </Animated.View>
    );
  }, [translateY]);

  return (
    <View style={styles.container}>
      <View style={styles.tabView}>
        {/*
        * hind transfer
        {
          wallets.length > 1 ?
            <AnimatedTab
              onPressTab1={() => setTabActive(0)}
              onPressTab2={() => setTabActive(1)}
              onPressTab3={() => setTabActive(2)}
              titleTab1={"Expenses"}
              titleTab2={"Income"}
              titleTab3={"Transfer"}
            />
            :
            <Animated2Tab
              onPressTab1={() => setTabActive(0)}
              onPressTab2={() => setTabActive(1)}
              titleTab1={"Expenses"}
              titleTab2={"Income"}
            />
        } */}
        <Animated2Tab
          onPressTab1={() => setTabActive(0)}
          onPressTab2={() => setTabActive(1)}
          titleTab1={"Expenses"}
          titleTab2={"Income"}
        />
      </View>
      <ScrollView>
        <TouchableWithoutFeedback onPress={onOpenKeyboard}>
          <View style={styles.inputView}>
            {tabActive === 0 ? (
              <Text style={styles.textExpense}>
                -{visibleKeyBoard ? tmpBalance : format(balance)}
              </Text>
            ) : tabActive === 1 ? (
              <Text style={styles.textIncome}>
                +{visibleKeyBoard ? tmpBalance : format(balance)}
              </Text>
            ) : (
              <Text style={styles.textTransfer}>
                {visibleKeyBoard ? tmpBalance : format(balance)}
              </Text>
            )}
            {currency !== null && (
              <View style={styles.currencyView}>
                <Text style={styles.textCurrency}>{currency}</Text>
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
        {tabActive == 2 ? (
          <View style={styles.contentView}>
            <AnimatedInput
              onPress={onAddTransactionWalletFrom}
              imageIcon={
                walletFrom && walletFrom.icon
                  ? IMAGE_ICON[`${walletFrom.icon}`]
                  : IMAGE_ICON.wallet
              }
              value={walletFrom && walletFrom.name ? walletFrom.name : ""}
              placeholder={"From wallet"}
            />
            <AnimatedInput
              onPress={onAddTransactionWalletTo}
              imageIcon={
                walletTo && walletTo.icon
                  ? IMAGE_ICON[`${walletTo.icon}`]
                  : IMAGE_ICON.wallet
              }
              value={walletTo && walletTo.name ? walletTo.name : ""}
              placeholder={"To wallet"}
              nonBorder={true}
            />
            <AnimatedInput
              onPress={onSelectDate}
              icon={ICON.calendar}
              value={date}
              placeholder={"Date"}
            />
            <AnimatedInput
              onPress={onAddTransactionNote}
              icon={ICON.note}
              value={note}
              placeholder={"Note"}
            />
          </View>
        ) : (
          <View style={styles.contentView}>
            <AnimatedInput
              onPress={onAddTransactionCategory}
              imageIcon={
                category?.icon
                  ? IMAGE_ICON_CATEGORY[`${category.icon}`]
                  : IMAGE_ICON_CATEGORY.ic008
              }
              value={category?.name ? category.name : "null"}
              placeholder={"Category"}
            />
            <AnimatedInput
              onPress={onAddTransactionWallet}
              imageIcon={
                wallet?.typeWallet.icon
                  ? IMAGE_ICON[`${wallet.typeWallet.icon}`]
                  : null
              }
              //imageIcon={walletTypeId ? IMAGE_ICON[`${walletTypeId}`] : null}
              value={wallet?.name ? wallet.name : ""}
              placeholder={"Wallet"}
              nonBorder={true}
            />
            <AnimatedInput
              onPress={open}
              icon={ICON.calendar}
              value={dayjs(date).format("DD/MM/YYYY")}
              placeholder={"Date"}
            />
            <AnimatedInput
              onPress={onAddTransactionNote}
              icon={ICON.note}
              value={note}
              placeholder={"Note"}
            />
          </View>
        )}
      </ScrollView>
      {!visibleKeyBoard ? (
        <Animated.View
          style={[
            styles.buttonView,
            { transform: [{ translateY: transY }], paddingBottom: 30 },
          ]}
        >
          <View style={styles.buttonDeleteView}>
            <ButtonPrimary
              onPress={onPressDelete}
              title={"Delete this transaction"}
              titleStyle={styles.textDelete}
              underlayColor={colors.snow}
              style={styles.buttonDelete}
            />
          </View>
          <View style={styles.buttonSaveView}>
            <ButtonPrimary
              onPress={onPressSave}
              titleStyle={styles.textSave}
              title={"Save"}
              style={styles.buttonSave}
            />
          </View>
        </Animated.View>
      ) : null}
      <AnimatedModal
        onDismissLayout={onDismiss}
        visible={showModal}
        children={renderButtons()}
      />

      <ConfirmDialog
        titleButton1={"Yes"}
        titleButton2={"No"}
        image={IMAGE_ICON.confuse}
        description={"Do you want remove\nthis transaction"}
        visible={showDialog}
        onTouchOutside={onPressNo}
        onButton1={onPressYes}
        onButton2={onPressNo}
      />
      <ModalizeCalendar
        ref={modalizeRef}
        title="Select Date"
        date={dayjs(date).toDate()}
        onChangeDate={(date) => setDate(dayjs(date).format())}
        max={max}
      />
      <ModalizeKeyboard
        ref={modalizeKeyboard}
        onOverlayPress={onCloseKeyboard}
        onTextChange={onTextChange}
        onCalc={onHandleCalculation}
        onDone={onDone}
      />
    </View>
  );
});

export default EditTransaction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.snow,
  },
  contentView: {
    marginHorizontal: 16,
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingRight: 21,
    paddingLeft: 18,
  },
  tabView: {
    backgroundColor: colors.white,
    paddingTop: 4,
    paddingBottom: 12,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  inputView: {
    paddingVertical: 27,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 70,
  },
  textExpense: {
    fontFamily: FONTS.MUKTA.Bold,
    fontSize: 34,
    lineHeight: 41,
    color: colors.redCrayola,
  },
  textTransfer: {
    fontFamily: FONTS.MUKTA.Bold,
    fontSize: 34,
    lineHeight: 41,
    color: colors.emerald,
  },
  textIncome: {
    fontFamily: FONTS.MUKTA.Bold,
    fontSize: 34,
    lineHeight: 41,
    color: colors.bleuDeFrance,
  },
  currencyView: {
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: colors.grey5,
    marginRight: 14,
    paddingHorizontal: 8,
    paddingVertical: 2,
    position: "absolute",
    top: 12,
    left: 16,
  },
  textCurrency: {
    fontFamily: FONTS.MUKTA.SemiBold,
    fontSize: 14,
    color: colors.grey1,
  },
  input: {
    width: 0,
    height: 0,
    position: "absolute",
  },
  buttonView: {
    width: widthScreen,
    backgroundColor: colors.white,
    bottom: 0,
    position: "absolute",
  },
  buttonSave: {
    width: "100%",
  },
  textSave: {
    fontSize: 17,
  },
  buttonDelete: {
    backgroundColor: colors.snow,
  },
  textDelete: {
    color: colors.redCrayola,
    fontSize: 17,
  },
  buttonsView: {
    paddingHorizontal: 16,
    paddingTop: 12,
    width: widthScreen,
    backgroundColor: colors.white,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  buttonPrimary: {
    width: "100%",
  },
  buttonDiscard: {
    marginBottom: 17,
    width: "100%",
  },
  textDiscard: {
    fontSize: 17,
  },
  textKeep: {
    fontSize: 17,
  },
  buttonSaveView: {
    shadowColor: "rgba(0, 0, 0, 0.7)",
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
    alignItems: "center",
  },
});

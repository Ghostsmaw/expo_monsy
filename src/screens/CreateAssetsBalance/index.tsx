import React, { memo } from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Layout } from "@ui-kitten/components";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import useModalize from "@hooks/useModalize";

import Text from "@components/Text";
import Container from "@components/Container";
import ModalizeKeyboard from "@components/ModalizeKeyboard";

import ROUTES from "@utils/routes";
import colors from "@utils/colors";
import { IState } from "@constant/Types";
import { format } from "@utils/formatNumber";

const CreateAssetsBalance = memo(({ route }: any) => {
  const navigation = useNavigation();
  const user = useSelector((state: IState) => state.masterReducer.user);

  const [walletBalance, setWalletBalance] = React.useState<number>(0);
  const [walletTmpBalance, setWalletTmpBalance] = React.useState<string>("");
  const [goBack, setGoBack] = React.useState<string>("");
  const [visible, setVisible] = React.useState<boolean>(false);

  const { modalizeRef, open, close } = useModalize();

  React.useEffect(() => {
    if (route.params?.route) {
      setGoBack(route.params?.route);
    } else {
      setGoBack(ROUTES.CreateAssets);
    }
    modalizeRef.current?.open();
    setVisible(true);
  }, [route.params?.route]);

  const onDone = React.useCallback(
    (number: number) => {
      setVisible(false);
      const balance = { balance: number };
      navigation.navigate(goBack, balance);
    },
    [goBack]
  );

  const handleOpen = React.useCallback(() => {
    open();
    setVisible(true);
  }, []);

  const handleClose = React.useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <Container level="2">
      <TouchableWithoutFeedback onPress={handleOpen}>
        <Layout style={styles.input}>
          <Text category="title1" status="success" marginTop={16}>
            {visible ? walletTmpBalance : format(walletBalance)}
          </Text>
          <View style={styles.currencyView}>
            <Text category="subhead" marginTop={2}>
              {user.currency.currency}
            </Text>
          </View>
        </Layout>
      </TouchableWithoutFeedback>
      <ModalizeKeyboard
        ref={modalizeRef}
        onOverlayPress={handleClose}
        onTextChange={setWalletTmpBalance}
        onCalc={setWalletBalance}
        onDone={onDone}
      />
    </Container>
  );
});

export default CreateAssetsBalance;

const styles = StyleSheet.create({
  input: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.whisper,
    justifyContent: "center",
    alignItems: "center",
    height: 73,
    marginTop: 20,
  },
  currencyView: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: colors.grey5,
    paddingHorizontal: 8,
    paddingVertical: 2,
    position: "absolute",
    top: 12,
    left: 16,
  },
});

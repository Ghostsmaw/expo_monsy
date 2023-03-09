/* Redux saga class
 * logins the user into the app
 * requires username and password.
 * un - username
 * pwd - password
 */
import { put, takeEvery } from "redux-saga/effects";

import { Alert } from "react-native";
// @ts-ignore
import { disableLoader, enableLoader } from "@actions/loaderActions";
import { apiDeleteWallet, apiUpdateWallet } from "@api/index";
import {
  onDeleteWalletRequest,
  onDeleteWalletResponse,
  onUpdateWalletRequest,
  onUpdateWalletResponse,
} from "../actions/commonActions";
import * as types from "../actions/types";

function* walletUpdateAsync({
  payload,
}: ReturnType<typeof onUpdateWalletRequest>) {
  yield put(enableLoader());
  const response = yield apiUpdateWallet(payload);
  const { wallet } = response;
  if (wallet) {
    yield put(disableLoader());
    yield put(onUpdateWalletResponse(wallet));
  } else {
    yield put(disableLoader());
    setTimeout(() => {
      Alert.alert("FETCH UPDATE WALLET ERROR", response.message);
    }, 200);
  }
}
function* walletDeleteAsync({
  walletId,
}: ReturnType<typeof onDeleteWalletRequest>) {
  yield put(enableLoader());
  const response = yield apiDeleteWallet({ id: walletId });
  const { wallets } = response;
  if (wallets) {
    yield put(disableLoader());
    yield put(onDeleteWalletResponse(wallets));
  } else {
    yield put(disableLoader());
    setTimeout(() => {
      Alert.alert("FETCH DELETE WALLET ERROR", response.message);
    }, 200);
  }
}
export const walletsSaga = [
  takeEvery(types.UPDATEWALLET_REQUEST, walletUpdateAsync),
  takeEvery(types.DELETEWALLET_REQUEST, walletDeleteAsync),
];

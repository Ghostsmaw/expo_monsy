/* Redux saga class
 * logins the user into the app
 * requires username and password.
 * un - username
 * pwd - password
 */
import { put, call } from "redux-saga/effects";

import { Alert } from "react-native";
// @ts-ignore
import { disableLoader, enableLoader } from "@actions/loaderActions";
import { apiUpdateCurrency } from "@api/index";
import { onUpdateCurrencyResponse, onUpdateCurrencyRequest } from "../actions/currencyAction";

export default function* currencyAsync({currencyId} : ReturnType<typeof onUpdateCurrencyRequest>) {
  yield put(enableLoader());
  console.log("curencyId:", currencyId);
  const response = yield apiUpdateCurrency({ currencyId: currencyId });
  const { currency } = response;
  console.log('user:', currency);
  if (currency) {
    yield put(disableLoader());
    yield put(onUpdateCurrencyResponse(currency));
  } else {
    yield put(disableLoader());
    setTimeout(() => {
      Alert.alert("FETCH UPDATE CURRENCY ERROR", response.message);
    }, 200);
  }
}

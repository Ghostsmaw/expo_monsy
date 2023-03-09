/* Redux saga class
 * logins the user into the app
 * requires username and password.
 * un - username
 * pwd - password
 */
import { put, call } from 'redux-saga/effects';
// import { delay } from 'redux-saga';

import { Alert } from 'react-native';
// @ts-ignore
import { disableLoader, enableLoader } from '@actions/loaderActions';
// @ts-ignore
import { onDashboardResponse } from '@actions/dashboardActions';
import { apiGetDashboardInformation } from '@api/index';

// Our worker Saga that logins the user
export default function* dashboardAsync() {
  yield put(enableLoader());

  const response = yield call(apiGetDashboardInformation);

  const { wallets, transactions } = response;

  if (wallets && transactions) {
    yield put(onDashboardResponse(wallets, transactions));
    yield put(disableLoader())
  } else {
    yield put(disableLoader());
    setTimeout(() => {
      Alert.alert('FETCH DASHBOARD ERROR', response.message);
    }, 200);
  }
}

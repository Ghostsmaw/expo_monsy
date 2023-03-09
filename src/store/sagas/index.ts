/**
 *  Redux saga class init
 */
import { takeEvery, all } from 'redux-saga/effects';
import * as types from '../actions/types';
import dashboardSaga from './dashboardSaga';
import { transactionSaga } from './transactionSaga';
import currencySaga from './currencySaga';
import { walletsSaga } from './walletsSaga';
import { chartSaga } from './chartSaga';
export default function* watch() {
  yield all([
    takeEvery(types.DASHBOARD_REQUEST, dashboardSaga),
    takeEvery(types.UPDATECURRENCY_REQUEST, currencySaga),
    ...walletsSaga,
    ...transactionSaga,
    ...chartSaga
  ]);
}


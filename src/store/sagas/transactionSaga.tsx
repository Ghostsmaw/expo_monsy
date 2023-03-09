/* Redux saga class
 * logins the user into the app
 * requires username and password.
 * un - username
 * pwd - password
 */
import { put, takeEvery } from "redux-saga/effects";
import { Alert } from "react-native";
// @ts-ignore
import isEmpty from "lodash.isempty";
// @ts-ignore
import {
  apiDeleteTransaction,
  apiDeleteAllTransaction,
  apiGetTransactionWalletByDate,
  apiUpdateTransaction,
} from "@api/index";
import { ITransactionsState } from "@store/models/reducers/transactions";
import * as types from "../actions/types";
import { onFetchingLoadmore } from "@store/actions/commonActions";
import { disableLoader, enableLoader } from "@store/actions/loaderActions";
import {
  onTransactionResponse,
  onTransactionRequest,
  onUpdateTransactionRequest,
  onUpdateTransactionResponse,
  onDeleteTransactionResponse,
  onDeleteTransactionRequest,
  onDeleteAllTransactionRequest,
  onDeleteAllTransactionResponse,
} from "@store/actions/transactionAction";

/**
 * Get transactions data with paging
 * @param { paypload }
 */
function* transactionAsync({
  payload,
}: ReturnType<typeof onTransactionRequest>) {
  const { from, to, walletId } = payload;

  // Set tab is loading
  yield put(onFetchingLoadmore(payload));

  let body = {};
  if (walletId == -1) {
    body = { from, to };
  } else {
    body = { id: walletId, from, to };
  }
  const response = yield apiGetTransactionWalletByDate(body);
  const { wallet, total, transactions } = response;

  if (total && transactions) {
    const newPayload: ITransactionsState = {
      walletId: !isEmpty(wallet) ? wallet.id : -1,
      //fetching: false,
      //limit: limit,
      total: total.total || 0,
      //page: page,
      //currentPage: page,
      income: total.income || 0,
      expense: total.expense || 0,
      items: transactions,
    };
    yield put(onTransactionResponse(newPayload));
  } else {
    setTimeout(() => {
      Alert.alert("FETCH TRANSACTION ERROR", response.message);
    }, 200);
  }
}

function* updateTransactionAsync({
  payload,
}: ReturnType<typeof onUpdateTransactionRequest>) {
  yield put(enableLoader());
  const response = yield apiUpdateTransaction(payload);
  const { transaction, wallets, transactions } = response;
  if (transaction) {
    yield put(onUpdateTransactionResponse(transaction, wallets, transactions));
    yield put(disableLoader());
  } else {
    yield put(disableLoader());
    setTimeout(() => {
      Alert.alert("FETCH TRANSACTION ERROR", response.message);
    }, 200);
  }
}

function* deleteTransactionAsync({
  payload,
  balanceWallet,
}: ReturnType<typeof onDeleteTransactionRequest>) {
  yield put(enableLoader());
  const response = yield apiDeleteTransaction({
    id: payload.id,
    walletId: payload.walletId,
    type: payload.type,
    balance: payload.balance,
    balanceWallet,
  });
  const { code, wallets, transactions } = response;
  if (code) {
    yield put(onDeleteTransactionResponse(payload, wallets, transactions));
    yield put(disableLoader());
  } else {
    yield put(disableLoader());
    setTimeout(() => {
      Alert.alert("FETCH TRANSACTION ERROR", response.message);
    }, 200);
  }
}

function* deleteAllTransactionAsync({
  walletId,
}: ReturnType<typeof onDeleteAllTransactionRequest>) {
  yield put(enableLoader());
  const response = yield apiDeleteAllTransaction({
    walletId: walletId,
  });
  const { code, wallets, transactions } = response;
  if (code) {
    yield put(onDeleteAllTransactionResponse(wallets, transactions));
    yield put(disableLoader());
  } else {
    yield put(disableLoader());
    setTimeout(() => {
      Alert.alert("FETCH TRANSACTION ERROR", response.message);
    }, 200);
  }
}

export const transactionSaga = [
  takeEvery(types.TRANSACTION_REQUEST, transactionAsync),
  takeEvery(types.UPDATE_TRANSACTION_REQUEST, updateTransactionAsync),
  takeEvery(types.DELETE_TRANSACTION_REQUEST, deleteTransactionAsync),
  takeEvery(types.DELETE_ALL_TRANSACTION_REQUEST, deleteAllTransactionAsync),
];

/*
 * Reducer actions related
 */
import { TRANSACTION, WALLET } from '@store/models';
import { ITransactionRequestState, IUpdateTransactionRequest } from '@store/models/actions/transaction';
import { ITransactionsState } from '@store/models/reducers/transactions';
import * as types from './types';

//load transaction
export function onTransactionRequest(payload: ITransactionRequestState) {
  return {
    type: types.TRANSACTION_REQUEST,
    payload
  };
}

export function onTransactionResponse(payload: ITransactionsState) {
  return {
    type: types.TRANSACTION_RESPONSE,
    payload
  };
}

//update transaction
export function onUpdateTransactionRequest(payload: IUpdateTransactionRequest) {
  return {
    type: types.UPDATE_TRANSACTION_REQUEST,
    payload
  }
}
export function onUpdateTransactionResponse(transaction: TRANSACTION, wallets: Array<WALLET>, transactions: Array<TRANSACTION>) {
  return {
    type: types.UPDATE_TRANSACTION_RESPONSE,
    transaction,
    wallets,
    transactions
  }
}

//delete transaction
export function onDeleteTransactionRequest(payload: TRANSACTION, balanceWallet: number) {
  return {
    type: types.DELETE_TRANSACTION_REQUEST,
    payload,
    balanceWallet
  }
}
export function onDeleteTransactionResponse(transaction: TRANSACTION, wallets: Array<WALLET>, transactions: Array<TRANSACTION>) {
  return {
    type: types.DELETE_TRANSACTION_RESPONSE,
    transaction,
    wallets,
    transactions
  }
}

//delete all transaction
export function onDeleteAllTransactionRequest(walletId: number) {
  return {
    type: types.DELETE_ALL_TRANSACTION_REQUEST,
    walletId
  }
}
export function onDeleteAllTransactionResponse(wallets: Array<WALLET>, transactions: Array<TRANSACTION>) {
  return {
    type: types.DELETE_ALL_TRANSACTION_RESPONSE,
    wallets,
    transactions
  }
}
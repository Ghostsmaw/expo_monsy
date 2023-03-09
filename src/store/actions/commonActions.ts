import * as types from './types';
import { WALLET } from '../models/index';
import { IUpdateCurrencyRequest } from '@store/models/actions/currency';
import { IDeleteWalletResponse } from '@store/models/actions/wallet';
import { ITransactionRequestState } from '@store/models/actions/transaction';

export function onUpdateWalletRequest(payload: IUpdateCurrencyRequest) {
    return {
      type: types.UPDATEWALLET_REQUEST,
      payload
    };
}

export function onUpdateWalletResponse(payload: WALLET) {
    return {
      type: types.UPDATEWALLET_RESPONSE,
      payload,
    };
}

export function onDeleteWalletRequest(walletId: number) {
  return {
    type: types.DELETEWALLET_REQUEST,
    walletId
  };
}

export function onDeleteWalletResponse(payload: IDeleteWalletResponse) {
  return {
    type: types.DELETEWALLET_RESPONSE,
    payload,
  };
}

export function onAddWalletResponse(payload: WALLET) {
  return {
    type: types.ADD_WALLET_RESPONSE,
    payload,
  };
}

export function onFetchingLoadmore(payload: ITransactionRequestState) {
  return {
    type: types.SET_TRANSACTION_FETCHING,
    payload
  };
}


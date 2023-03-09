/*
 * Reducer actions related with login
 */
import { WALLET, TRANSACTION } from '../models';
import * as types from './types';

export function onDashboardRequest() {
  return {
    type: types.DASHBOARD_REQUEST,
  };
}

export function onDashboardResponse(wallets: Array<WALLET>, transactions: Array<TRANSACTION>) {
  return {
    type: types.DASHBOARD_RESPONSE,
    wallets,
    transactions 
  };
}

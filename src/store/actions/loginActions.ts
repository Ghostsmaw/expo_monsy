/*
 * Reducer actions related with login
 */
import * as types from './types';
import { USER, CATEGORY, CURRENCY, TYPE_WALLET } from '../models/index';

export function requestLogin(username: string, password: string) {
  return {
    type: types.LOGIN_REQUEST,
    username,
    password,
  };
}

export function loginFailed() {
  return {
    type: types.LOGIN_FAILED,
  };
}

export function onLoginResponse(user: USER, categories: Array<CATEGORY>, currencies: Array<CURRENCY>, typeWallets: Array<TYPE_WALLET>) {
  return {
    type: types.LOGIN_RESPONSE,
    user,
    categories,
    currencies,
    typeWallets
  };
}



export function logOut() {
  return {
    type: types.LOG_OUT,
  };
}

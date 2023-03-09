import * as types from './types';
import { CURRENCY, USER } from '../models/index';

export function onUpdateCurrencyRequest(currencyId: number) {
  return {
    type: types.UPDATECURRENCY_REQUEST,
    currencyId,
  };
}

export function onUpdateCurrencyResponse(currency: CURRENCY) {
  return {
    type: types.UPDATECURRENCY_RESPONSE,
    currency,
  };
}

export function onGetCurrencyResponse(currency: CURRENCY) {
  return {
    type: types.GET_CURRENCY_RESPONSE,
    currency,
  };
}


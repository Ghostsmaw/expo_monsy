/* Login Reducer
 * handles login states in the app
 */
import createReducer from '../../lib/createReducer';
import * as types from '../../store/actions/types';
import { IMasterState } from '../models/reducers/master';
import { ILoginResponseState } from '../models/actions/login';
import { IUpdateCurrencyResponse, IGetCurrencyResponse } from '@store/models/actions/currency';
const initialState: IMasterState = {
  typeWallets: [],
  categories: [],
  currencies: [],
  user: {
    id: 0,
    uid: '',
    uuid: '',
    currencyId: '',
    name: '',
    email: 'timi@email.com',
    avatar: '',
    pin: '10000mha',
    isDarkMode: false,
    currency: {
      id: 0,
      name: '',
      description: '',
      currency: '',
      code: '',
    }
  }
};

export const masterReducer = createReducer(initialState, {
  [types.LOGIN_RESPONSE](state: IMasterState, action: ILoginResponseState) {
    return {
      ...state,
      typeWallets: action.typeWallets,
      categories: action.categories,
      currencies: action.currencies,
      user: action.user,
    };
  },
  [types.GET_CURRENCY_RESPONSE](state: IMasterState, action: IGetCurrencyResponse) {
    return {
      ...state,
      user: {
        ...state.user,
        currency: action.currency
      }
    };
  },
  [types.UPDATECURRENCY_RESPONSE](state: IMasterState, action: IUpdateCurrencyResponse) {
    return {
      ...state,
      user: {
        ...state.user,
        currency: action.currency
      },
    };
  },
});

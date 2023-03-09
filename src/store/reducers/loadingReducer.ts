/**
 * Loading reducer made separate for easy blacklisting
 * Avoid data persist
 */
import createReducer from '../../lib/createReducer';
import * as types from '../../store/actions/types';
import { ILoading } from '../models/reducers/loading';

const initialState: ILoading = {
  isLoading: false,
};

export const loadingReducer = createReducer(initialState, {
  [types.ENABLE_LOADER](state: ILoading) {
    return { ...state, isLoading: true };
  },
  [types.DISABLE_LOADER](state: ILoading) {
    return { ...state, isLoading: false };
  },
});

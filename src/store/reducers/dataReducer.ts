/* Login Reducer
 * handles login states in the app
 */
import createReducer from "../../lib/createReducer";
import * as types from "../actions/types";
import { IDataState } from "../models/reducers/data";
import { ILoginResponseState } from "../models/actions/login";
import { IDashboardResponseState } from "@store/models/actions/dashboard";
import {
  ITransactionsState,
  ITransactionResponseState,
  ITransactionUpdateResponseState,
} from "@store/models/reducers/transactions";
import {
  IDeleteWalletResponse,
  IUpdateWalletResponse,
} from "@store/models/actions/wallet";
import { TRANSACTION, WALLET } from "@store/models";

const initialState: IDataState = {
  user: {
    id: 0,
    uid: "",
    uuid: "",
    name: "",
    avatar: "",
    email: "",
    currencyId: "",
    pin: "",
    isDarkMode: false,
    currency: {
      id: 0,
      name: "",
      description: "",
      currency: "",
      code: "",
    },
  },
  wallets: [],
  latestTransactions: [],
  transactions: [],
};

function updateTransactionInWallet(
  transactions: Array<ITransactionsState>,
  transaction: ITransactionsState
  // isReload: boolean
) {
  return transactions.map((item: ITransactionsState) => {
    if (item.walletId != transaction.walletId) {
      return item;
    }
    return {
      ...item,
      income: transaction.income,
      expense: transaction.expense,
      // total: transaction.total,
      // currentPage: transaction.currentPage,
      // fetching: false,
      // items: isReload
      //   ? [...transaction.items]
      //   : [...item.items, ...transaction.items],
      items: [...transaction.items],
    };
  });
}

function updateWallet(wallets: Array<WALLET>, wallet: WALLET) {
  let newWallets = [...wallets];
  let index = newWallets.findIndex((item) => item.id == wallet.id);
  newWallets[index] = {
    ...newWallets[index],
    balance: wallet.balance,
    name: wallet.name,
    typeWalletId: wallet.typeWalletId,
    typeWallet: wallet.typeWallet,
  };
  return newWallets;
}

function updateSingleTransaction(
  transactionList: Array<ITransactionsState>,
  transaction: TRANSACTION
) {
  return transactionList.map((transactions) => {
    if (transactions.walletId !== transactions.walletId) {
      return transactions;
    }
    let existingTransactionIndex = transactions.items.findIndex((element) => {
      if (element.id === transaction.id) {
        return true;
      }
      return false;
    });
    if (existingTransactionIndex >= 0) {
      transactions.items.splice(existingTransactionIndex, 1);
      transactions.items.splice(existingTransactionIndex, 0, transaction);
    }
    return transactions;
  });
}

function deleteSingleTransaction(
  transactionList: Array<ITransactionsState>,
  transaction: TRANSACTION
) {
  return transactionList.map((transactions) => {
    if (transactions.walletId !== transactions.walletId) {
      return transactions;
    }
    let existingTransactionIndex = transactions.items.findIndex((element) => {
      if (element.id === transaction.id) {
        return true;
      }
      return false;
    });
    if (existingTransactionIndex >= 0) {
      transactions.items.splice(existingTransactionIndex, 1);
    }
    return transactions;
  });
}

export const dataReducer = createReducer(initialState, {
  [types.LOGIN_RESPONSE](state: IDataState, action: ILoginResponseState) {
    return {
      ...state,
      user: action.user,
    };
  },
  [types.DASHBOARD_RESPONSE](
    state: IDataState,
    action: IDashboardResponseState
  ) {
    return {
      ...state,
      wallets: action.wallets,
      latestTransactions: action.transactions,
    };
  },
  [types.TRANSACTION_RESPONSE](
    state: IDataState,
    action: ITransactionResponseState
  ) {
    let transactions: Array<ITransactionsState> = [...[action.payload]];
    return {
      ...state,
      transactions,
    };
  },
  [types.UPDATEWALLET_RESPONSE](
    state: IDataState,
    action: IUpdateWalletResponse
  ) {
    let walletsReducer: Array<WALLET> = [...state.wallets];
    let wallets = updateWallet(walletsReducer, action.payload);

    return {
      ...state,
      wallets: wallets,
    };
  },
  [types.DELETEWALLET_RESPONSE](
    state: IDataState,
    action: IDeleteWalletResponse
  ) {
    return {
      ...state,
      wallets: action.payload,
    };
  },
  [types.SET_TRANSACTION_FETCHING](state: IDataState, action: any) {
    const { walletId, tabLabel } = action.payload;
    let transactions: Array<ITransactionsState> = state.transactions.map(
      (transaction: ITransactionsState) => {
        if (
          transaction.walletId != walletId ||
          transaction.tabLabel != tabLabel
        ) {
          return transaction;
        }
        return { ...transaction, fetching: true };
      }
    );
    return {
      ...state,
      transactions,
    };
  },
  [types.UPDATE_TRANSACTION_RESPONSE](
    state: IDataState,
    action: ITransactionUpdateResponseState
  ) {
    let transactionsUpdate = updateSingleTransaction(
      state.transactions,
      action.transaction
    );
    return {
      ...state,
      transactions: transactionsUpdate,
      wallets: action.wallets,
      latestTransactions: action.transactions,
    };
  },
  [types.DELETE_TRANSACTION_RESPONSE](
    state: IDataState,
    action: ITransactionUpdateResponseState
  ) {
    let transactionsUpdate = deleteSingleTransaction(
      state.transactions,
      action.transaction
    );
    return {
      ...state,
      transactions: transactionsUpdate,
      wallets: action.wallets,
      latestTransactions: action.transactions,
    };
  },
  [types.DELETE_ALL_TRANSACTION_RESPONSE](
    state: IDataState,
    action: ITransactionUpdateResponseState
  ) {
    return {
      ...state,
      wallets: action.wallets,
      latestTransactions: action.transactions,
    };
  },
  [types.ADD_WALLET_RESPONSE](
    state: IDataState,
    action: IUpdateWalletResponse
  ) {
    let walletsReducer: Array<WALLET> = [...state.wallets];
    walletsReducer.push(action.payload);
    return {
      ...state,
      wallets: walletsReducer,
    };
  },
});

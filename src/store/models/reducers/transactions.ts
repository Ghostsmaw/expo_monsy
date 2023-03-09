import { TRANSACTION, WALLET } from "../index";

export interface ITransactionsState {
  walletId: number; // If all wallet thi wallet la -1
  fetching?: boolean;
  limit?: number;
  total?: number;
  page?: number;
  currentPage?: number;
  income: number;
  expense: number;
  items: Array<TRANSACTION>;
}
export interface ITransactionResponseState {
  payload: ITransactionsState;
}
export interface ITransactionUpdateResponseState {
  transaction: TRANSACTION;
  wallets: Array<WALLET>;
  transactions: Array<TRANSACTION>;
}

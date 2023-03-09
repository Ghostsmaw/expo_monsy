// import { TRANSACTION, USER, WALLET } from "@models";

import { USER, WALLET, TRANSACTION } from "../index";
import { ITransactionsState } from "./transactions";

export interface IDataState {
  user: USER,
  wallets: Array<WALLET>,
  latestTransactions: Array<TRANSACTION>,
  transactions: Array<ITransactionsState>
}
import { TRANSACTION, WALLET } from "../index";

export interface IDashboardResponseState {
  wallets: Array<WALLET>;
  transactions: Array<TRANSACTION>;
}

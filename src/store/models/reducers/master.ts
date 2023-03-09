import { CATEGORYPARENT, CURRENCY, TYPE_WALLET,USER } from "../index";

export interface IMasterState {
  categories: Array<CATEGORYPARENT>,
  typeWallets: Array<TYPE_WALLET>,
  currencies: Array<CURRENCY>,
  user: USER,
}

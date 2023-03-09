import { CATEGORY, CURRENCY, TYPE_WALLET, USER } from "../index";

export interface ILoginRequestState {
  type: String;
  username: string;
  password: string;
}

export interface ILoginResponseState {
  user: USER;
  currencies: Array<CURRENCY>;
  typeWallets: Array<TYPE_WALLET>;
  categories: Array<CATEGORY>;
}

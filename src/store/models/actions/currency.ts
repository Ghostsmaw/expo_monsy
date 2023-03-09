import { CURRENCY, USER } from "../index";

export interface IUpdateCurrencyResponse {
    currency: CURRENCY
}
export interface IGetCurrencyResponse {
    currency: CURRENCY
}
export interface IUpdateCurrencyRequest {
    id: number,
    name: string,
    balance: number,
    typeWalletId: number
}

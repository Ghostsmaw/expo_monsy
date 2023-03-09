import { WALLET } from "../index";

export interface IUpdateWalletResponse {
    payload: WALLET
}


export interface IDeleteWalletResponse {
   payload: Array<WALLET>;
}

import React from "react";
import SvgCash from "@svg/WalletIcon/SvgCash";
import SvgCreditCard from "@svg/WalletIcon/SvgCreditCard";
import SvgDebitCard from "@svg/WalletIcon/SvgDebitCard";
import SvgBankAccount from "@svg/WalletIcon/SvgBankAccount";
import SvgEWallet from "@svg/WalletIcon/SvgEWallet";
import colors from "@utils/colors";

export const WALLET_ICON: any = {
  cash: <SvgCash color={colors.white} />,
  creditCard: <SvgCreditCard color={colors.white} />,
  debitCard: <SvgDebitCard color={colors.white} />,
  bankAccount: <SvgBankAccount color={colors.white} />,
  eWallet: <SvgEWallet color={colors.white} />,
};

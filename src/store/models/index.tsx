import { MomentInput } from "moment";

// Interface DB
export interface USER {
  id: number;
  uid: string;
  uuid: string;
  currencyId: string;
  name: string;
  email: string;
  avatar: string;
  pin: string;
  isDarkMode: boolean;
  currency: CURRENCY;
}

export interface WALLET {
  id: number;
  userId: string;
  name: string;
  typeWalletId: number;
  balance: number;
  typeWallet: TYPE_WALLET;
}

export interface TYPE_WALLET {
  id: number;
  name: string;
  icon: string;
}

export interface TRANSACTION {
  id: number;
  userId: string;
  walletId: number;
  categoryId: number;
  balance: number;
  date: string;
  type: string;
  note: string;
  category: CATEGORY;
}

export interface CATEGORY {
  id: number;
  parentId: number;
  name: string;
  icon: string;
  type: string;
}
export interface CATEGORYPARENT {
  id: number;
  parentId: number;
  name: string;
  icon: string;
  type: string;
  children: Array<CATEGORY>;
}

export interface CURRENCY {
  id: number;
  name: string;
  description: string;
  currency: string;
  code: string;
}
export interface TOTAL {
  total: number;
  income: number;
  expense: number;
}

export interface CHART {
  [x: string]: MomentInput;
  date: string;
  totalIncome: number;
  totalExpense: number;
}
interface Category {
  id: number;
  icon: string;
  name: string;
  parentId: number;
  type: string;
}

export interface CIRCLE_CHART {
  category: Category;
  totalIncome: number;
  totalExpense: number;
}

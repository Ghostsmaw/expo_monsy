import { Currency } from "@screens/Currency";
import { ImageRequireSource, ViewStyle } from "react-native";
import { IDataState } from "@store/models/reducers/data";
import { ILoading } from "@store/models/reducers/loading";
import { IMasterState } from "@store/models/reducers/master";
import dayjs from "@utils/dayjs";

export interface ButtonType {
  title: string;
  onPress: () => void;
}

export interface ModalScreenType {
  image?: ImageRequireSource;
  title?: string;
  description?: string;
  children?: ButtonType[] | null;
  buttonsViewStyle?: ViewStyle;
}

export interface IState {
  loadingReducer: ILoading;
  masterReducer: IMasterState;
  dataReducer: IDataState;
}

export interface CategoriesFragment {
  id?: string;
  parentId?: string;
  name?: string;
  icon?: string;
  type?: Category_Types_Enum;
  createAt?: Date | undefined;
  updateAt?: Date | undefined;
  children?: CategoryFragment[];
}

export interface CategoryFragment {
  id?: string;
  parentId?: string;
  name?: string;
  icon?: string;
  type?: Category_Types_Enum;
  createAt?: Date | undefined;
  updateAt?: Date | undefined;
}

export interface TransactionFragment {
  title?: string;
  id?: string | number;
  userUuid?: string;
  walletId?: string;
  categoryId?: string;
  balance?: string | number;
  date?: Date | undefined;
  note?: string;
  type?: Category_Types_Enum;
  createAt?: Date | undefined;
  updateAt?: Date | undefined;
  category?: CategoryFragment;
}
export interface TransactionProps {
  title?: string;
  content?: TransactionFragment[];
}
export interface CurrencyFragment {
  id?: number;
  name?: string;
  description?: string;
  currency?: string;
  code?: string;
}
export interface SettingFragment {
  title?: string;
  icon?: string;
  currency?: string;
  isToggle?: boolean;
  checked?: boolean;
  last?: boolean;
  onChange?(): void;
  onPress?(): void;
}

export type FilterDate = {
  from: dayjs.Dayjs;
  to: dayjs.Dayjs;
};

export type ExpensesStat = {
  totalExpenses: number;
  totalIncome: number;
};

export enum Format_Types_Enum {
  Limit = "limit",
  Saving = "saving",
  Inky = "inky",
  Default = "default",
  Secure = "secure",
}

export enum Category_Types_Enum {
  Income = "income",
  Expense = "expense",
  Transfer = "transfer",
}

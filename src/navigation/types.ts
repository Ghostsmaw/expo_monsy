import { ModalScreenType } from "@constant/Types";
import { NavigatorScreenParams, RouteProp } from "@react-navigation/native";

export type RootStackParamList = {
  Onboard: IntroStackParamList;
  Main: NavigatorScreenParams<MainStackParamList>;
  CreateAssets: NavigatorScreenParams<CreateAssetsStackParamList>;
  Transaction: NavigatorScreenParams<TransactionStackParamList>;
  Chart: NavigatorScreenParams<ChartStackParamList>;
  Profile: NavigatorScreenParams<ProfileStackParamList>;
  ModalScreen: { modalScreen: ModalScreenType };
  NotFound: undefined;
};

export type IntroStackParamList = {
  Onboard: undefined;
};

export type MainStackParamList = {
  Dashboard: undefined;
  Chart: undefined;
  Profile: undefined;
};

export type CreateAssetsStackParamList = {
  CreateAssets: undefined;
  CreateAssetsName: undefined;
  CreateAssetsBalance: undefined;
  CreateAssetsType: undefined;
};

export type TransactionStackParamList = {
  Transaction: undefined;
  TransactionSelectWallet: undefined;
  CreateTransaction: undefined;
  CreateTransactionWallet: undefined;
  CreateTransactionCategory: undefined;
  CreateTransactionNote: undefined;
};

export type ChartStackParamList = {
  ChartAnalysis: undefined;
  ChartTransaction: undefined;
};

export type ProfileStackParamList = {
  Currency: undefined;
  Wallets: undefined;
  WalletsEdit: undefined;
};

export type ModalScreenNavigationProp = RouteProp<
  RootStackParamList,
  "ModalScreen"
>;

export type CreateAssetsNavigationProps = RouteProp<
  CreateAssetsStackParamList,
  "CreateAssets"
>;

export type CreateAssetsNameNavigationProps = RouteProp<
  CreateAssetsStackParamList,
  "CreateAssetsName"
>;

export type CreateAssetsBalanceNavigationProps = RouteProp<
  CreateAssetsStackParamList,
  "CreateAssetsBalance"
>;

export type CreateAssetsTypeNavigationProps = RouteProp<
  CreateAssetsStackParamList,
  "CreateAssetsType"
>;

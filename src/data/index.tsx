import colors from "@utils/colors";

export const GET_PREMIUM = [
  {
    icon: "cloud",
    title: "Backup & sync",
    description: "Send monthly statement to your email",
  },
  {
    icon: "ad",
    title: "Remove ads",
    description: "Remove all ads on the application",
  },
  {
    icon: "wallet",
    title: "Unlimited wallets",
    description: "Unlimited wallet creation manage",
  },
];

export const LOGIN_DATA = [
  {
    image: require("@assets/Login/Monsy.png"),
    title: "Welcome to Kollo",
    description:
      "Kollo is a simple and smart free mobile application that helps you manage your daily cash flow.",
  },
  {
    image: require("@assets/Login/onboarding1.png"),
    title: "Smart Wallet Management",
    description:
      "Allows you to create multiple wallets, transfer money between wallets",
  },
  {
    image: require("@assets/Login/onboarding2.png"),
    title: "Quickly Create Transaction",
    description: "Create and manage the transactions quickly",
  },
  {
    image: require("@assets/Login/onboarding3.png"),
    title: "Gain Control Of Spending",
    description:
      "You’ll be able to track and gain control of your spending easily with charts",
  },
];

// TODO: Will be removed (get from api)
export const FREQUENCY = [
  {
    id: 0,
    title: "Weekly",
  },
  {
    id: 1,
    title: "Monthly",
  },
  {
    id: 2,
    title: "Yearly",
  },
];

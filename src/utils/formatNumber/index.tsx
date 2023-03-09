import { CURRENCY } from "@store/models";

export const currencyFormat = (amount: any, currency: CURRENCY) => {
  let currencyCode = "$";
  if (currency && currency.code) {
    currencyCode = currency.code;
  } else if (currency && currency.currency) {
    currencyCode = currency.currency;
  }

  const formatedAmount = amount
    .toFixed(2)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

  return `${currencyCode}${formatedAmount}`;
};

export const numberFormat = (amount: any) => {
  return amount.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export const format = (amount: number) => {
  return Number(amount)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");
};

export const truncateString = (input: any, number: number) => {
  return input.length > number ? `${input.substring(0, number)}...` : input;
};

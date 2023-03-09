/**
 * Loading reducer made separate for easy blacklisting
 * Avoid data persist
 */
import { IChartStateResponse } from "@store/models/actions/chart";
import { ChartInMonth, IChartData } from "@store/models/reducers/chart";
import * as types from "../actions/types";
import createReducer from "../../lib/createReducer";

const initialState: IChartData = {
  chartData: [],
};

export const chartReducer = createReducer(initialState, {
  [types.CHART_ALL_WALLET_BY_MONTH_RESPONSE](
    state: IChartData,
    action: IChartStateResponse
  ) {
    let currentChartData: Array<ChartInMonth> = [...state.chartData];

    let existingChartElement = currentChartData.find((element) => {
      return (
        element.walletId === action.payload.walletId &&
        element.year === action.payload.year &&
        element.month === action.payload.month
      );
    });

    // Add new
    if (!existingChartElement) {
      return {
        ...state,
        chartData: [...currentChartData, action.payload],
      };
    }

    // Update
    const updatedChartData = currentChartData.map((element) => {
      if (
        element.walletId === action.payload.walletId &&
        element.year === action.payload.year &&
        element.month === action.payload.month
      ) {
        return action.payload;
      }
      return element;
    });
    return { ...state, chartData: updatedChartData };
  },
  [types.CHART_ALL_WALLET_BY_YEAR_RESPONSE](
    state: IChartData,
    action: IChartStateResponse
  ) {
    let currentChartData: Array<ChartInMonth> = [...state.chartData];
    let existingChartElement = currentChartData.find((element) => {
      return (
        element.walletId === action.payload.walletId &&
        element.year === action.payload.year
      );
    });

    // Add new
    if (!existingChartElement) {
      return {
        ...state,
        chartData: [...currentChartData, action.payload],
      };
    }

    // Update
    const updatedChartData = currentChartData.map((element) => {
      if (
        element.walletId === action.payload.walletId &&
        element.year === action.payload.year
      ) {
        return action.payload;
      }
      return element;
    });
    return { ...state, chartData: updatedChartData };
  },
});

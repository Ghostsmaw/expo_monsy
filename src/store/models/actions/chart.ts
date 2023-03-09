import {
  ChartInMonth,
  DetailChartInMonth,
} from "@store/models/reducers/chart";

export interface IChartStateRequest {
  walletId: number,
  year: string,
  month?: string,
}

export interface IChartStateResponse {
  payload: ChartInMonth
}

export interface IDetailChartStateResponse {
  payload: DetailChartInMonth
}

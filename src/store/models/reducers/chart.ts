import { CHART, CIRCLE_CHART } from "@store/models";

export interface ChartInMonth {
  month?: string;
  year?: string;
  walletId: number;
  dailyChartData: Array<CHART>;
  categoryChartData: Array<CIRCLE_CHART>;
}

export interface IChartData {
  chartData: Array<ChartInMonth>;
}

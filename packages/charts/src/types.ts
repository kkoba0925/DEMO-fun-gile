/**
 * Chart configuration types
 */

export interface ChartJsConfig {
  type: string;
  data: ChartData;
  options: ChartOptions;
}

export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

export interface ChartDataset {
  label: string;
  data: number[];
  borderColor?: string;
  backgroundColor?: string;
  borderWidth?: number;
  fill?: boolean;
  tension?: number;
}

export interface ChartOptions {
  responsive?: boolean;
  plugins?: {
    title?: {
      display: boolean;
      text: string;
    };
    legend?: {
      display: boolean;
    };
  };
  scales?: {
    x?: {
      title?: {
        display: boolean;
        text: string;
      };
    };
    y?: {
      title?: {
        display: boolean;
        text: string;
      };
      beginAtZero?: boolean;
    };
  };
}

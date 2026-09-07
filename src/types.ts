export type SeriesItem = {
  id: number;
  basket: string;
  country_code: string;
  country_name: string;
  frequency: string;
  series_type: string;
  [key: string]: unknown;
};

export type Observation = {
  date: string;
  value: string;
};

export type SeriesDetail = {
  series: SeriesItem;
  data: Observation[];
};

export type ChartDataPoint = {
  date: string;
  [seriesKey: string]: number | string;
};

export type MultiSelectOption = {
  label: string;
  value: string;
};

export type ApiContextType = {
  seriesItems: SeriesItem[];
  isLoading: boolean;
}
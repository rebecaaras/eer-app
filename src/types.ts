export type SeriesItem = {
  basket: string;
  country_code: string;
  country_name: string;
  frequency: string;
  series_type: string;
  [key: string]: unknown;
};

export type MultiSelectOption = {
  label: string;
  value: string;
};

type Filters = {
    referenceAreas: string[],
    seriesType: string,
    basket: string,
    startDate: Date | null,
    endDate: Date | null,
}

export type ApiContextType = {
  seriesItems: SeriesItem[];
  filteredSeriesItems: SeriesItem[];
  setFilteredSeriesItems: (value: React.SetStateAction<SeriesItem[]>) => void;
  filters: Filters;
  setFilters: (value: React.SetStateAction<Filters>) => void;
  isLoading: boolean;
}
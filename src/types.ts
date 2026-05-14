export type Series = {
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
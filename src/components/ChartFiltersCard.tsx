import { Card, CardDescription, CardFooter, CardHeader, CardTitle,} from "../components/ui/card"
import {
  Field,
  FieldLabel,
} from "./ui/field"
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "./MultiSelect"
import { ComboBox } from "./ComboBox"
import DatePicker from "./DatePicker"
import { useContext, useMemo, useState } from "react"
import { ApiContext } from "../context/apiContext"
import { Button } from "./ui/button"
import { getSeriesById } from "../lib/api"
import type { ChartDataPoint } from "../types"

type ChartFiltersCardProps = {
  onFilterChange: (data: ChartDataPoint[], seriesKeys: string[]) => void;
};

export default function ChartFiltersCard({ onFilterChange }: ChartFiltersCardProps) {
  const {seriesItems} = useContext(ApiContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [filters, setFilters] = useState({
    referenceAreas: [] as string[],
    seriesType: "",
    basket: "",
    startDate: null as Date | null,
    endDate: null as Date | null,
  });

  // this function might need some refactoring!
  // what does useMemo do ?
  let refAreaOptions = useMemo(() =>
    seriesItems
      .map((item) => ({
        label: item.country_name, 
        value: item.country_name,
      }))
      .filter(
        (item, value, self) => 
          value === self.findIndex((t) => t.value === item.value)
      ),
    [seriesItems]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const matchedSeries = seriesItems
      .filter(
        (item) =>
          filters.referenceAreas.includes(item.country_name) &&
          item.series_type === filters.seriesType &&
          item.basket === filters.basket
      )
      .filter(
        (item, index, self) =>
          index === self.findIndex((t) => t.country_name === item.country_name)
      );

    setIsSubmitting(true);
    try {
      const results = await Promise.all(
        matchedSeries.map((series) => getSeriesById(series.id))
      );

      const pointsByDate = new Map<string, ChartDataPoint>();

      results.forEach(({ series, data }) => {
        data.forEach(({ date, value }) => {
          if (filters.startDate && new Date(date) < filters.startDate) return;
          if (filters.endDate && new Date(date) > filters.endDate) return;

          const point = pointsByDate.get(date) ?? { date };
          point[series.country_name] = Number(value);
          pointsByDate.set(date, point);
        });
      });

      const chartData = Array.from(pointsByDate.values()).sort((a, b) =>
        a.date.localeCompare(b.date)
      );

      onFilterChange(chartData, matchedSeries.map((series) => series.country_name));
    } catch (error) {
      console.error("Failed to load series data", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="w-full max-w-[20%] h-full mr-5 max-h-[600px]">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>
            Choose which series to display
          </CardDescription>
        </CardHeader>

        <CardFooter className="flex-col gap-2">
          <Field className="max-w-sm">
            <FieldLabel htmlFor="inline-start-input">
              Reference Area
            </FieldLabel>
            <MultiSelect onValuesChange={
              (values) => {
                setFilters((prev) => ({
                  ...prev,
                  referenceAreas: values,
                }))
              }
            }>
              <MultiSelectTrigger className="w-full max-w-[400px]">
                <MultiSelectValue/>
              </MultiSelectTrigger>
              <MultiSelectContent search={{placeholder: "Select areas..."}}>
                <MultiSelectGroup>
                  {refAreaOptions.map((option) => (
                    <MultiSelectItem
                      key={option.label}
                      value={option.value}
                      className="capitalize"
                    >
                      {option.label}
                    </MultiSelectItem>
                  ))}
                </MultiSelectGroup>
              </MultiSelectContent>
            </MultiSelect>
          </Field>

          <Field className="max-w-sm mb-2">
            <FieldLabel htmlFor="inline-start-input">
              Series Type
            </FieldLabel>
            <ComboBox 
              options={["nominal", "real"]}
              placeholder="Select type..."
              onChange={
                (value) => {
                  setFilters((prev)=> ({
                    ...prev,
                    seriesType: value
                  }))
                }}
            />
          </Field>

          <Field className="max-w-sm mb-2">
            <FieldLabel htmlFor="inline-start-input">
              Basket
            </FieldLabel>
            <ComboBox 
              options={["broad", "narrow"]} 
              placeholder="Select basket..."
              onChange={
                (value) => {
                  setFilters((prev)=> ({
                    ...prev,
                    basket: value
                  }))
                }}
            />
          </Field>

          <Field className="max-w-sm mb-2">
              <FieldLabel htmlFor="inline-start-input">
                Start Date
              </FieldLabel>
               <DatePicker
                onChange={
                  (value) => {
                    setFilters((prev)=> ({
                      ...prev,
                      startDate: value
                    }))
                  }}
              />
          </Field>

          <Field className="max-w-sm mb-2">
              <FieldLabel htmlFor="inline-start-input">
                End Date
              </FieldLabel>
              <DatePicker
                onChange={
                  (value) => {
                    setFilters((prev)=> ({
                      ...prev,
                      endDate: value
                    }))
                  }}
              />
          </Field>

          <Button
            type="submit"
            className="w-full border-grey"
            variant="secondary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Loading..." : "Show series"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

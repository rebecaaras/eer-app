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

export default function ChartFiltersCard() {
  const {seriesData} = useContext(ApiContext);

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
    seriesData
      .map((item) => ({
        label: item.country_name, 
        value: item.country_name,
      }))
      .filter(
        (item, value, self) => 
          value === self.findIndex((t) => t.value === item.value)
      ),
    [seriesData]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      referenceAreas: filters.referenceAreas,
      seriesType: filters.seriesType,
      basket: filters.basket,
      startDate: filters.startDate?.toISOString(),
      endDate: filters.endDate?.toISOString(),
    };

    console.log(payload);
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
                <MultiSelectValue placeholder="Select areas..." />
              </MultiSelectTrigger>
              <MultiSelectContent>
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
              options={["Nominal", "Real"]} 
              placeholder="Select type..."
            />
          </Field>

          <Field className="max-w-sm mb-2">
            <FieldLabel htmlFor="inline-start-input">
              Basket
            </FieldLabel>
            <ComboBox 
              options={["Broad", "Narrow"]} 
              placeholder="Select basket..."
            />
          </Field>

          <Field className="max-w-sm mb-2">
              <FieldLabel htmlFor="inline-start-input">
                Start Date
              </FieldLabel>
              <DatePicker/>
          </Field>

          <Field className="max-w-sm mb-2">
              <FieldLabel htmlFor="inline-start-input">
                End Date
              </FieldLabel>
              <DatePicker/>
          </Field>

          <Button 
            type="submit" 
            className="w-full border-grey" 
            variant="secondary"
          >
            Show series
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

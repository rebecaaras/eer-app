import { Card, CardDescription, CardFooter, CardHeader, CardTitle,} from "../components/ui/card"
import {
  Field,
  FieldLabel,
} from "./ui/field"
import MultiSelect from "./ui/multi-select"
import { ComboBox } from "./ComboBox"
import DatePicker from "./DatePicker"
import { useContext } from "react"
import { ApiContext } from "../context/apiContext"
import { Button } from "./ui/button"

export default function ChartFiltersCard() {
  const {seriesData} = useContext(ApiContext);

  // this function might need some refactoring!
  let refAreaOptions = seriesData.map((item) => (
    {label: item.country_name, value: item.country_name}
  )).filter((item, value, self) => value === self.findIndex((t) => t.value === item.value));

  return (
    <Card className="w-full max-w-[20%] h-full mr-5 max-h-[600px]">
      <CardHeader>
        <CardTitle>Filters</CardTitle>
        <CardDescription>
          Choose which series to display
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex-col gap-2">
        <Field className="max-w-sm">
          <FieldLabel htmlFor="inline-start-input">Reference Area</FieldLabel>
          <MultiSelect options = {refAreaOptions} placeholder="Select area..."/>
        </Field>
        <Field className="max-w-sm mb-2">
          <FieldLabel htmlFor="inline-start-input">Series Type</FieldLabel>
          <ComboBox options={["Nominal", "Real"]} placeholder="Select type..."/>
        </Field>
        <Field className="max-w-sm mb-2">
          <FieldLabel htmlFor="inline-start-input">Basket</FieldLabel>
          <ComboBox options={["Broad", "Narrow"]} placeholder="Select basket..."/>
        </Field>
        <Field className="max-w-sm mb-2">
            <FieldLabel htmlFor="inline-start-input">Start Date</FieldLabel>
            <DatePicker/>
        </Field>
        <Field className="max-w-sm mb-2">
            <FieldLabel htmlFor="inline-start-input">End Date</FieldLabel>
            <DatePicker/>
        </Field>
        <Button type="submit" className="w-full border-grey" variant="secondary">Show series</Button>
      </CardFooter>
    </Card>
  )
}

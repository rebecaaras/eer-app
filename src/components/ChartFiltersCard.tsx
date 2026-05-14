import { Card, CardDescription, CardFooter, CardHeader, CardTitle,} from "../components/ui/card"
import {
  Field,
  FieldLabel,
} from "./ui/field"
import MultiSelect from "./ui/multi-select"
import { ComboBox } from "./ComboBox"
import DatePicker from "./DatePicker"

const refAreaOptions = [
  {label: "United States",value: "united states"},
  {label: "Brazil",value: "brazil"},
  {label: "Canada",value: "canada"},
  {label: "Switzerland",value: "switzerland"},
]

export default function ChartFiltersCard() {
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
          <ComboBox options={["Nominal", "Real"]}/>
        </Field>
        <Field className="max-w-sm mb-2">
          <FieldLabel htmlFor="inline-start-input">Basket</FieldLabel>
          <ComboBox options={["Broad", "Narrow"]}/>
        </Field>
        <Field className="max-w-sm mb-2">
            <FieldLabel htmlFor="inline-start-input">Start Date</FieldLabel>
            <DatePicker/>
        </Field>
        <Field className="max-w-sm mb-2">
            <FieldLabel htmlFor="inline-start-input">End Date</FieldLabel>
            <DatePicker/>
        </Field>
      </CardFooter>
    </Card>
  )
}

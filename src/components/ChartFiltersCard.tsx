import { Card, CardDescription, CardFooter, CardHeader, CardTitle,} from "../components/ui/card"
import {
  Field,
  FieldLabel,
} from "../components/ui/field"
import MultiSelect from "./ui/multi-select"


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
        <MultiSelect/>
      </Field>
      </CardFooter>
    </Card>
  )
}

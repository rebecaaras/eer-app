import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../components/ui/chart"
import {
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts"

// should get from api
const chartData = [
  { month: "Jan", USD: 5.12, EUR: 5.48, GBP: 6.31 },
  { month: "Feb", USD: 5.08, EUR: 5.42, GBP: 6.28 },
  { month: "Mar", USD: 5.01, EUR: 5.39, GBP: 6.18 },
  { month: "Apr", USD: 4.95, EUR: 5.33, GBP: 6.11 },
  { month: "May", USD: 5.03, EUR: 5.45, GBP: 6.22 },
  { month: "Jun", USD: 5.15, EUR: 5.51, GBP: 6.37 },
]

const chartConfig = {
  USD: {
    label: "USD/BRL",
    color: "hsl(var(--chart-1))",
  },
  EUR: {
    label: "EUR/BRL",
    color: "hsl(var(--chart-2))",
  },
  GBP: {
    label: "GBP/BRL",
    color: "hsl(var(--chart-3))",
  },
}

export function ExchangeRateChart() {
  return (
    <Card className="border-none shadow-sm w-full max-h-[600px]">
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          Exchange Rate Trends
        </CardTitle>

        <CardDescription>
          Historical currency performance over time
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="max-h-[500px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />

              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                domain={["dataMin", "dataMax"]}
              />

              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent />}
              />

              {/* TODO: automatically set line colors */}
              <Line
                type="monotone"
                stroke="var(--chart-1)"
                dataKey="USD"
                strokeWidth={3}
                dot={false}
              />

              <Line
                type="monotone"
                stroke="var(--chart-2)"
                dataKey="EUR"
                strokeWidth={3}
                dot={false}
              />

              <Line
                type="monotone"
                stroke="var(--chart-3)"
                dataKey="GBP"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
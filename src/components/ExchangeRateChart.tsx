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
import type { ChartDataPoint } from "../types"

const CHART_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
]

type ExchangeRateChartProps = {
  data: ChartDataPoint[];
  seriesKeys: string[];
};

export function ExchangeRateChart({ data, seriesKeys }: ExchangeRateChartProps) {
  const chartConfig = Object.fromEntries(
    seriesKeys.map((key, index) => [
      key,
      { label: key, color: CHART_COLORS[index % CHART_COLORS.length] },
    ])
  )

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
        {data.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            Choose filters and click "Show series" to display data.
          </p>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="max-h-[500px] w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />

                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                />

                <YAxis
                  tickLine={false}
                  axisLine={false}
                  domain={["0", "dataMax"]}
                />

                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />

                {seriesKeys.map((key, index) => (
                  <Line
                    key={key}
                    type="monotone"
                    stroke={CHART_COLORS[index % CHART_COLORS.length]}
                    dataKey={key}
                    strokeWidth={3}
                    dot={false}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
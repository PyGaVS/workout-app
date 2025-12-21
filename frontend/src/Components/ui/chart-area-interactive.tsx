"use client"
import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/Components/ui/chart"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select"

export type ChartDataType = {
    date: string,
    total: number
}

const chartConfig = {
    total: {
        label: "Séances",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

type ChartAreaInteractiveProps = {
    data: ChartDataType[]
}

export function ChartAreaInteractive({ data }: ChartAreaInteractiveProps) {
    const [timeRange, setTimeRange] = React.useState("12m")

    const filteredData = data.filter((item) => {
        const date = new Date(item.date)
        const now = new Date()
        let monthsToSubtract = 12

        if (timeRange === "6m") {
            monthsToSubtract = 6
        }

        const startDate = new Date(now)
        startDate.setMonth(startDate.getMonth() - monthsToSubtract)

        return date >= startDate
    })

    return (
        <Card className="pt-0 !border-none shadow-none">
            <CardHeader className="flex items-center gap-2 space-y-0 border-b !border-gray-300 py-5 sm:flex-row">
                <div className="grid flex-1 gap-1">
                    <CardTitle>Évolution des séances</CardTitle>
                    <CardDescription>
                        Nombre de séances sur les derniers mois
                    </CardDescription>
                </div>
                <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger
                        className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex !border-gray-300 focus:outline-none"
                        aria-label="Select a value"
                    >
                        <SelectValue placeholder="12 derniers mois" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="12m" className="rounded-lg">
                            12 derniers mois
                        </SelectItem>
                        <SelectItem value="6m" className="rounded-lg">
                            6 derniers mois
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <AreaChart data={filteredData}>
                        <defs>
                            <linearGradient id="fillTotal" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="rgb(0, 40, 200)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="rgba(0, 60, 220)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleDateString("fr-FR", {
                                    month: "2-digit",
                                    year: "numeric",
                                })
                            }}
                        />
                        <ChartTooltip
                            cursor={true}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("fr-FR", {
                                            month: "long",
                                            year: "numeric",
                                        })
                                    }}
                                    indicator="dot"
                                />
                            }
                        />
                        <Area
                            dataKey="total"
                            type="natural"
                            fill="url(#fillTotal)"
                            stroke="rgb(40, 120, 255)"
                            strokeWidth={1}
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
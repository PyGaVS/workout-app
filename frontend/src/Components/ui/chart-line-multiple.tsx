"use client"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
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
import StatsService from "@/api/services/StatsService.ts";

type ChartLineMultipleProps = {
    data: Array<{
        week: string
        [muscleName: string]: number | string
    }>
}

export function ChartLineMultiple({ data }: ChartLineMultipleProps) {
    // Extraire les noms des muscles depuis les clés du premier objet
    const muscleNames = data.length > 0
        ? Object.keys(data[0]).filter(key => key !== 'week')
        : []

    // Générer la config des couleurs pour chaque muscle
    const chartConfig = muscleNames.reduce((config, muscleName, index) => {
        config[muscleName] = {
            label: muscleName,
            color: StatsService.getRandomLineChartColor(1, index)
        }
        return config
    }, {} as ChartConfig)

    return (
        <Card className="w-full border-(--stats-border) shadow-none">
            <CardHeader className="pb-2">
                <CardTitle>Évolution par muscle</CardTitle>
                <CardDescription>20 dernières semaines</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
                <ChartContainer config={chartConfig} className="h-[200px] w-full">
                    <LineChart
                        accessibilityLayer
                        data={data}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="week"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(-2)}
                            tick={{ style: { fill: "var(--text)" } }}
                            height={30}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            width={30}
                            tick={{ style: { fill: "var(--text)" } }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent
                                className="bg-white border-1 border-gray-300"/>}
                        />

                        {/* Générer une Line pour chaque muscle */}
                        {muscleNames.map((muscleName) => (
                            <Line
                                key={muscleName}
                                dataKey={muscleName}
                                type="monotone"
                                stroke={chartConfig[muscleName].color}
                                strokeWidth={1}
                                dot={false}
                            />
                        ))}
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
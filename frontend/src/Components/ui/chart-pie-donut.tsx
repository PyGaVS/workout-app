"use client"
import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/Components/ui/chart"

export type ChartPieDonutDataType = {
    item: string,
    total: number,
    fill: string
}

type ChartPieDonutProps = {
    data: ChartPieDonutDataType[]
    title?: string
    description?: string
}

export function ChartPieDonut({ data, title, description }: ChartPieDonutProps) {
    // Générer dynamiquement le chartConfig basé sur les données
    const chartConfig = data.reduce((config, item, index) => {
        config[`item${index}`] = {
            label: item.item,
            color: item.fill,
        }
        return config
    }, {} as ChartConfig)

    const topExercise = data.length > 0 ? data[0] : null

    return (
        <Card className="flex flex-col border-none shadow-none">
            <CardHeader className="items-center pb-0">
                <CardTitle>{title || "Répartition des exercices"}</CardTitle>
                <CardDescription>
                    {description || "Pourcentage d'utilisation par exercice"}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[300px] w-full"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent className="bg-white"
                                    hideLabel
                                    formatter={(value, name) => (
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold">{name}:</span>
                                            <span>{Number(value).toFixed(2)}%</span>
                                        </div>
                                    )}
                                />
                            }
                        />
                        <Pie
                            data={data}
                            dataKey="total"
                            nameKey="item"
                            innerRadius={70}
                            animationBegin={0}
                            animationDuration={800}
                            animationEasing="ease-in-out"
                            labelLine={false}
                            label={({ payload, ...props }) => {
                                return (
                                    <text
                                        cx={props.cx}
                                        cy={props.cy}
                                        x={props.x}
                                        y={props.y}
                                        textAnchor={props.textAnchor}
                                        dominantBaseline={props.dominantBaseline}
                                        fill="gray"
                                        fontSize={12}
                                    >
                                        {`${payload.total.toFixed(1)}%`}
                                    </text>
                                )
                            }}
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                {topExercise && (
                    <div className="flex items-center gap-2 leading-none font-medium">
                        Exercice le plus pratiqué: {topExercise.item} ({topExercise.total.toFixed(2)}%)
                        <TrendingUp className="h-4 w-4"/>
                    </div>
                )}
                <div className="text-muted-foreground leading-none">
                    Statistiques calculées sur les {data.length} premiers exercices
                </div>
            </CardFooter>
        </Card>
    )
}
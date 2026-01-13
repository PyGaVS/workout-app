import {TrendingUp} from "lucide-react";
import {Skeleton} from "@/Components/ui/skeleton.tsx";

export type StatCardType = {
    statLabel? : string,
    stat?: string | number | null | undefined,
    statBadge? : string,
    statText? : string
    statDescription? : string,
    skeleton? : boolean,
}

export default function StatCard({statLabel, stat, statBadge, statText, statDescription, skeleton} : StatCardType) {
    if (skeleton) {
        return (
            <div className="flex flex-col border-gray-300 border-1 rounded-xl py-4 px-6 w-1/4 h-50 justify-between w-full">
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                        <Skeleton className="w-30 h-5" />
                        <Skeleton className="rounded-xl w-15 h-6"/>
                    </div>
                    <Skeleton className="w-50 h-7" />
                </div>

                <div className="flex flex-col gap-2">
                    <Skeleton className="font-bold flex items-center gap-2 w-50 h-5"/>
                    <Skeleton className="text-gray-500 text-sm w-60 h-5"/>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col border-(--stats-border) border-1 rounded-xl py-4 px-6 w-1/4 h-40 sm:h-50 justify-between w-full">
            <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                    <p className="text-sm md:text-md text-(--text-muted)">{statLabel ?? 'Label'}</p>
                    {statBadge ?
                        <div className="border-1 border-(--stats-border) px-0 sm:px-4 rounded-xl text-xs sm:text-sm lg:text-base" style={{ boxShadow: `0 10px 15px -10px var(--text-muted)` }}>{statBadge}</div> : null}
                </div>
                <p className="text-xl lg:text-2xl font-bold">{stat ?? 'stat'}</p>
            </div>

            <div className="flex flex-col gap-2">
                <p className="text-sm sm:text-base font-bold flex items-center gap-2">{statText ?? 'Magnifique !'} <TrendingUp
                    className="h-4 w-4" color="green"/></p>
                <p className="text-(--text-muted) text-xs sm:text-sm">{statDescription ?? 'Pas ouf'}</p>
            </div>
        </div>
    )
}
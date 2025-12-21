import {TrendingUp} from "lucide-react";

export type StatCardType = {
    statLabel? : string,
    stat?: string | number | null | undefined,
    statBadge? : string,
    statText? : string
    statDescription? : string,
}

export default function StatCard({statLabel, stat, statBadge, statText, statDescription} : StatCardType) {
    return (
        <div className="flex flex-col border-gray-300 border-1 rounded-xl py-4 px-6 w-1/4 h-50 justify-between">
            <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                    <p className="text-gray-500">{statLabel ?? 'Label'}</p>
                    {statBadge ? <div className="border-1 border-gray-300 px-4 rounded-xl shadow-lg">{statBadge}</div> : null}
                </div>
                <p className="text-2xl font-bold">{stat ?? 'stat'}</p>
            </div>

            <div className="flex flex-col gap-2">
                <p className="font-bold flex items-center gap-2">{statText ?? 'Magnifique !'} <TrendingUp className="h-4 w-4" color="green"/></p>
                <p className="text-gray-500 text-sm">{statDescription ?? 'Pas ouf'}</p>
            </div>
        </div>
    )
}
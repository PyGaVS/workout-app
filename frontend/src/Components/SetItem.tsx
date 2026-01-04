import type Set from "@/api/models/Set";
import type { PropsWithChildren } from "react";

interface Props {
  set: Set
}

export default function SetItem({ set }: PropsWithChildren<Props>){
    return (
      <div key={set.id} className='bg-bg/50 rounded-lg p-3 border border-transparent'>
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <span className="font-semibold text-text">{set.exercise.name}</span>
              {set.comment && (
                <span className="text-xs italic text-accent mt-1">
                  " {set.comment} "
                </span>
              )}
          </div>
          <div className="flex items-center gap-4 text-right">
            <div className="flex flex-col">
              <span className="text-xl font-black text-secondary leading-none">{set.reps}</span>
              <span className="text-[0.6rem] uppercase text-text-muted font-bold">Reps</span>
            </div>
            <div className="h-8 w-px bg-border"></div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-primary leading-none">{set.weight}<small className="text-xs ml-0.5">kg</small></span>
              <span className="text-[0.6rem] uppercase text-text-muted font-bold">Poids</span>
            </div>
          </div>
        </div>
        <div className="mt-2 pt-2 border-t border-border/50 flex gap-4 text-[11px] font-medium text-text-muted">
          {set.tempo && (
            <span className="flex items-center gap-1">
              <span className="text-secondary">Tempo:</span> {set.tempo}
            </span>
          )}
          {set.restTime > 0 && (
            <span className="flex items-center gap-1 text-accent">
              <span className="text-secondary">Repos:</span> {set.restTime}s
            </span>
          )}
        </div>
      </div>
    );
}
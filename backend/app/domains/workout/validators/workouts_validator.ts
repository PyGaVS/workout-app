import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export const createWorkoutValidator = vine.compile(
  vine.object({
    date: vine.date(),
    exercise_blocs: vine
      .array(
        vine.object({
          title: vine.string(),
          sets: vine
            .array(
              vine.object({
                exercise_id: vine.number(),
                reps: vine.number(),
                weight: vine.number(),
                comment: vine.string().optional(),
                restTime: vine.number().optional(),
                tempo: vine.string().optional(),
              })
            )
            .optional(),
        })
      )
      .optional(),
  })
)

export const updateWorkoutValidator = vine.compile(
  vine.object({
    date: vine.date(),
    exercise_blocs: vine
      .array(
        vine.object({
          title: vine.string(),
          sets: vine
            .array(
              vine.object({
                exercise_id: vine.number(),
                reps: vine.number(),
                weight: vine.number(),
                comment: vine.string().optional(),
                restTime: vine.number().optional(),
                tempo: vine.string().optional(),
              })
            )
            .optional(),
        })
      )
      .optional(),
  })
)

export type CreateWorkoutSchema = Infer<typeof createWorkoutValidator>
export type UpdateWorkoutSchema = Infer<typeof updateWorkoutValidator>

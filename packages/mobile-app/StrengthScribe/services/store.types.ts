import {WorkoutRecord} from "../app/StartWorkout/LogWorkout";

export type ResponseType<T> = {
  data: T;
  status: number;
  error?: string;
}

export type ExerciseDTO = {
  id?: string,
  name?: string,
  userId?: string,
}

export type ExercisesDTO = ExerciseDTO[]

export type WorkoutDTO = {
  id?: string,
  name?: string,
  userId?: string,
  exercises?: ExerciseDTO[],
}

export type WorkoutsDTO = WorkoutDTO[]

export type RecentStatsDTO = {
  numberOfSets?: number,
  avgReps?: number,
  maxReps?: number,
  avgWeight?: number,
  maxWeight?: number,
}

export type RecordDTO = WorkoutRecord & {
  id?: string,
}


export type SummaryStatsDTO = {
  exerciseId?: number,
  exerciseName?: string,
  overLast?: number,
  progressWent?: string,
  progressValue?: number,
  progressPercentage?: number,
  records?: Record<string, RecordDTO[]>
}

export type DetailedStatsDTO = {
  pr?: number,
  recentStats?: RecentStatsDTO,
  summaryStats?: SummaryStatsDTO,
}

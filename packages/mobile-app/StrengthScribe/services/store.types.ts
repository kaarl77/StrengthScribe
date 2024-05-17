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

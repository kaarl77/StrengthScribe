import axios from 'axios';
import {
  DetailedStatsDTO,
  ExerciseDTO,
  RecentStatsDTO,
  ResponseType,
  SummaryStatsDTO,
  WorkoutDTO,
  WorkoutsDTO
} from "./store.types";
import {WorkoutRecord} from "../app/StartWorkout/LogWorkout";

const baseUrl = 'http://localhost:8080';

export const login = async (username: string, password: string): Promise<ResponseType<any>> => {
  try {
    const response = await axios.post(`${baseUrl}/login`, {username, password});
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error: any) {
    return {
      data: null,
      status: error.response ? error.response.status : 500,
      error: error.message,
    };
  }
}

export const register = async (username: string, password: string): Promise<ResponseType<any>> => {
  try {
    const response = await axios.post(`${baseUrl}/register`, {username, password});
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error: any) {
    return {
      data: null,
      status: error.response ? error.response.status : 500,
      error: error.message,
    };
  }
}

export const getExercises = async (userId: string): Promise<ResponseType<ExerciseDTO[]>> => {
  try {
    const response = await axios.get(`${baseUrl}/api/exercises/user/${userId}`);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error: any) {
    return {
      data: [],
      status: error.response ? error.response.status : 500,
      error: error.message,
    };
  }
}

export const createExercise = async (userId: string, name: string): Promise<ResponseType<ExerciseDTO>> => {
  try {
    const response = await axios.post(`${baseUrl}/api/exercises`, {userId, name});
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error: any) {
    return {
      data: {},
      status: error.response ? error.response.status : 500,
      error: error.message,
    };
  }
}

export const getWorkouts = async (userId: string): Promise<ResponseType<WorkoutsDTO>> => {
  try {
    const response = await axios.get(`${baseUrl}/api/workouts/user/${userId}`);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error: any) {
    return {
      data: [],
      status: error.response ? error.response.status : 500,
      error: error.message,
    };
  }
}

export const createWorkout = async (userId: string, name: string): Promise<ResponseType<WorkoutDTO>> => {
  try {
    const response = await axios.post(`${baseUrl}/api/workouts`, {userId, name});
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error: any) {
    return {
      data: {},
      status: error.response ? error.response.status : 500,
      error: error.message,
    };
  }
}

export const addExerciseToWorkout = async (workoutId: string, exerciseId: string): Promise<ResponseType<WorkoutDTO>> => {
  try {
    const response = await axios.put(`${baseUrl}/api/workouts/${workoutId}/exercise/${exerciseId}`);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error: any) {
    return {
      data: {},
      status: error.response ? error.response.status : 500,
      error: error.message,
    };
  }
}

export const deleteExerciseFromWorkout = async (workoutId: string, exerciseId: string): Promise<ResponseType<WorkoutDTO>> => {
  try {
    const response = await axios.delete(`${baseUrl}/api/workouts/${workoutId}/exercise/${exerciseId}`);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error: any) {
    return {
      data: {},
      status: error.response ? error.response.status : 500,
      error: error.message,
    };
  }
}

export const getWorkout = async (workoutId: string): Promise<ResponseType<WorkoutDTO>> => {
  try {
    const response = await axios.get(`${baseUrl}/api/workouts/${workoutId}`);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error: any) {
    return {
      data: {},
      status: error.response ? error.response.status : 500,
      error: error.message,
    };
  }
}

export const getRecentStatsOfExercise = async (exerciseId: string): Promise<ResponseType<RecentStatsDTO>> => {
  try {
    const response = await axios.get(`${baseUrl}/api/records/recentStats/exercise/${exerciseId}`);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error: any) {
    return {
      data: {},
      status: error.response ? error.response.status : 500,
      error: error.message,
    };
  }
}

export const postRecords = async (records: WorkoutRecord[]): Promise<ResponseType<WorkoutRecord[]>> => {
  try {
    const response = await axios.post(`${baseUrl}/api/records`, records);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error: any) {
    return {
      data: [],
      status: error.response ? error.response.status : 500,
      error: error.message,
    };
  }
}

export const getDetailedStatsOfExercise = async (exerciseId: string, days?: string): Promise<ResponseType<DetailedStatsDTO>> => {
  try {
    const response = await axios.get(`${baseUrl}/api/records/detailedStats/exercise/${exerciseId}/days/${days??20}?useWeight=true`);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error: any) {
    return {
      data: {},
      status: error.response ? error.response.status : 500,
      error: error.message,
    };
  }
}

export const getSummaryStatsOfRandomExercise = async (userId: string): Promise<ResponseType<SummaryStatsDTO[]>> => {
  try {
    const response = await axios.get(`${baseUrl}/api/records/summaryStats/user/${userId}?useWeight=1`);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error: any) {
    return {
      data: [],
      status: error.response ? error.response.status : 500,
      error: error.message,
    };
  }
}

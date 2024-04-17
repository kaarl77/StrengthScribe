import axios from 'axios';

type ResponseType = {
  data: any;
  status: number;
  error?: string;
}

const baseUrl = 'http://localhost:8080';

export const login = async (username: string, password: string): Promise<ResponseType> => {
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

export const register = async (username: string, password: string): Promise<ResponseType> => {
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

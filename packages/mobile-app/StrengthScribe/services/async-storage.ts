import AsyncStorage from '@react-native-async-storage/async-storage';
import {AsyncStorageKeys} from "../constants/AsyncStorageKeys";

export const setItem = async (key: AsyncStorageKeys, value: string): Promise<void> => {
  await AsyncStorage
    .setItem(key, value)
    .catch((error) => {
      console.error(`Error setting item in AsyncStorage: ${error}`);
    });
}

export const getItem = async (key: AsyncStorageKeys): Promise<string | null> => {
  return await AsyncStorage
    .getItem(key)
    .catch((error) => {
      console.error(`Error getting item from AsyncStorage: ${error}`);
      return null;
    });
}

export const deleteItem = async (key: AsyncStorageKeys): Promise<void> => {
  await AsyncStorage
    .removeItem(key)
    .catch((error) => {
      console.error(`Error removing item from AsyncStorage: ${error}`);
    });
}
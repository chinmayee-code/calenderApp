import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../utils';
import {useState} from 'react';
import {Toast} from 'native-base';

type MutationOptions = {
  method?: 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: any;
  isFormData?: boolean;
  BASE_URL?: string;
  isAlert?: boolean;
};

const useMutation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const mutation = async (path: string, options?: MutationOptions) => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const url = BASE_URL || 'http://192.168.1.34:8000/api/v1';
      setIsLoading(true);
      const method = options?.method || 'POST';
      const body = options?.body
        ? options?.isFormData
          ? options?.body
          : JSON.stringify(options?.body)
        : `{}`;

      const headers: any = options?.isFormData
        ? {}
        : {'Content-Type': 'application/json'};

      if (token) headers['Authorization'] = `Bearer ${token}`;
      console.log(`${url}/${path}`);
      const response = await fetch(`${url}/${path}`, {
        method,
        body,
        headers,
      });
      const status = response.status;
      const results = await response.json();
      if (options?.isAlert && status !== 200) {
        Toast.show({
          title: 'Error',
          description: results?.error?.message,
          bgColor: 'error.400',
        });
      }
      if (options?.isAlert && status === 200) {
        Toast.show({
          title: 'Success',
          description: results?.message,
          bgColor: 'success.400',
        });
      }
      setIsLoading(false);
      return {results, status};
    } catch (error) {
      setIsLoading;
    }
  };
  return {mutation, isLoading};
};
export default useMutation;

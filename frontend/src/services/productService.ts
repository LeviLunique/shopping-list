import axios, { AxiosError } from 'axios';

const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api/products' : 'http://backend:8000/products';

export const createProduct = async (name: string, value: number) => {
    try {
        const response = await axios.post(API_URL, { name, value }, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
            console.error('Error response data:', axiosError.response.data);
            console.error('Error response status:', axiosError.response.status);
            console.error('Error response headers:', axiosError.response.headers);
        }
        throw error;
    }
}
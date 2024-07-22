import type { NextApiRequest, NextApiResponse } from 'next';
import axios, {AxiosError} from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { name, value } = req.body;
        try {
            const response = await axios.post('http://backend:8000/products', { name, value }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            res.status(201).json(response.data);
        } catch (error) {
            const axiosError = error as AxiosError;
            console.error('Error creating product:', axiosError);
            console.error('Error response:', axiosError.response?.data);
            res.status(500).json({ error: 'Failed to create product', details: axiosError.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
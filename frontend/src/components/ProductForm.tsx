import { useState } from 'react';
import { useRouter } from 'next/router';
import { createProduct } from '../services/productService';
import InputField from './InputField';
import SubmitButton from './SubmitButton';
import { AxiosError } from 'axios';

const ProductForm = () => {
    const [name, setName] = useState('');
    const [value, setValue] = useState<string>('');
    const [message, setMessage] = useState<string | null>(null);
    const [errorDetails, setErrorDetails] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await createProduct(name, parseFloat(value));
            setMessage('Product created successfully!');
            setTimeout(() => {
                setMessage(null);
                setName('');
                setValue('');
                router.push('/products/new');
            }, 2000);
        } catch (error) {
            const axiosError = error as AxiosError;
            setMessage('Error creating product.');
            setErrorDetails(axiosError.message);
            console.error('Error creating product:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-5">Create New Product</h1>
            {message && (
                <div className={`mb-4 text-center p-2 rounded ${message.includes('successfully') ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                    {message}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <InputField
                    label="Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <InputField
                    label="Value"
                    type="number"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    required
                />
                <SubmitButton label="Save"/>
            </form>
        </div>
    );
};

export default ProductForm;
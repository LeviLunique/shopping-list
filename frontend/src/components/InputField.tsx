import React from 'react';

interface InputFieldProps {
    label: string;
    type: string;
    value: string | number | undefined;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, value, onChange, required }) => {
    return (
        <div className="mb-4">
            <label className="block text-gray-700">{label}</label>
            <input
                type={type === 'number' ? 'text' : type}
                value={value !== undefined ? value : ''}
                onChange={onChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required={required}
                inputMode={type === 'number' ? 'decimal' : undefined}
                pattern={type === 'number' ? '[0-9]*[.]?[0-9]+' : undefined}
            />
        </div>
    );
};

export default InputField;
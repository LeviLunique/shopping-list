import React from 'react';

interface SubmitButtonProps {
    label: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ label }) => {
    return (
        <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
            {label}
        </button>
    );
};

export default SubmitButton;
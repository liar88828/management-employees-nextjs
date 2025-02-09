import React from "react";

interface ErrorFormProps {
    errors?: string[]; // Array of error messages
    title?: string; // Optional title for the error list
}

export const FormError: React.FC<ErrorFormProps> = ({ errors, title = "Please address the following errors:" }) => {
    if (!errors || errors.length === 0) return null;

    return (
        <div className="mt-2 text-red-500 text-sm">
            <p>{ title }</p>
            <ul className="list-disc list-inside">
                { errors.map((error, index) => (
                    <li key={ index }>{ error }</li>
                )) }
            </ul>
        </div>
    );
};
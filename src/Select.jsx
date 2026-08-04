import React, { useId } from 'react';

function Select({ options = [], label, className = '', ...props }, ref) {
    const id = useId();
    return (
        <div className="w-full">
            {label && (
                <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
                    {label}
                </label>
            )}
            <select {...props} id={id} ref={ref} className={`input-field ${className}`}>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default React.forwardRef(Select);
import React from "react";
import { T_RadioGroup } from "./radioGroupTypes";

const RadioGroup: React.FC<T_RadioGroup> = ({
    label,
    name,
    options,
    selectedValue,
    onChange,
    errorMessage,
}) => {
    return (
        <div className="space-y-3">
            {label && <label className="block text-base font-medium text-base-content">{label}</label>}
            <div className="flex gap-3">
                {options.map((option) => (
                    <button
                        key={option.value}
                        type="button"
                        onClick={() => onChange(option.value)}
                        className={`
                            px-6 py-2.5 rounded-lg font-medium transition-all
                            ${selectedValue === option.value 
                                ? 'bg-primary text-primary-content shadow-md' 
                                : 'bg-base-200 text-base-content hover:bg-base-300'
                            }
                        `}
                    >
                        {option.value}
                    </button>
                ))}
            </div>
            {errorMessage && (
                <span className="text-red-500 text-sm mt-2 block">{errorMessage}</span>
            )}
        </div>
    );
};

export default RadioGroup;

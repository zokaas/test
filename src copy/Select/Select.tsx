import React, { useState, useRef, useEffect } from "react";
import { T_Select } from "./selectTypes";

const Select: React.FC<T_Select> = ({
    name,
    label,
    options,
    selectedValue,
    onChange,
    errorMessage,
    placeholder = "Choose an option",
}) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleOptionClick = (option: { id: string; value: string }) => {
        onChange(option.value);
        setDropdownOpen(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const filteredOptions =
        options && options.length > 15
            ? options.filter((option) =>
                  option.value.toLowerCase().includes(searchTerm.toLowerCase()),
              )
            : options || [];

    const selectedOption = options?.find((option) => option.value === selectedValue);

    return (
        <div className="flex-grow">
            <label className="block mb-2 font-medium text-base-content">
                {label}
            </label>
            <div className="relative" ref={dropdownRef}>
                <div
                    className="w-full p-2 border border-base-300 bg-base-100 text-base-content rounded-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent mb-2 cursor-pointer"
                    onClick={(e) => {
                        e.stopPropagation();
                        setDropdownOpen(!dropdownOpen);
                    }}>
                    <span className="block truncate">
                        {selectedOption ? selectedOption.value : placeholder}
                    </span>
                </div>
                {dropdownOpen && (
                    <div className="absolute z-10 w-full bg-base-100 border border-base-300 rounded mt-1 max-h-60 overflow-y-auto text-base-content">
                        {options && options.length > 15 && (
                            <input
                                name={name}
                                type="text"
                                className="sticky top-0 z-10 w-full p-2 border-b border-base-300 bg-base-100"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onClick={(e) => e.stopPropagation()}
                            />
                        )}
                        {filteredOptions.map((option) => (
                            <div
                                key={option.value}
                                className="flex items-center p-2 hover:bg-base-200 cursor-pointer text-base-content"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleOptionClick(option);
                                }}>
                                <span className="block truncate">{option.value}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {errorMessage && (
                <span className="text-red-500 text-sm mt-2 block">{errorMessage}</span>
            )}
        </div>
    );
};

export default Select;
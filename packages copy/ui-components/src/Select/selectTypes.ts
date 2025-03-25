export type T_Option = {
    id: string;
    value: string;
};

export type T_Select = {
    questionParameter: string;
    label: string;
    options?: T_Option[];
    selectedValue: string;
    onChange: (value: string) => void;
    errorMessage?: string;
    placeholder?: string;
};

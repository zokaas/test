export type T_Options = {
    id: string | null;
    value: string;
};

export type T_MultiSelectDropdown = {
    questionParameter: string;
    label: string;
    options: Array<T_Options>;
    placeholder: string;
    selectedOptions: Array<string>;
    onChange: (selected: string[]) => void;
    errorMessage?: string;
};

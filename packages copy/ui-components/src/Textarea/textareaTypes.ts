export type T_Textarea = {
    questionParameter: string;
    label: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    errorMessage?: string;
};

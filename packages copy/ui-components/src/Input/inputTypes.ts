export type T_Input = {
    questionParameter: string;
    label: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    type?: "text" | "number";
    errorMessage?: string;
};

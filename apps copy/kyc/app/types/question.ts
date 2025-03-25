export interface T_DynamicField {
    id: string;
    __component: string;
}

export interface T_DependentQuestion extends T_DynamicField {
    __component: "kyc.dependent-question";
    componentType: string;
    conditionValue: string;
    questionLabel: string;
    placeholder?: string;
    questionParameter: string;
    questionDescription?: string;
    options?: string[];
    useCountryList?: boolean;
    countryListLang?: string;
}

export interface T_Info extends T_DynamicField {
    __component: "kyc.info";
    type?: string;
    labelDescription?: string;
    labelExplanation?: string;
}

export interface T_BeneficialOwnerConfig extends T_DynamicField {
    __component: "kyc.beneficial-owner";
    nameName: string;
    nameLabelText: string;
    nameType: string;
    ssnName: string;
    ssnLabelText: string;
    ssnType: string;
    ownershipName: string;
    ownershipLabelText: string;
    ownershipType: string;
    countryName: string;
    countryLabelText: string;
    countryType: string;
    useCountryList: boolean;
    countryListLang?: string;
    addBObutton: string;
    namePlaceholder?: string;
    ssnPlaceholder?: string;
    ownershipPlaceholder?: string;
    countryPlaceholder?: string;
}

export interface T_CountryOptions extends T_DynamicField {
    useCountryList: boolean;
    countryListLang?: string;
}

export type T_DynamicFields =
    | T_DependentQuestion
    | T_Info
    | T_BeneficialOwnerConfig
    | T_CountryOptions;

export type T_QuestionType =
    | "Text"
    | "Textarea"
    | "RadioGroup"
    | "Select"
    | "Number"
    | "BeneficialOwner"
    | "MultiSelectDropdown";

export interface T_Question {
    id: number;
    rawData: {
        questionLabel: string;
        step: number;
        componentType: string;
        options?: string[];
        placeholder?: string | null;
        questionParameter: string;
        dynamicField?: T_DynamicFields[];
    };
}

export interface T_Country {
    id?: string;
    value: string;
}

export interface T_ErrorMessages {
    error: string;
    message: string;
    locale: string;
}

export type T_DynamicFieldHandlers = {
    [key: string]: (field: T_DynamicField) => void;
};

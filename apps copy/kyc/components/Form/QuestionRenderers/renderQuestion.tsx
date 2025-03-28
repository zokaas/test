// src/components/Question/renderQuestion.tsx

import React from "react";
import { Input, RadioGroup, Select, MultiSelectDropdown, Textarea } from "@ui-components/index";
import { T_Country } from "~/types";
import { T_FormValue } from "components/types";
import {
    BeneficialOwnerForm,
    T_BeneficialOwner,
    T_BeneficialOwnerLabels,
} from "components/BeneficialOwner";

export function renderQuestion(
    componentType: string,
    questionParameter: string,
    questionLabel: string,
    placeholder: string,
    options: { id: string; value: string }[],
    value: T_FormValue,
    handleInputChange: (name: string, value: T_FormValue) => void,
    error: string | undefined,
    countryListOptions: T_Country[],
    beneficialOwnerLabels?: T_BeneficialOwnerLabels,
    dynamicComponents?: React.ReactNode[],
) {
    return (
        <div>
            <label htmlFor={questionParameter} className="question-label flex items-center">
                {questionLabel}
                {dynamicComponents && dynamicComponents.length > 0 && (
                    <span className="ml-2">{dynamicComponents}</span>
                )}
            </label>
            {(() => {
                switch (componentType) {
                    case "Textarea":
                        return (
                            <Textarea
                            questionParameter={questionParameter}
                                label=""
                                placeholder={placeholder}
                                value={value as string}
                                onChange={(newValue: string) => handleInputChange(questionParameter, newValue)}
                                errorMessage={error}
                            />
                        );
                    case "Text":
                    case "Number":
                        return (
                            <Input
                            questionParameter={questionParameter}
                                label=""
                                placeholder={placeholder}
                                value={value as string}
                                onChange={(newValue: string) => handleInputChange(questionParameter, newValue)}
                                type={componentType === "Number" ? "number" : "text"}
                                errorMessage={error}
                            />
                        );
                    case "RadioGroup":
                        return (
                            <RadioGroup
                            questionParameter={questionParameter}
                                label=""
                                options={options}
                                selectedValue={value as string}
                                onChange={(newValue: string) => handleInputChange(questionParameter, newValue)}
                                errorMessage={error}
                            />
                        );
                    case "Select":
                        return (
                            <Select
                            questionParameter={questionParameter}
                                label=""
                                options={options}
                                placeholder={placeholder}
                                selectedValue={value as string}
                                onChange={(newValue: string) => handleInputChange(questionParameter, newValue)}
                                errorMessage={error}
                            />
                        );
                    case "MultiSelectDropdown":
                        return (
                            <MultiSelectDropdown
                            questionParameter={questionParameter}
                                label=""
                                options={options}
                                selectedOptions={Array.isArray(value) ? value.map(String) : []}
                                onChange={(newSelected: string[]) =>
                                    handleInputChange(questionParameter, newSelected)
                                }
                                errorMessage={error}
                                placeholder={placeholder}
                            />
                        );
                    case "BeneficialOwner":
                        return (
                            <BeneficialOwnerForm
                            questionParameter={questionParameter}
                                label=""
                                beneficialOwners={
                                    Array.isArray(value) &&
                                    value.every((v) => typeof v === "object")
                                        ? (value as T_BeneficialOwner[])
                                        : []
                                }
                                setBeneficialOwner={(owners) => handleInputChange(questionParameter, owners)}
                                countryList={countryListOptions}
                                errorMessage={error}
                                beneficialOwnerLabels={beneficialOwnerLabels}
                            />
                        );
                    default:
                        console.warn("Unhandled question type:", componentType);
                        return null;
                }
            })()}
        </div>
    );
}

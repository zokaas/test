import React from "react";
import { Steps, Container } from "@ui-components/index";
import { T_FormContainer } from "./formContainerTypes";
import { CompanyInfoBlock, FormButtons, FormHeader } from "components";

export const FormContainer: React.FC<T_FormContainer> = ({
    steps,
    currentStepIndex,
    onNext,
    onBack,
    children,
    showHeader = true,
}) => {
    return (
            <Container className="bg-base-100 shadow-xl p-6">
                {showHeader && <FormHeader />}
                
                <div className="mb-8">
                    <Steps steps={steps} currentStepIndex={currentStepIndex} />
                </div>
                
                <div className="w-full h-px bg-base-300 mb-6"></div>
                
                {currentStepIndex === 0 && <CompanyInfoBlock />}
                
                <div className="space-y-6">
                    {children}
                </div>
                
                <FormButtons
                    currentStepIndex={currentStepIndex}
                    steps={steps}
                    onBack={onBack}
                    onNext={onNext}
                />
            </Container>
    );
};

import { getForm } from "~/services/api";
import { getEnv } from "~/environment";

export const fetchProductData = async (
    productId: string,
    kycType: string,
    sessionId: string,
) => {
    const apiUrl = getEnv(process.env).STRAPI_BASE_URL;

    const fullFormData = await getForm(productId, kycType, sessionId);
    console.log(fullFormData);
    const productData = fullFormData

    const beneficialOwnerLabels = productData?.kyc_ses?.data[0]?.attributes?.setOfQuestions?.find(
        (question: { question: { data: { attributes: { componentType: string } } } }) =>
            question?.question?.data?.attributes?.componentType === "BeneficialOwner",
    )?.question?.data?.attributes?.dynamicField;

    const countryList = await getProductData("en");

    const steps =
        productData.steps?.step1 && productData.steps?.step2 && productData.steps?.step3
            ? [productData.steps.step1, productData.steps.step2, productData.steps.step3]
            : defaultSteps;

    return {
        questions: productData.kyc_ses?.data[0]?.attributes?.setOfQuestions || [],
        beneficialOwnerLabels: beneficialOwnerLabels || {},
        buttonLabels: productData.button || defaultButtons,
        steps,
        title: productData.kyc_ses?.data[0]?.attributes?.formHeader?.title || "",
        infoText: productData.kyc_ses?.data[0]?.attributes?.formHeader?.infoText || "",
        logo: productData.logo?.data?.attributes?.url
            ? `${apiUrl}${productData.logo.data.attributes.url}`
            : "",
        footerData: productData.footer || defaultFooter,
        countryList,
    };
};

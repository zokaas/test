import { useLoaderData } from "@remix-run/react";
import React from "react";
import { loader } from "~/root";

export const FormHeader: React.FC = () => {
    const { productData } = useLoaderData<typeof loader>();
    const { title, infoText } = productData.formHeader || {};
    return (
        <div className="text-center mb-6">
            {title && <h2 className="text-2xl font-bold text-primary">{title}</h2>}
            {infoText && <p className="text-gray-500">{infoText}</p>}
        </div>
    );
};

export default FormHeader;

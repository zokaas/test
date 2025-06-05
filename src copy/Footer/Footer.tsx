import React from "react";
import { T_Footer } from "./footerTypes";

const Footer: React.FC<T_Footer> = ({ footer }) => {
    const {
        customerServiceLabel,
        customerServiceText,
        contactInfoLabel,
        contactInfoText,
        addressLabel,
        addressText,
    } = footer;

    return (
<footer className="w-full bg-neutral text-neutral-content py-10 mt-auto">
  <div className="max-w-5xl mx-auto px-6">
<div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">

      <div>
        <h2 className="text-lg font-bold mb-3">{customerServiceLabel}</h2>
        <p className="text-sm opacity-80">{customerServiceText}</p>
      </div>
      <div>
        <h2 className="text-lg font-bold mb-3">{contactInfoLabel}</h2>
        <p className="text-sm opacity-80">{contactInfoText}</p>
      </div>
      <div>
        <h2 className="text-lg font-bold mb-3">{addressLabel}</h2>
        <p className="text-sm opacity-80">{addressText}</p>
      </div>
    </div>
  </div>
</footer>

    );
};

export default Footer;

import { Type } from "class-transformer";
import { IsString, IsObject, IsArray, ValidateNested, IsOptional } from "class-validator";

export class ProductAttributesDto {
  @IsString()
  product: string;

  @IsObject()
  steps: {
    step1: string;
    step2: string;
    step3: string;
  };

  @IsObject()
  button: {
    next: string;
    back: string;
    submit: string;
  };

  @IsObject()
  footer: {
    customerServiceLabel: string;
    customerServiceText: string;
    contactInfoLabel: string;
    contactInfoText: string;
    addressLabel: string;
    addressText: string;
  };

  @IsObject()
  companyBlock: {
    companyName: string;
    orgNumber: string;
  };

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ErrorMessageDto)
  errorMessages: ErrorMessageDto[];

  @IsOptional()
  kyc_fis: {
    data: any[];
  };

  @IsOptional()
  kyc_nls: {
    data: any[];
  };
  
    @IsOptional()
  kyc_fis: {
    data: any[];
  };
}
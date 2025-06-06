import { IsObject, IsArray } from "class-validator";
import { KycFormDataDto } from "./kyc-form-data.dto";

export class RootDto {
  @IsObject()
  productData: KycFormDataDto;

  @IsArray()
  countryList: string[];
}

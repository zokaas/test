import { IsBoolean, IsOptional, IsString } from "class-validator";
import { DynamicFieldDto } from "./dynamic-field.dto";

export class CountryOptionsDto extends DynamicFieldDto {
  @IsOptional()
  @IsBoolean()
  useCountryList?: boolean;

  @IsOptional()
  @IsString()
  countryListLang?: string;
}

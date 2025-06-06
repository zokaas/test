import { IsBoolean, IsOptional, IsString } from "class-validator";
import { DynamicFieldDto } from "./dynamic-field.dto";

export class DependentQuestionDto extends DynamicFieldDto {
  @IsString()
  conditionValue: string;

  @IsString()
  questionLabel: string;

  @IsString()
  questionType: string;

  @IsOptional()
  @IsString()
  placeholder?: string;

  @IsString()
  questionParameter: string;

  @IsOptional()
  @IsString()
  questionDescription?: string;

  @IsOptional()
  options?: string[];

  @IsOptional()
  @IsBoolean()
  useCountryList?: boolean;

  @IsOptional()
  @IsString()
  countryListLang?: string;
}

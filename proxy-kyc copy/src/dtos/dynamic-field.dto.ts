import { IsInt, IsString } from "class-validator";
import { DependentQuestionDto } from "./dependent-question.dto";
import { InfoDto } from "./info.dto";
import { BeneficialOwnerDto } from "./beneficial-owner.dto";
import { CountryOptionsDto } from "./country-options.dto";

export class DynamicFieldDto {
  @IsInt()
  id: number;

  @IsString()
  __component: string;
}

export type DynamicFieldUnion =
  | DependentQuestionDto
  | InfoDto
  | BeneficialOwnerDto
  | CountryOptionsDto;

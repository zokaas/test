import {
  IsString,
  IsOptional,
  IsArray,
  IsObject,
  IsNumber,
} from "class-validator";
import { DynamicFieldDto, DynamicFieldUnion } from "./dynamic-field.dto";
import { DependentQuestionDto } from "./dependent-question.dto";
import { InfoDto } from "./info.dto";
import { BeneficialOwnerDto } from "./beneficial-owner.dto";
import { Type } from "class-transformer";
import { ErrorMessagesDto } from "./error-messages.dto";

export class QuestionRawDataDto {
  @IsString()
  questionLabel: string;

  @IsString()
  componentType: string;

  @IsNumber()
  step: string;

  @IsOptional()
  @IsArray()
  options?: Array<string>;

  @IsOptional()
  @IsString()
  placeholder?: string;

  @IsString()
  questionParameter: string;

  @IsObject()
  errorMessages?: {
    data: ErrorMessagesDto[];
  };

  @IsOptional()
  @IsArray()
  @Type(() => DynamicFieldDto, {
    discriminator: {
      property: "__component",
      subTypes: [
        { value: DependentQuestionDto, name: "kyc.dependent-question" },
        { value: InfoDto, name: "kyc.info" },
        { value: BeneficialOwnerDto, name: "kyc.beneficial-owner" },
      ],
    },
    keepDiscriminatorProperty: true,
  })
  dynamicField: DynamicFieldUnion[];
}

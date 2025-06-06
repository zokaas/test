import { Type } from "class-transformer";
import { IsString, IsOptional, IsObject, IsArray, ValidateNested } from "class-validator";

export class ApiKycFormAttributesDto {
  @IsString()
  formName: string;

  @IsString()
  formType: string;

  @IsOptional()
  @IsObject()
  formHeader: {
    title: string;
    subtitle: string;
  };

  @IsObject()
  @Type(() => ProductWrapperDto)
  product: ProductWrapperDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => KycQuestionComponentDto)
  setOfQuestions: KycQuestionComponentDto[];
}
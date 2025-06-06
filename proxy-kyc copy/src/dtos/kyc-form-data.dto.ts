import {
  IsInt,
  IsOptional,
  IsString,
  IsObject,
  IsArray,
  ValidateNested,
} from "class-validator";
import { Transform, Type } from "class-transformer";
import { QuestionDto } from "./question.dto";

export class KycFormDto {
  @IsInt()
  id: number;

  @IsString()
  product: string;

  @IsString()
  formType: string;

  @IsOptional()
  @IsObject()
  @Transform(({ value }) =>
    typeof value === "string" ? JSON.parse(value) : value
  )
  steps: {
    step1: string;
    step2: string;
    step3: string;
  };

  @IsOptional()
  @IsObject()
  @Transform(({ value }) =>
    typeof value === "string" ? JSON.parse(value) : value
  )
  button: {
    next: string;
    back: string;
    submit: string;
  };

  @IsOptional()
  @IsObject()
  @Transform(({ value }) =>
    typeof value === "string" ? JSON.parse(value) : value
  )
  footer: {
    customerServiceLabel: string;
    customerServiceText: string;
    contactInfoLabel: string;
    contactInfoText: string;
    addressLabel: string;
    addressText: string;
  };

  @IsOptional()
  @IsObject()
  @Transform(({ value }) =>
    typeof value === "string" ? JSON.parse(value) : value
  )
  formHeader: {
    title: string;
    subtitle: string;
  };

  @IsOptional()
  @IsObject()
  @Transform(({ value }) =>
    typeof value === "string" ? JSON.parse(value) : value
  )
  companyBlock: {
    companyName: string;
    orgNumber: string;
  };

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  questions: QuestionDto[];
}

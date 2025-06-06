import { IsInt, IsObject } from "class-validator";
import { Transform } from "class-transformer";
import { QuestionRawDataDto } from "./question-raw-data.dto";

export class QuestionDto {
  @IsInt()
  id: number;

  @IsObject()
  @Transform(({ value }) =>
    typeof value === "string" ? JSON.parse(value) : value
  )
  rawData: QuestionRawDataDto;
}

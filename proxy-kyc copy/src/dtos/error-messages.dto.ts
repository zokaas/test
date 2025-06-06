import { IsInt, IsObject } from "class-validator";
import { Type } from "class-transformer";
import { ErrorMessageAttributesDto } from "./error-messages-attributes.dto";

export class ErrorMessagesDto {
  @IsInt()
  id: number;

  @IsObject()
  @Type(() => ErrorMessageAttributesDto)
  attributes: ErrorMessageAttributesDto;
}

import { IsOptional, IsString } from "class-validator";
import { DynamicFieldDto } from "./dynamic-field.dto";

export class InfoDto extends DynamicFieldDto {
  @IsOptional()
  @IsString()
  componentType?: string;

  @IsOptional()
  @IsString()
  infoHeader?: string;

  @IsOptional()
  @IsString()
  infoDescription?: string;
}

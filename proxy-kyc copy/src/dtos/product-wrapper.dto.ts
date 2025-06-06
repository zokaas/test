import { Type } from "class-transformer";
import { IsInt, IsObject } from "class-validator";

export class ProductWrapperDto {
  @IsInt()
  id: number;

  @IsObject()
  @Type(() => ProductAttributesDto)
  attributes: ProductAttributesDto;
}

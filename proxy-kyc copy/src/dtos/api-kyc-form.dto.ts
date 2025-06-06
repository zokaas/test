
export class ApiKycFormDto {
  @IsInt()
  id: number;

  @IsObject()
  @Type(() => ApiKycFormAttributesDto)
  attributes: ApiKycFormAttributesDto;
}

import { HttpService } from "@nestjs/axios";
import { HttpException, Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AxiosRequestConfig, Method } from "axios";
import { catchError, lastValueFrom, map } from "rxjs";
import { RootDto, KycFormDto } from "./dtos";

@Injectable()
export class ProxyKycService {
  private readonly logger = new Logger(ProxyKycService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {}

  private static readonly productIdToLang: Record<string, "en" | "fi" | "se" | "nl"> = {
    "sweden-b2b-application": "se",
    "finland-b2b-application": "fi",
    "netherlands-b2b-application": "nl",
    default: "en",
  };

  getHello(): { status: string } {
    return {
      status: "Hello from proxy-kyc",
    };
  }

  private getRequestConfig<T>(
    path: string,
    method: Method,
    contentType?: string,
    params?: T
  ): AxiosRequestConfig {
    const baseUrl = this.configService.get("kycApi.url");
    const xApiKey = this.configService.get("kycApi.xApiKey");

    const url = encodeURI(`${baseUrl}/${path}`);

    return {
      url,
      method,
      headers: {
        "Content-Type": contentType,
        "x-apikey": xApiKey,
      },
      params,
    };
  }

  private async sendRequestToApi<R>(
    path: string,
    requestConfig: AxiosRequestConfig
  ): Promise<R> {
    return await lastValueFrom<R>(
      this.httpService.request(requestConfig).pipe(
        map((res) => res.data),
        catchError((err) => {
          throw new HttpException(err.response.data, err.response.status);
        })
      )
    );
  }

  parseProductData(productData: any): KycFormDto {
    const attributes = productData?.attributes;
    const productAttributes = attributes?.product?.data?.attributes;

    return {
      id: productAttributes?.id,
      product: productAttributes?.product,
      formType: attributes?.formType,
      steps: productAttributes?.steps,
      button: productAttributes?.button,
      footer: productAttributes?.footer,
      companyBlock: productAttributes?.companyBlock,
      formHeader: attributes?.formHeader,
      questions: Array.isArray(attributes?.setOfQuestions)
        ? attributes.setOfQuestions
            .map((q: any) => {
              const raw = q.questions_se?.data?.attributes;
              return raw
                ? {
                    id: q.id,
                    rawData: {
                      ...raw,
                      step: q.step,
                    },
                  }
                : null;
            })
            .filter(Boolean)
        : [],
    };
  }

  async getProductData(productId: string, kycType: string): Promise<KycFormDto> {
    const apiPath = `form/${productId}/${kycType}`;
    const requestConfig = this.getRequestConfig(apiPath, "GET");

    const response = await this.sendRequestToApi(apiPath, requestConfig);
    const productData = this.parseProductData(response);
    return productData;
  }

  async getCountryList(productId: string): Promise<string[]> {
    const apiPath = "countrylist";
    const lang = ProxyKycService.productIdToLang[productId] ?? ProxyKycService.productIdToLang.default;
    this.logger.log(`Fetching country list from: ${apiPath}`);
    const requestConfig = this.getRequestConfig(apiPath, "GET");

    const response = await this.sendRequestToApi<string[]>(apiPath, requestConfig);

    const parsedCountries: string[] = response.map((entry) => {
      try {
        const parsed = JSON.parse(entry);
        return parsed.attributes?.[lang] ?? "[Unnamed]";
      } catch {
        return "[Invalid Country]";
      }
    });

    return parsedCountries.sort((a, b) => a.localeCompare(b, lang));
  }

  async getForm(productId: string, kycType: string): Promise<RootDto> {
    const productData = await this.getProductData(productId, kycType);
    const countryList = await this.getCountryList(productId);
    return { productData, countryList };
  }

  async sendFormData<R = unknown>(
    payload: unknown,
    apiPath: string,
    contentType: string
  ): Promise<R> {
    const requestConfig: AxiosRequestConfig = {
      ...this.getRequestConfig(apiPath, "POST", contentType),
      data: payload,
    };

    this.logger.log(requestConfig);
    const response = await this.sendRequestToApi<R>(apiPath, requestConfig);

    return response;
  }
}

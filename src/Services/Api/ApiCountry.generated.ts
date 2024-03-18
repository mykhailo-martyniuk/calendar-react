import httpClient, { HttpResponse, RequestParams } from '@/Services/Api/Api';
import { CountryInfoDto, CountryV3Dto } from '@/types/types.generated';

const ApiCountry = {
  countryInfo: (countryCode: string, params: RequestParams = {}): Promise<HttpResponse<CountryInfoDto>> =>
    httpClient.request<CountryInfoDto>({
      path: `/api/v3/CountryInfo/${countryCode}`,
      method: 'GET',
      format: 'json',
      ...params,
    }),

  availableCountries: (params: RequestParams = {}): Promise<HttpResponse<CountryV3Dto[]>> =>
    httpClient.request<CountryV3Dto[]>({
      path: `/api/v3/AvailableCountries`,
      method: 'GET',
      format: 'json',
      ...params,
    }),
};

export default ApiCountry;

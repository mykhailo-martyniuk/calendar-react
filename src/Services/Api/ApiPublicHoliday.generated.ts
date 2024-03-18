import httpClient, { HttpResponse, RequestParams } from '@/Services/Api/Api';
import { PublicHolidayIsTodayPublicHolidayParams, PublicHolidayV3Dto } from '@/types/types.generated';

const ApiPublicHoliday = {
  publicHolidaysV3: (
    year: number,
    countryCode: string,
    params: RequestParams = {}
  ): Promise<HttpResponse<PublicHolidayV3Dto[]>> =>
    httpClient.request<PublicHolidayV3Dto[]>({
      path: `/api/v3/PublicHolidays/${year}/${countryCode}`,
      method: 'GET',
      format: 'json',
      ...params,
    }),

  isTodayPublicHoliday: (
    { countryCode, ...query }: PublicHolidayIsTodayPublicHolidayParams,
    params: RequestParams = {}
  ): Promise<HttpResponse<void>> =>
    httpClient.request<void>({
      path: `/api/v3/IsTodayPublicHoliday/${countryCode}`,
      method: 'GET',
      query,
      ...params,
    }),

  nextPublicHolidays: (countryCode: string, params: RequestParams = {}): Promise<HttpResponse<PublicHolidayV3Dto[]>> =>
    httpClient.request<PublicHolidayV3Dto[]>({
      path: `/api/v3/NextPublicHolidays/${countryCode}`,
      method: 'GET',
      format: 'json',
      ...params,
    }),

  nextPublicHolidaysWorldwide: (params: RequestParams = {}): Promise<HttpResponse<PublicHolidayV3Dto[]>> =>
    httpClient.request<PublicHolidayV3Dto[]>({
      path: `/api/v3/NextPublicHolidaysWorldwide`,
      method: 'GET',
      format: 'json',
      ...params,
    }),
};

export default ApiPublicHoliday;

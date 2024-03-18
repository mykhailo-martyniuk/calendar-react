import httpClient, { HttpResponse, RequestParams } from '@/Services/Api/Api';
import { LongWeekendV3Dto } from '@/types/types.generated';

const ApiLongWeekend = {
  longWeekend: (
    year: number,
    countryCode: string,
    params: RequestParams = {}
  ): Promise<HttpResponse<LongWeekendV3Dto[]>> =>
    httpClient.request<LongWeekendV3Dto[]>({
      path: `/api/v3/LongWeekend/${year}/${countryCode}`,
      method: 'GET',
      format: 'json',
      ...params,
    }),
};

export default ApiLongWeekend;

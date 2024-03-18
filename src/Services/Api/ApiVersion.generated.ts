import httpClient, { HttpResponse, RequestParams } from '@/Services/Api/Api';
import { VersionInfoDto } from '@/types/types.generated';

const ApiVersion = {
  getVersion: (params: RequestParams = {}): Promise<HttpResponse<VersionInfoDto>> =>
    httpClient.request<VersionInfoDto>({
      path: `/api/v3/Version`,
      method: 'GET',
      format: 'json',
      ...params,
    }),
};

export default ApiVersion;

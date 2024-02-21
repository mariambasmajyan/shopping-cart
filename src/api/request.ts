import axios, { AxiosRequestConfig } from 'axios';

type RequestMethod = 'get' | 'post' | 'delete';

export type RequestOptions = Omit<AxiosRequestConfig, 'url' | 'method'>;
export const request = async <Response>(
  method: RequestMethod,
  url: string,
  config: RequestOptions = {},
): Promise<Response> => {
  const response = await axios({ method, url, ...config });
  return response.data;
};

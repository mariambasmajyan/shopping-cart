import { AddShopItemRequest, GetShopsResponse } from './shops-api.types';
import { request } from './request';

export const getShops = async (): Promise<GetShopsResponse[]> => {
  return await request<GetShopsResponse[]>('get', `./public/shops.json`);
};

export const deleteShopItem = async (id: string): Promise<void> => {
  await request<void>('delete', `/api/shops/${id}`);
};

export const addShopItem = async (data: AddShopItemRequest): Promise<GetShopsResponse> => {
  return await request<GetShopsResponse>('post', '/api/shops', {
    data,
  });
};

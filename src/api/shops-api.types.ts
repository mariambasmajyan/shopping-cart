import { z } from 'zod';

export const GetShopsResponse = z.object({
  id: z.string(),
  name: z.string(),
  sortOrder: z.number(),
});
export type GetShopsResponse = z.infer<typeof GetShopsResponse>;

export const AddShopItemRequest = z.object({
  id: z.string(),
  name: z.string(),
  sortOrder: z.number(),
});
export type AddShopItemRequest = z.infer<typeof AddShopItemRequest>;

export type Shop = {
  id: string;
  name: string;
  sortOrder: number;
};

export type ShopsState = {
  shops: Shop[];
  loading: boolean;
  error: Error | null;
};

export const FETCH_SHOPS_SUCCEEDED = 'FETCH_SHOPS_SUCCEEDED';
export const FETCH_SHOPS_FAILED = 'FETCH_SHOPS_FAILED';
export const DELETE_ITEM = 'DELETE_ITEM';
export const ADD_ITEM = 'ADD_ITEM';

type FetchShopsSucceededAction = {
  type: typeof FETCH_SHOPS_SUCCEEDED;
  payload: Shop[];
};

type FetchShopsFailedAction = {
  type: typeof FETCH_SHOPS_FAILED;
  payload: Error;
};

type DeleteItemAction = {
  type: typeof DELETE_ITEM;
  payload: string;
};

type AddItemAction = {
  type: typeof ADD_ITEM;
  payload: Shop;
};

export type ShopActionTypes =
  | FetchShopsSucceededAction
  | FetchShopsFailedAction
  | DeleteItemAction
  | AddItemAction;

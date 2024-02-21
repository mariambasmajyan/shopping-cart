import {
  ADD_ITEM,
  DELETE_ITEM,
  FETCH_SHOPS_FAILED,
  FETCH_SHOPS_SUCCEEDED,
  Shop,
  ShopActionTypes,
  ShopsState,
} from './types';
import { AddShopItemRequest } from '../../api/shops-api.types';

const initialState: ShopsState = {
  shops: [],
  loading: false,
  error: null,
};

export const shopsReducer = (state = initialState, action: ShopActionTypes): ShopsState => {
  switch (action.type) {
    case FETCH_SHOPS_SUCCEEDED:
      return { ...state, loading: false, shops: action.payload, error: null };
    case FETCH_SHOPS_FAILED:
      return { ...state, loading: false, error: action.payload };
    case DELETE_ITEM:
      return { ...state, shops: state.shops.filter((shop) => shop.id !== action.payload) };
    case ADD_ITEM:
      return {
        ...state,
        shops: [...state.shops, action.payload],
      };
    default:
      return state;
  }
};

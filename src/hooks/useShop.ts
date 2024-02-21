import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import {
  ADD_ITEM,
  DELETE_ITEM,
  FETCH_SHOPS_FAILED,
  FETCH_SHOPS_SUCCEEDED,
  Shop,
} from '../store/shops/types';
import { getShops } from '../api/shops-api.request';

export const useShops = () => {
  const dispatch = useDispatch();

  const shops = useSelector<RootState, Shop[]>((state) => state.shops.shops);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const getData = async () => {
      try {
        const shopsData: Shop[] = await getShops();
        dispatch({ type: FETCH_SHOPS_SUCCEEDED, payload: shopsData });
      } catch (err) {
        dispatch({ type: FETCH_SHOPS_FAILED, payload: err as Error });
      }
    };

    getData();
  }, [dispatch]);

  // Functions to add and delete items using local state
  const addItem = useCallback(
    (newShop: Shop) => {
      dispatch({ type: ADD_ITEM, payload: newShop });
    },
    [dispatch],
  );

  const deleteItem = useCallback(
    (shopId: string) => {
      dispatch({ type: DELETE_ITEM, payload: shopId });
    },
    [dispatch],
  );

  // The following code can be used for API integration when a real backend is implemented
  /* const deleteItem = async (shopId: string) => {
    try {
      await deleteShopItem(shopId);
      dispatch({ type: DELETE_ITEM, payload: shopId });
    } catch (err) {
      setError(err as Error);
    }
  };

  const addItem = async (data: Shop) => {
    try {
      await addShopItem(data);
      dispatch({ type: ADD_ITEM, payload: data });
    } catch (err) {
      setError(err as Error);
    }
  };*/

  return { shops, loading, error, addItem, deleteItem };
};

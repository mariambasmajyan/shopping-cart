import { ShopsState } from './shops/types';
import { combineReducers } from 'redux';
import { shopsReducer } from './shops/shopReducer';

export type RootState = {
  shops: ShopsState;
};

export const RootReducer = combineReducers({
  shops: shopsReducer,
});

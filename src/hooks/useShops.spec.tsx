import { Provider } from 'react-redux';
import { renderHook, waitFor } from '@testing-library/react';
import { useShops } from './useShop';
import configureMockStore from 'redux-mock-store';
import { act } from 'react-dom/test-utils';
import { getShops } from '../api/shops-api.request';
import { RootState } from '../store/rootReducer';

jest.mock('../api/shops-api.request', () => ({
  getShops: jest.fn(),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => dispatchMock,
}));

const dispatchMock = jest.fn();

const mockShopsData = [
  { id: '1', name: 'Shop 1', sortOrder: 1 },
  { id: '2', name: 'Shop 2', sortOrder: 2 },
];

const mockStore = configureMockStore<RootState>()({
  shops: {
    shops: [],
    loading: false,
    error: null,
  },
});

describe('useShops', () => {
  beforeEach(() => {
    dispatchMock.mockClear();
    (getShops as jest.Mock).mockResolvedValue(mockShopsData);
  });

  it('fetches shops on mount', async () => {
    (getShops as jest.Mock).mockResolvedValue(mockShopsData);

    renderHook(() => useShops(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
    });

    await waitFor(() => {
      expect(dispatchMock).toHaveBeenCalledWith({
        type: 'FETCH_SHOPS_SUCCEEDED',
        payload: mockShopsData,
      });
    });
  });

  it('should add an item to the list', () => {
    const { result } = renderHook(() => useShops(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
    });

    act(() => {
      result.current.addItem({ id: '1', name: 'Test Shop', sortOrder: 1 });
    });
    expect(dispatchMock).toHaveBeenCalledWith({
      type: 'ADD_ITEM',
      payload: { id: '1', name: 'Test Shop', sortOrder: 1 },
    });
  });

  it('should delete an item from the list', () => {
    const shopId = '1';
    const { result } = renderHook(() => useShops(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
    });

    act(() => {
      result.current.deleteItem(shopId);
    });
    expect(dispatchMock).toHaveBeenCalledWith({
      type: 'DELETE_ITEM',
      payload: shopId,
    });
  });
});

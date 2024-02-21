import { request } from './request';
import { addShopItem, deleteShopItem, getShops } from './shops-api.request';
import { GetShopsResponse } from './shops-api.types';

jest.mock('./request', () => ({
  request: jest.fn(),
}));

const mockRequest = request as jest.MockedFunction<typeof request>;

describe('request', () => {
  describe('getShops', () => {
    it('fetches shops successfully', async () => {
      const mockShopsData = [
        { id: '1', name: 'Shop 1', sortOrder: 1 },
        { id: '2', name: 'Shop 2', sortOrder: 2 },
      ];
      mockRequest.mockResolvedValueOnce(mockShopsData as GetShopsResponse[]);

      const data = await getShops();
      expect(data).toEqual(mockShopsData);
      expect(request).toHaveBeenCalledWith('get', './public/shops.json');
    });
  });

  describe('deleteShopItem', () => {
    it('deletes a shop item successfully', async () => {
      mockRequest.mockResolvedValue(undefined);

      await deleteShopItem('1');
      expect(request).toHaveBeenCalledWith('delete', '/api/shops/1');
    });
  });

  describe('addShopItem', () => {
    it('adds a new shop item successfully', async () => {
      const newShopData = { id: '1', name: 'New Shop', sortOrder: 1 };
      const mockResponse = { id: '1', name: 'New Shop', sortOrder: 1 };
      mockRequest.mockResolvedValueOnce(mockResponse as GetShopsResponse);

      const result = await addShopItem(newShopData);
      expect(result).toEqual(mockResponse);
      expect(request).toHaveBeenCalledWith('post', '/api/shops', {
        data: newShopData,
      });
    });
  });
});

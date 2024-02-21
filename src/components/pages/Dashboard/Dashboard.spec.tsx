import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useShops } from '../../../hooks/useShop';
import { Dashboard } from './Dashboard';

jest.mock('../../../hooks/useShop');

describe('Dashboard', () => {
  it('renders dashboard correctly', () => {
    (useShops as jest.Mock).mockReturnValue({ shops: [], deleteItem: jest.fn() });
    render(<Dashboard />);
    expect(screen.getByText('Add to cart:')).toBeInTheDocument();
  });

  it('deletes item from list', () => {
    const deleteItemMock = jest.fn();
    (useShops as jest.Mock).mockReturnValue({
      shops: [{ id: '1', name: 'Shop1', sortOrder: '1' }],
      deleteItem: deleteItemMock,
    });

    render(<Dashboard />);
    fireEvent.click(screen.getByText('Delete'));
    expect(deleteItemMock).toHaveBeenCalledWith('1');
  });
});

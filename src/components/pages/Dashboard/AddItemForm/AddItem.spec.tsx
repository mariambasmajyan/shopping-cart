import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import { useShops } from '../../../../hooks/useShop';
import { AddItem } from './AddItem';

jest.mock('../../../../hooks/useShop');

describe('AddItem', () => {
  const mockAddItem = jest.fn();

  beforeEach(() => {
    mockAddItem.mockClear();
    (useShops as jest.Mock).mockReturnValue({ addItem: mockAddItem });
  });

  it('renders AddItemForm correctly', () => {
    render(<AddItem />);

    const nameInput = screen.getByLabelText('Name');
    expect(nameInput).toBeInTheDocument();
    expect(nameInput).toHaveValue('');

    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();
    expect(selectElement).toHaveValue('');

    const submitButton = screen.getByRole('button', { name: 'Add' });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeEnabled();
  });

  it('submits correct data to addItem when form is submitted', async () => {
    render(<AddItem />);

    await act(async () => {
      fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Test Shop' } });
      fireEvent.change(screen.getByRole('combobox'), { target: { value: '1' } });
      fireEvent.click(screen.getByRole('button', { name: 'Add' }));
    });

    expect(mockAddItem).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Test Shop',
        sortOrder: '1',
        id: expect.any(String),
      }),
    );
  });
});

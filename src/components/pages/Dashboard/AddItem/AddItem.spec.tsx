import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import { AddItem } from './AddItem';

describe('AddItem', () => {
  const mockAddItem = jest.fn();

  beforeEach(() => {
    mockAddItem.mockClear();
  });

  it('renders AddItem correctly', () => {
    render(<AddItem onAddItem={mockAddItem} />);

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

  it('submits correct data to onAddItem when form is submitted', async () => {
    render(<AddItem onAddItem={mockAddItem} />);

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

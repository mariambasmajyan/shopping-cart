import React from 'react';
import { useForm } from 'react-hook-form';
import { Shop } from '../../../../store/shops/types';
import './AddItem.scss';
import { sortOrder } from '../utils';

type AddItemProps = {
  onAddItem: (data: Shop) => void;
};

export const AddItem = ({ onAddItem }: AddItemProps) => {
  const { register, handleSubmit, reset } = useForm<Shop>();

  const onSubmit = (data: Shop): void => {
    const updatedData = {
      ...data,
      id: new Date().getMilliseconds().toString(),
    };
    onAddItem(updatedData);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-container">
        <div className="input-container">
          <input id="name" {...register('name')} type="text" required placeholder=" " />
          <label htmlFor="name">Name</label>
        </div>

        <div className="input-container select">
          <select id="sortOrder" required {...register('sortOrder')}>
            <option value="" hidden>
              Select shop
            </option>
            {sortOrder.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="add-button">
          Add
        </button>
      </div>
    </form>
  );
};

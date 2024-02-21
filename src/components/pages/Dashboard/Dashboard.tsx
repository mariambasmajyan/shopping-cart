import { useShops } from '../../../hooks/useShop';
import './Dashboard.scss';
import { sortOrder } from './utils';
import { AddItem } from './AddItemForm/AddItem';

export const Dashboard = () => {
  const { shops, deleteItem, addItem } = useShops();

  return (
    <div className="card">
      <p className="title">Add to cart: </p>
      <AddItem onAddItem={addItem} />

      <div className="items-list">
        {shops.map((shop) => {
          const shopOption = sortOrder.find((option) => option.value === shop.sortOrder.toString());

          return (
            <div key={shop.id} className="item">
              <span className="name">{shop.name}</span>
              <span className="sort-order">{shopOption ? shopOption.name : 'Unknown'}</span>
              <button type="button" onClick={() => deleteItem(shop.id)} className="delete-button">
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

import { formatCurrency } from "../../utils/helpers";

import DeleteItem from "./DeleteItem";
import UpDateItemQuantity from "./UpDateItemQuantity";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between gap-3 sm:gap-6">
        <p className="text-md font-bold">{formatCurrency(totalPrice)}</p>
        <div className="ml-auto">
          <UpDateItemQuantity pizzaId={pizzaId} />
        </div>

        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;

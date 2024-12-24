import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getTotalCart, getTotalPrice } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const location = useLocation();

  const totalCartQuantity = useSelector(getTotalCart);
  const totalPrice = useSelector(getTotalPrice);

  // Состояние для управления классом стиля
  const [isHighlighted, setIsHighlighted] = useState(false);

  useEffect(() => {
    if (totalCartQuantity === 0) return; // Ничего не делаем, если корзина пуста

    // Добавляем временный класс
    setIsHighlighted(true);

    // Убираем класс через 2 секунды
    const timer = setTimeout(() => {
      setIsHighlighted(false);
    }, 1000);

    // Очищаем таймер при изменении зависимости
    return () => clearTimeout(timer);
  }, [totalCartQuantity]);
  if (!totalCartQuantity) return null;
  return (
    <div className="text-clamp-sm flex items-center justify-between bg-stone-800 px-4 py-4 uppercase text-stone-200 sm:px-6 md:text-base">
      <p className={`space-x-4 font-semibold text-stone-300 sm:space-x-6`}>
        <span
          className={`${isHighlighted ? "text-md font-bold text-yellow-500" : ""}`}
        >
          {totalCartQuantity} pizzas
        </span>
        <span
          className={`${isHighlighted ? "text-md font-bold text-green-500" : ""}`}
        >
          {formatCurrency(totalPrice)}
        </span>
      </p>
      {location.pathname === "/cart" ? (
        ""
      ) : (
        <Link className="hover:text-yellow-400" to="/cart">
          Open cart &rarr;
        </Link>
      )}
    </div>
  );
}

export default CartOverview;

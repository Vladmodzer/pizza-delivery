import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import { fetchAdress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: "Mediterranean",
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: "Vegetale",
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: "Spinach and Mushroom",
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);

  const formErrors = useActionData();
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAdress,
  } = useSelector((state) => state.user);

  const isLoadingAddress = addressStatus === "loading";

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;
  const dispatch = useDispatch();
  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-6 py-6">
      <h2 className="text-clamp-lg mb-8 text-xl font-semibold">
        Ready to order? Let's go {<span className="uppercase">{username}</span>}
        !
      </h2>

      <Form
        className="sm: justify-center sm:flex sm:flex-col sm:gap-5"
        method="POST"
      >
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="text-clamp-sm sm:basis-40 md:basis-36">
            First Name
          </label>
          <div className="grow">
            <input
              defaultValue={username}
              className="input"
              type="text"
              name="customer"
              required
            />
          </div>
        </div>

        <div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className="text-clamp-sm sm:basis-40 md:basis-36">
              Phone number
            </label>
            <div className="grow">
              <input className="input" type="tel" name="phone" required />
            </div>
          </div>
          {formErrors?.phone && (
            <p className="mt-6 rounded-sm bg-red-100 p-2 text-center text-xs text-red-500">
              {formErrors.phone}
            </p>
          )}
        </div>

        <div className="relative flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="text-clamp-sm sm:basis-40 md:basis-36">
            Adress
          </label>
          <div className="grow">
            <input
              className="input placeholder: text-clamp-xs text-stone-600"
              disabled={isLoadingAddress}
              type="text"
              name="address"
              defaultValue={address}
              required
            />
            {addressStatus === "error" && (
              <p className="mt-6 rounded-sm bg-red-100 p-2 text-center text-xs text-red-500">
                {errorAdress}
              </p>
            )}
          </div>
          {!position.latitude && !position.longitude && (
            <span className="right-2 top-[0.35rem] z-50 sm:absolute md:top-[0.30rem]">
              <Button
                disabled={isLoadingAddress}
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAdress());
                }}
              >
                get position
              </Button>
            </span>
          )}
        </div>

        <div className="my-5 flex items-center gap-5 sm:my-0">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="text-clamp-sm" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.latitude
                ? `${position.latitude},${position.longitude}
              `
                : ""
            }
          />
          <Button type="primary" disabled={isSubmitting || isLoadingAddress}>
            {isSubmitting
              ? "Placing order..."
              : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };
  console.log("order:", data);

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "Pleace give us your correct phone number.We might need it to contact you.";
  if (Object.keys(errors).length > 0) return errors;
  // if everything is ok create new order end redirect
  const newOedr = await createOrder(order);
  // DO NOT OVERUSE! BEKAUSE OPTIMIZATION!
  store.dispatch(clearCart());
  return redirect(`/order/${newOedr.id}`);
}

export default CreateOrder;

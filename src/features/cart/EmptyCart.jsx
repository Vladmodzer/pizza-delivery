import LinkButton from "../../ui/LinkButton";

function EmptyCart() {
  return (
    <div className="px-4">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <p className="py-10 text-center">
        Your cart is still empty. Start adding some pizzas :)
      </p>
      <div className="flex justify-center">
        <img className="w-80" src="/noOrderJet.webp" alt="" />
      </div>
    </div>
  );
}

export default EmptyCart;

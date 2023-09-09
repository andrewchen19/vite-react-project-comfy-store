import { useSelector } from "react-redux";
import { formatPrice } from "../utilize";

const CartTotals = () => {
  const { cartTotalPrice, shipping, tax, orderTotalPrice } = useSelector(
    (store) => store.cart
  );

  return (
    <div className="card bg-neutral ">
      <div className="card-body">
        {/* cartTotalPrice */}
        <div className="pb-1 border-b border-base-300 flex justify-between items-center">
          <p className="text-sm">Subtotal</p>
          <span className="text-sm">{formatPrice(cartTotalPrice)}</span>
        </div>
        {/* shipping */}
        <div className="pb-1 border-b border-base-300 flex justify-between items-center">
          <p className="text-sm">Shipping</p>
          <span className="text-sm">{formatPrice(shipping)}</span>
        </div>
        {/* cartTotalPrice */}
        <div className="pb-1 border-b border-base-300 flex justify-between items-center">
          <p className="text-sm">Tax</p>
          <span className="text-sm">{formatPrice(tax)}</span>
        </div>
        {/* orderTotalPrice */}
        <div className="mt-4 flex justify-between items-center">
          <p className="text-base">Order Total</p>
          <span className="text-base">{formatPrice(orderTotalPrice)}</span>
        </div>
      </div>
    </div>
  );
};

export default CartTotals;

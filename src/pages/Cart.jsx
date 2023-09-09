import { CartItemsList, SectionTitle, CartTotals } from "../components";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Cart = () => {
  const { cartTotalAmount } = useSelector((store) => store.cart);
  const { user } = useSelector((state) => state.user);

  if (cartTotalAmount === 0) {
    return <SectionTitle text="Your cart is empty" />;
  }

  return (
    <>
      <SectionTitle text="Shopping Cart" />
      <div className="grid mt-8 gap-y-8 lg:grid-cols-[2fr,1fr] lg:gap-x-12">
        <div>
          <CartItemsList />
        </div>

        <div>
          <CartTotals />
          {user ? (
            <NavLink
              to="/checkout"
              className="btn btn-secondary btn-block mt-8"
            >
              proceed to checkout
            </NavLink>
          ) : (
            <NavLink to="/login" className="btn btn-secondary btn-block mt-8">
              please login
            </NavLink>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;

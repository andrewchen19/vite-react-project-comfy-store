import { useSelector } from "react-redux";
import CartItems from "./CartItems";

const CartItemsList = () => {
  const { cartItems } = useSelector((store) => store.cart);
  // console.log(cartItems);

  return (
    <>
      {cartItems.map((item) => {
        return <CartItems key={item.cartID} item={item} />;
      })}
    </>
  );
};

export default CartItemsList;

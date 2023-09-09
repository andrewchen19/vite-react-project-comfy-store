import { CartTotals, SectionTitle, CheckOutForm } from "../components";
import { useSelector } from "react-redux";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

// restrict access，在 loader function 處理
// 因為 loaders runs before the page is actually rendered
export const loader = (store) => () => {
  const user = store.getState().user.user;

  if (!user) {
    toast.warning("Please log in first", {
      icon: "😵",
    });
    return redirect("/login");
  }

  return null;
};

const Checkout = () => {
  const { cartTotalAmount } = useSelector((store) => store.cart);

  // conditional rendering
  if (cartTotalAmount === 0) {
    return <SectionTitle text="Your cart is empty" />;
  }

  return (
    <>
      <SectionTitle text="Place Your Order" />
      <div className="grid mt-8 gap-y-8  lg:grid-cols-2 lg:gap-x-12 lg:items-start">
        <CheckOutForm />
        <CartTotals />
      </div>
    </>
  );
};

export default Checkout;
